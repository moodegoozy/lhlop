{{ config('app.name') }} - تأكيد حجز الحصة

مرحباً {{ $booking->student_name }}،

تم تأكيد حجز حصتك بنجاح! 

===============================
رقم الحجز: #{{ str_pad($booking->id, 6, '0', STR_PAD_LEFT) }}
===============================

تفاصيل الحصة:
-------------
المدرس: {{ $booking->teacher->name }}
التاريخ: {{ $booking->booking_date->format('d/m/Y') }}
الوقت: {{ $booking->booking_date->format('H:i') }} (بتوقيت السعودية)
@if($booking->subject)المادة: {{ $booking->subject->name }}@endif
المدة: {{ $booking->getDurationFormatted() }}
التكلفة: {{ $booking->getFormattedPrice() }}

معلومات المدرس:
---------------
الاسم: {{ $booking->teacher->name }}
المؤهل: {{ $booking->teacher->qualification }}
التقييم: {{ $booking->teacher->rating }} نجمة ({{ $booking->teacher->total_ratings }} تقييم)
الخبرة: {{ $booking->teacher->completed_hours }} ساعة تدريس

@if($booking->student_notes)
ملاحظاتك:
---------
{{ $booking->student_notes }}
@endif

معلومات مهمة:
-----------
- سيتم إرسال رابط الحصة عبر البريد الإلكتروني قبل الموعد بـ 30 دقيقة
- يرجى التأكد من اتصال الإنترنت قبل موعد الحصة بـ 10 دقائق
- في حالة وجود أي مشكلة تقنية، يرجى التواصل معنا فوراً
- يمكنك إلغاء الحجز قبل الموعد بـ 24 ساعة على الأقل

رابط الحصة: {{ config('app.url') }}/booking/{{ $booking->id }}/join

نتمنى لك تجربة تعليمية ممتازة!

{{ config('app.name') }}
البريد الإلكتروني: support@{{ request()->getHost() }}
الهاتف: +966 50 123 4567
الموقع: {{ config('app.url') }}

© {{ date('Y') }} {{ config('app.name') }}. جميع الحقوق محفوظة. 