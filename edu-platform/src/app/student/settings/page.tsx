'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { DashboardShell, PageTitle, ContentCard } from '@/components/dashboard';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  Bell, 
  Moon, 
  Sun, 
  Globe, 
  Lock, 
  Shield, 
  Smartphone,
  Mail,
  LogOut,
  Trash2,
  ChevronLeft,
  Eye,
  EyeOff,
  Key,
  AlertTriangle,
  Check,
  X
} from 'lucide-react';

export default function SettingsPage() {
  const [notifications, setNotifications] = React.useState({
    email: true,
    push: true,
    sms: false,
    marketing: false,
  });
  const [darkMode, setDarkMode] = React.useState(false);
  const [language, setLanguage] = React.useState('ar');
  const [showPasswordModal, setShowPasswordModal] = React.useState(false);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <DashboardShell>
      <PageTitle
        title="الإعدادات"
        description="إدارة حسابك وتفضيلاتك"
      />

      <div className="space-y-6 max-w-3xl">
        {/* Notifications */}
        <ContentCard>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
              <Bell className="w-5 h-5 text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white">الإشعارات</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">تحكم في طريقة استلام الإشعارات</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white text-sm">إشعارات البريد الإلكتروني</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">استلم التحديثات عبر البريد</p>
                </div>
              </div>
              <Switch
                checked={notifications.email}
                onCheckedChange={(checked) =>
                  setNotifications((prev) => ({ ...prev, email: checked }))
                }
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
              <div className="flex items-center gap-3">
                <Smartphone className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white text-sm">إشعارات التطبيق</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">إشعارات فورية على جهازك</p>
                </div>
              </div>
              <Switch
                checked={notifications.push}
                onCheckedChange={(checked) =>
                  setNotifications((prev) => ({ ...prev, push: checked }))
                }
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
              <div className="flex items-center gap-3">
                <Smartphone className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white text-sm">رسائل SMS</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">تلقي رسائل نصية للتذكيرات</p>
                </div>
              </div>
              <Switch
                checked={notifications.sms}
                onCheckedChange={(checked) =>
                  setNotifications((prev) => ({ ...prev, sms: checked }))
                }
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white text-sm">العروض والتحديثات</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">استلم أحدث العروض والأخبار</p>
                </div>
              </div>
              <Switch
                checked={notifications.marketing}
                onCheckedChange={(checked) =>
                  setNotifications((prev) => ({ ...prev, marketing: checked }))
                }
              />
            </div>
          </div>
        </ContentCard>

        {/* Appearance */}
        <ContentCard>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <Moon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white">المظهر</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">تخصيص مظهر التطبيق</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
              <div className="flex items-center gap-3">
                {darkMode ? <Moon className="w-5 h-5 text-gray-400" /> : <Sun className="w-5 h-5 text-gray-400" />}
                <div>
                  <p className="font-medium text-gray-900 dark:text-white text-sm">الوضع الداكن</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">تفعيل المظهر الداكن</p>
                </div>
              </div>
              <Switch checked={darkMode} onCheckedChange={setDarkMode} />
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
              <div className="flex items-center gap-3 mb-3">
                <Globe className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white text-sm">اللغة</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">اختر لغة التطبيق</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setLanguage('ar')}
                  className={cn(
                    'flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-all',
                    language === 'ar'
                      ? 'bg-primary-500 text-white'
                      : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600'
                  )}
                >
                  العربية
                </button>
                <button
                  onClick={() => setLanguage('en')}
                  className={cn(
                    'flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-all',
                    language === 'en'
                      ? 'bg-primary-500 text-white'
                      : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600'
                  )}
                >
                  English
                </button>
              </div>
            </div>
          </div>
        </ContentCard>

        {/* Security */}
        <ContentCard>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <Shield className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white">الأمان</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">حماية حسابك</p>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => setShowPasswordModal(true)}
              className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Lock className="w-5 h-5 text-gray-400" />
                <div className="text-right">
                  <p className="font-medium text-gray-900 dark:text-white text-sm">تغيير كلمة المرور</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">آخر تحديث منذ 3 أشهر</p>
                </div>
              </div>
              <ChevronLeft className="w-5 h-5 text-gray-400" />
            </button>

            <button className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <div className="flex items-center gap-3">
                <Key className="w-5 h-5 text-gray-400" />
                <div className="text-right">
                  <p className="font-medium text-gray-900 dark:text-white text-sm">التحقق بخطوتين</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">غير مفعل</p>
                </div>
              </div>
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
                غير مفعل
              </Badge>
            </button>

            <button className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <div className="flex items-center gap-3">
                <Smartphone className="w-5 h-5 text-gray-400" />
                <div className="text-right">
                  <p className="font-medium text-gray-900 dark:text-white text-sm">الأجهزة المتصلة</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">جهازين نشطين</p>
                </div>
              </div>
              <ChevronLeft className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </ContentCard>

        {/* Danger Zone */}
        <ContentCard className="border-red-200 dark:border-red-900/50">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white">منطقة الخطر</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">إجراءات لا يمكن التراجع عنها</p>
            </div>
          </div>

          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors group">
              <div className="flex items-center gap-3">
                <LogOut className="w-5 h-5 text-gray-400 group-hover:text-red-500" />
                <div className="text-right">
                  <p className="font-medium text-gray-900 dark:text-white text-sm group-hover:text-red-500">
                    تسجيل الخروج من جميع الأجهزة
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    سيتم تسجيل خروجك من جميع الأجهزة
                  </p>
                </div>
              </div>
              <ChevronLeft className="w-5 h-5 text-gray-400" />
            </button>

            <button
              onClick={() => setShowDeleteModal(true)}
              className="w-full flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/20 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Trash2 className="w-5 h-5 text-red-500" />
                <div className="text-right">
                  <p className="font-medium text-red-600 dark:text-red-400 text-sm">حذف الحساب</p>
                  <p className="text-xs text-red-500/70 dark:text-red-400/70">
                    سيتم حذف جميع بياناتك نهائياً
                  </p>
                </div>
              </div>
              <ChevronLeft className="w-5 h-5 text-red-400" />
            </button>
          </div>
        </ContentCard>
      </div>

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowPasswordModal(false)}
          />
          <div className="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-2xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  تغيير كلمة المرور
                </h3>
                <button
                  onClick={() => setShowPasswordModal(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    كلمة المرور الحالية
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-xl text-sm border-0 focus:ring-2 focus:ring-primary-500 pl-12"
                    />
                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    كلمة المرور الجديدة
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-xl text-sm border-0 focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    تأكيد كلمة المرور الجديدة
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-xl text-sm border-0 focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowPasswordModal(false)}
                  className="flex-1 px-4 py-3 text-gray-700 dark:text-gray-300 font-medium rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  إلغاء
                </button>
                <button className="flex-1 px-4 py-3 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-xl transition-colors">
                  حفظ التغييرات
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowDeleteModal(false)}
          />
          <div className="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-2xl">
            <div className="p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                هل أنت متأكد من حذف حسابك؟
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                سيتم حذف جميع بياناتك بشكل نهائي ولا يمكن استردادها. يشمل ذلك:
              </p>
              <ul className="text-sm text-gray-600 dark:text-gray-300 text-right space-y-2 mb-6">
                <li className="flex items-center gap-2">
                  <X className="w-4 h-4 text-red-500 shrink-0" />
                  جميع الحجوزات والدروس
                </li>
                <li className="flex items-center gap-2">
                  <X className="w-4 h-4 text-red-500 shrink-0" />
                  رصيد المحفظة
                </li>
                <li className="flex items-center gap-2">
                  <X className="w-4 h-4 text-red-500 shrink-0" />
                  الإنجازات والتقدم
                </li>
                <li className="flex items-center gap-2">
                  <X className="w-4 h-4 text-red-500 shrink-0" />
                  المحادثات والرسائل
                </li>
              </ul>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 text-right">
                  اكتب "حذف حسابي" للتأكيد
                </label>
                <input
                  type="text"
                  placeholder="حذف حسابي"
                  className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-xl text-sm border-0 focus:ring-2 focus:ring-red-500 text-center"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 px-4 py-3 text-gray-700 dark:text-gray-300 font-medium rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  إلغاء
                </button>
                <button className="flex-1 px-4 py-3 bg-red-500 hover:bg-red-600 text-white font-medium rounded-xl transition-colors">
                  حذف الحساب
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}
