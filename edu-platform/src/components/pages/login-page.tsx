'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ROUTES, USER_ROLES } from '@/lib/constants';
import ThemeToggle from '@/components/ThemeToggle';

export function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
    remember: false
  });
  const [isLoading, setIsLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (formData.email === 'teacher@test.com') {
        localStorage.setItem('userRole', USER_ROLES.TEACHER);
        router.push(ROUTES.TEACHER_DASHBOARD);
      } else if (formData.email === 'parent@test.com') {
        localStorage.setItem('userRole', USER_ROLES.PARENT);
        router.push(ROUTES.PARENT_DASHBOARD);
      } else if (formData.email === 'admin@test.com') {
        localStorage.setItem('userRole', USER_ROLES.ADMIN);
        router.push(ROUTES.ADMIN_DASHBOARD);
      } else {
        localStorage.setItem('userRole', USER_ROLES.STUDENT);
        router.push(ROUTES.STUDENT_DASHBOARD);
      }
    } catch (err) {
      setError('حدث خطأ في تسجيل الدخول');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      dir="rtl" 
      style={{
        minHeight: '100vh',
        display: 'flex',
        background: 'linear-gradient(135deg, #0f0a29 0%, #1a1048 25%, #2d1b69 50%, #4c1d95 75%, #6d28d9 100%)',
        fontFamily: "'Tajawal', 'Poppins', sans-serif",
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background Glows */}
      <div style={{
        position: 'absolute',
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.5) 0%, transparent 70%)',
        filter: 'blur(100px)',
        top: '-200px',
        right: '-200px',
        animation: 'pulse 8s ease-in-out infinite'
      }} />
      <div style={{
        position: 'absolute',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(245, 158, 11, 0.4) 0%, transparent 70%)',
        filter: 'blur(100px)',
        bottom: '-150px',
        left: '-150px'
      }} />

      {/* Left Side - Branding (Desktop) */}
      <div style={{
        display: 'none',
        width: '50%',
        position: 'relative',
        zIndex: 10,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '3rem',
        color: 'white'
      }} className="lg:flex">
        <div style={{ maxWidth: '450px', textAlign: 'center' }}>
          <h1 style={{
            fontSize: '4rem',
            fontWeight: 900,
            marginBottom: '1.5rem',
            background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            لهلوب
          </h1>
          <p style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '1rem', opacity: 0.9 }}>
            منصة التعليم الأولى في المملكة
          </p>
          <p style={{ fontSize: '1.125rem', opacity: 0.7, marginBottom: '2.5rem' }}>
            نربط الطلاب بأفضل المعلمين لتجربة تعليمية استثنائية
          </p>

          {/* Features */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'right' }}>
            {[
              { icon: '🌟', text: 'أكثر من 500 معلم معتمد' },
              { icon: '📚', text: 'جميع المواد الدراسية' },
              { icon: '💰', text: 'دفع آمن وموثوق' },
              { icon: '⭐', text: 'تقييمات حقيقية من الطلاب' },
            ].map((f, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem 1.25rem',
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(20px)',
                borderRadius: '1rem',
                border: '1px solid rgba(255,255,255,0.2)'
              }}>
                <span style={{ fontSize: '2rem' }}>{f.icon}</span>
                <span style={{ fontSize: '1.125rem', fontWeight: 700 }}>{f.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div style={{
        width: '100%',
        maxWidth: '100%',
        position: 'relative',
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem'
      }} className="lg:w-1/2">
        <div style={{ width: '100%', maxWidth: '440px' }}>
          {/* Card */}
          <div style={{
            background: 'white',
            borderRadius: '2rem',
            padding: '2.5rem',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 60px rgba(139, 92, 246, 0.2)'
          }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
              <Link href={ROUTES.HOME}>
                <span style={{
                  fontSize: '1.75rem',
                  fontWeight: 900,
                  background: 'linear-gradient(135deg, #a78bfa 0%, #8b5cf6 50%, #7c3aed 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  لهلوب
                </span>
              </Link>
              <ThemeToggle />
            </div>

            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '0.5rem', color: '#1a1a2e' }}>
                مرحباً بك! 👋
              </h2>
              <p style={{ color: '#64748b' }}>سجل دخولك للمتابعة</p>
            </div>

            {error && (
              <div style={{
                marginBottom: '1.5rem',
                padding: '1rem',
                borderRadius: '1rem',
                background: 'rgba(239, 68, 68, 0.1)',
                border: '2px solid rgba(239, 68, 68, 0.3)',
                color: '#ef4444',
                textAlign: 'center',
                fontWeight: 700
              }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Email */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 700, marginBottom: '0.75rem', color: '#1a1a2e' }}>
                  البريد الإلكتروني
                </label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', fontSize: '1.25rem' }}>📧</span>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="example@email.com"
                    style={{
                      width: '100%',
                      padding: '1rem 1rem 1rem 3rem',
                      paddingRight: '3rem',
                      fontSize: '1rem',
                      border: '2px solid #e2e8f0',
                      borderRadius: '1rem',
                      background: '#f8fafc',
                      color: '#1a1a2e',
                      outline: 'none',
                      transition: 'all 0.3s ease',
                      fontFamily: 'inherit'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#8b5cf6';
                      e.target.style.boxShadow = '0 0 0 4px rgba(139, 92, 246, 0.15)';
                      e.target.style.background = 'white';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e2e8f0';
                      e.target.style.boxShadow = 'none';
                      e.target.style.background = '#f8fafc';
                    }}
                  />
                </div>
              </div>

              {/* Password */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 700, marginBottom: '0.75rem', color: '#1a1a2e' }}>
                  كلمة المرور
                </label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', fontSize: '1.25rem' }}>🔒</span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="••••••••"
                    style={{
                      width: '100%',
                      padding: '1rem 3rem',
                      fontSize: '1rem',
                      border: '2px solid #e2e8f0',
                      borderRadius: '1rem',
                      background: '#f8fafc',
                      color: '#1a1a2e',
                      outline: 'none',
                      transition: 'all 0.3s ease',
                      fontFamily: 'inherit'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#8b5cf6';
                      e.target.style.boxShadow = '0 0 0 4px rgba(139, 92, 246, 0.15)';
                      e.target.style.background = 'white';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e2e8f0';
                      e.target.style.boxShadow = 'none';
                      e.target.style.background = '#f8fafc';
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      left: '1rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      fontSize: '1.25rem',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    {showPassword ? '👁️' : '🙈'}
                  </button>
                </div>
              </div>

              {/* Remember & Forgot */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={formData.remember}
                    onChange={(e) => setFormData({ ...formData, remember: e.target.checked })}
                    style={{ width: '1.25rem', height: '1.25rem', accentColor: '#8b5cf6' }}
                  />
                  <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1a1a2e' }}>تذكرني</span>
                </label>
                <Link href="/forgot-password" style={{ fontSize: '0.875rem', fontWeight: 700, color: '#8b5cf6', textDecoration: 'none' }}>
                  نسيت كلمة المرور؟
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                style={{
                  width: '100%',
                  padding: '1rem',
                  fontSize: '1.125rem',
                  fontWeight: 700,
                  color: 'white',
                  background: 'linear-gradient(135deg, #a78bfa 0%, #8b5cf6 50%, #7c3aed 100%)',
                  border: 'none',
                  borderRadius: '1rem',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  opacity: isLoading ? 0.6 : 1,
                  boxShadow: '0 8px 30px -8px rgba(139, 92, 246, 0.6)',
                  transition: 'all 0.3s ease',
                  fontFamily: 'inherit'
                }}
              >
                {isLoading ? (
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
                    <span style={{
                      width: '1.25rem',
                      height: '1.25rem',
                      border: '2px solid rgba(255,255,255,0.3)',
                      borderTop: '2px solid white',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite'
                    }} />
                    جاري تسجيل الدخول...
                  </span>
                ) : (
                  'تسجيل الدخول'
                )}
              </button>

              {/* Divider */}
              <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 0' }}>
                <div style={{ flex: 1, height: '2px', background: '#e2e8f0' }} />
                <span style={{ padding: '0 1rem', color: '#94a3b8', fontSize: '0.875rem' }}>أو</span>
                <div style={{ flex: 1, height: '2px', background: '#e2e8f0' }} />
              </div>

              {/* Social Login */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <button type="button" style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.75rem',
                  padding: '1rem',
                  borderRadius: '1rem',
                  border: '2px solid #e2e8f0',
                  background: 'white',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontFamily: 'inherit',
                  color: '#1a1a2e'
                }}>
                  <span style={{ color: '#4285f4', fontSize: '1.25rem' }}>G</span>
                  Google
                </button>
                <button type="button" style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.75rem',
                  padding: '1rem',
                  borderRadius: '1rem',
                  border: '2px solid #e2e8f0',
                  background: 'white',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontFamily: 'inherit',
                  color: '#1a1a2e'
                }}>
                  <span style={{ fontSize: '1.25rem' }}>🍎</span>
                  Apple
                </button>
              </div>
            </form>

            {/* Register Link */}
            <p style={{ marginTop: '2rem', textAlign: 'center', color: '#64748b' }}>
              ليس لديك حساب؟{' '}
              <Link href={ROUTES.REGISTER} style={{ fontWeight: 700, color: '#8b5cf6', textDecoration: 'none' }}>
                سجل الآن
              </Link>
            </p>
          </div>

          {/* Demo Accounts */}
          <div style={{
            marginTop: '1.5rem',
            padding: '1.5rem',
            background: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(20px)',
            borderRadius: '1.5rem',
            border: '1px solid rgba(255,255,255,0.2)',
            color: 'white'
          }}>
            <p style={{ fontWeight: 700, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>🔑</span> حسابات تجريبية:
            </p>
            <div style={{ fontSize: '0.875rem', opacity: 0.9, lineHeight: 1.8 }}>
              <p>• teacher@test.com → لوحة المعلم</p>
              <p>• parent@test.com → لوحة ولي الأمر</p>
              <p>• admin@test.com → لوحة الإدارة</p>
              <p>• أي إيميل آخر → لوحة الطالب</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.2); opacity: 0.8; }
        }
        @media (min-width: 1024px) {
          .lg\\:flex { display: flex !important; }
          .lg\\:w-1\\/2 { width: 50% !important; }
        }
      `}</style>
    </div>
  );
}
