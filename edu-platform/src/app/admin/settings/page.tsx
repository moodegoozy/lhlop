'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import {
  Settings,
  CreditCard,
  Globe,
  FileText,
  Users,
  Bell,
  Shield,
  Palette,
  Layout,
  Mail,
  MessageSquare,
  Smartphone,
  Database,
  Key,
  Lock,
  Eye,
  EyeOff,
  Plus,
  Edit2,
  Trash2,
  Check,
  X,
  ChevronLeft,
  Save,
  RefreshCw,
  Upload,
  Image,
  Link2,
  ExternalLink,
} from 'lucide-react';

// Types
interface PaymentGateway {
  id: string;
  name: string;
  nameAr: string;
  icon: string;
  isEnabled: boolean;
  testMode: boolean;
  credentials: {
    apiKey?: string;
    secretKey?: string;
    merchantId?: string;
  };
}

interface Page {
  id: string;
  title: string;
  slug: string;
  isPublished: boolean;
  lastUpdated: string;
}

// Mock Data
const mockPaymentGateways: PaymentGateway[] = [
  { id: 'mada', name: 'Mada', nameAr: 'مدى', icon: '💳', isEnabled: true, testMode: false, credentials: { merchantId: 'MER***4532' } },
  { id: 'apple_pay', name: 'Apple Pay', nameAr: 'Apple Pay', icon: '🍎', isEnabled: true, testMode: false, credentials: {} },
  { id: 'stc_pay', name: 'STC Pay', nameAr: 'STC Pay', icon: '📱', isEnabled: true, testMode: true, credentials: { merchantId: 'STC***789' } },
  { id: 'visa', name: 'Visa/Mastercard', nameAr: 'فيزا/ماستركارد', icon: '💳', isEnabled: true, testMode: false, credentials: { apiKey: 'pk_***8765' } },
  { id: 'tabby', name: 'Tabby', nameAr: 'تابي', icon: '🛍️', isEnabled: false, testMode: true, credentials: {} },
  { id: 'tamara', name: 'Tamara', nameAr: 'تمارا', icon: '💰', isEnabled: false, testMode: true, credentials: {} },
];

const mockPages: Page[] = [
  { id: '1', title: 'من نحن', slug: 'about', isPublished: true, lastUpdated: '2024-01-15' },
  { id: '2', title: 'سياسة الخصوصية', slug: 'privacy', isPublished: true, lastUpdated: '2024-01-10' },
  { id: '3', title: 'الشروط والأحكام', slug: 'terms', isPublished: true, lastUpdated: '2024-01-10' },
  { id: '4', title: 'الأسئلة الشائعة', slug: 'faq', isPublished: true, lastUpdated: '2024-01-18' },
  { id: '5', title: 'اتصل بنا', slug: 'contact', isPublished: true, lastUpdated: '2024-01-12' },
  { id: '6', title: 'كيف يعمل الموقع', slug: 'how-it-works', isPublished: false, lastUpdated: '2024-01-05' },
];

const mockJoinPageSettings = {
  student: { enabled: true, requireApproval: false, fields: ['name', 'email', 'phone', 'grade'] },
  teacher: { enabled: true, requireApproval: true, fields: ['name', 'email', 'phone', 'cv', 'subjects', 'experience'] },
  marketer: { enabled: true, requireApproval: true, fields: ['name', 'email', 'phone', 'socialMedia'] },
  employee: { enabled: false, requireApproval: true, fields: ['name', 'email', 'phone', 'position'] },
};

export default function SettingsPage() {
  const [activeTab, setActiveTab] = React.useState('general');
  const [hasChanges, setHasChanges] = React.useState(false);

  const tabs = [
    { id: 'general', label: 'عام', icon: Settings },
    { id: 'payments', label: 'وسائل الدفع', icon: CreditCard },
    { id: 'pages', label: 'الصفحات', icon: FileText },
    { id: 'join', label: 'صفحات الانضمام', icon: Users },
    { id: 'notifications', label: 'الإشعارات', icon: Bell },
    { id: 'security', label: 'الأمان', icon: Shield },
    { id: 'appearance', label: 'المظهر', icon: Palette },
  ];

  return (
    <div className="p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            إعدادات المنصة
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            تخصيص إعدادات وخيارات المنصة
          </p>
        </div>
        {hasChanges && (
          <Button className="shadow-lg">
            <Save className="w-4 h-4 ml-2" />
            حفظ التغييرات
          </Button>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="lg:w-64 shrink-0">
          <div className="bg-white dark:bg-gray-900/50 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
            <div className="p-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      'w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-right',
                      activeTab === tab.id
                        ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    {tab.label}
                    <ChevronLeft className="w-4 h-4 mr-auto" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          {activeTab === 'general' && (
            <div className="space-y-6">
              {/* Site Info */}
              <div className="bg-white dark:bg-gray-900/50 rounded-2xl border border-gray-200 dark:border-gray-800 p-5">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">معلومات الموقع</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      اسم الموقع
                    </label>
                    <input
                      type="text"
                      defaultValue="منصة المعلمين"
                      className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary-500"
                      onChange={() => setHasChanges(true)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      البريد الإلكتروني
                    </label>
                    <input
                      type="email"
                      defaultValue="info@lhlop.com"
                      className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary-500"
                      onChange={() => setHasChanges(true)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      رقم الهاتف
                    </label>
                    <input
                      type="tel"
                      defaultValue="+966 50 123 4567"
                      className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary-500"
                      onChange={() => setHasChanges(true)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      رابط الواتساب
                    </label>
                    <input
                      type="url"
                      defaultValue="https://wa.me/966501234567"
                      className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary-500"
                      onChange={() => setHasChanges(true)}
                    />
                  </div>
                </div>
              </div>

              {/* Logo & Branding */}
              <div className="bg-white dark:bg-gray-900/50 rounded-2xl border border-gray-200 dark:border-gray-800 p-5">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">الشعار والهوية</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      الشعار الرئيسي
                    </label>
                    <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl p-6 text-center">
                      <Image className="w-10 h-10 mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500 mb-2">اسحب الصورة هنا أو</p>
                      <Button variant="outline" size="sm">
                        <Upload className="w-4 h-4 ml-2" />
                        اختر ملف
                      </Button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      أيقونة الموقع (Favicon)
                    </label>
                    <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl p-6 text-center">
                      <Image className="w-10 h-10 mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500 mb-2">32x32 أو 64x64 بكسل</p>
                      <Button variant="outline" size="sm">
                        <Upload className="w-4 h-4 ml-2" />
                        اختر ملف
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* UI Settings */}
              <div className="bg-white dark:bg-gray-900/50 rounded-2xl border border-gray-200 dark:border-gray-800 p-5">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">إعدادات الواجهة</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">عدد العناصر في الصفحة</p>
                      <p className="text-sm text-gray-500">عدد العناصر المعروضة في القوائم والجداول</p>
                    </div>
                    <select className="px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                      <option>10</option>
                      <option>20</option>
                      <option>50</option>
                      <option>100</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">الوضع الليلي الافتراضي</p>
                      <p className="text-sm text-gray-500">تفعيل الوضع الليلي للمستخدمين الجدد</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">إظهار أسعار الخدمات</p>
                      <p className="text-sm text-gray-500">عرض الأسعار للزوار غير المسجلين</p>
                    </div>
                    <Switch checked />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'payments' && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-900/50 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
                <div className="p-4 border-b border-gray-200 dark:border-gray-800">
                  <h3 className="font-semibold text-gray-900 dark:text-white">بوابات الدفع</h3>
                  <p className="text-sm text-gray-500 mt-1">تفعيل وإعداد وسائل الدفع المتاحة</p>
                </div>
                <div className="divide-y divide-gray-100 dark:divide-gray-800">
                  {mockPaymentGateways.map((gateway) => (
                    <div key={gateway.id} className="p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800/50">
                      <div className="flex items-center gap-4">
                        <span className="text-2xl">{gateway.icon}</span>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-gray-900 dark:text-white">{gateway.nameAr}</p>
                            {gateway.testMode && (
                              <Badge className="bg-yellow-100 text-yellow-700">تجريبي</Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-500">{gateway.name}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Button variant="outline" size="sm">
                          <Settings className="w-4 h-4 ml-2" />
                          إعداد
                        </Button>
                        <Switch checked={gateway.isEnabled} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Commission Settings */}
              <div className="bg-white dark:bg-gray-900/50 rounded-2xl border border-gray-200 dark:border-gray-800 p-5">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">إعدادات العمولة</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      نسبة عمولة المنصة (%)
                    </label>
                    <input
                      type="number"
                      defaultValue="15"
                      className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      رسوم الصرف المبكر (ر.س)
                    </label>
                    <input
                      type="number"
                      defaultValue="5"
                      className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'pages' && (
            <div className="bg-white dark:bg-gray-900/50 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
              <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">إدارة الصفحات</h3>
                  <p className="text-sm text-gray-500 mt-1">تحرير صفحات الموقع الثابتة</p>
                </div>
                <Button>
                  <Plus className="w-4 h-4 ml-2" />
                  صفحة جديدة
                </Button>
              </div>
              <div className="divide-y divide-gray-100 dark:divide-gray-800">
                {mockPages.map((page) => (
                  <div key={page.id} className="p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <div className="flex items-center gap-4">
                      <FileText className="w-5 h-5 text-gray-400" />
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-gray-900 dark:text-white">{page.title}</p>
                          <Badge className={page.isPublished ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}>
                            {page.isPublished ? 'منشور' : 'مسودة'}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-500">/{page.slug} • آخر تحديث {page.lastUpdated}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-red-500">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'join' && (
            <div className="space-y-6">
              {Object.entries(mockJoinPageSettings).map(([key, settings]) => (
                <div key={key} className="bg-white dark:bg-gray-900/50 rounded-2xl border border-gray-200 dark:border-gray-800 p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white capitalize flex items-center gap-2">
                      <Users className="w-5 h-5 text-primary-500" />
                      {key === 'student' ? 'تسجيل الطلاب' :
                       key === 'teacher' ? 'تسجيل المعلمين' :
                       key === 'marketer' ? 'تسجيل المسوقين' :
                       'تسجيل الموظفين'}
                    </h3>
                    <Switch checked={settings.enabled} />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">يتطلب موافقة الإدارة</span>
                      <Switch checked={settings.requireApproval} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">الحقول المطلوبة:</p>
                      <div className="flex flex-wrap gap-2">
                        {settings.fields.map((field) => (
                          <Badge key={field} className="bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                            {field}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Edit2 className="w-4 h-4 ml-2" />
                      تخصيص النموذج
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="bg-white dark:bg-gray-900/50 rounded-2xl border border-gray-200 dark:border-gray-800 p-5">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">إعدادات الإشعارات</h3>
              <div className="space-y-4">
                {[
                  { id: 'new_booking', label: 'حجز جديد', desc: 'إشعار عند إنشاء حجز جديد' },
                  { id: 'payment', label: 'عمليات الدفع', desc: 'إشعار عند استلام دفعة جديدة' },
                  { id: 'new_user', label: 'مستخدم جديد', desc: 'إشعار عند تسجيل مستخدم جديد' },
                  { id: 'teacher_request', label: 'طلب معلم', desc: 'إشعار عند تقديم معلم جديد' },
                  { id: 'support', label: 'تذاكر الدعم', desc: 'إشعار عند إنشاء تذكرة دعم' },
                  { id: 'cancellation', label: 'إلغاء الحجز', desc: 'إشعار عند إلغاء حجز' },
                ].map((item) => (
                  <div key={item.id} className="flex items-center justify-between py-2">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{item.label}</p>
                      <p className="text-sm text-gray-500">{item.desc}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <Switch checked />
                      </div>
                      <div className="flex items-center gap-2">
                        <Smartphone className="w-4 h-4 text-gray-400" />
                        <Switch checked />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-900/50 rounded-2xl border border-gray-200 dark:border-gray-800 p-5">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">إعدادات الأمان</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">التحقق بخطوتين</p>
                      <p className="text-sm text-gray-500">إلزام المشرفين بالتحقق بخطوتين</p>
                    </div>
                    <Switch checked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">تسجيل الخروج التلقائي</p>
                      <p className="text-sm text-gray-500">بعد 30 دقيقة من عدم النشاط</p>
                    </div>
                    <Switch checked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">قفل الحساب</p>
                      <p className="text-sm text-gray-500">بعد 5 محاولات دخول فاشلة</p>
                    </div>
                    <Switch checked />
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-900/50 rounded-2xl border border-gray-200 dark:border-gray-800 p-5">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">مفاتيح API</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <div className="flex items-center gap-3">
                      <Key className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">مفتاح الإنتاج</p>
                        <p className="text-sm text-gray-500 font-mono">pk_live_***************</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <RefreshCw className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <div className="flex items-center gap-3">
                      <Key className="w-5 h-5 text-yellow-500" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">مفتاح الاختبار</p>
                        <p className="text-sm text-gray-500 font-mono">pk_test_***************</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <RefreshCw className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-900/50 rounded-2xl border border-gray-200 dark:border-gray-800 p-5">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">الألوان الرئيسية</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { name: 'اللون الأساسي', color: '#6366f1' },
                    { name: 'اللون الثانوي', color: '#8b5cf6' },
                    { name: 'لون النجاح', color: '#22c55e' },
                    { name: 'لون التحذير', color: '#f59e0b' },
                  ].map((item) => (
                    <div key={item.name}>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {item.name}
                      </label>
                      <div className="flex items-center gap-2">
                        <div
                          className="w-10 h-10 rounded-lg border border-gray-200 dark:border-gray-700"
                          style={{ backgroundColor: item.color }}
                        />
                        <input
                          type="text"
                          defaultValue={item.color}
                          className="flex-1 px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 text-sm font-mono"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-gray-900/50 rounded-2xl border border-gray-200 dark:border-gray-800 p-5">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">الخطوط</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      خط العناوين
                    </label>
                    <select className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                      <option>Cairo</option>
                      <option>Tajawal</option>
                      <option>IBM Plex Arabic</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      خط النصوص
                    </label>
                    <select className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                      <option>Cairo</option>
                      <option>Tajawal</option>
                      <option>IBM Plex Arabic</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
