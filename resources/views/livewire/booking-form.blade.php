<div dir="{{ app()->getLocale() === 'ar' ? 'rtl' : 'ltr' }}" class="min-h-screen bg-gray-50 dark:bg-gray-900">
    
    <!-- Header -->
    <div class="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
        <div class="container-custom">
            <div class="text-center">
                <h1 class="text-3xl lg:text-4xl font-bold mb-2">تأكيد الحجز</h1>
                <p class="text-xl text-blue-100">إكمال بيانات الحجز مع {{ $availability->teacher->name }}</p>
            </div>
        </div>
    </div>

    <div class="container-custom py-8">
        <div class="max-w-4xl mx-auto">
            
            <!-- Timer Warning -->
            <div class="bg-yellow-50 dark:bg-yellow-900 border border-yellow-200 dark:border-yellow-700 rounded-2xl p-6 mb-8">
                <div class="flex items-center justify-between">
                    <div>
                        <h3 class="text-lg font-bold text-yellow-800 dark:text-yellow-200 mb-1">⏰ الوقت المتبقي للحجز</h3>
                        <p class="text-yellow-700 dark:text-yellow-300 text-sm">يرجى إكمال البيانات قبل انتهاء الوقت المحدد</p>
                    </div>
                    <div 
                        x-data="{ 
                            time: {{ $remainingTime }},
                            formatted: '{{ $remainingTimeFormatted }}'
                        }"
                        x-init="
                            setInterval(() => {
                                if (time > 0) {
                                    time--;
                                    let minutes = Math.floor(time / 60);
                                    let seconds = time % 60;
                                    formatted = minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');
                                } else {
                                    $wire.dispatch('temporaryBookingExpired');
                                }
                            }, 1000)
                        "
                        class="text-3xl font-bold text-yellow-800 dark:text-yellow-200"
                        x-text="formatted"
                    ></div>
                </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                <!-- Booking Form -->
                <div class="lg:col-span-2">
                    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                        
                        <form wire:submit.prevent="submitBooking">
                            
                            <!-- Student Information -->
                            <div class="mb-8">
                                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">معلومات الطالب</h3>
                                
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            اسم الطالب *
                                        </label>
                                        <input 
                                            type="text" 
                                            wire:model="studentName"
                                            class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="أدخل اسم الطالب"
                                        >
                                        @error('studentName') <span class="text-red-500 text-sm">{{ $message }}</span> @enderror
                                    </div>

                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            البريد الإلكتروني *
                                        </label>
                                        <input 
                                            type="email" 
                                            wire:model="studentEmail"
                                            class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="student@example.com"
                                        >
                                        @error('studentEmail') <span class="text-red-500 text-sm">{{ $message }}</span> @enderror
                                    </div>

                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            رقم الهاتف
                                        </label>
                                        <input 
                                            type="tel" 
                                            wire:model="studentPhone"
                                            class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="05xxxxxxxx"
                                        >
                                        @error('studentPhone') <span class="text-red-500 text-sm">{{ $message }}</span> @enderror
                                    </div>

                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            المادة المطلوبة *
                                        </label>
                                        <select 
                                            wire:model="selectedSubjectId"
                                            wire:change="calculateTotalPrice"
                                            class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        >
                                            <option value="">اختر المادة</option>
                                            @foreach($availableSubjects as $subject)
                                                <option value="{{ $subject->id }}">{{ $subject->name }}</option>
                                            @endforeach
                                        </select>
                                        @error('selectedSubjectId') <span class="text-red-500 text-sm">{{ $message }}</span> @enderror
                                    </div>
                                </div>
                            </div>

                            <!-- Lesson Details -->
                            <div class="mb-8">
                                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">تفاصيل الحصة</h3>
                                
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            مدة الحصة (بالدقائق) *
                                        </label>
                                        <select 
                                            wire:model="duration"
                                            wire:change="calculateTotalPrice"
                                            class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        >
                                            <option value="30">30 دقيقة</option>
                                            <option value="45">45 دقيقة</option>
                                            <option value="60">60 دقيقة (ساعة)</option>
                                            <option value="90">90 دقيقة (ساعة ونصف)</option>
                                            <option value="120">120 دقيقة (ساعتان)</option>
                                        </select>
                                        @error('duration') <span class="text-red-500 text-sm">{{ $message }}</span> @enderror
                                    </div>

                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            التكلفة الإجمالية
                                        </label>
                                        <div class="w-full px-4 py-3 bg-green-50 dark:bg-green-900 border border-green-300 dark:border-green-700 rounded-lg">
                                            <span class="text-2xl font-bold text-green-600 dark:text-green-400">
                                                {{ number_format($totalPrice, 2) }} ريال
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div class="mt-4">
                                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        ملاحظات إضافية
                                    </label>
                                    <textarea 
                                        wire:model="studentNotes"
                                        rows="4"
                                        class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="أي ملاحظات أو متطلبات خاصة للحصة..."
                                    ></textarea>
                                    @error('studentNotes') <span class="text-red-500 text-sm">{{ $message }}</span> @enderror
                                </div>
                            </div>

                            <!-- Terms and Conditions -->
                            <div class="mb-8">
                                <div class="flex items-start gap-3">
                                    <input 
                                        type="checkbox" 
                                        wire:model="agreedToTerms"
                                        id="terms"
                                        class="mt-1 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    >
                                    <label for="terms" class="text-sm text-gray-700 dark:text-gray-300">
                                        أوافق على <a href="#" class="text-blue-600 dark:text-blue-400 hover:underline">الشروط والأحكام</a> 
                                        و <a href="#" class="text-blue-600 dark:text-blue-400 hover:underline">سياسة الخصوصية</a> *
                                    </label>
                                </div>
                                @error('agreedToTerms') <span class="text-red-500 text-sm">{{ $message }}</span> @enderror
                            </div>

                            <!-- Action Buttons -->
                            <div class="flex gap-4">
                                <button 
                                    type="submit"
                                    class="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
                                    wire:loading.attr="disabled"
                                >
                                    <span wire:loading.remove>
                                        ✅ تأكيد الحجز
                                    </span>
                                    <span wire:loading>
                                        <svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        جاري المعالجة...
                                    </span>
                                </button>

                                <button 
                                    type="button"
                                    wire:click="cancelBooking"
                                    class="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
                                >
                                    ❌ إلغاء الحجز
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <!-- Booking Summary -->
                <div class="space-y-6">
                    
                    <!-- Booking Details -->
                    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">ملخص الحجز</h3>
                        
                        <div class="space-y-4">
                            <div class="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
                                <span class="text-gray-600 dark:text-gray-400">المدرس:</span>
                                <span class="font-semibold text-gray-900 dark:text-white">{{ $availability->teacher->name }}</span>
                            </div>
                            
                            <div class="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
                                <span class="text-gray-600 dark:text-gray-400">التاريخ:</span>
                                <span class="font-semibold text-gray-900 dark:text-white">{{ $availability->getFormattedDate() }}</span>
                            </div>
                            
                            <div class="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
                                <span class="text-gray-600 dark:text-gray-400">الوقت:</span>
                                <span class="font-semibold text-gray-900 dark:text-white">{{ $availability->getFormattedTimeRange() }}</span>
                            </div>
                            
                            @if($selectedSubject)
                                <div class="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
                                    <span class="text-gray-600 dark:text-gray-400">المادة:</span>
                                    <span class="font-semibold text-gray-900 dark:text-white">{{ $selectedSubject->name }}</span>
                                </div>
                            @endif
                            
                            <div class="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
                                <span class="text-gray-600 dark:text-gray-400">المدة:</span>
                                <span class="font-semibold text-gray-900 dark:text-white">{{ $duration }} دقيقة</span>
                            </div>
                            
                            <div class="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
                                <span class="text-gray-600 dark:text-gray-400">السعر/ساعة:</span>
                                <span class="font-semibold text-gray-900 dark:text-white">{{ number_format($availability->getPrice(), 0) }} ريال</span>
                            </div>
                            
                            <div class="flex justify-between text-lg font-bold text-green-600 dark:text-green-400 pt-2">
                                <span>المجموع:</span>
                                <span>{{ number_format($totalPrice, 2) }} ريال</span>
                            </div>
                        </div>
                    </div>

                    <!-- Teacher Info -->
                    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">معلومات المدرس</h3>
                        
                        <div class="flex items-center gap-4 mb-4">
                            <img 
                                src="{{ $availability->teacher->image_url }}" 
                                alt="{{ $availability->teacher->name }}"
                                class="w-16 h-16 rounded-full"
                            >
                            <div>
                                <h4 class="font-bold text-gray-900 dark:text-white">{{ $availability->teacher->name }}</h4>
                                <div class="flex items-center gap-1">
                                    @for($i = 1; $i <= 5; $i++)
                                        @if($i <= $availability->teacher->stars['full'])
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
                                        ({{ $availability->teacher->total_ratings }})
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div class="space-y-2 text-sm">
                            <div class="flex justify-between">
                                <span class="text-gray-600 dark:text-gray-400">المؤهل:</span>
                                <span class="text-gray-900 dark:text-white">{{ $availability->teacher->qualification }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600 dark:text-gray-400">الخبرة:</span>
                                <span class="text-gray-900 dark:text-white">{{ $availability->teacher->completed_hours }} ساعة</span>
                            </div>
                        </div>
                    </div>

                    <!-- Important Notes -->
                    <div class="bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-2xl p-6">
                        <h3 class="text-lg font-bold text-blue-800 dark:text-blue-200 mb-3">ملاحظات مهمة</h3>
                        <ul class="text-sm text-blue-700 dark:text-blue-300 space-y-2">
                            <li>• سيتم إرسال رابط الحصة عبر البريد الإلكتروني قبل الموعد بـ 30 دقيقة</li>
                            <li>• يمكنك إلغاء الحجز قبل الموعد بـ 24 ساعة على الأقل</li>
                            <li>• في حالة عدم الحضور بدون إشعار، سيتم خصم المبلغ كاملاً</li>
                            <li>• الحصة ستكون عبر الإنترنت باستخدام منصة Zoom</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Alert Component -->
    <div 
        x-data="{ show: false, type: '', message: '' }"
        x-on:show-alert.window="
            show = true; 
            type = $event.detail.type; 
            message = $event.detail.message;
            setTimeout(() => show = false, 5000)
        "
        x-show="show"
        x-transition
        class="fixed top-4 right-4 z-50"
        style="display: none;"
    >
        <div 
            class="px-6 py-4 rounded-lg shadow-lg max-w-sm"
            :class="{
                'bg-green-500 text-white': type === 'success',
                'bg-red-500 text-white': type === 'error',
                'bg-yellow-500 text-white': type === 'warning',
                'bg-blue-500 text-white': type === 'info'
            }"
        >
            <p x-text="message"></p>
        </div>
    </div>
</div>
