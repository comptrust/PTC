import React, { useState, useEffect, useRef } from 'react';
import prosperityLogoPng from '../assets/images/prosperity_logo.png';

interface LogoProps {
  variant?: 'full' | 'compact' | 'icon' | 'badge';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  onClick?: () => void;
  allowUpload?: boolean;
}

/**
 * Prosperity Tire Center Official Brand Logo
 * - Uses 100% transparent, trimmed PNG
 * - Zero external text after the logo emblem
 * - High-definition rendering with subtle automotive drop shadow
 * - Supports instant live logo replacement via file upload (saved in localStorage)
 */
export const ProsperityLogo: React.FC<LogoProps> = ({
  size = 'md',
  className = '',
  onClick,
  allowUpload = true,
}) => {
  const [imgError, setImgError] = useState(false);
  const [customLogo, setCustomLogo] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('prosperity_custom_logo');
      if (saved) {
        setCustomLogo(saved);
      }
    } catch {
      // Ignore localStorage restrictions if any
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setCustomLogo(result);
        try {
          localStorage.setItem('prosperity_custom_logo', result);
        } catch {
          // ignore storage quota
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Generous, prominent yet balanced sizing matching the uploaded badge
  const sizeClasses = {
    sm: 'h-10 sm:h-12 w-auto max-w-[150px]',
    md: 'h-14 sm:h-16 md:h-20 w-auto max-w-[240px]',
    lg: 'h-24 sm:h-28 md:h-36 w-auto max-w-[340px]',
    xl: 'h-36 sm:h-44 md:h-56 w-auto max-w-[460px]',
  }[size];

  const currentSrc = customLogo || (imgError ? '/PTC Logo.png' : prosperityLogoPng);

  return (
    <div
      onClick={onClick}
      className={`relative inline-flex items-center justify-center shrink-0 select-none group transition-transform duration-300 hover:scale-105 cursor-pointer bg-transparent ${className}`}
      title="Prosperity Tire Center - Official Brand Logo"
    >
      <img
        src={currentSrc}
        alt="PTC Logo"
        className={`${sizeClasses} object-contain filter drop-shadow-[0_8px_24px_rgba(0,0,0,0.6)] transition-all`}
        referrerPolicy="no-referrer"
        onError={() => setImgError(true)}
      />

      {allowUpload && (
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/svg+xml"
          className="hidden"
          onChange={handleFileChange}
        />
      )}
    </div>
  );
};
