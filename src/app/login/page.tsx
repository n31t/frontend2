"use client";

import { useState } from 'react';
import axiosInstance from '@/components/utils/axiosInstance';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { useClerk, SignInButton } from "@clerk/nextjs";
// import GoogleLoginButton from '@/components/auth/google-btn-component';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.post('/login', { email, password });
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      router.push('/'); // Redirect to home page on success
    } catch (err) {
      setError('Неверный логин или пароль. Попробуйте снова.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f3f4f6'}}>  
      <div style={{width: '100%', maxWidth: '500px', margin: '1.25rem auto', backgroundColor: '#ffffff', borderRadius: '0.5rem', padding: '3rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'}}>
        <form onSubmit={handleLogin} style={{display: 'flex', flexDirection: 'column', width: '100%', textAlign: 'center'}}>
          <h3 style={{marginBottom: '0.75rem', fontSize: '2.25rem', fontWeight: '800', color: '#1F2937'}}>Вход</h3>
          <p style={{marginBottom: '1rem', color: '#4B5563'}}>Введите свой email и пароль</p>
          
          {error && <p style={{color: '#EF4444', marginBottom: '1rem'}}>{error}</p>}
          
          {/* <a style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', padding: '1rem 0', marginBottom: '1.5rem', fontSize: '0.875rem', fontWeight: '500', transition: 'all 0.3s', borderRadius: '1rem', color: '#111827', backgroundColor: '#D1D5DB', cursor: 'pointer'}}>
            <img style={{height: '1.25rem', marginRight: '0.5rem'}} src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/logos/logo-google.png" alt="" />
            Войти через Google
          </a> */}
          {/* <GoogleLoginButton /> */}
          {/* <SignInButton mode="modal">
            <button className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                <img 
                src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/logos/logo-google.png" 
                alt="Google logo" 
                className="w-5 h-5 mr-2"
                />
                Войти через Google
            </button>
            </SignInButton> */}
          
          {/* <div style={{display: 'flex', alignItems: 'center', marginBottom: '0.75rem'}}>
            <hr style={{height: '0', borderBottom: '1px solid #6B7280', flexGrow: 1}} />
            <p style={{margin: '0 1rem', color: '#4B5563'}}>или</p>
            <hr style={{height: '0', borderBottom: '1px solid #6B7280', flexGrow: 1}} />
          </div> */}
          
          <label htmlFor="email" style={{marginBottom: '0.5rem', fontSize: '0.875rem', textAlign: 'start', color: '#111827'}}>Email*</label>
          <input 
            id="email" 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="mail@example.com" 
            style={{display: 'flex', alignItems: 'center', width: '100%', padding: '1rem 1.25rem', marginBottom: '1.75rem', fontSize: '0.875rem', fontWeight: '500', backgroundColor: '#E5E7EB', color: '#1F2937', borderRadius: '1rem', outline: 'none'}} 
          />
          
          <label htmlFor="password" style={{marginBottom: '0.5rem', fontSize: '0.875rem', textAlign: 'start', color: '#111827'}}>Пароль*</label>
          <input 
            id="password" 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Введите пароль" 
            style={{display: 'flex', alignItems: 'center', width: '100%', padding: '1rem 1.25rem', marginBottom: '1.25rem', fontSize: '0.875rem', fontWeight: '500', backgroundColor: '#E5E7EB', color: '#1F2937', borderRadius: '1rem', outline: 'none'}} 
          />
          
          <button 
            type="submit" 
            disabled={loading}
            style={{
              width: '100%', 
              padding: '1.25rem 1.5rem', 
              marginBottom: '1.25rem', 
              fontSize: '0.875rem', 
              fontWeight: '700', 
              color: '#ffffff', 
              backgroundColor: loading ? '#CB5200' : '#FF7024', 
              borderRadius: '1rem', 
              transition: 'all 0.3s',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Входим...' : 'Войти'}
          </button>
          
          <p style={{fontSize: '0.875rem', lineHeight: '1.5', color: '#111827'}}>Нет аккаунта? <Link href="/register" style={{fontWeight: '700', color: '#F18F65'}}>Создать аккаунт</Link></p>
        </form>
      </div>
    </main>
  );
}