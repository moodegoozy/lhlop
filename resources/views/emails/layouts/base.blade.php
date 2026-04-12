<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ar" lang="ar" dir="rtl">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="x-apple-disable-message-reformatting" />
    <meta name="format-detection" content="telephone=no" />
    <meta name="format-detection" content="date=no" />
    <meta name="format-detection" content="address=no" />
    <meta name="format-detection" content="email=no" />
    <title>@yield('subject') - {{ config('app.name') }}</title>
    
    <!--[if mso]>
    <noscript>
        <xml>
            <o:OfficeDocumentSettings>
                <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
        </xml>
    </noscript>
    <![endif]-->
    
    <style type="text/css">
        /* Reset & Base Styles */
        table, td, div, h1, h2, h3, h4, h5, h6, p { margin: 0; padding: 0; }
        table { border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
        img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
        body { margin: 0 !important; padding: 0 !important; width: 100% !important; min-width: 100% !important; }
        
        /* Outlook Fixes */
        .ExternalClass { width: 100%; }
        .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div { line-height: 100%; }
        
        /* Dark Mode Support */
        @media (prefers-color-scheme: dark) {
            .email-container { background-color: #1a1a1a !important; }
            .email-body { background-color: #2d2d2d !important; color: #ffffff !important; }
            .email-header { background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%) !important; }
        }
        
        /* Mobile Responsiveness */
        @media only screen and (max-width: 600px) {
            .email-container { width: 100% !important; max-width: 100% !important; }
            .email-wrapper { padding: 10px !important; }
            .email-content { padding: 20px !important; }
            .mobile-hide { display: none !important; }
            .mobile-center { text-align: center !important; }
            .mobile-full-width { width: 100% !important; }
        }
        
        /* RTL Support */
        .rtl-content { direction: rtl; text-align: right; }
        .ltr-content { direction: ltr; text-align: left; }
    </style>
</head>

<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; line-height: 1.6; color: #374151;">
    
    <!-- Preheader Text (Hidden but improves deliverability) -->
    <div style="display: none; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #f8fafc;">
        @yield('preheader', 'منصة التدريس - أفضل تجربة تعليمية أونلاين')
    </div>
    
    <!-- Main Email Container -->
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="100%" class="email-container" style="background-color: #f8fafc; margin: 0; padding: 0;">
        <tr>
            <td align="center" valign="top" style="padding: 20px 10px;">
                
                <!-- Email Wrapper -->
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" class="email-wrapper" style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); overflow: hidden; max-width: 600px; width: 100%;">
                    
                    <!-- Header -->
                    <tr>
                        <td align="center" valign="top" class="email-header" style="background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); padding: 30px 20px;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td align="center" valign="middle">
                                        <!-- Logo -->
                                        <h1 style="color: #ffffff; font-size: 32px; font-weight: bold; margin: 0; text-decoration: none; display: inline-block;">
                                            🎓 {{ config('app.name') }}
                                        </h1>
                                        @if(isset($headerSubtitle))
                                        <p style="color: #e0e7ff; font-size: 16px; margin: 8px 0 0 0; opacity: 0.9;">
                                            {{ $headerSubtitle }}
                                        </p>
                                        @endif
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Main Content Area -->
                    <tr>
                        <td align="center" valign="top" class="email-body" style="background-color: #ffffff; padding: 0;">
                            
                            <!-- Hero Section (if needed) -->
                            @hasSection('hero')
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td align="center" valign="top" style="padding: 40px 30px; background: linear-gradient(135deg, #f0f9ff 0%, #f5f3ff 100%);">
                                        @yield('hero')
                                    </td>
                                </tr>
                            </table>
                            @endif
                            
                            <!-- Main Content -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td align="center" valign="top" class="email-content rtl-content" style="padding: 40px 30px; color: #374151; font-size: 16px; line-height: 1.6; direction: rtl; text-align: right;">
                                        @yield('content')
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Action Buttons Section (if needed) -->
                            @hasSection('actions')
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td align="center" valign="top" style="padding: 0 30px 40px;">
                                        @yield('actions')
                                    </td>
                                </tr>
                            </table>
                            @endif
                            
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td align="center" valign="top" style="background-color: #f9fafb; padding: 30px; border-top: 1px solid #e5e7eb;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td align="center" valign="top" class="rtl-content" style="direction: rtl; text-align: center;">
                                        
                                        <!-- Footer Content -->
                                        <p style="color: #6b7280; font-size: 14px; margin: 0 0 15px 0; line-height: 1.5;">
                                            {{ config('app.name') }} - منصة التدريس الأولى في المملكة العربية السعودية
                                        </p>
                                        
                                        <!-- Contact Info -->
                                        <p style="color: #6b7280; font-size: 14px; margin: 0 0 15px 0; line-height: 1.5;">
                                            📧 البريد الإلكتروني: support@{{ request()->getHost() }}<br>
                                            📱 الهاتف: +966 50 123 4567<br>
                                            🌐 الموقع: <a href="{{ config('app.url') }}" style="color: #3b82f6; text-decoration: none;">{{ request()->getHost() }}</a>
                                        </p>
                                        
                                        <!-- Social Links -->
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="margin: 20px 0;">
                                            <tr>
                                                <td align="center" style="padding: 0 10px;">
                                                    <a href="#" style="color: #3b82f6; text-decoration: none; font-size: 24px;">📘</a>
                                                </td>
                                                <td align="center" style="padding: 0 10px;">
                                                    <a href="#" style="color: #1da1f2; text-decoration: none; font-size: 24px;">🐦</a>
                                                </td>
                                                <td align="center" style="padding: 0 10px;">
                                                    <a href="#" style="color: #0077b5; text-decoration: none; font-size: 24px;">💼</a>
                                                </td>
                                                <td align="center" style="padding: 0 10px;">
                                                    <a href="#" style="color: #25d366; text-decoration: none; font-size: 24px;">💬</a>
                                                </td>
                                            </tr>
                                        </table>
                                        
                                        <!-- Unsubscribe & Legal -->
                                        <p style="color: #9ca3af; font-size: 12px; margin: 20px 0 0 0; line-height: 1.4;">
                                            تم إرسال هذا البريد إلى {{ $recipientEmail ?? 'عميلنا العزيز' }}.<br>
                                            إذا كنت لا ترغب في تلقي هذه الرسائل، يمكنك 
                                            <a href="#" style="color: #6b7280; text-decoration: underline;">إلغاء الاشتراك</a>.<br>
                                            <br>
                                            © {{ date('Y') }} {{ config('app.name') }}. جميع الحقوق محفوظة.<br>
                                            المملكة العربية السعودية، الرياض
                                        </p>
                                        
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
                
            </td>
        </tr>
    </table>
    
    <!-- Tracking Pixel (for analytics) -->
    @if(isset($trackingId))
    <img src="{{ config('app.url') }}/email/track/{{ $trackingId }}" width="1" height="1" style="display: block; width: 1px; height: 1px;" alt="">
    @endif
    
</body>
</html> 