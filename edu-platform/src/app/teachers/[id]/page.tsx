import { mockTeacherProfiles } from '@/data/mock';
import TeacherProfileClient from './client';

// Generate static params for all teachers
export function generateStaticParams() {
  return mockTeacherProfiles.map((teacher) => ({
    id: teacher.id,
  }));
}

export default function TeacherProfilePage() {
  return <TeacherProfileClient />;
}
