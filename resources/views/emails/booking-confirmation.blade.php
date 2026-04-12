@extends('emails.layouts.base')

@section('subject', 'تم تأكيد حجز حصتك بنجاح')

@section('preheader', 'تم تأكيد حجز حصتك مع ' . $booking->teacher->name . ' بنجاح! جميع التفاصيل والمعلومات داخل الرسالة.')

@section('hero')
    <!-- Success Icon & Message -->
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center">
        <tr>
            <td align="center" style="padding-bottom: 20px;">
                <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #10b981 0%, #059669 100%); border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 20px;">
                    <span style="font-size: 36px; color: white;">✅</span>
                </div>
            </td>
        </tr>
        <tr>
            <td align="center">
                <h1 style="color: #059669; font-size: 28px; font-weight: bold; margin: 0 0 10px 0; direction: rtl;">
                    تم تأكيد حجزك بنجاح!
                </h1>
                <p style="color: #6b7280; font-size: 18px; margin: 0; direction: rtl;">
                    مرحباً {{ $booking->student_name }}، حصتك مع الأستاذ {{ $booking->teacher->name }} تم تأكيدها
                </p>
            </td>
        </tr>
    </table>
@endsection

@section('content')
    <!-- Booking Reference -->
    <div style="background: linear-gradient(135deg, #f0fdf4 0%, #f0f9ff 100%); border: 2px solid #10b981; border-radius: 12px; padding: 25px; margin-bottom: 30px; text-align: center;">
        <p style="color: #059669; font-size: 14px; font-weight: bold; margin: 0 0 5px 0; text-transform: uppercase; letter-spacing: 1px;">
            رقم الحجز
        </p>
        <h2 style="color: #059669; font-size: 32px; font-weight: bold; margin: 0; font-family: 'Courier New', monospace;">
            #{{ str_pad($booking->id, 6, '0', STR_PAD_LEFT) }}
        </h2>
    </div>

    <!-- Teacher Information -->
    <div style="background-color: #f8fafc; border-radius: 12px; padding: 25px; margin-bottom: 30px;">
        <h3 style="color: #1f2937; font-size: 20px; font-weight: bold; margin: 0 0 20px 0; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">
            📚 معلومات المدرس
        </h3>
        
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
            <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #374151;">الاسم:</strong>
                </td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; text-align: left;">
                    <span style="color: #1f2937;">{{ $booking->teacher->name }}</span>
                </td>
            </tr>
            <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #374151;">المؤهل:</strong>
                </td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; text-align: left;">
                    <span style="color: #1f2937;">{{ $booking->teacher->qualification }}</span>
                </td>
            </tr>
            <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #374151;">التقييم:</strong>
                </td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; text-align: left;">
                    <span style="color: #1f2937;">{{ $booking->teacher->rating }} ⭐ ({{ $booking->teacher->total_ratings }} تقييم)</span>
                </td>
            </tr>
            <tr>
                <td style="padding: 10px 0;">
                    <strong style="color: #374151;">الخبرة:</strong>
                </td>
                <td style="padding: 10px 0; text-align: left;">
                    <span style="color: #1f2937;">{{ $booking->teacher->completed_hours }} ساعة تدريس</span>
                </td>
            </tr>
        </table>
    </div>

    <!-- Lesson Details -->
    <div style="background-color: #f8fafc; border-radius: 12px; padding: 25px; margin-bottom: 30px;">
        <h3 style="color: #1f2937; font-size: 20px; font-weight: bold; margin: 0 0 20px 0; border-bottom: 2px solid #8b5cf6; padding-bottom: 10px;">
            📅 تفاصيل الحصة
        </h3>
        
        <!-- Date & Time Cards -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 20px;">
            <tr>
                <td width="50%" style="padding-left: 10px;">
                    <div style="background: linear-gradient(135deg, #3b82f6, #1d4ed8); color: white; padding: 20px; border-radius: 10px; text-align: center;">
                        <div style="font-size: 24px; margin-bottom: 5px;">📅</div>
                        <div style="font-size: 14px; opacity: 0.9; margin-bottom: 5px;">التاريخ</div>
                        <div style="font-size: 18px; font-weight: bold;">{{ $booking->booking_date->format('d/m/Y') }}</div>
                        <div style="font-size: 14px; opacity: 0.8;">{{ $booking->booking_date->locale('ar')->translatedFormat('l') }}</div>
                    </div>
                </td>
                <td width="50%" style="padding-right: 10px;">
                    <div style="background: linear-gradient(135deg, #8b5cf6, #7c3aed); color: white; padding: 20px; border-radius: 10px; text-align: center;">
                        <div style="font-size: 24px; margin-bottom: 5px;">⏰</div>
                        <div style="font-size: 14px; opacity: 0.9; margin-bottom: 5px;">الوقت</div>
                        <div style="font-size: 18px; font-weight: bold;">{{ $booking->booking_date->format('H:i') }}</div>
                        <div style="font-size: 14px; opacity: 0.8;">بتوقيت السعودية</div>
                    </div>
                </td>
            </tr>
        </table>

        <!-- Other Details -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
            @if($booking->subject)
            <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #374151;">المادة:</strong>
                </td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; text-align: left;">
                    <span style="color: #1f2937;">{{ $booking->subject->name }}</span>
                </td>
            </tr>
            @endif
            <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #374151;">مدة الحصة:</strong>
                </td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; text-align: left;">
                    <span style="color: #1f2937;">{{ $booking->getDurationFormatted() }}</span>
                </td>
            </tr>
            <tr>
                <td style="padding: 10px 0;">
                    <strong style="color: #374151;">التكلفة الإجمالية:</strong>
                </td>
                <td style="padding: 10px 0; text-align: left;">
                    <span style="color: #059669; font-weight: bold; font-size: 18px;">{{ $booking->getFormattedPrice() }}</span>
                </td>
            </tr>
        </table>
    </div>

    @if($booking->student_notes)
    <!-- Student Notes -->
    <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-left: 4px solid #f59e0b; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
        <h4 style="color: #92400e; font-size: 16px; font-weight: bold; margin: 0 0 10px 0;">
            📝 ملاحظاتك
        </h4>
        <p style="color: #78350f; margin: 0; line-height: 1.6;">
            {{ $booking->student_notes }}
        </p>
    </div>
    @endif

    <!-- Important Information -->
    <div style="background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); border: 1px solid #3b82f6; border-radius: 12px; padding: 25px; margin-bottom: 30px;">
        <h3 style="color: #1e40af; font-size: 18px; font-weight: bold; margin: 0 0 15px 0;">
            ⚡ معلومات مهمة
        </h3>
        <ul style="color: #1e40af; margin: 0; padding-right: 20px; line-height: 1.8;">
            <li>سيتم إرسال رابط الحصة عبر البريد الإلكتروني قبل الموعد بـ 30 دقيقة</li>
            <li>يرجى التأكد من اتصال الإنترنت قبل موعد الحصة بـ 10 دقائق</li>
            <li>في حالة وجود أي مشكلة تقنية، يرجى التواصل معنا فوراً</li>
            <li>يمكنك إلغاء الحجز قبل الموعد بـ 24 ساعة على الأقل</li>
        </ul>
    </div>

    <!-- Personal Message -->
    <div style="text-align: center; background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border-radius: 12px; padding: 25px; margin-bottom: 30px;">
        <p style="color: #0369a1; font-size: 18px; font-weight: 500; margin: 0; line-height: 1.6;">
            نتمنى لك تجربة تعليمية ممتازة! 🌟<br>
            فريق {{ config('app.name') }} في انتظار ملاحظاتك حول جودة الخدمة.
        </p>
    </div>
@endsection

@section('actions')
    <!-- Action Buttons -->
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="margin: 0 auto;">
        <tr>
            <td align="center" style="padding: 0 10px 20px;">
                <!-- Join Class Button (will be activated 30 mins before) -->
                <a href="{{ config('app.url') }}/booking/{{ $booking->id }}/join" 
                   style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; display: inline-block; text-align: center; min-width: 180px;">
                    🔗 رابط الحصة
                </a>
            </td>
        </tr>
        <tr>
            <td align="center" style="padding: 0 10px;">
                <!-- Contact Support -->
                <a href="{{ config('app.url') }}/contact" 
                   style="background: transparent; color: #6b7280; padding: 12px 25px; text-decoration: none; border: 2px solid #d1d5db; border-radius: 8px; font-weight: 500; font-size: 14px; display: inline-block; text-align: center; min-width: 150px;">
                    📞 تواصل معنا
                </a>
            </td>
        </tr>
    </table>
@endsection 