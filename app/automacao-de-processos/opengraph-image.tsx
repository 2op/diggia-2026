import { renderOgImage, OG_SIZE } from '@/lib/og-image';
import { PAGES } from '@/lib/site';

export const size = OG_SIZE;
export const contentType = 'image/png';
export const alt = PAGES['automacao-de-processos'].title;

export default function Image() {
  return renderOgImage(PAGES['automacao-de-processos'].h1, PAGES['automacao-de-processos'].description);
}
