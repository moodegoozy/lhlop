'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  getTeachers,
  getTeacher,
  getSubjects,
  getServices,
  getTeacherAvailability,
  getTeacherReviews,
  getUserBookings,
  subscribeToBookings,
  subscribeToTeacher,
} from '@/lib/firebase';
import type { TeacherProfile, Subject, Service, TeacherAvailability, Review, Booking } from '@/types';

// ============ TEACHERS ============

export function useTeachers(options?: Parameters<typeof getTeachers>[0]) {
  const [teachers, setTeachers] = useState<TeacherProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchTeachers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getTeachers(options);
      setTeachers(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [options?.subjectId, options?.serviceId, options?.city, options?.minRating, options?.lessonMode]);

  useEffect(() => {
    fetchTeachers();
  }, [fetchTeachers]);

  return { teachers, loading, error, refetch: fetchTeachers };
}

export function useTeacher(teacherId: string) {
  const [teacher, setTeacher] = useState<TeacherProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!teacherId) {
      setLoading(false);
      return;
    }

    // Use real-time subscription
    const unsubscribe = subscribeToTeacher(teacherId, (data) => {
      setTeacher(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [teacherId]);

  return { teacher, loading, error };
}

// ============ SUBJECTS & SERVICES ============

export function useSubjects() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getSubjects();
        setSubjects(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return { subjects, loading, error };
}

export function useServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getServices();
        setServices(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return { services, loading, error };
}

// ============ AVAILABILITY ============

export function useTeacherAvailability(teacherId: string) {
  const [slots, setSlots] = useState<TeacherAvailability[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchSlots = useCallback(async () => {
    if (!teacherId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await getTeacherAvailability(teacherId);
      setSlots(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [teacherId]);

  useEffect(() => {
    fetchSlots();
  }, [fetchSlots]);

  return { slots, loading, error, refetch: fetchSlots };
}

// ============ REVIEWS ============

export function useTeacherReviews(teacherId: string) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!teacherId) {
      setLoading(false);
      return;
    }

    const fetch = async () => {
      try {
        const data = await getTeacherReviews(teacherId);
        setReviews(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [teacherId]);

  return { reviews, loading, error };
}

// ============ BOOKINGS ============

export function useBookings(userId: string, role: 'teacher' | 'student') {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    // Use real-time subscription
    const unsubscribe = subscribeToBookings(userId, role, (data) => {
      setBookings(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [userId, role]);

  return { bookings, loading, error };
}

// ============ SINGLE FETCH UTILITIES ============

export async function fetchTeacherData(teacherId: string) {
  const [teacher, availability, reviews] = await Promise.all([
    getTeacher(teacherId),
    getTeacherAvailability(teacherId),
    getTeacherReviews(teacherId),
  ]);

  return { teacher, availability, reviews };
}
