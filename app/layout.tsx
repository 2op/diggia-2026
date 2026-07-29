import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Reveal from '@/components/Reveal';
import WhatsAppFab from '@/components/WhatsAppFab';
import { SITE_URL, SITE_NAME, PAGES, organizationJsonLd, localBusinessJsonLd } from '@/lib/site';
import { revealBootstrap } from '@/lib/reveal-script';
import './globals.css';
import './generated.css';
import './site.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: PAGES.home.title,
    template: `%s`,
  },
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  formatDetection: { telephone: false },
  // Os ícones vêm da convenção de arquivos: app/icon.svg, app/favicon.ico e
  // app/apple-icon.png. Declarar `icons` aqui sobrescreveria os três.
};

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
};

const GTM_ID = 'GTM-M3H6VCSK';
const ADOPT_ID = '1fa182e9-a1bc-44fb-bfc2-4ff489f9df8b';

// Snippet oficial do GTM, com o ID injetado a partir da constante acima.
const GTM_SNIPPET = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        {/* ID do Adopt lido pelo injector. Os scripts (Adopt + GTM) são
            carregados via next/script no body — ver comentário lá. */}
        <meta name="adopt-website-id" content={ADOPT_ID} />
        <link
          rel="preload"
          href="/fonts/inter-tight-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/manrope-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
      </head>
      <body>
        {/* Google Tag Manager (noscript) — primeiro elemento do body. */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
            title="Google Tag Manager"
          />
        </noscript>
        {/* Adopt (CMP) antes do GTM: um gestor de consentimento nasce antes dos
            tags que ele controla, por isso NÃO fica dentro do GTM.
            beforeInteractive: o next/script injeta no <head> na ordem do código
            e cedo, fora da reconciliação do React (por isso o injector do Adopt
            pode mexer no <head> sem causar mismatch de hidratação). */}
        <Script
          src={`https://tag.goadopt.io/injector.js?website_code=${ADOPT_ID}`}
          strategy="beforeInteractive"
          className="adopt-injector"
        />
        <Script id="gtm-init" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: GTM_SNIPPET }} />
        <Header />
        <main className="dg-container">{children}</main>
        <Footer />
        {/* Fora de <main> e <footer> de propósito: o scroll reveal só varre
            esses dois, então o botão não entra na animação de entrada. */}
        <WhatsAppFab />
        {/* Roda ainda durante o parse do HTML — marca os alvos da animação
            antes da primeira pintura, sem piscar o conteúdo. */}
        <script dangerouslySetInnerHTML={{ __html: `(${revealBootstrap.toString()})()` }} />
        <Reveal />
      </body>
    </html>
  );
}
