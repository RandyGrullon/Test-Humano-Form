'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useLoading } from '@/context/LoadingContext';
import GlobalLoader from '@/components/GlobalLoader';
import Navbar from '@/components/Navbar';

interface AppContentProps {
  children: React.ReactNode;
}

export default function AppContent({ children }: AppContentProps) {
  const { user } = useAuth();
  const { isLoading: globalLoading, hideLoader, showLoader } = useLoading();
  const [authInitialized, setAuthInitialized] = useState(false);
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  useEffect(() => {
    const hadUser = sessionStorage.getItem('hadUser') === 'true';
    const currentUser = localStorage.getItem('user');
    
    if (hadUser && !currentUser) {
      setIsLoggedOut(true);
      showLoader();
      sessionStorage.removeItem('hadUser');
    }
    
    const timer = setTimeout(() => {
      setAuthInitialized(true);
      setIsLoggedOut(false);
      hideLoader();
    }, isLoggedOut ? 2300 : 2300);

    return () => clearTimeout(timer);
  }, [hideLoader, showLoader, isLoggedOut]);

  useEffect(() => {
    if (user) {
      sessionStorage.setItem('hadUser', 'true');
    }
  }, [user]);

  return (
    <>
      <GlobalLoader isVisible={globalLoading || !authInitialized} />
      {!globalLoading && authInitialized && (
        <>
          <Navbar />
          <main className="pt-16">
            {children}
          </main>
        </>
      )}
    </>
  );
}
