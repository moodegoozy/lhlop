<div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Back to Home Button -->
    <div class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 z-30 sticky">
        <div class="container mx-auto p-1 flex justify-between">
            <a href="{{ route('home') }}"
                class="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                <x-heroicon-o-arrow-right class="w-5 h-5" />
                <span>العودة</span>
            </a>
            <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                {{ $teacher->name }}
            </h1>
            <div class="flex flex-wrap gap-3 z-10">
                <button wire:click="shareProfile"
                    class="inline-flex items-center gap-2 px-3 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors">
                    <x-heroicon-o-share class="w-4 h-4" />
                </button>

                <button wire:click="reportTeacher"
                    class="inline-flex items-center gap-2 px-3 py-2 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors">
                    <x-heroicon-o-flag class="w-4 h-4" />
                    <span>إبلاغ</span>
                </button>
            </div>
        </div>
    </div>

    <div class="container mx-auto px-4 py-6 space-y-6">

        <!-- Teacher Header Section -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div class="relative">

                <!-- YouTube Video Section -->
                {{-- @if ($teacher->youtube_video_url) --}}
                <div class="aspect-video rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
                    {{-- <iframe src="{{ $teacher->youtube_video_url }}" class="w-full h-full" frameborder="0" --}}
                    <iframe src="https://www.youtube.com/embed/AFXLZ7FEJc4?si=7WQvLr9J6zCmRUYy"
                        title="YouTube video player" frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </div>
                {{-- @endif --}}
            </div>
        </div>

        <!-- Teacher Details Card -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div class="p-1">
                <!-- Header with small profile picture -->
                <div class="flex items-start gap-4 mb-6 relative">
                    <div class="w-8 h-8 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700 flex-shrink-0">
                        @if ($teacher->profile_image_url)
                            <img src="{{ $teacher->profile_image_url }}" alt="{{ $teacher->name }}"
                                class="w-full h-full object-cover">
                        @else
                            <div class="w-full h-full flex items-center justify-center bg-blue-100 dark:bg-blue-900">
                                <span
                                    class="text-sm font-bold text-blue-600 dark:text-blue-400">{{ $teacher->avatar_initial }}</span>
                            </div>
                        @endif
                    </div>
                    <div>
                        <h2 class="font-bold text-gray-900 dark:text-white">{{ $teacher->name }}</h2>
                        <p class="text-sm text-gray-500 dark:text-gray-400">{{ $teacher->latest_qualification }} -
                            {{ $teacher->general_specialization }}</p>
                        </p>
                    </div>
                    <!-- Rating -->
                    <div>
                        <div class="flex items-center gap-2 absolute top-[55%] end-1">
                            <div class="relative w-3 h-3">
                                <!-- Background star -->
                                <x-heroicon-s-star class="w-3 h-3 absolute text-gray-300 dark:text-gray-600" />
                                <!-- Filled portion -->
                                <div class="absolute inset-0 overflow-hidden"
                                    style="width: {{ ($ratings['average'] / 5) * 100 }}%;">
                                    <x-heroicon-s-star class="w-3 h-3 text-yellow-400" />
                                </div>
                            </div>
                            <span
                                class=" text-gray-900 dark:text-white">{{ number_format($ratings['average'], 1) }}</span>
                            <span class="text-sm text-gray-500 dark:text-gray-400">({{ $ratings['total'] }})</span>
                        </div>
                    </div>
                    <div class="flex absolute end-1 top-[10%]">
                        <p class="text-sm text-gray-500 dark:text-gray-400">آخر تحديث:
                            {{ $teacher->updated_at->diffForHumans() }}</p>
                    </div>
                </div>

                <!-- Teacher Details Grid -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <!-- Qualifications -->




                    <!-- Location -->
                    @if ($teacher->city)
                        <div>
                            <h4 class="font-semibold text-gray-900 dark:text-white mb-2">الموقع</h4>
                            <div class="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                                <x-heroicon-o-map-pin class="w-4 h-4" />
                                <span>{{ $teacher->city->name }}</span>
                                <!-- Distance would be calculated based on user location -->
                                <span class="text-sm text-gray-500">(5 كم تقريباً)</span>
                            </div>
                        </div>
                    @endif

                    <!-- Online Status -->
                    <div>
                        <div class="flex items-center gap-2">
                            <div
                                class="w-3 h-3 rounded-full {{ $teacher->is_active ? 'bg-green-500' : 'bg-red-500' }}">
                            </div>
                            <span class="text-gray-700 dark:text-gray-300">
                                {{ $teacher->is_active ? 'متاح الآن' : 'آخر ظهور: منذ ' . $teacher->updated_at->diffForHumans() }}
                            </span>
                        </div>
                    </div>

                    <!-- Current Occupation -->
                    <div>
                        <h4 class="font-semibold inline text-gray-900 dark:text-white mb-2">المهنة الحالية:</h4>
                        <p class="text-gray-700 inline dark:text-gray-300">
                            {{ $teacher->current_occupation ?? 'معلم خصوصي' }}
                        </p>
                    </div>

                    <!-- Service Locations -->
                    <div>
                        <h4 class="font-semibold text-gray-900 dark:text-white mb-2 inline">الحضوري في:</h4>
                        <div class="flex flex-wrap gap-2 inline">
                            @foreach ($teacher->lesson_locations ?? ['online'] as $location)
                                <span
                                    class="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs">
                                    @switch($location)
                                        @case('student_home')
                                            منزل الطالب
                                        @break

                                        @case('teacher_home')
                                            منزل المعلم
                                        @break

                                        @case('public_place')
                                            مكان عام
                                        @break
                                    @endswitch
                                </span>
                            @endforeach
                        </div>
                    </div>
                </div>

                <!-- Footer with Live Chat and Languages -->
                <div
                    class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <button wire:click="startLiveChat"
                        class="inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                        <x-heroicon-o-chat-bubble-left-ellipsis class="w-5 h-5" />
                        <span>محادثة مباشرة</span>
                    </button>

                    <div class="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <!-- Languages -->
                        <div class="flex items-center gap-2 flex-row">
                            <span>اللغات:</span>
                            <span class="font-medium">AR - EN</span>
                        </div>

                        <!-- Teaching Hours -->
                        <div class="flex items-center gap-2">
                            <x-heroicon-o-clock class="w-4 h-4" />
                            <span>{{ number_format($totalHours) }} ساعة تدريس</span>
                        </div>

                        <!-- Experience -->
                        <div class="flex items-center gap-2">
                            <x-heroicon-o-academic-cap class="w-4 h-4" />
                            <span>{{ $teacher->years_of_experience }} سنوات خبرة</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- About Section -->
        @if ($teacher->bio)
            <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">نبذة عن المعلم</h3>
                <p class="text-gray-700 dark:text-gray-300 leading-relaxed">{{ $teacher->bio }}</p>
            </div>
        @endif

        <!-- Qualifications and Experience Files -->
        @if ($teacher->qualification_files || $teacher->experience_files)
            <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- Qualifications -->
                    @if ($teacher->qualification_files)
                        <div>
                            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <x-heroicon-o-document-text class="w-5 h-5" />
                                الشهادات والمؤهلات
                            </h3>
                            <div class="space-y-2">
                                @foreach ($teacher->qualification_files as $file)
                                    <a href="{{ Storage::url($file) }}" target="_blank"
                                        class="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                                        <x-heroicon-o-document-arrow-down
                                            class="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                        <span class="text-gray-700 dark:text-gray-300">{{ basename($file) }}</span>
                                    </a>
                                @endforeach
                            </div>
                        </div>
                    @endif

                    <!-- Experience Files -->
                    @if ($teacher->experience_files)
                        <div>
                            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <x-heroicon-o-briefcase class="w-5 h-5" />
                                الخبرات والتجربة
                            </h3>
                            <div class="space-y-2">
                                @foreach ($teacher->experience_files as $file)
                                    <a href="{{ Storage::url($file) }}" target="_blank"
                                        class="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                                        <x-heroicon-o-document-arrow-down
                                            class="w-5 h-5 text-green-600 dark:text-green-400" />
                                        <span class="text-gray-700 dark:text-gray-300">{{ basename($file) }}</span>
                                    </a>
                                @endforeach
                            </div>
                        </div>
                    @endif
                </div>
            </div>
        @endif

        <!-- Work Calendar -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <x-heroicon-o-calendar-days class="w-6 h-6" />
                جدول العمل الأسبوعي
            </h3>

            <div class="overflow-x-scroll md:overflow-x-auto">
                <div class="grid grid-cols-7 gap-4 min-w-full">
                    @php
                        $days = [
                            'sunday' => 'الأحد',
                            'monday' => 'الإثنين',
                            'tuesday' => 'الثلاثاء',
                            'wednesday' => 'الأربعاء',
                            'thursday' => 'الخميس',
                            'friday' => 'الجمعة',
                            'saturday' => 'السبت',
                        ];
                    @endphp

                    @foreach ($days as $dayKey => $dayName)
                        <div class="text-center">
                            <h4 class="font-semibold text-gray-900 dark:text-white mb-3">{{ $dayName }}</h4>
                            <div class="space-y-2">
                                @forelse($workSchedule[$dayKey] ?? [] as $timeSlot)
                                    <div
                                        class="px-3 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg text-sm">
                                        {{ $timeSlot }}
                                    </div>
                                @empty
                                    <div
                                        class="px-3 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg text-sm">
                                        غير متاح
                                    </div>
                                @endforelse
                            </div>
                        </div>
                    @endforeach
                </div>
            </div>
        </div>

        <!-- Packages Table -->
        @if ($packages)
            <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                <div class="p-6">
                    <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-6">الباقات والخدمات</h3>

                    <div class="overflow-x-auto">
                        <table class="w-full">
                            <thead class="bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    <th
                                        class="px-6 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        اسم الباقة</th>
                                    <th
                                        class="px-6 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        التخصص الفرعي</th>
                                    <th
                                        class="px-6 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        النوع</th>
                                    <th
                                        class="px-6 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        حصص حالية</th>
                                    <th
                                        class="px-6 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        حصص منجزة</th>
                                    <th
                                        class="px-6 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        ساعات مقدمة</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                                @foreach ($packages as $package)
                                    <tr class="hover:bg-gray-50 dark:hover:bg-gray-700">
                                        <td
                                            class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                            {{ $package['name'] }}
                                        </td>
                                        <td
                                            class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                                            {{ $package['sub_name'] }}
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <span
                                                class="inline-flex px-2 py-1 text-xs font-semibold rounded-full 
                                        {{ $package['type'] === 'online'
                                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                                            : ($package['type'] === 'recorded'
                                                ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
                                                : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300') }}">
                                                {{ $package['type'] === 'online' ? 'أونلاين' : ($package['type'] === 'recorded' ? 'مسجل' : 'حضوري') }}
                                            </span>
                                        </td>
                                        <td
                                            class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                                            {{ number_format($package['classes_working']) }}
                                        </td>
                                        <td
                                            class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                                            {{ number_format($package['classes_worked']) }}
                                        </td>
                                        <td
                                            class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                                            {{ number_format($package['hours_provided']) }}
                                        </td>
                                    </tr>
                                @endforeach
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        @endif

        <!-- Statistics Section -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Total Students -->
            <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
                <div
                    class="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <x-heroicon-o-users class="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h4 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">{{ number_format($totalStudents) }}
                </h4>
                <p class="text-gray-600 dark:text-gray-400">عدد الطلاب المدرسين</p>
            </div>

            <!-- Total Hours -->
            <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
                <div
                    class="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <x-heroicon-o-clock class="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <h4 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">{{ number_format($totalHours) }}
                </h4>
                <p class="text-gray-600 dark:text-gray-400">إجمالي الساعات المقدمة</p>
            </div>

            <!-- Experience -->
            <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
                <div
                    class="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <x-heroicon-o-academic-cap class="w-8 h-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h4 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">{{ $teacher->years_of_experience }}
                </h4>
                <p class="text-gray-600 dark:text-gray-400">سنوات الخبرة</p>
            </div>
        </div>

        <!-- Curriculum Support -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">المناهج المدعومة</h3>
            <div class="flex flex-wrap gap-3">
                @foreach (['سعودي', 'مصري', 'قطري'] as $curriculum)
                    <span
                        class="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full">
                        <x-heroicon-o-book-open class="w-4 h-4" />
                        {{ $curriculum }}
                    </span>
                @endforeach
            </div>
        </div>

        <!-- Additional Info Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Joining Date & Education -->
            <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">معلومات إضافية</h3>
                <div class="space-y-3">
                    <div class="flex justify-between">
                        <span class="text-gray-600 dark:text-gray-400">تاريخ الانضمام:</span>
                        <span
                            class="font-medium text-gray-900 dark:text-white">{{ $teacher->created_at->format('Y/m/d') }}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-600 dark:text-gray-400">آخر مؤهل:</span>
                        <span
                            class="font-medium text-gray-900 dark:text-white">{{ $teacher->latest_qualification }}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-600 dark:text-gray-400">سنة التخرج:</span>
                        <span class="font-medium text-gray-900 dark:text-white">2020</span>
                    </div>
                </div>
            </div>

            <!-- Location Map -->
            @if ($teacher->latitude && $teacher->longitude)
                <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                    <div class="p-4 border-b border-gray-200 dark:border-gray-700">
                        <h3 class="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            <x-heroicon-o-map-pin class="w-5 h-5" />
                            الموقع على الخريطة
                        </h3>
                    </div>
                    <div class="aspect-video bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                        <p class="text-gray-500 dark:text-gray-400">خريطة الموقع</p>
                        <!-- You can integrate Google Maps or similar here -->
                    </div>
                </div>
            @endif
        </div>

        <!-- Ratings Breakdown -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-6">تفاصيل التقييمات</h3>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <!-- Rating Overview -->
                <div>
                    <div class="text-center mb-6">
                        <div class="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                            {{ number_format($ratings['average'], 1) }}</div>
                        <div class="flex items-center justify-center mb-2">
                            @for ($i = 1; $i <= 5; $i++)
                                <x-heroicon-s-star
                                    class="w-6 h-6 {{ $i <= floor($ratings['average']) ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600' }}" />
                            @endfor
                        </div>
                        <p class="text-gray-600 dark:text-gray-400">متوسط من {{ $ratings['total'] }} تقييم</p>
                    </div>

                    <!-- Rating Breakdown -->
                    <div class="space-y-3">
                        @for ($star = 5; $star >= 1; $star--)
                            <div class="flex items-center gap-3">
                                <span
                                    class="text-sm font-medium text-gray-700 dark:text-gray-300 w-8">{{ $star }}</span>
                                <x-heroicon-s-star class="w-4 h-4 text-yellow-400" />
                                <div class="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                                    <div class="bg-yellow-400 h-2 rounded-full"
                                        style="width: {{ ($ratings['breakdown'][$star] / $ratings['total']) * 100 }}%">
                                    </div>
                                </div>
                                <span
                                    class="text-sm text-gray-600 dark:text-gray-400 w-8">{{ $ratings['breakdown'][$star] }}</span>
                            </div>
                        @endfor
                    </div>
                </div>

                <!-- Rating Criteria -->
                <div>
                    <h4 class="font-semibold text-gray-900 dark:text-white mb-4">معايير التقييم</h4>
                    <div class="space-y-4">
                        <div class="flex items-center justify-between">
                            <span class="text-gray-700 dark:text-gray-300">جودة العمل</span>
                            <div class="flex items-center gap-2">
                                <div class="flex items-center">
                                    @for ($i = 1; $i <= 5; $i++)
                                        <x-heroicon-s-star
                                            class="w-4 h-4 {{ $i <= floor($ratings['criteria']['quality']) ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600' }}" />
                                    @endfor
                                </div>
                                <span
                                    class="text-sm font-medium text-gray-900 dark:text-white">{{ number_format($ratings['criteria']['quality'], 1) }}</span>
                            </div>
                        </div>

                        <div class="flex items-center justify-between">
                            <span class="text-gray-700 dark:text-gray-300">التواصل والتعامل</span>
                            <div class="flex items-center gap-2">
                                <div class="flex items-center">
                                    @for ($i = 1; $i <= 5; $i++)
                                        <x-heroicon-s-star
                                            class="w-4 h-4 {{ $i <= floor($ratings['criteria']['communication']) ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600' }}" />
                                    @endfor
                                </div>
                                <span
                                    class="text-sm font-medium text-gray-900 dark:text-white">{{ number_format($ratings['criteria']['communication'], 1) }}</span>
                            </div>
                        </div>

                        <div class="flex items-center justify-between">
                            <span class="text-gray-700 dark:text-gray-300">الالتزام بالمواعيد</span>
                            <div class="flex items-center gap-2">
                                <div class="flex items-center">
                                    @for ($i = 1; $i <= 5; $i++)
                                        <x-heroicon-s-star
                                            class="w-4 h-4 {{ $i <= floor($ratings['criteria']['punctuality']) ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600' }}" />
                                    @endfor
                                </div>
                                <span
                                    class="text-sm font-medium text-gray-900 dark:text-white">{{ number_format($ratings['criteria']['punctuality'], 1) }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Comments Section -->
        @if ($comments)
            <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-6">آراء الطلاب</h3>

                <div class="space-y-6">
                    @foreach ($comments as $comment)
                        <div class="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0">
                            <div class="flex items-start gap-4">
                                <div
                                    class="w-12 h-12 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center">
                                    <span class="text-lg font-semibold text-gray-700 dark:text-gray-300">
                                        {{ mb_substr($comment['name'], 0, 1) }}
                                    </span>
                                </div>

                                <div class="flex-1">
                                    <div class="flex items-center gap-3 mb-2">
                                        <h4 class="font-semibold text-gray-900 dark:text-white">{{ $comment['name'] }}
                                        </h4>
                                        <div class="flex items-center">
                                            @for ($i = 1; $i <= 5; $i++)
                                                <x-heroicon-s-star
                                                    class="w-4 h-4 {{ $i <= $comment['rating'] ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600' }}" />
                                            @endfor
                                        </div>
                                        <span
                                            class="text-sm text-gray-500 dark:text-gray-400">{{ $comment['date']->diffForHumans() }}</span>
                                    </div>
                                    <p class="text-gray-700 dark:text-gray-300">{{ $comment['comment'] }}</p>
                                </div>
                            </div>
                        </div>
                    @endforeach
                </div>

                <!-- Load More Comments Button -->
                <div class="text-center mt-6">
                    <button
                        class="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        عرض المزيد من التعليقات
                    </button>
                </div>
            </div>
        @endif

        <!-- Book Course CTA -->
        <div class="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg p-8 text-white text-center">
            <div class="max-w-2xl mx-auto">
                <h3 class="text-2xl font-bold mb-4">هل أنت مستعد لبدء رحلة التعلم؟</h3>
                <p class="text-blue-100 mb-6">احجز حصتك الآن مع {{ $teacher->name }} واستفد من خبرته في التدريس</p>

                <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <button wire:click="bookCourse"
                        class="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors">
                        <x-heroicon-o-calendar-days class="w-5 h-5" />
                        احجز دورة الآن
                    </button>

                    <div class="text-blue-100 text-sm">
                        <span class="font-semibold">{{ $teacher->hourly_rate ?? 150 }} ريال/الساعة</span>
                        <span class="mx-2">•</span>
                        <span>أول حصة مجانية</span>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modals (you can implement these with Alpine.js or Livewire modals) -->

    <!-- Share Modal -->
    <div x-data="{ showShareModal: false }" x-on:show-share-modal.window="showShareModal = true">
        <div x-show="showShareModal" x-transition
            class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            x-on:click="showShareModal = false">
            <div class="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full" x-on:click.stop>
                <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">مشاركة الملف الشخصي</h3>

                <div class="space-y-3">
                    <button
                        class="w-full flex items-center gap-3 p-3 text-start hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                        <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                            <x-heroicon-o-link class="w-4 h-4 text-white" />
                        </div>
                        <span class="text-gray-700 dark:text-gray-300">نسخ الرابط</span>
                    </button>

                    <button
                        class="w-full flex items-center gap-3 p-3 text-start hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                        <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                            <x-heroicon-o-device-phone-mobile class="w-4 h-4 text-white" />
                        </div>
                        <span class="text-gray-700 dark:text-gray-300">مشاركة عبر WhatsApp</span>
                    </button>

                    <button
                        class="w-full flex items-center gap-3 p-3 text-start hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                        <div class="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                            <x-heroicon-o-envelope class="w-4 h-4 text-white" />
                        </div>
                        <span class="text-gray-700 dark:text-gray-300">مشاركة عبر البريد الإلكتروني</span>
                    </button>
                </div>

                <button x-on:click="showShareModal = false"
                    class="w-full mt-4 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                    إغلاق
                </button>
            </div>
        </div>
    </div>

    <!-- Report Modal -->
    <div x-data="{ showReportModal: false }" x-on:show-report-modal.window="showReportModal = true">
        <div x-show="showReportModal" x-transition
            class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            x-on:click="showReportModal = false">
            <div class="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto"
                x-on:click.stop>
                <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">إبلاغ عن المعلم</h3>

                <form class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">سبب
                            الإبلاغ</label>
                        <select
                            class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                            <option>محتوى غير مناسب</option>
                            <option>معلومات مضللة</option>
                            <option>انتهاك الشروط</option>
                            <option>سلوك غير مهني</option>
                            <option>أخرى</option>
                        </select>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">تفاصيل
                            إضافية</label>
                        <textarea rows="4"
                            class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                            placeholder="يرجى وصف المشكلة بالتفصيل..."></textarea>
                    </div>

                    <div class="flex gap-3">
                        <button type="submit"
                            class="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                            إرسال البلاغ
                        </button>
                        <button type="button" x-on:click="showReportModal = false"
                            class="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                            إلغاء
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <!-- Live Chat Modal -->
    <div x-data="{ showChatModal: false }" x-on:start-live-chat.window="showChatModal = true">
        <div x-show="showChatModal" x-transition
            class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            x-on:click="showChatModal = false">
            <div class="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full max-h-[90vh] flex flex-col"
                x-on:click.stop>
                <!-- Chat Header -->
                <div class="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                    <div class="flex items-center gap-3">
                        <div
                            class="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                            <x-heroicon-o-chat-bubble-left-ellipsis
                                class="w-5 h-5 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                            <h3 class="font-semibold text-gray-900 dark:text-white">محادثة مع {{ $teacher->name }}
                            </h3>
                            <p class="text-xs text-green-600 dark:text-green-400">متاح الآن</p>
                        </div>
                    </div>
                    <button x-on:click="showChatModal = false"
                        class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                        <x-heroicon-o-x-mark class="w-6 h-6" />
                    </button>
                </div>

                <!-- Chat Messages -->
                <div class="flex-1 p-4 space-y-4 overflow-y-auto min-h-[300px]">
                    <!-- Welcome Message -->
                    <div class="flex gap-3">
                        <div
                            class="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                            <span
                                class="text-sm font-semibold text-blue-600 dark:text-blue-400">{{ mb_substr($teacher->name, 0, 1) }}</span>
                        </div>
                        <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 max-w-[80%]">
                            <p class="text-sm text-gray-700 dark:text-gray-300">مرحباً! كيف يمكنني مساعدتك اليوم؟</p>
                            <span class="text-xs text-gray-500 dark:text-gray-400">الآن</span>
                        </div>
                    </div>
                </div>

                <!-- Chat Input -->
                <div class="p-4 border-t border-gray-200 dark:border-gray-700">
                    <div class="flex gap-2">
                        <input type="text" placeholder="اكتب رسالتك..."
                            class="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <button
                            class="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                            <x-heroicon-o-paper-airplane class="w-4 h-4" />
                        </button>
                    </div>
                    <p class="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
                        ستحصل على رد خلال دقائق قليلة
                    </p>
                </div>
            </div>
        </div>
    </div>
</div>
