<div class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 animate-fade-in">
        <!-- Header -->
        <div class="text-center">
            <div
                class="mx-auto h-16 w-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg animate-float">
                <svg class="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M15 7a2 2 0 012 2m0 0a2 2 0 012 2m-2-2h-6m6 0v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9a2 2 0 012-2h2M7 7a2 2 0 012-2h6a2 2 0 012 2v2a2 2 0 01-2 2H9a2 2 0 01-2-2V7z" />
                </svg>
            </div>
            <h2 class="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
                {{ __('استرداد كلمة المرور') }}
            </h2>
            <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {{ __('أدخل بريدك الإلكتروني وسنرسل لك رابط إعادة تعيين كلمة المرور') }}
            </p>
        </div>

        <!-- Glass Card -->
        <div class="glass rounded-3xl p-8 shadow-2xl animate-slide-up delay-200">
            <!-- Success Status -->
            @if ($status)
                <div class="success-message mb-6 animate-fade-in">
                    <div class="flex items-center">
                        <svg class="success-icon text-green-500">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <p class="success-text">{{ $status }}</p>
                    </div>
                </div>
            @endif

            <!-- General Error -->
            @error('general')
                <div class="error-message mb-6 animate-fade-in">
                    <div class="flex items-center">
                        <svg class="error-icon text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p class="error-text">{{ $message }}</p>
                    </div>
                </div>
            @enderror

            <form wire:submit="sendResetLink" class="space-y-6">
                <!-- Email Address -->
                <div>
                    <label for="email" class="form-label">
                        <svg class="inline w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M3 8l7.89 3.26a2 2 0 001.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        {{ __('البريد الإلكتروني') }}
                    </label>
                    <input wire:model="email" id="email"
                        class="form-input @error('email') border-red-500 ring-red-500/20 @enderror" type="email"
                        required autofocus autocomplete="email" placeholder="أدخل بريدك الإلكتروني" dir="ltr"
                        @disabled($isSubmitting) />
                    @error('email')
                        <p class="mt-2 text-sm text-red-600 dark:text-red-400 animate-fade-in">{{ $message }}</p>
                    @enderror
                </div>

                <!-- Submit Button -->
                <div class="pt-4">
                    <button type="submit"
                        class="btn w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold shadow-lg hover:from-blue-600 hover:to-purple-700 hover:shadow-xl focus:ring-4 focus:ring-blue-500/20 transform hover:scale-105 active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        @disabled($isSubmitting)>
                        @if ($isSubmitting)
                            <div class="spinner w-5 h-5 ml-2 -mr-1"></div>
                        @else
                            <svg class="w-5 h-5 ml-2 -mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                        @endif
                        {{ $isSubmitting ? __('جاري الإرسال...') : __('إرسال رابط الاسترداد') }}
                    </button>
                </div>

                <!-- Back to Login -->
                <div class="text-center pt-4">
                    <a wire:navigate href="{{ route('login') }}"
                        class="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 inline-flex items-center">
                        <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        {{ __('العودة إلى تسجيل الدخول') }}
                    </a>
                </div>
            </form>
        </div>
    </div>
</div>
