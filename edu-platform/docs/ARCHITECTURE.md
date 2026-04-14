# 🏗️ Educational Booking Platform - Architecture Document

## 📋 Project Overview

**اسم المشروع:** منصة حجز الدروس التعليمية  
**الهدف:** ربط المعلمين بالطلاب وأولياء الأمور لحجز الدروس الخصوصية  
**الأولوية:** Mobile-First + Arabic RTL  

---

## 🎭 User Roles & Permissions

### Role Permission Matrix

| Permission | Admin | Teacher | Parent | Child | Student | Guest |
|------------|-------|---------|--------|-------|---------|-------|
| View Public Pages | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Browse Teachers | ✅ | ✅ | ✅ | ❌ | ✅ | ✅ |
| View Teacher Details | ✅ | ✅ | ✅ | ❌ | ✅ | ✅ |
| Create Booking | ✅ | ❌ | ✅ | ❌ | ✅ | ❌ |
| Manage Own Profile | ✅ | ✅ | ✅ | 🔶 | ✅ | ❌ |
| Create Child Account | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ |
| Manage Children | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ |
| Book for Child | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ |
| View Own Bookings | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| Manage Availability | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Accept/Review Bookings | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Leave Reviews | ❌ | ❌ | ✅ | ❌ | ✅ | ❌ |
| Manage All Users | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Approve Teachers | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Manage Subjects/Services | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| View Reports | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| View System Logs | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |

🔶 = Limited Access (Child can only view, not edit sensitive data)

---

## 🗺️ Route Map

### Public Routes (/)
```
/                           → Landing Page
/teachers                   → Teachers Listing
/teachers/[teacherId]       → Teacher Profile
/about                      → About Us
/contact                    → Contact Us
/faq                        → FAQ
/privacy                    → Privacy Policy
/terms                      → Terms & Conditions
```

### Auth Routes (/auth)
```
/auth/login                 → Login Page
/auth/register              → Register (Role Selection)
/auth/register/teacher      → Teacher Registration
/auth/register/parent       → Parent Registration
/auth/register/student      → Student Registration
/auth/forgot-password       → Forgot Password
/auth/reset-password        → Reset Password
```

### Admin Dashboard (/dashboard/admin)
```
/dashboard/admin                → Admin Overview
/dashboard/admin/users          → All Users Management
/dashboard/admin/teachers       → Teachers Management
/dashboard/admin/approvals      → Teacher Approvals Queue
/dashboard/admin/bookings       → All Bookings
/dashboard/admin/subjects       → Subjects Management
/dashboard/admin/services       → Services Management
/dashboard/admin/cities         → Cities Management
/dashboard/admin/reports        → Reports & Analytics
/dashboard/admin/logs           → System Logs
/dashboard/admin/settings       → Platform Settings
```

### Teacher Dashboard (/dashboard/teacher)
```
/dashboard/teacher              → Teacher Overview
/dashboard/teacher/profile      → Profile Management
/dashboard/teacher/availability → Availability Settings
/dashboard/teacher/bookings     → My Bookings
/dashboard/teacher/reviews      → My Reviews
/dashboard/teacher/certificates → Certificates Management
```

### Parent Dashboard (/dashboard/parent)
```
/dashboard/parent               → Parent Overview
/dashboard/parent/profile       → Profile Management
/dashboard/parent/children      → Children Management
/dashboard/parent/children/new  → Add New Child
/dashboard/parent/children/[id] → Edit Child
/dashboard/parent/bookings      → All Bookings (Self + Children)
/dashboard/parent/notifications → Notifications
```

### Child Dashboard (/dashboard/child)
```
/dashboard/child                → Child Overview
/dashboard/child/lessons        → My Lessons
/dashboard/child/schedule       → My Schedule
```

### Student Dashboard (/dashboard/student)
```
/dashboard/student              → Student Overview
/dashboard/student/profile      → Profile Management
/dashboard/student/bookings     → My Bookings
/dashboard/student/schedule     → My Schedule
/dashboard/student/reviews      → My Reviews
```

### Booking Routes (/booking)
```
/booking/[teacherId]            → Create Booking
/booking/details/[bookingId]    → Booking Details
```

---

## 🗄️ Database Schema

### Core Tables

#### 1. users
```typescript
{
  id: string;                    // UUID
  email: string;                 // Unique
  phone?: string;
  password_hash?: string;        // For email/password auth
  full_name: string;
  avatar_url?: string;
  role: 'admin' | 'teacher' | 'parent' | 'child' | 'student';
  is_active: boolean;            // Account status
  is_verified: boolean;          // Email/Phone verified
  created_at: timestamp;
  updated_at: timestamp;
}
```

#### 2. teacher_profiles
```typescript
{
  id: string;
  user_id: string;               // FK to users
  bio?: string;
  nationality?: string;
  specialization?: string;
  degree?: string;
  years_of_experience: number;
  lesson_price: number;          // Price per hour in SAR
  lesson_duration: number;       // Duration in minutes
  lesson_mode: 'in_person' | 'remote' | 'both';
  city_id?: string;              // FK to cities
  service_area_text?: string;    // Free text for service area
  average_rating: number;        // Calculated field
  total_reviews: number;         // Calculated field
  approval_status: 'pending' | 'approved' | 'rejected';
  created_at: timestamp;
  updated_at: timestamp;
}
```

#### 3. parent_profiles
```typescript
{
  id: string;
  user_id: string;               // FK to users
  created_at: timestamp;
  updated_at: timestamp;
}
```

#### 4. student_profiles
```typescript
{
  id: string;
  user_id: string;               // FK to users
  grade_level?: string;
  preferred_subjects?: string[]; // Array of subject IDs
  created_at: timestamp;
  updated_at: timestamp;
}
```

#### 5. child_profiles
```typescript
{
  id: string;
  parent_user_id: string;        // FK to users (parent)
  child_user_id: string;         // FK to users (child account)
  full_name: string;
  age: number;
  grade_level?: string;
  learning_notes?: string;
  preferred_subjects?: string[];
  is_active: boolean;
  created_at: timestamp;
  updated_at: timestamp;
}
```

#### 6. subjects
```typescript
{
  id: string;
  name_ar: string;
  name_en: string;
  icon?: string;
  is_active: boolean;
  sort_order: number;
  created_at: timestamp;
  updated_at: timestamp;
}
```

#### 7. services
```typescript
{
  id: string;
  name_ar: string;
  name_en: string;
  description_ar?: string;
  description_en?: string;
  is_active: boolean;
  sort_order: number;
  created_at: timestamp;
  updated_at: timestamp;
}
```

#### 8. cities
```typescript
{
  id: string;
  name_ar: string;
  name_en: string;
  region?: string;
  is_active: boolean;
  sort_order: number;
  created_at: timestamp;
}
```

#### 9. teacher_subjects (Junction)
```typescript
{
  id: string;
  teacher_profile_id: string;
  subject_id: string;
}
```

#### 10. teacher_services (Junction)
```typescript
{
  id: string;
  teacher_profile_id: string;
  service_id: string;
}
```

#### 11. teacher_certificates
```typescript
{
  id: string;
  teacher_profile_id: string;
  title: string;
  issuer?: string;
  issue_date?: date;
  file_url: string;
  created_at: timestamp;
}
```

#### 12. teacher_availability
```typescript
{
  id: string;
  teacher_profile_id: string;
  day_of_week: 0-6;              // 0 = Sunday
  start_time: string;            // HH:MM format
  end_time: string;              // HH:MM format
  is_active: boolean;
}
```

#### 13. bookings
```typescript
{
  id: string;
  teacher_user_id: string;       // FK to users (teacher)
  booked_by_user_id: string;     // FK to users (who made the booking)
  booked_for_type: 'self' | 'child';
  booked_for_user_id: string;    // FK to users (who will attend)
  subject_id: string;            // FK to subjects
  service_id: string;            // FK to services
  lesson_mode: 'in_person' | 'remote';
  booking_date: date;
  start_time: string;            // HH:MM format
  end_time: string;              // HH:MM format
  notes?: string;
  status: 'pending' | 'under_review' | 'confirmed' | 'completed' | 'cancelled';
  price_snapshot: number;        // Price at booking time
  duration_snapshot: number;     // Duration at booking time
  cancellation_reason?: string;
  created_at: timestamp;
  updated_at: timestamp;
}
```

#### 14. reviews
```typescript
{
  id: string;
  booking_id: string;            // FK to bookings
  reviewer_user_id: string;      // FK to users
  teacher_user_id: string;       // FK to users
  rating: number;                // 1-5
  comment?: string;
  is_visible: boolean;
  created_at: timestamp;
}
```

#### 15. notifications
```typescript
{
  id: string;
  user_id: string;               // FK to users
  title: string;
  body: string;
  type: 'booking' | 'review' | 'system' | 'approval';
  reference_id?: string;         // Related entity ID
  reference_type?: string;       // Related entity type
  is_read: boolean;
  created_at: timestamp;
}
```

#### 16. admin_logs
```typescript
{
  id: string;
  admin_user_id: string;         // FK to users
  action: string;                // e.g., 'approve_teacher', 'block_user'
  target_type: string;           // e.g., 'user', 'booking'
  target_id: string;
  meta_json?: object;            // Additional data
  ip_address?: string;
  created_at: timestamp;
}
```

#### 17. platform_settings
```typescript
{
  id: string;
  setting_key: string;           // Unique
  setting_value: any;            // JSON value
  description?: string;
  updated_at: timestamp;
}
```

---

## 📁 Folder Structure

```
src/
├── app/
│   ├── (public)/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── teachers/
│   │   │   ├── page.tsx
│   │   │   └── [teacherId]/
│   │   │       └── page.tsx
│   │   ├── about/
│   │   ├── contact/
│   │   ├── faq/
│   │   ├── privacy/
│   │   └── terms/
│   │
│   ├── (auth)/
│   │   ├── layout.tsx
│   │   ├── login/
│   │   ├── register/
│   │   │   ├── page.tsx
│   │   │   ├── teacher/
│   │   │   ├── parent/
│   │   │   └── student/
│   │   ├── forgot-password/
│   │   └── reset-password/
│   │
│   ├── dashboard/
│   │   ├── layout.tsx
│   │   ├── admin/
│   │   ├── teacher/
│   │   ├── parent/
│   │   ├── child/
│   │   └── student/
│   │
│   ├── booking/
│   │   ├── [teacherId]/
│   │   └── details/
│   │
│   ├── api/
│   │   ├── auth/
│   │   ├── users/
│   │   ├── teachers/
│   │   ├── bookings/
│   │   ├── subjects/
│   │   ├── services/
│   │   └── cities/
│   │
│   ├── layout.tsx
│   └── globals.css
│
├── components/
│   ├── ui/                      # shadcn/ui components
│   ├── shared/                  # Shared components
│   │   ├── Logo.tsx
│   │   ├── Avatar.tsx
│   │   ├── Badge.tsx
│   │   └── Rating.tsx
│   │
│   ├── layout/                  # Layout components
│   │   ├── MobileAppShell.tsx
│   │   ├── DashboardShell.tsx
│   │   ├── PublicNavbar.tsx
│   │   ├── MobileBottomNav.tsx
│   │   └── RoleSidebar.tsx
│   │
│   ├── cards/                   # Card components
│   │   ├── TeacherCard.tsx
│   │   ├── BookingCard.tsx
│   │   ├── StatsCard.tsx
│   │   ├── ChildCard.tsx
│   │   ├── ReviewCard.tsx
│   │   └── NotificationCard.tsx
│   │
│   ├── forms/                   # Form components
│   │   ├── LoginForm.tsx
│   │   ├── RegisterForm.tsx
│   │   ├── TeacherProfileForm.tsx
│   │   ├── BookingForm.tsx
│   │   ├── ChildForm.tsx
│   │   ├── AvailabilityForm.tsx
│   │   └── ReviewForm.tsx
│   │
│   ├── filters/                 # Filter components
│   │   ├── TeacherFilters.tsx
│   │   ├── SubjectFilter.tsx
│   │   ├── PriceFilter.tsx
│   │   └── RatingFilter.tsx
│   │
│   ├── booking/                 # Booking-specific components
│   │   ├── TimeSlotPicker.tsx
│   │   ├── DatePicker.tsx
│   │   ├── BookingWizard.tsx
│   │   └── ForWhoPicker.tsx
│   │
│   ├── dashboard/               # Dashboard components
│   │   ├── StatsGrid.tsx
│   │   ├── RecentBookings.tsx
│   │   ├── ApprovalQueue.tsx
│   │   └── Charts.tsx
│   │
│   └── states/                  # State components
│       ├── EmptyState.tsx
│       ├── LoadingSkeleton.tsx
│       ├── ErrorState.tsx
│       └── SuccessToast.tsx
│
├── lib/
│   ├── auth/
│   │   ├── config.ts
│   │   └── guards.ts
│   ├── db/
│   │   ├── supabase.ts
│   │   └── queries.ts
│   ├── validations/
│   │   ├── auth.ts
│   │   ├── booking.ts
│   │   └── profile.ts
│   ├── permissions/
│   │   ├── roles.ts
│   │   └── guards.ts
│   ├── utils/
│   │   ├── cn.ts
│   │   ├── date.ts
│   │   └── format.ts
│   └── constants/
│       ├── routes.ts
│       └── config.ts
│
├── hooks/
│   ├── useAuth.ts
│   ├── useUser.ts
│   ├── useBookings.ts
│   ├── useTeachers.ts
│   └── useFilters.ts
│
├── services/
│   ├── auth.service.ts
│   ├── user.service.ts
│   ├── teacher.service.ts
│   ├── booking.service.ts
│   └── notification.service.ts
│
├── store/
│   ├── auth.store.ts
│   ├── ui.store.ts
│   └── filters.store.ts
│
├── types/
│   ├── user.ts
│   ├── teacher.ts
│   ├── booking.ts
│   ├── review.ts
│   └── index.ts
│
└── data/
    ├── seed/
    │   ├── users.ts
    │   ├── teachers.ts
    │   ├── subjects.ts
    │   ├── services.ts
    │   └── cities.ts
    └── mock/
        └── index.ts
```

---

## 🔄 Booking Flow

### For Student:
1. Browse Teachers → Select Teacher → View Profile
2. Click "Book Now" → Check Auth (redirect to login if guest)
3. Select Subject → Select Service → Select Mode
4. Select Date → Select Available Time Slot
5. Add Notes (optional) → Review Summary
6. Submit Booking → Status: `pending`
7. Await Teacher Response

### For Parent:
1. Same as Student until "Book Now"
2. **Additional Step:** Select "For Myself" or "For My Child"
3. If "For My Child" → Select Child from list
4. Continue with booking flow
5. Submit Booking → Status: `pending`

### Time Slot Logic:
```typescript
// Get available slots for a teacher on a date
function getAvailableSlots(teacherId: string, date: Date): TimeSlot[] {
  // 1. Get teacher's availability for that day of week
  // 2. Get existing bookings for that date
  // 3. Subtract booked slots from available slots
  // 4. Return remaining available slots
}
```

---

## 🔐 Authentication Flow

### Login:
1. Email/Password → Validate → Create Session → Redirect to Dashboard
2. Social (Google) → OAuth → Create/Link Account → Redirect

### Register:
1. Select Role → Fill Form → Validate → Create Account
2. Send Verification Email → Verify → Activate Account
3. For Teachers: Status = `pending` until admin approval

### Password Reset:
1. Enter Email → Send Reset Link → Click Link → Set New Password

---

## 📱 Mobile-First Design Principles

1. **Touch-Friendly:** Minimum 44x44px touch targets
2. **Bottom Navigation:** Primary navigation at bottom for thumb reach
3. **Sheets & Drawers:** Use bottom sheets instead of modals
4. **Cards Over Tables:** Transform data tables into card lists
5. **Floating Action Button:** Quick booking access
6. **Pull to Refresh:** Gesture-based refresh
7. **Skeleton Loading:** Show content structure while loading
8. **Sticky Headers:** Keep context visible while scrolling

---

## 🌐 RTL Considerations

1. **Layout Direction:** All layouts use `dir="rtl"`
2. **Text Alignment:** Default to `text-right`
3. **Icon Direction:** Mirror directional icons (arrows, etc.)
4. **Margin/Padding:** Use logical properties (`ms-`, `me-`, `ps-`, `pe-`)
5. **Flex Direction:** Reverse where needed
6. **Number Display:** Use Arabic numerals option
7. **Date Format:** Arabic format with Arabic months

---

## 🛡️ Security Considerations

1. **Row Level Security (RLS):** Supabase policies for data access
2. **Route Protection:** Middleware-based role checking
3. **Input Validation:** Zod schemas on all inputs
4. **Rate Limiting:** API rate limits
5. **CSRF Protection:** Token-based protection
6. **XSS Prevention:** Sanitize all user inputs
7. **Audit Logging:** Log sensitive operations

---

## 📊 Performance Targets

- **First Contentful Paint:** < 1.5s
- **Largest Contentful Paint:** < 2.5s
- **Time to Interactive:** < 3.5s
- **Lighthouse Mobile Score:** > 90
- **Bundle Size:** < 200KB initial JS

---

*Document Version: 1.0*
*Last Updated: 2026-04-13*
