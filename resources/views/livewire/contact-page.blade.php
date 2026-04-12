<div class="min-h-screen pt-8">
    <div class="container-custom">
        <!-- Page Header -->
        <div class="text-center mb-12">
            <h1
                class="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-6">
                {{ __('contact_us') }}
            </h1>
            <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                {{ __('contact_description') }}
            </p>
        </div>

        <div class="grid lg:grid-cols-2 gap-12 items-start">
            <!-- Contact Form -->
            <div class="filter-card">
                <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-8">{{ __('send_message') }}</h2>

                <!-- Success Message -->
                @if ($success)
                    <div class="bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-700 text-green-800 dark:text-green-300 px-6 py-4 rounded-xl mb-6 animate-fade-in"
                        x-data="{ show: true }" x-show="show" x-transition x-init="setTimeout(() => show = false, 3000)"
                        @hide-success-message.window="show = false">
                        <div class="flex items-center">
                            <svg class="w-5 h-5 me-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clip-rule="evenodd"></path>
                            </svg>
                            {{ __('message_sent_successfully') }}
                        </div>
                    </div>
                @endif

                <form wire:submit="submit" class="space-y-6">
                    <!-- Name Field -->
                    <div>
                        <label for="name" class="form-label">{{ __('name') }} *</label>
                        <input type="text" id="name" wire:model="name"
                            class="form-input @error('name') border-red-500 focus:border-red-500 focus:ring-red-500/20 @enderror"
                            placeholder="{{ __('enter_your_name') }}">
                        @error('name')
                            <p class="text-red-500 text-sm mt-2">{{ $message }}</p>
                        @enderror
                    </div>

                    <!-- Email Field -->
                    <div>
                        <label for="email" class="form-label">{{ __('email') }} *</label>
                        <input type="email" id="email" wire:model="email"
                            class="form-input @error('email') border-red-500 focus:border-red-500 focus:ring-red-500/20 @enderror"
                            placeholder="{{ __('enter_your_email') }}">
                        @error('email')
                            <p class="text-red-500 text-sm mt-2">{{ $message }}</p>
                        @enderror
                    </div>

                    <!-- Phone Field -->
                    <div>
                        <label for="phone" class="form-label">{{ __('phone') }}</label>
                        <input type="tel" id="phone" wire:model="phone"
                            class="form-input @error('phone') border-red-500 focus:border-red-500 focus:ring-red-500/20 @enderror"
                            placeholder="{{ __('enter_your_phone') }}">
                        @error('phone')
                            <p class="text-red-500 text-sm mt-2">{{ $message }}</p>
                        @enderror
                    </div>

                    <!-- Message Field -->
                    <div>
                        <label for="message" class="form-label">{{ __('message') }} *</label>
                        <textarea id="message" wire:model="message" rows="5"
                            class="form-input @error('message') border-red-500 focus:border-red-500 focus:ring-red-500/20 @enderror"
                            placeholder="{{ __('enter_your_message') }}"></textarea>
                        @error('message')
                            <p class="text-red-500 text-sm mt-2">{{ $message }}</p>
                        @enderror
                    </div>

                    <!-- Submit Button -->
                    <button type="submit"
                        class="btn bg-gradient-to-r from-green-500 to-blue-600 text-white shadow-lg shadow-green-500/30 hover:from-green-600 hover:to-blue-700 hover:shadow-green-600/40 w-full"
                        wire:loading.attr="disabled">
                        <span wire:loading.remove>{{ __('send_message') }}</span>
                        <span wire:loading class="flex items-center justify-center">
                            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg"
                                fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                    stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                </path>
                            </svg>
                            {{ __('sending') }}...
                        </span>
                    </button>
                </form>
            </div>

            <!-- Contact Information -->
            <div class="space-y-8">
                <!-- Contact Info Card -->
                <div class="glass rounded-3xl p-8">
                    <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">{{ __('contact_info') }}</h3>

                    <!-- Email -->
                    <div class="flex items-center space-x-4 mb-6">
                        <div
                            class="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z">
                                </path>
                            </svg>
                        </div>
                        <div>
                            <div class="font-semibold text-gray-900 dark:text-white">{{ __('email') }}</div>
                            <div class="text-gray-600 dark:text-gray-300">info@tutor.sami-enazi.cc</div>
                        </div>
                    </div>

                    <!-- Phone -->
                    <div class="flex items-center space-x-4 mb-6">
                        <div
                            class="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z">
                                </path>
                            </svg>
                        </div>
                        <div>
                            <div class="font-semibold text-gray-900 dark:text-white">{{ __('phone') }}</div>
                            <div class="text-gray-600 dark:text-gray-300">+966 50 123 4567</div>
                        </div>
                    </div>

                    <!-- Address -->
                    <div class="flex items-center space-x-4">
                        <div
                            class="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z">
                                </path>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            </svg>
                        </div>
                        <div>
                            <div class="font-semibold text-gray-900 dark:text-white">{{ __('address') }}</div>
                            <div class="text-gray-600 dark:text-gray-300">{{ __('platform_address') }}</div>
                        </div>
                    </div>
                </div>

                <!-- Working Hours -->
                <div class="glass rounded-3xl p-8">
                    <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">{{ __('working_hours') }}</h3>
                    <div class="space-y-3">
                        <div class="flex justify-between">
                            <span class="text-gray-600 dark:text-gray-300">{{ __('sunday_thursday') }}</span>
                            <span class="font-semibold text-gray-900 dark:text-white">9:00 AM - 9:00 PM</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600 dark:text-gray-300">{{ __('friday_saturday') }}</span>
                            <span class="font-semibold text-gray-900 dark:text-white">10:00 AM - 6:00 PM</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
