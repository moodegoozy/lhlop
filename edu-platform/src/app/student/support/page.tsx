'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { DashboardShell, PageTitle, ContentCard } from '@/components/dashboard';
import { Badge } from '@/components/ui/badge';
import { 
  MessageSquare, 
  Plus, 
  Search, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  ChevronLeft,
  Paperclip,
  Send,
  X,
  HelpCircle,
  CreditCard,
  BookOpen,
  Settings,
  ArrowRight
} from 'lucide-react';

// Mock tickets
const mockTickets = [
  {
    id: 'TKT-001',
    subject: 'مشكلة في الدفع',
    category: 'payment',
    status: 'open',
    priority: 'high',
    createdAt: '2024-01-25T10:30:00',
    updatedAt: '2024-01-25T14:20:00',
    messages: [
      {
        id: '1',
        sender: 'user',
        content: 'لم يتم خصم المبلغ من المحفظة بعد الدفع',
        timestamp: '2024-01-25T10:30:00',
      },
      {
        id: '2',
        sender: 'support',
        content: 'مرحباً، شكراً لتواصلك معنا. نحن نتحقق من المشكلة وسنرد عليك قريباً.',
        timestamp: '2024-01-25T14:20:00',
      },
    ],
  },
  {
    id: 'TKT-002',
    subject: 'استفسار عن إلغاء الحجز',
    category: 'booking',
    status: 'resolved',
    priority: 'medium',
    createdAt: '2024-01-22T09:00:00',
    updatedAt: '2024-01-23T11:30:00',
    messages: [
      {
        id: '1',
        sender: 'user',
        content: 'كيف يمكنني إلغاء حجز قبل موعده بيوم واحد؟',
        timestamp: '2024-01-22T09:00:00',
      },
      {
        id: '2',
        sender: 'support',
        content: 'يمكنك إلغاء الحجز من صفحة الدروس، اضغط على الحجز ثم اختر إلغاء.',
        timestamp: '2024-01-22T15:00:00',
      },
      {
        id: '3',
        sender: 'user',
        content: 'شكراً، تم الإلغاء بنجاح',
        timestamp: '2024-01-23T11:30:00',
      },
    ],
  },
  {
    id: 'TKT-003',
    subject: 'اقتراح تحسين',
    category: 'general',
    status: 'pending',
    priority: 'low',
    createdAt: '2024-01-20T16:45:00',
    updatedAt: '2024-01-20T16:45:00',
    messages: [
      {
        id: '1',
        sender: 'user',
        content: 'أقترح إضافة خاصية تذكير قبل موعد الحصة بساعة',
        timestamp: '2024-01-20T16:45:00',
      },
    ],
  },
];

const statusConfig: Record<string, { label: string; class: string; icon: typeof MessageSquare }> = {
  open: {
    label: 'مفتوحة',
    class: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    icon: MessageSquare,
  },
  pending: {
    label: 'قيد المراجعة',
    class: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    icon: Clock,
  },
  resolved: {
    label: 'تم الحل',
    class: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    icon: CheckCircle2,
  },
};

const priorityConfig: Record<string, { label: string; class: string }> = {
  high: { label: 'عاجل', class: 'text-red-500' },
  medium: { label: 'متوسط', class: 'text-yellow-500' },
  low: { label: 'عادي', class: 'text-gray-500' },
};

const categoryConfig: Record<string, { label: string; icon: typeof CreditCard }> = {
  payment: { label: 'الدفع', icon: CreditCard },
  booking: { label: 'الحجوزات', icon: BookOpen },
  technical: { label: 'تقنية', icon: Settings },
  general: { label: 'عام', icon: HelpCircle },
};

export default function SupportPage() {
  const [selectedTicket, setSelectedTicket] = React.useState<string | null>(null);
  const [showNewTicket, setShowNewTicket] = React.useState(false);
  const [newMessage, setNewMessage] = React.useState('');

  const activeTicket = mockTickets.find((t) => t.id === selectedTicket);

  return (
    <DashboardShell>
      <PageTitle
        title="الدعم الفني"
        description="نحن هنا لمساعدتك"
      />

      {/* Quick Help */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { icon: CreditCard, label: 'مشاكل الدفع', color: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' },
          { icon: BookOpen, label: 'الحجوزات', color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' },
          { icon: Settings, label: 'مشاكل تقنية', color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400' },
          { icon: HelpCircle, label: 'استفسارات عامة', color: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400' },
        ].map((item, i) => (
          <button
            key={i}
            onClick={() => setShowNewTicket(true)}
            className="p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-primary-300 dark:hover:border-primary-700 hover:shadow-lg transition-all text-center group"
          >
            <div className={cn('w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center', item.color)}>
              <item.icon className="w-6 h-6" />
            </div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">{item.label}</p>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tickets List */}
        <div className={cn('lg:col-span-1', selectedTicket && 'hidden lg:block')}>
          <ContentCard className="p-0 overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900 dark:text-white">تذاكر الدعم</h3>
                <button
                  onClick={() => setShowNewTicket(true)}
                  className="p-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="relative">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="البحث في التذاكر..."
                  className="w-full pr-10 pl-4 py-2.5 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm border-0 focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>

            {/* Tickets */}
            <div className="divide-y divide-gray-100 dark:divide-gray-800 max-h-[500px] overflow-y-auto">
              {mockTickets.map((ticket) => (
                <button
                  key={ticket.id}
                  onClick={() => setSelectedTicket(ticket.id)}
                  className={cn(
                    'w-full p-4 text-right hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors',
                    selectedTicket === ticket.id && 'bg-primary-50 dark:bg-primary-900/20'
                  )}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <Badge className={statusConfig[ticket.status].class}>
                        {statusConfig[ticket.status].label}
                      </Badge>
                    </div>
                    <span className="text-xs text-gray-400">{ticket.id}</span>
                  </div>
                  <h4 className="font-medium text-gray-900 dark:text-white text-sm truncate mb-1">
                    {ticket.subject}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    آخر تحديث: {new Date(ticket.updatedAt).toLocaleDateString('ar-SA')}
                  </p>
                </button>
              ))}
            </div>
          </ContentCard>
        </div>

        {/* Ticket Detail */}
        <div className={cn('lg:col-span-2', !selectedTicket && 'hidden lg:block')}>
          {activeTicket ? (
            <ContentCard className="p-0 overflow-hidden h-full flex flex-col">
              {/* Header */}
              <div className="p-4 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setSelectedTicket(null)}
                    className="lg:hidden p-2 -mr-2 text-gray-500 hover:text-gray-700"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  <div className="flex-1 mr-2">
                    <h3 className="font-bold text-gray-900 dark:text-white">
                      {activeTicket.subject}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-500">{activeTicket.id}</span>
                      <span className="text-gray-300 dark:text-gray-600">•</span>
                      <Badge className={statusConfig[activeTicket.status].class}>
                        {statusConfig[activeTicket.status].label}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 p-4 space-y-4 overflow-y-auto max-h-[400px]">
                {activeTicket.messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      'flex',
                      message.sender === 'user' ? 'justify-start' : 'justify-end'
                    )}
                  >
                    <div
                      className={cn(
                        'max-w-[80%] p-4 rounded-2xl',
                        message.sender === 'user'
                          ? 'bg-primary-500 text-white rounded-br-md'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-bl-md'
                      )}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p
                        className={cn(
                          'text-xs mt-2',
                          message.sender === 'user'
                            ? 'text-white/70'
                            : 'text-gray-500 dark:text-gray-400'
                        )}
                      >
                        {new Date(message.timestamp).toLocaleTimeString('ar-SA', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              {activeTicket.status !== 'resolved' && (
                <div className="p-4 border-t border-gray-100 dark:border-gray-800">
                  <div className="flex gap-2">
                    <button className="p-3 text-gray-500 hover:text-primary-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors">
                      <Paperclip className="w-5 h-5" />
                    </button>
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="اكتب رسالتك..."
                      className="flex-1 px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-xl text-sm border-0 focus:ring-2 focus:ring-primary-500"
                    />
                    <button className="p-3 bg-primary-500 hover:bg-primary-600 text-white rounded-xl transition-colors">
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}
            </ContentCard>
          ) : (
            <ContentCard className="h-full flex items-center justify-center py-16">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  <MessageSquare className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  اختر تذكرة
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  اختر تذكرة من القائمة أو أنشئ تذكرة جديدة
                </p>
                <button
                  onClick={() => setShowNewTicket(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-xl transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  تذكرة جديدة
                </button>
              </div>
            </ContentCard>
          )}
        </div>
      </div>

      {/* New Ticket Modal */}
      {showNewTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowNewTicket(false)}
          />
          <div className="relative w-full max-w-lg bg-white dark:bg-gray-900 rounded-2xl shadow-2xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  تذكرة جديدة
                </h3>
                <button
                  onClick={() => setShowNewTicket(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    التصنيف
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(categoryConfig).map(([key, value]) => (
                      <button
                        key={key}
                        className="flex items-center gap-2 p-3 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-primary-300 dark:hover:border-primary-700 transition-colors"
                      >
                        <value.icon className="w-5 h-5 text-gray-400" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{value.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    الموضوع
                  </label>
                  <input
                    type="text"
                    placeholder="اكتب موضوع التذكرة..."
                    className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-xl text-sm border-0 focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    الوصف
                  </label>
                  <textarea
                    rows={4}
                    placeholder="اشرح مشكلتك بالتفصيل..."
                    className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-xl text-sm border-0 focus:ring-2 focus:ring-primary-500 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    إرفاق ملف (اختياري)
                  </label>
                  <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl p-6 text-center hover:border-primary-300 dark:hover:border-primary-700 transition-colors cursor-pointer">
                    <Paperclip className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      اضغط لرفع ملف أو اسحبه هنا
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowNewTicket(false)}
                  className="flex-1 px-4 py-3 text-gray-700 dark:text-gray-300 font-medium rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  إلغاء
                </button>
                <button
                  onClick={() => setShowNewTicket(false)}
                  className="flex-1 px-4 py-3 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-xl transition-colors"
                >
                  إرسال التذكرة
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}
