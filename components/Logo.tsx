import Link from 'next/link';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showWordmark?: boolean;
  href?: string;
  className?: string;
}

const SIZES = {
  sm: { mark: 28, text: 'text-lg' },
  md: { mark: 36, text: 'text-xl' },
  lg: { mark: 52, text: 'text-3xl' },
};

export function LogoMark({ size = 36, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={Math.round(size * 1.2)}
      viewBox="0 0 40 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="qiva-upper" x1="0" y1="0" x2="40" y2="24" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0B9BAA" />
          <stop offset="100%" stopColor="#16C4D6" />
        </linearGradient>
        <linearGradient id="qiva-lower" x1="0" y1="24" x2="40" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0B9BAA" />
          <stop offset="100%" stopColor="#0B3A4A" />
        </linearGradient>
      </defs>
      {/* Upper facet — bright teal */}
      <polygon points="0,0 40,24 0,24" fill="url(#qiva-upper)" />
      {/* Lower facet — deep petrol */}
      <polygon points="0,24 40,24 0,48" fill="url(#qiva-lower)" />
      {/* Silver-white inner catching-light facet */}
      <polygon points="0,4 30,22 0,20" fill="#E8EEF0" opacity="0.22" />
    </svg>
  );
}

export default function Logo({
  size = 'md',
  showWordmark = true,
  href = '/',
  className = '',
}: LogoProps) {
  const { mark, text } = SIZES[size];

  const inner = (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <LogoMark size={mark} />
      {showWordmark && (
        <span
          className={`font-bold tracking-tight leading-none ${text}`}
          style={{
            fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif',
            color: '#FFFFFF',
          }}
        >
          Qiva<span style={{ color: '#16C4D6' }}>Labs</span>
        </span>
      )}
    </span>
  );

  if (!href) return inner;

  return (
    <Link href={href} className="flex items-center" aria-label="QivaLabs — Home">
      {inner}
    </Link>
  );
}
