import { renderOgImage, OG_SIZE } from '@/lib/og-image';
import { PAGES } from '@/lib/site';

export const size = OG_SIZE;
export const contentType = 'image/png';
export const alt = PAGES['contato'].title;

export default function Image() {
  return renderOgImage(PAGES['contato'].h1, PAGES['contato'].description);
}
