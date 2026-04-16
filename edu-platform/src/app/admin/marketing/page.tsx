'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import {
  Tag,
  Gift,
  Users,
  Percent,
  Calendar,
  TrendingUp,
  Plus,
  Edit2,
  Trash2,
  Copy,
  Eye,
  Search,
  Filter,
  MoreVertical,
  Ticket,
  Clock,
  CheckCircle,
  XCircle,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  Target,
  BarChart3,
  DollarSign,
} from 'lucide-react';

// Types
interface Coupon {
  id: string;
  code: string;
  name: string;
  type: 'percentage' | 'fixed';
  value: number;
  minPurchase: number;
  maxUses: number;
  usedCount: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'expired' | 'disabled';
  applicableTo: 'all' | 'new_users' | 'returning' | 'specific_services';
}

interface GiftCard {
  id: string;
  code: string;
  value: number;
  balance: number;
  purchasedBy: string;
  recipient?: string;
  status: 'active' | 'redeemed' | 'expired';
  purchaseDate: string;
  expiryDate: string;
}

interface Affiliate {
  id: string;
  name: string;
  email: string;
  code: string;
  commission: number;
  totalEarnings: number;
  pendingPayout: number;
  totalReferrals: number;
  conversionRate: number;
  status: 'active' | 'pending' | 'suspended';
  joinDate: string;
}

// Mock Data
const mockCoupons: Coupon[] = [
  { id: '1', code: 'WELCOME50', name: 'خصم الترحيب', type: 'percentage', value: 50, minPurchase: 100, maxUses: 500, usedCount: 234, startDate: '2024-01-01', endDate: '2024-03-31', status: 'active', applicableTo: 'new_users' },
  { id: '2', code: 'SAVE20', name: 'خصم 20 ريال', type: 'fixed', value: 20, minPurchase: 80, maxUses: 1000, usedCount: 567, startDate: '2024-01-15', endDate: '2024-02-28', status: 'active', applicableTo: 'all' },
  { id: '3', code: 'TEACHER10', name: 'خصم المعلمين', type: 'percentage', value: 10, minPurchase: 50, maxUses: 200, usedCount: 200, startDate: '2024-01-01', endDate: '2024-01-31', status: 'expired', applicableTo: 'specific_services' },
  { id: '4', code: 'VIP25', name: 'خصم العملاء المميزين', type: 'percentage', value: 25, minPurchase: 150, maxUses: 100, usedCount: 45, startDate: '2024-02-01', endDate: '2024-04-30', status: 'active', applicableTo: 'returning' },
  { id: '5', code: 'MATH15', name: 'خصم دروس الرياضيات', type: 'percentage', value: 15, minPurchase: 0, maxUses: 300, usedCount: 0, startDate: '2024-03-01', endDate: '2024-03-15', status: 'disabled', applicableTo: 'specific_services' },
];

const mockGiftCards: GiftCard[] = [
  { id: '1', code: 'GIFT-ABC123', value: 200, balance: 200, purchasedBy: 'محمد أحمد', recipient: 'سارة علي', status: 'active', purchaseDate: '2024-01-20', expiryDate: '2025-01-20' },
  { id: '2', code: 'GIFT-XYZ789', value: 500, balance: 150, purchasedBy: 'فاطمة خالد', status: 'active', purchaseDate: '2024-01-15', expiryDate: '2025-01-15' },
  { id: '3', code: 'GIFT-DEF456', value: 100, balance: 0, purchasedBy: 'أحمد محمود', recipient: 'عمر حسن', status: 'redeemed', purchaseDate: '2024-01-10', expiryDate: '2025-01-10' },
  { id: '4', code: 'GIFT-GHI321', value: 300, balance: 300, purchasedBy: 'نورة سعد', status: 'expired', purchaseDate: '2023-01-01', expiryDate: '2024-01-01' },
];

const mockAffiliates: Affiliate[] = [
  { id: '1', name: 'أحمد المسوق', email: 'ahmed@email.com', code: 'AHMED10', commission: 10, totalEarnings: 5420, pendingPayout: 1200, totalReferrals: 156, conversionRate: 12.5, status: 'active', joinDate: '2023-06-15' },
  { id: '2', name: 'سارة التسويق', email: 'sara@email.com', code: 'SARA15', commission: 15, totalEarnings: 8750, pendingPayout: 2300, totalReferrals: 234, conversionRate: 18.2, status: 'active', joinDate: '2023-08-20' },
  { id: '3', name: 'محمود الأفلييت', email: 'mahmoud@email.com', code: 'MAHMOUD', commission: 10, totalEarnings: 2100, pendingPayout: 500, totalReferrals: 67, conversionRate: 8.5, status: 'pending', joinDate: '2024-01-10' },
  { id: '4', name: 'فاطمة المؤثرة', email: 'fatima@email.com', code: 'FATIMA20', commission: 20, totalEarnings: 12300, pendingPayout: 0, totalReferrals: 412, conversionRate: 22.1, status: 'active', joinDate: '2023-03-01' },
];

const stats = {
  totalCoupons: 12,
  activeCoupons: 5,
  totalSavings: 45680,
  giftCardsBalance: 28500,
  affiliatePayouts: 15320,
  totalReferrals: 869,
};

export default function MarketingPage() {
  const [activeTab, setActiveTab] = React.useState<'coupons' | 'gifts' | 'affiliates'>('coupons');
  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <div className="p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            التسويق والعروض
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            إدارة الكوبونات وبطاقات الهدايا والتسويق بالعمولة
          </p>
        </div>
        <Button className="shadow-lg">
          <Plus className="w-4 h-4 ml-2" />
          {activeTab === 'coupons' ? 'كوبون جديد' : activeTab === 'gifts' ? 'بطاقة هدية' : 'مسوق جديد'}
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        {[
          { label: 'الكوبونات النشطة', value: stats.activeCoupons, total: stats.totalCoupons, icon: Tag, color: 'text-primary-500 bg-primary-50' },
          { label: 'إجمالي التوفير', value: `${stats.totalSavings.toLocaleString()} ر.س`, icon: Percent, color: 'text-green-500 bg-green-50' },
          { label: 'رصيد البطاقات', value: `${stats.giftCardsBalance.toLocaleString()} ر.س`, icon: Gift, color: 'text-purple-500 bg-purple-50' },
          { label: 'عمولات المسوقين', value: `${stats.affiliatePayouts.toLocaleString()} ر.س`, icon: DollarSign, color: 'text-orange-500 bg-orange-50' },
          { label: 'إجمالي الإحالات', value: stats.totalReferrals, icon: Users, color: 'text-blue-500 bg-blue-50' },
          { label: 'معدل التحويل', value: '14.2%', icon: Target, color: 'text-emerald-500 bg-emerald-50' },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white dark:bg-gray-900/50 rounded-2xl border border-gray-200 dark:border-gray-800 p-4"
            >
              <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center mb-3', stat.color.split(' ')[1], 'dark:bg-opacity-20')}>
                <Icon className={cn('w-5 h-5', stat.color.split(' ')[0])} />
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stat.value}
                {'total' in stat && (
                  <span className="text-sm font-normal text-gray-400">/{stat.total}</span>
                )}
              </p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
        {[
          { id: 'coupons', label: 'الكوبونات', icon: Tag, count: mockCoupons.length },
          { id: 'gifts', label: 'بطاقات الهدايا', icon: Gift, count: mockGiftCards.length },
          { id: 'affiliates', label: 'التسويق بالعمولة', icon: Users, count: mockAffiliates.length },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all whitespace-nowrap',
                activeTab === tab.id
                  ? 'bg-primary-500 text-white shadow-lg'
                  : 'bg-white dark:bg-gray-900/50 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800'
              )}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
              <Badge
                className={cn(
                  'mr-1',
                  activeTab === tab.id
                    ? 'bg-white/20 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                )}
              >
                {tab.count}
              </Badge>
            </button>
          );
        })}
      </div>

      {/* Search */}
      <div className="bg-white dark:bg-gray-900/50 rounded-2xl border border-gray-200 dark:border-gray-800 p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="ابحث عن كود أو اسم..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pr-10 pl-4 py-2.5 bg-gray-50 dark:bg-gray-800 rounded-xl border-0 focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <Button variant="outline">
            <Filter className="w-4 h-4 ml-2" />
            تصفية
          </Button>
        </div>
      </div>

      {/* Coupons Tab */}
      {activeTab === 'coupons' && (
        <div className="bg-white dark:bg-gray-900/50 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800/50">
                <tr>
                  <th className="text-right px-6 py-4 text-sm font-medium text-gray-500">الكود</th>
                  <th className="text-right px-6 py-4 text-sm font-medium text-gray-500">الخصم</th>
                  <th className="text-right px-6 py-4 text-sm font-medium text-gray-500">الاستخدامات</th>
                  <th className="text-right px-6 py-4 text-sm font-medium text-gray-500">الصلاحية</th>
                  <th className="text-right px-6 py-4 text-sm font-medium text-gray-500">الحالة</th>
                  <th className="text-right px-6 py-4 text-sm font-medium text-gray-500">إجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {mockCoupons.map((coupon) => (
                  <tr key={coupon.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center">
                          <Ticket className="w-5 h-5 text-primary-500" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium font-mono text-gray-900 dark:text-white">{coupon.code}</p>
                            <button className="text-gray-400 hover:text-gray-600">
                              <Copy className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="text-sm text-gray-500">{coupon.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-emerald-600">
                        {coupon.type === 'percentage' ? `${coupon.value}%` : `${coupon.value} ر.س`}
                      </p>
                      {coupon.minPurchase > 0 && (
                        <p className="text-xs text-gray-500">حد أدنى: {coupon.minPurchase} ر.س</p>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary-500 rounded-full"
                            style={{ width: `${(coupon.usedCount / coupon.maxUses) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {coupon.usedCount}/{coupon.maxUses}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Calendar className="w-4 h-4" />
                        {coupon.startDate} - {coupon.endDate}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge
                        className={cn(
                          coupon.status === 'active' && 'bg-green-100 text-green-700',
                          coupon.status === 'expired' && 'bg-red-100 text-red-700',
                          coupon.status === 'disabled' && 'bg-gray-100 text-gray-600'
                        )}
                      >
                        {coupon.status === 'active' ? 'نشط' : coupon.status === 'expired' ? 'منتهي' : 'معطل'}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Switch checked={coupon.status === 'active'} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Gift Cards Tab */}
      {activeTab === 'gifts' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockGiftCards.map((card) => (
            <div
              key={card.id}
              className={cn(
                'bg-gradient-to-br p-5 rounded-2xl text-white relative overflow-hidden',
                card.status === 'active' && 'from-primary-500 to-purple-600',
                card.status === 'redeemed' && 'from-gray-400 to-gray-500',
                card.status === 'expired' && 'from-red-400 to-red-500'
              )}
            >
              <div className="absolute top-0 left-0 w-full h-full opacity-10">
                <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-white" />
                <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-white" />
              </div>
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <Gift className="w-8 h-8" />
                  <Badge className="bg-white/20 text-white">
                    {card.status === 'active' ? 'نشطة' : card.status === 'redeemed' ? 'مستخدمة' : 'منتهية'}
                  </Badge>
                </div>
                <p className="font-mono text-lg mb-4">{card.code}</p>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-sm text-white/70">الرصيد المتبقي</p>
                    <p className="text-3xl font-bold">{card.balance} <span className="text-sm">ر.س</span></p>
                    <p className="text-sm text-white/70">من {card.value} ر.س</p>
                  </div>
                  <div className="text-left">
                    <p className="text-xs text-white/70">تاريخ الانتهاء</p>
                    <p className="text-sm">{card.expiryDate}</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-white/20">
                  <p className="text-sm text-white/70">المشتري: {card.purchasedBy}</p>
                  {card.recipient && (
                    <p className="text-sm text-white/70">المستلم: {card.recipient}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {/* Add New Card */}
          <button className="bg-gray-50 dark:bg-gray-800/50 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-2xl p-5 flex flex-col items-center justify-center gap-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors min-h-[240px]">
            <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <Plus className="w-6 h-6 text-gray-500" />
            </div>
            <p className="font-medium text-gray-600 dark:text-gray-400">إنشاء بطاقة هدية</p>
          </button>
        </div>
      )}

      {/* Affiliates Tab */}
      {activeTab === 'affiliates' && (
        <div className="bg-white dark:bg-gray-900/50 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800/50">
                <tr>
                  <th className="text-right px-6 py-4 text-sm font-medium text-gray-500">المسوق</th>
                  <th className="text-right px-6 py-4 text-sm font-medium text-gray-500">كود الإحالة</th>
                  <th className="text-right px-6 py-4 text-sm font-medium text-gray-500">الأرباح</th>
                  <th className="text-right px-6 py-4 text-sm font-medium text-gray-500">الإحالات</th>
                  <th className="text-right px-6 py-4 text-sm font-medium text-gray-500">معدل التحويل</th>
                  <th className="text-right px-6 py-4 text-sm font-medium text-gray-500">الحالة</th>
                  <th className="text-right px-6 py-4 text-sm font-medium text-gray-500">إجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {mockAffiliates.map((affiliate) => (
                  <tr key={affiliate.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold">
                          {affiliate.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{affiliate.name}</p>
                          <p className="text-sm text-gray-500">{affiliate.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm font-mono">
                          {affiliate.code}
                        </code>
                        <button className="text-gray-400 hover:text-gray-600">
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">عمولة {affiliate.commission}%</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-gray-900 dark:text-white">{affiliate.totalEarnings.toLocaleString()} ر.س</p>
                      {affiliate.pendingPayout > 0 && (
                        <p className="text-sm text-amber-600">معلق: {affiliate.pendingPayout.toLocaleString()} ر.س</p>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span className="font-medium text-gray-900 dark:text-white">{affiliate.totalReferrals}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className={cn(
                          'font-bold',
                          affiliate.conversionRate >= 15 ? 'text-green-600' : affiliate.conversionRate >= 10 ? 'text-amber-600' : 'text-red-600'
                        )}>
                          {affiliate.conversionRate}%
                        </span>
                        {affiliate.conversionRate >= 15 ? (
                          <ArrowUpRight className="w-4 h-4 text-green-500" />
                        ) : (
                          <ArrowDownRight className="w-4 h-4 text-red-500" />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge
                        className={cn(
                          affiliate.status === 'active' && 'bg-green-100 text-green-700',
                          affiliate.status === 'pending' && 'bg-yellow-100 text-yellow-700',
                          affiliate.status === 'suspended' && 'bg-red-100 text-red-700'
                        )}
                      >
                        {affiliate.status === 'active' ? 'نشط' : affiliate.status === 'pending' ? 'قيد المراجعة' : 'موقوف'}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <DollarSign className="w-4 h-4 ml-1" />
                          صرف
                        </Button>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
