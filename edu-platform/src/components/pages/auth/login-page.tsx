'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button, Input, Card } from '@/components/ui';
import { ROUTES, ROLE_DASHBOARD_ROUTES } from '@/lib/constants';
import { t } from '@/lib/translations';
import { useAuthStore } from '@/store/auth.store';

export function LoginPage() {
  const router = useRouter();
  const { login, isLoading } = useAuthStore();
  
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = await login({ email: formData.email, password: formData.password });
    if (result.success) {
      // Get the user from store after successful login
      const user = useAuthStore.getState().user;
      if (user) {
        const dashboardRoute = ROLE_DASHBOARD_ROUTES[user.role] || ROUTES.HOME;
        router.push(dashboardRoute);
      }
    } else {
      setError(result.error || t('auth.invalidCredentials'));
    }
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
            {t('auth.loginSubtitle')}
          </p>
        </div>

        <Card className="p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Error Message */}
            {error && (
              <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
              </div>
            )}

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

            {/* Password */}
            <Input
              label={t('auth.password')}
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              autoComplete="current-password"
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

            {/* Forgot Password */}
            <div className="flex justify-end">
              <Link
                href={ROUTES.FORGOT_PASSWORD}
                className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400"
              >
                {t('auth.forgotPassword')}
              </Link>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full"
              size="lg"
              isLoading={isLoading}
            >
              {t('auth.login')}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-gray-700" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-white dark:bg-gray-800 text-gray-500">
                {t('auth.or')}
              </span>
            </div>
          </div>

          {/* Demo Accounts */}
          <div className="space-y-2">
            <p className="text-xs text-center text-gray-500 mb-3">
              {t('auth.demoAccounts')}
            </p>
            <div className="grid grid-cols-2 gap-2">
              <DemoButton
                label="معلم"
                email="teacher1@email.com"
                onClick={() => setFormData({ email: 'teacher1@email.com', password: 'password123' })}
              />
              <DemoButton
                label="ولي أمر"
                email="parent1@email.com"
                onClick={() => setFormData({ email: 'parent1@email.com', password: 'password123' })}
              />
              <DemoButton
                label="طالب"
                email="student1@email.com"
                onClick={() => setFormData({ email: 'student1@email.com', password: 'password123' })}
              />
              <DemoButton
                label="مدير"
                email="admin@email.com"
                onClick={() => setFormData({ email: 'admin@email.com', password: 'password123' })}
              />
            </div>
          </div>

          {/* Register Link */}
          <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
            {t('auth.noAccount')}{' '}
            <Link
              href={ROUTES.REGISTER}
              className="text-primary-600 hover:text-primary-700 dark:text-primary-400 font-medium"
            >
              {t('auth.registerNow')}
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
}

function DemoButton({
  label,
  email,
  onClick,
}: {
  label: string;
  email: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="px-3 py-2 text-xs rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300"
    >
      {label}
    </button>
  );
}
