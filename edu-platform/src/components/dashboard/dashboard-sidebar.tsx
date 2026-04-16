'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useDashboardStore } from '@/store/dashboard.store';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  Calendar,
  CreditCard,
  FileText,
  MessageCircle,
  User,
  Users,
  Wallet,
  Ticket,
  Trophy,
  Heart,
  MessageSquare,
  Share2,
  Store,
  Settings,
  LogOut,
  ChevronRight,
  ChevronLeft,
  HelpCircle,
  X,
  GraduationCap,
} from 'lucide-react';

type NavItem = {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: number;
};

type NavSection = {
  title?: string;
  items: NavItem[];
};

const navSections: NavSection[] = [
  {
    items: [
      { label: 'لوحة التحكم', href: '/student/dashboard', icon: LayoutDashboard },
      { label: 'حصصي', href: '/student/lessons', icon: Calendar },
      { label: 'الجدول الدراسي', href: '/student/schedule', icon: GraduationCap },
    ],
  },
  {
    title: 'المالية',
    items: [
      { label: 'المحفظة', href: '/student/wallet', icon: Wallet },
      { label: 'المدفوعات', href: '/student/payments', icon: CreditCard },
      { label: 'الفواتير', href: '/student/invoices', icon: FileText },
    ],
  },
  {
    title: 'التواصل',
    items: [
      { label: 'المحادثات', href: '/student/chat', icon: MessageCircle, badge: 3 },
      { label: 'الدعم الفني', href: '/student/support', icon: HelpCircle },
      { label: 'المنتدى', href: '/student/forum', icon: MessageSquare },
    ],
  },
  {
    title: 'المزيد',
    items: [
      { label: 'الإنجازات', href: '/student/achievements', icon: Trophy },
      { label: 'المفضلة', href: '/student/favorites', icon: Heart },
      { label: 'التسويق بالعمولة', href: '/student/affiliate', icon: Share2 },
      { label: 'المتجر', href: '/teachers', icon: Store },
    ],
  },
  {
    title: 'الحساب',
    items: [
      { label: 'الملف الشخصي', href: '/student/profile', icon: User },
      { label: 'الملفات الفرعية', href: '/student/children', icon: Users },
      { label: 'الإعدادات', href: '/student/settings', icon: Settings },
    ],
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const { sidebarOpen, sidebarCollapsed, setSidebarOpen, setSidebarCollapsed } = useDashboardStore();

  const isActive = (href: string) => {
    if (href === '/student/dashboard') {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 right-0 z-50 w-72 bg-white dark:bg-[#0F1420] border-l border-gray-200 dark:border-gray-800',
          'transform transition-transform duration-300 ease-in-out lg:hidden',
          sidebarOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <SidebarContent
          pathname={pathname}
          isActive={isActive}
          collapsed={false}
          onClose={() => setSidebarOpen(false)}
          isMobile
        />
      </aside>

      {/* Desktop Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 right-0 z-30 hidden lg:block',
          'bg-white dark:bg-[#0F1420] border-l border-gray-200 dark:border-gray-800',
          'transition-all duration-300 ease-in-out',
          sidebarCollapsed ? 'w-20' : 'w-72'
        )}
      >
        <SidebarContent
          pathname={pathname}
          isActive={isActive}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      </aside>
    </>
  );
}

function SidebarContent({
  pathname,
  isActive,
  collapsed,
  onClose,
  onToggleCollapse,
  isMobile,
}: {
  pathname: string;
  isActive: (href: string) => boolean;
  collapsed: boolean;
  onClose?: () => void;
  onToggleCollapse?: () => void;
  isMobile?: boolean;
}) {
  return (
    <div className="flex flex-col h-full">
      {/* Logo & Close Button */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
        {!collapsed && (
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-lg shadow-primary-500/25">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-l from-primary-600 to-primary-500 bg-clip-text text-transparent">
              منصة المعلمين
            </span>
          </Link>
        )}
        
        {collapsed && (
          <div className="w-full flex justify-center">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-lg shadow-primary-500/25">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
          </div>
        )}

        {isMobile && onClose && (
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={onClose}
            className="text-gray-500"
          >
            <X className="w-5 h-5" />
          </Button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 scrollbar-hide">
        <div className="space-y-6 px-3">
          {navSections.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              {section.title && !collapsed && (
                <h3 className="px-3 mb-2 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                  {section.title}
                </h3>
              )}
              <div className="space-y-1">
                {section.items.map((item) => {
                  const active = isActive(item.href);
                  const Icon = item.icon;
                  
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={isMobile ? onClose : undefined}
                      className={cn(
                        'group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200',
                        'hover:bg-gray-100 dark:hover:bg-gray-800/50',
                        active && 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400',
                        !active && 'text-gray-700 dark:text-gray-300',
                        collapsed && 'justify-center'
                      )}
                    >
                      <div
                        className={cn(
                          'flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-200',
                          active
                            ? 'bg-primary-100 dark:bg-primary-900/30'
                            : 'bg-gray-100 dark:bg-gray-800 group-hover:bg-gray-200 dark:group-hover:bg-gray-700'
                        )}
                      >
                        <Icon
                          className={cn(
                            'w-5 h-5 transition-colors',
                            active
                              ? 'text-primary-600 dark:text-primary-400'
                              : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300'
                          )}
                        />
                      </div>
                      {!collapsed && (
                        <>
                          <span className="flex-1 font-medium text-sm">
                            {item.label}
                          </span>
                          {item.badge && (
                            <span className="flex items-center justify-center min-w-5 h-5 px-1.5 text-xs font-semibold bg-red-500 text-white rounded-full">
                              {item.badge}
                            </span>
                          )}
                        </>
                      )}
                      {collapsed && item.badge && (
                        <span className="absolute top-0 left-0 w-2 h-2 bg-red-500 rounded-full" />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </nav>

      {/* User Profile & Collapse Toggle */}
      <div className="border-t border-gray-200 dark:border-gray-800 p-4">
        {/* Collapse Toggle - Desktop only */}
        {!isMobile && onToggleCollapse && (
          <button
            onClick={onToggleCollapse}
            className={cn(
              'w-full flex items-center gap-3 px-3 py-2 mb-3 rounded-xl',
              'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors',
              collapsed && 'justify-center'
            )}
          >
            <div className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              {collapsed ? (
                <ChevronLeft className="w-5 h-5" />
              ) : (
                <ChevronRight className="w-5 h-5" />
              )}
            </div>
            {!collapsed && <span className="text-sm font-medium">طي القائمة</span>}
          </button>
        )}

        {/* User Card */}
        {!collapsed && (
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-3">
            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10 ring-2 ring-primary-500/20">
                <AvatarFallback className="bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 font-semibold">
                  أح
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-gray-900 dark:text-white truncate">
                  أحمد محمد
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  ahmed@email.com
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="w-full mt-3 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              <LogOut className="w-4 h-4 ml-2" />
              تسجيل الخروج
            </Button>
          </div>
        )}

        {collapsed && (
          <div className="flex flex-col items-center gap-2">
            <Avatar className="w-10 h-10 ring-2 ring-primary-500/20">
              <AvatarFallback className="bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 font-semibold">
                أح
              </AvatarFallback>
            </Avatar>
            <Button
              variant="ghost"
              size="icon-sm"
              className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
