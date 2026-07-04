'use client';

import { motion } from 'framer-motion';

export default function GeometricBackground() {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
      style={{ zIndex: 0 }}
    >
      {/* Animated teal blobs */}
      <div className="teal-blob teal-blob-1" />
      <div className="teal-blob teal-blob-2" />
      <div className="teal-blob teal-blob-3" />

      {/* Static geometric polygon shapes — echoing faceted logo */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        {/* Large background triangle — top-right */}
        <polygon
          points="1440,0 900,0 1440,500"
          fill="rgba(11, 155, 170, 0.035)"
        />
        {/* Mid triangle — bottom-left */}
        <polygon
          points="0,900 400,900 0,500"
          fill="rgba(11, 58, 74, 0.08)"
        />
        {/* Accent triangle — center-right */}
        <polygon
          points="1100,200 1440,400 1100,600"
          fill="rgba(22, 196, 214, 0.04)"
        />
        {/* Small accent — left */}
        <polygon
          points="0,300 180,200 180,400"
          fill="rgba(11, 155, 170, 0.06)"
        />
        {/* Diamond shape — upper center */}
        <polygon
          points="700,50 820,150 700,250 580,150"
          fill="rgba(22, 196, 214, 0.03)"
        />
      </svg>

      {/* Grid lines overlay — very subtle */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.03]"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <line
            key={`v${i}`}
            x1={i * 130}
            y1="0"
            x2={i * 130}
            y2="900"
            stroke="#0B9BAA"
            strokeWidth="0.5"
          />
        ))}
        {Array.from({ length: 8 }).map((_, i) => (
          <line
            key={`h${i}`}
            x1="0"
            y1={i * 130}
            x2="1440"
            y2={i * 130}
            stroke="#0B9BAA"
            strokeWidth="0.5"
          />
        ))}
      </svg>

      {/* Animated floating triangle — hero logo echo */}
      <motion.div
        className="absolute right-[8%] top-[15%] opacity-[0.07]"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
      >
        <svg width="320" height="384" viewBox="0 0 40 48" fill="none">
          <polygon points="0,0 40,24 0,24" fill="#0B9BAA" />
          <polygon points="0,24 40,24 0,48" fill="#0B3A4A" />
          <polygon points="0,4 30,22 0,20" fill="#E8EEF0" opacity="0.3" />
        </svg>
      </motion.div>

      {/* Small floating triangle — lower left */}
      <motion.div
        className="absolute left-[5%] bottom-[20%] opacity-[0.06]"
        animate={{ rotate: [0, -360] }}
        transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
      >
        <svg width="120" height="144" viewBox="0 0 40 48" fill="none">
          <polygon points="0,0 40,24 0,24" fill="#16C4D6" />
          <polygon points="0,24 40,24 0,48" fill="#0B3A4A" />
        </svg>
      </motion.div>
    </div>
  );
}
