// Database Types
export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: number;
  name: string;
  icon: string | null;
  parent_id: number | null;
  sort_order: number;
  children?: Category[];
  teachers_count?: number;
}

export interface Teacher {
  id: number;
  user_id: number | null;
  name: string;
  profile_image: string | null;
  gender: 'male' | 'female';
  nationality: string | null;
  qualification: string | null;
  latest_qualification: string | null;
  bio: string | null;
  hourly_rate: number;
  rating: number;
  total_ratings: number;
  completed_hours: number;
  experience_years: number;
  lesson_location: 'online' | 'in_person' | 'both' | null;
  teaching_method: 'individual' | 'group' | null;
  country_code: string | null;
  city_id: number | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  categories?: Category[];
}

// Filter Types
export interface TeacherFilters {
  search?: string;
  sortBy?: 'rating' | 'experience' | 'price_low' | 'price_high' | 'newest';
  gender?: 'male' | 'female' | '';
  qualification?: string;
  lessonLocation?: 'online' | 'in_person' | 'both' | '';
  nationality?: string;
  countryCode?: string;
  cityId?: string;
  categoryId?: number | null;
  teachingMethod?: string;
  page?: number;
  perPage?: number;
}

// API Response Types
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Filter Options
export const GENDER_OPTIONS = ['male', 'female'] as const;

export const QUALIFICATION_OPTIONS = ['bachelor', 'master', 'phd', 'diploma'] as const;

export const LESSON_LOCATION_OPTIONS = {
  online: 'عبر الإنترنت',
  in_person: 'حضوري',
  both: 'كلاهما',
} as const;

export const NATIONALITY_OPTIONS = [
  'saudi', 'egyptian', 'jordanian', 'syrian', 'lebanese', 
  'palestinian', 'iraqi', 'moroccan', 'tunisian', 'algerian',
  'sudanese', 'yemeni', 'libyan', 'emirati', 'kuwaiti',
  'qatari', 'bahraini', 'omani', 'other'
] as const;

export const COUNTRY_OPTIONS = {
  SA: 'السعودية',
  EG: 'مصر',
  JO: 'الأردن',
  AE: 'الإمارات',
  KW: 'الكويت',
  QA: 'قطر',
  BH: 'البحرين',
  OM: 'عُمان',
} as const;

export const CITY_OPTIONS: Record<string, Record<string, string>> = {
  SA: {
    riyadh: 'الرياض',
    jeddah: 'جدة',
    makkah: 'مكة المكرمة',
    madinah: 'المدينة المنورة',
    dammam: 'الدمام',
    khobar: 'الخبر',
    taif: 'الطائف',
    tabuk: 'تبوك',
    buraidah: 'بريدة',
    hail: 'حائل',
    abha: 'أبها',
    jazan: 'جازان',
    najran: 'نجران',
  },
  EG: {
    cairo: 'القاهرة',
    alexandria: 'الإسكندرية',
    giza: 'الجيزة',
    shubra: 'شبرا الخيمة',
  },
  JO: {
    amman: 'عمّان',
    zarqa: 'الزرقاء',
    irbid: 'إربد',
  },
  AE: {
    dubai: 'دبي',
    abudhabi: 'أبوظبي',
    sharjah: 'الشارقة',
    ajman: 'عجمان',
  },
};

export const SORT_OPTIONS = {
  rating: 'التقييم',
  experience: 'الخبرة',
  price_low: 'السعر (الأقل)',
  price_high: 'السعر (الأعلى)',
  newest: 'الأحدث',
} as const;
