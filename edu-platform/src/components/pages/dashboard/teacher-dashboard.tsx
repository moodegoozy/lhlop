'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { StatsCard } from '@/components/cards/stats-card';
import { BookingCard } from '@/components/cards/booking-card';
import { t } from '@/lib/translations';
import { 
  Calendar,
  DollarSign,
  Star,
  Users,
  Clock,
  TrendingUp,
  Bell,
  Settings,
  MessageSquare,
  CheckCircle,
  XCircle,
  Video,
  MapPin,
  Plus,
  Edit,
  BarChart3,
  CalendarDays
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/auth.store';
import type { Booking, BookingStatus } from '@/types';

// Mock data for teacher
const mockTeacherStats = {
  total_students: 45,
  total_sessions: 234,
  monthly_earnings: 8500,
  earnings_change: 15.3,
  rating: 4.9,
  total_reviews: 128,
  upcoming_sessions: 8,
  completion_rate: 98.5,
};

const mockUpcomingBookings: Booking[] = [
  {
    id: 'B001',
    teacher_user_id: 'T1',
    booked_by_user_id: 'S1',
    booked_for_type: 'self',
    booked_for_user_id: 'S1',
    subject_id: 'math',
    service_id: 'private_lesson',
    lesson_mode: 'remote',
    booking_date: '2024-01-20',
    start_time: '14:00',
    end_time: '15:00',
    duration_snapshot: 60,
    price_snapshot: 150,
    status: 'confirmed',
    notes: null,
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z',
    subject: {
      id: 'math',
      name_ar: 'الرياضيات',
      name_en: 'Mathematics',
      icon: '📐',
      is_active: true,
      sort_order: 1,
      created_at: '2023-01-01T00:00:00Z',
      updated_at: '2023-01-01T00:00:00Z',
    },
    booked_by_user: {
      id: 'S1',
      full_name: 'سارة العلي',
      avatar_url: null,
      email: 'sara@email.com',
      phone: '+966501234567',
      role: 'student',
      is_active: true,
      is_verified: true,
      created_at: '2023-06-01T00:00:00Z',
      updated_at: '2024-01-10T00:00:00Z',
    },
  },
  {
    id: 'B002',
    teacher_user_id: 'T1',
    booked_by_user_id: 'P1',
    booked_for_type: 'child',
    booked_for_user_id: 'C1',
    subject_id: 'physics',
    service_id: 'private_lesson',
    lesson_mode: 'in_person',
    booking_date: '2024-01-20',
    start_time: '16:00',
    end_time: '17:30',
    duration_snapshot: 90,
    price_snapshot: 225,
    status: 'confirmed',
    notes: 'مراجعة الفصل الثالث',
    created_at: '2024-01-14T08:00:00Z',
    updated_at: '2024-01-14T08:00:00Z',
    subject: {
      id: 'physics',
      name_ar: 'الفيزياء',
      name_en: 'Physics',
      icon: '⚛️',
      is_active: true,
      sort_order: 2,
      created_at: '2023-01-01T00:00:00Z',
      updated_at: '2023-01-01T00:00:00Z',
    },
    booked_for_user: {
      id: 'C1',
      full_name: 'عمر السعيد',
      avatar_url: null,
      email: 'omar@email.com',
      phone: null,
      role: 'child',
      is_active: true,
      is_verified: false,
      created_at: '2023-08-01T00:00:00Z',
      updated_at: '2024-01-10T00:00:00Z',
    },
  },
];

const mockPendingRequests: Booking[] = [
  {
    id: 'B003',
    teacher_user_id: 'T1',
    booked_by_user_id: 'S3',
    booked_for_type: 'self',
    booked_for_user_id: 'S3',
    subject_id: 'math',
    service_id: 'private_lesson',
    lesson_mode: 'remote',
    booking_date: '2024-01-22',
    start_time: '10:00',
    end_time: '11:00',
    duration_snapshot: 60,
    price_snapshot: 150,
    status: 'pending',
    notes: 'أحتاج مساعدة في الجبر',
    created_at: '2024-01-16T14:00:00Z',
    updated_at: '2024-01-16T14:00:00Z',
    subject: {
      id: 'math',
      name_ar: 'الرياضيات',
      name_en: 'Mathematics',
      icon: '📐',
      is_active: true,
      sort_order: 1,
      created_at: '2023-01-01T00:00:00Z',
      updated_at: '2023-01-01T00:00:00Z',
    },
    booked_by_user: {
      id: 'S3',
      full_name: 'ليان محمد',
      avatar_url: null,
      email: 'layan@email.com',
      phone: '+966505551234',
      role: 'student',
      is_active: true,
      is_verified: true,
      created_at: '2024-01-10T00:00:00Z',
      updated_at: '2024-01-16T00:00:00Z',
    },
  },
];

interface ScheduleSlot {
  day: string;
  dayName: string;
  slots: {
    time: string;
    booking?: Booking;
  }[];
}

const mockWeekSchedule: ScheduleSlot[] = [
  {
    day: '2024-01-20',
    dayName: 'السبت',
    slots: [
      { time: '14:00', booking: mockUpcomingBookings[0] },
      { time: '16:00', booking: mockUpcomingBookings[1] },
    ],
  },
  {
    day: '2024-01-21',
    dayName: 'الأحد',
    slots: [
      { time: '10:00' },
      { time: '14:00' },
    ],
  },
  {
    day: '2024-01-22',
    dayName: 'الاثنين',
    slots: [
      { time: '10:00', booking: mockPendingRequests[0] },
    ],
  },
];

export function TeacherDashboard() {
  const { user } = useAuthStore();
  const [selectedView, setSelectedView] = useState<'day' | 'week'>('week');

  const handleAcceptBooking = (bookingId: string) => {
    console.log('Accept booking:', bookingId);
  };

  const handleRejectBooking = (bookingId: string) => {
    console.log('Reject booking:', bookingId);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={user?.avatar_url || undefined} />
                <AvatarFallback>{user?.full_name?.slice(0, 2) || 'م'}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  مرحباً، {user?.full_name || 'معلم'}
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  لديك {mockTeacherStats.upcoming_sessions} حصص قادمة هذا الأسبوع
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center">
                  3
                </span>
              </Button>
              <Button variant="ghost" size="icon">
                <MessageSquare className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="إجمالي الطلاب"
            value={mockTeacherStats.total_students.toString()}
            icon={<Users className="h-5 w-5" />}
            trend={{ value: 12, isPositive: true }}
          />
          <StatsCard
            title="الأرباح الشهرية"
            value={`${mockTeacherStats.monthly_earnings.toLocaleString('ar-SA')} ر.س`}
            icon={<DollarSign className="h-5 w-5" />}
            trend={{ value: mockTeacherStats.earnings_change, isPositive: true }}
          />
          <StatsCard
            title="التقييم"
            value={mockTeacherStats.rating.toString()}
            icon={<Star className="h-5 w-5 text-yellow-500" />}
            description={`من ${mockTeacherStats.total_reviews} تقييم`}
          />
          <StatsCard
            title="معدل الإكمال"
            value={`${mockTeacherStats.completion_rate}%`}
            icon={<CheckCircle className="h-5 w-5 text-green-500" />}
            trend={{ value: 2.1, isPositive: true }}
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Pending Requests */}
          <Card className="lg:col-span-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center justify-between">
                <span>طلبات الحجز</span>
                <Badge variant="secondary">{mockPendingRequests.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {mockPendingRequests.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Calendar className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>لا توجد طلبات جديدة</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {mockPendingRequests.map((booking) => (
                    <div
                      key={booking.id}
                      className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>
                              {booking.booked_by_user?.full_name?.slice(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">
                              {booking.booked_by_user?.full_name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {booking.subject?.name_ar}
                            </p>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {booking.lesson_mode === 'remote' ? 'عن بعد' : 'حضوري'}
                        </Badge>
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                        <div className="flex items-center gap-1 mb-1">
                          <CalendarDays className="h-3 w-3" />
                          {new Date(booking.booking_date).toLocaleDateString('ar-SA')}
                          {' • '}
                          {booking.start_time}
                        </div>
                        {booking.notes && (
                          <p className="mt-1 text-gray-500 line-clamp-2">
                            "{booking.notes}"
                          </p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          className="flex-1"
                          onClick={() => handleAcceptBooking(booking.id)}
                        >
                          <CheckCircle className="h-4 w-4 ml-1" />
                          قبول
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1"
                          onClick={() => handleRejectBooking(booking.id)}
                        >
                          <XCircle className="h-4 w-4 ml-1" />
                          رفض
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Weekly Schedule */}
          <Card className="lg:col-span-2">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">جدول الحصص</CardTitle>
                <div className="flex items-center gap-2">
                  <Button
                    variant={selectedView === 'day' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setSelectedView('day')}
                  >
                    يوم
                  </Button>
                  <Button
                    variant={selectedView === 'week' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setSelectedView('week')}
                  >
                    أسبوع
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockWeekSchedule.map((day) => (
                  <div key={day.day}>
                    <h4 className="font-medium text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {day.dayName} - {new Date(day.day).toLocaleDateString('ar-SA')}
                    </h4>
                    <div className="space-y-2">
                      {day.slots.map((slot, idx) => (
                        <div
                          key={idx}
                          className={cn(
                            'flex items-center gap-3 p-3 rounded-lg border',
                            slot.booking
                              ? slot.booking.status === 'pending'
                                ? 'bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800'
                                : 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800'
                              : 'bg-gray-50 border-gray-200 dark:bg-gray-800 dark:border-gray-700'
                          )}
                        >
                          <div className="flex items-center gap-2 min-w-[80px]">
                            <Clock className="h-4 w-4 text-gray-400" />
                            <span className="text-sm font-medium">{slot.time}</span>
                          </div>
                          {slot.booking ? (
                            <>
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-sm">
                                    {slot.booking.booked_by_user?.full_name || slot.booking.booked_for_user?.full_name}
                                  </span>
                                  <Badge variant="secondary" className="text-xs">
                                    {slot.booking.subject?.name_ar}
                                  </Badge>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                                  {slot.booking.lesson_mode === 'remote' ? (
                                    <>
                                      <Video className="h-3 w-3" />
                                      <span>درس عن بعد</span>
                                    </>
                                  ) : (
                                    <>
                                      <MapPin className="h-3 w-3" />
                                      <span>درس حضوري</span>
                                    </>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                {slot.booking.status === 'confirmed' &&
                                  slot.booking.lesson_mode === 'remote' && (
                                    <Button size="sm" variant="outline">
                                      <Video className="h-4 w-4 ml-1" />
                                      بدء
                                    </Button>
                                  )}
                                <Button size="sm" variant="ghost">
                                  تفاصيل
                                </Button>
                              </div>
                            </>
                          ) : (
                            <div className="flex-1 flex items-center justify-between">
                              <span className="text-sm text-gray-500">متاح</span>
                              <Button size="sm" variant="ghost">
                                <Edit className="h-4 w-4 ml-1" />
                                تعديل
                              </Button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
            <CalendarDays className="h-6 w-6" />
            <span>إدارة الجدول</span>
          </Button>
          <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
            <Edit className="h-6 w-6" />
            <span>تعديل الملف الشخصي</span>
          </Button>
          <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
            <BarChart3 className="h-6 w-6" />
            <span>تقارير الأداء</span>
          </Button>
          <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
            <DollarSign className="h-6 w-6" />
            <span>سحب الأرباح</span>
          </Button>
        </div>
      </main>
    </div>
  );
}
