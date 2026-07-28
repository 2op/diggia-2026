import fs from 'fs';
import path from 'path';
import * as cheerio from 'cheerio';

const SRC = '/private/tmp/claude-501/-Users-cleiton-Sites-diggia-2026/0ecab3c0-ce32-4517-a681-5f9bb44e8870/scratchpad/extracted';
const PROJ = '/Users/cleiton/Sites/diggia-2026';
const OUT = path.join(PROJ, 'components/sections');
fs.mkdirSync(OUT, { recursive: true });

const PAGES = ['index', 'agentes-de-ia', 'automacao-de-processos', 'consultoria-de-ia', 'sobre', 'contato', 'politica-de-privacidade'];

const hoverClasses = new Map(); // css -> className
const extraCss = new Set();
const meta = {};

const VOID = new Set(['area','base','br','col','embed','hr','img','input','link','meta','source','track','wbr','circle','rect','path','stop','mpath','use','line','ellipse','polyline','polygon']);

function camel(s) { return s.replace(/-([a-z])/g, (_, c) => c.toUpperCase()); }

function styleToObj(style) {
  const props = [];
  for (const decl of style.split(';')) {
    const i = decl.indexOf(':');
    if (i < 0) continue;
    let k = decl.slice(0, i).trim();
    let v = decl.slice(i + 1).trim();
    if (!k) continue;
    // responsive horizontal padding hook
    if (k === 'padding') v = v.replace(/(?<=^|\s)64px(?=\s|$)/g, 'var(--px)');
    let kk;
    if (k.startsWith('--')) kk = `'${k}'`;
    else if (k.startsWith('-webkit-')) kk = 'Webkit' + camel(k.slice(8)).replace(/^./, c => c.toUpperCase());
    else if (k.startsWith('-moz-')) kk = 'Moz' + camel(k.slice(5)).replace(/^./, c => c.toUpperCase());
    else if (k.startsWith('-ms-')) kk = 'ms' + camel(k.slice(4)).replace(/^./, c => c.toUpperCase());
    else kk = camel(k);
    props.push(`${kk}: ${JSON.stringify(v)}`);
  }
  return `{{ ${props.join(', ')} }}`;
}

function hoverClass(css) {
  if (!hoverClasses.has(css)) hoverClasses.set(css, `dg-h${hoverClasses.size + 1}`);
  return hoverClasses.get(css);
}

const ATTR_MAP = { class: 'className', for: 'htmlFor', crossorigin: 'crossOrigin', autocomplete: 'autoComplete', tabindex: 'tabIndex', readonly: 'readOnly', maxlength: 'maxLength', rows: 'rows', colspan: 'colSpan', rowspan: 'rowSpan', srcset: 'srcSet' };

function mapHref(href) {
  if (!href) return href;
  if (href === 'index.html') return '/';
  const m = href.match(/^([a-z0-9-]+)\.html$/);
  if (m) return `/${m[1]}`;
  return href;
}

function esc(text) {
  return text.replace(/([{}])/g, "{'$1'}").replace(/>/g, '&gt;');
}

function nodeToJsx(node, $, indent) {
  const pad = '  '.repeat(indent);
  if (node.type === 'text') {
    const t = node.data;
    if (!t.trim()) return '';
    const lead = /^\s/.test(t) ? "{' '}" : '';
    const trail = /\s$/.test(t) ? "{' '}" : '';
    return pad + lead + esc(t.trim()) + trail + '\n';
  }
  if (node.type === 'comment') return '';
  if (node.type !== 'tag' && node.type !== 'script' && node.type !== 'style') return '';
  let tag = node.name;
  if (tag === 'script' || tag === 'style' || tag === 'helmet') return '';

  const attrs = [];
  const classes = [];
  for (let [k, v] of Object.entries(node.attribs || {})) {
    if (k === 'style-hover') { classes.push(hoverClass(v)); continue; }
    if (k.startsWith('sc-camel-')) { k = camel(k.slice('sc-camel-'.length)); attrs.push(`${k}="${v}"`); continue; }
    if (k === 'style') {
      // add responsive grid hook
      if (/grid-template-columns\s*:/.test(v) && !/1fr\s*$/.test('') ) classes.push('dg-grid');
      attrs.push(`style=${styleToObj(v)}`);
      continue;
    }
    if (k === 'class') { classes.push(...v.split(/\s+/).filter(Boolean)); continue; }
    if (k === 'href') v = mapHref(v);
    if (k === 'src' && /^assets\/.*\.svg$/.test(v)) v = '/logo.svg';
    if (k.startsWith('data-') || k.startsWith('aria-')) { attrs.push(`${k}="${v}"`); continue; }
    const mapped = ATTR_MAP[k] || (k.includes('-') ? camel(k) : k);
    if (v === '') attrs.push(`${mapped}=""`);
    else attrs.push(`${mapped}=${JSON.stringify(v)}`);
  }
  if (classes.length) attrs.unshift(`className="${classes.join(' ')}"`);

  const attrStr = attrs.length ? ' ' + attrs.join(' ') : '';
  const children = (node.children || []).map(c => nodeToJsx(c, $, indent + 1)).join('');
  if (!children.trim()) {
    return `${pad}<${tag}${attrStr}${VOID.has(tag) || !children ? ' />' : `></${tag}>`}\n`;
  }
  return `${pad}<${tag}${attrStr}>\n${children}${pad}</${tag}>\n`;
}

const KEYFRAMES = ['dgflow', 'dgpulse', 'dgring', 'dgchat', 'dgspin'];

for (const page of PAGES) {
  let html = fs.readFileSync(path.join(SRC, `${page}.html`), 'utf8');
  // namespace keyframe names per page (same name, different defs across pages)
  const suffix = page.replace(/[^a-z]/g, '');
  for (const kf of KEYFRAMES) html = html.replace(new RegExp(`\\b${kf}\\b`, 'g'), `${kf}-${suffix}`);
  const $ = cheerio.load(html);
  meta[page] = {
    title: $('title').text(),
    description: $('meta[name="description"]').attr('content') || '',
  };
  // collect non-font css from helmet styles
  $('helmet style, x-dc style').each((_, el) => {
    const css = $(el).text();
    // strip @font-face blocks and their preceding comments
    let stripped = css.replace(/\/\*[^*]*\*\/\s*@font-face\s*\{[^}]*\}/g, '').replace(/@font-face\s*\{[^}]*\}/g, '').trim();
    // base rules (body, a, inputs) go to globals.css by hand — keep only keyframes/media here
    stripped = stripped.split('\n').filter(l => !/^(body\{|input)/.test(l.trim())).join('\n').trim();
    if (stripped) extraCss.add(stripped);
  });

  const root = $('x-dc > div').first();
  if (!root.length) { console.error('no root for', page); continue; }
  // remove header/footer (shared components)
  root.find('header').first().remove();
  root.find('footer').first().remove();

  const inner = root.children().toArray().map(c => nodeToJsx(c, $, 2)).join('');
  const name = camel(page.replace(/^./, m => m)).replace(/-/g, '');
  const comp = `/* Gerado a partir de legacy-html/${page}.html — conteúdo da página sem header/footer. */
export default function PageContent() {
  return (
    <>
${inner}    </>
  );
}
`;
  fs.writeFileSync(path.join(OUT, `${page}.tsx`), comp);
  console.log('wrote', page, inner.length);
}

// header & footer from index
{
  const html = fs.readFileSync(path.join(SRC, 'index.html'), 'utf8');
  const $ = cheerio.load(html);
  const header = $('x-dc header').first();
  const footer = $('x-dc footer').first();
  fs.writeFileSync(path.join(OUT, '_header.jsx.txt'), nodeToJsx(header.get(0), $, 1));
  fs.writeFileSync(path.join(OUT, '_footer.jsx.txt'), nodeToJsx(footer.get(0), $, 1));
}

const hoverCss = [...hoverClasses.entries()].map(([css, cls]) => `.${cls}:hover { ${css.replace(/;?$/, ';')} }`).join('\n');
fs.writeFileSync(path.join(PROJ, 'app/generated.css'), [...extraCss].join('\n\n') + '\n\n' + hoverCss + '\n');
fs.writeFileSync(path.join(SRC, 'meta.json'), JSON.stringify(meta, null, 2));
console.log('hover classes:', hoverClasses.size);
