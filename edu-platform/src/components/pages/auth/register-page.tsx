'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button, Input, Card } from '@/components/ui';
import { ROUTES, ROLE_DASHBOARD_ROUTES } from '@/lib/constants';
import { t } from '@/lib/translations';
import { useAuthStore } from '@/store/auth.store';
import type { UserRole } from '@/types';

type RegisterRole = 'teacher' | 'parent' | 'student';

const roleOptions: Array<{
  role: RegisterRole;
  title: string;
  description: string;
  icon: React.ReactNode;
}> = [
  {
    role: 'teacher',
    title: 'معلم',
    description: 'أريد تقديم دروس خصوصية',
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    role: 'parent',
    title: 'ولي أمر',
    description: 'أبحث عن معلم لأبنائي',
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    role: 'student',
    title: 'طالب',
    description: 'أبحث عن معلم لنفسي',
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path d="M12 14l9-5-9-5-9 5 9 5z" />
        <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
      </svg>
    ),
  },
];

export function RegisterPage() {
  const router = useRouter();
  const { register, isLoading } = useAuthStore();
  
  const [step, setStep] = React.useState<'role' | 'form'>('role');
  const [selectedRole, setSelectedRole] = React.useState<RegisterRole | null>(null);
  const [formData, setFormData] = React.useState({
    full_name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleRoleSelect = (role: RegisterRole) => {
    setSelectedRole(role);
    setStep('form');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  const validateForm = (): boolean => {
    if (formData.password.length < 8) {
      setError('كلمة المرور يجب أن تكون 8 أحرف على الأقل');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('كلمة المرور غير متطابقة');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm() || !selectedRole) return;
    
    const result = await register({
      email: formData.email,
      password: formData.password,
      full_name: formData.full_name,
      phone: formData.phone || undefined,
      role: selectedRole,
    });
    
    if (result.success) {
      const user = useAuthStore.getState().user;
      if (user) {
        const dashboardRoute = ROLE_DASHBOARD_ROUTES[user.role] || ROUTES.HOME;
        router.push(dashboardRoute);
      } else {
        // Teacher registration - redirect to login with message
        router.push(ROUTES.LOGIN);
      }
    } else {
      setError(result.error || 'حدث خطأ أثناء التسجيل');
    }
  };

  const handleBack = () => {
    setStep('role');
    setSelectedRole(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href={ROUTES.HOME} className="inline-block">
            <h1 className="text-3xl font-bold text-primary-600">
              {t('common.appName')}
            </h1>
          </Link>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            {step === 'role' ? t('auth.selectRole') : t('auth.registerSubtitle')}
          </p>
        </div>

        <Card className="p-6 sm:p-8">
          {step === 'role' ? (
            // Role Selection Step
            <div className="space-y-4">
              {roleOptions.map((option) => (
                <button
                  key={option.role}
                  onClick={() => handleRoleSelect(option.role)}
                  className={cn(
                    'w-full p-4 rounded-xl border-2 text-right transition-all',
                    'flex items-center gap-4',
                    'hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20',
                    'border-gray-200 dark:border-gray-700'
                  )}
                >
                  <div className="p-3 rounded-xl bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
                    {option.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                      {option.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {option.description}
                    </p>
                  </div>
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              ))}

              {/* Note about children */}
              <div className="mt-6 p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
                <p className="text-xs text-amber-700 dark:text-amber-400">
                  <strong>ملاحظة:</strong> الأطفال لا يمكنهم إنشاء حسابات بأنفسهم. يجب على ولي الأمر إضافتهم من لوحة التحكم.
                </p>
              </div>
            </div>
          ) : (
            // Registration Form Step
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Back Button */}
              <button
                type="button"
                onClick={handleBack}
                className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                {t('common.back')}
              </button>

              {/* Selected Role Badge */}
              <div className="flex items-center gap-2 p-3 rounded-lg bg-primary-50 dark:bg-primary-900/20">
                <div className="p-2 rounded-lg bg-primary-100 dark:bg-primary-900/30 text-primary-600">
                  {roleOptions.find((r) => r.role === selectedRole)?.icon}
                </div>
                <div>
                  <p className="text-xs text-primary-600 dark:text-primary-400">
                    {t('auth.registerAs')}
                  </p>
                  <p className="font-semibold text-primary-700 dark:text-primary-300">
                    {roleOptions.find((r) => r.role === selectedRole)?.title}
                  </p>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                  <p className="text-sm text-red-700 dark:text-red-400">
                    {error}
                  </p>
                </div>
              )}

              {/* Full Name */}
              <Input
                label={t('auth.fullName')}
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                placeholder="الاسم الكامل"
                required
                autoComplete="name"
                leftIcon={
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                }
              />

              {/* Email */}
              <Input
                label={t('auth.email')}
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@email.com"
                required
                autoComplete="email"
                leftIcon={
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                }
              />

              {/* Phone */}
              <Input
                label={t('auth.phone')}
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+966 5XX XXX XXXX"
                autoComplete="tel"
                dir="ltr"
                leftIcon={
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                }
              />

              {/* Password */}
              <div className="space-y-1">
                <Input
                  label={t('auth.password')}
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="8 أحرف على الأقل"
                  required
                  autoComplete="new-password"
                  leftIcon={
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  }
                  rightIcon={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                      {showPassword ? (
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      ) : (
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  }
                />
                <p className="text-xs text-gray-500">يجب أن تحتوي على 8 أحرف على الأقل</p>
              </div>

              {/* Confirm Password */}
              <Input
                label={t('auth.confirmPassword')}
                type={showPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="أعد كتابة كلمة المرور"
                required
                autoComplete="new-password"
                leftIcon={
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                }
              />

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full"
                size="lg"
                isLoading={isLoading}
              >
                {t('auth.createAccount')}
              </Button>

              {/* Terms */}
              <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                بإنشاء حساب، أنت توافق على{' '}
                <Link href={ROUTES.TERMS} className="text-primary-600 hover:underline">
                  شروط الاستخدام
                </Link>{' '}
                و{' '}
                <Link href={ROUTES.PRIVACY} className="text-primary-600 hover:underline">
                  سياسة الخصوصية
                </Link>
              </p>
            </form>
          )}

          {/* Login Link */}
          <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
            {t('auth.haveAccount')}{' '}
            <Link
              href={ROUTES.LOGIN}
              className="text-primary-600 hover:text-primary-700 dark:text-primary-400 font-medium"
            >
              {t('auth.loginNow')}
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
}
