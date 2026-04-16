'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ROUTES, USER_ROLES } from '@/lib/constants';
import ThemeToggle from '@/components/ThemeToggle';

type UserRole = 'student' | 'parent' | 'teacher';

const roleIcons: Record<UserRole, string> = { student: '🎓', parent: '👨‍👩‍👧', teacher: '📚' };
const roleLabels: Record<UserRole, string> = { student: 'طالب', parent: 'ولي أمر', teacher: 'معلم' };

export function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = React.useState(1);
  const [role, setRole] = React.useState<UserRole>('student');
  const [formData, setFormData] = React.useState({ name: '', email: '', password: '', confirmPassword: '', phone: '' });
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('كلمتا المرور غير متطابقتين');
      return;
    }
    setError('');
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      const routes: Record<UserRole, string> = {
        student: ROUTES.STUDENT_DASHBOARD,
        parent: ROUTES.PARENT_DASHBOARD,
        teacher: ROUTES.TEACHER_DASHBOARD
      };
      localStorage.setItem('userRole', role === 'student' ? USER_ROLES.STUDENT : role === 'parent' ? USER_ROLES.PARENT : USER_ROLES.TEACHER);
      router.push(routes[role]);
    } catch { setError('حدث خطأ في التسجيل'); }
    finally { setIsLoading(false); }
  };

  return (
    <div dir="rtl" style={{
      minHeight: '100vh', display: 'flex',
      background: 'linear-gradient(135deg, #0f0a29 0%, #1a1048 25%, #2d1b69 50%, #4c1d95 75%, #6d28d9 100%)',
      fontFamily: "'Tajawal', sans-serif", position: 'relative', overflow: 'hidden'
    }}>
      {/* Background Effects */}
      <div style={{ position: 'absolute', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(139, 92, 246, 0.5) 0%, transparent 70%)', filter: 'blur(100px)', top: '-200px', left: '-200px' }} />
      <div style={{ position: 'absolute', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(245, 158, 11, 0.4) 0%, transparent 70%)', filter: 'blur(100px)', bottom: '-150px', right: '-150px' }} />

      {/* Left - Branding */}
      <div style={{ width: '50%', position: 'relative', zIndex: 10, display: 'none', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '3rem', color: 'white' }} className="hidden lg:flex">
        <div style={{ maxWidth: '450px', textAlign: 'center' }}>
          <Link href={ROUTES.HOME}><h1 style={{ fontSize: '4rem', fontWeight: 900, marginBottom: '1.5rem', cursor: 'pointer', background: 'linear-gradient(135deg, #fbbf24, #f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>لهلوب</h1></Link>
          <p style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', opacity: 0.9 }}>انضم إلى مجتمعنا التعليمي</p>
          <p style={{ fontSize: '1.1rem', opacity: 0.7, marginBottom: '3rem' }}>سواء كنت طالباً، ولي أمر، أو معلماً - نرحب بك!</p>
        </div>
      </div>

      {/* Right - Form */}
      <div style={{ width: '100%', position: 'relative', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }} className="lg:w-1/2">
        <div style={{ width: '100%', maxWidth: '480px' }}>
          <div style={{ background: 'white', borderRadius: '2rem', padding: '2.5rem', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 60px rgba(139, 92, 246, 0.15)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
              <Link href={ROUTES.HOME}><span style={{ fontSize: '1.75rem', fontWeight: 900, cursor: 'pointer', background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>لهلوب</span></Link>
              <ThemeToggle />
            </div>

            {/* Progress */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
              {[1, 2].map(s => (
                <React.Fragment key={s}>
                  <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, background: step >= s ? 'linear-gradient(135deg, #8b5cf6, #7c3aed)' : '#e5e7eb', color: step >= s ? 'white' : '#9ca3af' }}>{s}</div>
                  {s < 2 && <div style={{ width: '3rem', height: '3px', borderRadius: '2px', background: step > s ? '#8b5cf6' : '#e5e7eb' }} />}
                </React.Fragment>
              ))}
            </div>

            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 900, marginBottom: '0.5rem', color: '#1a1a2e' }}>{step === 1 ? 'اختر نوع الحساب' : 'أكمل بياناتك'} ✨</h2>
              <p style={{ color: '#64748b' }}>{step === 1 ? 'ما هي صفتك؟' : `التسجيل كـ ${roleLabels[role]}`}</p>
            </div>

            {error && (<div style={{ marginBottom: '1.5rem', padding: '1rem', borderRadius: '1rem', background: 'rgba(239, 68, 68, 0.1)', border: '2px solid rgba(239, 68, 68, 0.3)', color: '#dc2626', textAlign: 'center', fontWeight: 700 }}>{error}</div>)}

            {step === 1 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {(['student', 'parent', 'teacher'] as UserRole[]).map(r => (
                  <button key={r} onClick={() => { setRole(r); setStep(2); }} style={{ padding: '1.25rem', borderRadius: '1rem', border: '2px solid #e5e7eb', background: 'white', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '1rem', fontFamily: 'inherit' }} onMouseOver={e => { e.currentTarget.style.borderColor = '#8b5cf6'; e.currentTarget.style.background = 'rgba(139,92,246,0.05)'; }} onMouseOut={e => { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.background = 'white'; }}>
                    <span style={{ fontSize: '2rem' }}>{roleIcons[r]}</span>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ fontWeight: 700, fontSize: '1.1rem', color: '#1a1a2e' }}>{roleLabels[r]}</p>
                      <p style={{ fontSize: '0.85rem', color: '#64748b' }}>{r === 'student' ? 'أبحث عن معلم' : r === 'parent' ? 'أبحث عن معلم لابني/ابنتي' : 'أريد تقديم دروس خصوصية'}</p>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.5rem', color: '#374151' }}>الاسم الكامل</label>
                  <input type="text" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="أحمد محمد" style={{ width: '100%', padding: '0.875rem 1rem', fontSize: '1rem', border: '2px solid #e5e7eb', borderRadius: '0.75rem', background: '#f9fafb', color: '#1a1a2e', outline: 'none', fontFamily: 'inherit' }} onFocus={e => { e.target.style.borderColor = '#8b5cf6'; e.target.style.background = 'white'; }} onBlur={e => { e.target.style.borderColor = '#e5e7eb'; e.target.style.background = '#f9fafb'; }} />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.5rem', color: '#374151' }}>البريد الإلكتروني</label>
                  <input type="email" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} placeholder="example@email.com" style={{ width: '100%', padding: '0.875rem 1rem', fontSize: '1rem', border: '2px solid #e5e7eb', borderRadius: '0.75rem', background: '#f9fafb', color: '#1a1a2e', outline: 'none', fontFamily: 'inherit' }} onFocus={e => { e.target.style.borderColor = '#8b5cf6'; e.target.style.background = 'white'; }} onBlur={e => { e.target.style.borderColor = '#e5e7eb'; e.target.style.background = '#f9fafb'; }} />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.5rem', color: '#374151' }}>رقم الجوال</label>
                  <input type="tel" required value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} placeholder="05xxxxxxxx" style={{ width: '100%', padding: '0.875rem 1rem', fontSize: '1rem', border: '2px solid #e5e7eb', borderRadius: '0.75rem', background: '#f9fafb', color: '#1a1a2e', outline: 'none', fontFamily: 'inherit' }} onFocus={e => { e.target.style.borderColor = '#8b5cf6'; e.target.style.background = 'white'; }} onBlur={e => { e.target.style.borderColor = '#e5e7eb'; e.target.style.background = '#f9fafb'; }} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.5rem', color: '#374151' }}>كلمة المرور</label>
                    <div style={{ position: 'relative' }}>
                      <input type={showPassword ? 'text' : 'password'} required value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} placeholder="••••••••" style={{ width: '100%', padding: '0.875rem 2.5rem 0.875rem 1rem', fontSize: '1rem', border: '2px solid #e5e7eb', borderRadius: '0.75rem', background: '#f9fafb', color: '#1a1a2e', outline: 'none', fontFamily: 'inherit' }} onFocus={e => { e.target.style.borderColor = '#8b5cf6'; e.target.style.background = 'white'; }} onBlur={e => { e.target.style.borderColor = '#e5e7eb'; e.target.style.background = '#f9fafb'; }} />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem' }}>{showPassword ? '👁️' : '🙈'}</button>
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.5rem', color: '#374151' }}>تأكيد كلمة المرور</label>
                    <input type="password" required value={formData.confirmPassword} onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })} placeholder="••••••••" style={{ width: '100%', padding: '0.875rem 1rem', fontSize: '1rem', border: '2px solid #e5e7eb', borderRadius: '0.75rem', background: '#f9fafb', color: '#1a1a2e', outline: 'none', fontFamily: 'inherit' }} onFocus={e => { e.target.style.borderColor = '#8b5cf6'; e.target.style.background = 'white'; }} onBlur={e => { e.target.style.borderColor = '#e5e7eb'; e.target.style.background = '#f9fafb'; }} />
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button type="button" onClick={() => setStep(1)} style={{ flex: 1, padding: '0.875rem', fontSize: '1rem', fontWeight: 700, color: '#374151', background: '#f3f4f6', border: 'none', borderRadius: '0.75rem', cursor: 'pointer', fontFamily: 'inherit' }}>← رجوع</button>
                  <button type="submit" disabled={isLoading} style={{ flex: 2, padding: '0.875rem', fontSize: '1rem', fontWeight: 700, color: 'white', background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)', border: 'none', borderRadius: '0.75rem', cursor: isLoading ? 'not-allowed' : 'pointer', opacity: isLoading ? 0.7 : 1, boxShadow: '0 8px 25px rgba(139,92,246,0.4)', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                    {isLoading ? (<><span style={{ width: '18px', height: '18px', border: '2px solid rgba(255,255,255,0.3)', borderTop: '2px solid white', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />جاري التسجيل...</>) : 'إنشاء الحساب ←'}
                  </button>
                </div>
              </form>
            )}

            <p style={{ marginTop: '2rem', textAlign: 'center', color: '#64748b' }}>لديك حساب؟ <Link href={ROUTES.LOGIN} style={{ fontWeight: 700, color: '#8b5cf6', textDecoration: 'none' }}>تسجيل الدخول</Link></p>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (min-width: 1024px) { .hidden.lg\\:flex { display: flex !important; } .lg\\:w-1\\/2 { width: 50% !important; } }
      `}</style>
    </div>
  );
}
