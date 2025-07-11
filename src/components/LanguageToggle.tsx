'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function LanguageToggle() {
  const { language, toggleLanguage, t } = useLanguage();

  const handleToggle = () => {
    console.log('🌐 Idioma actual:', language);
    toggleLanguage();
    console.log('🔄 Cambiando idioma...');
  };

  return (
    <button
      onClick={handleToggle}
      className="p-2 rounded-md text-white hover:bg-[#008bbd] dark:hover:bg-[#009dd6] transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#00B5E2] dark:focus:ring-offset-gray-800"
      aria-label={t('language.selectLanguage')}
      title={t('language.currentLanguage', { language: language === 'es' ? t('language.spanish') : t('language.english') })}
    >
      {language === 'es' ? (
        <div className="flex items-center space-x-1">
          <span className="text-sm font-semibold">ES</span>
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
            <rect x="2" y="6" width="20" height="3" fill="#c60b1e"/>
            <rect x="2" y="9" width="20" height="6" fill="#ffc400"/>
            <rect x="2" y="15" width="20" height="3" fill="#c60b1e"/>
          </svg>
        </div>
      ) : (
        <div className="flex items-center space-x-1">
          <span className="text-sm font-semibold">EN</span>
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
            <rect x="2" y="6" width="20" height="12" fill="#b22234"/>
            <rect x="2" y="6" width="20" height="1" fill="white"/>
            <rect x="2" y="8" width="20" height="1" fill="white"/>
            <rect x="2" y="10" width="20" height="1" fill="white"/>
            <rect x="2" y="12" width="20" height="1" fill="white"/>
            <rect x="2" y="14" width="20" height="1" fill="white"/>
            <rect x="2" y="16" width="20" height="1" fill="white"/>
            <rect x="2" y="6" width="8" height="6" fill="#3c3b6e"/>
          </svg>
        </div>
      )}
    </button>
  );
}
