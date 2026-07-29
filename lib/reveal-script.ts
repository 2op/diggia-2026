/* Scroll reveal — títulos entram caractere a caractere, blocos sobem em cascata.
   Sem dependências: IntersectionObserver + CSS (app/site.css).

   São duas fases, e a divisão é proposital:

   1. revealBootstrap() é serializado com .toString() e injetado inline no fim do
      <body> (app/layout.tsx), rodando durante o parse do HTML — antes da
      primeira pintura, para o conteúdo já nascer escondido sem piscar. Ele NÃO
      toca no DOM que o React renderizou: esconde os alvos por um stylesheet
      construído (adoptedStyleSheets), invisível para a hidratação.

   2. startReveal() roda depois da hidratação (components/Reveal.tsx). Aí sim
      marca os elementos, divide os títulos em <span>, liga o
      IntersectionObserver e descarta o stylesheet da fase 1.

   Como o bootstrap é serializado, ele precisa ser autocontido: não pode
   referenciar nada fora do próprio corpo. */

type Targets = { blocks: HTMLElement[]; headings: HTMLElement[] };

type RevealApi = {
  collect: () => Targets;
  unhide: () => void;
  pending: Targets | null;
  started: boolean;
};

type RevealWindow = Window & { __dgRevealApi?: RevealApi };

const STAGGER = 80; // ms entre blocos que entram juntos
const MAX_STEPS = 6; // teto para não criar esperas longas
const CHAR_STEP = 20; // ms entre caracteres de um título

/* --------------------------------------------------------------- fase 1 --- */

export function revealBootstrap() {
  const w = window as Window & { __dgRevealApi?: unknown };
  if (w.__dgRevealApi) return;

  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
  if (!('IntersectionObserver' in window)) return;

  const handled = new WeakSet<Element>();

  function isDecorative(el: HTMLElement) {
    if (el.tagName === 'SCRIPT' || el.tagName === 'STYLE' || el.tagName === 'BR') return true;
    if (el.getAttribute('aria-hidden') === 'true') return true;
    const pos = getComputedStyle(el).position;
    if (pos === 'absolute' || pos === 'fixed') return true;
    // divisórias de 1px entre seções
    if (el.offsetHeight <= 2 && !el.children.length) return true;
    return false;
  }

  function kidsOf(el: Element) {
    return (Array.from(el.children) as HTMLElement[]).filter((c) => !isDecorative(c));
  }

  /* Uma lista de irmãos do mesmo tipo (ex.: os <details> do FAQ) entra em
     cascata, item a item, em vez de aparecer como um bloco só. */
  function sameTagList(kids: HTMLElement[]) {
    if (kids.length < 2 || kids.length > 12) return false;
    const tag = kids[0].tagName;
    if (tag === 'DIV' || tag === 'SPAN') return false; // genéricos demais
    return kids.every((k) => k.tagName === tag);
  }

  function collect() {
    const blocks: HTMLElement[] = [];
    const headings: HTMLElement[] = [];

    function take(el: HTMLElement, isHeading: boolean) {
      if (handled.has(el)) return;
      handled.add(el);
      (isHeading ? headings : blocks).push(el);
    }

    function process(el: Element, depth: number) {
      if (depth > 7) return;
      const kids = kidsOf(el);
      if (!kids.length) return;

      // wrapper de passagem: desce até o conteúdo real da seção
      if (kids.length === 1 && kids[0].children.length && kids[0].tagName !== 'svg') {
        const only = kids[0];
        if (!only.matches('h1, h2, p, a, form, details')) {
          process(only, depth + 1);
          return;
        }
      }

      kids.forEach((k) => {
        if (k.matches('h1, h2')) {
          take(k, true);
        } else if (k.classList.contains('dg-grid') || k.querySelector('h1, h2') || sameTagList(kidsOf(k))) {
          process(k, depth + 1);
        } else {
          take(k, false);
        }
      });
    }

    const main = document.querySelector('main');
    if (main) {
      (Array.from(main.children) as HTMLElement[]).forEach((section) => {
        if (!isDecorative(section)) process(section, 0);
      });
    }
    const footer = document.querySelector('footer');
    if (footer) process(footer, 0);

    return { blocks, headings };
  }

  /* Caminho estrutural do elemento — o stylesheet da fase 1 precisa mirar os
     alvos sem escrever nada no DOM que o React vai hidratar. */
  function cssPath(el: HTMLElement) {
    const parts: string[] = [];
    let node: HTMLElement | null = el;
    while (node && node !== document.body) {
      const parent: HTMLElement | null = node.parentElement;
      if (!parent) return null;
      const i = Array.prototype.indexOf.call(parent.children, node) + 1;
      parts.unshift(node.tagName.toLowerCase() + ':nth-child(' + i + ')');
      node = parent;
    }
    return 'body>' + parts.join('>');
  }

  const supportsSheet =
    'adoptedStyleSheets' in document && typeof CSSStyleSheet === 'function' && 'replaceSync' in CSSStyleSheet.prototype;

  let sheet: CSSStyleSheet | null = null;

  function unhide() {
    if (!sheet) return;
    document.adoptedStyleSheets = document.adoptedStyleSheets.filter((s) => s !== sheet);
    sheet = null;
  }

  const api = { collect, unhide, pending: null as Targets | null, started: false };
  w.__dgRevealApi = api;

  const first = collect();
  api.pending = first;

  if (supportsSheet) {
    const sel = (list: HTMLElement[]) => list.map(cssPath).filter(Boolean).join(',');
    const blockSel = sel(first.blocks);
    const headSel = sel(first.headings);
    const css =
      (blockSel ? blockSel + '{opacity:0;transform:translateY(36px)}' : '') +
      (headSel ? headSel + '{opacity:0}' : '');
    if (css) {
      sheet = new CSSStyleSheet();
      sheet.replaceSync(css);
      document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];
    }
  }

  // rede de segurança: se o bundle não carregar, nada fica escondido
  window.setTimeout(() => {
    if (!api.started) unhide();
  }, 4000);
}

/* --------------------------------------------------------------- fase 2 --- */

let observer: IntersectionObserver | null = null;
const charCount = new WeakMap<Element, number>();

/* Ainda esperando entrar. O rootMargin negativo abaixo cria uma zona morta de
   10% da altura da tela no fim do documento: o que estiver ali (a barra final
   do rodapé, por exemplo) nunca cruza a linha de gatilho, porque a página não
   rola mais. Por isso guardamos os pendentes e liberamos no fim da rolagem. */
const pending = new Set<HTMLElement>();
let watchingBottom = false;

function getObserver() {
  if (observer) return observer;
  observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        // ordena por posição vertical para a cascata seguir a leitura
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      visible.forEach((entry, i) => {
        take(entry.target as HTMLElement, Math.min(i, MAX_STEPS));
      });
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.01 }
  );
  return observer;
}

function take(el: HTMLElement, step: number) {
  observer?.unobserve(el);
  pending.delete(el);
  reveal(el, step);
}

/** Libera quem ficou na zona morta assim que a página chega ao fim — inclusive
 *  em páginas curtas demais para rolar. */
function flushAtBottom() {
  if (!pending.size) {
    stopWatchingBottom();
    return;
  }
  if (window.scrollY + window.innerHeight < document.documentElement.scrollHeight - 4) return;
  [...pending]
    .sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top)
    .forEach((el, i) => take(el, Math.min(i, MAX_STEPS)));
  stopWatchingBottom();
}

function watchBottom() {
  if (watchingBottom) return;
  watchingBottom = true;
  window.addEventListener('scroll', flushAtBottom, { passive: true });
  window.addEventListener('resize', flushAtBottom);
}

/* Os ouvintes saem assim que o último alvo entra: enquanto rolam, custam duas
   leituras e uma comparação — o scrollHeight vem do layout já calculado. */
function stopWatchingBottom() {
  if (!watchingBottom || pending.size) return;
  watchingBottom = false;
  window.removeEventListener('scroll', flushAtBottom);
  window.removeEventListener('resize', flushAtBottom);
}

/* O atraso vai por classe (.dg-d1…) e não por style inline de propósito:
   escrever em el.style faz o navegador re-serializar o atributo style inteiro
   ("font-size:45px" vira "font-size: 45px"), e os ajustes responsivos de
   globals.css dependem desse atributo. */
function reveal(el: HTMLElement, step: number) {
  el.classList.add('dg-in');
  if (step > 0) el.classList.add('dg-d' + step);

  const isText = el.hasAttribute('data-rv-h');
  const delay = step * STAGGER;
  const settle = isText ? delay + 600 + (charCount.get(el) || 0) * CHAR_STEP : delay + 800;

  // ao terminar, limpa o estado da animação para não atrapalhar os :hover
  window.setTimeout(() => {
    if (isText) {
      el.classList.add('dg-done');
    } else {
      el.removeAttribute('data-rv');
      el.classList.remove('dg-in', 'dg-d' + step);
    }
  }, settle + 60);
}

function splitHeading(el: HTMLElement) {
  // só divide títulos de texto puro e de tamanho razoável
  if (el.children.length > 0) return false;
  const text = (el.textContent || '').replace(/\s+/g, ' ').trim();
  if (!text || text.length > 120) return false;

  el.textContent = '';

  // cópia acessível: leitores de tela leem o título inteiro, não letra a letra
  const sr = document.createElement('span');
  sr.className = 'dg-sr';
  sr.textContent = text;
  el.appendChild(sr);

  const visual = document.createElement('span');
  visual.setAttribute('aria-hidden', 'true');

  const words = text.split(' ');
  let n = 0;
  words.forEach((word, wi) => {
    const w = document.createElement('span');
    w.className = 'dg-w';
    for (const letter of word) {
      const c = document.createElement('span');
      c.className = 'dg-c';
      c.style.setProperty('--i', String(n++));
      c.textContent = letter;
      w.appendChild(c);
    }
    visual.appendChild(w);
    if (wi < words.length - 1) visual.appendChild(document.createTextNode(' '));
  });

  el.appendChild(visual);
  charCount.set(el, n);
  return true;
}

/** Assume os alvos escolhidos pelo bootstrap e inicia as animações.
 *  Idempotente: pode ser chamado a cada navegação client-side. */
export function startReveal() {
  const api = (window as RevealWindow).__dgRevealApi;
  if (!api) return; // reduced motion, navegador antigo, ou script inline ausente

  api.started = true;
  const targets = api.pending || api.collect();
  api.pending = null;

  targets.headings.forEach((el) => {
    // título com marcação interna não é dividido: entra como bloco comum
    el.setAttribute(splitHeading(el) ? 'data-rv-h' : 'data-rv', '');
    pending.add(el);
    getObserver().observe(el);
  });
  targets.blocks.forEach((el) => {
    el.setAttribute('data-rv', '');
    pending.add(el);
    getObserver().observe(el);
  });

  // os atributos acima já reproduzem o estado escondido: troca sem repintar
  api.unhide();

  watchBottom();
  flushAtBottom(); // páginas curtas já nascem no fim da rolagem
}
