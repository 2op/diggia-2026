import type { Metadata } from 'next';
import PageContent from '@/components/sections/index';
import JsonLd from '@/components/JsonLd';
import { PAGES, pageUrl, serviceJsonLd, faqJsonLd, breadcrumbJsonLd } from '@/lib/site';

const page = PAGES['home'];

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  alternates: { canonical: pageUrl(page.slug) },
  openGraph: {
    title: page.title,
    description: page.description,
    url: pageUrl(page.slug),
    siteName: 'Diggia AI',
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: page.title,
    description: page.description,
  },
};

export default function Page() {
  return (
    <>
      <JsonLd data={serviceJsonLd(page)} />
      <JsonLd data={faqJsonLd(page)} />
      <JsonLd data={breadcrumbJsonLd(page)} />
      <PageContent />
    </>
  );
}
