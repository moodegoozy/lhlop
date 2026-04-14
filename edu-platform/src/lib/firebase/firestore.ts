// Firestore Database Operations
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  onSnapshot,
  addDoc,
  serverTimestamp,
  Timestamp,
  DocumentData,
  QueryConstraint,
  DocumentReference,
  CollectionReference,
} from 'firebase/firestore';
import { db } from './config';
import type {
  User,
  TeacherProfile,
  Booking,
  Subject,
  Service,
  TeacherAvailability,
  Review,
} from '@/types';

// Collection names
export const COLLECTIONS = {
  USERS: 'users',
  TEACHERS: 'teachers',
  BOOKINGS: 'bookings',
  SUBJECTS: 'subjects',
  SERVICES: 'services',
  AVAILABILITY: 'availability',
  REVIEWS: 'reviews',
  NOTIFICATIONS: 'notifications',
  CHILDREN: 'children',
} as const;

// Helper: Convert Firestore Timestamp to Date string
function convertTimestamp(timestamp: Timestamp | string): string {
  if (timestamp instanceof Timestamp) {
    return timestamp.toDate().toISOString();
  }
  return timestamp;
}

// Helper: Prepare data for Firestore (add timestamps)
function withTimestamps<T extends DocumentData>(data: T, isNew = true) {
  return {
    ...data,
    updated_at: serverTimestamp(),
    ...(isNew && { created_at: serverTimestamp() }),
  };
}

// ============ USERS ============

export async function getUser(userId: string): Promise<User | null> {
  const docRef = doc(db, COLLECTIONS.USERS, userId);
  const docSnap = await getDoc(docRef);
  
  if (!docSnap.exists()) return null;
  
  const data = docSnap.data();
  return {
    ...data,
    id: docSnap.id,
    created_at: convertTimestamp(data.created_at),
    updated_at: convertTimestamp(data.updated_at),
  } as User;
}

export async function createUser(userId: string, userData: Partial<User>): Promise<void> {
  const docRef = doc(db, COLLECTIONS.USERS, userId);
  await setDoc(docRef, withTimestamps(userData, true));
}

export async function updateUser(userId: string, data: Partial<User>): Promise<void> {
  const docRef = doc(db, COLLECTIONS.USERS, userId);
  await updateDoc(docRef, withTimestamps(data, false));
}

// ============ TEACHERS ============

export async function getTeacher(teacherId: string): Promise<TeacherProfile | null> {
  const docRef = doc(db, COLLECTIONS.TEACHERS, teacherId);
  const docSnap = await getDoc(docRef);
  
  if (!docSnap.exists()) return null;
  
  const data = docSnap.data();
  return {
    ...data,
    id: docSnap.id,
    created_at: convertTimestamp(data.created_at),
    updated_at: convertTimestamp(data.updated_at),
  } as TeacherProfile;
}

export async function getTeachers(options?: {
  subjectId?: string;
  serviceId?: string;
  city?: string;
  minRating?: number;
  maxPrice?: number;
  lessonMode?: 'online' | 'in_person' | 'both';
  pageSize?: number;
  lastDoc?: DocumentData;
}): Promise<TeacherProfile[]> {
  const constraints: QueryConstraint[] = [];

  if (options?.subjectId) {
    constraints.push(where('subject_ids', 'array-contains', options.subjectId));
  }
  if (options?.serviceId) {
    constraints.push(where('service_ids', 'array-contains', options.serviceId));
  }
  if (options?.city) {
    constraints.push(where('city', '==', options.city));
  }
  if (options?.minRating) {
    constraints.push(where('rating', '>=', options.minRating));
  }
  if (options?.lessonMode && options.lessonMode !== 'both') {
    constraints.push(where('lesson_modes', 'array-contains', options.lessonMode));
  }

  constraints.push(orderBy('rating', 'desc'));
  constraints.push(limit(options?.pageSize || 20));

  if (options?.lastDoc) {
    constraints.push(startAfter(options.lastDoc));
  }

  const q = query(collection(db, COLLECTIONS.TEACHERS), ...constraints);
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      ...data,
      id: doc.id,
      created_at: convertTimestamp(data.created_at),
      updated_at: convertTimestamp(data.updated_at),
    } as TeacherProfile;
  });
}

export async function createTeacher(teacherId: string, data: Partial<TeacherProfile>): Promise<void> {
  const docRef = doc(db, COLLECTIONS.TEACHERS, teacherId);
  await setDoc(docRef, withTimestamps(data, true));
}

export async function updateTeacher(teacherId: string, data: Partial<TeacherProfile>): Promise<void> {
  const docRef = doc(db, COLLECTIONS.TEACHERS, teacherId);
  await updateDoc(docRef, withTimestamps(data, false));
}

// ============ BOOKINGS ============

export async function getBooking(bookingId: string): Promise<Booking | null> {
  const docRef = doc(db, COLLECTIONS.BOOKINGS, bookingId);
  const docSnap = await getDoc(docRef);
  
  if (!docSnap.exists()) return null;
  
  const data = docSnap.data();
  return {
    ...data,
    id: docSnap.id,
    created_at: convertTimestamp(data.created_at),
    updated_at: convertTimestamp(data.updated_at),
    scheduled_at: convertTimestamp(data.scheduled_at),
  } as unknown as Booking;
}

export async function getUserBookings(userId: string, role: 'teacher' | 'student'): Promise<Booking[]> {
  const fieldName = role === 'teacher' ? 'teacher_user_id' : 'booked_by_user_id';
  
  const q = query(
    collection(db, COLLECTIONS.BOOKINGS),
    where(fieldName, '==', userId),
    orderBy('scheduled_at', 'desc')
  );
  
  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      ...data,
      id: doc.id,
      created_at: convertTimestamp(data.created_at),
      updated_at: convertTimestamp(data.updated_at),
      scheduled_at: convertTimestamp(data.scheduled_at),
    } as unknown as Booking;
  });
}

export async function createBooking(data: Omit<Booking, 'id' | 'created_at' | 'updated_at'>): Promise<string> {
  const docRef = await addDoc(
    collection(db, COLLECTIONS.BOOKINGS),
    withTimestamps(data, true)
  );
  return docRef.id;
}

export async function updateBooking(bookingId: string, data: Partial<Booking>): Promise<void> {
  const docRef = doc(db, COLLECTIONS.BOOKINGS, bookingId);
  await updateDoc(docRef, withTimestamps(data, false));
}

// ============ SUBJECTS ============

export async function getSubjects(): Promise<Subject[]> {
  const q = query(collection(db, COLLECTIONS.SUBJECTS), orderBy('name_ar'));
  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  } as Subject));
}

// ============ SERVICES ============

export async function getServices(): Promise<Service[]> {
  const q = query(collection(db, COLLECTIONS.SERVICES), orderBy('name_ar'));
  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  } as Service));
}

// ============ AVAILABILITY ============

export async function getTeacherAvailability(teacherId: string): Promise<TeacherAvailability[]> {
  const q = query(
    collection(db, COLLECTIONS.AVAILABILITY),
    where('teacher_profile_id', '==', teacherId),
    where('is_active', '==', true),
    orderBy('day_of_week'),
    orderBy('start_time')
  );
  
  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  } as TeacherAvailability));
}

export async function setTeacherAvailability(
  teacherId: string,
  slots: Omit<TeacherAvailability, 'id'>[]
): Promise<void> {
  // Delete existing slots
  const existingSlots = await getTeacherAvailability(teacherId);
  for (const slot of existingSlots) {
    await deleteDoc(doc(db, COLLECTIONS.AVAILABILITY, slot.id));
  }
  
  // Add new slots
  for (const slot of slots) {
    await addDoc(collection(db, COLLECTIONS.AVAILABILITY), {
      ...slot,
      teacher_profile_id: teacherId,
    });
  }
}

// ============ REVIEWS ============

export async function getTeacherReviews(teacherId: string): Promise<Review[]> {
  const q = query(
    collection(db, COLLECTIONS.REVIEWS),
    where('teacher_user_id', '==', teacherId),
    orderBy('created_at', 'desc')
  );
  
  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      ...data,
      id: doc.id,
      created_at: convertTimestamp(data.created_at),
    } as Review;
  });
}

export async function createReview(data: Omit<Review, 'id' | 'created_at'>): Promise<string> {
  const docRef = await addDoc(
    collection(db, COLLECTIONS.REVIEWS),
    withTimestamps(data, true)
  );
  
  // Update teacher rating average
  const reviews = await getTeacherReviews(data.teacher_user_id);
  const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  await updateTeacher(data.teacher_user_id, {
    average_rating: Math.round(avgRating * 10) / 10,
    total_reviews: reviews.length,
  });
  
  return docRef.id;
}

// ============ REAL-TIME SUBSCRIPTIONS ============

export function subscribeToBookings(
  userId: string,
  role: 'teacher' | 'student',
  callback: (bookings: Booking[]) => void
) {
  const fieldName = role === 'teacher' ? 'teacher_user_id' : 'booked_by_user_id';
  
  const q = query(
    collection(db, COLLECTIONS.BOOKINGS),
    where(fieldName, '==', userId),
    orderBy('scheduled_at', 'desc')
  );
  
  return onSnapshot(q, (snapshot) => {
    const bookings = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        ...data,
        id: doc.id,
        created_at: convertTimestamp(data.created_at),
        updated_at: convertTimestamp(data.updated_at),
        scheduled_at: convertTimestamp(data.scheduled_at),
      } as unknown as Booking;
    });
    callback(bookings);
  });
}

export function subscribeToTeacher(
  teacherId: string,
  callback: (teacher: TeacherProfile | null) => void
) {
  const docRef = doc(db, COLLECTIONS.TEACHERS, teacherId);
  
  return onSnapshot(docRef, (snapshot) => {
    if (!snapshot.exists()) {
      callback(null);
      return;
    }
    
    const data = snapshot.data();
    callback({
      ...data,
      id: snapshot.id,
      created_at: convertTimestamp(data.created_at),
      updated_at: convertTimestamp(data.updated_at),
    } as TeacherProfile);
  });
}
