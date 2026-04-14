'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button, Avatar } from '@/components/ui';
import { useAuthStore, useUIStore } from '@/store';

interface PageHeaderProps {
  title?: string;
  showBack?: boolean;
  backHref?: string;
  showLogo?: boolean;
  showSearch?: boolean;
  showNotifications?: boolean;
  showProfile?: boolean;
  actions?: React.ReactNode;
  transparent?: boolean;
  className?: string;
}

export function PageHeader({
  title,
  showBack = false,
  backHref,
  showLogo = false,
  showSearch = false,
  showNotifications = false,
  showProfile = false,
  actions,
  transparent = false,
  className,
}: PageHeaderProps) {
  const router = useRouter();
  const { user } = useAuthStore();

  const handleBack = () => {
    if (backHref) {
      router.push(backHref);
    } else {
      router.back();
    }
  };

  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full',
        transparent
          ? 'bg-transparent'
          : 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-800/50',
        className
      )}
    >
      <div className="flex items-center justify-between h-14 px-4">
        {/* Left Side */}
        <div className="flex items-center gap-2">
          {showBack && (
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={handleBack}
              aria-label="رجوع"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </Button>
          )}

          {showLogo && (
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">م</span>
              </div>
              <span className="font-bold text-lg text-gray-900 dark:text-gray-100 hidden sm:block">
                منصة المعلمين
              </span>
            </Link>
          )}

          {title && !showLogo && (
            <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100 truncate">
              {title}
            </h1>
          )}
        </div>

        {/* Center - Title when logo is shown */}
        {title && showLogo && (
          <h1 className="absolute left-1/2 -translate-x-1/2 text-lg font-semibold text-gray-900 dark:text-gray-100 truncate max-w-[50%]">
            {title}
          </h1>
        )}

        {/* Right Side */}
        <div className="flex items-center gap-1">
          {showSearch && (
            <Button variant="ghost" size="icon-sm" aria-label="بحث">
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </Button>
          )}

          {showNotifications && (
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label="الإشعارات"
              className="relative"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              {/* Notification badge */}
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
            </Button>
          )}

          {showProfile && user && (
            <Link href="/profile">
              <Avatar
                src={user.avatar_url}
                alt={user.full_name}
                fallback={user.full_name}
                size="sm"
                className="ring-2 ring-white dark:ring-gray-900"
              />
            </Link>
          )}

          {actions}
        </div>
      </div>
    </header>
  );
}

// Simple header with just back button and title
export function SimpleHeader({
  title,
  backHref,
  actions,
  className,
}: {
  title: string;
  backHref?: string;
  actions?: React.ReactNode;
  className?: string;
}) {
  return (
    <PageHeader
      title={title}
      showBack
      backHref={backHref}
      actions={actions}
      className={className}
    />
  );
}

// Dashboard header with user greeting
export function DashboardHeader({
  greeting,
  userName,
  subtitle,
  actions,
  className,
}: {
  greeting?: string;
  userName?: string;
  subtitle?: string;
  actions?: React.ReactNode;
  className?: string;
}) {
  const { user } = useAuthStore();
  const displayName = userName || user?.full_name;

  // Get greeting based on time of day
  const getGreeting = () => {
    if (greeting) return greeting;
    const hour = new Date().getHours();
    if (hour < 12) return 'صباح الخير';
    if (hour < 17) return 'مساء الخير';
    return 'مساء الخير';
  };

  return (
    <div className={cn('px-4 py-4', className)}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {getGreeting()}
          </p>
          <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            {displayName} 👋
          </h1>
          {subtitle && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              {subtitle}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          {actions}
          <Link href="/profile">
            <Avatar
              src={user?.avatar_url}
              alt={user?.full_name}
              fallback={user?.full_name}
              size="lg"
              className="ring-2 ring-white dark:ring-gray-900 shadow"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
