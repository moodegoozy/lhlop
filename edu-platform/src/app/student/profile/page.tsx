'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { DashboardShell, PageTitle, ContentCard } from '@/components/dashboard';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Camera,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit2,
  Save,
  X,
  Check,
  Shield,
  Bell,
  Globe,
} from 'lucide-react';

// Mock user data
const mockUser = {
  id: 'user1',
  name: 'أحمد محمد',
  email: 'ahmed@email.com',
  phone: '+966 50 123 4567',
  location: 'الرياض، المملكة العربية السعودية',
  joinDate: '2024-01-15',
  avatar: '',
  bio: 'طالب في المرحلة الثانوية، مهتم بالرياضيات والعلوم',
  isVerified: true,
  stats: {
    totalLessons: 42,
    totalHours: 63,
    averageRating: 4.8,
  },
  preferences: {
    notifications: true,
    emailUpdates: true,
    language: 'ar',
  },
};

export default function ProfilePage() {
  const [isEditing, setIsEditing] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: mockUser.name,
    email: mockUser.email,
    phone: mockUser.phone,
    location: mockUser.location,
    bio: mockUser.bio,
  });

  const handleSave = () => {
    // Save logic here
    setIsEditing(false);
  };

  return (
    <DashboardShell>
      <PageTitle
        title="الملف الشخصي"
        description="إدارة معلوماتك الشخصية"
        actions={
          isEditing ? (
            <div className="flex gap-2">
              <Button variant="secondary" onClick={() => setIsEditing(false)}>
                <X className="w-4 h-4 ml-2" />
                إلغاء
              </Button>
              <Button onClick={handleSave}>
                <Save className="w-4 h-4 ml-2" />
                حفظ التغييرات
              </Button>
            </div>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              <Edit2 className="w-4 h-4 ml-2" />
              تعديل
            </Button>
          )
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <ContentCard className="lg:col-span-1">
          <div className="flex flex-col items-center text-center">
            {/* Avatar */}
            <div className="relative mb-4">
              <Avatar className="w-24 h-24 ring-4 ring-primary-100 dark:ring-primary-900">
                <AvatarImage src={mockUser.avatar} />
                <AvatarFallback className="bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 text-2xl font-bold">
                  {mockUser.name.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              {isEditing && (
                <button className="absolute bottom-0 left-0 w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-primary-600 transition-colors">
                  <Camera className="w-4 h-4" />
                </button>
              )}
              {mockUser.isVerified && (
                <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-green-500 rounded-full flex items-center justify-center ring-2 ring-white dark:ring-gray-900">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
            </div>

            {/* Name & Badge */}
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
              {mockUser.name}
            </h2>
            <Badge variant="secondary" className="bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400">
              طالب موثق
            </Badge>

            {/* Bio */}
            {isEditing ? (
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className={cn(
                  'w-full mt-4 p-3 rounded-xl text-sm text-center',
                  'bg-gray-100 dark:bg-gray-800 border-0',
                  'focus:outline-none focus:ring-2 focus:ring-primary-500/20',
                  'resize-none'
                )}
                rows={3}
                placeholder="اكتب نبذة عنك..."
              />
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                {mockUser.bio}
              </p>
            )}

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 w-full mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {mockUser.stats.totalLessons}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">حصة</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {mockUser.stats.totalHours}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">ساعة</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {mockUser.stats.averageRating}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">تقييم</p>
              </div>
            </div>
          </div>
        </ContentCard>

        {/* Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <ContentCard title="المعلومات الشخصية">
            <div className="space-y-4">
              {/* Name */}
              <div className="flex items-center gap-4 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/30">
                <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  <Edit2 className="w-5 h-5 text-gray-500" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">الاسم الكامل</p>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={cn(
                        'w-full p-0 bg-transparent border-0',
                        'text-gray-900 dark:text-white font-medium',
                        'focus:outline-none focus:ring-0'
                      )}
                    />
                  ) : (
                    <p className="font-medium text-gray-900 dark:text-white">{mockUser.name}</p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-4 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/30">
                <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">البريد الإلكتروني</p>
                  {isEditing ? (
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={cn(
                        'w-full p-0 bg-transparent border-0',
                        'text-gray-900 dark:text-white font-medium',
                        'focus:outline-none focus:ring-0'
                      )}
                    />
                  ) : (
                    <p className="font-medium text-gray-900 dark:text-white">{mockUser.email}</p>
                  )}
                </div>
                {mockUser.isVerified && (
                  <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                    <Check className="w-3 h-3 ml-1" />
                    موثق
                  </Badge>
                )}
              </div>

              {/* Phone */}
              <div className="flex items-center gap-4 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/30">
                <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">رقم الجوال</p>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={cn(
                        'w-full p-0 bg-transparent border-0',
                        'text-gray-900 dark:text-white font-medium',
                        'focus:outline-none focus:ring-0',
                        'text-left dir-ltr'
                      )}
                      dir="ltr"
                    />
                  ) : (
                    <p className="font-medium text-gray-900 dark:text-white" dir="ltr">
                      {mockUser.phone}
                    </p>
                  )}
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-4 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/30">
                <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">الموقع</p>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className={cn(
                        'w-full p-0 bg-transparent border-0',
                        'text-gray-900 dark:text-white font-medium',
                        'focus:outline-none focus:ring-0'
                      )}
                    />
                  ) : (
                    <p className="font-medium text-gray-900 dark:text-white">{mockUser.location}</p>
                  )}
                </div>
              </div>

              {/* Join Date */}
              <div className="flex items-center gap-4 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/30">
                <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">تاريخ الانضمام</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {new Date(mockUser.joinDate).toLocaleDateString('ar-SA', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            </div>
          </ContentCard>

          {/* Preferences */}
          <ContentCard title="التفضيلات">
            <div className="space-y-4">
              {/* Notifications */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                    <Bell className="w-5 h-5 text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">الإشعارات</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">استقبال إشعارات التطبيق</p>
                  </div>
                </div>
                <button
                  className={cn(
                    'relative w-12 h-6 rounded-full transition-colors',
                    mockUser.preferences.notifications
                      ? 'bg-primary-500'
                      : 'bg-gray-300 dark:bg-gray-700'
                  )}
                >
                  <span
                    className={cn(
                      'absolute top-1 w-4 h-4 bg-white rounded-full transition-transform shadow',
                      mockUser.preferences.notifications ? 'right-1' : 'left-1'
                    )}
                  />
                </button>
              </div>

              {/* Email Updates */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">تحديثات البريد</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">استقبال رسائل إخبارية</p>
                  </div>
                </div>
                <button
                  className={cn(
                    'relative w-12 h-6 rounded-full transition-colors',
                    mockUser.preferences.emailUpdates
                      ? 'bg-primary-500'
                      : 'bg-gray-300 dark:bg-gray-700'
                  )}
                >
                  <span
                    className={cn(
                      'absolute top-1 w-4 h-4 bg-white rounded-full transition-transform shadow',
                      mockUser.preferences.emailUpdates ? 'right-1' : 'left-1'
                    )}
                  />
                </button>
              </div>

              {/* Language */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <Globe className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">اللغة</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">لغة واجهة التطبيق</p>
                  </div>
                </div>
                <select
                  value={mockUser.preferences.language}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-sm',
                    'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700',
                    'focus:outline-none focus:ring-2 focus:ring-primary-500/20'
                  )}
                >
                  <option value="ar">العربية</option>
                  <option value="en">English</option>
                </select>
              </div>
            </div>
          </ContentCard>
        </div>
      </div>
    </DashboardShell>
  );
}
