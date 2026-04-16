'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  MessageCircle,
  Headphones,
  Search,
  Filter,
  Plus,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  User,
  Send,
  Paperclip,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Star,
  ThumbsUp,
  ThumbsDown,
  Tag,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  MessageSquare,
  Users,
  Timer,
  TrendingUp,
} from 'lucide-react';

// Types
interface Ticket {
  id: string;
  number: string;
  subject: string;
  customer: {
    name: string;
    email: string;
    avatar?: string;
    type: 'student' | 'parent' | 'teacher';
  };
  category: 'technical' | 'billing' | 'booking' | 'account' | 'other';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'pending' | 'resolved' | 'closed';
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
  lastMessage?: string;
  messagesCount: number;
  rating?: number;
}

interface Message {
  id: string;
  sender: 'customer' | 'support';
  senderName: string;
  content: string;
  timestamp: string;
  attachments?: string[];
}

// Mock Data
const mockTickets: Ticket[] = [
  {
    id: '1', number: 'TKT-2024-001', subject: 'مشكلة في الدفع',
    customer: { name: 'أحمد محمد', email: 'ahmed@email.com', type: 'parent' },
    category: 'billing', priority: 'high', status: 'open',
    assignedTo: 'سارة الدعم', createdAt: '2024-01-20 14:30', updatedAt: '2024-01-20 15:45',
    lastMessage: 'حاولت الدفع عدة مرات ولكن يظهر خطأ...', messagesCount: 5
  },
  {
    id: '2', number: 'TKT-2024-002', subject: 'لا أستطيع الدخول لحسابي',
    customer: { name: 'سارة علي', email: 'sara@email.com', type: 'student' },
    category: 'account', priority: 'urgent', status: 'pending',
    assignedTo: 'محمد الدعم', createdAt: '2024-01-20 10:00', updatedAt: '2024-01-20 12:30',
    lastMessage: 'تم إرسال رابط إعادة تعيين كلمة المرور', messagesCount: 3
  },
  {
    id: '3', number: 'TKT-2024-003', subject: 'إلغاء حجز',
    customer: { name: 'فاطمة خالد', email: 'fatima@email.com', type: 'parent' },
    category: 'booking', priority: 'medium', status: 'resolved',
    createdAt: '2024-01-19 18:00', updatedAt: '2024-01-20 09:00',
    lastMessage: 'تم إلغاء الحجز واسترداد المبلغ', messagesCount: 8, rating: 5
  },
  {
    id: '4', number: 'TKT-2024-004', subject: 'مشكلة تقنية في المنصة',
    customer: { name: 'محمد المعلم', email: 'teacher@email.com', type: 'teacher' },
    category: 'technical', priority: 'high', status: 'open',
    createdAt: '2024-01-20 08:00', updatedAt: '2024-01-20 08:00',
    lastMessage: 'الصفحة لا تعمل بشكل صحيح على الجوال...', messagesCount: 1
  },
  {
    id: '5', number: 'TKT-2024-005', subject: 'استفسار عن الباقات',
    customer: { name: 'نورة سعد', email: 'noura@email.com', type: 'parent' },
    category: 'other', priority: 'low', status: 'closed',
    createdAt: '2024-01-18 14:00', updatedAt: '2024-01-19 10:00',
    lastMessage: 'شكراً جزيلاً', messagesCount: 4, rating: 4
  },
];

const mockMessages: Message[] = [
  { id: '1', sender: 'customer', senderName: 'أحمد محمد', content: 'السلام عليكم، حاولت الدفع عدة مرات ولكن يظهر خطأ في كل مرة. الخطأ يقول "فشل في معالجة الدفع"', timestamp: '14:30' },
  { id: '2', sender: 'support', senderName: 'سارة الدعم', content: 'وعليكم السلام أحمد، أهلاً بك. هل يمكنك إخباري بوسيلة الدفع المستخدمة؟', timestamp: '14:45' },
  { id: '3', sender: 'customer', senderName: 'أحمد محمد', content: 'أستخدم بطاقة مدى', timestamp: '14:50' },
  { id: '4', sender: 'support', senderName: 'سارة الدعم', content: 'حسناً، هل يمكنك إرسال صورة للخطأ الذي يظهر؟', timestamp: '15:00' },
  { id: '5', sender: 'customer', senderName: 'أحمد محمد', content: 'تفضل الصورة', timestamp: '15:30', attachments: ['error-screenshot.png'] },
];

const stats = {
  openTickets: 23,
  pendingTickets: 12,
  resolvedToday: 45,
  avgResponseTime: '2.5 ساعة',
  avgResolutionTime: '8 ساعات',
  satisfactionRate: 94,
};

const categoryLabels: Record<string, string> = {
  technical: 'مشاكل تقنية',
  billing: 'الفواتير والدفع',
  booking: 'الحجوزات',
  account: 'الحساب',
  other: 'أخرى',
};

const priorityColors: Record<string, string> = {
  low: 'bg-gray-100 text-gray-700',
  medium: 'bg-blue-100 text-blue-700',
  high: 'bg-orange-100 text-orange-700',
  urgent: 'bg-red-100 text-red-700',
};

const priorityLabels: Record<string, string> = {
  low: 'منخفض',
  medium: 'متوسط',
  high: 'مرتفع',
  urgent: 'عاجل',
};

const statusColors: Record<string, string> = {
  open: 'bg-green-100 text-green-700',
  pending: 'bg-amber-100 text-amber-700',
  resolved: 'bg-blue-100 text-blue-700',
  closed: 'bg-gray-100 text-gray-600',
};

const statusLabels: Record<string, string> = {
  open: 'مفتوح',
  pending: 'قيد الانتظار',
  resolved: 'تم الحل',
  closed: 'مغلق',
};

export default function SupportPage() {
  const [selectedTicket, setSelectedTicket] = React.useState<Ticket | null>(null);
  const [statusFilter, setStatusFilter] = React.useState<string>('all');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [newMessage, setNewMessage] = React.useState('');

  const filteredTickets = mockTickets.filter((ticket) => {
    if (statusFilter !== 'all' && ticket.status !== statusFilter) return false;
    if (searchQuery && !ticket.subject.includes(searchQuery) && !ticket.customer.name.includes(searchQuery)) return false;
    return true;
  });

  return (
    <div className="p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            الدعم الفني
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            إدارة تذاكر الدعم والرد على العملاء
          </p>
        </div>
        <Button className="shadow-lg">
          <Plus className="w-4 h-4 ml-2" />
          تذكرة جديدة
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        {[
          { label: 'تذاكر مفتوحة', value: stats.openTickets, icon: MessageCircle, color: 'text-green-500 bg-green-50' },
          { label: 'قيد الانتظار', value: stats.pendingTickets, icon: Clock, color: 'text-amber-500 bg-amber-50' },
          { label: 'تم حلها اليوم', value: stats.resolvedToday, icon: CheckCircle, color: 'text-blue-500 bg-blue-50' },
          { label: 'متوسط وقت الرد', value: stats.avgResponseTime, icon: Timer, color: 'text-purple-500 bg-purple-50' },
          { label: 'متوسط وقت الحل', value: stats.avgResolutionTime, icon: TrendingUp, color: 'text-indigo-500 bg-indigo-50' },
          { label: 'معدل الرضا', value: `${stats.satisfactionRate}%`, icon: Star, color: 'text-yellow-500 bg-yellow-50' },
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
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tickets List */}
        <div className={cn('lg:col-span-1', selectedTicket && 'hidden lg:block')}>
          <div className="bg-white dark:bg-gray-900/50 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
            {/* Filters */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-800">
              <div className="relative mb-3">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="بحث في التذاكر..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pr-10 pl-4 py-2.5 bg-gray-50 dark:bg-gray-800 rounded-xl border-0 focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div className="flex items-center gap-2 overflow-x-auto">
                {['all', 'open', 'pending', 'resolved', 'closed'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={cn(
                      'px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all',
                      statusFilter === status
                        ? 'bg-primary-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                    )}
                  >
                    {status === 'all' ? 'الكل' : statusLabels[status]}
                  </button>
                ))}
              </div>
            </div>

            {/* Tickets */}
            <div className="divide-y divide-gray-100 dark:divide-gray-800 max-h-[calc(100vh-400px)] overflow-y-auto">
              {filteredTickets.map((ticket) => (
                <button
                  key={ticket.id}
                  onClick={() => setSelectedTicket(ticket)}
                  className={cn(
                    'w-full p-4 text-right hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors',
                    selectedTicket?.id === ticket.id && 'bg-primary-50 dark:bg-primary-900/20'
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold shrink-0">
                      {ticket.customer.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <p className="font-medium text-gray-900 dark:text-white truncate">{ticket.subject}</p>
                        <Badge className={priorityColors[ticket.priority]}>
                          {priorityLabels[ticket.priority]}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500 truncate">{ticket.lastMessage}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-xs text-gray-400">{ticket.number}</span>
                        <Badge className={statusColors[ticket.status]}>
                          {statusLabels[ticket.status]}
                        </Badge>
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                          <MessageSquare className="w-3 h-3" />
                          {ticket.messagesCount}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Chat View */}
        <div className={cn('lg:col-span-2', !selectedTicket && 'hidden lg:flex lg:items-center lg:justify-center')}>
          {selectedTicket ? (
            <div className="bg-white dark:bg-gray-900/50 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden h-[calc(100vh-280px)]">
              {/* Header */}
              <div className="p-4 border-b border-gray-200 dark:border-gray-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setSelectedTicket(null)}
                      className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold">
                      {selectedTicket.customer.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{selectedTicket.customer.name}</p>
                      <p className="text-sm text-gray-500">{selectedTicket.customer.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={statusColors[selectedTicket.status]}>
                      {statusLabels[selectedTicket.status]}
                    </Badge>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-3 text-sm">
                  <span className="text-gray-500">
                    <Tag className="w-4 h-4 inline ml-1" />
                    {categoryLabels[selectedTicket.category]}
                  </span>
                  <span className="text-gray-500">
                    <Calendar className="w-4 h-4 inline ml-1" />
                    {selectedTicket.createdAt}
                  </span>
                  {selectedTicket.assignedTo && (
                    <span className="text-gray-500">
                      <User className="w-4 h-4 inline ml-1" />
                      {selectedTicket.assignedTo}
                    </span>
                  )}
                </div>
              </div>

              {/* Messages */}
              <div className="p-4 h-[calc(100%-200px)] overflow-y-auto space-y-4">
                {mockMessages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      'flex gap-3',
                      message.sender === 'support' && 'flex-row-reverse'
                    )}
                  >
                    <div className={cn(
                      'w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0',
                      message.sender === 'customer' ? 'bg-primary-500' : 'bg-emerald-500'
                    )}>
                      {message.senderName.charAt(0)}
                    </div>
                    <div className={cn(
                      'max-w-[70%] p-3 rounded-2xl',
                      message.sender === 'customer'
                        ? 'bg-gray-100 dark:bg-gray-800 rounded-tr-none'
                        : 'bg-primary-500 text-white rounded-tl-none'
                    )}>
                      <p className="text-sm">{message.content}</p>
                      {message.attachments && (
                        <div className="mt-2">
                          {message.attachments.map((file, i) => (
                            <div key={i} className={cn(
                              'flex items-center gap-2 px-2 py-1 rounded text-xs',
                              message.sender === 'customer' ? 'bg-gray-200 dark:bg-gray-700' : 'bg-primary-600'
                            )}>
                              <Paperclip className="w-3 h-3" />
                              {file}
                            </div>
                          ))}
                        </div>
                      )}
                      <p className={cn(
                        'text-xs mt-1',
                        message.sender === 'customer' ? 'text-gray-400' : 'text-primary-100'
                      )}>
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-800">
                <div className="flex items-end gap-3">
                  <div className="flex-1">
                    <textarea
                      placeholder="اكتب ردك هنا..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border-0 focus:ring-2 focus:ring-primary-500 resize-none"
                      rows={2}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Paperclip className="w-5 h-5" />
                    </Button>
                    <Button className="px-6">
                      <Send className="w-4 h-4 ml-2" />
                      إرسال
                    </Button>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <Button variant="outline" size="sm">حل التذكرة</Button>
                  <Button variant="outline" size="sm" className="text-red-500">إغلاق</Button>
                  <Button variant="outline" size="sm">تحويل</Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-900/50 rounded-2xl border border-gray-200 dark:border-gray-800 p-12 text-center">
              <Headphones className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
              <p className="text-gray-500">اختر تذكرة لعرض المحادثة</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
