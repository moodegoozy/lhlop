'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { StatsCard } from '@/components/cards/stats-card';
import { ChildCard } from '@/components/cards/child-card';
import { BookingCard } from '@/components/cards/booking-card';
import { 
  Calendar,
  DollarSign,
  Users,
  Plus,
  Bell,
  Settings,
  BookOpen,
  Clock,
  CheckCircle,
  TrendingUp,
  CreditCard,
  Search,
  ChevronLeft,
  Star,
  MapPin,
  Video
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/auth.store';
import type { ChildProfile, Booking } from '@/types';

// Mock children data
const mockChildren: ChildProfile[] = [
  {
    id: 'C1',
    parent_user_id: 'P1',
    child_user_id: 'UC1',
    full_name: 'عمر الأحمد',
    age: 12,
    grade_level: 'الصف السادس',
    school_name: 'مدرسة الأمير فيصل المتوسطة',
    learning_goals: ['تحسين مستوى الرياضيات', 'التأسيس في الفيزياء'],
    is_active: true,
    created_at: '2023-06-01T00:00:00Z',
    updated_at: '2024-01-10T00:00:00Z',
  },
  {
    id: 'C2',
    parent_user_id: 'P1',
    child_user_id: 'UC2',
    full_name: 'نورة الأحمد',
    age: 9,
    grade_level: 'الصف الثالث',
    school_name: 'مدرسة الأميرة نورة الابتدائية',
    learning_goals: ['تعلم اللغة الإنجليزية', 'تطوير مهارات القراءة'],
    is_active: true,
    created_at: '2023-08-01T00:00:00Z',
    updated_at: '2024-01-15T00:00:00Z',
  },
];

const mockStats = {
  total_spent: 4500,
  active_bookings: 4,
  completed_sessions: 28,
  children_count: 2,
};

const mockUpcomingBookings: Booking[] = [
  {
    id: 'B001',
    teacher_user_id: 'T1',
    booked_by_user_id: 'P1',
    booked_for_type: 'child',
    booked_for_user_id: 'C1',
    subject_id: 'math',
    service_id: 'private_lesson',
    lesson_mode: 'remote',
    booking_date: '2024-01-20',
    start_time: '16:00',
    end_time: '17:00',
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
  },
  {
    id: 'B002',
    teacher_user_id: 'T2',
    booked_by_user_id: 'P1',
    booked_for_type: 'child',
    booked_for_user_id: 'C2',
    subject_id: 'english',
    service_id: 'private_lesson',
    lesson_mode: 'in_person',
    booking_date: '2024-01-21',
    start_time: '14:00',
    end_time: '15:00',
    duration_snapshot: 60,
    price_snapshot: 120,
    status: 'confirmed',
    notes: null,
    created_at: '2024-01-16T08:00:00Z',
    updated_at: '2024-01-16T08:00:00Z',
    subject: {
      id: 'english',
      name_ar: 'اللغة الإنجليزية',
      name_en: 'English',
      icon: '🔤',
      is_active: true,
      sort_order: 2,
      created_at: '2023-01-01T00:00:00Z',
      updated_at: '2023-01-01T00:00:00Z',
    },
  },
];

interface AddChildModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function AddChildModal({ isOpen, onClose }: AddChildModalProps) {
  const [formData, setFormData] = useState({
    full_name: '',
    birth_date: '',
    grade_level: '',
    school_name: '',
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>إضافة طفل جديد</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">الاسم الكامل</label>
            <Input
              value={formData.full_name}
              onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
              placeholder="اسم الطفل"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">تاريخ الميلاد</label>
            <Input
              type="date"
              value={formData.birth_date}
              onChange={(e) => setFormData({ ...formData, birth_date: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">المرحلة الدراسية</label>
            <select
              value={formData.grade_level}
              onChange={(e) => setFormData({ ...formData, grade_level: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-700"
            >
              <option value="">اختر المرحلة</option>
              <option value="kindergarten">رياض الأطفال</option>
              <option value="primary">ابتدائي</option>
              <option value="middle">متوسط</option>
              <option value="high">ثانوي</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">اسم المدرسة (اختياري)</label>
            <Input
              value={formData.school_name}
              onChange={(e) => setFormData({ ...formData, school_name: e.target.value })}
              placeholder="اسم المدرسة"
            />
          </div>
          <div className="flex gap-3 pt-4">
            <Button className="flex-1" onClick={onClose}>
              إضافة
            </Button>
            <Button variant="outline" className="flex-1" onClick={onClose}>
              إلغاء
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function ParentDashboard() {
  const { user } = useAuthStore();
  const [showAddChild, setShowAddChild] = useState(false);
  const [selectedChild, setSelectedChild] = useState<string | null>(null);

  const filteredBookings = selectedChild
    ? mockUpcomingBookings.filter((b) => b.booked_for_user_id === selectedChild)
    : mockUpcomingBookings;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                مرحباً، {user?.full_name || 'ولي الأمر'}
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                إدارة تعليم أطفالك
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center">
                  2
                </span>
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
            title="الأطفال"
            value={mockStats.children_count.toString()}
            icon={<Users className="h-5 w-5" />}
          />
          <StatsCard
            title="الحجوزات النشطة"
            value={mockStats.active_bookings.toString()}
            icon={<Calendar className="h-5 w-5" />}
          />
          <StatsCard
            title="الحصص المكتملة"
            value={mockStats.completed_sessions.toString()}
            icon={<CheckCircle className="h-5 w-5 text-green-500" />}
            trend={{ value: 15, isPositive: true }}
          />
          <StatsCard
            title="إجمالي الإنفاق"
            value={`${mockStats.total_spent.toLocaleString('ar-SA')} ر.س`}
            icon={<DollarSign className="h-5 w-5" />}
          />
        </div>

        {/* Children Section */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg">أطفالي</CardTitle>
            <Button size="sm" onClick={() => setShowAddChild(true)}>
              <Plus className="h-4 w-4 ml-1" />
              إضافة طفل
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockChildren.map((child) => (
                <ChildCard
                  key={child.id}
                  child={child}
                  onEdit={() => console.log('Edit child:', child.id)}
                  onViewBookings={() => console.log('View bookings:', child.id)}
                  onBookLesson={() => console.log('Book lesson:', child.id)}
                  bookingsCount={
                    mockUpcomingBookings.filter((b) => b.booked_for_user_id === child.id).length
                  }
                />
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Upcoming Bookings */}
          <Card className="lg:col-span-2">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">الحجوزات القادمة</CardTitle>
                <div className="flex items-center gap-2">
                  <select
                    value={selectedChild || ''}
                    onChange={(e) => setSelectedChild(e.target.value || null)}
                    className="text-sm p-1.5 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-700"
                  >
                    <option value="">جميع الأطفال</option>
                    {mockChildren.map((child) => (
                      <option key={child.id} value={child.id}>
                        {child.full_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {filteredBookings.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Calendar className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>لا توجد حجوزات قادمة</p>
                  <Button variant="link" className="mt-2">
                    ابحث عن معلم
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                    >
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={booking.teacher?.user?.avatar_url || undefined} />
                        <AvatarFallback>
                          {booking.teacher?.user?.full_name?.slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white">
                              {booking.subject?.name_ar ?? 'درس'}
                            </h4>
                            <p className="text-sm text-gray-500">
                              {mockChildren.find((c) => c.id === booking.booked_for_user_id)?.full_name ?? 'طالب'}
                            </p>
                          </div>
                          <Badge
                            variant={
                              booking.status === 'confirmed' ? 'default' : 'secondary'
                            }
                          >
                            {booking.status === 'confirmed' ? 'مؤكد' : 'معلق'}
                          </Badge>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-gray-600 dark:text-gray-400">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(booking.booking_date).toLocaleDateString('ar-SA')}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {booking.start_time}
                          </div>
                          {booking.lesson_mode === 'remote' ? (
                            <div className="flex items-center gap-1 text-blue-600">
                              <Video className="h-4 w-4" />
                              عن بعد
                            </div>
                          ) : (
                            <div className="flex items-center gap-1 text-green-600">
                              <MapPin className="h-4 w-4" />
                              حضوري
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button size="sm" variant="outline">
                          تفاصيل
                        </Button>
                        {booking.lesson_mode === 'remote' &&
                          booking.status === 'confirmed' && (
                            <Button size="sm">
                              <Video className="h-4 w-4 ml-1" />
                              انضمام
                            </Button>
                          )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">إجراءات سريعة</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start gap-3 h-auto py-3">
                <Search className="h-5 w-5 text-primary-500" />
                <div className="text-right">
                  <p className="font-medium">البحث عن معلم</p>
                  <p className="text-xs text-gray-500">اعثر على المعلم المناسب</p>
                </div>
              </Button>
              <Button variant="outline" className="w-full justify-start gap-3 h-auto py-3">
                <Calendar className="h-5 w-5 text-primary-500" />
                <div className="text-right">
                  <p className="font-medium">حجز درس جديد</p>
                  <p className="text-xs text-gray-500">احجز حصة لأحد أطفالك</p>
                </div>
              </Button>
              <Button variant="outline" className="w-full justify-start gap-3 h-auto py-3">
                <BookOpen className="h-5 w-5 text-primary-500" />
                <div className="text-right">
                  <p className="font-medium">تقارير التقدم</p>
                  <p className="text-xs text-gray-500">تابع تطور أطفالك</p>
                </div>
              </Button>
              <Button variant="outline" className="w-full justify-start gap-3 h-auto py-3">
                <CreditCard className="h-5 w-5 text-primary-500" />
                <div className="text-right">
                  <p className="font-medium">سجل المدفوعات</p>
                  <p className="text-xs text-gray-500">عرض جميع العمليات المالية</p>
                </div>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recommended Teachers */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg">معلمون موصى بهم</CardTitle>
            <Button variant="link" size="sm">
              عرض المزيد
              <ChevronLeft className="h-4 w-4 mr-1" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary-300 dark:hover:border-primary-700 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback>م{i}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h4 className="font-medium">معلم {i}</h4>
                      <p className="text-sm text-gray-500">الرياضيات، الفيزياء</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-sm font-medium">4.{9 - i}</span>
                        <span className="text-xs text-gray-400">(12{i})</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" className="flex-1">
                      حجز
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      عرض
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>

      <AddChildModal isOpen={showAddChild} onClose={() => setShowAddChild(false)} />
    </div>
  );
}
