interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  as?: 'section' | 'div' | 'article';
  tight?: boolean;
  style?: React.CSSProperties;
}

export default function SectionWrapper({
  children,
  className = '',
  id,
  as: Tag = 'section',
  tight = false,
  style,
}: SectionWrapperProps) {
  return (
    <Tag id={id} style={style} className={`${tight ? 'py-12' : 'py-20 md:py-24'} ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </Tag>
  );
}

export function SectionHeader({
  tag,
  h2,
  description,
  center = false,
}: {
  tag?: string;
  h2: string;
  description?: string;
  center?: boolean;
}) {
  return (
    <div className={`mb-12 ${center ? 'text-center' : ''}`}>
      {tag && <span className="tag mb-4 inline-flex">{tag}</span>}
      <h2
        className="font-bold leading-tight mb-4"
        style={{
          fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif',
          fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
          color: '#ffffff',
        }}
      >
        {h2}
      </h2>
      {description && (
        <p
          className="text-lg leading-relaxed max-w-2xl"
          style={{
            color: '#8BAFC0',
            marginLeft: center ? 'auto' : undefined,
            marginRight: center ? 'auto' : undefined,
          }}
        >
          {description}
        </p>
      )}
    </div>
  );
}
