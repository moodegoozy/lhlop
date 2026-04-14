import type {
  User,
  TeacherProfile,
  Subject,
  Service,
  City,
  Booking,
  Review,
  ChildProfile,
  TeacherAvailability,
  TeacherCertificate,
  Notification,
} from '@/types';

// ============================================
// Users
// ============================================

export const mockUsers: User[] = [
  // Admin
  {
    id: 'user_admin_1',
    email: 'admin@eduplatform.sa',
    phone: '+966500000001',
    full_name: 'أحمد المدير',
    avatar_url: null,
    role: 'admin',
    is_active: true,
    is_verified: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  // Teachers
  {
    id: 'user_teacher_1',
    email: 'mohammed@teacher.sa',
    phone: '+966500000010',
    full_name: 'د. محمد العمري',
    avatar_url: null,
    role: 'teacher',
    is_active: true,
    is_verified: true,
    created_at: '2024-01-10T00:00:00Z',
    updated_at: '2024-01-10T00:00:00Z',
  },
  {
    id: 'user_teacher_2',
    email: 'sara@teacher.sa',
    phone: '+966500000011',
    full_name: 'أ. سارة الشهري',
    avatar_url: null,
    role: 'teacher',
    is_active: true,
    is_verified: true,
    created_at: '2024-01-11T00:00:00Z',
    updated_at: '2024-01-11T00:00:00Z',
  },
  {
    id: 'user_teacher_3',
    email: 'khalid@teacher.sa',
    phone: '+966500000012',
    full_name: 'د. خالد الغامدي',
    avatar_url: null,
    role: 'teacher',
    is_active: true,
    is_verified: true,
    created_at: '2024-01-12T00:00:00Z',
    updated_at: '2024-01-12T00:00:00Z',
  },
  {
    id: 'user_teacher_4',
    email: 'noura@teacher.sa',
    phone: '+966500000013',
    full_name: 'أ. نورة القحطاني',
    avatar_url: null,
    role: 'teacher',
    is_active: true,
    is_verified: true,
    created_at: '2024-01-13T00:00:00Z',
    updated_at: '2024-01-13T00:00:00Z',
  },
  {
    id: 'user_teacher_5',
    email: 'fahad@teacher.sa',
    phone: '+966500000014',
    full_name: 'م. فهد الدوسري',
    avatar_url: null,
    role: 'teacher',
    is_active: true,
    is_verified: true,
    created_at: '2024-01-14T00:00:00Z',
    updated_at: '2024-01-14T00:00:00Z',
  },
  {
    id: 'user_teacher_6',
    email: 'reem@teacher.sa',
    phone: '+966500000015',
    full_name: 'د. ريم السعيد',
    avatar_url: null,
    role: 'teacher',
    is_active: true,
    is_verified: true,
    created_at: '2024-01-15T00:00:00Z',
    updated_at: '2024-01-15T00:00:00Z',
  },
  // Parents
  {
    id: 'user_parent_1',
    email: 'parent1@email.com',
    phone: '+966500000020',
    full_name: 'عبدالله المطيري',
    avatar_url: null,
    role: 'parent',
    is_active: true,
    is_verified: true,
    created_at: '2024-02-01T00:00:00Z',
    updated_at: '2024-02-01T00:00:00Z',
  },
  {
    id: 'user_parent_2',
    email: 'parent2@email.com',
    phone: '+966500000021',
    full_name: 'فاطمة الزهراني',
    avatar_url: null,
    role: 'parent',
    is_active: true,
    is_verified: true,
    created_at: '2024-02-02T00:00:00Z',
    updated_at: '2024-02-02T00:00:00Z',
  },
  // Children
  {
    id: 'user_child_1',
    email: 'child1@email.com',
    phone: null,
    full_name: 'يوسف عبدالله',
    avatar_url: null,
    role: 'child',
    is_active: true,
    is_verified: true,
    created_at: '2024-02-01T00:00:00Z',
    updated_at: '2024-02-01T00:00:00Z',
  },
  {
    id: 'user_child_2',
    email: 'child2@email.com',
    phone: null,
    full_name: 'ليان عبدالله',
    avatar_url: null,
    role: 'child',
    is_active: true,
    is_verified: true,
    created_at: '2024-02-01T00:00:00Z',
    updated_at: '2024-02-01T00:00:00Z',
  },
  // Students
  {
    id: 'user_student_1',
    email: 'student1@email.com',
    phone: '+966500000030',
    full_name: 'أحمد الحربي',
    avatar_url: null,
    role: 'student',
    is_active: true,
    is_verified: true,
    created_at: '2024-02-10T00:00:00Z',
    updated_at: '2024-02-10T00:00:00Z',
  },
  {
    id: 'user_student_2',
    email: 'student2@email.com',
    phone: '+966500000031',
    full_name: 'منى العتيبي',
    avatar_url: null,
    role: 'student',
    is_active: true,
    is_verified: true,
    created_at: '2024-02-11T00:00:00Z',
    updated_at: '2024-02-11T00:00:00Z',
  },
];

// ============================================
// Subjects
// ============================================

export const mockSubjects: Subject[] = [
  { id: 'subj_1', name_ar: 'الرياضيات', name_en: 'Mathematics', icon: '📐', is_active: true, sort_order: 1, created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
  { id: 'subj_2', name_ar: 'اللغة الإنجليزية', name_en: 'English', icon: '🇬🇧', is_active: true, sort_order: 2, created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
  { id: 'subj_3', name_ar: 'الفيزياء', name_en: 'Physics', icon: '⚛️', is_active: true, sort_order: 3, created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
  { id: 'subj_4', name_ar: 'الكيمياء', name_en: 'Chemistry', icon: '🧪', is_active: true, sort_order: 4, created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
  { id: 'subj_5', name_ar: 'اللغة العربية', name_en: 'Arabic', icon: '📖', is_active: true, sort_order: 5, created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
  { id: 'subj_6', name_ar: 'الأحياء', name_en: 'Biology', icon: '🧬', is_active: true, sort_order: 6, created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
  { id: 'subj_7', name_ar: 'علوم الحاسب', name_en: 'Computer Science', icon: '💻', is_active: true, sort_order: 7, created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
  { id: 'subj_8', name_ar: 'القدرات', name_en: 'Qudurat', icon: '🎯', is_active: true, sort_order: 8, created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
  { id: 'subj_9', name_ar: 'التحصيلي', name_en: 'Tahsili', icon: '📝', is_active: true, sort_order: 9, created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
];

// ============================================
// Services
// ============================================

export const mockServices: Service[] = [
  { id: 'serv_1', name_ar: 'دروس خصوصية', name_en: 'Private Tutoring', description_ar: 'دروس فردية مع المعلم', description_en: 'One-on-one lessons', is_active: true, sort_order: 1, created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
  { id: 'serv_2', name_ar: 'مجموعات صغيرة', name_en: 'Small Groups', description_ar: 'دروس لمجموعات من 2-5 طلاب', description_en: 'Lessons for 2-5 students', is_active: true, sort_order: 2, created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
  { id: 'serv_3', name_ar: 'مراجعة للاختبارات', name_en: 'Exam Preparation', description_ar: 'تحضير مكثف للاختبارات', description_en: 'Intensive exam prep', is_active: true, sort_order: 3, created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
  { id: 'serv_4', name_ar: 'تأسيس', name_en: 'Foundation', description_ar: 'بناء الأساسيات في المادة', description_en: 'Building fundamentals', is_active: true, sort_order: 4, created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
  { id: 'serv_5', name_ar: 'تقوية', name_en: 'Reinforcement', description_ar: 'تعزيز الفهم والمهارات', description_en: 'Strengthening skills', is_active: true, sort_order: 5, created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
];

// ============================================
// Cities
// ============================================

export const mockCities: City[] = [
  { id: 'city_1', name_ar: 'الرياض', name_en: 'Riyadh', region: 'منطقة الرياض', is_active: true, sort_order: 1, created_at: '2024-01-01T00:00:00Z' },
  { id: 'city_2', name_ar: 'جدة', name_en: 'Jeddah', region: 'منطقة مكة المكرمة', is_active: true, sort_order: 2, created_at: '2024-01-01T00:00:00Z' },
  { id: 'city_3', name_ar: 'مكة المكرمة', name_en: 'Makkah', region: 'منطقة مكة المكرمة', is_active: true, sort_order: 3, created_at: '2024-01-01T00:00:00Z' },
  { id: 'city_4', name_ar: 'المدينة المنورة', name_en: 'Madinah', region: 'منطقة المدينة المنورة', is_active: true, sort_order: 4, created_at: '2024-01-01T00:00:00Z' },
  { id: 'city_5', name_ar: 'الدمام', name_en: 'Dammam', region: 'المنطقة الشرقية', is_active: true, sort_order: 5, created_at: '2024-01-01T00:00:00Z' },
  { id: 'city_6', name_ar: 'الخبر', name_en: 'Khobar', region: 'المنطقة الشرقية', is_active: true, sort_order: 6, created_at: '2024-01-01T00:00:00Z' },
  { id: 'city_7', name_ar: 'الطائف', name_en: 'Taif', region: 'منطقة مكة المكرمة', is_active: true, sort_order: 7, created_at: '2024-01-01T00:00:00Z' },
  { id: 'city_8', name_ar: 'أبها', name_en: 'Abha', region: 'منطقة عسير', is_active: true, sort_order: 8, created_at: '2024-01-01T00:00:00Z' },
];

// ============================================
// Teacher Profiles
// ============================================

export const mockTeacherProfiles: TeacherProfile[] = [
  {
    id: 'tp_1',
    user_id: 'user_teacher_1',
    user: mockUsers.find(u => u.id === 'user_teacher_1'),
    bio: 'أستاذ جامعي متخصص في الرياضيات مع خبرة 15 عامًا في التدريس. حاصل على دكتوراه من جامعة الملك سعود.',
    nationality: 'saudi',
    specialization: 'الرياضيات التطبيقية',
    degree: 'phd',
    years_of_experience: 15,
    lesson_price: 150,
    lesson_duration: 60,
    lesson_mode: 'both',
    city_id: 'city_1',
    city: mockCities.find(c => c.id === 'city_1'),
    service_area_text: 'شمال الرياض، حي الملقا، حي الياسمين',
    average_rating: 4.9,
    total_reviews: 234,
    approval_status: 'approved',
    is_verified: true,
    subjects: [mockSubjects[0], mockSubjects[7], mockSubjects[8]],
    services: [mockServices[0], mockServices[2], mockServices[4]],
    created_at: '2024-01-10T00:00:00Z',
    updated_at: '2024-01-10T00:00:00Z',
  },
  {
    id: 'tp_2',
    user_id: 'user_teacher_2',
    user: mockUsers.find(u => u.id === 'user_teacher_2'),
    bio: 'معلمة لغة إنجليزية متخصصة في IELTS و TOEFL مع خبرة 8 سنوات. حاصلة على شهادات دولية معتمدة.',
    nationality: 'saudi',
    specialization: 'اللغة الإنجليزية',
    degree: 'master',
    years_of_experience: 8,
    lesson_price: 120,
    lesson_duration: 60,
    lesson_mode: 'remote',
    city_id: 'city_1',
    city: mockCities.find(c => c.id === 'city_1'),
    service_area_text: null,
    average_rating: 4.8,
    total_reviews: 189,
    approval_status: 'approved',
    is_verified: true,
    subjects: [mockSubjects[1]],
    services: [mockServices[0], mockServices[2]],
    created_at: '2024-01-11T00:00:00Z',
    updated_at: '2024-01-11T00:00:00Z',
  },
  {
    id: 'tp_3',
    user_id: 'user_teacher_3',
    user: mockUsers.find(u => u.id === 'user_teacher_3'),
    bio: 'دكتور في الفيزياء النظرية مع خبرة في تدريس المرحلة الثانوية والجامعية. أسلوب تدريس تفاعلي ومبسط.',
    nationality: 'saudi',
    specialization: 'الفيزياء النظرية',
    degree: 'phd',
    years_of_experience: 12,
    lesson_price: 180,
    lesson_duration: 90,
    lesson_mode: 'both',
    city_id: 'city_2',
    city: mockCities.find(c => c.id === 'city_2'),
    service_area_text: 'جدة، شمال وغرب المدينة',
    average_rating: 4.95,
    total_reviews: 156,
    approval_status: 'approved',
    is_verified: true,
    subjects: [mockSubjects[2]],
    services: [mockServices[0], mockServices[2], mockServices[4]],
    created_at: '2024-01-12T00:00:00Z',
    updated_at: '2024-01-12T00:00:00Z',
  },
  {
    id: 'tp_4',
    user_id: 'user_teacher_4',
    user: mockUsers.find(u => u.id === 'user_teacher_4'),
    bio: 'معلمة كيمياء للمرحلة الثانوية بأسلوب مبسط وممتع. متخصصة في تأسيس الطلاب وتقوية فهمهم.',
    nationality: 'saudi',
    specialization: 'الكيمياء العامة',
    degree: 'bachelor',
    years_of_experience: 6,
    lesson_price: 100,
    lesson_duration: 60,
    lesson_mode: 'remote',
    city_id: 'city_1',
    city: mockCities.find(c => c.id === 'city_1'),
    service_area_text: null,
    average_rating: 4.7,
    total_reviews: 210,
    approval_status: 'approved',
    is_verified: true,
    subjects: [mockSubjects[3]],
    services: [mockServices[0], mockServices[1], mockServices[3]],
    created_at: '2024-01-13T00:00:00Z',
    updated_at: '2024-01-13T00:00:00Z',
  },
  {
    id: 'tp_5',
    user_id: 'user_teacher_5',
    user: mockUsers.find(u => u.id === 'user_teacher_5'),
    bio: 'متخصص في النحو والصرف والبلاغة مع خبرة في تدريس اختبارات القدرات. حاصل على ماجستير في اللغة العربية.',
    nationality: 'saudi',
    specialization: 'اللغة العربية وآدابها',
    degree: 'master',
    years_of_experience: 10,
    lesson_price: 130,
    lesson_duration: 60,
    lesson_mode: 'both',
    city_id: 'city_3',
    city: mockCities.find(c => c.id === 'city_3'),
    service_area_text: 'مكة المكرمة، حي العزيزية',
    average_rating: 4.85,
    total_reviews: 178,
    approval_status: 'approved',
    is_verified: true,
    subjects: [mockSubjects[4], mockSubjects[7]],
    services: [mockServices[0], mockServices[2]],
    created_at: '2024-01-14T00:00:00Z',
    updated_at: '2024-01-14T00:00:00Z',
  },
  {
    id: 'tp_6',
    user_id: 'user_teacher_6',
    user: mockUsers.find(u => u.id === 'user_teacher_6'),
    bio: 'أستاذة جامعية متخصصة في الأحياء الجزيئية والوراثة. خبرة واسعة في تدريس طلاب الطب والعلوم.',
    nationality: 'saudi',
    specialization: 'الأحياء الجزيئية',
    degree: 'phd',
    years_of_experience: 9,
    lesson_price: 160,
    lesson_duration: 60,
    lesson_mode: 'remote',
    city_id: 'city_1',
    city: mockCities.find(c => c.id === 'city_1'),
    service_area_text: null,
    average_rating: 4.9,
    total_reviews: 145,
    approval_status: 'approved',
    is_verified: true,
    subjects: [mockSubjects[5]],
    services: [mockServices[0], mockServices[4]],
    created_at: '2024-01-15T00:00:00Z',
    updated_at: '2024-01-15T00:00:00Z',
  },
];

// ============================================
// Teacher Availability
// ============================================

export const mockTeacherAvailability: TeacherAvailability[] = [
  // Teacher 1
  { id: 'avail_1', teacher_profile_id: 'tp_1', day_of_week: 0, start_time: '16:00', end_time: '21:00', is_active: true },
  { id: 'avail_2', teacher_profile_id: 'tp_1', day_of_week: 1, start_time: '16:00', end_time: '21:00', is_active: true },
  { id: 'avail_3', teacher_profile_id: 'tp_1', day_of_week: 2, start_time: '16:00', end_time: '21:00', is_active: true },
  { id: 'avail_4', teacher_profile_id: 'tp_1', day_of_week: 3, start_time: '16:00', end_time: '21:00', is_active: true },
  { id: 'avail_5', teacher_profile_id: 'tp_1', day_of_week: 4, start_time: '16:00', end_time: '21:00', is_active: true },
  // Teacher 2
  { id: 'avail_6', teacher_profile_id: 'tp_2', day_of_week: 0, start_time: '09:00', end_time: '14:00', is_active: true },
  { id: 'avail_7', teacher_profile_id: 'tp_2', day_of_week: 1, start_time: '09:00', end_time: '14:00', is_active: true },
  { id: 'avail_8', teacher_profile_id: 'tp_2', day_of_week: 2, start_time: '09:00', end_time: '14:00', is_active: true },
  { id: 'avail_9', teacher_profile_id: 'tp_2', day_of_week: 6, start_time: '10:00', end_time: '18:00', is_active: true },
  // Teacher 3
  { id: 'avail_10', teacher_profile_id: 'tp_3', day_of_week: 0, start_time: '17:00', end_time: '22:00', is_active: true },
  { id: 'avail_11', teacher_profile_id: 'tp_3', day_of_week: 2, start_time: '17:00', end_time: '22:00', is_active: true },
  { id: 'avail_12', teacher_profile_id: 'tp_3', day_of_week: 4, start_time: '17:00', end_time: '22:00', is_active: true },
];

// ============================================
// Teacher Certificates
// ============================================

export const mockTeacherCertificates: TeacherCertificate[] = [
  { id: 'cert_1', teacher_profile_id: 'tp_1', title: 'دكتوراه في الرياضيات التطبيقية', issuer: 'جامعة الملك سعود', issue_date: '2015-06-01', file_url: '/certificates/cert1.pdf', created_at: '2024-01-10T00:00:00Z' },
  { id: 'cert_2', teacher_profile_id: 'tp_2', title: 'IELTS Instructor Certificate', issuer: 'British Council', issue_date: '2020-03-15', file_url: '/certificates/cert2.pdf', created_at: '2024-01-11T00:00:00Z' },
  { id: 'cert_3', teacher_profile_id: 'tp_2', title: 'TOEFL iBT Propell Workshop', issuer: 'ETS', issue_date: '2021-08-20', file_url: '/certificates/cert3.pdf', created_at: '2024-01-11T00:00:00Z' },
  { id: 'cert_4', teacher_profile_id: 'tp_3', title: 'دكتوراه في الفيزياء النظرية', issuer: 'جامعة الملك عبدالعزيز', issue_date: '2018-01-10', file_url: '/certificates/cert4.pdf', created_at: '2024-01-12T00:00:00Z' },
];

// ============================================
// Child Profiles
// ============================================

export const mockChildProfiles: ChildProfile[] = [
  {
    id: 'cp_1',
    parent_user_id: 'user_parent_1',
    child_user_id: 'user_child_1',
    child_user: mockUsers.find(u => u.id === 'user_child_1'),
    full_name: 'يوسف عبدالله',
    age: 14,
    grade_level: 'middle_3',
    learning_notes: 'يحتاج تركيز على مادة الرياضيات، ويفضل الشرح بالأمثلة',
    preferred_subjects: ['subj_1', 'subj_3'],
    is_active: true,
    created_at: '2024-02-01T00:00:00Z',
    updated_at: '2024-02-01T00:00:00Z',
  },
  {
    id: 'cp_2',
    parent_user_id: 'user_parent_1',
    child_user_id: 'user_child_2',
    child_user: mockUsers.find(u => u.id === 'user_child_2'),
    full_name: 'ليان عبدالله',
    age: 11,
    grade_level: 'primary_5',
    learning_notes: 'تحتاج تأسيس في اللغة الإنجليزية',
    preferred_subjects: ['subj_2'],
    is_active: true,
    created_at: '2024-02-01T00:00:00Z',
    updated_at: '2024-02-01T00:00:00Z',
  },
];

// ============================================
// Bookings
// ============================================

export const mockBookings: Booking[] = [
  {
    id: 'booking_1',
    teacher_user_id: 'user_teacher_1',
    teacher: mockTeacherProfiles.find(t => t.user_id === 'user_teacher_1'),
    booked_by_user_id: 'user_parent_1',
    booked_by_user: mockUsers.find(u => u.id === 'user_parent_1'),
    booked_for_type: 'child',
    booked_for_user_id: 'user_child_1',
    booked_for_user: mockUsers.find(u => u.id === 'user_child_1'),
    subject_id: 'subj_1',
    subject: mockSubjects.find(s => s.id === 'subj_1'),
    service_id: 'serv_1',
    service: mockServices.find(s => s.id === 'serv_1'),
    lesson_mode: 'in_person',
    booking_date: '2024-04-15',
    start_time: '16:00',
    end_time: '17:00',
    notes: 'يحتاج مراجعة الجبر',
    status: 'confirmed',
    price_snapshot: 150,
    duration_snapshot: 60,
    created_at: '2024-04-10T00:00:00Z',
    updated_at: '2024-04-10T00:00:00Z',
  },
  {
    id: 'booking_2',
    teacher_user_id: 'user_teacher_2',
    teacher: mockTeacherProfiles.find(t => t.user_id === 'user_teacher_2'),
    booked_by_user_id: 'user_student_1',
    booked_by_user: mockUsers.find(u => u.id === 'user_student_1'),
    booked_for_type: 'self',
    booked_for_user_id: 'user_student_1',
    booked_for_user: mockUsers.find(u => u.id === 'user_student_1'),
    subject_id: 'subj_2',
    subject: mockSubjects.find(s => s.id === 'subj_2'),
    service_id: 'serv_2',
    service: mockServices.find(s => s.id === 'serv_2'),
    lesson_mode: 'remote',
    booking_date: '2024-04-16',
    start_time: '10:00',
    end_time: '11:00',
    notes: 'تحضير لاختبار IELTS',
    status: 'pending',
    price_snapshot: 120,
    duration_snapshot: 60,
    created_at: '2024-04-11T00:00:00Z',
    updated_at: '2024-04-11T00:00:00Z',
  },
  {
    id: 'booking_3',
    teacher_user_id: 'user_teacher_3',
    teacher: mockTeacherProfiles.find(t => t.user_id === 'user_teacher_3'),
    booked_by_user_id: 'user_parent_1',
    booked_by_user: mockUsers.find(u => u.id === 'user_parent_1'),
    booked_for_type: 'self',
    booked_for_user_id: 'user_parent_1',
    booked_for_user: mockUsers.find(u => u.id === 'user_parent_1'),
    subject_id: 'subj_3',
    subject: mockSubjects.find(s => s.id === 'subj_3'),
    service_id: 'serv_1',
    service: mockServices.find(s => s.id === 'serv_1'),
    lesson_mode: 'remote',
    booking_date: '2024-04-14',
    start_time: '18:00',
    end_time: '19:30',
    notes: null,
    status: 'completed',
    price_snapshot: 180,
    duration_snapshot: 90,
    created_at: '2024-04-05T00:00:00Z',
    updated_at: '2024-04-14T20:00:00Z',
  },
];

// ============================================
// Reviews
// ============================================

export const mockReviews: Review[] = [
  {
    id: 'review_1',
    booking_id: 'booking_3',
    reviewer_user_id: 'user_parent_1',
    reviewer: mockUsers.find(u => u.id === 'user_parent_1'),
    teacher_user_id: 'user_teacher_3',
    teacher: mockUsers.find(u => u.id === 'user_teacher_3'),
    rating: 5,
    comment: 'معلم ممتاز! أسلوب شرح رائع ومبسط. أنصح به بشدة.',
    is_visible: true,
    created_at: '2024-04-14T21:00:00Z',
  },
];

// ============================================
// Notifications
// ============================================

export const mockNotifications: Notification[] = [
  {
    id: 'notif_1',
    user_id: 'user_teacher_1',
    title: 'حجز جديد',
    body: 'لديك طلب حجز جديد من عبدالله المطيري',
    type: 'booking',
    reference_id: 'booking_1',
    reference_type: 'booking',
    is_read: false,
    created_at: '2024-04-10T00:00:00Z',
  },
  {
    id: 'notif_2',
    user_id: 'user_parent_1',
    title: 'تم تأكيد الحجز',
    body: 'تم تأكيد حجزك مع د. محمد العمري',
    type: 'booking',
    reference_id: 'booking_1',
    reference_type: 'booking',
    is_read: true,
    created_at: '2024-04-10T01:00:00Z',
  },
];

// ============================================
// Helper Functions
// ============================================

export function getTeacherById(id: string): TeacherProfile | undefined {
  return mockTeacherProfiles.find(t => t.id === id || t.user_id === id);
}

export function getTeacherByUserId(userId: string): TeacherProfile | undefined {
  return mockTeacherProfiles.find(t => t.user_id === userId);
}

export function getUserById(id: string): User | undefined {
  return mockUsers.find(u => u.id === id);
}

export function getBookingsByUserId(userId: string): Booking[] {
  return mockBookings.filter(b => 
    b.booked_by_user_id === userId || 
    b.booked_for_user_id === userId ||
    b.teacher_user_id === userId
  );
}

export function getChildrenByParentId(parentId: string): ChildProfile[] {
  return mockChildProfiles.filter(c => c.parent_user_id === parentId);
}

export function getNotificationsByUserId(userId: string): Notification[] {
  return mockNotifications.filter(n => n.user_id === userId);
}
