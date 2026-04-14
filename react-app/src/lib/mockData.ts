import type { Teacher, Category } from '@/types';

// Mock Categories
export const mockCategories: Category[] = [
  {
    id: 1,
    name: 'الرياضيات',
    icon: '📐',
    parent_id: null,
    sort_order: 1,
    children: [
      { id: 11, name: 'جبر', icon: null, parent_id: 1, sort_order: 1 },
      { id: 12, name: 'هندسة', icon: null, parent_id: 1, sort_order: 2 },
      { id: 13, name: 'إحصاء', icon: null, parent_id: 1, sort_order: 3 },
    ],
  },
  {
    id: 2,
    name: 'اللغة الإنجليزية',
    icon: '🇬🇧',
    parent_id: null,
    sort_order: 2,
    children: [
      { id: 21, name: 'قواعد', icon: null, parent_id: 2, sort_order: 1 },
      { id: 22, name: 'محادثة', icon: null, parent_id: 2, sort_order: 2 },
    ],
  },
  {
    id: 3,
    name: 'الفيزياء',
    icon: '⚛️',
    parent_id: null,
    sort_order: 3,
  },
  {
    id: 4,
    name: 'الكيمياء',
    icon: '🧪',
    parent_id: null,
    sort_order: 4,
  },
  {
    id: 5,
    name: 'اللغة العربية',
    icon: '📖',
    parent_id: null,
    sort_order: 5,
  },
  {
    id: 6,
    name: 'الأحياء',
    icon: '🧬',
    parent_id: null,
    sort_order: 6,
  },
  {
    id: 7,
    name: 'علوم الحاسب',
    icon: '💻',
    parent_id: null,
    sort_order: 7,
  },
];

// Mock Teachers
export const mockTeachers: Teacher[] = [
  {
    id: 1,
    user_id: 1,
    name: 'د. محمد العمري',
    profile_image: null,
    gender: 'male',
    nationality: 'saudi',
    qualification: 'phd',
    latest_qualification: 'دكتوراه في الرياضيات',
    bio: 'أستاذ جامعي متخصص في الرياضيات مع خبرة 15 عاماً في التدريس',
    hourly_rate: 150,
    rating: 4.9,
    total_ratings: 234,
    completed_hours: 1520,
    experience_years: 15,
    lesson_location: 'both',
    teaching_method: 'individual',
    country_code: 'SA',
    city_id: 1,
    is_active: true,
    created_at: '2024-01-01',
    updated_at: '2024-01-01',
    categories: [mockCategories[0], mockCategories[0].children![0]],
  },
  {
    id: 2,
    user_id: 2,
    name: 'أ. سارة الشهري',
    profile_image: null,
    gender: 'female',
    nationality: 'saudi',
    qualification: 'master',
    latest_qualification: 'ماجستير في اللغة الإنجليزية',
    bio: 'معلمة لغة إنجليزية متخصصة في IELTS و TOEFL',
    hourly_rate: 120,
    rating: 4.8,
    total_ratings: 189,
    completed_hours: 980,
    experience_years: 8,
    lesson_location: 'online',
    teaching_method: 'individual',
    country_code: 'SA',
    city_id: 1,
    is_active: true,
    created_at: '2024-01-02',
    updated_at: '2024-01-02',
    categories: [mockCategories[1]],
  },
  {
    id: 3,
    user_id: 3,
    name: 'د. أحمد الغامدي',
    profile_image: null,
    gender: 'male',
    nationality: 'saudi',
    qualification: 'phd',
    latest_qualification: 'دكتوراه في الفيزياء',
    bio: 'دكتور في الفيزياء النظرية مع خبرة في تدريس الثانوية والجامعة',
    hourly_rate: 180,
    rating: 4.95,
    total_ratings: 156,
    completed_hours: 890,
    experience_years: 12,
    lesson_location: 'both',
    teaching_method: 'individual',
    country_code: 'SA',
    city_id: 2,
    is_active: true,
    created_at: '2024-01-03',
    updated_at: '2024-01-03',
    categories: [mockCategories[2]],
  },
  {
    id: 4,
    user_id: 4,
    name: 'أ. نورة القحطاني',
    profile_image: null,
    gender: 'female',
    nationality: 'saudi',
    qualification: 'bachelor',
    latest_qualification: 'بكالوريوس كيمياء',
    bio: 'معلمة كيمياء للمرحلة الثانوية بأسلوب مبسط وممتع',
    hourly_rate: 100,
    rating: 4.7,
    total_ratings: 210,
    completed_hours: 760,
    experience_years: 6,
    lesson_location: 'online',
    teaching_method: 'group',
    country_code: 'SA',
    city_id: 1,
    is_active: true,
    created_at: '2024-01-04',
    updated_at: '2024-01-04',
    categories: [mockCategories[3]],
  },
  {
    id: 5,
    user_id: 5,
    name: 'أ. فهد الدوسري',
    profile_image: null,
    gender: 'male',
    nationality: 'saudi',
    qualification: 'master',
    latest_qualification: 'ماجستير لغة عربية',
    bio: 'متخصص في النحو والصرف والبلاغة مع خبرة في تدريس القدرات',
    hourly_rate: 130,
    rating: 4.85,
    total_ratings: 178,
    completed_hours: 1100,
    experience_years: 10,
    lesson_location: 'both',
    teaching_method: 'individual',
    country_code: 'SA',
    city_id: 3,
    is_active: true,
    created_at: '2024-01-05',
    updated_at: '2024-01-05',
    categories: [mockCategories[4]],
  },
  {
    id: 6,
    user_id: 6,
    name: 'د. ريم السعيد',
    profile_image: null,
    gender: 'female',
    nationality: 'saudi',
    qualification: 'phd',
    latest_qualification: 'دكتوراه أحياء',
    bio: 'أستاذة جامعية متخصصة في الأحياء الجزيئية والوراثة',
    hourly_rate: 160,
    rating: 4.9,
    total_ratings: 145,
    completed_hours: 670,
    experience_years: 9,
    lesson_location: 'online',
    teaching_method: 'individual',
    country_code: 'SA',
    city_id: 1,
    is_active: true,
    created_at: '2024-01-06',
    updated_at: '2024-01-06',
    categories: [mockCategories[5]],
  },
  {
    id: 7,
    user_id: 7,
    name: 'م. خالد المالكي',
    profile_image: null,
    gender: 'male',
    nationality: 'saudi',
    qualification: 'master',
    latest_qualification: 'ماجستير علوم حاسب',
    bio: 'مهندس برمجيات ومدرب معتمد في Python و JavaScript',
    hourly_rate: 140,
    rating: 4.8,
    total_ratings: 198,
    completed_hours: 920,
    experience_years: 7,
    lesson_location: 'online',
    teaching_method: 'individual',
    country_code: 'SA',
    city_id: 4,
    is_active: true,
    created_at: '2024-01-07',
    updated_at: '2024-01-07',
    categories: [mockCategories[6]],
  },
  {
    id: 8,
    user_id: 8,
    name: 'أ. عبدالله العتيبي',
    profile_image: null,
    gender: 'male',
    nationality: 'saudi',
    qualification: 'bachelor',
    latest_qualification: 'بكالوريوس رياضيات',
    bio: 'معلم رياضيات للمرحلة المتوسطة والثانوية بخبرة 5 سنوات',
    hourly_rate: 90,
    rating: 4.6,
    total_ratings: 167,
    completed_hours: 540,
    experience_years: 5,
    lesson_location: 'in_person',
    teaching_method: 'individual',
    country_code: 'SA',
    city_id: 1,
    is_active: true,
    created_at: '2024-01-08',
    updated_at: '2024-01-08',
    categories: [mockCategories[0]],
  },
  {
    id: 9,
    user_id: 9,
    name: 'أ. منى الحربي',
    profile_image: null,
    gender: 'female',
    nationality: 'saudi',
    qualification: 'master',
    latest_qualification: 'ماجستير فيزياء',
    bio: 'معلمة فيزياء متخصصة في تدريس مقررات الثانوية والقدرات',
    hourly_rate: 130,
    rating: 4.85,
    total_ratings: 156,
    completed_hours: 780,
    experience_years: 8,
    lesson_location: 'both',
    teaching_method: 'individual',
    country_code: 'SA',
    city_id: 2,
    is_active: true,
    created_at: '2024-01-09',
    updated_at: '2024-01-09',
    categories: [mockCategories[2]],
  },
  {
    id: 10,
    user_id: 10,
    name: 'د. سلطان الزهراني',
    profile_image: null,
    gender: 'male',
    nationality: 'saudi',
    qualification: 'phd',
    latest_qualification: 'دكتوراه كيمياء عضوية',
    bio: 'أستاذ جامعي متخصص في الكيمياء العضوية وتحليل المركبات',
    hourly_rate: 200,
    rating: 4.95,
    total_ratings: 89,
    completed_hours: 450,
    experience_years: 14,
    lesson_location: 'online',
    teaching_method: 'individual',
    country_code: 'SA',
    city_id: 1,
    is_active: true,
    created_at: '2024-01-10',
    updated_at: '2024-01-10',
    categories: [mockCategories[3]],
  },
  {
    id: 11,
    user_id: 11,
    name: 'أ. هيفاء القرني',
    profile_image: null,
    gender: 'female',
    nationality: 'saudi',
    qualification: 'bachelor',
    latest_qualification: 'بكالوريوس لغة إنجليزية',
    bio: 'معلمة لغة إنجليزية متخصصة في تأسيس الأطفال ومحادثة الكبار',
    hourly_rate: 85,
    rating: 4.7,
    total_ratings: 234,
    completed_hours: 1100,
    experience_years: 6,
    lesson_location: 'online',
    teaching_method: 'group',
    country_code: 'SA',
    city_id: 3,
    is_active: true,
    created_at: '2024-01-11',
    updated_at: '2024-01-11',
    categories: [mockCategories[1]],
  },
  {
    id: 12,
    user_id: 12,
    name: 'م. ياسر النفيعي',
    profile_image: null,
    gender: 'male',
    nationality: 'saudi',
    qualification: 'master',
    latest_qualification: 'ماجستير ذكاء اصطناعي',
    bio: 'مهندس ذكاء اصطناعي ومدرب معتمد في Machine Learning و Deep Learning',
    hourly_rate: 180,
    rating: 4.9,
    total_ratings: 112,
    completed_hours: 560,
    experience_years: 5,
    lesson_location: 'online',
    teaching_method: 'individual',
    country_code: 'SA',
    city_id: 1,
    is_active: true,
    created_at: '2024-01-12',
    updated_at: '2024-01-12',
    categories: [mockCategories[6]],
  },
  {
    id: 13,
    user_id: 13,
    name: 'أ. عائشة البلوي',
    profile_image: null,
    gender: 'female',
    nationality: 'saudi',
    qualification: 'master',
    latest_qualification: 'ماجستير لغة عربية',
    bio: 'متخصصة في تدريس النحو والصرف والبلاغة للمراحل الثانوية والجامعية',
    hourly_rate: 120,
    rating: 4.85,
    total_ratings: 198,
    completed_hours: 890,
    experience_years: 11,
    lesson_location: 'both',
    teaching_method: 'individual',
    country_code: 'SA',
    city_id: 4,
    is_active: true,
    created_at: '2024-01-13',
    updated_at: '2024-01-13',
    categories: [mockCategories[4]],
  },
  {
    id: 14,
    user_id: 14,
    name: 'د. عبدالرحمن الشمري',
    profile_image: null,
    gender: 'male',
    nationality: 'saudi',
    qualification: 'phd',
    latest_qualification: 'دكتوراه رياضيات تطبيقية',
    bio: 'أستاذ مشارك في جامعة الملك سعود متخصص في التحليل العددي',
    hourly_rate: 220,
    rating: 4.98,
    total_ratings: 67,
    completed_hours: 380,
    experience_years: 18,
    lesson_location: 'online',
    teaching_method: 'individual',
    country_code: 'SA',
    city_id: 1,
    is_active: true,
    created_at: '2024-01-14',
    updated_at: '2024-01-14',
    categories: [mockCategories[0], mockCategories[0].children![2]],
  },
  {
    id: 15,
    user_id: 15,
    name: 'أ. لمى الدوسري',
    profile_image: null,
    gender: 'female',
    nationality: 'saudi',
    qualification: 'bachelor',
    latest_qualification: 'بكالوريوس أحياء',
    bio: 'معلمة أحياء للمرحلة الثانوية بأسلوب تفاعلي ومبسط',
    hourly_rate: 95,
    rating: 4.75,
    total_ratings: 189,
    completed_hours: 720,
    experience_years: 4,
    lesson_location: 'both',
    teaching_method: 'group',
    country_code: 'SA',
    city_id: 2,
    is_active: true,
    created_at: '2024-01-15',
    updated_at: '2024-01-15',
    categories: [mockCategories[5]],
  },
  {
    id: 16,
    user_id: 16,
    name: 'م. فيصل العنزي',
    profile_image: null,
    gender: 'male',
    nationality: 'saudi',
    qualification: 'master',
    latest_qualification: 'ماجستير هندسة برمجيات',
    bio: 'مطور تطبيقات ومدرب في تطوير الويب والموبايل Flutter و React',
    hourly_rate: 150,
    rating: 4.88,
    total_ratings: 145,
    completed_hours: 680,
    experience_years: 6,
    lesson_location: 'online',
    teaching_method: 'individual',
    country_code: 'SA',
    city_id: 1,
    is_active: true,
    created_at: '2024-01-16',
    updated_at: '2024-01-16',
    categories: [mockCategories[6]],
  },
];

// Filter and sort functions
export function filterTeachers(
  teachers: Teacher[],
  filters: {
    search?: string;
    gender?: string;
    qualification?: string;
    lessonLocation?: string;
    nationality?: string;
    categoryId?: number | null;
    sortBy?: string;
  }
): Teacher[] {
  let filtered = [...teachers];

  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(
      (t) =>
        t.name.toLowerCase().includes(searchLower) ||
        t.bio?.toLowerCase().includes(searchLower)
    );
  }

  if (filters.gender) {
    filtered = filtered.filter((t) => t.gender === filters.gender);
  }

  if (filters.qualification) {
    filtered = filtered.filter((t) => t.qualification === filters.qualification);
  }

  if (filters.lessonLocation) {
    filtered = filtered.filter(
      (t) =>
        t.lesson_location === filters.lessonLocation ||
        t.lesson_location === 'both'
    );
  }

  if (filters.nationality) {
    filtered = filtered.filter((t) => t.nationality === filters.nationality);
  }

  if (filters.categoryId) {
    filtered = filtered.filter((t) =>
      t.categories?.some(
        (c) => c.id === filters.categoryId || c.parent_id === filters.categoryId
      )
    );
  }

  // Sort
  switch (filters.sortBy) {
    case 'experience':
      filtered.sort((a, b) => b.experience_years - a.experience_years);
      break;
    case 'price_low':
      filtered.sort((a, b) => a.hourly_rate - b.hourly_rate);
      break;
    case 'price_high':
      filtered.sort((a, b) => b.hourly_rate - a.hourly_rate);
      break;
    case 'newest':
      filtered.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      break;
    default: // rating
      filtered.sort((a, b) => b.rating - a.rating);
  }

  return filtered;
}
