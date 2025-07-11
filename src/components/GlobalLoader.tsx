'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';

interface GlobalLoaderProps {
  isVisible: boolean;
}

const HumanoLoader = ({ duration = 2500, text = 'Humano', fillColor = '#00B5E2', initialColor = '#c0c0c0' }) => {
  const [isFilled, setIsFilled] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFilled(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []); 

  return (
    <div
      className={`font-sans font-extrabold text-6xl md:text-7xl lg:text-8xl rounded-lg`}
      style={{
        lineHeight: 1,
        color: initialColor,
        backgroundImage: `linear-gradient(to top, ${fillColor} 50%, transparent 50%)`,
        backgroundSize: '100% 200%', 
        backgroundPosition: isFilled ? '0% 100%' : '0% 0%',
        WebkitBackgroundClip: 'text', 
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent', 
        transition: `background-position ${duration / 1000}s ease-out`,
      }}
    >
      {text}
    </div>
  );
};

export default function GlobalLoader({ isVisible }: GlobalLoaderProps) {
  const { t } = useLanguage();

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-[#F5F7FA] dark:bg-gray-900 z-[9999] flex items-center justify-center transition-opacity duration-300">
      <div className="absolute inset-0 bg-gradient-to-br from-[#00B5E2]/5 to-[#008bbd]/5 dark:from-blue-500/5 dark:to-blue-700/5"></div>
      
      <div className="relative z-10 text-center">
        <div className="mb-8">
          <HumanoLoader 
            duration={2000}
            text="Humano"
            fillColor="#00B5E2"
            initialColor="#d1d5db"
          />
        </div>
        
        <div className="space-y-2">
          <p className="text-sm text-gray-600 dark:text-gray-400 animate-pulse">
            {t('common.preparingExperience')}
          </p>
        </div>
        
        <div className="flex justify-center space-x-1 mt-6">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-[#00B5E2] dark:bg-blue-500 rounded-full animate-pulse"
              style={{
                animationDelay: `${i * 0.2}s`,
                animationDuration: '1s'
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}
