'use client';

import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cn } from '@/lib/utils';

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> & {
    variant?: 'default' | 'pills' | 'underline';
  }
>(({ className, variant = 'default', ...props }, ref) => {
  const variantStyles = {
    default:
      'inline-flex h-11 items-center justify-center rounded-lg bg-gray-100 p-1 text-gray-500 dark:bg-gray-800 dark:text-gray-400',
    pills:
      'inline-flex items-center gap-2 p-1',
    underline:
      'inline-flex w-full items-center gap-4 border-b border-gray-200 dark:border-gray-700',
  };

  return (
    <TabsPrimitive.List
      ref={ref}
      className={cn(variantStyles[variant], className)}
      {...props}
    />
  );
});
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & {
    variant?: 'default' | 'pills' | 'underline';
  }
>(({ className, variant = 'default', ...props }, ref) => {
  const variantStyles = {
    default: cn(
      'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-all',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
      'disabled:pointer-events-none disabled:opacity-50',
      'data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm',
      'dark:data-[state=active]:bg-gray-900 dark:data-[state=active]:text-gray-100'
    ),
    pills: cn(
      'inline-flex items-center justify-center whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
      'disabled:pointer-events-none disabled:opacity-50',
      'hover:bg-gray-100 dark:hover:bg-gray-800',
      'data-[state=active]:bg-primary-600 data-[state=active]:text-white',
      'data-[state=active]:hover:bg-primary-700'
    ),
    underline: cn(
      'inline-flex items-center justify-center whitespace-nowrap pb-3 px-1 text-sm font-medium transition-colors',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
      'disabled:pointer-events-none disabled:opacity-50',
      'border-b-2 border-transparent -mb-px',
      'hover:text-gray-700 dark:hover:text-gray-300',
      'data-[state=active]:border-primary-600 data-[state=active]:text-primary-600',
      'dark:data-[state=active]:border-primary-400 dark:data-[state=active]:text-primary-400'
    ),
  };

  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(variantStyles[variant], className)}
      {...props}
    />
  );
});
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'mt-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
      'data-[state=inactive]:hidden',
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
