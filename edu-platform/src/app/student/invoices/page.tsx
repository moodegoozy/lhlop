'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { DashboardShell, PageTitle, ContentCard, EmptyState } from '@/components/dashboard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  FileText,
  Download,
  Eye,
  Search,
  Calendar,
  Check,
  Clock,
  Printer,
} from 'lucide-react';

// Mock invoices data
const mockInvoices = [
  {
    id: 'INV001',
    number: 'INV-2024-001',
    description: 'حصة رياضيات - أ. محمد العلي',
    amount: 150,
    tax: 22.5,
    total: 172.5,
    date: '2024-01-20T14:00:00Z',
    dueDate: '2024-01-20T14:00:00Z',
    status: 'paid' as const,
    items: [
      { description: 'حصة خصوصية - رياضيات', quantity: 1, price: 150 },
    ],
  },
  {
    id: 'INV002',
    number: 'INV-2024-002',
    description: 'حصة إنجليزي - أ. نورة الخالد',
    amount: 120,
    tax: 18,
    total: 138,
    date: '2024-01-18T18:00:00Z',
    dueDate: '2024-01-18T18:00:00Z',
    status: 'paid' as const,
    items: [
      { description: 'حصة خصوصية - لغة إنجليزية', quantity: 1, price: 120 },
    ],
  },
  {
    id: 'INV003',
    number: 'INV-2024-003',
    description: 'باقة 5 حصص فيزياء',
    amount: 500,
    tax: 75,
    total: 575,
    date: '2024-01-15T10:00:00Z',
    dueDate: '2024-01-22T23:59:59Z',
    status: 'pending' as const,
    items: [
      { description: 'باقة 5 حصص - فيزياء', quantity: 1, price: 500 },
    ],
  },
  {
    id: 'INV004',
    number: 'INV-2024-004',
    description: 'حصة كيمياء - أ. سارة الحمد',
    amount: 130,
    tax: 19.5,
    total: 149.5,
    date: '2024-01-12T16:00:00Z',
    dueDate: '2024-01-12T16:00:00Z',
    status: 'paid' as const,
    items: [
      { description: 'حصة خصوصية - كيمياء', quantity: 1, price: 130 },
    ],
  },
];

export default function InvoicesPage() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedInvoice, setSelectedInvoice] = React.useState<typeof mockInvoices[0] | null>(null);

  const filteredInvoices = mockInvoices.filter((invoice) =>
    invoice.description.includes(searchQuery) || invoice.number.includes(searchQuery)
  );

  return (
    <DashboardShell>
      <PageTitle
        title="الفواتير"
        description="عرض وتحميل فواتيرك"
      />

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="ابحث برقم الفاتورة أو الوصف..."
          className={cn(
            'w-full h-11 pr-10 pl-4 rounded-xl',
            'bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800',
            'text-sm text-gray-900 dark:text-white placeholder:text-gray-400',
            'focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500'
          )}
        />
      </div>

      {/* Invoices Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredInvoices.map((invoice) => (
          <div
            key={invoice.id}
            className={cn(
              'bg-white dark:bg-gray-900/50 rounded-2xl',
              'border border-gray-200 dark:border-gray-800',
              'overflow-hidden hover:shadow-lg transition-all duration-300',
              'group cursor-pointer'
            )}
            onClick={() => setSelectedInvoice(invoice)}
          >
            {/* Invoice Preview Header */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-4 border-b border-gray-200 dark:border-gray-800">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                    <FileText className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                  </div>
                  <span className="text-sm font-mono text-gray-500 dark:text-gray-400">
                    {invoice.number}
                  </span>
                </div>
                <Badge
                  variant="secondary"
                  className={cn(
                    invoice.status === 'paid'
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                  )}
                >
                  {invoice.status === 'paid' ? (
                    <>
                      <Check className="w-3 h-3 ml-1" />
                      مدفوعة
                    </>
                  ) : (
                    <>
                      <Clock className="w-3 h-3 ml-1" />
                      قيد الانتظار
                    </>
                  )}
                </Badge>
              </div>
              
              {/* Mini Invoice Preview */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-gray-500 dark:text-gray-400 border-b border-dashed border-gray-300 dark:border-gray-700 pb-1.5">
                  <span>المبلغ</span>
                  <span>{invoice.amount} ر.س</span>
                </div>
                <div className="flex justify-between text-gray-500 dark:text-gray-400 border-b border-dashed border-gray-300 dark:border-gray-700 pb-1.5">
                  <span>الضريبة (15%)</span>
                  <span>{invoice.tax} ر.س</span>
                </div>
                <div className="flex justify-between font-bold text-gray-900 dark:text-white pt-0.5">
                  <span>الإجمالي</span>
                  <span>{invoice.total} ر.س</span>
                </div>
              </div>
            </div>

            {/* Invoice Details */}
            <div className="p-4">
              <h3 className="font-medium text-gray-900 dark:text-white mb-1 line-clamp-1">
                {invoice.description}
              </h3>
              <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                <Calendar className="w-3.5 h-3.5" />
                <span>
                  {new Date(invoice.date).toLocaleDateString('ar-SA', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
              </div>

              {/* Actions */}
              <div className="flex gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="secondary" size="sm" className="flex-1">
                  <Eye className="w-4 h-4 ml-1" />
                  عرض
                </Button>
                <Button variant="secondary" size="sm" className="flex-1">
                  <Download className="w-4 h-4 ml-1" />
                  تحميل
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredInvoices.length === 0 && (
        <EmptyState
          icon={<FileText className="w-8 h-8 text-gray-400" />}
          title="لا توجد فواتير"
          description="لم يتم العثور على فواتير تطابق البحث"
        />
      )}

      {/* Invoice Detail Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedInvoice(null)}
          />
          <div className="relative bg-white dark:bg-gray-900 rounded-3xl w-full max-w-lg max-h-[90vh] overflow-auto shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            {/* Invoice Header */}
            <div className="bg-gradient-to-br from-primary-500 to-primary-600 p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold">فاتورة</h2>
                  <p className="text-sm text-white/80 font-mono">{selectedInvoice.number}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                  <FileText className="w-6 h-6" />
                </div>
              </div>
              <div className="flex justify-between text-sm">
                <div>
                  <p className="text-white/70">تاريخ الإصدار</p>
                  <p className="font-medium">
                    {new Date(selectedInvoice.date).toLocaleDateString('ar-SA')}
                  </p>
                </div>
                <div className="text-left">
                  <p className="text-white/70">الحالة</p>
                  <p className="font-medium">
                    {selectedInvoice.status === 'paid' ? 'مدفوعة' : 'قيد الانتظار'}
                  </p>
                </div>
              </div>
            </div>

            {/* Invoice Body */}
            <div className="p-6">
              {/* Client Info */}
              <div className="mb-6 pb-6 border-b border-gray-200 dark:border-gray-800">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                  العميل
                </h3>
                <p className="font-semibold text-gray-900 dark:text-white">أحمد محمد</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">ahmed@email.com</p>
              </div>

              {/* Items */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
                  التفاصيل
                </h3>
                <div className="space-y-3">
                  {selectedInvoice.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between py-2 border-b border-dashed border-gray-200 dark:border-gray-800"
                    >
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {item.description}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          الكمية: {item.quantity}
                        </p>
                      </div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {item.price} ر.س
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Totals */}
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 space-y-2">
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>المجموع الفرعي</span>
                  <span>{selectedInvoice.amount} ر.س</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>ضريبة القيمة المضافة (15%)</span>
                  <span>{selectedInvoice.tax} ر.س</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-gray-900 dark:text-white pt-2 border-t border-gray-200 dark:border-gray-700">
                  <span>الإجمالي</span>
                  <span>{selectedInvoice.total} ر.س</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 mt-6">
                <Button variant="secondary" className="flex-1">
                  <Printer className="w-4 h-4 ml-2" />
                  طباعة
                </Button>
                <Button className="flex-1">
                  <Download className="w-4 h-4 ml-2" />
                  تحميل PDF
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}
