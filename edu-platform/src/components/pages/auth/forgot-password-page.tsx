'use client';

import * as React from 'react';
import Link from 'next/link';
import { ROUTES } from '@/lib/constants';
import ThemeToggle from '@/components/ThemeToggle';

export function ForgotPasswordPage() {
  const [email, setEmail] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSuccess(true);
    } catch { setError('حدث خطأ، حاول مرة أخرى'); }
    finally { setIsLoading(false); }
  };

  return (
    <div dir="rtl" style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(135deg, #0f0a29 0%, #1a1048 25%, #2d1b69 50%, #4c1d95 75%, #6d28d9 100%)',
      fontFamily: "'Tajawal', sans-serif", position: 'relative', overflow: 'hidden', padding: '2rem'
    }}>
      <div style={{ position: 'absolute', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(139, 92, 246, 0.5) 0%, transparent 70%)', filter: 'blur(100px)', top: '-200px', right: '-200px' }} />
      <div style={{ position: 'absolute', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(245, 158, 11, 0.4) 0%, transparent 70%)', filter: 'blur(100px)', bottom: '-150px', left: '-150px' }} />

      <div style={{ width: '100%', maxWidth: '420px', position: 'relative', zIndex: 10 }}>
        <div style={{ background: 'white', borderRadius: '2rem', padding: '2.5rem', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 60px rgba(139, 92, 246, 0.15)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
            <Link href={ROUTES.HOME}><span style={{ fontSize: '1.75rem', fontWeight: 900, cursor: 'pointer', background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>لهلوب</span></Link>
            <ThemeToggle />
          </div>

          {isSuccess ? (
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: '80px', height: '80px', margin: '0 auto 1.5rem', borderRadius: '50%', background: 'linear-gradient(135deg, #22c55e, #16a34a)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem' }}>✓</div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '1rem', color: '#1a1a2e' }}>تم الإرسال بنجاح! 📧</h2>
              <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني</p>
              <Link href={ROUTES.LOGIN} style={{ display: 'inline-block', width: '100%', padding: '1rem', fontSize: '1rem', fontWeight: 700, color: 'white', background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)', border: 'none', borderRadius: '1rem', textDecoration: 'none', textAlign: 'center' }}>
                العودة لتسجيل الدخول
              </Link>
            </div>
          ) : (
            <>
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <div style={{ width: '60px', height: '60px', margin: '0 auto 1rem', borderRadius: '50%', background: 'linear-gradient(135deg, rgba(139,92,246,0.2), rgba(139,92,246,0.1))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.75rem' }}>🔐</div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '0.5rem', color: '#1a1a2e' }}>نسيت كلمة المرور؟</h2>
                <p style={{ color: '#64748b' }}>أدخل بريدك الإلكتروني وسنرسل لك رابط إعادة التعيين</p>
              </div>

              {error && (<div style={{ marginBottom: '1.5rem', padding: '1rem', borderRadius: '1rem', background: 'rgba(239, 68, 68, 0.1)', border: '2px solid rgba(239, 68, 68, 0.3)', color: '#dc2626', textAlign: 'center', fontWeight: 700 }}>{error}</div>)}

              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.5rem', color: '#374151' }}>البريد الإلكتروني</label>
                  <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="example@email.com" style={{ width: '100%', padding: '1rem 1.25rem', fontSize: '1rem', border: '2px solid #e5e7eb', borderRadius: '1rem', background: '#f9fafb', color: '#1a1a2e', outline: 'none', fontFamily: 'inherit' }} onFocus={e => { e.target.style.borderColor = '#8b5cf6'; e.target.style.background = 'white'; }} onBlur={e => { e.target.style.borderColor = '#e5e7eb'; e.target.style.background = '#f9fafb'; }} />
                </div>
                <button type="submit" disabled={isLoading} style={{ width: '100%', padding: '1rem', fontSize: '1.1rem', fontWeight: 700, color: 'white', background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)', border: 'none', borderRadius: '1rem', cursor: isLoading ? 'not-allowed' : 'pointer', opacity: isLoading ? 0.7 : 1, boxShadow: '0 8px 25px rgba(139,92,246,0.4)', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                  {isLoading ? (<><span style={{ width: '20px', height: '20px', border: '2px solid rgba(255,255,255,0.3)', borderTop: '2px solid white', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />جاري الإرسال...</>) : 'إرسال رابط الاستعادة ←'}
                </button>
              </form>

              <p style={{ marginTop: '2rem', textAlign: 'center', color: '#64748b' }}>
                <Link href={ROUTES.LOGIN} style={{ fontWeight: 700, color: '#8b5cf6', textDecoration: 'none' }}>← العودة لتسجيل الدخول</Link>
              </p>
            </>
          )}
        </div>
      </div>

      <style jsx global>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
