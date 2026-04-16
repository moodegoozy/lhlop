'use client';

import * as React from 'react';
import { DashboardSidebar, DashboardNavbar } from '@/components/dashboard';
import { cn } from '@/lib/utils';
import { useDashboardStore } from '@/store/dashboard.store';

interface StudentLayoutProps {
  children: React.ReactNode;
}

export default function StudentLayout({ children }: StudentLayoutProps) {
  const { sidebarOpen, sidebarCollapsed, setSidebarOpen } = useDashboardStore();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Sidebar */}
      <DashboardSidebar />

      {/* Main Content Area */}
      <div
        className={cn(
          'transition-all duration-300 ease-in-out',
          // Desktop: adjust margin based on sidebar state
          sidebarCollapsed ? 'lg:mr-20' : 'lg:mr-72'
        )}
      >
        {/* Top Navbar */}
        <DashboardNavbar />

        {/* Page Content */}
        <main className="pt-16">
          {children}
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
