{{-- resources/views/livewire/teacher/availability-management.blade.php --}}

<div class="container mx-auto px-4 py-8">
    <div class="mb-6">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">إدارة الأوقات المتاحة</h1>
        <p class="text-gray-600 dark:text-gray-400 mt-2">قم بإضافة وإدارة أوقاتك المتاحة للتدريس</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Add Availability Form -->
        <div class="lg:col-span-1">
            <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <h2 class="text-lg font-bold text-gray-900 dark:text-white mb-4">إضافة وقت جديد</h2>

                <form wire:submit.prevent="addAvailability" class="space-y-4">
                    <!-- Date -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            التاريخ
                        </label>
                        <input type="date" wire:model="selectedDate" min="{{ now()->format('Y-m-d') }}"
                            class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white">
                        @error('selectedDate')
                            <span class="text-red-500 text-xs mt-1">{{ $message }}</span>
                        @enderror
                    </div>

                    <!-- Time Range -->
                    <div class="grid grid-cols-2 gap-3">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                من الساعة
                            </label>
                            <input type="time" wire:model="startTime"
                                class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white">
                            @error('startTime')
                                <span class="text-red-500 text-xs mt-1">{{ $message }}</span>
                            @enderror
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                إلى الساعة
                            </label>
                            <input type="time" wire:model="endTime"
                                class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white">
                            @error('endTime')
                                <span class="text-red-500 text-xs mt-1">{{ $message }}</span>
                            @enderror
                        </div>
                    </div>

                    <!-- Price -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            السعر بالساعة (ريال)
                        </label>
                        <input type="number" wire:model="pricePerHour" min="0"
                            class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white">
                        @error('pricePerHour')
                            <span class="text-red-500 text-xs mt-1">{{ $message }}</span>
                        @enderror
                    </div>

                    <!-- Recurring Option -->
                    <div>
                        <label class="flex items-center space-x-3 rtl:space-x-reverse">
                            <input type="checkbox" wire:model="isRecurring"
                                class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500">
                            <span class="text-sm text-gray-700 dark:text-gray-300">تكرار أسبوعي</span>
                        </label>
                    </div>

                    @if ($isRecurring)
                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                عدد الأسابيع
                            </label>
                            <select wire:model="recurringWeeks"
                                class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white">
                                @for ($i = 1; $i <= 12; $i++)
                                    <option value="{{ $i }}">{{ $i }} أسابيع</option>
                                @endfor
                            </select>
                        </div>
                    @endif

                    <!-- Submit Button -->
                    <button type="submit"
                        class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                        إضافة الوقت
                    </button>
                </form>
            </div>
        </div>

        <!-- Availability List -->
        <div class="lg:col-span-2">
            <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <h2 class="text-lg font-bold text-gray-900 dark:text-white mb-4">الأوقات المتاحة</h2>

                @if ($availabilities->count() > 0)
                    <div class="space-y-3">
                        @foreach ($availabilities->groupBy(function ($item) {
        return \Carbon\Carbon::parse($item->date)->format('Y-m-d');
    }) as $date => $slots)
                            <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                                <div class="flex items-center justify-between mb-3">
                                    <h3 class="font-semibold text-gray-900 dark:text-white">
                                        {{ \Carbon\Carbon::parse($date)->format('l, d F Y') }}
                                    </h3>
                                    <span class="text-sm text-gray-500 dark:text-gray-400">
                                        {{ \Carbon\Carbon::parse($date)->diffForHumans() }}
                                    </span>
                                </div>

                                <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    @foreach ($slots as $slot)
                                        <div
                                            class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                            <div class="flex items-center space-x-3 rtl:space-x-reverse">
                                                <div
                                                    class="w-2 h-2 rounded-full
                                                    @if ($slot->status == 'available') bg-green-500
                                                    @elseif($slot->status == 'booked') bg-red-500
                                                    @else bg-yellow-500 @endif">
                                                </div>
                                                <div>
                                                    <p class="font-medium text-gray-900 dark:text-white">
                                                        {{ \Carbon\Carbon::parse($slot->start_time)->format('H:i') }} -
                                                        {{ \Carbon\Carbon::parse($slot->end_time)->format('H:i') }}
                                                    </p>
                                                    <p class="text-sm text-gray-500 dark:text-gray-400">
                                                        {{ $slot->price_per_hour ?? $teacher->hourly_rate }} ريال/ساعة
                                                    </p>
                                                </div>
                                            </div>

                                            @if ($slot->status == 'available')
                                                <button wire:click="deleteAvailability({{ $slot->id }})"
                                                    onclick="confirm('هل أنت متأكد من حذف هذا الوقت؟') || event.stopImmediatePropagation()"
                                                    class="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                                                    <svg class="w-4 h-4" fill="none" stroke="currentColor"
                                                        viewBox="0 0 24 24">
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                            stroke-width="2"
                                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                                                        </path>
                                                    </svg>
                                                </button>
                                            @endif
                                        </div>
                                    @endforeach
                                </div>
                            </div>
                        @endforeach
                    </div>
                @else
                    <div class="text-center py-8 text-gray-500 dark:text-gray-400">
                        <svg class="w-12 h-12 mx-auto mb-3 text-gray-400" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        لا توجد أوقات متاحة حالياً
                    </div>
                @endif
            </div>
        </div>
    </div>
</div>
