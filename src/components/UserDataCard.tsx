'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';

export default function UserDataCard() {
  const { user } = useAuth();
  const { t } = useLanguage();

  if (!user) {
    return (
      <div className="w-full max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">
            {t('userCard.noUserTitle')}
          </h2>
          <p className="text-gray-500">
            {t('userCard.noUserMessage')}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-[#00B5E2] to-[#008bbd] p-6">
          <h2 className="text-2xl font-bold text-white mb-2">
            {t('userCard.title')}
          </h2>
          <p className="text-blue-100">
            {t('userCard.subtitle')}
          </p>
        </div>

        <div className="p-6">
          <div className="bg-gray-50 rounded-lg p-4 border">
            <pre className="text-sm text-gray-800 overflow-x-auto whitespace-pre-wrap break-words">
              {JSON.stringify(user, null, 2)}
            </pre>
          </div>
        </div>

        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="mb-2 sm:mb-0">
              <p className="text-sm font-medium text-gray-700">
                {t('userCard.welcomeMessage', { name: user.nombre })}
              </p>
              <p className="text-xs text-gray-500">
                {user.email}
              </p>
            </div>
            <div className="text-xs text-gray-400">
              {t('userCard.dataFormat')}: JSON
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
