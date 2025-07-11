'use client';

import React from 'react';
import { Toaster } from 'react-hot-toast';

export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={8}
      containerClassName=""
      containerStyle={{}}
      toastOptions={{
        className: '',
        duration: 4000,
        style: {
          background: '#363636',
          color: '#fff',
          borderRadius: '8px',
          fontSize: '14px',
          maxWidth: '400px',
          padding: '12px 16px',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
        },
        
        success: {
          duration: 4000,
          iconTheme: {
            primary: '#10B981',
            secondary: '#FFFFFF',
          },
          style: {
            background: '#10B981',
            color: '#FFFFFF',
          },
        },
        
        error: {
          duration: 5000,
          iconTheme: {
            primary: '#EF4444',
            secondary: '#FFFFFF',
          },
          style: {
            background: '#EF4444',
            color: '#FFFFFF',
          },
        },
        
        loading: {
          duration: Infinity,
          iconTheme: {
            primary: '#3B82F6',
            secondary: '#FFFFFF',
          },
          style: {
            background: '#3B82F6',
            color: '#FFFFFF',
          },
        },
      }}
    />
  );
}
