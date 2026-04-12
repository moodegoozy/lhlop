<div class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 animate-fade-in">
        <!-- Header -->
        <div class="text-center">
            <div
                class="mx-auto h-16 w-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg animate-float">
                <svg class="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M15 7a2 2 0 012 2m0 0a2 2 0 012 2m-2-2h-6m6 0v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9a2 2 0 012-2h2M7 7a2 2 0 012-2h6a2 2 0 012 2v2a2 2 0 01-2 2H9a2 2 0 01-2-2V7z" />
                </svg>
            </div>
            <h2 class="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
                {{ __('إعادة تعيين كلمة المرور') }}
            </h2>
            <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {{ __('أدخل كلمة مرور جديدة لحسابك') }}
            </p>
        </div>

        <!-- Glass Card -->
        <div class="glass rounded-3xl p-8 shadow-2xl animate-slide-up delay-200">
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

            <form wire:submit="resetPassword" class="space-y-6">
                <!-- Email Address -->
                <div>
                    <label for="email" class="form-label">
                        <svg class="inline w-4 h-4 ms-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M3 8l7.89 3.26a2 2 0 001.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        {{ __('البريد الإلكتروني') }}
                    </label>
                    <input wire:model="email" id="email"
                        class="form-input @error('email') border-red-500 ring-red-500/20 @enderror" type="email"
                        required autocomplete="username" placeholder="بريدك الإلكتروني" dir="ltr" readonly />
                    @error('email')
                        <p class="mt-2 text-sm text-red-600 dark:text-red-400 animate-fade-in">{{ $message }}</p>
                    @enderror
                </div>

                <!-- Password -->
                <div>
                    <label for="password" class="form-label">
                        <svg class="inline w-4 h-4 ms-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        {{ __('كلمة المرور الجديدة') }}
                    </label>
                    <div class="relative">
                        <input wire:model="password" id="password"
                            class="form-input @error('password') border-red-500 ring-red-500/20 @enderror"
                            type="{{ $showPassword ? 'text' : 'password' }}" required autocomplete="new-password"
                            placeholder="أدخل كلمة مرور قوية" minlength="8" @disabled($isSubmitting) />
                        <button type="button"
                            class="absolute end-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
                            wire:click="togglePasswordVisibility('password')">
                            @if ($showPassword)
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                                </svg>
                            @else
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            @endif
                        </button>
                    </div>
                    @error('password')
                        <p class="mt-2 text-sm text-red-600 dark:text-red-400 animate-fade-in">{{ $message }}</p>
                    @enderror
                    <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        {{ __('يجب أن تحتوي كلمة المرور على 8 أحرف على الأقل') }}
                    </p>
                </div>

                <!-- Confirm Password -->
                <div>
                    <label for="password_confirmation" class="form-label">
                        <svg class="inline w-4 h-4 ms-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {{ __('تأكيد كلمة المرور') }}
                    </label>
                    <div class="relative">
                        <input wire:model="password_confirmation" id="password_confirmation"
                            class="form-input @error('password_confirmation') border-red-500 ring-red-500/20 @enderror"
                            type="{{ $showPasswordConfirmation ? 'text' : 'password' }}" required
                            autocomplete="new-password" placeholder="أعد إدخال كلمة المرور" minlength="8"
                            @disabled($isSubmitting) />
                        <button type="button"
                            class="absolute end-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
                            wire:click="togglePasswordVisibility('confirmation')">
                            @if ($showPasswordConfirmation)
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                                </svg>
                            @else
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            @endif
                        </button>
                    </div>
                    @error('password_confirmation')
                        <p class="mt-2 text-sm text-red-600 dark:text-red-400 animate-fade-in">{{ $message }}</p>
                    @enderror
                </div>

                <!-- Submit Button -->
                <div class="pt-4">
                    <button type="submit"
                        class="btn w-full bg-gradient-to-r from-green-500 to-blue-600 text-white font-semibold shadow-lg hover:from-green-600 hover:to-blue-700 hover:shadow-xl focus:ring-4 focus:ring-green-500/20 transform hover:scale-105 active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        @disabled($isSubmitting)>
                        {{ $isSubmitting ? __('جاري التحديث...') : __('إعادة تعيين كلمة المرور') }}
                        @if ($isSubmitting)
                            <div class="spinner w-5 h-5 ms-2 -me-1"></div>
                        @else
                            <svg class="w-5 h-5 ms-2 -me-1" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        @endif
                    </button>
                </div>

                <!-- Back to Login -->
                <div class="text-center pt-4">
                    <a wire:navigate href="{{ route('login') }}"
                        class="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 inline-flex items-center">
                        <svg class="w-4 h-4 ms-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
