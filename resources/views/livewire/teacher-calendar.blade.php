<div dir="{{ app()->getLocale() === 'ar' ? 'rtl' : 'ltr' }}" class="min-h-screen bg-gray-50 dark:bg-gray-900">

    <!-- Teacher Header -->
    <div class="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
        <div class="container mx-auto px-4">
            <div class="flex flex-col md:flex-row items-center gap-6">
                @if ($teacher->profile_image_url)
                    <img src="{{ $teacher->profile_image_url }}" alt="{{ $teacher->name }}"
                        class="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover">
                @else
                    <div
                        class="w-24 h-24 rounded-full border-4 border-white shadow-lg bg-white/20 flex items-center justify-center">
                        <span class="text-2xl font-bold text-white">{{ $teacher->avatar_initial }}</span>
                    </div>
                @endif

                <div class="text-center md:text-start">
                    <h1 class="text-3xl lg:text-4xl font-bold mb-2">{{ $teacher->name }}</h1>
                    <div class="flex items-center justify-center md:justify-start gap-2 mb-2">
                        <div class="flex items-center">
                            @for ($i = 1; $i <= 5; $i++)
                                @if ($i <= floor($teacher->rating ?? 0))
                                    <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                                        </path>
                                    </svg>
                                @else
                                    <svg class="w-5 h-5 text-white opacity-50" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                                        </path>
                                    </svg>
                                @endif
                            @endfor
                        </div>
                        <span class="text-blue-100">{{ number_format($teacher->rating ?? 0, 1) }} تقييم</span>
                    </div>
                    <p class="text-xl text-blue-100">{{ number_format($teacher->hourly_rate ?? 0, 0) }} ريال/ساعة</p>
                </div>
            </div>
        </div>
    </div>

    <div class="container mx-auto px-4 py-8">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">

            <!-- Calendar Section -->
            <div class="lg:col-span-2">
                <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">

                    <!-- Calendar Header -->
                    <div class="flex items-center justify-between mb-6">
                        <button wire:click="previousMonth"
                            class="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M15 19l-7-7 7-7"></path>
                            </svg>
                        </button>

                        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
                            {{ $currentMonthName }} {{ $currentYear }}
                        </h2>

                        <button wire:click="nextMonth"
                            class="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7">
                                </path>
                            </svg>
                        </button>
                    </div>

                    <!-- Calendar Grid -->
                    <div class="grid grid-cols-7 gap-1 mb-4">
                        <!-- Days Headers -->
                        @php
                            $dayNames = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
                        @endphp
                        @foreach ($dayNames as $day)
                            <div class="p-3 text-center text-sm font-semibold text-gray-600 dark:text-gray-400">
                                {{ $day }}
                            </div>
                        @endforeach

                        <!-- Calendar Days -->
                        @foreach ($calendarDays as $week)
                            @foreach ($week as $day)
                                <button wire:click="selectDate('{{ $day['date'] }}')"
                                    class="p-3 text-center text-sm transition-all duration-200 rounded-lg
                                        @if ($day['isPast']) text-gray-400 cursor-not-allowed
                                        @elseif($day['isCurrentMonth'])
                                            @if ($day['hasAvailability'])
                                                @if ($selectedDate === $day['date'])
                                                    bg-blue-500 text-white font-bold
                                                @else
                                                    text-gray-900 dark:text-white hover:bg-blue-100 dark:hover:bg-blue-900 font-medium @endif
@else
text-gray-500 dark:text-gray-400
                                            @endif
@else
text-gray-300 dark:text-gray-600
                                        @endif
                                        @if ($day['isToday']) ring-2 ring-blue-300 @endif
                                    "
                                    @if ($day['isPast'] || !$day['hasAvailability']) disabled @endif>
                                    <div>{{ $day['day'] }}</div>
                                    @if ($day['hasAvailability'] && !$day['isPast'])
                                        <div class="w-2 h-2 bg-green-500 rounded-full mx-auto mt-1"></div>
                                    @endif
                                </button>
                            @endforeach
                        @endforeach
                    </div>

                    <!-- Legend -->
                    <div class="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <div class="flex items-center gap-2">
                            <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span>متاح للحجز</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <div class="w-3 h-3 bg-blue-500 rounded-full"></div>
                            <span>التاريخ المحدد</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <div class="w-3 h-3 bg-gray-300 rounded-full"></div>
                            <span>غير متاح</span>
                        </div>
                    </div>
                </div>

                <!-- Time Slots -->
                @if ($selectedDateSlots->count() > 0)
                    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mt-6">
                        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">
                            الأوقات المتاحة - {{ \Carbon\Carbon::parse($selectedDate)->format('d/m/Y') }}
                        </h3>

                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            @foreach ($selectedDateSlots as $slot)
                                <button wire:click="selectTimeSlot('{{ $slot['id'] }}')"
                                    class="p-4 rounded-xl border-2 transition-all duration-200 text-center
                                        @if ($slot['is_available']) border-green-300 bg-green-50 hover:bg-green-100 dark:bg-green-900 dark:border-green-700 dark:hover:bg-green-800 text-green-800 dark:text-green-200
                                        @elseif($slot['is_temporarily_reserved'])
                                            border-yellow-300 bg-yellow-50 dark:bg-yellow-900 dark:border-yellow-700 text-yellow-800 dark:text-yellow-200 cursor-not-allowed
                                        @else
                                            border-red-300 bg-red-50 dark:bg-red-900 dark:border-red-700 text-red-800 dark:text-red-200 cursor-not-allowed @endif
                                    "
                                    @if (!$slot['is_available']) disabled @endif>
                                    <div class="font-bold text-lg">{{ $slot['time_range'] }}</div>
                                    <div class="text-sm">{{ $slot['duration'] }} دقيقة</div>
                                    <div class="text-sm font-semibold">{{ number_format($slot['price'], 0) }} ريال
                                    </div>
                                    <div class="text-xs mt-1">
                                        @if ($slot['is_available'])
                                            متاح للحجز
                                        @elseif($slot['is_temporarily_reserved'])
                                            محجوز مؤقتاً
                                        @else
                                            محجوز
                                        @endif
                                    </div>
                                </button>
                            @endforeach
                        </div>
                    </div>
                @elseif($selectedDate)
                    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mt-6 text-center">
                        <div class="text-4xl mb-2">📅</div>
                        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">لا توجد أوقات متاحة</h3>
                        <p class="text-gray-600 dark:text-gray-400">لا توجد أوقات متاحة في هذا التاريخ. يرجى اختيار
                            تاريخ آخر.</p>
                    </div>
                @endif
            </div>

            <!-- Sidebar -->
            <div class="space-y-6">

                <!-- Teacher Info -->
                <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                    <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">معلومات المدرس</h3>

                    @if ($teacher->bio)
                        <div class="mb-4">
                            <p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{{ $teacher->bio }}</p>
                        </div>
                    @endif

                    <div class="space-y-3">
                        <div class="flex justify-between">
                            <span class="text-gray-600 dark:text-gray-400">المؤهل:</span>
                            <span
                                class="font-semibold text-gray-900 dark:text-white">{{ $teacher->latest_qualification ?? 'غير محدد' }}</span>
                        </div>

                        @if ($teacher->general_specialization)
                            <div class="flex justify-between">
                                <span class="text-gray-600 dark:text-gray-400">التخصص:</span>
                                <span
                                    class="font-semibold text-gray-900 dark:text-white">{{ $teacher->general_specialization }}</span>
                            </div>
                        @endif

                        <div class="flex justify-between">
                            <span class="text-gray-600 dark:text-gray-400">الخبرة:</span>
                            <span
                                class="font-semibold text-gray-900 dark:text-white">{{ $teacher->years_of_experience ?? 0 }}
                                سنة</span>
                        </div>

                        <div class="flex justify-between">
                            <span class="text-gray-600 dark:text-gray-400">السعر:</span>
                            <span
                                class="font-semibold text-green-600 dark:text-green-400">{{ number_format($teacher->hourly_rate ?? 0, 0) }}
                                ريال/ساعة</span>
                        </div>

                        @if ($teacher->city)
                            <div class="flex justify-between">
                                <span class="text-gray-600 dark:text-gray-400">المدينة:</span>
                                <span
                                    class="font-semibold text-gray-900 dark:text-white">{{ $teacher->city->name }}</span>
                            </div>
                        @endif
                    </div>
                </div>

                <!-- Categories -->
                <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                    <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">المجالات التي يدرسها</h3>

                    <div class="space-y-2">
                        @forelse($this->teacherCategories as $category)
                            <div class="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900 rounded-lg">
                                <span class="font-medium text-blue-800 dark:text-blue-200">{{ $category->name }}</span>
                                @if ($category->categoryType)
                                    <span
                                        class="text-xs px-2 py-1 bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200 rounded-full">
                                        {{ $category->categoryType->name }}
                                    </span>
                                @endif
                            </div>
                        @empty
                            <p class="text-gray-500 dark:text-gray-400 text-sm">لم يتم تحديد مجالات التدريس بعد</p>
                        @endforelse
                    </div>
                </div>

                <!-- Temporary Booking Timer -->
                @if ($temporaryBooking)
                    <div
                        class="bg-yellow-50 dark:bg-yellow-900 border border-yellow-200 dark:border-yellow-700 rounded-2xl p-6">
                        <h3 class="text-lg font-bold text-yellow-800 dark:text-yellow-200 mb-2">⏰ حجز مؤقت</h3>
                        <p class="text-yellow-700 dark:text-yellow-300 text-sm mb-3">
                            لديك حجز مؤقت سينتهي خلال:
                        </p>
                        <div x-data="{
                            time: {{ $temporaryBooking->getRemainingTimeInSeconds() }},
                            formatted: '{{ $temporaryBooking->getRemainingTimeFormatted() }}'
                        }" x-init="setInterval(() => {
                            if (time > 0) {
                                time--;
                                let minutes = Math.floor(time / 60);
                                let seconds = time % 60;
                                formatted = minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');
                            } else {
                                location.reload();
                            }
                        }, 1000)"
                            class="text-2xl font-bold text-yellow-800 dark:text-yellow-200 text-center mb-4"
                            x-text="formatted"></div>

                        <div class="space-y-2">
                            <a href="{{ route('booking.form', [$temporaryBooking->teacherAvailability, $temporaryBooking]) }}"
                                class="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-center block">
                                إكمال الحجز
                            </a>
                            <button wire:click="cancelTemporaryBooking"
                                class="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                                إلغاء الحجز
                            </button>
                        </div>
                    </div>
                @endif

                <!-- Back Button -->
                <div>
                    <a href="{{ route('home') }}"
                        class="w-full bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-4 rounded-xl transition-colors text-center block">
                        ← العودة للرئيسية
                    </a>
                </div>
            </div>
        </div>
    </div>

    <!-- Alert Component -->
    <div x-data="{ show: false, type: '', message: '' }"
        x-on:show-alert.window="
            show = true; 
            type = $event.detail[0].type; 
            message = $event.detail[0].message;
            setTimeout(() => show = false, 5000)
        "
        x-show="show" x-transition class="fixed top-4 end-4 z-50" style="display: none;">
        <div class="px-6 py-4 rounded-lg shadow-lg max-w-sm"
            :class="{
                'bg-green-500 text-white': type === 'success',
                'bg-red-500 text-white': type === 'error',
                'bg-yellow-500 text-white': type === 'warning',
                'bg-blue-500 text-white': type === 'info'
            }">
            <p x-text="message"></p>
        </div>
    </div>
</div>
