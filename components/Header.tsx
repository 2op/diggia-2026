'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { whatsappUrl, WHATSAPP_DEFAULT_MESSAGE } from '@/lib/site';

const WHATSAPP = whatsappUrl(WHATSAPP_DEFAULT_MESSAGE);

const NAV = [
  { href: '/automacao-de-processos', label: 'Automação de processos' },
  { href: '/agentes-de-ia', label: 'Agentes de IA' },
  { href: '/consultoria-de-ia', label: 'Consultoria de IA' },
  { href: '/sobre', label: 'Sobre' },
];

const navLink = { color: 'rgba(255,255,255,.72)', textDecoration: 'none', fontSize: '14.5px' } as const;

export default function Header() {
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

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

  // fecha o menu ao trocar de página
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header className={`dg-header${hidden && !open ? ' dg-header--hidden' : ''}`}>
      <div
        className="dg-container"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, padding: '20px var(--px)' }}
      >
        <Link href="/" style={{ display: 'block' }} aria-label="Diggia AI, página inicial">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="Diggia AI" width={120} height={32} style={{ height: 32, width: 'auto', display: 'block' }} />
        </Link>
        <nav style={{ display: 'flex', alignItems: 'center', gap: 32 }} aria-label="Navegação principal">
          <span className="dg-nav-links" style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
            {NAV.map((item) => (
              <Link key={item.href} className="dg-h5" href={item.href} style={navLink}>
                {item.label}
              </Link>
            ))}
          </span>
          <a
            className="dg-h1 dg-header-cta"
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            style={{ background: '#465fff', color: '#fff', textDecoration: 'none', fontSize: '14.5px', fontWeight: 500, padding: '11px 24px', borderRadius: 100, whiteSpace: 'nowrap' }}
          >
            Fale conosco
          </a>
          <button
            type="button"
            className="dg-burger"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={open}
            aria-controls="dg-mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <span className={`dg-burger-icon${open ? ' is-open' : ''}`} aria-hidden="true">
              <span />
              <span />
            </span>
          </button>
        </nav>
      </div>

      <div id="dg-mobile-nav" className={`dg-mobile-nav${open ? ' is-open' : ''}`} hidden={!open}>
        {NAV.map((item) => (
          <Link key={item.href} href={item.href} className="dg-mobile-link">
            {item.label}
          </Link>
        ))}
        <Link href="/contato" className="dg-mobile-link">
          Contato
        </Link>
      </div>
    </header>
  );
}
