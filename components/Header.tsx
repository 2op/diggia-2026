'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const WHATSAPP =
  'https://wa.me/5549999289840?text=Ol%C3%A1!%20Vim%20do%20site%20da%20Diggia%20e%20quero%20entender%20como%20a%20IA%20pode%20ajudar%20minha%20empresa.';

const navLink = { color: 'rgba(255,255,255,.72)', textDecoration: 'none', fontSize: '14.5px' } as const;

export default function Header() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (y < 80) setHidden(false);
        else if (y > lastY + 4) setHidden(true);
        else if (y < lastY - 4) setHidden(false);
        lastY = y;
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`dg-header${hidden ? ' dg-header--hidden' : ''}`}>
      <div
        className="dg-container"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px var(--px)' }}
      >
        <Link href="/" style={{ display: 'block' }} aria-label="Diggia AI — página inicial">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="Diggia AI" width={120} height={32} style={{ height: 32, width: 'auto', display: 'block' }} />
        </Link>
        <nav style={{ display: 'flex', alignItems: 'center', gap: 32 }} aria-label="Navegação principal">
          <span className="dg-nav-links" style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
            <Link className="dg-h5" href="/automacao-de-processos" style={navLink}>Automação de processos</Link>
            <Link className="dg-h5" href="/agentes-de-ia" style={navLink}>Agentes de IA</Link>
            <Link className="dg-h5" href="/consultoria-de-ia" style={navLink}>Consultoria de IA</Link>
            <Link className="dg-h5" href="/sobre" style={navLink}>Sobre</Link>
          </span>
          <a
            className="dg-h1"
            href={WHATSAPP}
            style={{ background: '#465fff', color: '#fff', textDecoration: 'none', fontSize: '14.5px', fontWeight: 500, padding: '11px 24px', borderRadius: 100 }}
          >
            Fale conosco
          </a>
        </nav>
      </div>
    </header>
  );
}
