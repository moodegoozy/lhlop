'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Calendar,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Clock,
  Video,
  MapPin,
  Users,
  PlayCircle,
  MoreVertical,
  Eye,
  X,
  Check,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  CalendarDays,
  CalendarClock,
  Ban,
  RefreshCw,
} from 'lucide-react';

// Types
interface Booking {
  id: string;
  studentName: string;
  studentAvatar: string;
  teacherName: string;
  teacherAvatar: string;
  serviceName: string;
  serviceType: 'online' | 'offline' | 'recorded' | 'group';
  date: string;
  time: string;
  duration: number;
  price: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'no_show';
  paymentStatus: 'paid' | 'pending' | 'refunded';
  createdAt: string;
}

// Mock Data
const mockBookings: Booking[] = [
  {
    id: 'BK001',
    studentName: 'أحمد محمد',
    studentAvatar: '',
    teacherName: 'أ. فهد السعيد',
    teacherAvatar: '',
    serviceName: 'حصة رياضيات',
    serviceType: 'online',
    date: '2024-01-20',
    time: '16:00',
    duration: 60,
    price: 150,
    status: 'confirmed',
    paymentStatus: 'paid',
    createdAt: '2024-01-18T10:00:00Z',
  },
  {
    id: 'BK002',
    studentName: 'سارة خالد',
    studentAvatar: '',
    teacherName: 'أ. نورة العتيبي',
    teacherAvatar: '',
    serviceName: 'دورة إنجليزي مكثفة',
    serviceType: 'group',
    date: '2024-01-20',
    time: '18:00',
    duration: 90,
    price: 200,
    status: 'pending',
    paymentStatus: 'pending',
    createdAt: '2024-01-19T14:30:00Z',
  },
  {
    id: 'BK003',
    studentName: 'محمد عبدالله',
    studentAvatar: '',
    teacherName: 'أ. خالد المالكي',
    teacherAvatar: '',
    serviceName: 'حصة فيزياء',
    serviceType: 'offline',
    date: '2024-01-19',
    time: '14:00',
    duration: 60,
    price: 180,
    status: 'completed',
    paymentStatus: 'paid',
    createdAt: '2024-01-17T09:00:00Z',
  },
  {
    id: 'BK004',
    studentName: 'ريم الحربي',
    studentAvatar: '',
    teacherName: 'أ. منى السالم',
    teacherAvatar: '',
    serviceName: 'دورة برمجة Python',
    serviceType: 'recorded',
    date: '2024-01-21',
    time: '10:00',
    duration: 120,
    price: 299,
    status: 'confirmed',
    paymentStatus: 'paid',
    createdAt: '2024-01-15T16:00:00Z',
  },
  {
    id: 'BK005',
    studentName: 'عبدالرحمن سعود',
    studentAvatar: '',
    teacherName: 'أ. فهد السعيد',
    teacherAvatar: '',
    serviceName: 'حصة رياضيات',
    serviceType: 'online',
    date: '2024-01-18',
    time: '17:00',
    duration: 60,
    price: 150,
    status: 'cancelled',
    paymentStatus: 'refunded',
    createdAt: '2024-01-16T11:00:00Z',
  },
  {
    id: 'BK006',
    studentName: 'نوف العنزي',
    studentAvatar: '',
    teacherName: 'أ. خالد المالكي',
    teacherAvatar: '',
    serviceName: 'حصة كيمياء',
    serviceType: 'online',
    date: '2024-01-17',
    time: '15:00',
    duration: 60,
    price: 140,
    status: 'no_show',
    paymentStatus: 'paid',
    createdAt: '2024-01-14T08:00:00Z',
  },
];

const mockStats = {
  today: { count: 47, change: 12 },
  week: { count: 312, change: 8 },
  completionRate: { value: 94.2, change: 2.1 },
  cancellationRate: { value: 5.8, change: -1.2 },
  peakHours: ['16:00', '18:00', '20:00'],
  popularDays: ['الأحد', 'الثلاثاء', 'الخميس'],
};

const statusConfig: Record<string, { label: string; color: string; icon: typeof Check }> = {
  pending: { label: 'بانتظار التأكيد', color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400', icon: Clock },
  confirmed: { label: 'مؤكد', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400', icon: Check },
  completed: { label: 'مكتمل', color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400', icon: Check },
  cancelled: { label: 'ملغي', color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400', icon: X },
  no_show: { label: 'لم يحضر', color: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400', icon: Ban },
};

const paymentStatusConfig: Record<string, { label: string; color: string }> = {
  paid: { label: 'مدفوع', color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
  pending: { label: 'معلق', color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' },
  refunded: { label: 'مسترد', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' },
};

const serviceTypeConfig: Record<string, { label: string; icon: typeof Video; color: string }> = {
  online: { label: 'أونلاين', icon: Video, color: 'text-blue-500' },
  offline: { label: 'حضوري', icon: MapPin, color: 'text-green-500' },
  recorded: { label: 'مسجل', icon: PlayCircle, color: 'text-purple-500' },
  group: { label: 'جماعي', icon: Users, color: 'text-orange-500' },
};

export default function BookingsPage() {
  const [activeView, setActiveView] = React.useState<'list' | 'calendar'>('list');
  const [activeStatus, setActiveStatus] = React.useState<string | null>(null);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());

  const filteredBookings = mockBookings.filter(booking => {
    const matchesSearch = 
      booking.studentName.includes(searchQuery) ||
      booking.teacherName.includes(searchQuery) ||
      booking.serviceName.includes(searchQuery) ||
      booking.id.includes(searchQuery);
    const matchesStatus = !activeStatus || booking.status === activeStatus;
    return matchesSearch && matchesStatus;
  });

  const statusCounts = {
    all: mockBookings.length,
    pending: mockBookings.filter(b => b.status === 'pending').length,
    confirmed: mockBookings.filter(b => b.status === 'confirmed').length,
    completed: mockBookings.filter(b => b.status === 'completed').length,
    cancelled: mockBookings.filter(b => b.status === 'cancelled').length,
  };

  return (
    <div className="p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            إدارة الحجوزات
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            متابعة وإدارة جميع الحجوزات
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center p-1 bg-gray-100 dark:bg-gray-800 rounded-xl">
            <button
              onClick={() => setActiveView('list')}
              className={cn(
                'px-3 py-1.5 rounded-lg text-sm font-medium transition-all',
                activeView === 'list'
                  ? 'bg-white dark:bg-gray-700 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400'
              )}
            >
              قائمة
            </button>
            <button
              onClick={() => setActiveView('calendar')}
              className={cn(
                'px-3 py-1.5 rounded-lg text-sm font-medium transition-all',
                activeView === 'calendar'
                  ? 'bg-white dark:bg-gray-700 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400'
              )}
            >
              تقويم
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-900/50 rounded-2xl border border-gray-200 dark:border-gray-800 p-4">
          <div className="flex items-center justify-between mb-2">
            <CalendarDays className="w-5 h-5 text-blue-500" />
            <Badge className={mockStats.today.change >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}>
              {mockStats.today.change >= 0 ? '+' : ''}{mockStats.today.change}%
            </Badge>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{mockStats.today.count}</p>
          <p className="text-sm text-gray-500">حجوزات اليوم</p>
        </div>

        <div className="bg-white dark:bg-gray-900/50 rounded-2xl border border-gray-200 dark:border-gray-800 p-4">
          <div className="flex items-center justify-between mb-2">
            <CalendarClock className="w-5 h-5 text-purple-500" />
            <Badge className={mockStats.week.change >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}>
              {mockStats.week.change >= 0 ? '+' : ''}{mockStats.week.change}%
            </Badge>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{mockStats.week.count}</p>
          <p className="text-sm text-gray-500">حجوزات الأسبوع</p>
        </div>

        <div className="bg-white dark:bg-gray-900/50 rounded-2xl border border-gray-200 dark:border-gray-800 p-4">
          <div className="flex items-center justify-between mb-2">
            <Check className="w-5 h-5 text-green-500" />
            <Badge className={mockStats.completionRate.change >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}>
              {mockStats.completionRate.change >= 0 ? '+' : ''}{mockStats.completionRate.change}%
            </Badge>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{mockStats.completionRate.value}%</p>
          <p className="text-sm text-gray-500">نسبة الإتمام</p>
        </div>

        <div className="bg-white dark:bg-gray-900/50 rounded-2xl border border-gray-200 dark:border-gray-800 p-4">
          <div className="flex items-center justify-between mb-2">
            <Ban className="w-5 h-5 text-red-500" />
            <Badge className={mockStats.cancellationRate.change <= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}>
              {mockStats.cancellationRate.change}%
            </Badge>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{mockStats.cancellationRate.value}%</p>
          <p className="text-sm text-gray-500">نسبة الإلغاء</p>
        </div>
      </div>

      {/* Insights Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-4 text-white">
          <h3 className="font-semibold mb-2 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            أوقات الذروة
          </h3>
          <div className="flex items-center gap-2">
            {mockStats.peakHours.map((hour, i) => (
              <Badge key={i} className="bg-white/20 text-white border-0">
                {hour}
              </Badge>
            ))}
          </div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-4 text-white">
          <h3 className="font-semibold mb-2 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            الأيام الأكثر حجزاً
          </h3>
          <div className="flex items-center gap-2">
            {mockStats.popularDays.map((day, i) => (
              <Badge key={i} className="bg-white/20 text-white border-0">
                {day}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-6">
        <div className="relative flex-1 w-full md:w-auto">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="بحث برقم الحجز، اسم الطالب أو المعلم..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-96 pr-10 pl-4 py-2.5 bg-white dark:bg-gray-800 rounded-xl text-sm border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
          <button
            onClick={() => setActiveStatus(null)}
            className={cn(
              'px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all',
              !activeStatus
                ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400'
                : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
            )}
          >
            الكل ({statusCounts.all})
          </button>
          <button
            onClick={() => setActiveStatus('pending')}
            className={cn(
              'px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all',
              activeStatus === 'pending'
                ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
            )}
          >
            بانتظار ({statusCounts.pending})
          </button>
          <button
            onClick={() => setActiveStatus('confirmed')}
            className={cn(
              'px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all',
              activeStatus === 'confirmed'
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
            )}
          >
            مؤكد ({statusCounts.confirmed})
          </button>
          <button
            onClick={() => setActiveStatus('completed')}
            className={cn(
              'px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all',
              activeStatus === 'completed'
                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
            )}
          >
            مكتمل ({statusCounts.completed})
          </button>
          <button
            onClick={() => setActiveStatus('cancelled')}
            className={cn(
              'px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all',
              activeStatus === 'cancelled'
                ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
            )}
          >
            ملغي ({statusCounts.cancelled})
          </button>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white dark:bg-gray-900/50 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800">
                <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase">رقم الحجز</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase">الطالب</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase">المعلم</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase">الخدمة</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase">الموعد</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase">السعر</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase">الحالة</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase">الدفع</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {filteredBookings.map((booking) => {
                const status = statusConfig[booking.status];
                const paymentStatus = paymentStatusConfig[booking.paymentStatus];
                const serviceType = serviceTypeConfig[booking.serviceType];
                const ServiceIcon = serviceType.icon;

                return (
                  <tr key={booking.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="px-4 py-3">
                      <span className="font-mono text-sm text-gray-900 dark:text-white">{booking.id}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-primary-100 text-primary-700 text-xs">
                            {booking.studentName.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{booking.studentName}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-blue-100 text-blue-700 text-xs">
                            {booking.teacherName.charAt(2)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{booking.teacherName}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <ServiceIcon className={cn('w-4 h-4', serviceType.color)} />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{booking.serviceName}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm">
                        <p className="font-medium text-gray-900 dark:text-white">{booking.date}</p>
                        <p className="text-gray-500">{booking.time} • {booking.duration} دقيقة</p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-semibold text-gray-900 dark:text-white">{booking.price} ر.س</span>
                    </td>
                    <td className="px-4 py-3">
                      <Badge className={status.color}>{status.label}</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Badge className={paymentStatus.color}>{paymentStatus.label}</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="w-4 h-4" />
                        </Button>
                        {booking.status === 'pending' && (
                          <>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-green-500">
                              <Check className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                              <X className="w-4 h-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between p-4 border-t border-gray-200 dark:border-gray-800">
          <p className="text-sm text-gray-500">
            عرض 1-{filteredBookings.length} من {mockBookings.length} حجز
          </p>
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
    </div>
  );
}
