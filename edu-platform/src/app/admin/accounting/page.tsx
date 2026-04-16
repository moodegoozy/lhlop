'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  CreditCard,
  Building,
  ArrowUpRight,
  ArrowDownLeft,
  Clock,
  Check,
  X,
  AlertCircle,
  Calendar,
  Download,
  Upload,
  Filter,
  Search,
  ChevronLeft,
  ChevronRight,
  FileText,
  Receipt,
  PieChart,
  BarChart3,
  Banknote,
  Landmark,
  CircleDollarSign,
  RefreshCw,
  Send,
  Eye,
} from 'lucide-react';

// Types
interface TeacherPayout {
  id: string;
  teacherName: string;
  teacherAvatar: string;
  totalEarnings: number;
  platformFee: number;
  netAmount: number;
  lessonsCount: number;
  period: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  requestedAt: string;
  processedAt?: string;
  transferMethod: 'bank' | 'wallet';
  bankInfo?: string;
  receiptUrl?: string;
  isEarlyPayout: boolean;
  earlyPayoutFee: number;
}

interface FinancialTransaction {
  id: string;
  type: 'income' | 'expense' | 'payout' | 'refund' | 'subscription';
  description: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  category: string;
  reference: string;
  date: string;
  userName?: string;
}

// Mock Data
const mockAccountingStats = {
  totalRevenue: {
    value: 1245800,
    change: 15.3,
    period: 'هذا الشهر',
  },
  platformEarnings: {
    value: 186870,
    change: 12.8,
    percentage: 15, // Platform takes 15%
  },
  teacherPayouts: {
    value: 1058930,
    pending: 125000,
    nextPayoutDate: '2024-01-25',
  },
  studentBalances: {
    total: 89500,
    activeWallets: 1234,
  },
  subscriptions: {
    revenue: 45000,
    activeCount: 156,
    growth: 8.5,
  },
  netProfit: {
    value: 141870,
    change: 18.2,
  },
};

const mockTeacherPayouts: TeacherPayout[] = [
  {
    id: 'PO001',
    teacherName: 'أ. فهد السعيد',
    teacherAvatar: '',
    totalEarnings: 15000,
    platformFee: 2250,
    netAmount: 12750,
    lessonsCount: 85,
    period: '1-15 يناير 2024',
    status: 'pending',
    requestedAt: '2024-01-16T10:00:00Z',
    transferMethod: 'bank',
    bankInfo: 'الراجحي ****4532',
    isEarlyPayout: false,
    earlyPayoutFee: 0,
  },
  {
    id: 'PO002',
    teacherName: 'أ. نورة العتيبي',
    teacherAvatar: '',
    totalEarnings: 12500,
    platformFee: 1875,
    netAmount: 10620,
    lessonsCount: 72,
    period: '1-15 يناير 2024',
    status: 'processing',
    requestedAt: '2024-01-16T09:00:00Z',
    transferMethod: 'bank',
    bankInfo: 'الأهلي ****7821',
    isEarlyPayout: true,
    earlyPayoutFee: 5,
  },
  {
    id: 'PO003',
    teacherName: 'أ. خالد المالكي',
    teacherAvatar: '',
    totalEarnings: 18000,
    platformFee: 2700,
    netAmount: 15300,
    lessonsCount: 102,
    period: '16-31 ديسمبر 2023',
    status: 'completed',
    requestedAt: '2024-01-01T10:00:00Z',
    processedAt: '2024-01-02T14:00:00Z',
    transferMethod: 'bank',
    bankInfo: 'الراجحي ****9012',
    receiptUrl: '#',
    isEarlyPayout: false,
    earlyPayoutFee: 0,
  },
  {
    id: 'PO004',
    teacherName: 'أ. منى السالم',
    teacherAvatar: '',
    totalEarnings: 8500,
    platformFee: 1275,
    netAmount: 7225,
    lessonsCount: 48,
    period: '16-31 ديسمبر 2023',
    status: 'completed',
    requestedAt: '2024-01-01T11:00:00Z',
    processedAt: '2024-01-02T15:00:00Z',
    transferMethod: 'wallet',
    isEarlyPayout: false,
    earlyPayoutFee: 0,
  },
];

const mockTransactions: FinancialTransaction[] = [
  { id: 'TXN001', type: 'income', description: 'حجز حصة - أحمد محمد', amount: 150, status: 'completed', category: 'حجوزات', reference: 'BK001', date: '2024-01-20T10:00:00Z', userName: 'أحمد محمد' },
  { id: 'TXN002', type: 'income', description: 'حجز دورة - سارة خالد', amount: 500, status: 'completed', category: 'دورات', reference: 'BK002', date: '2024-01-20T09:30:00Z', userName: 'سارة خالد' },
  { id: 'TXN003', type: 'payout', description: 'صرف مستحقات - أ. خالد المالكي', amount: 15300, status: 'completed', category: 'مستحقات معلمين', reference: 'PO003', date: '2024-01-02T14:00:00Z' },
  { id: 'TXN004', type: 'refund', description: 'استرداد حجز ملغي', amount: 120, status: 'completed', category: 'استرداد', reference: 'RF001', date: '2024-01-19T16:00:00Z', userName: 'محمد عبدالله' },
  { id: 'TXN005', type: 'subscription', description: 'اشتراك شهري - باقة بريميوم', amount: 299, status: 'completed', category: 'اشتراكات', reference: 'SUB001', date: '2024-01-18T12:00:00Z', userName: 'فهد العمري' },
  { id: 'TXN006', type: 'income', description: 'شحن محفظة', amount: 500, status: 'pending', category: 'شحن رصيد', reference: 'WAL001', date: '2024-01-20T11:00:00Z', userName: 'نورة السعيد' },
];

const statusConfig: Record<string, { label: string; color: string; icon: typeof Check }> = {
  pending: { label: 'قيد الانتظار', color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400', icon: Clock },
  processing: { label: 'قيد التحويل', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400', icon: RefreshCw },
  completed: { label: 'مكتمل', color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400', icon: Check },
  failed: { label: 'فشل', color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400', icon: X },
};

const transactionTypeConfig: Record<string, { label: string; color: string; icon: typeof ArrowUpRight }> = {
  income: { label: 'دخل', color: 'text-green-500', icon: ArrowDownLeft },
  expense: { label: 'مصروف', color: 'text-red-500', icon: ArrowUpRight },
  payout: { label: 'صرف', color: 'text-blue-500', icon: Send },
  refund: { label: 'استرداد', color: 'text-orange-500', icon: RefreshCw },
  subscription: { label: 'اشتراك', color: 'text-purple-500', icon: CreditCard },
};

export default function AccountingPage() {
  const [activeTab, setActiveTab] = React.useState<'overview' | 'payouts' | 'transactions'>('overview');
  const [payoutFilter, setPayoutFilter] = React.useState<string | null>(null);
  const [searchQuery, setSearchQuery] = React.useState('');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-SA', {
      style: 'decimal',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            المحاسبة والمالية
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            إدارة الإيرادات والمستحقات والتقارير المالية
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 ml-2" />
            تصدير التقارير
          </Button>
          <Button className="shadow-lg">
            <Send className="w-4 h-4 ml-2" />
            صرف المستحقات
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 mb-6 p-1 bg-gray-100 dark:bg-gray-800 rounded-xl w-fit">
        {[
          { id: 'overview', label: 'نظرة عامة', icon: PieChart },
          { id: 'payouts', label: 'مستحقات المعلمين', icon: Users },
          { id: 'transactions', label: 'المعاملات', icon: Receipt },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={cn(
                'px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2',
                activeTab === tab.id
                  ? 'bg-white dark:bg-gray-700 text-primary-600 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              )}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {activeTab === 'overview' && (
        <>
          {/* Financial Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {/* Total Revenue */}
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-5 text-white">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                  <DollarSign className="w-6 h-6" />
                </div>
                <Badge className="bg-white/20 text-white border-0">
                  <TrendingUp className="w-3 h-3 ml-1" />
                  +{mockAccountingStats.totalRevenue.change}%
                </Badge>
              </div>
              <p className="text-white/80 text-sm mb-1">{mockAccountingStats.totalRevenue.period}</p>
              <p className="text-3xl font-bold">{formatCurrency(mockAccountingStats.totalRevenue.value)} ر.س</p>
              <p className="text-white/80 text-sm mt-2">إجمالي الإيرادات</p>
            </div>

            {/* Platform Earnings */}
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-5 text-white">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                  <Landmark className="w-6 h-6" />
                </div>
                <Badge className="bg-white/20 text-white border-0">
                  {mockAccountingStats.platformEarnings.percentage}% من الإيرادات
                </Badge>
              </div>
              <p className="text-white/80 text-sm mb-1">أرباح المنصة</p>
              <p className="text-3xl font-bold">{formatCurrency(mockAccountingStats.platformEarnings.value)} ر.س</p>
              <div className="flex items-center gap-2 mt-2">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm">+{mockAccountingStats.platformEarnings.change}% عن الشهر السابق</span>
              </div>
            </div>

            {/* Net Profit */}
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-5 text-white">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                  <CircleDollarSign className="w-6 h-6" />
                </div>
                <Badge className="bg-white/20 text-white border-0">
                  <TrendingUp className="w-3 h-3 ml-1" />
                  +{mockAccountingStats.netProfit.change}%
                </Badge>
              </div>
              <p className="text-white/80 text-sm mb-1">صافي الربح</p>
              <p className="text-3xl font-bold">{formatCurrency(mockAccountingStats.netProfit.value)} ر.س</p>
              <p className="text-white/80 text-sm mt-2">بعد خصم جميع المصاريف</p>
            </div>
          </div>

          {/* Secondary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Teacher Payouts */}
            <div className="bg-white dark:bg-gray-900/50 rounded-2xl border border-gray-200 dark:border-gray-800 p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                  <Users className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">مستحقات المعلمين</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                    {formatCurrency(mockAccountingStats.teacherPayouts.value)} ر.س
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">قيد الانتظار</span>
                  <span className="font-semibold text-orange-600">{formatCurrency(mockAccountingStats.teacherPayouts.pending)} ر.س</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">موعد الصرف القادم</span>
                  <span className="font-medium">{mockAccountingStats.teacherPayouts.nextPayoutDate}</span>
                </div>
              </div>
            </div>

            {/* Student Balances */}
            <div className="bg-white dark:bg-gray-900/50 rounded-2xl border border-gray-200 dark:border-gray-800 p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center">
                  <Wallet className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">أرصدة الطلاب</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                    {formatCurrency(mockAccountingStats.studentBalances.total)} ر.س
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">محافظ نشطة</span>
                <span className="font-semibold">{mockAccountingStats.studentBalances.activeWallets}</span>
              </div>
            </div>

            {/* Subscriptions */}
            <div className="bg-white dark:bg-gray-900/50 rounded-2xl border border-gray-200 dark:border-gray-800 p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">إيرادات الاشتراكات</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                    {formatCurrency(mockAccountingStats.subscriptions.revenue)} ر.س
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">اشتراكات نشطة</span>
                  <span className="font-semibold">{mockAccountingStats.subscriptions.activeCount}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">نمو</span>
                  <Badge className="bg-green-100 text-green-700">+{mockAccountingStats.subscriptions.growth}%</Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Cash Flow Chart Placeholder */}
          <div className="bg-white dark:bg-gray-900/50 rounded-2xl border border-gray-200 dark:border-gray-800 p-5 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary-500" />
                التدفق النقدي
              </h3>
              <select className="text-sm border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-1.5 bg-white dark:bg-gray-800">
                <option>آخر 30 يوم</option>
                <option>آخر 3 أشهر</option>
                <option>هذا العام</option>
              </select>
            </div>
            <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-800/50 rounded-xl">
              <p className="text-gray-500">رسم بياني للتدفق النقدي</p>
            </div>
          </div>

          {/* Quick Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-gray-900/50 rounded-2xl border border-gray-200 dark:border-gray-800 p-4 text-center">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">4,521</p>
              <p className="text-sm text-gray-500">ساعة مباعة</p>
            </div>
            <div className="bg-white dark:bg-gray-900/50 rounded-2xl border border-gray-200 dark:border-gray-800 p-4 text-center">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">89.2%</p>
              <p className="text-sm text-gray-500">نسبة التحصيل</p>
            </div>
            <div className="bg-white dark:bg-gray-900/50 rounded-2xl border border-gray-200 dark:border-gray-800 p-4 text-center">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">156</p>
              <p className="text-sm text-gray-500">فاتورة صادرة</p>
            </div>
            <div className="bg-white dark:bg-gray-900/50 rounded-2xl border border-gray-200 dark:border-gray-800 p-4 text-center">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">12</p>
              <p className="text-sm text-gray-500">استرداد هذا الشهر</p>
            </div>
          </div>
        </>
      )}

      {activeTab === 'payouts' && (
        <>
          {/* Payout Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white dark:bg-gray-900/50 rounded-2xl border border-gray-200 dark:border-gray-800 p-4">
              <p className="text-sm text-gray-500 mb-1">إجمالي المستحقات</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(125000)} ر.س</p>
            </div>
            <div className="bg-white dark:bg-gray-900/50 rounded-2xl border border-gray-200 dark:border-gray-800 p-4">
              <p className="text-sm text-gray-500 mb-1">معلمين ينتظرون الصرف</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">12</p>
            </div>
            <div className="bg-white dark:bg-gray-900/50 rounded-2xl border border-gray-200 dark:border-gray-800 p-4">
              <p className="text-sm text-gray-500 mb-1">موعد الصرف القادم</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">25 يناير</p>
            </div>
            <div className="bg-white dark:bg-gray-900/50 rounded-2xl border border-gray-200 dark:border-gray-800 p-4">
              <p className="text-sm text-gray-500 mb-1">صرف مبكر (رسوم 5 ر.س)</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">3 طلبات</p>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-6">
            <div className="relative flex-1 w-full md:w-auto">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="بحث باسم المعلم..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-80 pr-10 pl-4 py-2.5 bg-white dark:bg-gray-800 rounded-xl text-sm border border-gray-200 dark:border-gray-700"
              />
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
              {['الكل', 'قيد الانتظار', 'قيد التحويل', 'مكتمل'].map((filter, i) => (
                <button
                  key={filter}
                  onClick={() => setPayoutFilter(i === 0 ? null : filter)}
                  className={cn(
                    'px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all',
                    (payoutFilter === filter || (payoutFilter === null && i === 0))
                      ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400'
                      : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                  )}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Payouts Table */}
          <div className="bg-white dark:bg-gray-900/50 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800">
                    <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase">المعلم</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase">الفترة</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase">الحصص</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase">الإجمالي</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase">عمولة المنصة</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase">الصافي</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase">طريقة التحويل</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase">الحالة</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase">إجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {mockTeacherPayouts.map((payout) => {
                    const status = statusConfig[payout.status];

                    return (
                      <tr key={payout.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <Avatar className="w-10 h-10">
                              <AvatarFallback className="bg-primary-100 text-primary-700">
                                {payout.teacherName.charAt(2)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">{payout.teacherName}</p>
                              <p className="text-xs text-gray-500">{payout.id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{payout.period}</td>
                        <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">{payout.lessonsCount}</td>
                        <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">{formatCurrency(payout.totalEarnings)} ر.س</td>
                        <td className="px-4 py-3 text-sm text-red-500">-{formatCurrency(payout.platformFee)} ر.س</td>
                        <td className="px-4 py-3">
                          <div>
                            <p className="font-bold text-green-600">{formatCurrency(payout.netAmount)} ر.س</p>
                            {payout.isEarlyPayout && (
                              <p className="text-xs text-orange-500">-{payout.earlyPayoutFee} ر.س رسوم صرف مبكر</p>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            {payout.transferMethod === 'bank' ? (
                              <Building className="w-4 h-4 text-gray-400" />
                            ) : (
                              <Wallet className="w-4 h-4 text-gray-400" />
                            )}
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                              {payout.bankInfo || 'المحفظة'}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <Badge className={status.color}>{status.label}</Badge>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Eye className="w-4 h-4" />
                            </Button>
                            {payout.status === 'pending' && (
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-green-500">
                                <Send className="w-4 h-4" />
                              </Button>
                            )}
                            {payout.receiptUrl && (
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Download className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {activeTab === 'transactions' && (
        <>
          {/* Transactions Filters */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-6">
            <div className="relative flex-1 w-full md:w-auto">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="بحث في المعاملات..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-80 pr-10 pl-4 py-2.5 bg-white dark:bg-gray-800 rounded-xl text-sm border border-gray-200 dark:border-gray-700"
              />
            </div>
            <div className="flex items-center gap-2">
              <select className="text-sm border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2.5 bg-white dark:bg-gray-800">
                <option>جميع الأنواع</option>
                <option>دخل</option>
                <option>مصروف</option>
                <option>صرف مستحقات</option>
                <option>استرداد</option>
              </select>
              <select className="text-sm border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2.5 bg-white dark:bg-gray-800">
                <option>آخر 7 أيام</option>
                <option>آخر 30 يوم</option>
                <option>هذا الشهر</option>
                <option>آخر 3 أشهر</option>
              </select>
            </div>
          </div>

          {/* Transactions List */}
          <div className="bg-white dark:bg-gray-900/50 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
            <div className="divide-y divide-gray-100 dark:divide-gray-800">
              {mockTransactions.map((transaction) => {
                const typeConfig = transactionTypeConfig[transaction.type];
                const TypeIcon = typeConfig.icon;

                return (
                  <div key={transaction.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={cn(
                          'w-10 h-10 rounded-xl flex items-center justify-center',
                          transaction.type === 'income' || transaction.type === 'subscription'
                            ? 'bg-green-100 dark:bg-green-900/30'
                            : transaction.type === 'refund' || transaction.type === 'expense'
                            ? 'bg-red-100 dark:bg-red-900/30'
                            : 'bg-blue-100 dark:bg-blue-900/30'
                        )}>
                          <TypeIcon className={cn('w-5 h-5', typeConfig.color)} />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{transaction.description}</p>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <span>{transaction.category}</span>
                            <span>•</span>
                            <span>{transaction.reference}</span>
                            {transaction.userName && (
                              <>
                                <span>•</span>
                                <span>{transaction.userName}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-left">
                        <p className={cn(
                          'font-bold',
                          transaction.type === 'income' || transaction.type === 'subscription'
                            ? 'text-green-600'
                            : transaction.type === 'refund' || transaction.type === 'expense' || transaction.type === 'payout'
                            ? 'text-red-600'
                            : 'text-gray-900 dark:text-white'
                        )}>
                          {transaction.type === 'income' || transaction.type === 'subscription' ? '+' : '-'}
                          {formatCurrency(transaction.amount)} ر.س
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(transaction.date).toLocaleDateString('ar-SA')}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between p-4 border-t border-gray-200 dark:border-gray-800">
              <p className="text-sm text-gray-500">عرض 1-{mockTransactions.length} من 156 معاملة</p>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled>
                  <ChevronRight className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" className="bg-primary-50 border-primary-200">1</Button>
                <Button variant="outline" size="sm">2</Button>
                <Button variant="outline" size="sm">3</Button>
                <Button variant="outline" size="sm">
                  <ChevronLeft className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
