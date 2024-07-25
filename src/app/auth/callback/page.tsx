'use client';

import React, { useEffect } from 'react';
import { useSignIn } from "@clerk/clerk-react";
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/context';

function AuthCallback() {
  const { signIn } = useSignIn();
//   const navigate = useNavigate();
  const router = useRouter();
  const { setIsLoggedIn } = useAuth();

  useEffect(() => {
    async function handleCallback() {
      if (!signIn) return;
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const codee = urlParams.get('code') || '';
        // Attempt to complete the sign-in process
        const result = await signIn.attemptFirstFactor({
          strategy: "oauth_google" as any, // Type assertion to bypass TypeScript error
          code: codee, // Add the code property here
        });

        if (result.status === 'complete') {
          // Create a new session
          const session = await signIn.create({
            strategy: "oauth_google" as any, // Type assertion to bypass TypeScript error
            identifier: result.identifier || undefined,
          });

          // Rest of the code remains the same
          const sessionToken = session.createdSessionId;
          const response = await fetch('https://backend-production-f116.up.railway.app/api/v1/google-login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: sessionToken }),
          });

          if (response.ok) {
            const data = await response.json();
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);
            setIsLoggedIn(true);
            router.push('/'); // Redirect to home page or dashboard
          } else {
            console.error('Error logging in with Google');
            router.push('/login'); // Redirect back to login page on error
          }
        } else {
          console.error('Authentication not complete');
          router.push('/login');
        }
      } catch (error) {
        console.error('Error during authentication:', error);
        router.push('/login');
      }
    }

    handleCallback();
  }, [signIn,setIsLoggedIn]);

  return <div>Authenticating...</div>;
}

export default AuthCallback;