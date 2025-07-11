'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { registerSchema, type RegisterFormData } from '@/lib/validationSchemas';

export default function FormularioRegistro() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      nombre: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  const translateError = (errorKey: string) => {
    return t(errorKey) || errorKey;
  };

  const onSubmit = async (data: RegisterFormData) => {
    setIsSubmitting(true);

    try {
      const loadingToast = toast.loading(t('common.processing'));

      const existingUser = localStorage.getItem('user');
      if (existingUser) {
        const userData = JSON.parse(existingUser);
        if (userData.email === data.email) {
          toast.dismiss(loadingToast);
          setError('email', {
            type: 'manual',
            message: t('validation.emailAlreadyExists')
          });
          setIsSubmitting(false);
          return;
        }
      }

      setTimeout(() => {
        const newUser = {
          nombre: data.nombre,
          email: data.email,
          password: data.password
        };
        localStorage.setItem('user', JSON.stringify(newUser));

        login({
          nombre: data.nombre,
          email: data.email,
          password: data.password
        });

        toast.dismiss(loadingToast);
        toast.success(t('notifications.registerSuccessMessage', { name: data.nombre }), {
          duration: 4000,
        });

        router.push('/?success=1');
      }, 1000);
    } catch {
      toast.error(t('notifications.registerError'));
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] dark:bg-gray-900 py-6 sm:py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-sm sm:max-w-md mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sm:p-8 transition-colors duration-300">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
              {t('auth.register')}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-300 transition-colors duration-300">
              {t('auth.registerSubtitle')}
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
            <div>
              <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors duration-300">
                {t('auth.name')}
              </label>
              <input
                type="text"
                id="nombre"
                {...register('nombre')}
                disabled={isSubmitting}
                className={`w-full px-3 py-2 sm:py-3 border rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00B5E2] dark:focus:ring-blue-500 transition-colors duration-300 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed ${
                  errors.nombre ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'
                }`}
                aria-describedby={errors.nombre ? 'nombre-error' : undefined}
              />
              {errors.nombre && (
                <p id="nombre-error" className="mt-1 text-xs sm:text-sm text-red-500 dark:text-red-400 transition-colors duration-300" role="alert" aria-live="polite">
                  {translateError(errors.nombre.message || '')}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors duration-300">
                {t('auth.email')}
              </label>
              <input
                type="email"
                id="email"
                {...register('email')}
                disabled={isSubmitting}
                className={`w-full px-3 py-2 sm:py-3 border rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00B5E2] dark:focus:ring-blue-500 transition-colors duration-300 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed ${
                  errors.email ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'
                }`}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email && (
                <p id="email-error" className="mt-1 text-xs sm:text-sm text-red-500 dark:text-red-400 transition-colors duration-300" role="alert" aria-live="polite">
                  {translateError(errors.email.message || '')}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors duration-300">
                {t('auth.password')}
              </label>
              <input
                type="password"
                id="password"
                {...register('password')}
                disabled={isSubmitting}
                className={`w-full px-3 py-2 sm:py-3 border rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00B5E2] dark:focus:ring-blue-500 transition-colors duration-300 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed ${
                  errors.password ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'
                }`}
                aria-describedby={errors.password ? 'password-error' : undefined}
              />
              {errors.password && (
                <p id="password-error" className="mt-1 text-xs sm:text-sm text-red-500 dark:text-red-400 transition-colors duration-300" role="alert" aria-live="polite">
                  {translateError(errors.password.message || '')}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors duration-300">
                {t('auth.confirmPassword')}
              </label>
              <input
                type="password"
                id="confirmPassword"
                {...register('confirmPassword')}
                disabled={isSubmitting}
                className={`w-full px-3 py-2 sm:py-3 border rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00B5E2] dark:focus:ring-blue-500 transition-colors duration-300 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed ${
                  errors.confirmPassword ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'
                }`}
                aria-describedby={errors.confirmPassword ? 'confirmPassword-error' : undefined}
              />
              {errors.confirmPassword && (
                <p id="confirmPassword-error" className="mt-1 text-xs sm:text-sm text-red-500 dark:text-red-400 transition-colors duration-300" role="alert" aria-live="polite">
                  {translateError(errors.confirmPassword.message || '')}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#00B5E2] dark:bg-blue-600 text-white py-2 sm:py-3 px-4 rounded-md font-medium text-sm sm:text-base hover:bg-[#008bbd] dark:hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-[#00B5E2] dark:focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  {t('common.processing')}
                </>
              ) : (
                t('auth.registerButton')
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
