// ============================================
// Application Constants
// ============================================

export const APP_NAME = 'منصة التدريس';
export const APP_NAME_EN = 'Edu Platform';
export const APP_DESCRIPTION = 'منصة تعليمية متكاملة لربط المعلمين بالطلاب وأولياء الأمور';

// ============================================
// Routes
// ============================================

export const ROUTES = {
  // Public
  HOME: '/',
  TEACHERS: '/teachers',
  TEACHER_PUBLIC_PROFILE: (id: string) => `/teachers/${id}`,
  ABOUT: '/about',
  CONTACT: '/contact',
  FAQ: '/faq',
  PRIVACY: '/privacy',
  TERMS: '/terms',

  // Auth
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  REGISTER_TEACHER: '/auth/register/teacher',
  REGISTER_PARENT: '/auth/register/parent',
  REGISTER_STUDENT: '/auth/register/student',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',

  // Booking
  BOOK_TEACHER: (id: string) => `/booking/${id}`,
  BOOKING_DETAILS: (id: string) => `/booking/details/${id}`,

  // Dashboard - Admin
  ADMIN_DASHBOARD: '/dashboard/admin',
  ADMIN_PROFILE: '/dashboard/admin/profile',
  ADMIN_USERS: '/dashboard/admin/users',
  ADMIN_TEACHERS: '/dashboard/admin/teachers',
  ADMIN_APPROVALS: '/dashboard/admin/approvals',
  ADMIN_BOOKINGS: '/dashboard/admin/bookings',
  ADMIN_SUBJECTS: '/dashboard/admin/subjects',
  ADMIN_SERVICES: '/dashboard/admin/services',
  ADMIN_CITIES: '/dashboard/admin/cities',
  ADMIN_REPORTS: '/dashboard/admin/reports',
  ADMIN_LOGS: '/dashboard/admin/logs',
  ADMIN_SETTINGS: '/dashboard/admin/settings',

  // Dashboard - Teacher
  TEACHER_DASHBOARD: '/dashboard/teacher',
  TEACHER_PROFILE: '/dashboard/teacher/profile',
  TEACHER_AVAILABILITY: '/dashboard/teacher/availability',
  TEACHER_BOOKINGS: '/dashboard/teacher/bookings',
  TEACHER_REVIEWS: '/dashboard/teacher/reviews',
  TEACHER_CERTIFICATES: '/dashboard/teacher/certificates',
  TEACHER_NOTIFICATIONS: '/dashboard/teacher/notifications',

  // Dashboard - Parent
  PARENT_DASHBOARD: '/dashboard/parent',
  PARENT_PROFILE: '/dashboard/parent/profile',
  PARENT_CHILDREN: '/dashboard/parent/children',
  PARENT_CHILD: (id: string) => `/dashboard/parent/children/${id}`,
  PARENT_ADD_CHILD: '/dashboard/parent/children/new',
  PARENT_BOOKINGS: '/dashboard/parent/bookings',
  PARENT_NOTIFICATIONS: '/dashboard/parent/notifications',

  // Dashboard - Child
  CHILD_DASHBOARD: '/dashboard/child',
  CHILD_PROFILE: '/dashboard/child/profile',
  CHILD_LESSONS: '/dashboard/child/lessons',
  CHILD_SCHEDULE: '/dashboard/child/schedule',

  // Dashboard - Student
  STUDENT_DASHBOARD: '/dashboard/student',
  STUDENT_PROFILE: '/dashboard/student/profile',
  STUDENT_BOOKINGS: '/dashboard/student/bookings',
  STUDENT_SCHEDULE: '/dashboard/student/schedule',
  STUDENT_REVIEWS: '/dashboard/student/reviews',
  STUDENT_NOTIFICATIONS: '/dashboard/student/notifications',
} as const;

// ============================================
// Role Dashboard Routes
// ============================================

export const ROLE_DASHBOARD_ROUTES: Record<string, string> = {
  admin: ROUTES.ADMIN_DASHBOARD,
  teacher: ROUTES.TEACHER_DASHBOARD,
  parent: ROUTES.PARENT_DASHBOARD,
  child: ROUTES.CHILD_DASHBOARD,
  student: ROUTES.STUDENT_DASHBOARD,
};

// ============================================
// Status Colors
// ============================================

export const BOOKING_STATUS_COLORS: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
  under_review: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  confirmed: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  completed: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400',
  cancelled: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  no_show: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
};

export const APPROVAL_STATUS_COLORS: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
  approved: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  rejected: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
};

// ============================================
// Lesson Mode Options
// ============================================

export const LESSON_MODE_OPTIONS = [
  { value: 'in_person', label_ar: 'حضوري', label_en: 'In Person', icon: '🏫' },
  { value: 'remote', label_ar: 'عن بُعد', label_en: 'Remote', icon: '💻' },
  { value: 'both', label_ar: 'كلاهما', label_en: 'Both', icon: '🔄' },
] as const;

export const LESSON_MODE_COLORS: Record<string, string> = {
  online: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  in_person: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  both: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
};

// ============================================
// Degree Options
// ============================================

export const DEGREE_OPTIONS = [
  { value: 'diploma', label_ar: 'دبلوم', label_en: 'Diploma' },
  { value: 'bachelor', label_ar: 'بكالوريوس', label_en: 'Bachelor' },
  { value: 'master', label_ar: 'ماجستير', label_en: 'Master' },
  { value: 'phd', label_ar: 'دكتوراه', label_en: 'PhD' },
] as const;

// ============================================
// Nationality Options
// ============================================

export const NATIONALITY_OPTIONS = [
  { value: 'saudi', label_ar: 'سعودي', label_en: 'Saudi' },
  { value: 'egyptian', label_ar: 'مصري', label_en: 'Egyptian' },
  { value: 'jordanian', label_ar: 'أردني', label_en: 'Jordanian' },
  { value: 'syrian', label_ar: 'سوري', label_en: 'Syrian' },
  { value: 'palestinian', label_ar: 'فلسطيني', label_en: 'Palestinian' },
  { value: 'lebanese', label_ar: 'لبناني', label_en: 'Lebanese' },
  { value: 'iraqi', label_ar: 'عراقي', label_en: 'Iraqi' },
  { value: 'moroccan', label_ar: 'مغربي', label_en: 'Moroccan' },
  { value: 'tunisian', label_ar: 'تونسي', label_en: 'Tunisian' },
  { value: 'other', label_ar: 'أخرى', label_en: 'Other' },
] as const;

// ============================================
// Grade Level Options
// ============================================

export const GRADE_LEVEL_OPTIONS = [
  { value: 'kg', label_ar: 'رياض الأطفال', label_en: 'Kindergarten' },
  { value: 'primary_1', label_ar: 'الأول الابتدائي', label_en: 'Grade 1' },
  { value: 'primary_2', label_ar: 'الثاني الابتدائي', label_en: 'Grade 2' },
  { value: 'primary_3', label_ar: 'الثالث الابتدائي', label_en: 'Grade 3' },
  { value: 'primary_4', label_ar: 'الرابع الابتدائي', label_en: 'Grade 4' },
  { value: 'primary_5', label_ar: 'الخامس الابتدائي', label_en: 'Grade 5' },
  { value: 'primary_6', label_ar: 'السادس الابتدائي', label_en: 'Grade 6' },
  { value: 'middle_1', label_ar: 'الأول المتوسط', label_en: 'Grade 7' },
  { value: 'middle_2', label_ar: 'الثاني المتوسط', label_en: 'Grade 8' },
  { value: 'middle_3', label_ar: 'الثالث المتوسط', label_en: 'Grade 9' },
  { value: 'high_1', label_ar: 'الأول الثانوي', label_en: 'Grade 10' },
  { value: 'high_2', label_ar: 'الثاني الثانوي', label_en: 'Grade 11' },
  { value: 'high_3', label_ar: 'الثالث الثانوي', label_en: 'Grade 12' },
  { value: 'university', label_ar: 'الجامعة', label_en: 'University' },
  { value: 'other', label_ar: 'أخرى', label_en: 'Other' },
] as const;

// ============================================
// Days of Week
// ============================================

export const DAYS_OF_WEEK = [
  { value: 0, label_ar: 'الأحد', label_en: 'Sunday' },
  { value: 1, label_ar: 'الإثنين', label_en: 'Monday' },
  { value: 2, label_ar: 'الثلاثاء', label_en: 'Tuesday' },
  { value: 3, label_ar: 'الأربعاء', label_en: 'Wednesday' },
  { value: 4, label_ar: 'الخميس', label_en: 'Thursday' },
  { value: 5, label_ar: 'الجمعة', label_en: 'Friday' },
  { value: 6, label_ar: 'السبت', label_en: 'Saturday' },
] as const;

// ============================================
// Booking Status Labels
// ============================================

export const BOOKING_STATUS_LABELS: Record<string, { ar: string; en: string }> = {
  pending: { ar: 'قيد الانتظار', en: 'Pending' },
  under_review: { ar: 'قيد المراجعة', en: 'Under Review' },
  confirmed: { ar: 'مؤكد', en: 'Confirmed' },
  completed: { ar: 'مكتمل', en: 'Completed' },
  cancelled: { ar: 'ملغي', en: 'Cancelled' },
};

// ============================================
// Approval Status Labels
// ============================================

export const APPROVAL_STATUS_LABELS: Record<string, { ar: string; en: string }> = {
  pending: { ar: 'قيد الانتظار', en: 'Pending' },
  approved: { ar: 'معتمد', en: 'Approved' },
  rejected: { ar: 'مرفوض', en: 'Rejected' },
};

// ============================================
// Pagination
// ============================================

export const DEFAULT_PAGE_SIZE = 12;
export const PAGE_SIZE_OPTIONS = [6, 12, 24, 48];

// ============================================
// Time Slots
// ============================================

export const DEFAULT_LESSON_DURATION = 60; // minutes
export const SLOT_INTERVAL = 30; // minutes
export const EARLIEST_SLOT = '06:00';
export const LATEST_SLOT = '23:00';
