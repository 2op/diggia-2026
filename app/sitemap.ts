import type { MetadataRoute } from 'next';
import { PAGES, pageUrl } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return Object.values(PAGES).map((page) => ({
    url: pageUrl(page.slug),
    lastModified,
    changeFrequency: page.slug === '' ? 'weekly' : 'monthly',
    priority: page.slug === '' ? 1 : page.slug === 'politica-de-privacidade' ? 0.3 : 0.8,
  }));
}
