import { NextRequest, NextResponse } from 'next/server';
import { sendMail } from '@/lib/mail';
import { EMAIL } from '@/lib/site';

/* Recebe o formulário de contato e dispara o e-mail para a Diggia.

   Node runtime (não Edge): o nodemailer abre socket TCP, que o Edge não tem.
   force-dynamic: nada aqui deve ser cacheado ou pré-renderizado. */
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX = { nome: 120, empresa: 160, email: 160, whatsapp: 40, mensagem: 4000 };

/* Limite de taxa por IP, best-effort. Em serverless o Map vive só na instância
   quente, então não é uma barreira dura — é o suficiente para conter flood de
   um mesmo cliente. Proteção real de volume viraria um store compartilhado. */
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear(); // teto de memória
  return recent.length > MAX_PER_WINDOW;
}

function clientIp(req: NextRequest) {
  const fwd = req.headers.get('x-forwarded-for');
  return fwd?.split(',')[0].trim() || req.headers.get('x-real-ip') || 'desconhecido';
}

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const clean = (v: unknown) => (typeof v === 'string' ? v.trim() : '');
const escapeHtml = (v: string) =>
  v.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Requisição inválida.' }, { status: 400 });
  }

  // Rate limit primeiro: protege o endpoint por IP independente do conteúdo,
  // inclusive de floods que preencham o honeypot.
  if (rateLimited(clientIp(req))) {
    return NextResponse.json(
      { error: 'Muitas tentativas em pouco tempo. Aguarde um instante e tente novamente.' },
      { status: 429 }
    );
  }

  // Honeypot: campo escondido que só um bot preenche. Fingimos sucesso para
  // não ensinar o bot que foi detectado.
  if (clean(body.website)) {
    return NextResponse.json({ ok: true });
  }

  const nome = clean(body.nome);
  const empresa = clean(body.empresa);
  const email = clean(body.email);
  const whatsapp = clean(body.whatsapp);
  const mensagem = clean(body.mensagem);
  const lgpd = body.lgpd === true || body.lgpd === 'on';

  const errors: string[] = [];
  if (!nome) errors.push('nome');
  if (!empresa) errors.push('empresa');
  if (!email || !isEmail(email)) errors.push('email');
  if (!whatsapp) errors.push('whatsapp');
  if (!mensagem) errors.push('mensagem');
  if (!lgpd) errors.push('lgpd');
  for (const [k, limit] of Object.entries(MAX)) {
    if ((body[k] as string)?.length > limit) errors.push(k);
  }
  if (errors.length) {
    return NextResponse.json({ error: 'Confira os campos do formulário.', fields: errors }, { status: 422 });
  }

  const to = process.env.CONTACT_TO || process.env.SMTP_USER || EMAIL;
  const from = process.env.CONTACT_FROM || process.env.SMTP_USER || EMAIL;

  const linhas = [
    `Nome:     ${nome}`,
    `Empresa:  ${empresa}`,
    `E-mail:   ${email}`,
    `WhatsApp: ${whatsapp}`,
    '',
    'Onde a operação mais trava hoje:',
    mensagem,
  ];

  try {
    await sendMail({
      to,
      from: `Site Diggia <${from}>`,
      // Responder no Gmail cai direto no visitante. Nunca usamos o e-mail dele
      // no From — quebraria SPF/DMARC do domínio dele.
      replyTo: `${nome} <${email}>`,
      subject: `Novo contato pelo site — ${nome} (${empresa})`,
      text: linhas.join('\n'),
      html: `<div style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.6">
        <h2 style="margin:0 0 12px">Novo contato pelo site</h2>
        <p><strong>Nome:</strong> ${escapeHtml(nome)}<br>
        <strong>Empresa:</strong> ${escapeHtml(empresa)}<br>
        <strong>E-mail:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a><br>
        <strong>WhatsApp:</strong> ${escapeHtml(whatsapp)}</p>
        <p><strong>Onde a operação mais trava hoje:</strong><br>${escapeHtml(mensagem).replace(/\n/g, '<br>')}</p>
      </div>`,
    });
  } catch (err) {
    console.error('[contato] falha ao enviar e-mail:', err);
    return NextResponse.json(
      { error: 'Não foi possível enviar agora. Tente pelo WhatsApp ou e-mail.' },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
