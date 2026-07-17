import { ImageResponse } from 'next/og';

export const alt = 'QivaLabs — Full-Service Software & Digital Solutions | Udaipur, India';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0A1628',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '72px 80px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Teal glow top-right */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            right: '-100px',
            width: '600px',
            height: '600px',
            borderRadius: '9999px',
            background: 'radial-gradient(circle, rgba(11,155,170,0.35) 0%, transparent 70%)',
            display: 'flex',
          }}
        />

        {/* Logo mark */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #0B9BAA 0%, #16C4D6 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px',
              fontWeight: '800',
              color: '#0A1628',
            }}
          >
            Q
          </div>
          <span
            style={{
              fontSize: '28px',
              fontWeight: '700',
              color: '#ffffff',
              letterSpacing: '-0.5px',
            }}
          >
            QivaLabs
          </span>
        </div>

        {/* Main headline — flex row so both text spans are valid flex children */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'baseline',
            fontSize: '56px',
            fontWeight: '800',
            lineHeight: 1.1,
            marginBottom: '24px',
            maxWidth: '780px',
          }}
        >
          <span style={{ color: '#ffffff' }}>Business badho,&nbsp;</span>
          <span
            style={{
              background: 'linear-gradient(135deg, #0B9BAA, #16C4D6)',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            cost nahi.
          </span>
        </div>

        {/* Sub text */}
        <div
          style={{
            display: 'flex',
            fontSize: '22px',
            color: '#8BAFC0',
            maxWidth: '700px',
            lineHeight: 1.5,
            marginBottom: '48px',
          }}
        >
          Custom software · Mobile apps · AI automation · Digital marketing
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
          }}
        >
          <div
            style={{
              display: 'flex',
              padding: '10px 24px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #0B9BAA, #16C4D6)',
              fontSize: '16px',
              fontWeight: '700',
              color: '#0A1628',
            }}
          >
            qivalabs.com
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: '15px',
              color: '#4A6E80',
            }}
          >
            Udaipur, Rajasthan · Serving businesses across India
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
