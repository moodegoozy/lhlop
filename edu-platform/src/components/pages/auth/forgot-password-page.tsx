'use client';

import * as React from 'react';
import Link from 'next/link';
import { Button, Input, Card } from '@/components/ui';
import { ROUTES } from '@/lib/constants';
import { t } from '@/lib/translations';

export function ForgotPasswordPage() {
  const [email, setEmail] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // In production, this would send a reset email
    setIsSubmitted(true);
    setIsLoading(false);
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
        </div>

        <Card className="p-6 sm:p-8">
          {isSubmitted ? (
            // Success State
            <div className="text-center py-4">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <svg
                  className="h-8 w-8 text-green-600 dark:text-green-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                {t('auth.resetEmailSent')}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {t('auth.resetEmailSentDescription', { email })}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                لم تستلم البريد؟ تحقق من مجلد الرسائل غير المرغوب فيها أو{' '}
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-primary-600 hover:underline"
                >
                  حاول مرة أخرى
                </button>
              </p>
              <Link href={ROUTES.LOGIN}>
                <Button className="w-full">
                  {t('auth.backToLogin')}
                </Button>
              </Link>
            </div>
          ) : (
            // Form State
            <>
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                  <svg
                    className="h-8 w-8 text-primary-600 dark:text-primary-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  {t('auth.forgotPasswordTitle')}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {t('auth.forgotPasswordDescription')}
                </p>
              </div>

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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@email.com"
                  required
                  autoComplete="email"
                  leftIcon={
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
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
                  {t('auth.sendResetLink')}
                </Button>
              </form>

              {/* Back to Login */}
              <div className="mt-6 text-center">
                <Link
                  href={ROUTES.LOGIN}
                  className="inline-flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  {t('auth.backToLogin')}
                </Link>
              </div>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
