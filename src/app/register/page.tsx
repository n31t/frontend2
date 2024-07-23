"use client";

import { useState } from 'react';
import axiosInstance from '@/components/utils/axiosInstance';
import { useRouter } from 'next/navigation';

export default function Page() {
  const [email, setEmail] = useState('');
  const [passwordFirst, setPasswordFirst] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string|null>(null);
  const router = useRouter();

  const handleRegister = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if(!email || !passwordFirst || !password) {
        setError('Заполните все поля.');
        setLoading(false);
        return;
    }
    if (passwordFirst !== password) {
        setError('Пароли должны совпадать.');
        setLoading(false);
        return;
      }

    try {
      await axiosInstance.post('/register', { email, password });
      const response = await axiosInstance.post('/login', { email, password });
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      router.push('/');
    } catch (err) {
      setError('Ошибка регистрации. Попробуйте снова.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-start px-4 py-10 md:py-20">
      <div style={{width: '100%', maxWidth: '500px', margin: '1.25rem auto', backgroundColor: '#ffffff', borderRadius: '0.5rem', padding: '3rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'}}>
        <form onSubmit={handleRegister} style={{display: 'flex', flexDirection: 'column', width: '100%', textAlign: 'center'}}>
          <h3 style={{marginBottom: '0.75rem', fontSize: '2.25rem', fontWeight: '800', color: '#1F2937'}}>Регистрация</h3>
          <p style={{marginBottom: '1rem', color: '#4B5563'}}>Создайте свой аккаунт</p>
          
          {error && <p style={{color: '#EF4444', marginBottom: '1rem'}}>{error}</p>}
          
          <label htmlFor="email" style={{marginBottom: '0.5rem', fontSize: '0.875rem', textAlign: 'start', color: '#111827'}}>Email*</label>
          <input 
            id="email" 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="mail@example.com" 
            style={{display: 'flex', alignItems: 'center', width: '100%', padding: '1rem 1.25rem', marginBottom: '1.75rem', fontSize: '0.875rem', fontWeight: '500', backgroundColor: '#E5E7EB', color: '#1F2937', borderRadius: '1rem', outline: 'none'}} 
          />
          
          <label htmlFor="passwordFirst" style={{marginBottom: '0.5rem', fontSize: '0.875rem', textAlign: 'start', color: '#111827'}}>Придумайте пароль*</label>
          <input 
            id="passwordFirst" 
            type="password" 
            value={passwordFirst}
            onChange={(e) => setPasswordFirst(e.target.value)}
            placeholder="Введите пароль" 
            style={{display: 'flex', alignItems: 'center', width: '100%', padding: '1rem 1.25rem', marginBottom: '1.25rem', fontSize: '0.875rem', fontWeight: '500', backgroundColor: '#E5E7EB', color: '#1F2937', borderRadius: '1rem', outline: 'none'}} 
          />
          
          <label htmlFor="password" style={{marginBottom: '0.5rem', fontSize: '0.875rem', textAlign: 'start', color: '#111827'}}>Подтвердите пароль*</label>
          <input 
            id="password" 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Введите пароль еще раз" 
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
            {loading ? 'Регистрация...' : 'Зарегестрироваться'}
          </button>
          
          <p style={{fontSize: '0.875rem', lineHeight: '1.5', color: '#111827'}}>Уже есть аккаунт? <a href="/login" style={{fontWeight: '700', color: '#F18F65'}}>Войти</a></p>
        </form>
      </div>
    </main>
  );
}