// ============================================
// User Types
// ============================================

export type UserRole = 'admin' | 'teacher' | 'parent' | 'child' | 'student';

export interface User {
  id: string;
  email: string;
  phone?: string | null;
  full_name: string;
  avatar_url?: string | null;
  role: UserRole;
  is_active: boolean;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}

// ============================================
// Teacher Types
// ============================================

export type LessonMode = 'in_person' | 'remote' | 'both';
export type ApprovalStatus = 'pending' | 'approved' | 'rejected';

export interface TeacherProfile {
  id: string;
  user_id: string;
  user?: User;
  bio?: string;
  nationality?: string;
  specialization?: string;
  degree?: string;
  years_of_experience: number;
  lesson_price: number;
  lesson_duration: number;
  lesson_mode: LessonMode;
  city_id?: string;
  city?: City;
  service_area_text?: string | null;
  average_rating: number;
  total_reviews: number;
  is_verified: boolean;
  approval_status: ApprovalStatus;
  subjects?: Subject[];
  services?: Service[];
  certificates?: TeacherCertificate[];
  availability?: TeacherAvailability[];
  created_at: string;
  updated_at: string;
}

export interface TeacherCertificate {
  id: string;
  teacher_profile_id: string;
  title: string;
  issuer?: string;
  issue_date?: string;
  file_url: string;
  created_at: string;
}

export interface TeacherAvailability {
  id: string;
  teacher_profile_id: string;
  day_of_week: number; // 0-6, 0 = Sunday
  start_time: string; // HH:MM
  end_time: string; // HH:MM
  is_active: boolean;
}

// ============================================
// Parent & Child Types
// ============================================

export interface ParentProfile {
  id: string;
  user_id: string;
  user?: User;
  children?: ChildProfile[];
  created_at: string;
  updated_at: string;
}

export interface ChildProfile {
  id: string;
  parent_user_id: string;
  child_user_id: string;
  child_user?: User;
  full_name: string;
  age: number;
  grade_level?: string;
  school_name?: string;
  learning_goals?: string[];
  learning_notes?: string;
  preferred_subjects?: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// ============================================
// Student Types
// ============================================

export interface StudentProfile {
  id: string;
  user_id: string;
  user?: User;
  grade_level?: string;
  preferred_subjects?: string[];
  created_at: string;
  updated_at: string;
}

// ============================================
// Subject & Service Types
// ============================================

export interface Subject {
  id: string;
  name_ar: string;
  name_en: string;
  icon?: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: string;
  name_ar: string;
  name_en: string;
  description_ar?: string;
  description_en?: string;
  icon?: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface City {
  id: string;
  name_ar: string;
  name_en: string;
  region?: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
}

// ============================================
// Booking Types
// ============================================

export type BookingStatus = 'pending' | 'under_review' | 'confirmed' | 'completed' | 'cancelled' | 'no_show';
export type BookedForType = 'self' | 'child';

export interface Booking {
  id: string;
  teacher_user_id: string;
  teacher?: TeacherProfile;
  booked_by_user_id: string;
  booked_by_user?: User;
  booked_for_type: BookedForType;
  booked_for_user_id: string;
  booked_for_user?: User;
  subject_id: string;
  subject?: Subject;
  service_id: string;
  service?: Service;
  lesson_mode: 'in_person' | 'remote';
  booking_date: string;
  start_time: string;
  end_time: string;
  notes?: string | null;
  status: BookingStatus;
  price_snapshot: number;
  duration_snapshot: number;
  cancellation_reason?: string;
  review?: Review;
  created_at: string;
  updated_at: string;
}

// ============================================
// Review Types
// ============================================

export interface Review {
  id: string;
  booking_id: string;
  booking?: Booking;
  reviewer_user_id: string;
  reviewer?: User;
  teacher_user_id: string;
  teacher?: User;
  rating: number;
  comment?: string;
  is_visible: boolean;
  created_at: string;
}

// ============================================
// Notification Types
// ============================================

export type NotificationType = 'booking' | 'review' | 'system' | 'approval';

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  body: string;
  type: NotificationType;
  reference_id?: string;
  reference_type?: string;
  is_read: boolean;
  created_at: string;
}

// ============================================
// Admin Types
// ============================================

export interface AdminLog {
  id: string;
  admin_user_id: string;
  admin?: User;
  action: string;
  target_type: string;
  target_id: string;
  meta_json?: Record<string, unknown>;
  ip_address?: string;
  created_at: string;
}

export interface PlatformSetting {
  id: string;
  setting_key: string;
  setting_value: unknown;
  description?: string;
  updated_at: string;
}

// ============================================
// Filter Types
// ============================================

export interface TeacherFilters {
  search?: string;
  subject_id?: string;
  service_id?: string;
  city_id?: string;
  nationality?: string;
  degree?: string;
  lesson_mode?: LessonMode;
  min_price?: number;
  max_price?: number;
  min_rating?: number;
  gender?: 'male' | 'female';
  sort_by?: 'rating' | 'price_asc' | 'price_desc' | 'experience' | 'reviews';
}

export interface BookingFilters {
  status?: BookingStatus;
  date_from?: string;
  date_to?: string;
  teacher_id?: string;
  student_id?: string;
}

// ============================================
// Stats Types
// ============================================

export interface AdminStats {
  total_users: number;
  total_teachers: number;
  total_students: number;
  total_parents: number;
  total_children: number;
  total_bookings: number;
  pending_bookings: number;
  confirmed_bookings: number;
  completed_bookings: number;
  cancelled_bookings: number;
  pending_approvals: number;
  total_revenue?: number;
}

export interface TeacherStats {
  total_bookings: number;
  pending_bookings: number;
  confirmed_bookings: number;
  completed_bookings: number;
  average_rating: number;
  total_reviews: number;
  total_earnings?: number;
}

// ============================================
// Time Slot Types
// ============================================

export interface TimeSlot {
  start_time: string;
  end_time: string;
  is_available: boolean;
}

export interface DayAvailability {
  date: string;
  day_of_week: number;
  slots: TimeSlot[];
}

// ============================================
// Auth Types
// ============================================

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  full_name: string;
  phone?: string;
  role: UserRole;
}
