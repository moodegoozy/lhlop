'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { DashboardShell, PageTitle, ContentCard, EmptyState } from '@/components/dashboard';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Plus,
  Edit2,
  Trash2,
  UserCircle,
  GraduationCap,
  Calendar,
  Check,
  X,
  Users,
  ArrowLeft,
} from 'lucide-react';
import { useDashboardStore } from '@/store/dashboard.store';

// Mock children data
const mockChildren = [
  {
    id: 'child1',
    name: 'سارة أحمد',
    avatar: '',
    grade: 'الصف الثالث الابتدائي',
    age: 9,
    subjects: ['الرياضيات', 'اللغة العربية'],
    lessonsCount: 15,
    isActive: true,
  },
  {
    id: 'child2',
    name: 'محمد أحمد',
    avatar: '',
    grade: 'الصف الأول المتوسط',
    age: 12,
    subjects: ['الرياضيات', 'العلوم', 'اللغة الإنجليزية'],
    lessonsCount: 23,
    isActive: false,
  },
];

export default function ChildrenPage() {
  const { activeChildId, setActiveChild } = useDashboardStore();
  const [showAddModal, setShowAddModal] = React.useState(false);
  const [editingChild, setEditingChild] = React.useState<string | null>(null);
  const [newChild, setNewChild] = React.useState({
    name: '',
    grade: '',
    age: '',
  });

  const handleAddChild = () => {
    // Add child logic
    setShowAddModal(false);
    setNewChild({ name: '', grade: '', age: '' });
  };

  return (
    <DashboardShell>
      <PageTitle
        title="الملفات الفرعية"
        description="إدارة حسابات الأطفال المرتبطة بحسابك"
        actions={
          <Button onClick={() => setShowAddModal(true)}>
            <Plus className="w-4 h-4 ml-2" />
            إضافة طفل
          </Button>
        }
      />

      {/* Quick Switch */}
      <ContentCard className="mb-6 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/10 border-primary-200 dark:border-primary-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary-500 flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                التبديل السريع بين الحسابات
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                اختر الحساب الذي تريد إدارته
              </p>
            </div>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
            {/* Parent Account */}
            <button
              onClick={() => setActiveChild(null)}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-xl shrink-0 transition-all',
                !activeChildId
                  ? 'bg-primary-500 text-white shadow-lg'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              )}
            >
              <Avatar className="w-6 h-6">
                <AvatarFallback className="bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 text-xs">
                  أح
                </AvatarFallback>
              </Avatar>
              <span className="font-medium text-sm">حسابي</span>
            </button>

            {/* Children Accounts */}
            {mockChildren.map((child) => (
              <button
                key={child.id}
                onClick={() => setActiveChild(child.id)}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-xl shrink-0 transition-all',
                  activeChildId === child.id
                    ? 'bg-primary-500 text-white shadow-lg'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                )}
              >
                <Avatar className="w-6 h-6">
                  <AvatarFallback className="bg-pink-100 dark:bg-pink-900 text-pink-600 dark:text-pink-400 text-xs">
                    {child.name.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <span className="font-medium text-sm">{child.name}</span>
              </button>
            ))}
          </div>
        </div>
      </ContentCard>

      {/* Children List */}
      {mockChildren.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockChildren.map((child) => (
            <ContentCard
              key={child.id}
              className={cn(
                'relative overflow-hidden transition-all',
                activeChildId === child.id && 'ring-2 ring-primary-500'
              )}
            >
              {/* Active Badge */}
              {activeChildId === child.id && (
                <div className="absolute top-3 left-3">
                  <Badge className="bg-primary-500 text-white">
                    <Check className="w-3 h-3 ml-1" />
                    نشط
                  </Badge>
                </div>
              )}

              {/* Profile */}
              <div className="flex flex-col items-center text-center mb-4">
                <Avatar className="w-20 h-20 mb-3 ring-4 ring-gray-100 dark:ring-gray-800">
                  <AvatarImage src={child.avatar} />
                  <AvatarFallback className="bg-gradient-to-br from-pink-400 to-purple-500 text-white text-2xl font-bold">
                    {child.name.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  {child.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {child.age} سنوات
                </p>
              </div>

              {/* Details */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-3 p-2 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                  <GraduationCap className="w-5 h-5 text-primary-500" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{child.grade}</span>
                </div>
                <div className="flex items-center gap-3 p-2 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                  <Calendar className="w-5 h-5 text-blue-500" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {child.lessonsCount} حصة مكتملة
                  </span>
                </div>
              </div>

              {/* Subjects */}
              <div className="flex flex-wrap gap-1 mb-4">
                {child.subjects.map((subject) => (
                  <Badge key={subject} variant="secondary" className="text-xs">
                    {subject}
                  </Badge>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  className="flex-1"
                  onClick={() => setActiveChild(child.id)}
                >
                  {activeChildId === child.id ? 'نشط' : 'تبديل'}
                </Button>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => setEditingChild(child.id)}
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon-sm" className="text-red-500 hover:text-red-600">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </ContentCard>
          ))}

          {/* Add New Child Card */}
          <button
            onClick={() => setShowAddModal(true)}
            className={cn(
              'flex flex-col items-center justify-center gap-3 p-6 rounded-2xl',
              'border-2 border-dashed border-gray-300 dark:border-gray-700',
              'hover:border-primary-500 hover:bg-primary-50/50 dark:hover:bg-primary-900/10',
              'transition-all duration-200',
              'min-h-[300px]'
            )}
          >
            <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <Plus className="w-8 h-8 text-gray-400" />
            </div>
            <span className="font-medium text-gray-500 dark:text-gray-400">إضافة طفل جديد</span>
          </button>
        </div>
      ) : (
        <EmptyState
          icon={<Users className="w-12 h-12 text-gray-300 dark:text-gray-700" />}
          title="لا توجد ملفات فرعية"
          description="أضف ملفات أطفالك لتتمكن من إدارة حصصهم بسهولة"
          action={
            <Button onClick={() => setShowAddModal(true)}>
              <Plus className="w-4 h-4 ml-2" />
              إضافة طفل
            </Button>
          }
        />
      )}

      {/* Add Child Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowAddModal(false)}
          />
          <div className="relative bg-white dark:bg-gray-900 rounded-3xl w-full max-w-md p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              إضافة طفل جديد
            </h2>

            <div className="space-y-4">
              {/* Avatar Upload */}
              <div className="flex justify-center">
                <div className="relative">
                  <Avatar className="w-20 h-20 ring-4 ring-gray-100 dark:ring-gray-800">
                    <AvatarFallback className="bg-gray-200 dark:bg-gray-700">
                      <UserCircle className="w-10 h-10 text-gray-400" />
                    </AvatarFallback>
                  </Avatar>
                  <button className="absolute bottom-0 left-0 w-7 h-7 bg-primary-500 rounded-full flex items-center justify-center text-white shadow-lg">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  اسم الطفل
                </label>
                <input
                  type="text"
                  value={newChild.name}
                  onChange={(e) => setNewChild({ ...newChild, name: e.target.value })}
                  placeholder="أدخل اسم الطفل"
                  className={cn(
                    'w-full h-11 px-4 rounded-xl',
                    'bg-gray-100 dark:bg-gray-800 border-0',
                    'text-gray-900 dark:text-white placeholder:text-gray-400',
                    'focus:outline-none focus:ring-2 focus:ring-primary-500'
                  )}
                />
              </div>

              {/* Grade */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  الصف الدراسي
                </label>
                <select
                  value={newChild.grade}
                  onChange={(e) => setNewChild({ ...newChild, grade: e.target.value })}
                  className={cn(
                    'w-full h-11 px-4 rounded-xl',
                    'bg-gray-100 dark:bg-gray-800 border-0',
                    'text-gray-900 dark:text-white',
                    'focus:outline-none focus:ring-2 focus:ring-primary-500'
                  )}
                >
                  <option value="">اختر الصف</option>
                  <option value="الصف الأول الابتدائي">الصف الأول الابتدائي</option>
                  <option value="الصف الثاني الابتدائي">الصف الثاني الابتدائي</option>
                  <option value="الصف الثالث الابتدائي">الصف الثالث الابتدائي</option>
                  <option value="الصف الرابع الابتدائي">الصف الرابع الابتدائي</option>
                  <option value="الصف الخامس الابتدائي">الصف الخامس الابتدائي</option>
                  <option value="الصف السادس الابتدائي">الصف السادس الابتدائي</option>
                  <option value="الصف الأول المتوسط">الصف الأول المتوسط</option>
                  <option value="الصف الثاني المتوسط">الصف الثاني المتوسط</option>
                  <option value="الصف الثالث المتوسط">الصف الثالث المتوسط</option>
                  <option value="الصف الأول الثانوي">الصف الأول الثانوي</option>
                  <option value="الصف الثاني الثانوي">الصف الثاني الثانوي</option>
                  <option value="الصف الثالث الثانوي">الصف الثالث الثانوي</option>
                </select>
              </div>

              {/* Age */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  العمر
                </label>
                <input
                  type="number"
                  value={newChild.age}
                  onChange={(e) => setNewChild({ ...newChild, age: e.target.value })}
                  placeholder="أدخل عمر الطفل"
                  min="4"
                  max="18"
                  className={cn(
                    'w-full h-11 px-4 rounded-xl',
                    'bg-gray-100 dark:bg-gray-800 border-0',
                    'text-gray-900 dark:text-white placeholder:text-gray-400',
                    'focus:outline-none focus:ring-2 focus:ring-primary-500'
                  )}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-6">
              <Button variant="secondary" className="flex-1" onClick={() => setShowAddModal(false)}>
                إلغاء
              </Button>
              <Button className="flex-1" onClick={handleAddChild}>
                إضافة
              </Button>
            </div>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}
