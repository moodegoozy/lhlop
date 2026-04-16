'use client';

import * as React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useDashboardStore } from '@/store/dashboard.store';
import { useUIStore } from '@/store/ui.store';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Menu,
  Bell,
  Search,
  Sun,
  Moon,
  Plus,
  Calendar,
  MessageCircle,
  ChevronDown,
  Check,
  Clock,
  X,
} from 'lucide-react';

export function DashboardNavbar() {
  const { setSidebarOpen, notifications, unreadNotificationsCount, markNotificationRead, markAllNotificationsRead } = useDashboardStore();
  const { theme, setTheme } = useUIStore();
  const [notificationsOpen, setNotificationsOpen] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [profileOpen, setProfileOpen] = React.useState(false);
  const notificationsRef = React.useRef<HTMLDivElement>(null);
  const profileRef = React.useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="sticky top-0 z-20 bg-white/80 dark:bg-[#0B0F1A]/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50">
      <div className="flex items-center justify-between h-16 px-4 md:px-6 lg:px-8">
        {/* Right Side - Menu & Search */}
        <div className="flex items-center gap-3">
          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden"
          >
            <Menu className="w-5 h-5" />
          </Button>

          {/* Search - Desktop */}
          <div className="hidden md:flex items-center">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="ابحث عن معلم، مادة، أو حصة..."
                className={cn(
                  'w-64 lg:w-80 h-10 pr-10 pl-4 rounded-xl',
                  'bg-gray-100 dark:bg-gray-800/50 border-0',
                  'text-sm text-gray-900 dark:text-white placeholder:text-gray-400',
                  'focus:outline-none focus:ring-2 focus:ring-primary-500/20',
                  'transition-all duration-200'
                )}
              />
            </div>
          </div>

          {/* Search - Mobile */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSearchOpen(true)}
            className="md:hidden"
          >
            <Search className="w-5 h-5" />
          </Button>
        </div>

        {/* Left Side - Actions */}
        <div className="flex items-center gap-2">
          {/* Quick Actions - Desktop */}
          <div className="hidden lg:flex items-center gap-2 ml-4">
            <Link href="/booking">
              <Button size="sm" className="rounded-xl shadow-lg shadow-primary-500/25">
                <Plus className="w-4 h-4 ml-1.5" />
                حجز جديد
              </Button>
            </Link>
          </div>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="hidden sm:flex"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-amber-500" />
            ) : (
              <Moon className="w-5 h-5 text-slate-700" />
            )}
          </Button>

          {/* Notifications */}
          <div ref={notificationsRef} className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="relative"
            >
              <Bell className="w-5 h-5" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute -top-1 -left-1 w-5 h-5 flex items-center justify-center text-xs font-bold bg-red-500 text-white rounded-full animate-pulse">
                  {unreadNotificationsCount}
                </span>
              )}
            </Button>

            {/* Notifications Dropdown */}
            {notificationsOpen && (
              <div className="absolute left-0 mt-2 w-80 md:w-96 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-800">
                  <h3 className="font-semibold text-gray-900 dark:text-white">الإشعارات</h3>
                  {unreadNotificationsCount > 0 && (
                    <button
                      onClick={markAllNotificationsRead}
                      className="text-xs text-primary-600 dark:text-primary-400 hover:underline"
                    >
                      تعيين الكل كمقروء
                    </button>
                  )}
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        onClick={() => markNotificationRead(notification.id)}
                        className={cn(
                          'flex items-start gap-3 px-4 py-3 cursor-pointer transition-colors',
                          'hover:bg-gray-50 dark:hover:bg-gray-800/50',
                          !notification.read && 'bg-primary-50/50 dark:bg-primary-900/10'
                        )}
                      >
                        <div
                          className={cn(
                            'w-10 h-10 rounded-xl flex items-center justify-center shrink-0',
                            notification.type === 'success' && 'bg-green-100 dark:bg-green-900/30 text-green-600',
                            notification.type === 'info' && 'bg-blue-100 dark:bg-blue-900/30 text-blue-600',
                            notification.type === 'warning' && 'bg-amber-100 dark:bg-amber-900/30 text-amber-600',
                            notification.type === 'error' && 'bg-red-100 dark:bg-red-900/30 text-red-600'
                          )}
                        >
                          {notification.type === 'success' && <Check className="w-5 h-5" />}
                          {notification.type === 'info' && <Bell className="w-5 h-5" />}
                          {notification.type === 'warning' && <Clock className="w-5 h-5" />}
                          {notification.type === 'error' && <X className="w-5 h-5" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm text-gray-900 dark:text-white">
                            {notification.title}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                            {new Date(notification.date).toLocaleDateString('ar-SA', {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </p>
                        </div>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 shrink-0" />
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="py-8 text-center text-gray-500 dark:text-gray-400">
                      <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">لا توجد إشعارات</p>
                    </div>
                  )}
                </div>
                <Link
                  href="/student/notifications"
                  className="block px-4 py-3 text-center text-sm font-medium text-primary-600 dark:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 border-t border-gray-200 dark:border-gray-800"
                >
                  عرض جميع الإشعارات
                </Link>
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div ref={profileRef} className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className={cn(
                'flex items-center gap-2 p-1.5 rounded-xl transition-colors',
                'hover:bg-gray-100 dark:hover:bg-gray-800'
              )}
            >
              <Avatar className="w-8 h-8 ring-2 ring-primary-500/20">
                <AvatarFallback className="bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 text-sm font-semibold">
                  أح
                </AvatarFallback>
              </Avatar>
              <ChevronDown className="w-4 h-4 text-gray-400 hidden sm:block" />
            </button>

            {/* Profile Dropdown Menu */}
            {profileOpen && (
              <div className="absolute left-0 mt-2 w-56 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="p-4 border-b border-gray-200 dark:border-gray-800">
                  <p className="font-semibold text-gray-900 dark:text-white">أحمد محمد</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">ahmed@email.com</p>
                </div>
                <div className="py-2">
                  <Link
                    href="/student/profile"
                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    الملف الشخصي
                  </Link>
                  <Link
                    href="/student/settings"
                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    الإعدادات
                  </Link>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-800 py-2">
                  <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">
                    تسجيل الخروج
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-white dark:bg-gray-900 md:hidden">
          <div className="flex items-center gap-3 p-4 border-b border-gray-200 dark:border-gray-800">
            <Button variant="ghost" size="icon" onClick={() => setSearchOpen(false)}>
              <X className="w-5 h-5" />
            </Button>
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="ابحث عن معلم، مادة، أو حصة..."
                autoFocus
                className={cn(
                  'w-full h-10 pr-10 pl-4 rounded-xl',
                  'bg-gray-100 dark:bg-gray-800 border-0',
                  'text-sm text-gray-900 dark:text-white placeholder:text-gray-400',
                  'focus:outline-none focus:ring-2 focus:ring-primary-500/20'
                )}
              />
            </div>
          </div>
          <div className="p-4">
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
              ابدأ الكتابة للبحث...
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
