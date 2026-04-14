import { mockTeacherProfiles } from '@/data/mock';
import BookingPageClient from './client';

// Generate static params for all teachers
export function generateStaticParams() {
  return mockTeacherProfiles.map((teacher) => ({
    teacherId: teacher.id,
  }));
}

export default function BookingPage() {
  return <BookingPageClient />;
}
