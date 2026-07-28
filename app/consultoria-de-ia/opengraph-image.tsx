import { renderOgImage, OG_SIZE } from '@/lib/og-image';
import { PAGES } from '@/lib/site';

export const size = OG_SIZE;
export const contentType = 'image/png';
export const alt = PAGES['consultoria-de-ia'].title;

export default function Image() {
  return renderOgImage(PAGES['consultoria-de-ia'].h1, PAGES['consultoria-de-ia'].description);
}
