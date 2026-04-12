{{-- resources/views/livewire/teacher/dashboard.blade.php --}}
@php
    /** @var \App\Models\Teacher $t */
    $t = $teacher ?? auth()->user()?->teacher;

    // Fallback bundle from model accessors (see Teacher::get...Attribute we added)
    $name = $t?->display_name ?? ($t?->name ?? __('Teacher'));
    $imgUrl = $t?->profile_image_url; // accessor: storage/.. or null
    $initial = $t?->avatar_initial ?? 'T'; // accessor: multibyte-safe
    $roleText = $t?->role_label ?? __('Teacher');

    // Pretty date in current locale
    $today = now()
        ->locale(app()->getLocale())
        ->isoFormat('D MMMM YYYY');

@endphp

<div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Header with Teacher Info -->
    <div class="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div class="container mx-auto px-4 py-6">
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-4">
                    @if ($imgUrl)
                        <img src="{{ $imgUrl }}" alt="{{ $name }}"
                            class="w-16 h-16 rounded-full border-4 border-white/20">
                    @else
                        <div
                            class="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center md:text-2xl font-bold">
                            {{ $initial }}
                        </div>
                    @endif
                    <div>
                        <h1 class="md:text-2xl font-bold">مرحباً، {{ $name }}</h1>
                        <p class="text-blue-100">{{ $roleText }} — لوحة تحكم المدرس</p>
                    </div>
                </div>
                <div class="text-end">
                    <p class="text-sm text-blue-100">{{ __('today') }}</p>
                    <p class="text-xl font-semibold">{{ $today }}</p>
                </div>
            </div>
        </div>
    </div>

    <div class="container mx-auto px-4 py-8">
        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <!-- Total Bookings -->
            <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <div class="flex items-center justify-between mb-4">
                    <div class="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg">
                        <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z">
                            </path>
                        </svg>
                    </div>
                    <span class="text-sm text-gray-500 dark:text-gray-400">إجمالي الحجوزات</span>
                </div>
                <p class="text-3xl font-bold text-gray-900 dark:text-white">{{ $stats['total_bookings'] }}</p>
                <p class="text-sm text-orange-600 dark:text-orange-400 mt-2">
                    {{ $stats['pending_bookings'] }} بانتظار التأكيد
                </p>
            </div>

            <!-- Monthly Earnings -->
            <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <div class="flex items-center justify-between mb-4">
                    <div class="bg-green-100 dark:bg-green-900 p-3 rounded-lg">
                        <svg class="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z">
                            </path>
                        </svg>
                    </div>
                    <span class="text-sm text-gray-500 dark:text-gray-400">أرباح الشهر</span>
                </div>
                <p class="text-3xl font-bold text-gray-900 dark:text-white">
                    {{ number_format($stats['this_month_earnings'], 0) }} <span class="text-lg">ريال</span>
                </p>
                <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    الإجمالي: {{ number_format($stats['total_earnings'], 0) }} ريال
                </p>
            </div>

            <!-- Total Hours -->
            <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <div class="flex items-center justify-between mb-4">
                    <div class="bg-purple-100 dark:bg-purple-900 p-3 rounded-lg">
                        <svg class="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </div>
                    <span class="text-sm text-gray-500 dark:text-gray-400">ساعات التدريس</span>
                </div>
                <p class="text-3xl font-bold text-gray-900 dark:text-white">
                    {{ number_format($stats['total_hours'], 1) }}</p>
                <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    {{ $stats['completed_bookings'] }} درس مكتمل
                </p>
            </div>

            <!-- Rating -->
            <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <div class="flex items-center justify-between mb-4">
                    <div class="bg-yellow-100 dark:bg-yellow-900 p-3 rounded-lg">
                        <svg class="w-6 h-6 text-yellow-600 dark:text-yellow-400" fill="currentColor"
                            viewBox="0 0 20 20">
                            <path
                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                            </path>
                        </svg>
                    </div>
                    <span class="text-sm text-gray-500 dark:text-gray-400">التقييم</span>
                </div>
                <p class="text-3xl font-bold text-gray-900 dark:text-white">{{ number_format($stats['rating'], 1) }}
                </p>
                <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    من {{ $stats['total_ratings'] }} تقييم
                </p>
            </div>
        </div>

        <!-- Main Content Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Left Column - Bookings -->
            <div class="lg:col-span-2 space-y-6">
                <!-- Today's Schedule -->
                <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                    <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                        <svg class="w-6 h-6 ms-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z">
                            </path>
                        </svg>
                        جدول اليوم
                    </h2>

                    @if ($todayBookings->count() > 0)
                        <div class="space-y-3">
                            @foreach ($todayBookings as $booking)
                                <div
                                    class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                                    <div class="flex justify-between items-start">
                                        <div class="flex-1">
                                            <div class="flex items-center gap-2 mb-2">
                                                <span class="text-lg font-semibold text-gray-900 dark:text-white">
                                                    {{ Carbon::parse($booking->booking_date)->format('H:i') }}
                                                </span>
                                                <span
                                                    class="px-2 py-1 text-xs rounded-full
                                                    @if ($booking->status == 'confirmed') bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200
                                                    @elseif($booking->status == 'pending') bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200
                                                    @elseif($booking->status == 'completed') bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200
                                                    @else bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 @endif">
                                                    {{ $booking->status == 'confirmed' ? 'مؤكد' : ($booking->status == 'pending' ? 'قيد الانتظار' : ($booking->status == 'completed' ? 'مكتمل' : 'ملغي')) }}
                                                </span>
                                            </div>
                                            <p class="text-gray-900 dark:text-white font-medium">
                                                {{ $booking->student_name }}</p>
                                            <p class="text-sm text-gray-600 dark:text-gray-400">
                                                {{ $booking->subject->name ?? 'غير محدد' }} -
                                                {{ $booking->duration_minutes }} دقيقة
                                            </p>
                                        </div>
                                        <div class="flex gap-2">
                                            @if ($booking->isPending())
                                                <button wire:click="confirmBooking({{ $booking->id }})"
                                                    class="p-2 bg-green-100 hover:bg-green-200 dark:bg-green-900 dark:hover:bg-green-800 text-green-600 dark:text-green-400 rounded-lg transition-colors">
                                                    <svg class="w-4 h-4" fill="none" stroke="currentColor"
                                                        viewBox="0 0 24 24">
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                            stroke-width="2" d="M5 13l4 4L19 7"></path>
                                                    </svg>
                                                </button>
                                            @endif
                                            @if ($booking->canBeCancelled())
                                                <button wire:click="cancelBooking({{ $booking->id }})"
                                                    class="p-2 bg-red-100 hover:bg-red-200 dark:bg-red-900 dark:hover:bg-red-800 text-red-600 dark:text-red-400 rounded-lg transition-colors">
                                                    <svg class="w-4 h-4" fill="none" stroke="currentColor"
                                                        viewBox="0 0 24 24">
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                            stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                                    </svg>
                                                </button>
                                            @endif
                                            @if ($booking->isConfirmed() && $booking->isPast())
                                                <button wire:click="completeBooking({{ $booking->id }})"
                                                    class="p-2 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 text-blue-600 dark:text-blue-400 rounded-lg transition-colors">
                                                    <svg class="w-4 h-4" fill="none" stroke="currentColor"
                                                        viewBox="0 0 24 24">
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                            stroke-width="2"
                                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                    </svg>
                                                </button>
                                            @endif
                                        </div>
                                    </div>
                                </div>
                            @endforeach
                        </div>
                    @else
                        <div class="text-center py-8 text-gray-500 dark:text-gray-400">
                            <svg class="w-12 h-12 mx-auto mb-3 text-gray-400" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z">
                                </path>
                            </svg>
                            لا توجد حجوزات لليوم
                        </div>
                    @endif
                </div>

                <!-- Upcoming Bookings -->
                <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                    <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                        <svg class="w-6 h-6 ms-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        الحجوزات القادمة
                    </h2>

                    @if ($upcomingBookings->count() > 0)
                        <div class="space-y-3">
                            @foreach ($upcomingBookings as $booking)
                                <div
                                    class="flex justify-between items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow">
                                    <div>
                                        <p class="font-semibold text-gray-900 dark:text-white">
                                            {{ $booking->student_name }}</p>
                                        <p class="text-sm text-gray-600 dark:text-gray-400">
                                            {{ Carbon::parse($booking->booking_date)->format('d/m/Y H:i') }}
                                        </p>
                                        <p class="text-sm text-gray-500 dark:text-gray-500">
                                            {{ $booking->subject->name ?? 'غير محدد' }}
                                        </p>
                                    </div>
                                    <div class="text-end">
                                        <p class="text-lg font-bold text-green-600 dark:text-green-400">
                                            {{ number_format($booking->total_price, 0) }} ريال
                                        </p>
                                        <p class="text-sm text-gray-500">{{ $booking->duration_minutes }} دقيقة</p>
                                    </div>
                                </div>
                            @endforeach
                        </div>
                    @else
                        <p class="text-center text-gray-500 dark:text-gray-400 py-4">لا توجد حجوزات قادمة</p>
                    @endif
                </div>
            </div>

            <!-- Right Column - Quick Actions & Info -->
            <div class="space-y-6">
                <!-- Quick Actions -->
                <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                    <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">إجراءات سريعة</h3>
                    <div class="space-y-3">
                        <a href="{{ route('teacher.availability') }}"
                            class="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors">
                            <span class="text-blue-700 dark:text-blue-300 font-medium">إدارة الأوقات المتاحة</span>
                            <svg class="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none"
                                stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M9 5l7 7-7 7"></path>
                            </svg>
                        </a>

                        <a href="{{ route('teacher.profile') }}"
                            class="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 rounded-lg transition-colors">
                            <span class="text-purple-700 dark:text-purple-300 font-medium">تعديل الملف الشخصي</span>
                            <svg class="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none"
                                stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M9 5l7 7-7 7"></path>
                            </svg>
                        </a>

                        <a href="{{ route('teacher.earnings') }}"
                            class="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-lg transition-colors">
                            <span class="text-green-700 dark:text-green-300 font-medium">تقرير الأرباح</span>
                            <svg class="w-5 h-5 text-green-600 dark:text-green-400" fill="none"
                                stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M9 5l7 7-7 7"></path>
                            </svg>
                        </a>
                    </div>
                </div>

                <!-- Available Slots This Week -->
                <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                    <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">الأوقات المتاحة هذا الأسبوع</h3>
                    <div class="text-center">
                        <p class="text-4xl font-bold text-blue-600 dark:text-blue-400">
                            {{ $stats['available_slots_this_week'] }}</p>
                        <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">وقت متاح للحجز</p>
                    </div>
                </div>

                <!-- Profile Completion -->
                <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                    <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">اكتمال الملف الشخصي</h3>
                    <div class="relative pt-1">
                        <div class="flex mb-2 items-center justify-between">
                            <div>
                                <span
                                    class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200 dark:text-blue-200 dark:bg-blue-900">
                                    {{ $teacher->profile_progress }}% مكتمل
                                </span>
                            </div>
                        </div>
                        <div class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200 dark:bg-gray-700">
                            <div style="width:{{ $teacher->profile_progress }}%"
                                class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500">
                            </div>
                        </div>
                    </div>
                    @if ($teacher->profile_progress < 100)
                        <p class="text-sm text-gray-600 dark:text-gray-400">
                            أكمل ملفك الشخصي لزيادة فرص الحصول على حجوزات
                        </p>
                    @endif
                </div>

                <!-- Recent Activity -->
                <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                    <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">النشاط الأخير</h3>
                    @if ($recentBookings->count() > 0)
                        <div class="space-y-3">
                            @foreach ($recentBookings->take(5) as $booking)
                                <div class="flex items-start gap-3">
                                    <div class="flex-shrink-0">
                                        @if ($booking->status == 'confirmed')
                                            <div class="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                                        @elseif($booking->status == 'pending')
                                            <div class="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                                        @elseif($booking->status == 'completed')
                                            <div class="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                                        @else
                                            <div class="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                                        @endif
                                    </div>
                                    <div class="flex-1 min-w-0">
                                        <p class="text-sm text-gray-900 dark:text-white truncate">
                                            {{ $booking->student_name }}
                                        </p>
                                        <p class="text-xs text-gray-500 dark:text-gray-400">
                                            {{ Carbon::parse($booking->created_at)->diffForHumans() }}
                                        </p>
                                    </div>
                                </div>
                            @endforeach
                        </div>
                    @else
                        <p class="text-center text-gray-500 dark:text-gray-400 py-4">لا يوجد نشاط حديث</p>
                    @endif
                </div>
            </div>
        </div>

        <!-- Charts Section -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
            <!-- Monthly Earnings Chart -->
            <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">الأرباح الشهرية</h3>
                <div class="h-64" x-data="earningsChart" x-init="initChart">
                    <canvas x-ref="chart"></canvas>
                </div>
            </div>

            <!-- Booking Trends Chart -->
            <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">اتجاه الحجوزات (آخر 30 يوم)</h3>
                <div class="h-64" x-data="bookingTrendsChart" x-init="initChart">
                    <canvas x-ref="chart"></canvas>
                </div>
            </div>
        </div>
    </div>

    <!-- Alert Component -->
    <div x-data="{ show: false, type: '', message: '' }"
        x-on:show-alert.window="
           show = true; 
           type = $event.detail.type; 
           message = $event.detail.message;
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

@push('scripts')
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script>
        document.addEventListener('alpine:init', () => {
            Alpine.data('earningsChart', () => ({
                initChart() {
                    const ctx = this.$refs.chart.getContext('2d');
                    const isDark = document.documentElement.classList.contains('dark');

                    new Chart(ctx, {
                        type: 'bar',
                        data: {
                            labels: {!! json_encode(array_keys($monthlyEarnings)) !!},
                            datasets: [{
                                label: 'الأرباح (ريال)',
                                data: {!! json_encode(array_values($monthlyEarnings)) !!},
                                backgroundColor: isDark ? 'rgba(59, 130, 246, 0.5)' :
                                    'rgba(59, 130, 246, 0.8)',
                                borderColor: 'rgb(59, 130, 246)',
                                borderWidth: 1
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: {
                                    display: false
                                }
                            },
                            scales: {
                                y: {
                                    beginAtZero: true,
                                    ticks: {
                                        color: isDark ? '#9CA3AF' : '#4B5563'
                                    },
                                    grid: {
                                        color: isDark ? 'rgba(255, 255, 255, 0.1)' :
                                            'rgba(0, 0, 0, 0.1)'
                                    }
                                },
                                x: {
                                    ticks: {
                                        color: isDark ? '#9CA3AF' : '#4B5563'
                                    },
                                    grid: {
                                        display: false
                                    }
                                }
                            }
                        }
                    });
                }
            }));

            Alpine.data('bookingTrendsChart', () => ({
                initChart() {
                    const ctx = this.$refs.chart.getContext('2d');
                    const isDark = document.documentElement.classList.contains('dark');

                    new Chart(ctx, {
                        type: 'line',
                        data: {
                            labels: {!! json_encode(array_keys($bookingTrends)) !!},
                            datasets: [{
                                label: 'عدد الحجوزات',
                                data: {!! json_encode(array_values($bookingTrends)) !!},
                                borderColor: 'rgb(139, 92, 246)',
                                backgroundColor: isDark ? 'rgba(139, 92, 246, 0.1)' :
                                    'rgba(139, 92, 246, 0.2)',
                                tension: 0.4
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: {
                                    display: false
                                }
                            },
                            scales: {
                                y: {
                                    beginAtZero: true,
                                    ticks: {
                                        stepSize: 1,
                                        color: isDark ? '#9CA3AF' : '#4B5563'
                                    },
                                    grid: {
                                        color: isDark ? 'rgba(255, 255, 255, 0.1)' :
                                            'rgba(0, 0, 0, 0.1)'
                                    }
                                },
                                x: {
                                    ticks: {
                                        color: isDark ? '#9CA3AF' : '#4B5563'
                                    },
                                    grid: {
                                        display: false
                                    }
                                }
                            }
                        }
                    });
                }
            }));
        });
    </script>
@endpush
