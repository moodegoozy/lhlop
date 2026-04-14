'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { StatsCard } from '@/components/cards/stats-card';
import { t } from '@/lib/translations';
import { 
  Users, 
  GraduationCap, 
  Calendar, 
  DollarSign,
  Search,
  Filter,
  MoreVertical,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  TrendingDown,
  Eye,
  Ban,
  UserCheck,
  AlertTriangle,
  Settings,
  FileText,
  Bell,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Types
interface PendingTeacher {
  id: string;
  name: string;
  email: string;
  phone: string;
  subjects: string[];
  experience_years: number;
  submitted_at: string;
  documents_count: number;
  avatar_url: string | null;
}

interface RecentBooking {
  id: string;
  teacher_name: string;
  student_name: string;
  subject: string;
  date: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  amount: number;
}

interface SystemAlert {
  id: string;
  type: 'warning' | 'error' | 'info';
  message: string;
  created_at: string;
}

// Mock data
const mockStats = {
  total_users: 5420,
  total_teachers: 342,
  total_students: 4850,
  total_parents: 228,
  active_bookings: 156,
  pending_approvals: 23,
  monthly_revenue: 125000,
  revenue_change: 12.5,
  new_users_today: 48,
  new_users_change: 8.3,
};

const mockPendingTeachers: PendingTeacher[] = [
  {
    id: '1',
    name: 'أحمد محمد الغامدي',
    email: 'ahmed.g@email.com',
    phone: '+966 50 123 4567',
    subjects: ['الرياضيات', 'الفيزياء'],
    experience_years: 8,
    submitted_at: '2024-01-15',
    documents_count: 4,
    avatar_url: null,
  },
  {
    id: '2',
    name: 'فاطمة علي السعيد',
    email: 'fatima.s@email.com',
    phone: '+966 55 987 6543',
    subjects: ['اللغة العربية', 'الأدب'],
    experience_years: 12,
    submitted_at: '2024-01-14',
    documents_count: 5,
    avatar_url: null,
  },
  {
    id: '3',
    name: 'خالد عبدالله النعيمي',
    email: 'khaled.n@email.com',
    phone: '+966 54 555 1234',
    subjects: ['الكيمياء'],
    experience_years: 5,
    submitted_at: '2024-01-13',
    documents_count: 3,
    avatar_url: null,
  },
];

const mockRecentBookings: RecentBooking[] = [
  {
    id: 'B001',
    teacher_name: 'محمد الأحمد',
    student_name: 'سارة العلي',
    subject: 'الرياضيات',
    date: '2024-01-20',
    status: 'confirmed',
    amount: 150,
  },
  {
    id: 'B002',
    teacher_name: 'نورة الخالد',
    student_name: 'عمر السعيد',
    subject: 'اللغة الإنجليزية',
    date: '2024-01-20',
    status: 'pending',
    amount: 120,
  },
  {
    id: 'B003',
    teacher_name: 'سلطان الفهد',
    student_name: 'ليان محمد',
    subject: 'الفيزياء',
    date: '2024-01-19',
    status: 'cancelled',
    amount: 180,
  },
];

const mockAlerts: SystemAlert[] = [
  {
    id: '1',
    type: 'warning',
    message: 'هناك 5 معلمين بتقييمات منخفضة تحتاج مراجعة',
    created_at: '2024-01-16 10:30',
  },
  {
    id: '2',
    type: 'error',
    message: 'فشل في معالجة 3 عمليات دفع',
    created_at: '2024-01-16 09:15',
  },
  {
    id: '3',
    type: 'info',
    message: 'تحديث النظام المجدول غداً الساعة 3 صباحاً',
    created_at: '2024-01-15 18:00',
  },
];

export function AdminDashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState<'overview' | 'teachers' | 'bookings' | 'users'>('overview');

  const handleApproveTeacher = (id: string) => {
    console.log('Approve teacher:', id);
    // API call
  };

  const handleRejectTeacher = (id: string) => {
    console.log('Reject teacher:', id);
    // API call
  };

  const handleViewTeacher = (id: string) => {
    console.log('View teacher:', id);
    // Navigate to teacher details
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                لوحة تحكم المدير
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                مرحباً بك، إدارة المنصة
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center">
                  {mockAlerts.length}
                </span>
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mt-4 -mb-px overflow-x-auto">
            {[
              { id: 'overview', label: 'نظرة عامة' },
              { id: 'teachers', label: 'المعلمون' },
              { id: 'bookings', label: 'الحجوزات' },
              { id: 'users', label: 'المستخدمون' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as typeof selectedTab)}
                className={cn(
                  'px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap',
                  selectedTab === tab.id
                    ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400'
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="إجمالي المستخدمين"
            value={mockStats.total_users.toLocaleString('ar-SA')}
            icon={<Users className="h-5 w-5" />}
            trend={{ value: mockStats.new_users_change, isPositive: true }}
            description={`${mockStats.new_users_today} مستخدم جديد اليوم`}
          />
          <StatsCard
            title="المعلمون النشطون"
            value={mockStats.total_teachers.toLocaleString('ar-SA')}
            icon={<GraduationCap className="h-5 w-5" />}
            trend={{ value: 5.2, isPositive: true }}
          />
          <StatsCard
            title="الحجوزات النشطة"
            value={mockStats.active_bookings.toLocaleString('ar-SA')}
            icon={<Calendar className="h-5 w-5" />}
            trend={{ value: 3.1, isPositive: true }}
          />
          <StatsCard
            title="الإيرادات الشهرية"
            value={`${(mockStats.monthly_revenue / 1000).toFixed(0)}K ر.س`}
            icon={<DollarSign className="h-5 w-5" />}
            trend={{ value: mockStats.revenue_change, isPositive: true }}
          />
        </div>

        {/* Alerts */}
        {mockAlerts.length > 0 && (
          <Card className="border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20 dark:border-yellow-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                تنبيهات النظام
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {mockAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={cn(
                      'flex items-start gap-3 p-3 rounded-lg',
                      alert.type === 'error' && 'bg-red-100 dark:bg-red-900/30',
                      alert.type === 'warning' && 'bg-yellow-100 dark:bg-yellow-900/30',
                      alert.type === 'info' && 'bg-blue-100 dark:bg-blue-900/30'
                    )}
                  >
                    <div className="flex-1">
                      <p className="text-sm text-gray-800 dark:text-gray-200">
                        {alert.message}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{alert.created_at}</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      عرض
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Pending Teacher Approvals */}
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg">
                طلبات انضمام المعلمين
                <Badge variant="secondary" className="mr-2">
                  {mockStats.pending_approvals}
                </Badge>
              </CardTitle>
              <Button variant="outline" size="sm">
                عرض الكل
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockPendingTeachers.map((teacher) => (
                  <div
                    key={teacher.id}
                    className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  >
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={teacher.avatar_url || undefined} />
                      <AvatarFallback>{teacher.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">
                            {teacher.name}
                          </h4>
                          <p className="text-sm text-gray-500">{teacher.email}</p>
                        </div>
                        <Badge variant="outline" className="shrink-0">
                          {teacher.documents_count} مستندات
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {teacher.subjects.map((subject) => (
                          <Badge key={subject} variant="secondary" className="text-xs">
                            {subject}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        خبرة {teacher.experience_years} سنوات • تقدم في{' '}
                        {new Date(teacher.submitted_at).toLocaleDateString('ar-SA')}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleViewTeacher(teacher.id)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-green-600 hover:text-green-700 hover:bg-green-50"
                        onClick={() => handleApproveTeacher(teacher.id)}
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleRejectTeacher(teacher.id)}
                      >
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">إحصائيات سريعة</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <Users className="h-4 w-4 text-blue-600" />
                  </div>
                  <span className="text-sm">الطلاب</span>
                </div>
                <span className="font-semibold">
                  {mockStats.total_students.toLocaleString('ar-SA')}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                    <Users className="h-4 w-4 text-purple-600" />
                  </div>
                  <span className="text-sm">أولياء الأمور</span>
                </div>
                <span className="font-semibold">
                  {mockStats.total_parents.toLocaleString('ar-SA')}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                    <Clock className="h-4 w-4 text-yellow-600" />
                  </div>
                  <span className="text-sm">بانتظار الموافقة</span>
                </div>
                <span className="font-semibold">
                  {mockStats.pending_approvals}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-sm">نمو هذا الشهر</span>
                </div>
                <span className="font-semibold text-green-600">+{mockStats.revenue_change}%</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Bookings */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg">آخر الحجوزات</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="بحث..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-9 w-48"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">
                      رقم الحجز
                    </th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">
                      المعلم
                    </th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">
                      الطالب
                    </th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">
                      المادة
                    </th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">
                      التاريخ
                    </th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">
                      الحالة
                    </th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">
                      المبلغ
                    </th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">
                      إجراءات
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {mockRecentBookings.map((booking) => (
                    <tr
                      key={booking.id}
                      className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                    >
                      <td className="py-3 px-4 text-sm font-mono">{booking.id}</td>
                      <td className="py-3 px-4 text-sm">{booking.teacher_name}</td>
                      <td className="py-3 px-4 text-sm">{booking.student_name}</td>
                      <td className="py-3 px-4 text-sm">{booking.subject}</td>
                      <td className="py-3 px-4 text-sm">
                        {new Date(booking.date).toLocaleDateString('ar-SA')}
                      </td>
                      <td className="py-3 px-4">
                        <Badge
                          variant={
                            booking.status === 'confirmed'
                              ? 'default'
                              : booking.status === 'pending'
                              ? 'secondary'
                              : 'error'
                          }
                        >
                          {booking.status === 'confirmed'
                            ? 'مؤكد'
                            : booking.status === 'pending'
                            ? 'معلق'
                            : 'ملغي'}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-sm font-medium">
                        {booking.amount} ر.س
                      </td>
                      <td className="py-3 px-4">
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-500">عرض 1-3 من 156 حجز</p>
              <div className="flex items-center gap-1">
                <Button variant="outline" size="icon" disabled>
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">1</Button>
                <Button variant="ghost" size="sm">2</Button>
                <Button variant="ghost" size="sm">3</Button>
                <span className="px-2 text-gray-400">...</span>
                <Button variant="ghost" size="sm">52</Button>
                <Button variant="outline" size="icon">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
