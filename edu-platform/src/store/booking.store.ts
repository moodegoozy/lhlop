import { create } from 'zustand';
import type { Booking, BookingStatus, TimeSlot, TeacherProfile, Subject, Service, User } from '@/types';

interface BookingFormData {
  teacher_id: string;
  student_id: string; // Could be user's own ID or child's ID
  student_type: 'self' | 'child';
  child_id?: string;
  subject_id: string;
  service_id: string;
  lesson_mode: 'online' | 'in_person';
  date: string;
  time_slot: TimeSlot | null;
  duration_minutes: number;
  total_price: number;
  notes?: string;
}

interface BookingStore {
  // Current booking being created
  currentBooking: Partial<BookingFormData> | null;
  
  // Selected teacher for booking
  selectedTeacherId: string | null;
  selectedTeacher: TeacherProfile | null;
  
  // Selected subject and service
  selectedSubject: Subject | null;
  selectedService: Service | null;
  
  // Selected date and time
  selectedDate: string | null;
  selectedTime: string | null;
  
  // Lesson mode and student selection
  lessonMode: 'online' | 'in_person' | null;
  studentId: string | null;  // For parent booking for children
  
  // Notes
  notes: string;
  
  // Booking steps
  currentStep: number;
  totalSteps: number;
  
  // Loading states
  isLoadingSlots: boolean;
  isSubmitting: boolean;
  
  // Available time slots for selected date
  availableSlots: TimeSlot[];
  
  // Booked slots (to show conflicts)
  bookedSlots: TimeSlot[];
  
  // Actions
  setCurrentBooking: (data: Partial<BookingFormData>) => void;
  updateCurrentBooking: (data: Partial<BookingFormData>) => void;
  clearCurrentBooking: () => void;
  
  setSelectedTeacher: (teacher: TeacherProfile | null) => void;
  setSelectedSubject: (subject: Subject | null) => void;
  setSelectedService: (service: Service | null) => void;
  setSelectedDate: (date: string | null) => void;
  setSelectedTime: (time: string | null) => void;
  setLessonMode: (mode: 'online' | 'in_person' | null) => void;
  setStudentId: (id: string | null) => void;
  setNotes: (notes: string) => void;
  
  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  
  setAvailableSlots: (slots: TimeSlot[]) => void;
  setBookedSlots: (slots: TimeSlot[]) => void;
  
  setIsLoadingSlots: (loading: boolean) => void;
  setIsSubmitting: (submitting: boolean) => void;
  
  // Helpers
  isSlotAvailable: (slot: TimeSlot) => boolean;
  canProceedToNextStep: () => boolean;
  reset: () => void;
}

const initialState = {
  currentBooking: null as Partial<BookingFormData> | null,
  selectedTeacherId: null as string | null,
  selectedTeacher: null as TeacherProfile | null,
  selectedSubject: null as Subject | null,
  selectedService: null as Service | null,
  selectedDate: null as string | null,
  selectedTime: null as string | null,
  lessonMode: null as 'online' | 'in_person' | null,
  studentId: null as string | null,
  notes: '',
  currentStep: 1,
  totalSteps: 6,
  isLoadingSlots: false,
  isSubmitting: false,
  availableSlots: [] as TimeSlot[],
  bookedSlots: [] as TimeSlot[],
};

export const useBookingStore = create<BookingStore>((set, get) => ({
  ...initialState,

  setCurrentBooking: (data) =>
    set({
      currentBooking: { duration_minutes: 60, lesson_mode: 'online', student_type: 'self', ...data },
    }),

  updateCurrentBooking: (data) =>
    set((state) => ({
      currentBooking: state.currentBooking
        ? { ...state.currentBooking, ...data }
        : { duration_minutes: 60, lesson_mode: 'online', student_type: 'self', ...data },
    })),

  clearCurrentBooking: () =>
    set({
      currentBooking: null,
      selectedTeacherId: null,
      selectedDate: null,
      availableSlots: [],
      bookedSlots: [],
    }),

  setSelectedTeacher: (teacher) =>
    set({
      selectedTeacher: teacher,
      selectedTeacherId: teacher?.id ?? null,
      selectedSubject: null,
      selectedService: null,
      selectedDate: null,
      selectedTime: null,
      availableSlots: [],
      bookedSlots: [],
    }),

  setSelectedSubject: (subject) =>
    set({ selectedSubject: subject }),
  
  setSelectedService: (service) =>
    set({ selectedService: service }),
  
  setSelectedDate: (date) =>
    set({ selectedDate: date, selectedTime: null }),
  
  setSelectedTime: (time) =>
    set({ selectedTime: time }),
  
  setLessonMode: (mode) =>
    set({ lessonMode: mode }),
  
  setStudentId: (id) =>
    set({ studentId: id }),
  
  setNotes: (notes) =>
    set({ notes }),

  setCurrentStep: (step) =>
    set({
      currentStep: Math.max(1, Math.min(step, get().totalSteps)),
    }),

  nextStep: () =>
    set((state) => ({
      currentStep: Math.min(state.currentStep + 1, state.totalSteps),
    })),

  prevStep: () =>
    set((state) => ({
      currentStep: Math.max(state.currentStep - 1, 1),
    })),

  setAvailableSlots: (slots) =>
    set({
      availableSlots: slots,
    }),

  setBookedSlots: (slots) =>
    set({
      bookedSlots: slots,
    }),

  setIsLoadingSlots: (loading) =>
    set({
      isLoadingSlots: loading,
    }),

  setIsSubmitting: (submitting) =>
    set({
      isSubmitting: submitting,
    }),

  isSlotAvailable: (slot) => {
    const { bookedSlots } = get();
    return !bookedSlots.some(
      (booked) =>
        booked.start_time === slot.start_time && booked.end_time === slot.end_time
    );
  },

  canProceedToNextStep: () => {
    const { currentStep, currentBooking } = get();
    if (!currentBooking) return false;

    switch (currentStep) {
      case 1: // Select subject and service
        return !!(currentBooking.subject_id && currentBooking.service_id);
      case 2: // Select for whom (self or child)
        return !!(currentBooking.student_type && 
          (currentBooking.student_type === 'self' || currentBooking.child_id));
      case 3: // Select date and time
        return !!(currentBooking.date && currentBooking.time_slot);
      case 4: // Confirmation
        return true;
      default:
        return false;
    }
  },
  
  reset: () => set(initialState),
}));

// Helper: Generate time slots for a given availability
export function generateTimeSlots(
  availability: { start_time: string; end_time: string },
  durationMinutes: number = 60,
  gapMinutes: number = 0
): TimeSlot[] {
  const slots: TimeSlot[] = [];
  const [startHour, startMin] = availability.start_time.split(':').map(Number);
  const [endHour, endMin] = availability.end_time.split(':').map(Number);

  let currentTime = startHour * 60 + startMin;
  const endTime = endHour * 60 + endMin;

  while (currentTime + durationMinutes <= endTime) {
    const slotStart = `${Math.floor(currentTime / 60)
      .toString()
      .padStart(2, '0')}:${(currentTime % 60).toString().padStart(2, '0')}`;
    const slotEnd = `${Math.floor((currentTime + durationMinutes) / 60)
      .toString()
      .padStart(2, '0')}:${((currentTime + durationMinutes) % 60)
      .toString()
      .padStart(2, '0')}`;

    slots.push({
      start_time: slotStart,
      end_time: slotEnd,
      is_available: true,
    });

    currentTime += durationMinutes + gapMinutes;
  }

  return slots;
}

// Helper: Check if a time slot conflicts with existing bookings
export function hasTimeConflict(
  slot: TimeSlot,
  existingBookings: { start_time: string; end_time: string }[]
): boolean {
  const slotStart = timeToMinutes(slot.start_time);
  const slotEnd = timeToMinutes(slot.end_time);

  return existingBookings.some((booking) => {
    const bookingStart = timeToMinutes(booking.start_time);
    const bookingEnd = timeToMinutes(booking.end_time);

    // Check for overlap
    return slotStart < bookingEnd && slotEnd > bookingStart;
  });
}

function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

// Helper: Format price with SAR
export function formatBookingPrice(price: number): string {
  return `${price} ر.س`;
}

// Helper: Calculate total price based on duration
export function calculateTotalPrice(
  pricePerHour: number,
  durationMinutes: number
): number {
  return Math.round((pricePerHour * durationMinutes) / 60);
}
