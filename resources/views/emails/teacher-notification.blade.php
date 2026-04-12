@extends('emails.layouts.base')

@section('subject', 'حجز جديد: ' . $booking->student_name . ' - ' . $booking->booking_date->format('d/m/Y H:i'))

@section('preheader', 'لديك حجز جديد من الطالب ' . $booking->student_name . ' يوم ' . $booking->booking_date->format('d/m/Y') . ' الساعة ' . $booking->booking_date->format('H:i'))

@section('hero')
    <!-- New Booking Icon & Message -->
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center">
        <tr>
            <td align="center" style="padding-bottom: 20px;">
                <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 20px;">
                    <span style="font-size: 36px; color: white;">📚</span>
                </div>
            </td>
        </tr>
        <tr>
            <td align="center">
                <h1 style="color: #1d4ed8; font-size: 28px; font-weight: bold; margin: 0 0 10px 0; direction: rtl;">
                    حجز جديد!
                </h1>
                <p style="color: #6b7280; font-size: 18px; margin: 0; direction: rtl;">
                    أستاذ {{ $booking->teacher->name }}، لديك حجز جديد من الطالب {{ $booking->student_name }}
                </p>
            </td>
        </tr>
    </table>
@endsection

@section('content')
    <!-- Booking Reference -->
    <div style="background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); border: 2px solid #3b82f6; border-radius: 12px; padding: 25px; margin-bottom: 30px; text-align: center;">
        <p style="color: #1e40af; font-size: 14px; font-weight: bold; margin: 0 0 5px 0; text-transform: uppercase; letter-spacing: 1px;">
            رقم الحجز
        </p>
        <h2 style="color: #1d4ed8; font-size: 32px; font-weight: bold; margin: 0; font-family: 'Courier New', monospace;">
            #{{ str_pad($booking->id, 6, '0', STR_PAD_LEFT) }}
        </h2>
        <p style="color: #1e40af; font-size: 14px; margin: 10px 0 0 0;">
            حالة الحجز: <strong style="color: #dc2626;">{{ $booking->status === 'pending' ? 'بانتظار التأكيد' : 'مؤكد' }}</strong>
        </p>
    </div>

    <!-- Student Information -->
    <div style="background-color: #f8fafc; border-radius: 12px; padding: 25px; margin-bottom: 30px;">
        <h3 style="color: #1f2937; font-size: 20px; font-weight: bold; margin: 0 0 20px 0; border-bottom: 2px solid #10b981; padding-bottom: 10px;">
            👨‍🎓 معلومات الطالب
        </h3>
        
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
            <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #374151;">الاسم:</strong>
                </td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; text-align: left;">
                    <span style="color: #1f2937; font-weight: 600;">{{ $booking->student_name }}</span>
                </td>
            </tr>
            <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #374151;">البريد الإلكتروني:</strong>
                </td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; text-align: left;">
                    <a href="mailto:{{ $booking->student_email }}" style="color: #3b82f6; text-decoration: none;">{{ $booking->student_email }}</a>
                </td>
            </tr>
            @if($booking->student_phone)
            <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #374151;">الهاتف:</strong>
                </td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; text-align: left;">
                    <a href="tel:{{ $booking->student_phone }}" style="color: #10b981; text-decoration: none;">{{ $booking->student_phone }}</a>
                </td>
            </tr>
            @endif
            <tr>
                <td style="padding: 10px 0;">
                    <strong style="color: #374151;">تاريخ التسجيل:</strong>
                </td>
                <td style="padding: 10px 0; text-align: left;">
                    <span style="color: #1f2937;">{{ $booking->created_at->format('d/m/Y H:i') }}</span>
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
                <td width="33%" style="padding: 5px;">
                    <div style="background: linear-gradient(135deg, #3b82f6, #1d4ed8); color: white; padding: 20px; border-radius: 10px; text-align: center;">
                        <div style="font-size: 24px; margin-bottom: 5px;">📅</div>
                        <div style="font-size: 14px; opacity: 0.9; margin-bottom: 5px;">التاريخ</div>
                        <div style="font-size: 18px; font-weight: bold;">{{ $booking->booking_date->format('d/m/Y') }}</div>
                        <div style="font-size: 14px; opacity: 0.8;">{{ $booking->booking_date->locale('ar')->translatedFormat('l') }}</div>
                    </div>
                </td>
                <td width="33%" style="padding: 5px;">
                    <div style="background: linear-gradient(135deg, #8b5cf6, #7c3aed); color: white; padding: 20px; border-radius: 10px; text-align: center;">
                        <div style="font-size: 24px; margin-bottom: 5px;">⏰</div>
                        <div style="font-size: 14px; opacity: 0.9; margin-bottom: 5px;">الوقت</div>
                        <div style="font-size: 18px; font-weight: bold;">{{ $booking->booking_date->format('H:i') }}</div>
                        <div style="font-size: 14px; opacity: 0.8;">بتوقيت السعودية</div>
                    </div>
                </td>
                <td width="33%" style="padding: 5px;">
                    <div style="background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 20px; border-radius: 10px; text-align: center;">
                        <div style="font-size: 24px; margin-bottom: 5px;">💰</div>
                        <div style="font-size: 14px; opacity: 0.9; margin-bottom: 5px;">المبلغ</div>
                        <div style="font-size: 18px; font-weight: bold;">{{ number_format($booking->total_price, 0) }}</div>
                        <div style="font-size: 14px; opacity: 0.8;">ريال سعودي</div>
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
                    <span style="color: #1f2937; background: #e0f2fe; padding: 4px 8px; border-radius: 4px; font-size: 14px;">{{ $booking->subject->name }}</span>
                </td>
            </tr>
            @endif
            <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #374151;">مدة الحصة:</strong>
                </td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; text-align: left;">
                    <span style="color: #1f2937; font-weight: 600;">{{ $booking->getDurationFormatted() }}</span>
                </td>
            </tr>
            <tr>
                <td style="padding: 10px 0;">
                    <strong style="color: #374151;">السعر بالساعة:</strong>
                </td>
                <td style="padding: 10px 0; text-align: left;">
                    <span style="color: #059669; font-weight: bold;">{{ number_format($booking->total_price / ($booking->duration_minutes / 60), 0) }} ريال/ساعة</span>
                </td>
            </tr>
        </table>
    </div>

    @if($booking->student_notes)
    <!-- Student Notes -->
    <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-left: 4px solid #f59e0b; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
        <h4 style="color: #92400e; font-size: 16px; font-weight: bold; margin: 0 0 10px 0;">
            📝 ملاحظات الطالب
        </h4>
        <p style="color: #78350f; margin: 0; line-height: 1.6; background: #fffbeb; padding: 15px; border-radius: 6px; font-style: italic;">
            "{{ $booking->student_notes }}"
        </p>
    </div>
    @endif

    <!-- Action Required -->
    @if($booking->status === 'pending')
    <div style="background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%); border: 2px solid #ef4444; border-radius: 12px; padding: 25px; margin-bottom: 30px;">
        <h3 style="color: #dc2626; font-size: 18px; font-weight: bold; margin: 0 0 15px 0;">
            ⚠️ مطلوب إجراء
        </h3>
        <p style="color: #dc2626; margin: 0; line-height: 1.8; font-size: 16px;">
            <strong>يجب تأكيد هذا الحجز خلال 24 ساعة</strong><br>
            يرجى مراجعة التفاصيل والتأكيد أو الرفض من خلال لوحة التحكم.
        </p>
    </div>
    @endif

    <!-- Teacher Tips -->
    <div style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border: 1px solid #0ea5e9; border-radius: 12px; padding: 25px; margin-bottom: 30px;">
        <h3 style="color: #0369a1; font-size: 18px; font-weight: bold; margin: 0 0 15px 0;">
            💡 نصائح للحصة
        </h3>
        <ul style="color: #0c4a6e; margin: 0; padding-right: 20px; line-height: 1.8;">
            <li>راجع ملف الطالب ومستواه قبل الحصة</li>
            <li>حضر المواد والأدوات المناسبة للدرس</li>
            <li>تأكد من جودة الاتصال والصوت والصورة</li>
            <li>ابدأ الحصة بترحيب ودود وتعارف مع الطالب</li>
            <li>استخدم طرق تعليمية تفاعلية ومشوقة</li>
        </ul>
    </div>

    <!-- Earning Summary -->
    <div style="text-align: center; background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%); border-radius: 12px; padding: 25px; margin-bottom: 30px;">
        <h4 style="color: #065f46; font-size: 16px; font-weight: bold; margin: 0 0 10px 0;">
            💵 ملخص الأرباح
        </h4>
        <p style="color: #047857; font-size: 14px; margin: 0; line-height: 1.6;">
            ستحصل على <strong style="font-size: 18px;">{{ number_format($booking->total_price * 0.8, 0) }} ريال</strong> من هذه الحصة<br>
            <span style="font-size: 12px; opacity: 0.8;">(بعد خصم 20% عمولة المنصة)</span>
        </p>
    </div>
@endsection

@section('actions')
    <!-- Action Buttons -->
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="margin: 0 auto;">
        @if($booking->status === 'pending')
        <tr>
            <td align="center" style="padding: 0 10px 15px;">
                <!-- Confirm Booking Button -->
                <a href="{{ config('app.url') }}/teacher/booking/{{ $booking->id }}/confirm" 
                   style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 18px 35px; text-decoration: none; border-radius: 10px; font-weight: bold; font-size: 18px; display: inline-block; text-align: center; min-width: 200px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                    ✅ تأكيد الحجز
                </a>
            </td>
        </tr>
        <tr>
            <td align="center" style="padding: 0 10px 15px;">
                <!-- Decline Booking Button -->
                <a href="{{ config('app.url') }}/teacher/booking/{{ $booking->id }}/decline" 
                   style="background: transparent; color: #ef4444; padding: 15px 30px; text-decoration: none; border: 2px solid #ef4444; border-radius: 8px; font-weight: 500; font-size: 16px; display: inline-block; text-align: center; min-width: 180px;">
                    ❌ رفض الحجز
                </a>
            </td>
        </tr>
        @endif
        <tr>
            <td align="center" style="padding: 0 10px 10px;">
                <!-- Teacher Dashboard -->
                <a href="{{ config('app.url') }}/teacher/dashboard" 
                   style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: 500; font-size: 16px; display: inline-block; text-align: center; min-width: 180px;">
                    📊 لوحة التحكم
                </a>
            </td>
        </tr>
        <tr>
            <td align="center" style="padding: 0 10px;">
                <!-- Contact Student -->
                <a href="mailto:{{ $booking->student_email }}" 
                   style="background: transparent; color: #6b7280; padding: 12px 25px; text-decoration: none; border: 1px solid #d1d5db; border-radius: 6px; font-weight: 400; font-size: 14px; display: inline-block; text-align: center; min-width: 150px;">
                    📧 راسل الطالب
                </a>
            </td>
        </tr>
    </table>
@endsection 