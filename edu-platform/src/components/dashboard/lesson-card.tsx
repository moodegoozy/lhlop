'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Video,
  MapPin,
  Clock,
  Calendar,
  Star,
  Play,
  Download,
  MoreVertical,
  MessageCircle,
} from 'lucide-react';

type LessonStatus = 'upcoming' | 'live' | 'completed' | 'cancelled';
type LessonMode = 'remote' | 'in_person';

interface LessonCardProps {
  id: string;
  teacherName: string;
  teacherAvatar?: string;
  teacherRating?: number;
  subject: string;
  subjectIcon?: string;
  date: string;
  startTime: string;
  endTime: string;
  mode: LessonMode;
  status: LessonStatus;
  recordingUrl?: string;
  className?: string;
  onJoin?: () => void;
  onViewRecording?: () => void;
  onReschedule?: () => void;
  onCancel?: () => void;
}

const statusStyles: Record<LessonStatus, { bg: string; text: string; label: string }> = {
  upcoming: {
    bg: 'bg-blue-100 dark:bg-blue-900/30',
    text: 'text-blue-700 dark:text-blue-400',
    label: 'قادمة',
  },
  live: {
    bg: 'bg-green-100 dark:bg-green-900/30',
    text: 'text-green-700 dark:text-green-400',
    label: 'جارية الآن',
  },
  completed: {
    bg: 'bg-gray-100 dark:bg-gray-800',
    text: 'text-gray-600 dark:text-gray-400',
    label: 'مكتملة',
  },
  cancelled: {
    bg: 'bg-red-100 dark:bg-red-900/30',
    text: 'text-red-700 dark:text-red-400',
    label: 'ملغاة',
  },
};

export function LessonCard({
  id,
  teacherName,
  teacherAvatar,
  teacherRating,
  subject,
  subjectIcon,
  date,
  startTime,
  endTime,
  mode,
  status,
  recordingUrl,
  className,
  onJoin,
  onViewRecording,
  onReschedule,
  onCancel,
}: LessonCardProps) {
  const statusConfig = statusStyles[status];
  const isLive = status === 'live';
  const isUpcoming = status === 'upcoming';
  const isCompleted = status === 'completed';

  // Format date
  const formattedDate = new Date(date).toLocaleDateString('ar-SA', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div
      className={cn(
        'relative overflow-hidden',
        'bg-white dark:bg-gray-900/50 rounded-2xl',
        'border border-gray-200/50 dark:border-gray-800/50',
        'shadow-sm hover:shadow-md transition-all duration-300',
        'group',
        isLive && 'ring-2 ring-green-500 ring-offset-2 dark:ring-offset-gray-950',
        className
      )}
    >
      {/* Live Indicator Animation */}
      {isLive && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 via-green-500 to-green-400 animate-pulse" />
      )}

      <div className="p-4 md:p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12 ring-2 ring-gray-100 dark:ring-gray-800">
              <AvatarImage src={teacherAvatar} />
              <AvatarFallback className="bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 font-semibold">
                {teacherName.slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {teacherName}
              </h3>
              {teacherRating && (
                <div className="flex items-center gap-1 mt-0.5">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {teacherRating}
                  </span>
                </div>
              )}
            </div>
          </div>
          
          <Badge
            variant="secondary"
            className={cn(statusConfig.bg, statusConfig.text, 'font-medium')}
          >
            {isLive && (
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse ml-1.5" />
            )}
            {statusConfig.label}
          </Badge>
        </div>

        {/* Subject */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-lg">
            {subjectIcon || '📚'}
          </div>
          <span className="font-medium text-gray-900 dark:text-white">{subject}</span>
        </div>

        {/* Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Calendar className="w-4 h-4" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Clock className="w-4 h-4" />
            <span>{startTime} - {endTime}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            {mode === 'remote' ? (
              <>
                <Video className="w-4 h-4" />
                <span>حصة أونلاين</span>
              </>
            ) : (
              <>
                <MapPin className="w-4 h-4" />
                <span>حصة حضورية</span>
              </>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {isLive && (
            <Button
              onClick={onJoin}
              className="flex-1 bg-green-600 hover:bg-green-700 shadow-lg shadow-green-500/25"
            >
              <Video className="w-4 h-4 ml-2" />
              انضم الآن
            </Button>
          )}
          
          {isUpcoming && (
            <>
              <Button
                onClick={onJoin}
                className="flex-1"
              >
                <Video className="w-4 h-4 ml-2" />
                انضم للحصة
              </Button>
              <Button variant="secondary" size="icon" onClick={onReschedule}>
                <Calendar className="w-4 h-4" />
              </Button>
            </>
          )}
          
          {isCompleted && (
            <>
              {recordingUrl && (
                <Button
                  onClick={onViewRecording}
                  variant="secondary"
                  className="flex-1"
                >
                  <Play className="w-4 h-4 ml-2" />
                  مشاهدة التسجيل
                </Button>
              )}
              <Button variant="ghost" size="icon">
                <MessageCircle className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Star className="w-4 h-4" />
              </Button>
            </>
          )}
          
          {status === 'cancelled' && (
            <Button variant="secondary" className="flex-1" onClick={onReschedule}>
              إعادة الحجز
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

// Compact list version
export function LessonCardCompact({
  id,
  teacherName,
  teacherAvatar,
  subject,
  subjectIcon,
  date,
  startTime,
  endTime,
  mode,
  status,
  className,
  onJoin,
}: Omit<LessonCardProps, 'recordingUrl' | 'teacherRating' | 'onViewRecording' | 'onReschedule' | 'onCancel'>) {
  const statusConfig = statusStyles[status];
  const isLive = status === 'live';

  const formattedDate = new Date(date).toLocaleDateString('ar-SA', {
    weekday: 'short',
    day: 'numeric',
  });

  return (
    <div
      className={cn(
        'flex items-center gap-4 p-3 rounded-xl',
        'bg-white dark:bg-gray-900/50',
        'border border-gray-200/50 dark:border-gray-800/50',
        'hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors',
        isLive && 'ring-2 ring-green-500/50',
        className
      )}
    >
      <Avatar className="w-10 h-10 shrink-0">
        <AvatarImage src={teacherAvatar} />
        <AvatarFallback className="bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 text-sm font-semibold">
          {teacherName.slice(0, 2)}
        </AvatarFallback>
      </Avatar>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-lg">{subjectIcon || '📚'}</span>
          <h4 className="font-medium text-gray-900 dark:text-white truncate">
            {subject}
          </h4>
        </div>
        <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mt-0.5">
          <span>{teacherName}</span>
          <span>•</span>
          <span>{formattedDate}</span>
          <span>•</span>
          <span>{startTime}</span>
        </div>
      </div>
      
      <Badge
        variant="secondary"
        className={cn(statusConfig.bg, statusConfig.text, 'text-xs shrink-0')}
      >
        {isLive && (
          <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse ml-1" />
        )}
        {statusConfig.label}
      </Badge>
      
      {(status === 'live' || status === 'upcoming') && (
        <Button size="sm" onClick={onJoin} className="shrink-0">
          {mode === 'remote' ? <Video className="w-4 h-4" /> : <MapPin className="w-4 h-4" />}
        </Button>
      )}
    </div>
  );
}
