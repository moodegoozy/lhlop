'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { DashboardShell, PageTitle, ContentCard } from '@/components/dashboard';
import { Badge } from '@/components/ui/badge';
import { 
  Copy, 
  Share2, 
  Users, 
  Wallet, 
  TrendingUp, 
  Gift,
  Check,
  MessageCircle,
  Send,
  Link2,
  ChevronLeft,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign
} from 'lucide-react';

// Mock affiliate data
const mockAffiliateData = {
  referralCode: 'STUDENT2024',
  referralLink: 'https://lhlop.com/ref/STUDENT2024',
  totalEarnings: 450,
  pendingEarnings: 75,
  availableEarnings: 375,
  totalReferrals: 12,
  successfulReferrals: 9,
  pendingReferrals: 3,
  commissionRate: 10,
  referrals: [
    {
      id: '1',
      name: 'أحمد محمد',
      date: '2024-01-15',
      status: 'completed',
      commission: 50,
    },
    {
      id: '2',
      name: 'سارة خالد',
      date: '2024-01-18',
      status: 'completed',
      commission: 50,
    },
    {
      id: '3',
      name: 'عبدالله فهد',
      date: '2024-01-20',
      status: 'pending',
      commission: 25,
    },
    {
      id: '4',
      name: 'نورة عبدالرحمن',
      date: '2024-01-22',
      status: 'completed',
      commission: 50,
    },
    {
      id: '5',
      name: 'محمد سعود',
      date: '2024-01-25',
      status: 'pending',
      commission: 50,
    },
  ],
  monthlyStats: [
    { month: 'يناير', referrals: 5, earnings: 200 },
    { month: 'فبراير', referrals: 4, earnings: 175 },
    { month: 'مارس', referrals: 3, earnings: 75 },
  ],
};

const statusConfig: Record<string, { label: string; class: string; icon: typeof Check | null }> = {
  completed: {
    label: 'مكتمل',
    class: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    icon: Check,
  },
  pending: {
    label: 'قيد الانتظار',
    class: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    icon: null,
  },
};

export default function AffiliatePage() {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <DashboardShell>
      <PageTitle
        title="التسويق بالعمولة"
        description="ادعُ أصدقاءك واحصل على مكافآت"
      />

      {/* Hero Card */}
      <ContentCard className="bg-gradient-to-br from-primary-500 to-primary-600 dark:from-primary-600 dark:to-primary-700 text-white border-0 mb-6 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-10 left-10 w-24 h-24 rounded-full bg-white" />
          <div className="absolute bottom-10 right-20 w-32 h-32 rounded-full bg-white" />
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
              <Gift className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">ادعُ أصدقاءك</h2>
              <p className="text-white/80 text-sm">واحصل على {mockAffiliateData.commissionRate}% من كل حجز</p>
            </div>
          </div>

          {/* Referral Link */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-4">
            <label className="text-sm text-white/80 mb-2 block">رابط الدعوة الخاص بك</label>
            <div className="flex gap-2">
              <div className="flex-1 bg-white/10 rounded-lg px-4 py-2.5 text-sm font-mono truncate">
                {mockAffiliateData.referralLink}
              </div>
              <button
                onClick={() => handleCopy(mockAffiliateData.referralLink)}
                className={cn(
                  'px-4 py-2.5 rounded-lg font-medium text-sm transition-all flex items-center gap-2',
                  copied
                    ? 'bg-green-500 text-white'
                    : 'bg-white text-primary-600 hover:bg-white/90'
                )}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    تم النسخ
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    نسخ
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Share Buttons */}
          <div className="flex gap-2">
            <button className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition-colors">
              <MessageCircle className="w-4 h-4" />
              تويتر
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition-colors">
              <Send className="w-4 h-4" />
              واتساب
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition-colors">
              <Link2 className="w-4 h-4" />
              مشاركة
            </button>
          </div>
        </div>
      </ContentCard>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <ContentCard>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center shrink-0">
              <Wallet className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">الأرباح الكلية</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                {mockAffiliateData.totalEarnings} <span className="text-sm font-normal">ر.س</span>
              </p>
            </div>
          </div>
        </ContentCard>

        <ContentCard>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center shrink-0">
              <DollarSign className="w-6 h-6 text-amber-500" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">قابل للسحب</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                {mockAffiliateData.availableEarnings} <span className="text-sm font-normal">ر.س</span>
              </p>
            </div>
          </div>
        </ContentCard>

        <ContentCard>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
              <Users className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">الدعوات الناجحة</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                {mockAffiliateData.successfulReferrals}
              </p>
            </div>
          </div>
        </ContentCard>

        <ContentCard>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center shrink-0">
              <TrendingUp className="w-6 h-6 text-purple-500" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">نسبة العمولة</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                {mockAffiliateData.commissionRate}%
              </p>
            </div>
          </div>
        </ContentCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Referrals List */}
        <div className="lg:col-span-2">
          <ContentCard>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900 dark:text-white">آخر الدعوات</h3>
              <button className="text-sm text-primary-500 hover:text-primary-600 flex items-center gap-1">
                عرض الكل
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              {mockAffiliateData.referrals.map((referral) => (
                <div
                  key={referral.id}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-500 flex items-center justify-center text-white font-medium text-sm">
                      {referral.name.slice(0, 2)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white text-sm">
                        {referral.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(referral.date).toLocaleDateString('ar-SA')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={statusConfig[referral.status].class}>
                      {statusConfig[referral.status].label}
                    </Badge>
                    <span className="font-semibold text-green-600 dark:text-green-400 text-sm">
                      +{referral.commission} ر.س
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </ContentCard>
        </div>

        {/* How It Works */}
        <div>
          <ContentCard>
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">كيف يعمل البرنامج؟</h3>
            
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 font-bold text-sm shrink-0">
                  1
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white text-sm">شارك رابطك</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    انسخ رابط الدعوة وشاركه مع أصدقائك
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 font-bold text-sm shrink-0">
                  2
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white text-sm">صديقك يسجل</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    عندما يسجل صديقك ويحجز حصته الأولى
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 font-bold text-sm shrink-0">
                  3
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white text-sm">احصل على مكافأتك</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    تحصل على {mockAffiliateData.commissionRate}% من قيمة الحجز
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Gift className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                <span className="font-semibold text-amber-800 dark:text-amber-300 text-sm">
                  عرض خاص!
                </span>
              </div>
              <p className="text-xs text-amber-700 dark:text-amber-400">
                ادعُ 10 أصدقاء واحصل على شهر مجاني من الاشتراك المميز
              </p>
            </div>
          </ContentCard>
        </div>
      </div>
    </DashboardShell>
  );
}
