import type { UserRole } from '@/types';

// ============================================
// Permission Definitions
// ============================================

export type Permission =
  // Public
  | 'view:public_pages'
  | 'browse:teachers'
  | 'view:teacher_details'
  // Booking
  | 'create:booking'
  | 'view:own_bookings'
  | 'cancel:own_booking'
  | 'book:for_child'
  // Profile
  | 'manage:own_profile'
  | 'view:limited_profile'
  // Children
  | 'create:child'
  | 'manage:own_children'
  | 'view:own_children'
  // Teacher
  | 'manage:availability'
  | 'manage:certificates'
  | 'accept:bookings'
  | 'view:own_reviews'
  // Reviews
  | 'create:review'
  // Admin
  | 'view:all_users'
  | 'manage:all_users'
  | 'approve:teachers'
  | 'manage:subjects'
  | 'manage:services'
  | 'manage:cities'
  | 'view:reports'
  | 'view:logs'
  | 'manage:settings'
  | 'view:all_bookings';

// ============================================
// Role Permissions Map
// ============================================

export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  admin: [
    'view:public_pages',
    'browse:teachers',
    'view:teacher_details',
    'create:booking',
    'view:own_bookings',
    'cancel:own_booking',
    'manage:own_profile',
    'view:all_users',
    'manage:all_users',
    'approve:teachers',
    'manage:subjects',
    'manage:services',
    'manage:cities',
    'view:reports',
    'view:logs',
    'manage:settings',
    'view:all_bookings',
  ],
  teacher: [
    'view:public_pages',
    'browse:teachers',
    'view:teacher_details',
    'manage:own_profile',
    'manage:availability',
    'manage:certificates',
    'accept:bookings',
    'view:own_bookings',
    'view:own_reviews',
  ],
  parent: [
    'view:public_pages',
    'browse:teachers',
    'view:teacher_details',
    'create:booking',
    'view:own_bookings',
    'cancel:own_booking',
    'book:for_child',
    'manage:own_profile',
    'create:child',
    'manage:own_children',
    'view:own_children',
    'create:review',
  ],
  child: [
    'view:public_pages',
    'view:limited_profile',
    'view:own_bookings',
  ],
  student: [
    'view:public_pages',
    'browse:teachers',
    'view:teacher_details',
    'create:booking',
    'view:own_bookings',
    'cancel:own_booking',
    'manage:own_profile',
    'create:review',
  ],
};

// ============================================
// Permission Checker
// ============================================

export function hasPermission(role: UserRole | null, permission: Permission): boolean {
  if (!role) return false;
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
}

export function hasAnyPermission(role: UserRole | null, permissions: Permission[]): boolean {
  if (!role) return false;
  return permissions.some((permission) => hasPermission(role, permission));
}

export function hasAllPermissions(role: UserRole | null, permissions: Permission[]): boolean {
  if (!role) return false;
  return permissions.every((permission) => hasPermission(role, permission));
}

// ============================================
// Route Protection
// ============================================

export type RouteProtection = {
  requiresAuth: boolean;
  allowedRoles?: UserRole[];
  requiredPermissions?: Permission[];
};

export const PROTECTED_ROUTES: Record<string, RouteProtection> = {
  // Admin routes
  '/dashboard/admin': { requiresAuth: true, allowedRoles: ['admin'] },
  '/dashboard/admin/*': { requiresAuth: true, allowedRoles: ['admin'] },

  // Teacher routes
  '/dashboard/teacher': { requiresAuth: true, allowedRoles: ['teacher','admin'] },
  '/dashboard/teacher/*': { requiresAuth: true, allowedRoles: ['teacher','admin'] },

  // Parent routes
  '/dashboard/parent': { requiresAuth: true, allowedRoles: ['parent','admin'] },
  '/dashboard/parent/*': { requiresAuth: true, allowedRoles: ['parent','admin'] },

  // Child routes
  '/dashboard/child': { requiresAuth: true, allowedRoles: ['child','admin'] },
  '/dashboard/child/*': { requiresAuth: true, allowedRoles: ['child','admin'] },

  // Student routes
  '/dashboard/student': { requiresAuth: true, allowedRoles: ['student','admin'] },
  '/dashboard/student/*': { requiresAuth: true, allowedRoles: ['student','admin'] },

  // Booking routes
  '/booking/*': { requiresAuth: true, requiredPermissions: ['create:booking'] },
};

export function canAccessRoute(
  pathname: string,
  role: UserRole | null,
  isAuthenticated: boolean
): boolean {
  // Check exact path match first
  let protection = PROTECTED_ROUTES[pathname];

  // Check wildcard matches
  if (!protection) {
    const wildcardKey = Object.keys(PROTECTED_ROUTES).find((key) => {
      if (key.endsWith('/*')) {
        const basePath = key.slice(0, -2);
        return pathname.startsWith(basePath);
      }
      return false;
    });
    if (wildcardKey) {
      protection = PROTECTED_ROUTES[wildcardKey];
    }
  }

  // No protection defined = public route
  if (!protection) return true;

  // Check authentication
  if (protection.requiresAuth && !isAuthenticated) return false;

  // Check role
  if (protection.allowedRoles && role) {
    if (!protection.allowedRoles.includes(role)) return false;
  }

  // Check permissions
  if (protection.requiredPermissions) {
    if (!hasAllPermissions(role, protection.requiredPermissions)) return false;
  }

  return true;
}

// ============================================
// Role Labels
// ============================================

export const ROLE_LABELS: Record<UserRole, { ar: string; en: string }> = {
  admin: { ar: 'مدير', en: 'Admin' },
  teacher: { ar: 'معلم', en: 'Teacher' },
  parent: { ar: 'ولي أمر', en: 'Parent' },
  child: { ar: 'طفل', en: 'Child' },
  student: { ar: 'طالب', en: 'Student' },
};

export function getRoleLabel(role: UserRole, lang: 'ar' | 'en' = 'ar'): string {
  return ROLE_LABELS[role]?.[lang] ?? role;
}
