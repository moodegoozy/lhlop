'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Download,
  Calendar,
  Clock,
  Users,
  BookOpen,
  DollarSign,
  Star,
  Award,
  Wallet,
  Package,
  Gift,
  Ticket,
  FileText,
  PieChart,
  LineChart,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  RefreshCw,
  Video,
  MapPin,
  PlayCircle,
} from 'lucide-react';

// Types
interface ReportCard {
  id: string;
  title: string;
  value: string | number;
  change: number;
  icon: typeof BarChart3;
  color: string;
  description: string;
}

// Mock Data
const mockReports = {
  totalHoursSold: { value: 4521, change: 12.5 },
  avgSessionDuration: { value: 58, change: 3.2 },
  bestStudents: [
    { id: '1', name: 'أحمد محمد', spending: 4500, lessons: 32, avatar: '' },
    { id: '2', name: 'سارة خالد', spending: 3800, lessons: 28, avatar: '' },
    { id: '3', name: 'محمد عبدالله', spending: 3200, lessons: 24, avatar: '' },
    { id: '4', name: 'نورة السعيد', spending: 2900, lessons: 21, avatar: '' },
    { id: '5', name: 'فهد العمري', spending: 2500, lessons: 18, avatar: '' },
  ],
  bestTeachers: [
    { id: '1', name: 'أ. فهد السعيد', earnings: 18500, rating: 4.9, lessons: 125, avatar: '' },
    { id: '2', name: 'أ. نورة العتيبي', earnings: 15200, rating: 4.8, lessons: 98, avatar: '' },
    { id: '3', name: 'أ. خالد المالكي', earnings: 14800, rating: 4.9, lessons: 95, avatar: '' },
    { id: '4', name: 'أ. منى السالم', earnings: 12500, rating: 4.7, lessons: 82, avatar: '' },
    { id: '5', name: 'أ. عبدالرحمن الشهري', earnings: 11200, rating: 4.8, lessons: 75, avatar: '' },
  ],
  bestPackages: [
    { id: '1', name: 'باقة التميز', sales: 156, revenue: 78000, type: 'رياضيات' },
    { id: '2', name: 'باقة المبتدئين', sales: 142, revenue: 42600, type: 'إنجليزي' },
    { id: '3', name: 'باقة الاختبارات', sales: 98, revenue: 58800, type: 'قدرات' },
    { id: '4', name: 'باقة البرمجة', sales: 75, revenue: 52500, type: 'برمجة' },
  ],
  walletStats: {
    totalBalance: 89500,
    totalDeposits: 125000,
    totalSpent: 35500,
    activeWallets: 1234,
  },
  remainingSessions: {
    total: 2456,
    expiringSoon: 345,
    expired: 89,
  },
  revenueByType: [
    { type: 'online', label: 'أونلاين', revenue: 845000, percentage: 68, icon: Video },
    { type: 'offline', label: 'حضوري', revenue: 248000, percentage: 20, icon: MapPin },
    { type: 'recorded', label: 'مسجل', revenue: 99000, percentage: 8, icon: PlayCircle },
    { type: 'group', label: 'جماعي', revenue: 53800, percentage: 4, icon: Users },
  ],
  invoiceStats: {
    total: 1245,
    paid: 1156,
    pending: 67,
    overdue: 22,
    totalAmount: 1245800,
  },
  giftStats: {
    total: 234,
    used: 198,
    expired: 12,
    totalValue: 35100,
  },
  couponStats: {
    total: 45,
    active: 32,
    used: 1567,
    totalDiscount: 78350,
  },
};

export default function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = React.useState('month');
  const [activeReport, setActiveReport] = React.useState('overview');

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
            التقارير والتحليلات
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            تحليلات شاملة وتقارير تفصيلية
          </p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="text-sm border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2.5 bg-white dark:bg-gray-800"
          >
            <option value="week">هذا الأسبوع</option>
            <option value="month">هذا الشهر</option>
            <option value="quarter">آخر 3 أشهر</option>
            <option value="year">هذا العام</option>
          </select>
          <Button variant="outline">
            <RefreshCw className="w-4 h-4 ml-2" />
            تحديث
          </Button>
          <Button className="shadow-lg">
            <Download className="w-4 h-4 ml-2" />
            تصدير PDF
          </Button>
        </div>
      </div>

      {/* Report Categories */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
        {[
          { id: 'overview', label: 'نظرة عامة', icon: PieChart },
          { id: 'students', label: 'الطلاب', icon: Users },
          { id: 'teachers', label: 'المعلمين', icon: Award },
          { id: 'packages', label: 'الباقات', icon: Package },
          { id: 'revenue', label: 'الإيرادات', icon: DollarSign },
          { id: 'invoices', label: 'الفواتير', icon: FileText },
        ].map((report) => {
          const Icon = report.icon;
          return (
            <button
              key={report.id}
              onClick={() => setActiveReport(report.id)}
              className={cn(
                'px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all flex items-center gap-2',
                activeReport === report.id
                  ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400'
                  : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
              )}
            >
              <Icon className="w-4 h-4" />
              {report.label}
            </button>
          );
        })}
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-900/50 rounded-2xl border border-gray-200 dark:border-gray-800 p-4">
          <div className="flex items-center justify-between mb-2">
            <Clock className="w-5 h-5 text-blue-500" />
            <Badge className={mockReports.totalHoursSold.change >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}>
              {mockReports.totalHoursSold.change >= 0 ? '+' : ''}{mockReports.totalHoursSold.change}%
            </Badge>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(mockReports.totalHoursSold.value)}</p>
          <p className="text-sm text-gray-500">ساعة مباعة</p>
        </div>

        <div className="bg-white dark:bg-gray-900/50 rounded-2xl border border-gray-200 dark:border-gray-800 p-4">
          <div className="flex items-center justify-between mb-2">
            <Clock className="w-5 h-5 text-purple-500" />
            <Badge className="bg-green-100 text-green-700">
              +{mockReports.avgSessionDuration.change}%
            </Badge>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{mockReports.avgSessionDuration.value} دقيقة</p>
          <p className="text-sm text-gray-500">متوسط مدة الحصة</p>
        </div>

        <div className="bg-white dark:bg-gray-900/50 rounded-2xl border border-gray-200 dark:border-gray-800 p-4">
          <div className="flex items-center justify-between mb-2">
            <Wallet className="w-5 h-5 text-teal-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(mockReports.walletStats.totalBalance)} ر.س</p>
          <p className="text-sm text-gray-500">أرصدة المحافظ</p>
        </div>

        <div className="bg-white dark:bg-gray-900/50 rounded-2xl border border-gray-200 dark:border-gray-800 p-4">
          <div className="flex items-center justify-between mb-2">
            <Package className="w-5 h-5 text-orange-500" />
            <Badge className="bg-yellow-100 text-yellow-700">
              {mockReports.remainingSessions.expiringSoon} قريب الانتهاء
            </Badge>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(mockReports.remainingSessions.total)}</p>
          <p className="text-sm text-gray-500">جلسات متبقية</p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Best Students */}
        <div className="bg-white dark:bg-gray-900/50 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
            <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              أفضل الطلاب
            </h3>
            <Badge>هذا الشهر</Badge>
          </div>
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {mockReports.bestStudents.map((student, index) => (
              <div key={student.id} className="p-4 flex items-center gap-4 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <span className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm',
                  index === 0 ? 'bg-yellow-100 text-yellow-700' :
                  index === 1 ? 'bg-gray-100 text-gray-600' :
                  index === 2 ? 'bg-orange-100 text-orange-700' :
                  'bg-gray-50 text-gray-500'
                )}>
                  {index + 1}
                </span>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-white">{student.name}</p>
                  <p className="text-sm text-gray-500">{student.lessons} حصة</p>
                </div>
                <p className="font-bold text-green-600">{formatCurrency(student.spending)} ر.س</p>
              </div>
            ))}
          </div>
        </div>

        {/* Best Teachers */}
        <div className="bg-white dark:bg-gray-900/50 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
            <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-purple-500" />
              أفضل المعلمين
            </h3>
            <Badge>هذا الشهر</Badge>
          </div>
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {mockReports.bestTeachers.map((teacher, index) => (
              <div key={teacher.id} className="p-4 flex items-center gap-4 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <span className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm',
                  index === 0 ? 'bg-yellow-100 text-yellow-700' :
                  index === 1 ? 'bg-gray-100 text-gray-600' :
                  index === 2 ? 'bg-orange-100 text-orange-700' :
                  'bg-gray-50 text-gray-500'
                )}>
                  {index + 1}
                </span>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-white">{teacher.name}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-500" />
                      {teacher.rating}
                    </span>
                    <span>•</span>
                    <span>{teacher.lessons} حصة</span>
                  </div>
                </div>
                <p className="font-bold text-green-600">{formatCurrency(teacher.earnings)} ر.س</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Revenue by Type */}
      <div className="bg-white dark:bg-gray-900/50 rounded-2xl border border-gray-200 dark:border-gray-800 p-5 mb-6">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-primary-500" />
          الإيرادات حسب نوع الخدمة
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {mockReports.revenueByType.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.type} className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className={cn(
                    'w-10 h-10 rounded-xl flex items-center justify-center',
                    item.type === 'online' ? 'bg-blue-100 dark:bg-blue-900/30' :
                    item.type === 'offline' ? 'bg-green-100 dark:bg-green-900/30' :
                    item.type === 'recorded' ? 'bg-purple-100 dark:bg-purple-900/30' :
                    'bg-orange-100 dark:bg-orange-900/30'
                  )}>
                    <Icon className={cn(
                      'w-5 h-5',
                      item.type === 'online' ? 'text-blue-600' :
                      item.type === 'offline' ? 'text-green-600' :
                      item.type === 'recorded' ? 'text-purple-600' :
                      'text-orange-600'
                    )} />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{item.label}</p>
                    <p className="text-xs text-gray-500">{item.percentage}% من الإجمالي</p>
                  </div>
                </div>
                <Progress value={item.percentage} className="h-2 mb-2" />
                <p className="font-bold text-gray-900 dark:text-white">{formatCurrency(item.revenue)} ر.س</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Grid - Packages, Invoices, Gifts, Coupons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Best Packages */}
        <div className="bg-white dark:bg-gray-900/50 rounded-2xl border border-gray-200 dark:border-gray-800 p-4">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Package className="w-5 h-5 text-orange-500" />
            أفضل الباقات
          </h3>
          <div className="space-y-3">
            {mockReports.bestPackages.slice(0, 3).map((pkg, index) => (
              <div key={pkg.id} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm text-gray-900 dark:text-white">{pkg.name}</p>
                  <p className="text-xs text-gray-500">{pkg.sales} بيع</p>
                </div>
                <Badge className="bg-green-100 text-green-700">{formatCurrency(pkg.revenue)}</Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Invoice Stats */}
        <div className="bg-white dark:bg-gray-900/50 rounded-2xl border border-gray-200 dark:border-gray-800 p-4">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-500" />
            الفواتير
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">إجمالي الفواتير</span>
              <span className="font-bold">{mockReports.invoiceStats.total}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">مدفوعة</span>
              <Badge className="bg-green-100 text-green-700">{mockReports.invoiceStats.paid}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">معلقة</span>
              <Badge className="bg-yellow-100 text-yellow-700">{mockReports.invoiceStats.pending}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">متأخرة</span>
              <Badge className="bg-red-100 text-red-700">{mockReports.invoiceStats.overdue}</Badge>
            </div>
          </div>
        </div>

        {/* Gift Stats */}
        <div className="bg-white dark:bg-gray-900/50 rounded-2xl border border-gray-200 dark:border-gray-800 p-4">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Gift className="w-5 h-5 text-pink-500" />
            الهدايا
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">إجمالي الهدايا</span>
              <span className="font-bold">{mockReports.giftStats.total}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">مستخدمة</span>
              <Badge className="bg-green-100 text-green-700">{mockReports.giftStats.used}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">قيمة الهدايا</span>
              <span className="font-bold text-pink-600">{formatCurrency(mockReports.giftStats.totalValue)} ر.س</span>
            </div>
          </div>
        </div>

        {/* Coupon Stats */}
        <div className="bg-white dark:bg-gray-900/50 rounded-2xl border border-gray-200 dark:border-gray-800 p-4">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Ticket className="w-5 h-5 text-purple-500" />
            الكوبونات
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">كوبونات نشطة</span>
              <span className="font-bold">{mockReports.couponStats.active}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">مرات الاستخدام</span>
              <Badge className="bg-purple-100 text-purple-700">{mockReports.couponStats.used}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">إجمالي الخصومات</span>
              <span className="font-bold text-red-600">{formatCurrency(mockReports.couponStats.totalDiscount)} ر.س</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
