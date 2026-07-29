'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { startReveal } from '@/lib/reveal-script';

/* Fase 2 do scroll reveal: roda depois da hidratação (para não divergir do HTML
   do servidor) e a cada navegação client-side, quando o DOM é trocado. */
export default function Reveal() {
  const pathname = usePathname();

  useEffect(() => {
    startReveal();
  }, [pathname]);

  return null;
}
