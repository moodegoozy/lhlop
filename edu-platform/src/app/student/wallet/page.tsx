'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { DashboardShell, PageTitle, ContentCard, StatCard } from '@/components/dashboard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Wallet,
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  CreditCard,
  Smartphone,
  Building,
  Check,
  Clock,
  X,
  TrendingUp,
  Gift,
} from 'lucide-react';
import { useDashboardStore } from '@/store/dashboard.store';

// Mock transaction history
const mockTransactions = [
  {
    id: '1',
    type: 'deposit' as const,
    amount: 500,
    description: 'شحن المحفظة - Apple Pay',
    date: '2024-01-20T10:00:00Z',
    status: 'completed' as const,
  },
  {
    id: '2',
    type: 'payment' as const,
    amount: 150,
    description: 'حصة رياضيات - أ. محمد العلي',
    date: '2024-01-18T14:00:00Z',
    status: 'completed' as const,
  },
  {
    id: '3',
    type: 'payment' as const,
    amount: 120,
    description: 'حصة إنجليزي - أ. نورة الخالد',
    date: '2024-01-16T18:00:00Z',
    status: 'completed' as const,
  },
  {
    id: '4',
    type: 'refund' as const,
    amount: 100,
    description: 'استرداد - حصة ملغاة',
    date: '2024-01-15T09:00:00Z',
    status: 'completed' as const,
  },
  {
    id: '5',
    type: 'deposit' as const,
    amount: 200,
    description: 'شحن المحفظة - بطاقة مدى',
    date: '2024-01-10T12:00:00Z',
    status: 'completed' as const,
  },
];

const paymentMethods = [
  { id: 'apple', name: 'Apple Pay', icon: Smartphone, color: 'bg-black' },
  { id: 'mada', name: 'مدى', icon: CreditCard, color: 'bg-green-600' },
  { id: 'visa', name: 'Visa / Mastercard', icon: CreditCard, color: 'bg-blue-600' },
  { id: 'bank', name: 'تحويل بنكي', icon: Building, color: 'bg-gray-600' },
];

const quickAmounts = [50, 100, 200, 500, 1000];

export default function WalletPage() {
  const { walletBalance } = useDashboardStore();
  const [showAddFunds, setShowAddFunds] = React.useState(false);
  const [selectedAmount, setSelectedAmount] = React.useState<number | null>(null);
  const [customAmount, setCustomAmount] = React.useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = React.useState<string | null>(null);

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'deposit':
        return <ArrowDownLeft className="w-5 h-5" />;
      case 'payment':
        return <ArrowUpRight className="w-5 h-5" />;
      case 'refund':
        return <Gift className="w-5 h-5" />;
      default:
        return <Wallet className="w-5 h-5" />;
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'deposit':
        return 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400';
      case 'payment':
        return 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400';
      case 'refund':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400';
      default:
        return 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
            <Check className="w-3 h-3 ml-1" />
            مكتملة
          </Badge>
        );
      case 'pending':
        return (
          <Badge variant="secondary" className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
            <Clock className="w-3 h-3 ml-1" />
            قيد التنفيذ
          </Badge>
        );
      case 'failed':
        return (
          <Badge variant="secondary" className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
            <X className="w-3 h-3 ml-1" />
            فشلت
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <DashboardShell>
      <PageTitle
        title="المحفظة"
        description="إدارة رصيدك والمعاملات المالية"
      />

      {/* Balance Card */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 rounded-3xl p-6 md:p-8 mb-6 text-white">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/10 rounded-full translate-x-1/4 translate-y-1/4 blur-2xl" />
        
        <div className="relative">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="text-sm text-white/80 mb-2">الرصيد الحالي</p>
              <p className="text-4xl md:text-5xl font-bold">{walletBalance} ر.س</p>
              <div className="flex items-center gap-2 mt-3">
                <span className="inline-flex items-center gap-1 text-sm bg-white/20 rounded-full px-3 py-1">
                  <TrendingUp className="w-4 h-4" />
                  +12% هذا الشهر
                </span>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => setShowAddFunds(true)}
                variant="secondary"
                className="bg-white text-primary-600 hover:bg-white/90 shadow-lg"
              >
                <Plus className="w-4 h-4 ml-2" />
                شحن المحفظة
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="إجمالي الإيداعات"
          value="700 ر.س"
          icon={<ArrowDownLeft className="w-5 h-5" />}
          iconColor="green"
        />
        <StatCard
          title="إجمالي المدفوعات"
          value="270 ر.س"
          icon={<ArrowUpRight className="w-5 h-5" />}
          iconColor="red"
        />
        <StatCard
          title="المستردات"
          value="100 ر.س"
          icon={<Gift className="w-5 h-5" />}
          iconColor="blue"
        />
        <StatCard
          title="عدد المعاملات"
          value="5"
          icon={<CreditCard className="w-5 h-5" />}
          iconColor="purple"
        />
      </div>

      {/* Transactions */}
      <ContentCard title="سجل المعاملات">
        <div className="space-y-3">
          {mockTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-800/30 hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div
                  className={cn(
                    'w-12 h-12 rounded-xl flex items-center justify-center',
                    getTransactionColor(transaction.type)
                  )}
                >
                  {getTransactionIcon(transaction.type)}
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {transaction.description}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(transaction.date).toLocaleDateString('ar-SA', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
              <div className="text-left">
                <p
                  className={cn(
                    'font-bold',
                    transaction.type === 'payment'
                      ? 'text-red-600 dark:text-red-400'
                      : 'text-green-600 dark:text-green-400'
                  )}
                >
                  {transaction.type === 'payment' ? '-' : '+'}
                  {transaction.amount} ر.س
                </p>
                <div className="mt-1">{getStatusBadge(transaction.status)}</div>
              </div>
            </div>
          ))}
        </div>
      </ContentCard>

      {/* Add Funds Modal */}
      {showAddFunds && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowAddFunds(false)}
          />
          <div className="relative bg-white dark:bg-gray-900 rounded-3xl w-full max-w-md p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              شحن المحفظة
            </h2>

            {/* Quick Amounts */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                اختر المبلغ
              </label>
              <div className="grid grid-cols-5 gap-2">
                {quickAmounts.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => {
                      setSelectedAmount(amount);
                      setCustomAmount('');
                    }}
                    className={cn(
                      'py-3 rounded-xl text-sm font-medium transition-all',
                      selectedAmount === amount
                        ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/25'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    )}
                  >
                    {amount}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Amount */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                أو أدخل مبلغ آخر
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setSelectedAmount(null);
                  }}
                  placeholder="0"
                  className={cn(
                    'w-full h-12 pr-4 pl-16 rounded-xl',
                    'bg-gray-100 dark:bg-gray-800 border-0',
                    'text-lg font-medium text-gray-900 dark:text-white',
                    'focus:outline-none focus:ring-2 focus:ring-primary-500',
                    'placeholder:text-gray-400'
                  )}
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 font-medium">
                  ر.س
                </span>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                طريقة الدفع
              </label>
              <div className="space-y-2">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setSelectedPaymentMethod(method.id)}
                    className={cn(
                      'w-full flex items-center gap-3 p-3 rounded-xl transition-all',
                      selectedPaymentMethod === method.id
                        ? 'bg-primary-50 dark:bg-primary-900/20 ring-2 ring-primary-500'
                        : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                    )}
                  >
                    <div
                      className={cn(
                        'w-10 h-10 rounded-lg flex items-center justify-center text-white',
                        method.color
                      )}
                    >
                      <method.icon className="w-5 h-5" />
                    </div>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {method.name}
                    </span>
                    {selectedPaymentMethod === method.id && (
                      <Check className="w-5 h-5 text-primary-600 mr-auto" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                variant="secondary"
                className="flex-1"
                onClick={() => setShowAddFunds(false)}
              >
                إلغاء
              </Button>
              <Button
                className="flex-1"
                disabled={!selectedAmount && !customAmount}
              >
                شحن {selectedAmount || customAmount || 0} ر.س
              </Button>
            </div>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}
