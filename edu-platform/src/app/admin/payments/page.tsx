'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  CreditCard,
  FileText,
  Download,
  Send,
  Eye,
  Search,
  Filter,
  MoreVertical,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  RefreshCw,
  Plus,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  Receipt,
  Building2,
  User,
  AlertCircle,
  Printer,
  Mail,
} from 'lucide-react';

// Types
interface Payment {
  id: string;
  invoiceNumber: string;
  customerName: string;
  customerEmail: string;
  amount: number;
  fee: number;
  net: number;
  method: 'mada' | 'visa' | 'apple_pay' | 'stc_pay' | 'wallet';
  status: 'completed' | 'pending' | 'failed' | 'refunded';
  date: string;
  bookingId?: string;
}

interface Invoice {
  id: string;
  number: string;
  customer: { name: string; email: string };
  items: { description: string; amount: number }[];
  subtotal: number;
  tax: number;
  total: number;
  status: 'paid' | 'pending' | 'overdue' | 'cancelled';
  issueDate: string;
  dueDate: string;
  paidDate?: string;
}

// Mock Data
const mockPayments: Payment[] = [
  { id: '1', invoiceNumber: 'INV-2024-001', customerName: 'أحمد محمد', customerEmail: 'ahmed@email.com', amount: 450, fee: 11.25, net: 438.75, method: 'mada', status: 'completed', date: '2024-01-20 14:30', bookingId: 'BK-001' },
  { id: '2', invoiceNumber: 'INV-2024-002', customerName: 'سارة علي', customerEmail: 'sara@email.com', amount: 320, fee: 8, net: 312, method: 'apple_pay', status: 'completed', date: '2024-01-20 12:15' },
  { id: '3', invoiceNumber: 'INV-2024-003', customerName: 'محمد خالد', customerEmail: 'mkh@email.com', amount: 180, fee: 4.5, net: 175.5, method: 'visa', status: 'pending', date: '2024-01-20 10:00' },
  { id: '4', invoiceNumber: 'INV-2024-004', customerName: 'فاطمة أحمد', customerEmail: 'fatima@email.com', amount: 550, fee: 13.75, net: 536.25, method: 'stc_pay', status: 'failed', date: '2024-01-19 18:45' },
  { id: '5', invoiceNumber: 'INV-2024-005', customerName: 'عمر حسن', customerEmail: 'omar@email.com', amount: 290, fee: 7.25, net: 282.75, method: 'wallet', status: 'refunded', date: '2024-01-19 16:20' },
  { id: '6', invoiceNumber: 'INV-2024-006', customerName: 'نورة سعد', customerEmail: 'noura@email.com', amount: 680, fee: 17, net: 663, method: 'mada', status: 'completed', date: '2024-01-19 14:00' },
];

const mockInvoices: Invoice[] = [
  {
    id: '1', number: 'INV-2024-001',
    customer: { name: 'أحمد محمد', email: 'ahmed@email.com' },
    items: [{ description: 'حصة رياضيات (4 ساعات)', amount: 400 }, { description: 'رسوم المنصة', amount: 50 }],
    subtotal: 450, tax: 67.5, total: 517.5,
    status: 'paid', issueDate: '2024-01-15', dueDate: '2024-01-20', paidDate: '2024-01-18'
  },
  {
    id: '2', number: 'INV-2024-002',
    customer: { name: 'سارة علي', email: 'sara@email.com' },
    items: [{ description: 'دروس إنجليزي (3 ساعات)', amount: 300 }],
    subtotal: 300, tax: 45, total: 345,
    status: 'pending', issueDate: '2024-01-18', dueDate: '2024-01-25'
  },
  {
    id: '3', number: 'INV-2024-003',
    customer: { name: 'فاطمة أحمد', email: 'fatima@email.com' },
    items: [{ description: 'باقة شهرية', amount: 800 }],
    subtotal: 800, tax: 120, total: 920,
    status: 'overdue', issueDate: '2024-01-01', dueDate: '2024-01-15'
  },
  {
    id: '4', number: 'INV-2024-004',
    customer: { name: 'محمد خالد', email: 'mkh@email.com' },
    items: [{ description: 'حصة فيزياء', amount: 150 }],
    subtotal: 150, tax: 22.5, total: 172.5,
    status: 'cancelled', issueDate: '2024-01-10', dueDate: '2024-01-17'
  },
];

const stats = {
  totalRevenue: 128500,
  revenueGrowth: 12.5,
  pendingPayments: 15200,
  pendingCount: 23,
  failedPayments: 4200,
  failedCount: 8,
  refunds: 2100,
  refundCount: 5,
};

const methodIcons: Record<string, string> = {
  mada: '💳',
  visa: '💳',
  apple_pay: '🍎',
  stc_pay: '📱',
  wallet: '👛',
};

const methodNames: Record<string, string> = {
  mada: 'مدى',
  visa: 'فيزا',
  apple_pay: 'Apple Pay',
  stc_pay: 'STC Pay',
  wallet: 'المحفظة',
};

export default function PaymentsPage() {
  const [activeTab, setActiveTab] = React.useState<'payments' | 'invoices'>('payments');
  const [statusFilter, setStatusFilter] = React.useState<string>('all');
  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <div className="p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            المدفوعات والفواتير
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            إدارة المدفوعات وإصدار الفواتير
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 ml-2" />
            تصدير
          </Button>
          <Button className="shadow-lg">
            <Plus className="w-4 h-4 ml-2" />
            فاتورة جديدة
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-900/50 rounded-2xl border border-gray-200 dark:border-gray-800 p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 rounded-xl bg-green-50 dark:bg-green-900/30 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-500" />
            </div>
            <div className="flex items-center gap-1 text-green-500 text-sm font-medium">
              <ArrowUpRight className="w-4 h-4" />
              {stats.revenueGrowth}%
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.totalRevenue.toLocaleString()}</p>
          <p className="text-sm text-gray-500">إجمالي الإيرادات (ر.س)</p>
        </div>

        <div className="bg-white dark:bg-gray-900/50 rounded-2xl border border-gray-200 dark:border-gray-800 p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center">
              <Clock className="w-6 h-6 text-amber-500" />
            </div>
            <Badge className="bg-amber-100 text-amber-700">{stats.pendingCount}</Badge>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.pendingPayments.toLocaleString()}</p>
          <p className="text-sm text-gray-500">مدفوعات معلقة (ر.س)</p>
        </div>

        <div className="bg-white dark:bg-gray-900/50 rounded-2xl border border-gray-200 dark:border-gray-800 p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 rounded-xl bg-red-50 dark:bg-red-900/30 flex items-center justify-center">
              <XCircle className="w-6 h-6 text-red-500" />
            </div>
            <Badge className="bg-red-100 text-red-700">{stats.failedCount}</Badge>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.failedPayments.toLocaleString()}</p>
          <p className="text-sm text-gray-500">مدفوعات فاشلة (ر.س)</p>
        </div>

        <div className="bg-white dark:bg-gray-900/50 rounded-2xl border border-gray-200 dark:border-gray-800 p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center">
              <RefreshCw className="w-6 h-6 text-purple-500" />
            </div>
            <Badge className="bg-purple-100 text-purple-700">{stats.refundCount}</Badge>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.refunds.toLocaleString()}</p>
          <p className="text-sm text-gray-500">المبالغ المستردة (ر.س)</p>
        </div>
      </div>

      {/* Tabs & Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('payments')}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all',
              activeTab === 'payments'
                ? 'bg-primary-500 text-white shadow-lg'
                : 'bg-white dark:bg-gray-900/50 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-800'
            )}
          >
            <CreditCard className="w-4 h-4" />
            المدفوعات
          </button>
          <button
            onClick={() => setActiveTab('invoices')}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all',
              activeTab === 'invoices'
                ? 'bg-primary-500 text-white shadow-lg'
                : 'bg-white dark:bg-gray-900/50 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-800'
            )}
          >
            <FileText className="w-4 h-4" />
            الفواتير
          </button>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="بحث..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10 pl-4 py-2 bg-white dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-800 w-64 focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 bg-white dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-800"
          >
            <option value="all">جميع الحالات</option>
            <option value="completed">مكتمل</option>
            <option value="pending">معلق</option>
            <option value="failed">فاشل</option>
            <option value="refunded">مسترد</option>
          </select>
        </div>
      </div>

      {/* Payments Table */}
      {activeTab === 'payments' && (
        <div className="bg-white dark:bg-gray-900/50 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800/50">
                <tr>
                  <th className="text-right px-6 py-4 text-sm font-medium text-gray-500">رقم الفاتورة</th>
                  <th className="text-right px-6 py-4 text-sm font-medium text-gray-500">العميل</th>
                  <th className="text-right px-6 py-4 text-sm font-medium text-gray-500">المبلغ</th>
                  <th className="text-right px-6 py-4 text-sm font-medium text-gray-500">الرسوم</th>
                  <th className="text-right px-6 py-4 text-sm font-medium text-gray-500">الصافي</th>
                  <th className="text-right px-6 py-4 text-sm font-medium text-gray-500">طريقة الدفع</th>
                  <th className="text-right px-6 py-4 text-sm font-medium text-gray-500">الحالة</th>
                  <th className="text-right px-6 py-4 text-sm font-medium text-gray-500">التاريخ</th>
                  <th className="text-right px-6 py-4 text-sm font-medium text-gray-500"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {mockPayments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="px-6 py-4">
                      <p className="font-mono text-primary-600 dark:text-primary-400">{payment.invoiceNumber}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900 dark:text-white">{payment.customerName}</p>
                      <p className="text-sm text-gray-500">{payment.customerEmail}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-gray-900 dark:text-white">{payment.amount} ر.س</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-red-500">-{payment.fee} ر.س</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-green-600">{payment.net} ر.س</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span>{methodIcons[payment.method]}</span>
                        <span className="text-gray-700 dark:text-gray-300">{methodNames[payment.method]}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge
                        className={cn(
                          'flex items-center gap-1 w-fit',
                          payment.status === 'completed' && 'bg-green-100 text-green-700',
                          payment.status === 'pending' && 'bg-amber-100 text-amber-700',
                          payment.status === 'failed' && 'bg-red-100 text-red-700',
                          payment.status === 'refunded' && 'bg-purple-100 text-purple-700'
                        )}
                      >
                        {payment.status === 'completed' && <CheckCircle className="w-3 h-3" />}
                        {payment.status === 'pending' && <Clock className="w-3 h-3" />}
                        {payment.status === 'failed' && <XCircle className="w-3 h-3" />}
                        {payment.status === 'refunded' && <RefreshCw className="w-3 h-3" />}
                        {payment.status === 'completed' ? 'مكتمل' : payment.status === 'pending' ? 'معلق' : payment.status === 'failed' ? 'فاشل' : 'مسترد'}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-600 dark:text-gray-400">{payment.date}</p>
                    </td>
                    <td className="px-6 py-4">
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between p-4 border-t border-gray-200 dark:border-gray-800">
            <p className="text-sm text-gray-500">عرض 1-6 من 234 عملية</p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>السابق</Button>
              <Button variant="outline" size="sm">التالي</Button>
            </div>
          </div>
        </div>
      )}

      {/* Invoices Table */}
      {activeTab === 'invoices' && (
        <div className="bg-white dark:bg-gray-900/50 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800/50">
                <tr>
                  <th className="text-right px-6 py-4 text-sm font-medium text-gray-500">رقم الفاتورة</th>
                  <th className="text-right px-6 py-4 text-sm font-medium text-gray-500">العميل</th>
                  <th className="text-right px-6 py-4 text-sm font-medium text-gray-500">المبلغ</th>
                  <th className="text-right px-6 py-4 text-sm font-medium text-gray-500">الحالة</th>
                  <th className="text-right px-6 py-4 text-sm font-medium text-gray-500">تاريخ الإصدار</th>
                  <th className="text-right px-6 py-4 text-sm font-medium text-gray-500">تاريخ الاستحقاق</th>
                  <th className="text-right px-6 py-4 text-sm font-medium text-gray-500">إجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {mockInvoices.map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                          <Receipt className="w-5 h-5 text-gray-500" />
                        </div>
                        <p className="font-mono text-primary-600 dark:text-primary-400">{invoice.number}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900 dark:text-white">{invoice.customer.name}</p>
                      <p className="text-sm text-gray-500">{invoice.customer.email}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-gray-900 dark:text-white">{invoice.total} ر.س</p>
                      <p className="text-xs text-gray-500">شامل الضريبة {invoice.tax} ر.س</p>
                    </td>
                    <td className="px-6 py-4">
                      <Badge
                        className={cn(
                          invoice.status === 'paid' && 'bg-green-100 text-green-700',
                          invoice.status === 'pending' && 'bg-amber-100 text-amber-700',
                          invoice.status === 'overdue' && 'bg-red-100 text-red-700',
                          invoice.status === 'cancelled' && 'bg-gray-100 text-gray-600'
                        )}
                      >
                        {invoice.status === 'paid' ? 'مدفوعة' : invoice.status === 'pending' ? 'معلقة' : invoice.status === 'overdue' ? 'متأخرة' : 'ملغاة'}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-600 dark:text-gray-400">{invoice.issueDate}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className={cn(
                        'text-sm',
                        invoice.status === 'overdue' ? 'text-red-500 font-medium' : 'text-gray-600 dark:text-gray-400'
                      )}>
                        {invoice.dueDate}
                        {invoice.status === 'overdue' && (
                          <AlertCircle className="inline-block w-4 h-4 mr-1" />
                        )}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" title="عرض">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" title="طباعة">
                          <Printer className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" title="إرسال">
                          <Send className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" title="تحميل">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between p-4 border-t border-gray-200 dark:border-gray-800">
            <p className="text-sm text-gray-500">عرض 1-4 من 156 فاتورة</p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>السابق</Button>
              <Button variant="outline" size="sm">التالي</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
