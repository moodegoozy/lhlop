'use client';

import * as React from 'react';
import { cn, generateTimeSlots, getDayName, formatDate } from '@/lib/utils';
import { Card, Button, Badge } from '@/components/ui';
import { t } from '@/lib/translations';

interface TimeSlot {
  time: string;
  available: boolean;
}

interface DaySlots {
  date: string;
  dayName: string;
  slots: TimeSlot[];
}

interface TimeSlotPickerProps {
  teacherId: string;
  selectedDate?: string;
  selectedTime?: string;
  onSelect: (date: string, time: string) => void;
  availability?: Array<{
    day_of_week: number;
    start_time: string;
    end_time: string;
  }>;
  bookedSlots?: Array<{
    date: string;
    start_time: string;
  }>;
  lessonDuration?: number;
  daysToShow?: number;
  className?: string;
}

export function TimeSlotPicker({
  teacherId,
  selectedDate,
  selectedTime,
  onSelect,
  availability = [],
  bookedSlots = [],
  lessonDuration = 60,
  daysToShow = 7,
  className,
}: TimeSlotPickerProps) {
  const [currentWeekStart, setCurrentWeekStart] = React.useState(() => {
    const today = new Date();
    return today;
  });

  // Generate days for the current view
  const days = React.useMemo(() => {
    const result: DaySlots[] = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < daysToShow; i++) {
      const date = new Date(currentWeekStart);
      date.setDate(date.getDate() + i);

      // Skip past days
      if (date < today) continue;

      const dayOfWeek = date.getDay();
      const dateString = date.toISOString().split('T')[0];

      // Find availability for this day
      const dayAvailability = availability.find(
        (a) => a.day_of_week === dayOfWeek
      );

      let slots: TimeSlot[] = [];
      if (dayAvailability) {
        const generatedSlots = generateTimeSlots(
          dayAvailability.start_time,
          dayAvailability.end_time,
          lessonDuration
        );

        slots = generatedSlots.map((time) => {
          // Check if this slot is booked
          const isBooked = bookedSlots.some(
            (b) => b.date === dateString && b.start_time === time
          );

          // Check if slot is in the past
          const slotDateTime = new Date(`${dateString}T${time}`);
          const isPast = slotDateTime <= new Date();

          return {
            time,
            available: !isBooked && !isPast,
          };
        });
      }

      result.push({
        date: dateString,
        dayName: getDayName(dayOfWeek),
        slots,
      });
    }

    return result;
  }, [currentWeekStart, daysToShow, availability, bookedSlots, lessonDuration]);

  const goToPreviousWeek = () => {
    const newStart = new Date(currentWeekStart);
    newStart.setDate(newStart.getDate() - 7);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (newStart >= today) {
      setCurrentWeekStart(newStart);
    }
  };

  const goToNextWeek = () => {
    const newStart = new Date(currentWeekStart);
    newStart.setDate(newStart.getDate() + 7);
    setCurrentWeekStart(newStart);
  };

  const isPreviousDisabled = React.useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return currentWeekStart <= today;
  }, [currentWeekStart]);

  return (
    <div className={cn('', className)}>
      {/* Week Navigation */}
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={goToPreviousWeek}
          disabled={isPreviousDisabled}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Button>
        <span className="font-medium text-gray-900 dark:text-gray-100">
          {formatDate(currentWeekStart.toISOString(), 'ar')} - {formatDate(
            new Date(currentWeekStart.getTime() + (daysToShow - 1) * 24 * 60 * 60 * 1000).toISOString(),
            'ar'
          )}
        </span>
        <Button variant="ghost" size="icon-sm" onClick={goToNextWeek}>
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Button>
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-1 gap-4">
        {days.map((day) => (
          <Card key={day.date} padding="sm" className="bg-gray-50 dark:bg-gray-800/50">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="font-semibold text-gray-900 dark:text-gray-100">
                  {day.dayName}
                </p>
                <p className="text-sm text-gray-500">
                  {formatDate(day.date, 'ar')}
                </p>
              </div>
              {day.slots.length > 0 && (
                <Badge variant="secondary" size="sm">
                  {day.slots.filter((s) => s.available).length} {t('booking.available')}
                </Badge>
              )}
            </div>

            {day.slots.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">
                {t('booking.noAvailability')}
              </p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {day.slots.map((slot) => (
                  <button
                    key={slot.time}
                    type="button"
                    disabled={!slot.available}
                    onClick={() => onSelect(day.date, slot.time)}
                    className={cn(
                      'px-3 py-2 text-sm rounded-lg font-medium transition-all',
                      selectedDate === day.date && selectedTime === slot.time
                        ? 'bg-primary-600 text-white shadow-md'
                        : slot.available
                        ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-primary-50 dark:hover:bg-primary-900/30 hover:text-primary-600 border border-gray-200 dark:border-gray-600'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed line-through'
                    )}
                  >
                    {slot.time}
                  </button>
                ))}
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-primary-600" />
          <span className="text-gray-600 dark:text-gray-400">{t('booking.selected')}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600" />
          <span className="text-gray-600 dark:text-gray-400">{t('booking.available')}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-gray-200 dark:bg-gray-800" />
          <span className="text-gray-600 dark:text-gray-400">{t('booking.unavailable')}</span>
        </div>
      </div>
    </div>
  );
}

// Compact horizontal day picker for mobile
export function HorizontalDayPicker({
  selectedDate,
  onSelectDate,
  availability = [],
  daysToShow = 14,
  className,
}: {
  selectedDate?: string;
  onSelectDate: (date: string) => void;
  availability?: Array<{ day_of_week: number }>;
  daysToShow?: number;
  className?: string;
}) {
  const days = React.useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const result = [];

    for (let i = 0; i < daysToShow; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() + i);
      const dayOfWeek = date.getDay();
      const hasAvailability = availability.some((a) => a.day_of_week === dayOfWeek);

      result.push({
        date: date.toISOString().split('T')[0],
        dayName: getDayName(dayOfWeek).substring(0, 3),
        dayNumber: date.getDate(),
        month: date.toLocaleDateString('ar-SA', { month: 'short' }),
        hasAvailability,
        isToday: i === 0,
      });
    }

    return result;
  }, [availability, daysToShow]);

  return (
    <div className={cn('overflow-x-auto scrollbar-hide', className)}>
      <div className="flex gap-2 pb-2 min-w-max">
        {days.map((day) => (
          <button
            key={day.date}
            type="button"
            onClick={() => onSelectDate(day.date)}
            disabled={!day.hasAvailability}
            className={cn(
              'flex flex-col items-center px-3 py-2 rounded-xl min-w-[60px] transition-all',
              selectedDate === day.date
                ? 'bg-primary-600 text-white shadow-md'
                : day.hasAvailability
                ? 'bg-white dark:bg-gray-800 hover:bg-primary-50 dark:hover:bg-primary-900/30'
                : 'bg-gray-100 dark:bg-gray-800/50 opacity-50 cursor-not-allowed'
            )}
          >
            <span className="text-xs font-medium opacity-80">
              {day.isToday ? 'اليوم' : day.dayName}
            </span>
            <span className="text-lg font-bold">{day.dayNumber}</span>
            <span className="text-xs opacity-80">{day.month}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
