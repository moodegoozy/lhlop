'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { DashboardShell, PageTitle, ContentCard } from '@/components/dashboard';
import { Badge } from '@/components/ui/badge';
import { 
  Ticket, 
  Check, 
  X, 
  Clock, 
  Percent, 
  Gift,
  ChevronLeft,
  Sparkles,
  AlertCircle
} from 'lucide-react';

// Mock coupons history
const mockCouponsHistory = [
  {
    id: '1',
    code: 'WELCOME50',
    discount: 50,
    type: 'percentage',
    usedAt: '2024-01-15',
    status: 'used',
    description: 'خصم ترحيبي للمستخدمين الجدد',
  },
  {
    id: '2',
    code: 'SUMMER25',
    discount: 25,
    type: 'fixed',
    usedAt: '2024-01-10',
    status: 'used',
    description: 'عرض الصيف',
  },
  {
    id: '3',
    code: 'EXPIRED100',
    discount: 100,
    type: 'fixed',
    expiresAt: '2024-01-01',
    status: 'expired',
    description: 'كوبون العيد',
  },
];

export default function CouponPage() {
  const [couponCode, setCouponCode] = React.useState('');
  const [isValidating, setIsValidating] = React.useState(false);
  const [validationResult, setValidationResult] = React.useState<{
    success: boolean;
    message: string;
    discount?: number;
    type?: string;
  } | null>(null);
  const [showSuccess, setShowSuccess] = React.useState(false);

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;

    setIsValidating(true);
    setValidationResult(null);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Mock validation
    if (couponCode.toUpperCase() === 'DISCOUNT20') {
      setValidationResult({
        success: true,
        message: 'تم تطبيق الكوبون بنجاح!',
        discount: 20,
        type: 'percentage',
      });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } else if (couponCode.toUpperCase() === 'SAVE50') {
      setValidationResult({
        success: true,
        message: 'تم تطبيق الكوبون بنجاح!',
        discount: 50,
        type: 'fixed',
      });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } else {
      setValidationResult({
        success: false,
        message: 'كود الخصم غير صالح أو منتهي الصلاحية',
      });
    }

    setIsValidating(false);
  };

  return (
    <DashboardShell>
      <PageTitle
        title="كوبونات الخصم"
        description="أدخل كود الخصم للحصول على تخفيض"
      />

      {/* Apply Coupon Card */}
      <ContentCard className="mb-6 overflow-hidden">
        <div className="relative">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-0 w-32 h-32 bg-primary-500 rounded-full -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-primary-500 rounded-full translate-x-1/4 translate-y-1/4" />
          </div>

          <div className="relative">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white">
                <Ticket className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white">إدخال كود الخصم</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">ادخل الكود للحصول على خصم</p>
              </div>
            </div>

            {/* Input */}
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => {
                    setCouponCode(e.target.value.toUpperCase());
                    setValidationResult(null);
                  }}
                  placeholder="أدخل كود الخصم..."
                  className={cn(
                    'w-full px-5 py-4 bg-gray-100 dark:bg-gray-800 rounded-2xl text-lg font-mono text-center tracking-widest border-2 transition-all',
                    validationResult?.success === true
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                      : validationResult?.success === false
                      ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                      : 'border-transparent focus:border-primary-500'
                  )}
                  style={{ direction: 'ltr' }}
                />
                {validationResult && (
                  <div className="absolute left-3 top-1/2 -translate-y-1/2">
                    {validationResult.success ? (
                      <Check className="w-6 h-6 text-green-500" />
                    ) : (
                      <X className="w-6 h-6 text-red-500" />
                    )}
                  </div>
                )}
              </div>
              <button
                onClick={handleApplyCoupon}
                disabled={!couponCode.trim() || isValidating}
                className={cn(
                  'px-8 py-4 rounded-2xl font-bold text-white transition-all',
                  !couponCode.trim() || isValidating
                    ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed'
                    : 'bg-primary-500 hover:bg-primary-600 shadow-lg shadow-primary-500/25 hover:shadow-xl'
                )}
              >
                {isValidating ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  'تطبيق'
                )}
              </button>
            </div>

            {/* Validation Message */}
            {validationResult && (
              <div
                className={cn(
                  'mt-4 p-4 rounded-xl flex items-center gap-3',
                  validationResult.success
                    ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                    : 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400'
                )}
              >
                {validationResult.success ? (
                  <Check className="w-5 h-5 shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 shrink-0" />
                )}
                <div>
                  <p className="font-medium">{validationResult.message}</p>
                  {validationResult.success && validationResult.discount && (
                    <p className="text-sm opacity-80 mt-1">
                      حصلت على خصم{' '}
                      {validationResult.type === 'percentage'
                        ? `${validationResult.discount}%`
                        : `${validationResult.discount} ر.س`}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </ContentCard>

      {/* Success Animation Overlay */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div className="relative">
            {/* Confetti effect */}
            <div className="absolute inset-0 -z-10">
              {[...Array(12)].map((_, i) => (
                <Sparkles
                  key={i}
                  className={cn(
                    'absolute w-8 h-8 text-amber-400 animate-ping',
                    i % 2 === 0 ? 'text-primary-400' : 'text-amber-400'
                  )}
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${i * 0.1}s`,
                    animationDuration: '1s',
                  }}
                />
              ))}
            </div>
            <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-2xl text-center animate-bounce">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-400 to-green-500 flex items-center justify-center">
                <Check className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                مبروك! 🎉
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                تم تطبيق الكوبون بنجاح
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Available Coupons */}
      <ContentCard className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Gift className="w-5 h-5 text-primary-500" />
            <h3 className="font-bold text-gray-900 dark:text-white">كوبونات متاحة</h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Sample Available Coupons */}
          <div className="relative overflow-hidden bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 rounded-2xl p-4 border-2 border-dashed border-primary-300 dark:border-primary-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-primary-600 dark:text-primary-400 mb-1">خصم 20%</p>
                <p className="font-bold font-mono text-lg text-primary-700 dark:text-primary-300" style={{ direction: 'ltr' }}>
                  DISCOUNT20
                </p>
                <p className="text-xs text-primary-500 dark:text-primary-400 mt-2">
                  صالح حتى نهاية الشهر
                </p>
              </div>
              <div className="w-16 h-16 rounded-full bg-primary-200 dark:bg-primary-800/50 flex items-center justify-center">
                <Percent className="w-8 h-8 text-primary-600 dark:text-primary-400" />
              </div>
            </div>
            <button
              onClick={() => {
                setCouponCode('DISCOUNT20');
                setValidationResult(null);
              }}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>

          <div className="relative overflow-hidden bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 rounded-2xl p-4 border-2 border-dashed border-amber-300 dark:border-amber-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-amber-600 dark:text-amber-400 mb-1">خصم ثابت</p>
                <p className="font-bold font-mono text-lg text-amber-700 dark:text-amber-300" style={{ direction: 'ltr' }}>
                  SAVE50
                </p>
                <p className="text-xs text-amber-500 dark:text-amber-400 mt-2">
                  50 ر.س خصم على الحجز
                </p>
              </div>
              <div className="w-16 h-16 rounded-full bg-amber-200 dark:bg-amber-800/50 flex items-center justify-center">
                <Gift className="w-8 h-8 text-amber-600 dark:text-amber-400" />
              </div>
            </div>
            <button
              onClick={() => {
                setCouponCode('SAVE50');
                setValidationResult(null);
              }}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
        </div>
      </ContentCard>

      {/* Coupon History */}
      <ContentCard>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-900 dark:text-white">سجل الكوبونات</h3>
        </div>

        {mockCouponsHistory.length > 0 ? (
          <div className="space-y-3">
            {mockCouponsHistory.map((coupon) => (
              <div
                key={coupon.id}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={cn(
                      'w-12 h-12 rounded-xl flex items-center justify-center',
                      coupon.status === 'used'
                        ? 'bg-green-100 dark:bg-green-900/30'
                        : 'bg-gray-100 dark:bg-gray-800'
                    )}
                  >
                    {coupon.status === 'used' ? (
                      <Check className="w-6 h-6 text-green-500" />
                    ) : (
                      <Clock className="w-6 h-6 text-gray-400" />
                    )}
                  </div>
                  <div>
                    <p className="font-bold font-mono text-gray-900 dark:text-white" style={{ direction: 'ltr' }}>
                      {coupon.code}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {coupon.description}
                    </p>
                  </div>
                </div>

                <div className="text-left">
                  <Badge
                    className={cn(
                      coupon.status === 'used'
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400'
                    )}
                  >
                    {coupon.status === 'used' ? 'مستخدم' : 'منتهي'}
                  </Badge>
                  <p className="text-xs text-gray-400 mt-1">
                    {coupon.status === 'used'
                      ? new Date(coupon.usedAt!).toLocaleDateString('ar-SA')
                      : new Date(coupon.expiresAt!).toLocaleDateString('ar-SA')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Ticket className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
            <p className="text-gray-500 dark:text-gray-400">لا يوجد سجل كوبونات</p>
          </div>
        )}
      </ContentCard>
    </DashboardShell>
  );
}
