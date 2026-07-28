import { renderOgImage, OG_SIZE } from '@/lib/og-image';
import { PAGES } from '@/lib/site';

export const size = OG_SIZE;
export const contentType = 'image/png';
export const alt = PAGES['agentes-de-ia'].title;

export default function Image() {
  return renderOgImage(PAGES['agentes-de-ia'].h1, PAGES['agentes-de-ia'].description);
}
