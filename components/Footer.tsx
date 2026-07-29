export default function Footer() {
  return (
  <footer style={{ borderTop: "1px solid rgba(255,255,255,.08)" }}>
  <div className="dg-container" style={{ padding: "64px var(--px) 40px" }}>
    <div className="dg-grid" style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1.2fr", gap: "48px" }}>
      <div>
        <img src="/logo.svg" alt="Diggia AI" style={{ height: "30px", display: "block" }} />
        <p style={{ margin: "16px 0 0", fontSize: "14px", color: "rgba(255,255,255,.55)" }}>
          Think big, start small, grow fast
        </p>
        {/* Ícones de redes sociais — reativar quando os perfis existirem.
            São Instagram, Facebook e LinkedIn; envolver cada <span> num <a>
            com o href do perfil ao reativar.
        <div style={{ display: "flex", gap: "14px", marginTop: "22px" }}>
          <span style={{ width: "36px", height: "36px", border: "1px solid rgba(255,255,255,.18)", borderRadius: "100px", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.65)" strokeWidth="1.6">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.2" cy="6.8" r="1" fill="rgba(255,255,255,.65)" stroke="none" />
            </svg>
          </span>
          <span style={{ width: "36px", height: "36px", border: "1px solid rgba(255,255,255,.18)", borderRadius: "100px", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.65)" strokeWidth="1.6">
              <path d="M14 8h3V4.5h-3A3.5 3.5 0 0 0 10.5 8v3H8v3.5h2.5V21H14v-6.5h3L17.5 11H14V8z" />
            </svg>
          </span>
          <span style={{ width: "36px", height: "36px", border: "1px solid rgba(255,255,255,.18)", borderRadius: "100px", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.65)" strokeWidth="1.6">
              <rect x="3" y="3" width="18" height="18" rx="3" />
              <path d="M7 10.5V17M7 7.2v.1M11 17v-4a2.2 2.2 0 0 1 4.4 0v4" />
            </svg>
          </span>
        </div>
        */}
      </div>
      <div>
        <div style={{ fontSize: "12.5px", letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(255,255,255,.45)", marginBottom: "16px" }}>
          Soluções
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "14.5px" }}>
          <a className="dg-h5" href="/automacao-de-processos" style={{ color: "rgba(255,255,255,.72)", textDecoration: "none" }}>
            Automação de processos
          </a>
          <a className="dg-h5" href="/agentes-de-ia" style={{ color: "rgba(255,255,255,.72)", textDecoration: "none" }}>
            Agentes de IA
          </a>
          <a className="dg-h5" href="/consultoria-de-ia" style={{ color: "rgba(255,255,255,.72)", textDecoration: "none" }}>
            Consultoria de IA
          </a>
        </div>
      </div>
      <div>
        <div style={{ fontSize: "12.5px", letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(255,255,255,.45)", marginBottom: "16px" }}>
          Empresa
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "14.5px" }}>
          <a className="dg-h5" href="/sobre" style={{ color: "rgba(255,255,255,.72)", textDecoration: "none" }}>
            Sobre
          </a>
          <a className="dg-h5" href="/contato" style={{ color: "rgba(255,255,255,.72)", textDecoration: "none" }}>
            Contato
          </a>
          <a className="dg-h5" href="/politica-de-privacidade" style={{ color: "rgba(255,255,255,.72)", textDecoration: "none" }}>
            Política de privacidade
          </a>
        </div>
      </div>
      <div>
        <div style={{ fontSize: "12.5px", letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(255,255,255,.45)", marginBottom: "16px" }}>
          Contato
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "14.5px", color: "rgba(255,255,255,.72)" }}>
          <span>
            (49) 99928-9840
          </span>
          <span>
            contato@diggia.com.br
          </span>
          <span>
            R. Araguaia 494, Colatto, Xanxerê - SC
          </span>
        </div>
      </div>
    </div>
    <div style={{ borderTop: "1px solid rgba(255,255,255,.08)", marginTop: "48px", paddingTop: "24px", display: "flex", flexWrap: "wrap", gap: "8px 24px", justifyContent: "space-between", fontSize: "13.5px", color: "rgba(255,255,255,.5)" }}>
      <span>
        Uma empresa do grupo{' '}
        <a href="https://2op.com.br" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255, 255, 255, 0.75)", fontWeight: "500", textDecoration: "none" }}>
          2op Digital
        </a>
        {' '}- 18 anos, +200 clientes
      </span>
      <span>
        © 2026 Diggia AI
      </span>
    </div>
  </div>
  </footer>
  );
}
