@extends('emails.layouts.base')

@section('subject', 'تذكير: حصتك خلال ' . $hoursUntil . ' ساعة')

@section('preheader', 'حصتك مع ' . $booking->teacher->name . ' ستبدأ خلال ' . $hoursUntil . ' ساعة. استعد الآن!')

@section('hero')
    <!-- Reminder Icon & Message -->
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center">
        <tr>
            <td align="center" style="padding-bottom: 20px;">
                <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 20px;">
                    <span style="font-size: 36px; color: white;">⏰</span>
                </div>
            </td>
        </tr>
        <tr>
            <td align="center">
                <h1 style="color: #d97706; font-size: 28px; font-weight: bold; margin: 0 0 10px 0; direction: rtl;">
                    حصتك قريباً!
                </h1>
                <p style="color: #6b7280; font-size: 18px; margin: 0; direction: rtl;">
                    مرحباً {{ $booking->student_name }}، حصتك مع الأستاذ {{ $booking->teacher->name }} ستبدأ خلال {{ $hoursUntil }} ساعة
                </p>
            </td>
        </tr>
    </table>
@endsection

@section('content')
    <!-- Countdown Timer -->
    <div style="background: linear-gradient(135deg, #fef3c7 0%, #fed7aa 100%); border: 2px solid #f59e0b; border-radius: 12px; padding: 25px; margin-bottom: 30px; text-align: center;">
        <p style="color: #92400e; font-size: 14px; font-weight: bold; margin: 0 0 5px 0; text-transform: uppercase; letter-spacing: 1px;">
            الوقت المتبقي
        </p>
        <h2 style="color: #d97706; font-size: 36px; font-weight: bold; margin: 0;">
            {{ $hoursUntil }} {{ $hoursUntil == 1 ? 'ساعة' : 'ساعات' }}
        </h2>
        <p style="color: #92400e; font-size: 16px; margin: 10px 0 0 0;">
            حتى بداية الحصة
        </p>
    </div>

    <!-- Quick Lesson Info -->
    <div style="background-color: #f8fafc; border-radius: 12px; padding: 25px; margin-bottom: 30px;">
        <h3 style="color: #1f2937; font-size: 20px; font-weight: bold; margin: 0 0 20px 0; border-bottom: 2px solid #f59e0b; padding-bottom: 10px;">
            📋 ملخص الحصة
        </h3>
        
        <!-- Quick Info Grid -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 20px;">
            <tr>
                <td width="25%" style="padding: 15px; text-align: center; background: linear-gradient(135deg, #3b82f6, #1d4ed8); color: white; border-radius: 8px; margin: 5px;">
                    <div style="font-size: 20px; margin-bottom: 5px;">📅</div>
                    <div style="font-size: 12px; opacity: 0.9;">التاريخ</div>
                    <div style="font-size: 14px; font-weight: bold;">{{ $booking->booking_date->format('d/m') }}</div>
                </td>
                <td width="25%" style="padding: 15px; text-align: center; background: linear-gradient(135deg, #8b5cf6, #7c3aed); color: white; border-radius: 8px; margin: 5px;">
                    <div style="font-size: 20px; margin-bottom: 5px;">⏰</div>
                    <div style="font-size: 12px; opacity: 0.9;">الوقت</div>
                    <div style="font-size: 14px; font-weight: bold;">{{ $booking->booking_date->format('H:i') }}</div>
                </td>
                <td width="25%" style="padding: 15px; text-align: center; background: linear-gradient(135deg, #10b981, #059669); color: white; border-radius: 8px; margin: 5px;">
                    <div style="font-size: 20px; margin-bottom: 5px;">👨‍🏫</div>
                    <div style="font-size: 12px; opacity: 0.9;">المدرس</div>
                    <div style="font-size: 14px; font-weight: bold;">{{ Str::limit($booking->teacher->name, 10) }}</div>
                </td>
                <td width="25%" style="padding: 15px; text-align: center; background: linear-gradient(135deg, #f59e0b, #d97706); color: white; border-radius: 8px; margin: 5px;">
                    <div style="font-size: 20px; margin-bottom: 5px;">⏱️</div>
                    <div style="font-size: 12px; opacity: 0.9;">المدة</div>
                    <div style="font-size: 14px; font-weight: bold;">{{ $booking->duration_minutes }}د</div>
                </td>
            </tr>
        </table>

        @if($booking->subject)
        <div style="background: linear-gradient(135deg, #e0f2fe 0%, #b3e5fc 100%); border-radius: 8px; padding: 15px; margin-bottom: 15px; text-align: center;">
            <span style="color: #0277bd; font-weight: bold; font-size: 16px;">📚 {{ $booking->subject->name }}</span>
        </div>
        @endif
    </div>

    <!-- Preparation Checklist -->
    <div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border: 1px solid #22c55e; border-radius: 12px; padding: 25px; margin-bottom: 30px;">
        <h3 style="color: #15803d; font-size: 18px; font-weight: bold; margin: 0 0 15px 0;">
            ✅ قائمة التحضير للحصة
        </h3>
        <ul style="color: #166534; margin: 0; padding-right: 20px; line-height: 2;">
            <li><strong>✓ تأكد من اتصال الإنترنت</strong> - اختبر سرعة الاتصال</li>
            <li><strong>✓ جهز الأدوات المطلوبة</strong> - قلم، ورقة، كتاب المادة</li>
            <li><strong>✓ اختر مكان هادئ</strong> - تجنب الضوضاء والمقاطعات</li>
            <li><strong>✓ اشحن الجهاز</strong> - تأكد من شحن الجهاز أو توصيل الشاحن</li>
            <li><strong>✓ تحديث التطبيق</strong> - تأكد من أن Zoom محدث للإصدار الأحدث</li>
        </ul>
    </div>

    <!-- Technical Support -->
    <div style="background: linear-gradient(135deg, #fef7ff 0%, #f3e8ff 100%); border: 1px solid #a855f7; border-radius: 12px; padding: 20px; margin-bottom: 30px;">
        <h4 style="color: #7c3aed; font-size: 16px; font-weight: bold; margin: 0 0 10px 0;">
            🛠️ دعم تقني سريع
        </h4>
        <p style="color: #6b21a8; margin: 0; line-height: 1.6; font-size: 14px;">
            في حالة مواجهة أي مشكلة تقنية، يمكنك التواصل معنا عبر الواتساب على الرقم: 
            <strong>+966 50 123 4567</strong> وسنقوم بمساعدتك فوراً.
        </p>
    </div>

    <!-- Motivation Message -->
    <div style="text-align: center; background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border-radius: 12px; padding: 25px; margin-bottom: 30px;">
        <p style="color: #0369a1; font-size: 18px; font-weight: 500; margin: 0; line-height: 1.6;">
            استعد لتجربة تعليمية رائعة! 🚀<br>
            نحن متحمسون لرؤية تقدمك التعليمي معنا.
        </p>
    </div>

    @if($booking->student_notes)
    <!-- Student Notes Reminder -->
    <div style="background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%); border-left: 4px solid #f59e0b; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
        <h4 style="color: #92400e; font-size: 16px; font-weight: bold; margin: 0 0 10px 0;">
            📝 ملاحظاتك السابقة
        </h4>
        <p style="color: #78350f; margin: 0; line-height: 1.6; font-style: italic;">
            "{{ $booking->student_notes }}"
        </p>
    </div>
    @endif
@endsection

@section('actions')
    <!-- Action Buttons -->
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="margin: 0 auto;">
        <tr>
            <td align="center" style="padding: 0 10px 20px;">
                <!-- Join Class Button -->
                <a href="{{ config('app.url') }}/booking/{{ $booking->id }}/join" 
                   style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 18px 35px; text-decoration: none; border-radius: 10px; font-weight: bold; font-size: 18px; display: inline-block; text-align: center; min-width: 200px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                    🚀 ادخل الحصة الآن
                </a>
            </td>
        </tr>
        <tr>
            <td align="center" style="padding: 0 10px 10px;">
                <!-- Reschedule Button -->
                <a href="{{ config('app.url') }}/booking/{{ $booking->id }}/reschedule" 
                   style="background: transparent; color: #f59e0b; padding: 12px 25px; text-decoration: none; border: 2px solid #f59e0b; border-radius: 8px; font-weight: 500; font-size: 14px; display: inline-block; text-align: center; min-width: 150px;">
                    📅 إعادة جدولة
                </a>
            </td>
        </tr>
        <tr>
            <td align="center" style="padding: 0 10px;">
                <!-- Contact Teacher -->
                <a href="{{ config('app.url') }}/contact" 
                   style="background: transparent; color: #6b7280; padding: 10px 20px; text-decoration: none; border: 1px solid #d1d5db; border-radius: 6px; font-weight: 400; font-size: 13px; display: inline-block; text-align: center; min-width: 120px;">
                    💬 تواصل مع المدرس
                </a>
            </td>
        </tr>
    </table>
@endsection 