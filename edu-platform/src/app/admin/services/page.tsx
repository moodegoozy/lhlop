'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  LayoutGrid,
  Plus,
  Search,
  Filter,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  Edit2,
  Trash2,
  GripVertical,
  FolderTree,
  Video,
  Users,
  MapPin,
  PlayCircle,
  MoreVertical,
  Eye,
  EyeOff,
  Copy,
  ArrowUpDown,
  BookOpen,
  Calculator,
  Globe,
  Beaker,
  Languages,
  Palette,
  Music,
  Code,
  TrendingUp,
  Check,
  X,
} from 'lucide-react';

// Types
interface Category {
  id: string;
  name: string;
  nameEn: string;
  icon: string;
  parentId: string | null;
  order: number;
  isActive: boolean;
  servicesCount: number;
  children?: Category[];
}

interface Service {
  id: string;
  name: string;
  categoryId: string;
  categoryName: string;
  type: 'online' | 'offline' | 'recorded' | 'group';
  price: number;
  duration: number;
  isActive: boolean;
  teachersCount: number;
  bookingsCount: number;
  rating: number;
  description: string;
}

// Mock Data
const mockCategories: Category[] = [
  {
    id: 'cat1',
    name: 'الرياضيات',
    nameEn: 'Mathematics',
    icon: '📐',
    parentId: null,
    order: 1,
    isActive: true,
    servicesCount: 24,
    children: [
      { id: 'cat1-1', name: 'الجبر', nameEn: 'Algebra', icon: '➕', parentId: 'cat1', order: 1, isActive: true, servicesCount: 8 },
      { id: 'cat1-2', name: 'الهندسة', nameEn: 'Geometry', icon: '📐', parentId: 'cat1', order: 2, isActive: true, servicesCount: 6 },
      { id: 'cat1-3', name: 'الإحصاء', nameEn: 'Statistics', icon: '📊', parentId: 'cat1', order: 3, isActive: true, servicesCount: 5 },
      { id: 'cat1-4', name: 'التفاضل والتكامل', nameEn: 'Calculus', icon: '∫', parentId: 'cat1', order: 4, isActive: true, servicesCount: 5 },
    ],
  },
  {
    id: 'cat2',
    name: 'العلوم',
    nameEn: 'Sciences',
    icon: '🔬',
    parentId: null,
    order: 2,
    isActive: true,
    servicesCount: 32,
    children: [
      { id: 'cat2-1', name: 'الفيزياء', nameEn: 'Physics', icon: '⚛️', parentId: 'cat2', order: 1, isActive: true, servicesCount: 12 },
      { id: 'cat2-2', name: 'الكيمياء', nameEn: 'Chemistry', icon: '🧪', parentId: 'cat2', order: 2, isActive: true, servicesCount: 10 },
      { id: 'cat2-3', name: 'الأحياء', nameEn: 'Biology', icon: '🧬', parentId: 'cat2', order: 3, isActive: true, servicesCount: 10 },
    ],
  },
  {
    id: 'cat3',
    name: 'اللغات',
    nameEn: 'Languages',
    icon: '🌍',
    parentId: null,
    order: 3,
    isActive: true,
    servicesCount: 28,
    children: [
      { id: 'cat3-1', name: 'اللغة العربية', nameEn: 'Arabic', icon: '🇸🇦', parentId: 'cat3', order: 1, isActive: true, servicesCount: 8 },
      { id: 'cat3-2', name: 'اللغة الإنجليزية', nameEn: 'English', icon: '🇬🇧', parentId: 'cat3', order: 2, isActive: true, servicesCount: 15 },
      { id: 'cat3-3', name: 'اللغة الفرنسية', nameEn: 'French', icon: '🇫🇷', parentId: 'cat3', order: 3, isActive: false, servicesCount: 5 },
    ],
  },
  {
    id: 'cat4',
    name: 'البرمجة',
    nameEn: 'Programming',
    icon: '💻',
    parentId: null,
    order: 4,
    isActive: true,
    servicesCount: 18,
    children: [
      { id: 'cat4-1', name: 'Python', nameEn: 'Python', icon: '🐍', parentId: 'cat4', order: 1, isActive: true, servicesCount: 6 },
      { id: 'cat4-2', name: 'JavaScript', nameEn: 'JavaScript', icon: '⚡', parentId: 'cat4', order: 2, isActive: true, servicesCount: 8 },
      { id: 'cat4-3', name: 'تطوير المواقع', nameEn: 'Web Development', icon: '🌐', parentId: 'cat4', order: 3, isActive: true, servicesCount: 4 },
    ],
  },
];

const mockServices: Service[] = [
  { id: '1', name: 'حصة رياضيات فردية', categoryId: 'cat1', categoryName: 'الرياضيات', type: 'online', price: 150, duration: 60, isActive: true, teachersCount: 12, bookingsCount: 456, rating: 4.8, description: 'حصة فردية مع معلم متخصص' },
  { id: '2', name: 'دورة فيزياء مكثفة', categoryId: 'cat2-1', categoryName: 'الفيزياء', type: 'group', price: 500, duration: 180, isActive: true, teachersCount: 5, bookingsCount: 234, rating: 4.9, description: 'دورة مكثفة لطلاب الثانوية' },
  { id: '3', name: 'تعلم الإنجليزية', categoryId: 'cat3-2', categoryName: 'الإنجليزية', type: 'online', price: 120, duration: 45, isActive: true, teachersCount: 18, bookingsCount: 892, rating: 4.7, description: 'تحسين مهارات المحادثة' },
  { id: '4', name: 'دروس البرمجة للمبتدئين', categoryId: 'cat4-1', categoryName: 'Python', type: 'recorded', price: 299, duration: 0, isActive: true, teachersCount: 4, bookingsCount: 156, rating: 4.6, description: 'دورة مسجلة شاملة' },
  { id: '5', name: 'حصة كيمياء تفاعلية', categoryId: 'cat2-2', categoryName: 'الكيمياء', type: 'online', price: 140, duration: 60, isActive: false, teachersCount: 8, bookingsCount: 312, rating: 4.5, description: 'تجارب عملية افتراضية' },
  { id: '6', name: 'تدريب اختبار قدرات', categoryId: 'cat1', categoryName: 'الرياضيات', type: 'offline', price: 200, duration: 90, isActive: true, teachersCount: 6, bookingsCount: 178, rating: 4.9, description: 'تدريب حضوري مكثف' },
];

const serviceTypeConfig: Record<string, { label: string; icon: typeof Video; color: string }> = {
  online: { label: 'أونلاين', icon: Video, color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
  offline: { label: 'حضوري', icon: MapPin, color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
  recorded: { label: 'مسجل', icon: PlayCircle, color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' },
  group: { label: 'جماعي', icon: Users, color: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' },
};

export default function ServicesPage() {
  const [activeTab, setActiveTab] = React.useState<'categories' | 'services'>('categories');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);
  const [expandedCategories, setExpandedCategories] = React.useState<string[]>(['cat1', 'cat2']);
  const [showAddModal, setShowAddModal] = React.useState(false);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const filteredServices = mockServices.filter(service => {
    const matchesSearch = service.name.includes(searchQuery) || service.categoryName.includes(searchQuery);
    const matchesCategory = !selectedCategory || service.categoryId === selectedCategory || service.categoryId.startsWith(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            إدارة الخدمات
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            إدارة التصنيفات والخدمات التعليمية
          </p>
        </div>
        <Button onClick={() => setShowAddModal(true)} className="shadow-lg">
          <Plus className="w-4 h-4 ml-2" />
          {activeTab === 'categories' ? 'إضافة تصنيف' : 'إضافة خدمة'}
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 mb-6 p-1 bg-gray-100 dark:bg-gray-800 rounded-xl w-fit">
        <button
          onClick={() => setActiveTab('categories')}
          className={cn(
            'px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2',
            activeTab === 'categories'
              ? 'bg-white dark:bg-gray-700 text-primary-600 shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          )}
        >
          <FolderTree className="w-4 h-4" />
          التصنيفات
        </button>
        <button
          onClick={() => setActiveTab('services')}
          className={cn(
            'px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2',
            activeTab === 'services'
              ? 'bg-white dark:bg-gray-700 text-primary-600 shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          )}
        >
          <LayoutGrid className="w-4 h-4" />
          الخدمات
        </button>
      </div>

      {activeTab === 'categories' ? (
        /* Categories Tree View */
        <div className="bg-white dark:bg-gray-900/50 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-gray-800">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="بحث في التصنيفات..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-80 pr-10 pl-4 py-2.5 bg-gray-100 dark:bg-gray-800 rounded-xl text-sm border-0 focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {mockCategories.map((category) => (
              <div key={category.id}>
                {/* Parent Category */}
                <div className="flex items-center gap-3 p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <button className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded cursor-grab">
                    <GripVertical className="w-4 h-4 text-gray-400" />
                  </button>
                  <button
                    onClick={() => toggleCategory(category.id)}
                    className="p-1"
                  >
                    {expandedCategories.includes(category.id) ? (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronLeft className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                  <span className="text-2xl">{category.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900 dark:text-white">{category.name}</span>
                      <span className="text-xs text-gray-500">({category.nameEn})</span>
                    </div>
                    <span className="text-xs text-gray-500">{category.servicesCount} خدمة</span>
                  </div>
                  <Badge className={category.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}>
                    {category.isActive ? 'نشط' : 'معطل'}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Children */}
                {expandedCategories.includes(category.id) && category.children && (
                  <div className="bg-gray-50/50 dark:bg-gray-800/30">
                    {category.children.map((child) => (
                      <div
                        key={child.id}
                        className="flex items-center gap-3 p-4 pr-16 hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors border-t border-gray-100 dark:border-gray-800"
                      >
                        <button className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded cursor-grab">
                          <GripVertical className="w-4 h-4 text-gray-400" />
                        </button>
                        <span className="text-xl">{child.icon}</span>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-800 dark:text-gray-200">{child.name}</span>
                            <span className="text-xs text-gray-500">({child.nameEn})</span>
                          </div>
                          <span className="text-xs text-gray-500">{child.servicesCount} خدمة</span>
                        </div>
                        <Badge className={child.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}>
                          {child.isActive ? 'نشط' : 'معطل'}
                        </Badge>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Services Grid/Table */
        <div>
          {/* Filters */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-6">
            <div className="relative flex-1 w-full md:w-auto">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="بحث في الخدمات..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-80 pr-10 pl-4 py-2.5 bg-white dark:bg-gray-800 rounded-xl text-sm border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
              <button
                onClick={() => setSelectedCategory(null)}
                className={cn(
                  'px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all',
                  !selectedCategory
                    ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400'
                    : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                )}
              >
                الكل
              </button>
              {mockCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={cn(
                    'px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all flex items-center gap-1.5',
                    selectedCategory === cat.id
                      ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400'
                      : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                  )}
                >
                  <span>{cat.icon}</span>
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredServices.map((service) => {
              const typeConfig = serviceTypeConfig[service.type];
              const TypeIcon = typeConfig.icon;
              
              return (
                <div
                  key={service.id}
                  className={cn(
                    'bg-white dark:bg-gray-900/50 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden transition-all hover:shadow-lg',
                    !service.isActive && 'opacity-60'
                  )}
                >
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                          {service.name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {service.categoryName}
                        </p>
                      </div>
                      <Badge className={typeConfig.color}>
                        <TypeIcon className="w-3 h-3 ml-1" />
                        {typeConfig.label}
                      </Badge>
                    </div>

                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                      {service.description}
                    </p>

                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-3 text-center">
                        <p className="text-xs text-gray-500 mb-1">السعر</p>
                        <p className="font-bold text-gray-900 dark:text-white">{service.price} ر.س</p>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-3 text-center">
                        <p className="text-xs text-gray-500 mb-1">المدة</p>
                        <p className="font-bold text-gray-900 dark:text-white">
                          {service.duration > 0 ? `${service.duration} دقيقة` : 'ذاتي'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{service.teachersCount} معلم</span>
                      <span>{service.bookingsCount} حجز</span>
                      <span className="flex items-center gap-1">
                        <span className="text-yellow-500">★</span>
                        {service.rating}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-800 p-3 bg-gray-50/50 dark:bg-gray-800/30">
                    <Badge className={service.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}>
                      {service.isActive ? 'نشط' : 'معطل'}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        {service.isActive ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
