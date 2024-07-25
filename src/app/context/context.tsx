"use client";
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { ClerkProvider, SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";

interface AuthContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  checkAuthStatus: () => Promise<void>;
  user: any; // Add this line to include Clerk user
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { user } = useUser(); // Add this line to get Clerk user

  const checkAuthStatus = async () => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (accessToken && refreshToken) {
      try {
        const response = await fetch('https://backend-production-f116.up.railway.app/api/v1/check-tokens', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ accessToken, refreshToken }),
        });
        if (response.ok) {
          const result = await response.json();
          localStorage.setItem('accessToken', result.accessToken);
          localStorage.setItem('refreshToken', result.refreshToken);
          setIsLoggedIn(true);
        } else {
          // If token check fails, log the user out
          await handleLogout();
        }
        if (user) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("Error checking tokens:", error);
        await handleLogout();
      }
    } else {
      setIsLoggedIn(false);
    }
  };

  const handleLogout = async () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setIsLoggedIn(false);
  };

  useEffect(() => {
    checkAuthStatus();
    window.addEventListener('storage', checkAuthStatus);
    return () => {
      window.removeEventListener('storage', checkAuthStatus);
    };
  }, []);

  return (
    // <ClerkProvider>
      <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, checkAuthStatus, user }}>
        {children}
      </AuthContext.Provider>
    // </ClerkProvider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};