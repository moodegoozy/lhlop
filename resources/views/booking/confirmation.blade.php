@extends('layouts.app')

@section('content')
<div dir="{{ app()->getLocale() === 'ar' ? 'rtl' : 'ltr' }}" class="min-h-screen bg-gray-50 dark:bg-gray-900">
    
    <!-- Success Header -->
    <div class="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-16">
        <div class="container-custom">
            <div class="text-center">
                <div class="text-6xl mb-4">✅</div>
                <h1 class="text-4xl lg:text-6xl font-bold mb-4">تم تأكيد الحجز بنجاح!</h1>
                <p class="text-xl lg:text-2xl text-green-100">سيتم التواصل معك قريباً لتأكيد تفاصيل الحصة</p>
            </div>
        </div>
    </div>

    <div class="container-custom py-12">
        <div class="max-w-4xl mx-auto">
            
            <!-- Booking Details Card -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-8">
                <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">تفاصيل الحجز</h2>
                
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    
                    <!-- Student Information -->
                    <div>
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">معلومات الطالب</h3>
                        <div class="space-y-3">
                            <div class="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
                                <span class="text-gray-600 dark:text-gray-400">الاسم:</span>
                                <span class="font-semibold text-gray-900 dark:text-white">{{ $booking->student_name }}</span>
                            </div>
                            <div class="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
                                <span class="text-gray-600 dark:text-gray-400">البريد الإلكتروني:</span>
                                <span class="font-semibold text-gray-900 dark:text-white">{{ $booking->student_email }}</span>
                            </div>
                            @if($booking->student_phone)
                                <div class="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
                                    <span class="text-gray-600 dark:text-gray-400">الهاتف:</span>
                                    <span class="font-semibold text-gray-900 dark:text-white">{{ $booking->student_phone }}</span>
                                </div>
                            @endif
                        </div>
                    </div>

                    <!-- Teacher Information -->
                    <div>
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">معلومات المدرس</h3>
                        <div class="flex items-center gap-4 mb-4">
                            <img 
                                src="{{ $booking->teacher->image_url }}" 
                                alt="{{ $booking->teacher->name }}"
                                class="w-16 h-16 rounded-full"
                            >
                            <div>
                                <h4 class="font-bold text-gray-900 dark:text-white">{{ $booking->teacher->name }}</h4>
                                <div class="flex items-center gap-1">
                                    @for($i = 1; $i <= 5; $i++)
                                        @if($i <= $booking->teacher->stars['full'])
                                            <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                            </svg>
                                        @else
                                            <svg class="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                            </svg>
                                        @endif
                                    @endfor
                                    <span class="text-sm text-gray-600 dark:text-gray-400 mr-1">
                                        ({{ $booking->teacher->total_ratings }})
                                    </span>
                                </div>
                                <p class="text-sm text-gray-600 dark:text-gray-400">{{ $booking->teacher->qualification }}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Lesson Details -->
                <div class="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-6">تفاصيل الحصة</h3>
                    
                    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        <div class="text-center p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
                            <div class="text-2xl mb-1">📅</div>
                            <div class="text-sm text-gray-600 dark:text-gray-400">التاريخ</div>
                            <div class="font-semibold text-gray-900 dark:text-white">{{ $booking->getFormattedDate() }}</div>
                        </div>
                        
                        <div class="text-center p-4 bg-purple-50 dark:bg-purple-900 rounded-lg">
                            <div class="text-2xl mb-1">⏰</div>
                            <div class="text-sm text-gray-600 dark:text-gray-400">الوقت</div>
                            <div class="font-semibold text-gray-900 dark:text-white">{{ $booking->booking_date->format('H:i') }}</div>
                        </div>
                        
                        <div class="text-center p-4 bg-green-50 dark:bg-green-900 rounded-lg">
                            <div class="text-2xl mb-1">📚</div>
                            <div class="text-sm text-gray-600 dark:text-gray-400">المادة</div>
                            <div class="font-semibold text-gray-900 dark:text-white">{{ $booking->subject->name ?? 'غير محدد' }}</div>
                        </div>
                        
                        <div class="text-center p-4 bg-orange-50 dark:bg-orange-900 rounded-lg">
                            <div class="text-2xl mb-1">⏱️</div>
                            <div class="text-sm text-gray-600 dark:text-gray-400">المدة</div>
                            <div class="font-semibold text-gray-900 dark:text-white">{{ $booking->getDurationFormatted() }}</div>
                        </div>
                        
                        <div class="text-center p-4 bg-yellow-50 dark:bg-yellow-900 rounded-lg">
                            <div class="text-2xl mb-1">💰</div>
                            <div class="text-sm text-gray-600 dark:text-gray-400">التكلفة</div>
                            <div class="font-semibold text-green-600 dark:text-green-400">{{ $booking->getFormattedPrice() }}</div>
                        </div>
                    </div>
                </div>

                <!-- Student Notes -->
                @if($booking->student_notes)
                    <div class="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">ملاحظات الطالب</h3>
                        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                            <p class="text-gray-700 dark:text-gray-300">{{ $booking->student_notes }}</p>
                        </div>
                    </div>
                @endif

                <!-- Booking Reference -->
                <div class="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                    <div class="flex items-center justify-between">
                        <div>
                            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">رقم الحجز</h3>
                            <p class="text-sm text-gray-600 dark:text-gray-400">احتفظ بهذا الرقم للمراجعة</p>
                        </div>
                        <div class="bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg">
                            <span class="text-xl font-mono font-bold text-gray-900 dark:text-white">#{{ str_pad($booking->id, 6, '0', STR_PAD_LEFT) }}</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Next Steps -->
            <div class="bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-2xl p-8 mb-8">
                <h3 class="text-xl font-bold text-blue-800 dark:text-blue-200 mb-4">🚀 الخطوات القادمة</h3>
                <div class="space-y-4">
                    <div class="flex items-start gap-3">
                        <div class="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                        <div>
                            <h4 class="font-semibold text-blue-800 dark:text-blue-200">تأكيد المدرس</h4>
                            <p class="text-blue-700 dark:text-blue-300 text-sm">سيتواصل معك المدرس خلال 24 ساعة لتأكيد الحجز ومناقشة التفاصيل</p>
                        </div>
                    </div>
                    <div class="flex items-start gap-3">
                        <div class="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                        <div>
                            <h4 class="font-semibold text-blue-800 dark:text-blue-200">رابط الحصة</h4>
                            <p class="text-blue-700 dark:text-blue-300 text-sm">ستحصل على رابط Zoom قبل موعد الحصة بـ 30 دقيقة</p>
                        </div>
                    </div>
                    <div class="flex items-start gap-3">
                        <div class="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                        <div>
                            <h4 class="font-semibold text-blue-800 dark:text-blue-200">بداية الحصة</h4>
                            <p class="text-blue-700 dark:text-blue-300 text-sm">كن مستعداً قبل 5 دقائق من الموعد المحدد</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex flex-col sm:flex-row gap-4">
                <a 
                    href="{{ route('home') }}"
                    class="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors text-center"
                >
                    🔍 تصفح المزيد من المدرسين
                </a>
                <a 
                    href="{{ route('contact') }}"
                    class="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors text-center"
                >
                    📞 تواصل معنا
                </a>
            </div>

            <!-- Contact Info -->
            <div class="mt-8 text-center">
                <p class="text-gray-600 dark:text-gray-400 mb-2">
                    في حالة وجود أي استفسارات، لا تتردد في التواصل معنا
                </p>
                <a 
                    href="{{ route('contact') }}"
                    class="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                >
                    📞 تواصل معنا
                </a>
            </div>
        </div>
    </div>
</div>
@endsection 