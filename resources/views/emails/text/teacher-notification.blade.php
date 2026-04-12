{{ config('app.name') }} - حجز جديد

مرحباً أستاذ {{ $booking->teacher->name }}،

لديك حجز جديد من الطالب {{ $booking->student_name }}!

===============================
رقم الحجز: #{{ str_pad($booking->id, 6, '0', STR_PAD_LEFT) }}
حالة الحجز: {{ $booking->status === 'pending' ? 'بانتظار التأكيد' : 'مؤكد' }}
===============================

معلومات الطالب:
---------------
الاسم: {{ $booking->student_name }}
البريد الإلكتروني: {{ $booking->student_email }}
@if($booking->student_phone)الهاتف: {{ $booking->student_phone }}@endif
تاريخ التسجيل: {{ $booking->created_at->format('d/m/Y H:i') }}

تفاصيل الحصة:
-------------
التاريخ: {{ $booking->booking_date->format('d/m/Y') }} ({{ $booking->booking_date->locale('ar')->translatedFormat('l') }})
الوقت: {{ $booking->booking_date->format('H:i') }} بتوقيت السعودية
@if($booking->subject)المادة: {{ $booking->subject->name }}@endif
المدة: {{ $booking->getDurationFormatted() }}
المبلغ الإجمالي: {{ number_format($booking->total_price, 0) }} ريال سعودي
السعر بالساعة: {{ number_format($booking->total_price / ($booking->duration_minutes / 60), 0) }} ريال/ساعة

@if($booking->student_notes)
ملاحظات الطالب:
--------------
"{{ $booking->student_notes }}"
@endif

@if($booking->status === 'pending')
⚠️ مطلوب إجراء:
--------------
يجب تأكيد هذا الحجز خلال 24 ساعة
يرجى مراجعة التفاصيل والتأكيد أو الرفض من خلال لوحة التحكم.
@endif

نصائح للحصة:
------------
- راجع ملف الطالب ومستواه قبل الحصة
- حضر المواد والأدوات المناسبة للدرس
- تأكد من جودة الاتصال والصوت والصورة
- ابدأ الحصة بترحيب ودود وتعارف مع الطالب
- استخدم طرق تعليمية تفاعلية ومشوقة

ملخص الأرباح:
--------------
ستحصل على {{ number_format($booking->total_price * 0.8, 0) }} ريال من هذه الحصة
(بعد خصم 20% عمولة المنصة)

الروابط المهمة:
@if($booking->status === 'pending')
تأكيد الحجز: {{ config('app.url') }}/teacher/booking/{{ $booking->id }}/confirm
رفض الحجز: {{ config('app.url') }}/teacher/booking/{{ $booking->id }}/decline
@endif
لوحة التحكم: {{ config('app.url') }}/teacher/dashboard
مراسلة الطالب: mailto:{{ $booking->student_email }}

{{ config('app.name') }}
البريد الإلكتروني: support@{{ request()->getHost() }}
الهاتف: +966 50 123 4567
الموقع: {{ config('app.url') }}

© {{ date('Y') }} {{ config('app.name') }}. جميع الحقوق محفوظة. 