/* Gerado a partir de legacy-html/contato.html — conteúdo da página sem header/footer. */
'use client';

import { useState } from 'react';

export default function PageContent() {
  const [sent, setSent] = useState(false);
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };
  return (
    <>
    <div style={{ position: "relative", overflow: "hidden", padding: "100px var(--px) 120px" }}>
      <div style={{ position: "absolute", top: "0", left: "50%", transform: "translate(-50%,-55%)", width: "520px", height: "520px", borderRadius: "50%", background: "#465fff", opacity: ".28", filter: "blur(130px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: "0", backgroundImage: "radial-gradient(rgba(255,255,255,.09) 1px,transparent 1px)", backgroundSize: "22px 22px", maskImage: "radial-gradient(760px 420px at 50% 0%,#000 20%,transparent 75%)", WebkitMaskImage: "radial-gradient(760px 420px at 50% 0%,#000 20%,transparent 75%)", pointerEvents: "none" }} />
      <div className="dg-grid" style={{ position: "relative", display: "grid", gridTemplateColumns: ".9fr 1.1fr", gap: "72px", alignItems: "start" }}>
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", border: "1px solid rgba(255,255,255,.16)", borderRadius: "100px", padding: "9px 20px", background: "rgba(255,255,255,.03)", fontFamily: "ui-monospace,'SF Mono',Menlo,monospace", fontSize: "13.5px", color: "rgba(255,255,255,.9)" }}>
            <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#465fff" }} />
            Contato
          </div>
          <h1 style={{ fontFamily: "Manrope,sans-serif", fontWeight: "400", fontSize: "54px", lineHeight: "1.15", letterSpacing: "-.02em", margin: "26px 0 0", textWrap: "balance" }}>
            Fale com a Diggia
          </h1>
          <p style={{ fontSize: "16px", lineHeight: "1.7", color: "rgba(255,255,255,.65)", maxWidth: "480px", margin: "24px 0 0", textWrap: "pretty" }}>
            O caminho mais rápido é o WhatsApp — respondemos em horário comercial. Se preferir, use o formulário ou o e-mail.
          </p>
          <div style={{ marginTop: "34px" }}>
            <a className="dg-h1" href="https://wa.me/5549999289840?text=Ol%C3%A1!%20Vim%20pela%20p%C3%A1gina%20de%20contato%20do%20site%20da%20Diggia." style={{ display: "inline-flex", alignItems: "center", gap: "10px", background: "#465fff", color: "#fff", textDecoration: "none", fontSize: "15.5px", fontWeight: "500", padding: "16px 32px", borderRadius: "100px" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12a8 8 0 0 1-8 8H4l2-3a8 8 0 1 1 15-5z" />
              </svg>
              Chamar no WhatsApp
            </a>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "22px", marginTop: "56px", borderTop: "1px solid rgba(255,255,255,.09)", paddingTop: "40px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <span style={{ width: "42px", height: "42px", border: "1px solid rgba(255,255,255,.16)", borderRadius: "100px", display: "inline-flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#8b9bff" strokeWidth="1.4" strokeLinecap="round">
                  <rect x="3" y="5" width="18" height="14" rx="3" />
                  <path d="M3.5 7l8.5 6 8.5-6" />
                </svg>
              </span>
              <div>
                <div style={{ fontSize: "12.5px", letterSpacing: ".12em", textTransform: "uppercase", color: "rgba(255,255,255,.45)" }}>
                  E-mail
                </div>
                <div style={{ fontSize: "15.5px", marginTop: "3px" }}>
                  contato@diggia.com.br
                </div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <span style={{ width: "42px", height: "42px", border: "1px solid rgba(255,255,255,.16)", borderRadius: "100px", display: "inline-flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#8b9bff" strokeWidth="1.4" strokeLinecap="round">
                  <path d="M22 16.5v3a2 2 0 0 1-2.2 2A19.5 19.5 0 0 1 2.5 4.2 2 2 0 0 1 4.5 2h3a2 2 0 0 1 2 1.7c.13.96.36 1.9.7 2.8a2 2 0 0 1-.45 2.1L8.6 9.75a16 16 0 0 0 5.65 5.65l1.15-1.15a2 2 0 0 1 2.1-.45c.9.34 1.84.57 2.8.7a2 2 0 0 1 1.7 2z" />
                </svg>
              </span>
              <div>
                <div style={{ fontSize: "12.5px", letterSpacing: ".12em", textTransform: "uppercase", color: "rgba(255,255,255,.45)" }}>
                  WhatsApp
                </div>
                <div style={{ fontSize: "15.5px", marginTop: "3px" }}>
                  +55 49 99928-9840
                </div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <span style={{ width: "42px", height: "42px", border: "1px solid rgba(255,255,255,.16)", borderRadius: "100px", display: "inline-flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#8b9bff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 10c0 6-8 11-8 11s-8-5-8-11a8 8 0 1 1 16 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </span>
              <div>
                <div style={{ fontSize: "12.5px", letterSpacing: ".12em", textTransform: "uppercase", color: "rgba(255,255,255,.45)" }}>
                  Endereço
                </div>
                <div style={{ fontSize: "15.5px", marginTop: "3px", lineHeight: "1.5" }}>
                  Rua Araguaia 494, Bairro Colatto
                  <br />
                  Xanxerê – SC, CEP 89820-000
                </div>
              </div>
            </div>
          </div>
        </div>
        {sent && (
          <div style={{ border: "1px solid rgba(70,95,255,.4)", borderRadius: "24px", background: "linear-gradient(180deg,rgba(70,95,255,.08),rgba(70,95,255,.015))", padding: "var(--px) 48px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "18px", marginTop: "12px" }}>
            <span style={{ width: "64px", height: "64px", borderRadius: "100px", border: "1px solid #465fff", background: "rgba(70,95,255,.12)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#8b9bff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </span>
            <div style={{ fontFamily: "Manrope,sans-serif", fontSize: "26px" }}>
              Recebido!
            </div>
            <p style={{ margin: "0", fontSize: "15.5px", lineHeight: "1.65", color: "rgba(255,255,255,.65)", maxWidth: "380px", textWrap: "pretty" }}>
              Respondemos em até 1 dia útil. Se for urgente,{' '}
              <a href="https://wa.me/5549999289840?text=Ol%C3%A1!%20Vim%20pela%20p%C3%A1gina%20de%20contato%20do%20site%20da%20Diggia." style={{ color: "#8b9bff" }}>
                chame no WhatsApp
              </a>
              .
            </p>
          </div>
        )}
        {!sent && (
          <form onSubmit={submit} style={{ border: "1px solid rgba(255,255,255,.11)", borderRadius: "24px", background: "linear-gradient(180deg,rgba(255,255,255,.035),rgba(255,255,255,.008))", padding: "44px 48px", display: "flex", flexDirection: "column", gap: "22px", marginTop: "12px" }}>
            <div className="dg-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "22px" }}>
              <label style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "13.5px", color: "rgba(255,255,255,.7)" }}>
                Nome{' '}
                <input type="text" name="nome" required placeholder="Seu nome" style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.14)", borderRadius: "12px", padding: "14px 16px", fontSize: "15px", color: "#fff", fontFamily: "inherit" }} />
              </label>
              <label style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "13.5px", color: "rgba(255,255,255,.7)" }}>
                Empresa{' '}
                <input type="text" name="empresa" required placeholder="Nome da empresa" style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.14)", borderRadius: "12px", padding: "14px 16px", fontSize: "15px", color: "#fff", fontFamily: "inherit" }} />
              </label>
            </div>
            <div className="dg-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "22px" }}>
              <label style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "13.5px", color: "rgba(255,255,255,.7)" }}>
                E-mail{' '}
                <input type="email" name="email" required placeholder="voce@empresa.com.br" style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.14)", borderRadius: "12px", padding: "14px 16px", fontSize: "15px", color: "#fff", fontFamily: "inherit" }} />
              </label>
              <label style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "13.5px", color: "rgba(255,255,255,.7)" }}>
                WhatsApp{' '}
                <input type="tel" name="whatsapp" required placeholder="(49) 9 9999-9999" style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.14)", borderRadius: "12px", padding: "14px 16px", fontSize: "15px", color: "#fff", fontFamily: "inherit" }} />
              </label>
            </div>
            <label style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "13.5px", color: "rgba(255,255,255,.7)" }}>
              Onde sua operação mais trava hoje?{' '}
              <textarea name="mensagem" rows={4} required placeholder="Conte em poucas linhas — ex.: atendimento demora, planilhas manuais, retrabalho entre sistemas…" style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.14)", borderRadius: "12px", padding: "14px 16px", fontSize: "15px", color: "#fff", fontFamily: "inherit", resize: "vertical" }} />
            </label>
            <label style={{ display: "flex", alignItems: "flex-start", gap: "12px", fontSize: "13.5px", lineHeight: "1.55", color: "rgba(255,255,255,.6)", cursor: "pointer" }}>
              <input type="checkbox" name="lgpd" required style={{ marginTop: "2px", width: "16px", height: "16px", accentColor: "#465fff" }} />
              <span>
                Autorizo o uso dos meus dados para retorno deste contato, conforme a{' '}
                <a href="/politica-de-privacidade" style={{ color: "#8b9bff" }}>
                  Política de privacidade
                </a>
                .
              </span>
            </label>
            <button className="dg-h4" type="submit" style={{ background: "#465fff", color: "#fff", border: "none", fontSize: "15.5px", fontWeight: "500", fontFamily: "inherit", padding: "16px 32px", borderRadius: "100px", cursor: "pointer", marginTop: "6px" }}>
              Enviar mensagem
            </button>
          </form>
        )}
      </div>
    </div>
    </>
  );
}
