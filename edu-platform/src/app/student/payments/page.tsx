'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { DashboardShell, PageTitle, ContentCard, EmptyState } from '@/components/dashboard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  CreditCard,
  Check,
  Clock,
  X,
  Download,
  Eye,
  Filter,
  Search,
  Calendar,
} from 'lucide-react';

// Mock payments data
const mockPayments = [
  {
    id: 'PAY001',
    description: 'حصة رياضيات - أ. محمد العلي',
    amount: 150,
    date: '2024-01-20T14:00:00Z',
    status: 'paid' as const,
    method: 'wallet',
    invoiceId: 'INV001',
  },
  {
    id: 'PAY002',
    description: 'حصة إنجليزي - أ. نورة الخالد',
    amount: 120,
    date: '2024-01-18T18:00:00Z',
    status: 'paid' as const,
    method: 'mada',
    invoiceId: 'INV002',
  },
  {
    id: 'PAY003',
    description: 'باقة 5 حصص فيزياء',
    amount: 500,
    date: '2024-01-15T10:00:00Z',
    status: 'pending' as const,
    method: 'bank_transfer',
    invoiceId: 'INV003',
  },
  {
    id: 'PAY004',
    description: 'حصة كيمياء - أ. سارة الحمد',
    amount: 130,
    date: '2024-01-12T16:00:00Z',
    status: 'paid' as const,
    method: 'apple_pay',
    invoiceId: 'INV004',
  },
  {
    id: 'PAY005',
    description: 'حصة أحياء - أ. عبدالله الفهد',
    amount: 140,
    date: '2024-01-10T12:00:00Z',
    status: 'failed' as const,
    method: 'visa',
    invoiceId: null,
  },
];

const statusConfig = {
  paid: {
    label: 'مدفوعة',
    icon: Check,
    color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  },
  pending: {
    label: 'قيد الانتظار',
    icon: Clock,
    color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  },
  failed: {
    label: 'فشلت',
    icon: X,
    color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  },
};

const methodLabels: Record<string, string> = {
  wallet: 'المحفظة',
  mada: 'بطاقة مدى',
  visa: 'Visa',
  mastercard: 'Mastercard',
  apple_pay: 'Apple Pay',
  bank_transfer: 'تحويل بنكي',
};

export default function PaymentsPage() {
  const [activeTab, setActiveTab] = React.useState('all');
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredPayments = mockPayments.filter((payment) => {
    if (activeTab !== 'all' && payment.status !== activeTab) return false;
    if (searchQuery && !payment.description.includes(searchQuery)) return false;
    return true;
  });

  const totalPaid = mockPayments
    .filter((p) => p.status === 'paid')
    .reduce((sum, p) => sum + p.amount, 0);

  const pendingAmount = mockPayments
    .filter((p) => p.status === 'pending')
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <DashboardShell>
      <PageTitle
        title="المدفوعات"
        description="سجل جميع عمليات الدفع الخاصة بك"
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <ContentCard className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/80">إجمالي المدفوعات</p>
              <p className="text-2xl font-bold mt-1">{totalPaid} ر.س</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
              <Check className="w-6 h-6" />
            </div>
          </div>
        </ContentCard>

        <ContentCard className="bg-gradient-to-br from-amber-500 to-amber-600 text-white border-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/80">قيد الانتظار</p>
              <p className="text-2xl font-bold mt-1">{pendingAmount} ر.س</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
          </div>
        </ContentCard>

        <ContentCard className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/80">عدد المعاملات</p>
              <p className="text-2xl font-bold mt-1">{mockPayments.length}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
              <CreditCard className="w-6 h-6" />
            </div>
          </div>
        </ContentCard>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث في المدفوعات..."
            className={cn(
              'w-full h-11 pr-10 pl-4 rounded-xl',
              'bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800',
              'text-sm text-gray-900 dark:text-white placeholder:text-gray-400',
              'focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500'
            )}
          />
        </div>
        <Button variant="secondary">
          <Calendar className="w-4 h-4 ml-2" />
          الفترة
        </Button>
        <Button variant="secondary">
          <Filter className="w-4 h-4 ml-2" />
          تصفية
        </Button>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full bg-gray-100 dark:bg-gray-800/50 p-1 rounded-xl mb-6">
          <TabsTrigger
            value="all"
            className="flex-1 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900 rounded-lg"
          >
            الكل ({mockPayments.length})
          </TabsTrigger>
          <TabsTrigger
            value="paid"
            className="flex-1 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900 rounded-lg"
          >
            مدفوعة ({mockPayments.filter((p) => p.status === 'paid').length})
          </TabsTrigger>
          <TabsTrigger
            value="pending"
            className="flex-1 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900 rounded-lg"
          >
            قيد الانتظار ({mockPayments.filter((p) => p.status === 'pending').length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-0">
          <ContentCard noPadding>
            {/* Table Header - Desktop */}
            <div className="hidden md:grid grid-cols-12 gap-4 p-4 border-b border-gray-200 dark:border-gray-800 text-sm font-medium text-gray-500 dark:text-gray-400">
              <div className="col-span-4">الوصف</div>
              <div className="col-span-2">المبلغ</div>
              <div className="col-span-2">التاريخ</div>
              <div className="col-span-2">الحالة</div>
              <div className="col-span-2">الإجراءات</div>
            </div>

            {/* Table Body */}
            {filteredPayments.length > 0 ? (
              <div className="divide-y divide-gray-200 dark:divide-gray-800">
                {filteredPayments.map((payment) => {
                  const status = statusConfig[payment.status];
                  const StatusIcon = status.icon;

                  return (
                    <div
                      key={payment.id}
                      className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"
                    >
                      {/* Mobile Layout */}
                      <div className="md:hidden space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">
                              {payment.description}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                              {methodLabels[payment.method]} • {new Date(payment.date).toLocaleDateString('ar-SA')}
                            </p>
                          </div>
                          <p className="font-bold text-gray-900 dark:text-white">
                            {payment.amount} ر.س
                          </p>
                        </div>
                        <div className="flex items-center justify-between">
                          <Badge variant="secondary" className={status.color}>
                            <StatusIcon className="w-3 h-3 ml-1" />
                            {status.label}
                          </Badge>
                          <div className="flex gap-2">
                            {payment.invoiceId && (
                              <Button variant="ghost" size="icon-sm">
                                <Download className="w-4 h-4" />
                              </Button>
                            )}
                            <Button variant="ghost" size="icon-sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Desktop Layout */}
                      <div className="hidden md:grid grid-cols-12 gap-4 items-center">
                        <div className="col-span-4">
                          <p className="font-medium text-gray-900 dark:text-white">
                            {payment.description}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {methodLabels[payment.method]}
                          </p>
                        </div>
                        <div className="col-span-2 font-bold text-gray-900 dark:text-white">
                          {payment.amount} ر.س
                        </div>
                        <div className="col-span-2 text-sm text-gray-500 dark:text-gray-400">
                          {new Date(payment.date).toLocaleDateString('ar-SA', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </div>
                        <div className="col-span-2">
                          <Badge variant="secondary" className={status.color}>
                            <StatusIcon className="w-3 h-3 ml-1" />
                            {status.label}
                          </Badge>
                        </div>
                        <div className="col-span-2 flex gap-2">
                          {payment.invoiceId && (
                            <Button variant="ghost" size="icon-sm">
                              <Download className="w-4 h-4" />
                            </Button>
                          )}
                          <Button variant="ghost" size="icon-sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <EmptyState
                icon={<CreditCard className="w-8 h-8 text-gray-400" />}
                title="لا توجد مدفوعات"
                description="لم يتم العثور على مدفوعات تطابق البحث"
                className="py-12"
              />
            )}
          </ContentCard>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  );
}
