'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ROUTES } from '@/lib/constants';
import { t } from '@/lib/translations';
import { useAuthStore } from '@/store';
import type { UserRole } from '@/types';

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  activeIcon?: React.ReactNode;
  badge?: number;
}

// Icons
const HomeIcon = ({ active }: { active?: boolean }) => (
  <svg
    className="h-6 w-6"
    fill={active ? 'currentColor' : 'none'}
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={active ? 0 : 2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
    />
  </svg>
);

const SearchIcon = ({ active }: { active?: boolean }) => (
  <svg
    className="h-6 w-6"
    fill={active ? 'currentColor' : 'none'}
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={active ? 0 : 2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);

const CalendarIcon = ({ active }: { active?: boolean }) => (
  <svg
    className="h-6 w-6"
    fill={active ? 'currentColor' : 'none'}
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={active ? 0 : 2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);

const NotificationIcon = ({ active }: { active?: boolean }) => (
  <svg
    className="h-6 w-6"
    fill={active ? 'currentColor' : 'none'}
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={active ? 0 : 2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
    />
  </svg>
);

const UserIcon = ({ active }: { active?: boolean }) => (
  <svg
    className="h-6 w-6"
    fill={active ? 'currentColor' : 'none'}
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={active ? 0 : 2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);

const DashboardIcon = ({ active }: { active?: boolean }) => (
  <svg
    className="h-6 w-6"
    fill={active ? 'currentColor' : 'none'}
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={active ? 0 : 2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
    />
  </svg>
);

const ChildrenIcon = ({ active }: { active?: boolean }) => (
  <svg
    className="h-6 w-6"
    fill={active ? 'currentColor' : 'none'}
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={active ? 0 : 2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
    />
  </svg>
);

// Get navigation items based on user role
function getNavItems(role?: UserRole, unreadNotifications = 0): NavItem[] {
  // Guest navigation
  if (!role) {
    return [
      {
        href: ROUTES.HOME,
        label: t('nav.home'),
        icon: <HomeIcon />,
        activeIcon: <HomeIcon active />,
      },
      {
        href: ROUTES.TEACHERS,
        label: t('nav.teachers'),
        icon: <SearchIcon />,
        activeIcon: <SearchIcon active />,
      },
      {
        href: ROUTES.LOGIN,
        label: t('nav.login'),
        icon: <UserIcon />,
        activeIcon: <UserIcon active />,
      },
    ];
  }

  // Common items for logged-in users
  const commonItems: NavItem[] = [
    {
      href: ROUTES.HOME,
      label: t('nav.home'),
      icon: <HomeIcon />,
      activeIcon: <HomeIcon active />,
    },
    {
      href: ROUTES.TEACHERS,
      label: t('nav.teachers'),
      icon: <SearchIcon />,
      activeIcon: <SearchIcon active />,
    },
  ];

  // Role-specific items
  switch (role) {
    case 'admin':
      return [
        ...commonItems,
        {
          href: ROUTES.ADMIN_DASHBOARD,
          label: t('nav.dashboard'),
          icon: <DashboardIcon />,
          activeIcon: <DashboardIcon active />,
        },
        {
          href: ROUTES.ADMIN_DASHBOARD,
          label: t('nav.profile'),
          icon: <UserIcon />,
          activeIcon: <UserIcon active />,
        },
      ];

    case 'teacher':
      return [
        {
          href: ROUTES.TEACHER_DASHBOARD,
          label: t('nav.dashboard'),
          icon: <DashboardIcon />,
          activeIcon: <DashboardIcon active />,
        },
        {
          href: ROUTES.TEACHER_DASHBOARD,
          label: t('nav.myBookings'),
          icon: <CalendarIcon />,
          activeIcon: <CalendarIcon active />,
        },
        {
          href: ROUTES.TEACHER_DASHBOARD,
          label: t('nav.notifications'),
          icon: <NotificationIcon />,
          activeIcon: <NotificationIcon active />,
          badge: unreadNotifications > 0 ? unreadNotifications : undefined,
        },
        {
          href: ROUTES.TEACHER_DASHBOARD,
          label: t('nav.profile'),
          icon: <UserIcon />,
          activeIcon: <UserIcon active />,
        },
      ];

    case 'parent':
      return [
        ...commonItems,
        {
          href: ROUTES.PARENT_DASHBOARD,
          label: t('nav.myChildren'),
          icon: <ChildrenIcon />,
          activeIcon: <ChildrenIcon active />,
        },
        {
          href: ROUTES.PARENT_DASHBOARD,
          label: t('nav.bookings'),
          icon: <CalendarIcon />,
          activeIcon: <CalendarIcon active />,
        },
        {
          href: ROUTES.PARENT_DASHBOARD,
          label: t('nav.profile'),
          icon: <UserIcon />,
          activeIcon: <UserIcon active />,
        },
      ];

    case 'child':
      return [
        {
          href: ROUTES.CHILD_DASHBOARD,
          label: t('nav.home'),
          icon: <HomeIcon />,
          activeIcon: <HomeIcon active />,
        },
        {
          href: ROUTES.CHILD_DASHBOARD,
          label: t('nav.myLessons'),
          icon: <CalendarIcon />,
          activeIcon: <CalendarIcon active />,
        },
        {
          href: ROUTES.CHILD_DASHBOARD,
          label: t('nav.profile'),
          icon: <UserIcon />,
          activeIcon: <UserIcon active />,
        },
      ];

    case 'student':
      return [
        ...commonItems,
        {
          href: ROUTES.STUDENT_DASHBOARD,
          label: t('nav.myBookings'),
          icon: <CalendarIcon />,
          activeIcon: <CalendarIcon active />,
        },
        {
          href: ROUTES.STUDENT_DASHBOARD,
          label: t('nav.notifications'),
          icon: <NotificationIcon />,
          activeIcon: <NotificationIcon active />,
          badge: unreadNotifications > 0 ? unreadNotifications : undefined,
        },
        {
          href: ROUTES.STUDENT_DASHBOARD,
          label: t('nav.profile'),
          icon: <UserIcon />,
          activeIcon: <UserIcon active />,
        },
      ];

    default:
      return commonItems;
  }
}

export function MobileBottomNav() {
  const pathname = usePathname();
  const { user } = useAuthStore();

  const navItems = getNavItems(user?.role, 0); // TODO: Get unread notifications count

  // Check if current path is active
  const isActive = (href: string) => {
    if (href === ROUTES.HOME) {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 safe-area-bottom md:hidden">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center flex-1 h-full gap-0.5 px-2 transition-colors',
                active
                  ? 'text-primary-600 dark:text-primary-400'
                  : 'text-gray-500 dark:text-gray-400'
              )}
            >
              <div className="relative">
                {active ? item.activeIcon || item.icon : item.icon}
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute -top-1 -left-1 min-w-[18px] h-[18px] flex items-center justify-center text-[10px] font-bold text-white bg-red-500 rounded-full px-1">
                    {item.badge > 99 ? '99+' : item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-medium truncate max-w-full">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
