import React from 'react';
// @ts-ignore
import logoUrl from '../assets/images/tastai_logo_1779971055394.png';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  // Standard props kept for backwards compatibility with previous caller params
  mode?: 'light' | 'dark';
  variant?: 'full' | 'icon' | 'text';
}

export default function Logo({ className = '', size = 'md' }: LogoProps) {
  const heights = {
    sm: 'h-10 sm:h-12',
    md: 'h-14 sm:h-16',
    lg: 'h-24 sm:h-28',
  };

  return (
    <div className={`flex items-center shrink-0 ${className}`} id="brand-logo-img-container">
      <img
        src={logoUrl}
        alt="Tastai Safaris"
        className={`${heights[size]} w-auto object-contain select-none transition-transform duration-300 hover:scale-105`}
        referrerPolicy="no-referrer"
      />
    </div>
  );
}
