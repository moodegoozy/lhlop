'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ROUTES, USER_ROLES } from '@/lib/constants';
import ThemeToggle from '@/components/ThemeToggle';

type UserType = 'student' | 'teacher' | 'parent';

export function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = React.useState(1);
  const [userType, setUserType] = React.useState<UserType | ''>('');
  const [formData, setFormData] = React.useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    terms: false
  });
  const [isLoading, setIsLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = React.useState('');

  const userTypes = [
    { id: 'student', icon: '🎓', title: 'طالب', desc: 'أبحث عن معلم لمساعدتي' },
    { id: 'teacher', icon: '📚', title: 'معلم', desc: 'أريد تقديم دروس خصوصية' },
    { id: 'parent', icon: '👨‍👩‍👧', title: 'ولي أمر', desc: 'أبحث عن معلم لأبنائي' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('كلمة المرور غير متطابقة');
      return;
    }

    if (!formData.terms) {
      setError('يجب الموافقة على الشروط والأحكام');
      return;
    }

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const roleMap: { [key: string]: string } = {
        'student': USER_ROLES.STUDENT,
        'teacher': USER_ROLES.TEACHER,
        'parent': USER_ROLES.PARENT
      };
      localStorage.setItem('userRole', roleMap[userType as string] || USER_ROLES.STUDENT);
      
      if (userType === 'teacher') {
        router.push(ROUTES.TEACHER_DASHBOARD);
      } else if (userType === 'parent') {
        router.push(ROUTES.PARENT_DASHBOARD);
      } else {
        router.push(ROUTES.STUDENT_DASHBOARD);
      }
    } catch (err) {
      setError('حدث خطأ في التسجيل');
    } finally {
      setIsLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '1rem 1.25rem',
    fontSize: '1rem',
    border: '2px solid #e2e8f0',
    borderRadius: '1rem',
    background: '#f8fafc',
    color: '#1a1a2e',
    outline: 'none',
    transition: 'all 0.3s ease',
    fontFamily: 'inherit'
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
        right: '-200px'
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

      {/* Left Side - Benefits */}
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
            انضم إلى منصتنا اليوم
          </p>
          <p style={{ fontSize: '1.125rem', opacity: 0.7, marginBottom: '2.5rem' }}>
            ابدأ رحلتك التعليمية معنا
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'right' }}>
            {(userType === 'teacher' ? [
              { icon: '💰', text: 'احصل على دخل إضافي' },
              { icon: '📅', text: 'جدول مرن حسب وقتك' },
              { icon: '🌐', text: 'تعليم عن بعد أو حضوري' },
              { icon: '📈', text: 'تطوير مهاراتك التعليمية' },
            ] : [
              { icon: '🎯', text: 'تعلم مخصص لاحتياجاتك' },
              { icon: '⏰', text: 'حجز مرن في أي وقت' },
              { icon: '✅', text: 'معلمين معتمدين ومؤهلين' },
              { icon: '🔒', text: 'دفع آمن ومضمون' },
            ]).map((f, i) => (
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

      {/* Right Side - Form */}
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
        <div style={{ width: '100%', maxWidth: '480px' }}>
          {/* Card */}
          <div style={{
            background: 'white',
            borderRadius: '2rem',
            padding: '2.5rem',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 60px rgba(139, 92, 246, 0.2)'
          }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
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

            {/* Progress */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}>
              {[1, 2].map(s => (
                <div 
                  key={s}
                  style={{
                    flex: 1,
                    height: '6px',
                    borderRadius: '3px',
                    background: s <= step ? 'linear-gradient(135deg, #a78bfa 0%, #8b5cf6 50%, #7c3aed 100%)' : '#e2e8f0',
                    transition: 'all 0.3s ease'
                  }}
                />
              ))}
            </div>

            {/* Step 1: Choose Type */}
            {step === 1 && (
              <div>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                  <h2 style={{ fontSize: '1.75rem', fontWeight: 900, marginBottom: '0.5rem', color: '#1a1a2e' }}>
                    إنشاء حساب جديد
                  </h2>
                  <p style={{ color: '#64748b' }}>اختر نوع الحساب</p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {userTypes.map(type => (
                    <button
                      key={type.id}
                      onClick={() => {
                        setUserType(type.id as UserType);
                        setStep(2);
                      }}
                      style={{
                        width: '100%',
                        padding: '1.25rem',
                        borderRadius: '1rem',
                        border: '2px solid #e2e8f0',
                        background: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        fontFamily: 'inherit',
                        textAlign: 'right'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = '#8b5cf6';
                        e.currentTarget.style.background = '#f5f3ff';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = '#e2e8f0';
                        e.currentTarget.style.background = 'white';
                      }}
                    >
                      <span style={{ fontSize: '2.5rem' }}>{type.icon}</span>
                      <div>
                        <h3 style={{ fontWeight: 700, fontSize: '1.125rem', marginBottom: '0.25rem', color: '#1a1a2e' }}>
                          {type.title}
                        </h3>
                        <p style={{ fontSize: '0.875rem', color: '#64748b' }}>{type.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Form */}
            {step === 2 && (
              <div>
                <button
                  onClick={() => setStep(1)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: '#64748b',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    marginBottom: '1.5rem',
                    fontFamily: 'inherit'
                  }}
                >
                  ← رجوع
                </button>

                <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                  <span style={{ fontSize: '3rem', marginBottom: '0.5rem', display: 'block' }}>
                    {userTypes.find(t => t.id === userType)?.icon}
                  </span>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#1a1a2e' }}>
                    تسجيل كـ {userTypes.find(t => t.id === userType)?.title}
                  </h2>
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
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 700, marginBottom: '0.5rem', color: '#1a1a2e' }}>
                      الاسم الكامل
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="أدخل اسمك الكامل"
                      style={inputStyle}
                    />
                  </div>

                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 700, marginBottom: '0.5rem', color: '#1a1a2e' }}>
                      البريد الإلكتروني
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="example@email.com"
                      style={inputStyle}
                    />
                  </div>

                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 700, marginBottom: '0.5rem', color: '#1a1a2e' }}>
                      رقم الجوال
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="05XXXXXXXX"
                      style={inputStyle}
                    />
                  </div>

                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 700, marginBottom: '0.5rem', color: '#1a1a2e' }}>
                      كلمة المرور
                    </label>
                    <div style={{ position: 'relative' }}>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        minLength={8}
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        placeholder="8 أحرف على الأقل"
                        style={inputStyle}
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

                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 700, marginBottom: '0.5rem', color: '#1a1a2e' }}>
                      تأكيد كلمة المرور
                    </label>
                    <input
                      type="password"
                      required
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      placeholder="أعد كتابة كلمة المرور"
                      style={inputStyle}
                    />
                  </div>

                  <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '1.5rem', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={formData.terms}
                      onChange={(e) => setFormData({ ...formData, terms: e.target.checked })}
                      style={{ width: '1.25rem', height: '1.25rem', marginTop: '0.125rem', accentColor: '#8b5cf6' }}
                    />
                    <span style={{ fontSize: '0.875rem', color: '#64748b' }}>
                      أوافق على{' '}
                      <Link href="/terms" style={{ color: '#8b5cf6', fontWeight: 700, textDecoration: 'none' }}>
                        الشروط والأحكام
                      </Link>
                      {' '}و{' '}
                      <Link href="/privacy" style={{ color: '#8b5cf6', fontWeight: 700, textDecoration: 'none' }}>
                        سياسة الخصوصية
                      </Link>
                    </span>
                  </label>

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
                    {isLoading ? 'جاري التسجيل...' : 'إنشاء الحساب'}
                  </button>
                </form>
              </div>
            )}

            {/* Login Link */}
            <p style={{ marginTop: '2rem', textAlign: 'center', color: '#64748b' }}>
              لديك حساب؟{' '}
              <Link href={ROUTES.LOGIN} style={{ fontWeight: 700, color: '#8b5cf6', textDecoration: 'none' }}>
                تسجيل الدخول
              </Link>
            </p>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media (min-width: 1024px) {
          .lg\\:flex { display: flex !important; }
          .lg\\:w-1\\/2 { width: 50% !important; }
        }
      `}</style>
    </div>
  );
}
