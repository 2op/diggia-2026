import { ImageResponse } from 'next/og';

export const OG_SIZE = { width: 1200, height: 630 };

/** Gera a imagem Open Graph padrão do site para um título de página. */
export function renderOgImage(title: string, subtitle?: string) {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#000',
          color: '#fff',
          padding: 72,
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -220,
            left: 340,
            width: 520,
            height: 520,
            borderRadius: 9999,
            background: '#465fff',
            opacity: 0.35,
            filter: 'blur(120px)',
          }}
        />
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 18, height: 18, borderRadius: 9999, background: '#465fff' }} />
          <div style={{ fontSize: 34, fontWeight: 700, letterSpacing: -0.5 }}>Diggia AI</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ fontSize: 64, fontWeight: 700, letterSpacing: -1.5, lineHeight: 1.15, maxWidth: 1000 }}>
            {title}
          </div>
          {subtitle ? (
            <div style={{ fontSize: 28, color: 'rgba(255,255,255,.65)', maxWidth: 950, lineHeight: 1.4 }}>
              {subtitle}
            </div>
          ) : null}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 24, color: 'rgba(255,255,255,.55)' }}>
          <div>Inteligência Artificial para PMEs</div>
          <div>diggia.com.br</div>
        </div>
      </div>
    ),
    OG_SIZE
  );
}
