import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const avatarVariants = cva(
  'relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700',
  {
    variants: {
      size: {
        xs: 'h-6 w-6 text-xs',
        sm: 'h-8 w-8 text-sm',
        default: 'h-10 w-10 text-base',
        lg: 'h-12 w-12 text-lg',
        xl: 'h-16 w-16 text-xl',
        '2xl': 'h-20 w-20 text-2xl',
        '3xl': 'h-24 w-24 text-3xl',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

export interface AvatarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarVariants> {
  src?: string | null;
  alt?: string;
  fallback?: string;
  status?: 'online' | 'offline' | 'busy' | 'away';
  children?: React.ReactNode;
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, size, src, alt, fallback, status, children, ...props }, ref) => {
    const [imageError, setImageError] = React.useState(false);

    // Reset error state when src changes
    React.useEffect(() => {
      setImageError(false);
    }, [src]);

    // Generate initials from fallback or alt
    const getInitials = (name?: string) => {
      if (!name) return '?';
      const parts = name.split(' ').filter(Boolean);
      if (parts.length >= 2) {
        return parts[0][0] + parts[parts.length - 1][0];
      }
      return parts[0]?.slice(0, 2) || '?';
    };

    const showImage = src && !imageError;
    const initials = getInitials(fallback || alt);

    const statusColors = {
      online: 'bg-green-500',
      offline: 'bg-gray-400',
      busy: 'bg-red-500',
      away: 'bg-amber-500',
    };

    const statusSizes = {
      xs: 'h-1.5 w-1.5 border',
      sm: 'h-2 w-2 border',
      default: 'h-2.5 w-2.5 border-2',
      lg: 'h-3 w-3 border-2',
      xl: 'h-3.5 w-3.5 border-2',
      '2xl': 'h-4 w-4 border-2',
      '3xl': 'h-5 w-5 border-2',
    };

    // Render children if provided (for sub-component pattern), otherwise use internal rendering
    const renderContent = () => {
      if (children) {
        return children;
      }
      if (showImage) {
        return (
          <img
            src={src}
            alt={alt}
            className="h-full w-full object-cover"
            onError={() => setImageError(true)}
          />
        );
      }
      return (
        <span className="font-medium text-gray-600 dark:text-gray-300 uppercase">
          {initials}
        </span>
      );
    };

    return (
      <div
        ref={ref}
        className={cn(avatarVariants({ size }), className)}
        {...props}
      >
        {renderContent()}
        {status && (
          <span
            className={cn(
              'absolute bottom-0 left-0 rounded-full border-white dark:border-gray-900',
              statusColors[status],
              statusSizes[size || 'default']
            )}
          />
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';

// Avatar Group for showing multiple avatars
interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  max?: number;
  size?: VariantProps<typeof avatarVariants>['size'];
  children: React.ReactNode;
}

const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ className, max, size = 'default', children, ...props }, ref) => {
    const childArray = React.Children.toArray(children);
    const visibleCount = max ? Math.min(max, childArray.length) : childArray.length;
    const hiddenCount = childArray.length - visibleCount;

    return (
      <div
        ref={ref}
        className={cn('flex items-center -space-x-2', className)}
        {...props}
      >
        {childArray.slice(0, visibleCount).map((child, index) => (
          <div
            key={index}
            className="relative ring-2 ring-white dark:ring-gray-900 rounded-full"
          >
            {React.isValidElement<AvatarProps>(child)
              ? React.cloneElement(child, { size })
              : child}
          </div>
        ))}
        {hiddenCount > 0 && (
          <div
            className={cn(
              avatarVariants({ size }),
              'ring-2 ring-white dark:ring-gray-900 bg-gray-300 dark:bg-gray-600'
            )}
          >
            <span className="font-medium text-gray-700 dark:text-gray-200">
              +{hiddenCount}
            </span>
          </div>
        )}
      </div>
    );
  }
);

AvatarGroup.displayName = 'AvatarGroup';

// AvatarImage sub-component (Radix UI pattern)
interface AvatarImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

const AvatarImage = React.forwardRef<HTMLImageElement, AvatarImageProps>(
  ({ className, src, alt, ...props }, ref) => {
    if (!src) return null;
    return (
      <img
        ref={ref}
        src={src}
        alt={alt}
        className={cn('h-full w-full object-cover', className)}
        {...props}
      />
    );
  }
);

AvatarImage.displayName = 'AvatarImage';

// AvatarFallback sub-component (Radix UI pattern)
interface AvatarFallbackProps extends React.HTMLAttributes<HTMLSpanElement> {}

const AvatarFallback = React.forwardRef<HTMLSpanElement, AvatarFallbackProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn('font-medium text-gray-600 dark:text-gray-300 uppercase', className)}
        {...props}
      >
        {children}
      </span>
    );
  }
);

AvatarFallback.displayName = 'AvatarFallback';

export { Avatar, AvatarGroup, AvatarImage, AvatarFallback, avatarVariants };
