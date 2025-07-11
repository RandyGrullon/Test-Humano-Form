'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  nombre: string;
  email: string;
  password?: string;
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  const login = (userData: User) => {
    const storedUser = localStorage.getItem('user');
    let fullUserData = userData;
    
    if (storedUser && !userData.password) {
      try {
        const existingData = JSON.parse(storedUser);
        fullUserData = { ...userData, password: existingData.password };
      } catch (error) {
        console.error('Error parsing existing user data:', error);
      }
    }
    
    setUser(fullUserData);
    localStorage.setItem('user', JSON.stringify(fullUserData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
