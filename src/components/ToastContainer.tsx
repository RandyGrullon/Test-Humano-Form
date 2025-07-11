'use client';

import React from 'react';
import { useToast } from '@/context/ToastContext';

export default function ToastContainer() {
  const { toasts, removeToast } = useToast();

  const getToastIcon = (type: string) => {
    switch (type) {
      case 'success':
        return (
          <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        );
      case 'error':
        return (
          <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        );
      case 'warning':
        return (
          <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        );
      case 'info':
      default:
        return (
          <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        );
    }
  };

  const getToastStyles = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 dark:bg-green-900 border-green-200 dark:border-green-700';
      case 'error':
        return 'bg-red-50 dark:bg-red-900 border-red-200 dark:border-red-700';
      case 'warning':
        return 'bg-yellow-50 dark:bg-yellow-900 border-yellow-200 dark:border-yellow-700';
      case 'info':
      default:
        return 'bg-blue-50 dark:bg-blue-900 border-blue-200 dark:border-blue-700';
    }
  };

  const getTextStyles = (type: string) => {
    switch (type) {
      case 'success':
        return 'text-green-800 dark:text-green-200';
      case 'error':
        return 'text-red-800 dark:text-red-200';
      case 'warning':
        return 'text-yellow-800 dark:text-yellow-200';
      case 'info':
      default:
        return 'text-blue-800 dark:text-blue-200';
    }
  };

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-16 sm:top-20 right-2 sm:right-4 z-50 space-y-2 max-w-xs sm:max-w-sm w-full px-2 sm:px-0">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`
            ${getToastStyles(toast.type)}
            border rounded-lg p-3 sm:p-4 shadow-lg transform transition-all duration-300 ease-in-out
            animate-slide-in-right
          `}
          role="alert"
        >
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <div className="w-4 h-4 sm:w-5 sm:h-5">
                {getToastIcon(toast.type)}
              </div>
            </div>
            <div className="ml-2 sm:ml-3 flex-1 min-w-0">
              <h4 className={`text-xs sm:text-sm font-medium ${getTextStyles(toast.type)} truncate`}>
                {toast.title}
              </h4>
              {toast.message && (
                <p className={`mt-1 text-xs sm:text-sm ${getTextStyles(toast.type)} opacity-90 line-clamp-3`}>
                  {toast.message}
                </p>
              )}
            </div>
            <button
              type="button"
              className={`
                ml-4 inline-flex flex-shrink-0 rounded-md p-1.5 
                ${getTextStyles(toast.type)} 
                hover:bg-black hover:bg-opacity-10 dark:hover:bg-white dark:hover:bg-opacity-10
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-current
                transition-colors duration-200
              `}
              onClick={() => removeToast(toast.id)}
            >
              <span className="sr-only">Cerrar</span>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
