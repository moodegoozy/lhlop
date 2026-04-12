{{ config('app.name') }} - تذكير بحصتك

مرحباً {{ $booking->student_name }}،

حصتك مع الأستاذ {{ $booking->teacher->name }} ستبدأ خلال {{ $hoursUntil }} {{ $hoursUntil == 1 ? 'ساعة' : 'ساعات' }}!

===============================
ملخص الحصة
===============================
التاريخ: {{ $booking->booking_date->format('d/m/Y') }} ({{ $booking->booking_date->locale('ar')->translatedFormat('l') }})
الوقت: {{ $booking->booking_date->format('H:i') }} بتوقيت السعودية
المدرس: {{ $booking->teacher->name }}
@if($booking->subject)المادة: {{ $booking->subject->name }}@endif
المدة: {{ $booking->duration_minutes }} دقيقة
رقم الحجز: #{{ str_pad($booking->id, 6, '0', STR_PAD_LEFT) }}

قائمة التحضير للحصة:
--------------------
✓ تأكد من اتصال الإنترنت - اختبر سرعة الاتصال
✓ جهز الأدوات المطلوبة - قلم، ورقة، كتاب المادة
✓ اختر مكان هادئ - تجنب الضوضاء والمقاطعات
✓ اشحن الجهاز - تأكد من شحن الجهاز أو توصيل الشاحن
✓ تحديث التطبيق - تأكد من أن Zoom محدث للإصدار الأحدث

@if($booking->student_notes)
ملاحظاتك السابقة:
----------------
"{{ $booking->student_notes }}"
@endif

دعم تقني سريع:
--------------
في حالة مواجهة أي مشكلة تقنية، يمكنك التواصل معنا عبر الواتساب على الرقم: +966 50 123 4567 وسنقوم بمساعدتك فوراً.

رابط الحصة: {{ config('app.url') }}/booking/{{ $booking->id }}/join

استعد لتجربة تعليمية رائعة! نحن متحمسون لرؤية تقدمك التعليمي معنا.

{{ config('app.name') }}
البريد الإلكتروني: support@{{ request()->getHost() }}
الهاتف: +966 50 123 4567
الموقع: {{ config('app.url') }}

© {{ date('Y') }} {{ config('app.name') }}. جميع الحقوق محفوظة. 