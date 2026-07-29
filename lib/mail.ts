import 'server-only';
import nodemailer from 'nodemailer';

/* Envio de e-mail isolado atrás deste módulo: o Route Handler não sabe que é
   SMTP. Para trocar por uma API HTTP depois, basta reescrever `sendMail` aqui.

   Config via ambiente (.env.local em dev, variáveis do projeto na Vercel):
     SMTP_HOST     smtp.gmail.com
     SMTP_PORT     587
     SMTP_USER     conta@diggia.com.br      (autentica no Workspace)
     SMTP_PASS     senha de app de 16 dígitos
     CONTACT_TO    para onde os leads chegam (default: SMTP_USER)
     CONTACT_FROM  remetente (default: SMTP_USER) — precisa ser do domínio */

export interface MailInput {
  to: string;
  from: string;
  replyTo?: string;
  subject: string;
  text: string;
  html?: string;
}

/** Lê e valida a config SMTP. Lança se algo essencial faltar. */
function readConfig() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  const missing = [
    ['SMTP_HOST', host],
    ['SMTP_USER', user],
    ['SMTP_PASS', pass],
  ]
    .filter(([, v]) => !v)
    .map(([k]) => k as string);

  if (missing.length) {
    throw new Error(`Configuração SMTP incompleta: faltam ${missing.join(', ')}`);
  }

  return { host: host!, port, user: user!, pass: pass! };
}

/* A conexão SMTP é reaproveitada entre invocações quentes da mesma instância
   serverless (module scope sobrevive ao cold start). Em invocação fria, é
   recriada. `pool` mantém o socket aberto para reuso dentro da instância. */
let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (transporter) return transporter;
  const cfg = readConfig();
  transporter = nodemailer.createTransport({
    host: cfg.host,
    port: cfg.port,
    secure: cfg.port === 465, // 465 = TLS implícito; 587 = STARTTLS
    auth: { user: cfg.user, pass: cfg.pass },
    pool: true,
    maxConnections: 1,
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
  });
  return transporter;
}

export async function sendMail(input: MailInput) {
  await getTransporter().sendMail(input);
}
