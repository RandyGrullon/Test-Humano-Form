'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'es' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
  t: (key: string, options?: Record<string, unknown>) => string;
}

const translations = {
  es: {
    'common.loading': 'Cargando...',
    'common.error': 'Error',
    'common.success': 'Éxito',
    'common.home': 'Inicio',
    'common.close': 'Cerrar',
    'common.cancel': 'Cancelar',
    'common.processing': 'Procesando...',
    
    'navbar.brand': 'Humano Seguros',
    'navbar.register': 'Registrarse',
    'navbar.login': 'Iniciar Sesión',
    'navbar.logout': 'Cerrar Sesión',
    'navbar.changePassword': 'Cambiar Contraseña',
    'navbar.welcome': 'Bienvenido, {{name}}',
    'navbar.toggleTheme': 'Cambiar a tema {{theme}}',
    'navbar.currentTheme': 'actual: {{theme}}',
    'navbar.lightTheme': 'claro',
    'navbar.darkTheme': 'oscuro',
    
    'auth.register': 'Registro',
    'auth.registerSubtitle': 'Crea tu cuenta en Humano Seguros',
    'auth.name': 'Nombre completo',
    'auth.email': 'Correo electrónico',
    'auth.password': 'Contraseña',
    'auth.confirmPassword': 'Confirmar contraseña',
    'auth.registerButton': 'Registrarse',
    
    'validation.nameRequired': 'El nombre es obligatorio',
    'validation.nameMinLength': 'El nombre debe tener al menos 2 caracteres',
    'validation.nameMaxLength': 'El nombre no puede tener más de 50 caracteres',
    'validation.emailRequired': 'El email es obligatorio',
    'validation.emailInvalid': 'El email no es válido',
    'validation.passwordRequired': 'La contraseña es obligatoria',
    'validation.passwordMinLength': 'La contraseña debe tener al menos 6 caracteres',
    'validation.passwordMaxLength': 'La contraseña no puede tener más de 50 caracteres',
    'validation.confirmPasswordRequired': 'Confirmar contraseña es obligatorio',
    'validation.passwordsNotMatch': 'Las contraseñas no coinciden',
    'validation.emailAlreadyExists': 'Este email ya está registrado',
    'validation.currentPasswordRequired': 'La contraseña actual es obligatoria',
    'validation.newPasswordRequired': 'La nueva contraseña es obligatoria',
    'validation.confirmNewPasswordRequired': 'Confirmar nueva contraseña es obligatorio',
    'validation.currentPasswordIncorrect': 'La contraseña actual es incorrecta',
    'validation.newPasswordMustBeDifferent': 'La nueva contraseña debe ser diferente a la actual',
    
    'notifications.registerSuccess': '¡Registro exitoso!',
    'notifications.registerSuccessMessage': 'Bienvenido, {{name}}. Tu cuenta ha sido creada correctamente.',
    'notifications.registerError': 'Error al registrar usuario. Inténtalo de nuevo.',
    'notifications.logoutSuccess': 'Sesión cerrada',
    'notifications.logoutSuccessMessage': 'Hasta luego, {{name}}. Tu sesión ha sido cerrada correctamente.',
    'notifications.passwordChangeSuccess': 'Contraseña cambiada',
    'notifications.passwordChangeSuccessMessage': 'Tu contraseña ha sido actualizada correctamente.',
    'notifications.passwordChangeError': 'Error al cambiar la contraseña. Inténtalo de nuevo.',
    
    'home.title': 'Bienvenido a Humano Seguros',
    'home.welcomeBack': '¡Hola, {{name}}!',
    'home.accountCreatedSuccess': 'Tu cuenta ha sido creada exitosamente. Puedes ver tus datos haciendo clic en el botón de abajo.',
    'home.startRegistration': 'Comienza tu registro',
    'home.joinDescription': 'Únete a Humano Seguros y descubre nuestros servicios de protección integral.',
    'home.registerNow': 'Registrarse Ahora',
    'home.viewJson': 'Ver JSON',
    'home.hideJson': 'Ocultar JSON',
    'home.loading': 'Cargando...',
    'home.userDataTitle': 'Datos del Usuario (JSON)',
    'home.accountInfoTitle': 'Información de la Cuenta',
    'home.nameLabel': 'Nombre:',
    'home.emailLabel': 'Email:',
    'home.statusLabel': 'Estado:',
    'home.statusActive': 'Activo',
    'home.registrationDateLabel': 'Fecha de registro:',
    
    'common.preparingExperience': 'Preparando tu experiencia...',
    
    'userCard.title': 'Datos del Usuario',
    'userCard.subtitle': 'Información almacenada en formato JSON',
    'userCard.noUserTitle': 'Sin usuario autenticado',
    'userCard.noUserMessage': 'Por favor, regístrate o inicia sesión para ver tus datos.',
    'userCard.welcomeMessage': 'Bienvenido, {{name}}',
    'userCard.dataFormat': 'Formato',
    
    'language.selectLanguage': 'Seleccionar idioma',
    'language.spanish': 'Español',
    'language.english': 'Inglés',
    'language.currentLanguage': 'Idioma actual: {{language}}',
    
    'modal.changePassword.title': 'Cambiar Contraseña',
    'modal.changePassword.changingPasswordFor': 'Cambiando contraseña para',
    'modal.changePassword.currentPassword': 'Contraseña Actual',
    'modal.changePassword.currentPasswordPlaceholder': 'Ingresa tu contraseña actual',
    'modal.changePassword.newPassword': 'Nueva Contraseña',
    'modal.changePassword.newPasswordPlaceholder': 'Ingresa tu nueva contraseña',
    'modal.changePassword.confirmNewPassword': 'Confirmar Nueva Contraseña',
    'modal.changePassword.confirmNewPasswordPlaceholder': 'Confirma tu nueva contraseña',
    'modal.changePassword.changePassword': 'Cambiar Contraseña'
  },
  en: {
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.home': 'Home',
    'common.close': 'Close',
    'common.cancel': 'Cancel',
    'common.processing': 'Processing...',
    
    'navbar.brand': 'Humano Insurance',
    'navbar.register': 'Sign Up',
    'navbar.login': 'Sign In',
    'navbar.logout': 'Sign Out',
    'navbar.changePassword': 'Change Password',
    'navbar.welcome': 'Welcome, {{name}}',
    'navbar.toggleTheme': 'Switch to {{theme}} theme',
    'navbar.currentTheme': 'current: {{theme}}',
    'navbar.lightTheme': 'light',
    'navbar.darkTheme': 'dark',
    
    'auth.register': 'Sign Up',
    'auth.registerSubtitle': 'Create your Humano Insurance account',
    'auth.name': 'Full Name',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.confirmPassword': 'Confirm Password',
    'auth.registerButton': 'Create Account',
    
    'validation.nameRequired': 'Name is required',
    'validation.nameMinLength': 'Name must be at least 2 characters',
    'validation.nameMaxLength': 'Name cannot be more than 50 characters',
    'validation.emailRequired': 'Email is required',
    'validation.emailInvalid': 'Email is not valid',
    'validation.passwordRequired': 'Password is required',
    'validation.passwordMinLength': 'Password must be at least 6 characters',
    'validation.passwordMaxLength': 'Password cannot be more than 50 characters',
    'validation.confirmPasswordRequired': 'Confirm password is required',
    'validation.passwordsNotMatch': 'Passwords do not match',
    'validation.emailAlreadyExists': 'This email is already registered',
    'validation.currentPasswordRequired': 'Current password is required',
    'validation.newPasswordRequired': 'New password is required',
    'validation.confirmNewPasswordRequired': 'Confirm new password is required',
    'validation.currentPasswordIncorrect': 'Current password is incorrect',
    'validation.newPasswordMustBeDifferent': 'New password must be different from current password',
    
    'notifications.registerSuccess': 'Registration successful!',
    'notifications.registerSuccessMessage': 'Welcome, {{name}}. Your account has been created successfully.',
    'notifications.registerError': 'Error registering user. Please try again.',
    'notifications.logoutSuccess': 'Session closed',
    'notifications.logoutSuccessMessage': 'See you later, {{name}}. Your session has been closed successfully.',
    'notifications.passwordChangeSuccess': 'Password changed',
    'notifications.passwordChangeSuccessMessage': 'Your password has been updated successfully.',
    'notifications.passwordChangeError': 'Error changing password. Please try again.',
    
    'home.title': 'Welcome to Humano Insurance',
    'home.welcomeBack': 'Hello, {{name}}!',
    'home.accountCreatedSuccess': 'Your account has been created successfully. You can view your data by clicking the button below.',
    'home.startRegistration': 'Start your registration',
    'home.joinDescription': 'Join Humano Insurance and discover our comprehensive protection services.',
    'home.registerNow': 'Register Now',
    'home.viewJson': 'View JSON',
    'home.hideJson': 'Hide JSON',
    'home.loading': 'Loading...',
    'home.userDataTitle': 'User Data (JSON)',
    'home.accountInfoTitle': 'Account Information',
    'home.nameLabel': 'Name:',
    'home.emailLabel': 'Email:',
    'home.statusLabel': 'Status:',
    'home.statusActive': 'Active',
    'home.registrationDateLabel': 'Registration date:',
    
    'common.preparingExperience': 'Preparing your experience...',
    
    'userCard.title': 'User Data',
    'userCard.subtitle': 'Information stored in JSON format',
    'userCard.noUserTitle': 'No authenticated user',
    'userCard.noUserMessage': 'Please register or log in to view your data.',
    'userCard.welcomeMessage': 'Welcome, {{name}}',
    'userCard.dataFormat': 'Format',
    
    'language.selectLanguage': 'Select language',
    'language.spanish': 'Spanish',
    'language.english': 'English',
    'language.currentLanguage': 'Current language: {{language}}',
    
    'modal.changePassword.title': 'Change Password',
    'modal.changePassword.changingPasswordFor': 'Changing password for',
    'modal.changePassword.currentPassword': 'Current Password',
    'modal.changePassword.currentPasswordPlaceholder': 'Enter your current password',
    'modal.changePassword.newPassword': 'New Password',
    'modal.changePassword.newPasswordPlaceholder': 'Enter your new password',
    'modal.changePassword.confirmNewPassword': 'Confirm New Password',
    'modal.changePassword.confirmNewPasswordPlaceholder': 'Confirm your new password',
    'modal.changePassword.changePassword': 'Change Password'
  }
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'es',
  setLanguage: () => {},
  toggleLanguage: () => {},
  t: (key: string) => key,
});

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>('es');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    const browserLanguage = navigator.language.split('-')[0] as Language;
    
    let initialLanguage: Language;
    if (savedLanguage && ['es', 'en'].includes(savedLanguage)) {
      initialLanguage = savedLanguage;
    } else if (['es', 'en'].includes(browserLanguage)) {
      initialLanguage = browserLanguage;
    } else {
      initialLanguage = 'es';
    }
    
    setLanguageState(initialLanguage);
    localStorage.setItem('language', initialLanguage);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    console.log('🌐 Cambiando idioma a:', language);
    localStorage.setItem('language', language);
  }, [language, mounted]);

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
  };

  const toggleLanguage = () => {
    const newLanguage = language === 'es' ? 'en' : 'es';
    setLanguage(newLanguage);
  };

  const t = (key: string, options?: Record<string, unknown>) => {
    const currentTranslations = translations[language];
    let translation = currentTranslations[key as keyof typeof currentTranslations] || key;
    
    if (options && typeof translation === 'string') {
      Object.keys(options).forEach(optionKey => {
        translation = translation.replace(
          new RegExp(`\\{\\{${optionKey}\\}\\}`, 'g'),
          String(options[optionKey])
        );
      });
    }
    
    return translation;
  };

  const value = {
    language,
    setLanguage,
    toggleLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  return context;
}
