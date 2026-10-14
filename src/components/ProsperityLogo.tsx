import React, { useState } from 'react';

interface LogoProps {
  variant?: 'full' | 'compact' | 'icon' | 'badge';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  onClick?: () => void;
}

/**
 * Prosperity Tire Center Official Brand Logo
 * - Strictly NO border, NO bounding box, NO outer stroke container
 * - ONLY the official logo emblem as attached by the user
 * - Significantly bigger for strong brand prominence
 */
export const ProsperityLogo: React.FC<LogoProps> = ({
  size = 'md',
  className = '',
  onClick,
}) => {
  const [imageError, setImageError] = useState(false);
  const logoSrc = '/src/assets/images/prosperity_tire_logo_1791972075979.jpg';

  // Significantly larger standalone dimensions without borders
  const sizeClasses = {
    sm: 'w-16 h-16 sm:w-20 sm:h-20',
    md: 'w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32',
    lg: 'w-32 h-32 sm:w-36 sm:h-36 md:w-44 md:h-44',
    xl: 'w-44 h-44 sm:w-52 sm:h-52 md:w-64 md:h-64',
  }[size];

  return (
    <div
      onClick={onClick}
      className={`relative inline-flex items-center justify-center shrink-0 select-none group transition-transform duration-200 hover:scale-105 cursor-pointer ${className}`}
      title="Prosperity Tire Center - Official Brand Logo"
    >
      {/* ONLY the standalone logo - NO container borders, NO outline boxes, NO background framing */}
      <div className={`relative ${sizeClasses} flex items-center justify-center overflow-visible`}>
        {!imageError ? (
          <img
            src={logoSrc}
            alt="Prosperity Tire Center Official Logo"
            className="w-full h-full object-contain filter drop-shadow-[0_4px_16px_rgba(0,0,0,0.5)]"
            onError={() => setImageError(true)}
            referrerPolicy="no-referrer"
          />
        ) : (
          /* Pure vector SVG fallback with NO border and NO background box */
          <svg
            viewBox="0 0 200 200"
            className="w-full h-full filter drop-shadow-[0_4px_16px_rgba(0,0,0,0.5)]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="roadGrad" x1="40" y1="170" x2="160" y2="80" gradientUnits="userSpaceOnUse">
                <stop stopColor="#10b981" />
                <stop offset="0.5" stopColor="#22c55e" />
                <stop offset="1" stopColor="#15803d" />
              </linearGradient>
              <linearGradient id="rimGrad" x1="70" y1="60" x2="140" y2="130" gradientUnits="userSpaceOnUse">
                <stop stopColor="#f8fafc" />
                <stop offset="0.5" stopColor="#94a3b8" />
                <stop offset="1" stopColor="#334155" />
              </linearGradient>
              <linearGradient id="leafGrad" x1="140" y1="70" x2="180" y2="100" gradientUnits="userSpaceOnUse">
                <stop stopColor="#4ade80" />
                <stop offset="1" stopColor="#15803d" />
              </linearGradient>
              <filter id="greenGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Top Badge: "PROSPERITY" */}
            <g transform="translate(25, 12)">
              <rect x="0" y="0" width="150" height="32" rx="6" fill="#0f172a" stroke="#22c55e" strokeWidth="2.5" />
              <text
                x="75"
                y="22"
                textAnchor="middle"
                fill="#ffffff"
                fontSize="15.5"
                fontWeight="900"
                fontFamily="system-ui, -apple-system, sans-serif"
                letterSpacing="2"
              >
                PROSPERITY
              </text>
            </g>

            {/* Tire Tread Outer Ring */}
            <g transform="translate(10, 5)">
              <ellipse cx="90" cy="98" rx="54" ry="46" fill="#18181b" stroke="#3f3f46" strokeWidth="6" />
              {/* Radial tread notches */}
              <path d="M40 85 L46 87 M38 95 L44 96 M40 106 L46 104 M45 116 L50 113 M54 126 L58 121 M65 134 L69 127" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" />

              {/* Alloy Rim (Silver Multi-Spoke) */}
              <ellipse cx="94" cy="98" rx="34" ry="30" fill="#020617" stroke="url(#rimGrad)" strokeWidth="5" />
              <circle cx="94" cy="98" r="9" fill="url(#rimGrad)" />
              {/* 5 Spoke Lines */}
              <path d="M94 89 L94 72 M102 94 L118 86 M99 104 L112 118 M88 104 L74 116 M86 93 L71 85" stroke="url(#rimGrad)" strokeWidth="4.5" strokeLinecap="round" />
            </g>

            {/* Winding Emerald Road curving out from center */}
            <path
              d="M 94 95 C 105 105, 118 120, 126 138 C 132 152, 138 162, 138 168 L 102 168 C 102 160, 99 148, 93 134 C 88 122, 85 112, 94 95 Z"
              fill="url(#roadGrad)"
              filter="url(#greenGlow)"
            />
            {/* Dashed white center road lane stripe */}
            <path
              d="M 94 98 C 102 112, 110 132, 120 166"
              stroke="#ffffff"
              strokeWidth="3.5"
              strokeDasharray="6 5"
              fill="none"
              strokeLinecap="round"
            />

            {/* Eco Leaf on right side */}
            <g transform="translate(142, 75)">
              <path
                d="M 0 25 C 0 5, 20 0, 32 0 C 32 18, 22 36, 4 36 C 1 36, 0 32, 0 25 Z"
                fill="url(#leafGrad)"
                stroke="#86efac"
                strokeWidth="1.5"
              />
              <path d="M 4 28 C 12 20, 20 12, 28 4" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
            </g>

            {/* Bottom Banner: "TIRE CENTER" */}
            <g transform="translate(32, 154)">
              <rect x="0" y="0" width="136" height="30" rx="6" fill="#020617" stroke="#22c55e" strokeWidth="2.5" />
              <text
                x="68"
                y="20"
                textAnchor="middle"
                fill="#22c55e"
                fontSize="13"
                fontWeight="900"
                fontFamily="system-ui, -apple-system, sans-serif"
                letterSpacing="2.5"
              >
                TIRE CENTER
              </text>
            </g>
          </svg>
        )}
      </div>
    </div>
  );
};
