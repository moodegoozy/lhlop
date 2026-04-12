<div
    class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-1">
    <div class="container mx-auto px-4 max-w-4xl">
        @if ($showSuccessMessage)
            <!-- Success Message -->
            <div class="glass rounded-3xl p-8 text-center animate-slide-up">
                <div class="inline-flex items-center justify-center w-20 h-20 bg-green-500 rounded-full mb-6">
                    <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                </div>
                <h2 class="text-2xl font-bold text-green-600 mb-4">{{ __('registration_successful') }}</h2>
                <p class="text-gray-600 dark:text-gray-300">{{ __('registration_success_message') }}</p>
            </div>
        @else
            <!-- Progress Indicator -->
            <div class="glass rounded-2xl p-1 sm:p-6 mb-2">
                <div class="flex items-center justify-between overflow-hidden">
                    @php
                        $steps = [
                            1 => ['icon' => 'user', 'label' => __('basic_info')],
                            2 => ['icon' => 'check-circle', 'label' => __('verification')],
                            3 => ['icon' => 'briefcase', 'label' => __('preferences')],
                            4 => ['icon' => 'user-circle', 'label' => __('profile')],
                        ];
                    @endphp

                    @foreach ($steps as $i => $step)
                        <div class="flex items-center {{ $i < 4 ? 'flex-1' : '' }} min-w-0">
                            <div class="flex flex-col items-center min-w-0">
                                <div
                                    class="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center font-semibold transition-all duration-300 flex-shrink-0 {{ $currentStage >= $i ? 'bg-blue-500 text-white shadow-lg' : 'bg-gray-200 dark:bg-gray-700 text-gray-500' }}">
                                    @if ($step['icon'] === 'user')
                                        <svg class="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" fill="none"
                                            stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z">
                                            </path>
                                        </svg>
                                    @elseif ($step['icon'] === 'check-circle')
                                        <svg class="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" fill="none"
                                            stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                    @elseif ($step['icon'] === 'briefcase')
                                        <svg class="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" fill="none"
                                            stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 002 2M8 6v2a2 2 0 002 2h4a2 2 0 002-2V6">
                                            </path>
                                        </svg>
                                    @else
                                        <svg class="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" fill="none"
                                            stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z">
                                            </path>
                                        </svg>
                                    @endif
                                </div>
                                <span
                                    class="text-xs sm:text-sm font-medium mt-1 sm:mt-2 text-center truncate max-w-full {{ $currentStage >= $i ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500' }}">
                                    {{ $step['label'] }}
                                </span>
                            </div>
                            @if ($i < 4)
                                <div
                                    class="flex-1 h-0.5 sm:h-1 mx-1 sm:mx-2 md:mx-4 rounded-full transition-all duration-300 {{ $currentStage > $i ? 'bg-blue-500' : 'bg-gray-200 dark:bg-gray-700' }}">
                                </div>
                            @endif
                        </div>
                    @endforeach
                </div>
            </div>

            <!-- Registration Form -->
            <form wire:submit='nextStage'>

                @if ($currentStage == 1)
                    <!-- Stage 1: Basic Information (keeping existing content) -->
                    <div class="glass rounded-2xl p-2 md:p-6  space-y-6">
                        <!-- Keep all existing Stage 1 content exactly as it is -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <!-- Combined Name with Title -->
                            <div class="relative">
                                <div class="absolute inset-y-0 start-0 ps-3 flex items-center pointer-events-none z-10">
                                    <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z">
                                        </path>
                                    </svg>
                                </div>
                                <div class="flex">
                                    <select wire:model="title"
                                        class="form-control ps-10 rounded-e-none border-e-0 w-30 flex-shrink-0">
                                        <option value="">{{ __('title') }} *</option>
                                        <option value="dr">{{ __('dr') }}</option>
                                        <option value="eng">{{ __('eng') }}</option>
                                        <option value="prof">{{ __('prof') }}</option>
                                        <option value="mr">{{ __('mr') }}</option>
                                        <option value="ms">{{ __('ms') }}</option>
                                        <option value="mrs">{{ __('mrs') }}</option>
                                        <option value="miss">{{ __('miss') }}</option>
                                        <option value="sheikh">{{ __('sheikh') }}</option>
                                    </select>
                                    <input type="text" wire:model="name" class="form-control rounded-s-none flex-1"
                                        placeholder="{{ __('full_name') }} *">
                                </div>
                                @error('name')
                                    <span class="text-red-500 text-sm mt-1">{{ $message }}</span>
                                @enderror
                                @error('title')
                                    <span class="text-red-500 text-sm mt-1">{{ $message }}</span>
                                @enderror
                            </div>
                            <!-- Phone -->
                            <div class="relative">
                                <div
                                    class="absolute inset-y-0 start-[6rem] pe-3 flex items-center pointer-events-none z-10">
                                    <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z">
                                        </path>
                                    </svg>
                                </div>

                                <div x-data="phoneInput()" x-init="initPhone()" wire:ignore class="relative">
                                    <input type="tel" x-ref="phoneInput" class="form-control ps-[4.5rem] pe-4"
                                        placeholder="{{ __('phone_number') }} *"
                                        @input="updatePhone($event.target.value)">

                                    <!-- Validation Status Icon -->
                                    <div class="absolute end-3 top-1/2 transform -translate-y-1/2 z-20"
                                        x-show="validationStatus !== null">
                                        <svg x-show="validationStatus === 'valid'" class="w-5 h-5 text-green-500"
                                            fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                clip-rule="evenodd"></path>
                                        </svg>
                                        <svg x-show="validationStatus === 'invalid'" class="w-5 h-5 text-red-500"
                                            fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                                clip-rule="evenodd"></path>
                                        </svg>
                                    </div>
                                </div>

                                @error('phone')
                                    <span class="text-red-500 text-sm mt-1">{{ $message }}</span>
                                @enderror
                            </div>

                            <!-- Email -->
                            <div class="relative">
                                <div
                                    class="absolute inset-y-0 start-0 ps-3 flex items-center pointer-events-none z-10">
                                    <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207">
                                        </path>
                                    </svg>
                                </div>
                                <input type="email" wire:model="email" class="form-control ps-10"
                                    placeholder="{{ __('email_address') }} *">
                                @error('email')
                                    <span class="text-red-500 text-sm mt-1">{{ $message }}</span>
                                @enderror
                            </div>

                            <!-- Gender & Nationality - Compact Side by Side -->
                            <div class="relative">
                                <div class="grid grid-cols-2 gap-3">
                                    <!-- Gender -->
                                    <div class="relative">
                                        <div
                                            class="absolute inset-y-0 start-0 ps-2 flex items-center pointer-events-none z-10">
                                            <svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor"
                                                viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z">
                                                </path>
                                            </svg>
                                        </div>
                                        <select wire:model="gender" class="form-control ps-10 text-sm">
                                            <option value="">{{ __('gender') }} *</option>
                                            <option value="male">{{ __('male') }}</option>
                                            <option value="female">{{ __('female') }}</option>
                                        </select>
                                    </div>
                                    <!-- Nationality -->
                                    <div class="relative">
                                        <div
                                            class="absolute inset-y-0 start-0 ps-2 flex items-center pointer-events-none z-10">
                                            <svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor"
                                                viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9">
                                                </path>
                                            </svg>
                                        </div>
                                        <select wire:model="nationality" class="form-control ps-10 text-sm">
                                            <option value="">{{ __('nationality') }} *</option>
                                            @foreach ($this->getNationalityOptions() as $key => $value)
                                                <option value="{{ $key }}">{{ $value }}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                </div>

                                <!-- Errors below both fields -->
                                <div class="mt-1">
                                    @error('gender')
                                        <span class="text-red-500 text-sm">{{ $message }}</span>
                                    @enderror
                                    @error('nationality')
                                        <span class="text-red-500 text-sm block">{{ $message }}</span>
                                    @enderror
                                </div>
                            </div>

                            <!-- Latest Qualification & General Specialization - Compact Side by Side -->
                            <div class="relative">

                                <div class="grid grid-cols-2 gap-3">
                                    <!-- Latest Qualification -->
                                    <div class="relative">
                                        <div
                                            class="absolute inset-y-0 start-0 ps-2 flex items-center pointer-events-none z-10">
                                            <svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor"
                                                viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M12 14l9-5-9-5-9 5 9 5z"></path>
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z">
                                                </path>
                                            </svg>
                                        </div>
                                        <select wire:model="latest_qualification" class="form-control ps-8 text-sm">
                                            <option value="">{{ __('qualification') }} *</option>
                                            @foreach ($this->getQualificationOptions() as $key => $value)
                                                <option value="{{ $key }}">{{ $value }}</option>
                                            @endforeach
                                        </select>
                                    </div>

                                    <!-- General Specialization -->
                                    <div class="relative">
                                        <div
                                            class="absolute inset-y-0 start-0 ps-2 flex items-center pointer-events-none z-10">
                                            <svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor"
                                                viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z">
                                                </path>
                                            </svg>
                                        </div>
                                        <select wire:model="general_specialization" class="form-control ps-8 text-sm">
                                            <option value="">{{ __('specialization') }} *</option>
                                            @foreach ($this->getSpecializationOptions() as $key => $value)
                                                <option value="{{ $key }}">{{ $value }}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                </div>

                                <!-- Errors below both fields -->
                                <div class="mt-1">
                                    @error('latest_qualification')
                                        <span class="text-red-500 text-sm">{{ $message }}</span>
                                    @enderror
                                    @error('general_specialization')
                                        <span class="text-red-500 text-sm block">{{ $message }}</span>
                                    @enderror
                                </div>
                            </div>
                            <!-- Country & City - Compact Side by Side -->
                            <div class="relative ">

                                <div class="grid grid-cols-2 gap-3">
                                    <!-- Country -->
                                    <div class="relative">
                                        <div
                                            class="absolute inset-y-0 start-0 ps-2 flex items-center pointer-events-none z-10">
                                            <svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor"
                                                viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z">
                                                </path>
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                            </svg>
                                        </div>
                                        <select wire:model.live="country" class="form-control ps-8 text-sm">
                                            <option value="">{{ __('country') }} *</option>
                                            @foreach ($this->getCountryOptions() as $key => $value)
                                                <option value="{{ $key }}">{{ $value }}</option>
                                            @endforeach
                                        </select>
                                    </div>

                                    <!-- City -->
                                    <div class="relative">
                                        <div
                                            class="absolute inset-y-0 start-0 ps-2 flex items-center pointer-events-none z-10">
                                            <svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor"
                                                viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4">
                                                </path>
                                            </svg>
                                        </div>
                                        <select wire:model="city" class="form-control ps-8 text-sm"
                                            @disabled(empty($country)) wire:loading.attr="disabled"
                                            wire:target="country">
                                            <option value="">{{ __('city') }} *</option>
                                            <option disabled wire:loading wire:target="country">
                                                {{ __('loading') }}…
                                            </option>
                                            @foreach ($availableCities as $cityId => $cityName)
                                                <option value="{{ $cityId }}">{{ $cityName }}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                </div>

                                <!-- Errors below both fields -->
                                <div class="mt-1">
                                    @error('country')
                                        <span class="text-red-500 text-sm">{{ $message }}</span>
                                    @enderror
                                    @error('city')
                                        <span class="text-red-500 text-sm block">{{ $message }}</span>
                                    @enderror
                                </div>
                            </div>


                            <!-- Location Selection with Leaflet Map -->
                            <div class="col-span-1 md:col-span-2" wire:ignore>
                                <div x-data="locationPicker(@json($latitude), @json($longitude))" x-init="init()">

                                    <label
                                        class="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                                        <svg class="w-5 h-5 me-2 text-blue-600" fill="none" stroke="currentColor"
                                            viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z">
                                            </path>
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                        </svg>
                                        {{ __('select_your_location') }}
                                        <span class="text-gray-500 ms-1">({{ __('optional') }})</span>
                                    </label>

                                    <div class="relative">
                                        <!-- Map Container -->
                                        <div x-ref="mapContainer"
                                            class="w-full h-40 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700">
                                        </div>

                                        <!-- Loading Overlay -->
                                        <div x-show="!mapReady"
                                            class="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-xl">
                                            <div class="flex items-center space-x-2 text-gray-500">
                                                <svg class="animate-spin w-5 h-5" fill="none"
                                                    stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15">
                                                    </path>
                                                </svg>
                                                <span class="text-sm">{{ __('loading_map') }}</span>
                                            </div>
                                        </div>

                                        <!-- Controls -->
                                        <div x-show="mapReady"
                                            class="absolute top-2 start-2 z-[1000] flex flex-col space-y-2">
                                            <!-- GPS Location Button -->
                                            <button type="button" @click="getCurrentLocation()"
                                                :disabled="gettingLocation"
                                                class="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg p-2 shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
                                                :title="'{{ __('use_gps_location') }}'">
                                                <svg x-show="!gettingLocation"
                                                    class="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none"
                                                    stroke="currentColor" viewBox="0 0 24 24">
                                                    <circle cx="12" cy="12" r="3"></circle>
                                                    <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"></path>
                                                </svg>
                                                <svg x-show="gettingLocation"
                                                    class="w-5 h-5 text-blue-600 animate-spin" fill="none"
                                                    stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15">
                                                    </path>
                                                </svg>
                                            </button>

                                            <!-- IP Location Button -->
                                            <button type="button" @click="tryIPLocation()"
                                                :disabled="gettingLocation"
                                                class="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg p-2 shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
                                                :title="'{{ __('approximate_location_from_ip') }}'">
                                                <svg class="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none"
                                                    stroke="currentColor" viewBox="0 0 24 24">
                                                    <!-- outer circle -->
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        stroke-width="2" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
                                                    <!-- meridians/parallels -->
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M2.25 12h19.5M12 2.25c2.25 2.4 3.75 5.4 3.75 9.75S14.25 19.35 12 21.75M12 2.25C9.75 4.65 8.25 7.65 8.25 12s1.5 7.35 3.75 9.75" />
                                                </svg>
                                            </button>

                                        </div>

                                        <!-- Success Message -->
                                        <div x-show="showLocationInfo" x-transition
                                            class="absolute bottom-2 start-2 end-2 z-[1000] bg-green-500 text-white px-3 py-2 rounded-lg shadow-lg text-sm">
                                            {{ __('location_updated_successfully') }}
                                        </div>

                                        <!-- Error Message -->
                                        <div x-show="locationError" x-transition
                                            class="absolute bottom-2 start-2 end-2 z-[1000] bg-red-500 text-white px-3 py-2 rounded-lg shadow-lg text-sm">
                                            <span x-text="locationError"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <!-- Navigation -->
                        <div class="flex justify-end pt-3">
                            <button type="submit"
                                class="btn bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-3 rounded-xl">
                                {{ __('next') }}
                                <svg class="w-4 h-4 ms-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M9 5l7 7-7 7"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                @endif

                @if ($currentStage == 2)
                    <!-- Stage 2: Enhanced Category Selection with Pills -->
                    <div class="rounded-2xl p-8 space-y-6">
                        <!-- OTP Verification Section -->
                        @if (!$emailVerified)
                            <div class="glass rounded-xl p-6">
                                <div class="flex items-center mb-4">
                                    <div class="flex-shrink-0">
                                        <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor"
                                            viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.664-.833-2.464 0L5.732 16.5c-.77.833.192 2.5 1.732 2.5z">
                                            </path>
                                        </svg>
                                    </div>
                                    <h4 class="ms-3 text-lg font-semibold">
                                        {{ __('verification_required') }}
                                    </h4>
                                </div>

                                <div class="space-y-4">
                                    <div class="flex gap-3">
                                        <div class="relative flex-1">
                                            <div
                                                class="absolute inset-y-0 start-0 ps-3 flex items-center pointer-events-none z-10">
                                                <svg class="h-5 w-5 text-gray-400" fill="none"
                                                    stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        stroke-width="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14">
                                                    </path>
                                                </svg>
                                            </div>
                                            <input type="text" wire:model="emailOtp" class="form-control ps-10"
                                                placeholder="{{ __('enter_verification_code') }}">
                                        </div>
                                        <button type="button" wire:click="verifyEmailOtp"
                                            class="btn whitespace-nowrap">
                                            {{ __('verify') }}
                                        </button>
                                    </div>
                                    @error('emailOtp')
                                        <span class="text-red-500 text-sm">{{ $message }}</span>
                                    @enderror

                                    <button type="button" wire:click="sendOtpCodes"
                                        class="underline text-blue-600 hover:text-blue-800 visited:text-purple-600 text-sm before:content-['•'] before:me-2">
                                        {{ __('resend_code') }}
                                    </button>
                                </div>
                            </div>
                        @else
                            <div
                                class="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-4 border border-green-200 dark:border-green-800">
                                <div class="flex items-center text-green-600">
                                    <svg class="w-5 h-5 me-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                            clip-rule="evenodd"></path>
                                    </svg>
                                    {{ __('email_verified') }}
                                </div>
                            </div>
                        @endif

                        <!-- Category Selection with Pills -->
                        @if ($emailVerified)
                            <div class="space-y-6">
                                <div class="flex items-center mb-6">
                                    <svg class="w-6 h-6 text-blue-600 me-3" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10">
                                        </path>
                                    </svg>
                                    <h4 class="text-xl font-bold text-gray-900 dark:text-white">
                                        {{ __('select_your_specializations') }}
                                    </h4>
                                </div>

                                <!-- Category Dropdown -->
                                <div x-data="{
                                    open: false,
                                    searchFocused: false
                                }" class="relative">

                                    <!-- Dropdown Trigger -->
                                    <button type="button" @click="open = !open"
                                        class="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 text-left shadow-sm hover:border-blue-400 dark:hover:border-blue-500 transition-colors duration-200 flex items-center justify-between">
                                        <div class="flex items-center">
                                            <svg class="w-5 h-5 text-gray-400 me-3" fill="none"
                                                stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M4 6h16M4 12h16M4 18h16"></path>
                                            </svg>
                                            <span class="text-gray-700 dark:text-gray-300">
                                                {{ __('choose_categories') }}
                                                @if (count($selectedCategories) > 0)
                                                    <span
                                                        class="text-blue-600 font-medium">({{ count($selectedCategories) }}
                                                        {{ __('selected') }})</span>
                                                @endif
                                            </span>
                                        </div>
                                        <svg class="w-5 h-5 text-gray-400 transition-transform duration-200"
                                            :class="{ 'rotate-180': open }" fill="none" stroke="currentColor"
                                            viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M19 9l-7 7-7-7"></path>
                                        </svg>
                                    </button>

                                    <!-- Dropdown Content -->
                                    <div x-show="open" x-transition:enter="transition ease-out duration-200"
                                        x-transition:enter-start="opacity-0 translate-y-1"
                                        x-transition:enter-end="opacity-100 translate-y-0"
                                        x-transition:leave="transition ease-in duration-150"
                                        x-transition:leave-start="opacity-100 translate-y-0"
                                        x-transition:leave-end="opacity-0 translate-y-1" @click.outside="open = false"
                                        class="absolute z-50 w-full mt-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl shadow-lg max-h-96 overflow-hidden">
                                        <!-- Search Input -->
                                        <!-- Search Box -->
                                        <div class="mb-6">
                                            <div class="relative">
                                                <input type="text"
                                                    wire:model.live.debounce.300ms="categorySearchTerm"
                                                    placeholder="{{ __('Search categories...') }}"
                                                    class="w-full ps-10 pe-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">

                                                <x-heroicon-o-magnifying-glass
                                                    class="w-5 h-5 absolute start-3 top-3.5 text-gray-400" />

                                                @if ($categorySearchTerm)
                                                    <button wire:click="$set('categorySearchTerm', '')"
                                                        class="absolute end-3 top-3.5 text-gray-400 hover:text-gray-600">
                                                        <x-heroicon-o-x-mark class="w-5 h-5" />
                                                    </button>
                                                @endif
                                            </div>
                                        </div>


                                        <!-- Categories Tree -->
                                        <div class="max-h-64 overflow-y-auto">
                                            @if ($this->categoriesTree->count() > 0)
                                                @foreach ($this->categoriesTree as $category)
                                                    @include('components.teacher-category-selector', [
                                                        'category' => $category,
                                                        'level' => 0,
                                                        'selectedCategories' => $selectedCategories,
                                                        'expandedCategories' => $expandedCategories,
                                                    ])
                                                @endforeach
                                            @else
                                                <div class="p-4 text-center text-gray-500 dark:text-gray-400">
                                                    {{ __('no_categories_found') }}
                                                </div>
                                            @endif
                                        </div>
                                    </div>
                                </div>

                                <!-- Selected Categories Pills -->
                                @if (count($selectedCategories) > 0)
                                    <div
                                        class="mt-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
                                        <div class="flex items-center mb-3">
                                            <x-heroicon-o-check-circle
                                                class="w-5 h-5 text-blue-600 dark:text-blue-400 me-2" />
                                            <h4 class="text-sm font-semibold text-blue-800 dark:text-blue-200">
                                                {{ __('Selected Categories') }} ({{ count($selectedCategories) }})
                                            </h4>
                                        </div>

                                        <div class="flex flex-wrap gap-2">
                                            @foreach ($selectedCategories as $categoryId => $categoryName)
                                                <span
                                                    class="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100">
                                                    {{ $categoryName }}
                                                    <button wire:click="removeCategorySelection({{ $categoryId }})"
                                                        class="ms-2 text-blue-600 hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-100">
                                                        <x-heroicon-o-x-mark class="w-4 h-4" />
                                                    </button>
                                                </span>
                                            @endforeach
                                        </div>
                                    </div>
                                @endif

                                @error('categories')
                                    <div
                                        class="text-red-500 text-sm bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                                        {{ $message }}
                                    </div>
                                @enderror
                            </div>
                        @endif

                        <!-- Navigation -->
                        <div class="flex justify-between pt-6">
                            <button type="button" wire:click="previousStage"
                                class="btn btn-outline-secondary px-6 py-2 rounded-xl">
                                <svg class="w-4 h-4 me-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M15 19l-7-7 7-7">
                                    </path>
                                </svg>
                                {{ __('previous') }}
                            </button>
                            @if ($emailVerified)
                                <button type="submit"
                                    class="btn bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-3 rounded-xl">
                                    {{ __('next') }}
                                    <svg class="w-4 h-4 ms-2" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M9 5l7 7-7 7">
                                        </path>
                                    </svg>
                                </button>
                            @endif
                        </div>
                    </div>
                @endif

                <!-- Keep existing Stage 3 and Stage 4 content exactly as they are -->
                @if ($currentStage == 3)
                    <!-- Stage 3: Work Preferences (keeping existing content) -->
                    <div class="glass rounded-2xl p-8 space-y-6">
                        <!-- Keep all existing Stage 3 content -->
                        <div class="flex items-center mb-6">
                            <svg class="w-6 h-6 text-blue-600 me-3" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 002 2M8 6v2a2 2 0 002 2h4a2 2 0 002-2V6">
                                </path>
                            </svg>
                            <h3 class="text-xl font-bold text-gray-900 dark:text-white">
                                {{ __('work_preferences') }}
                            </h3>
                        </div>

                        <!-- NEW: Enhanced Academic Details -->
                        <div class="space-y-6 mb-8">
                            <h4 class="text-lg font-semibold text-gray-900 dark:text-white">
                                {{ __('academic_details') }}</h4>

                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <!-- Qualification University -->
                                <div class="relative">
                                    <div
                                        class="absolute inset-y-0 start-0 ps-3 flex items-center pointer-events-none z-10">
                                        <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor"
                                            viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4">
                                            </path>
                                        </svg>
                                    </div>
                                    <input type="text" wire:model="qualification_university"
                                        class="form-control ps-10"
                                        placeholder="{{ __('qualification_university') }} *">
                                    @error('qualification_university')
                                        <span class="text-red-500 text-sm">{{ $message }}</span>
                                    @enderror
                                </div>

                                <!-- Graduation Date -->
                                <div class="relative">
                                    <div
                                        class="absolute inset-y-0 start-0 ps-3 flex items-center pointer-events-none z-10">
                                        <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor"
                                            viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z">
                                            </path>
                                        </svg>
                                    </div>
                                    <input type="date" wire:model="graduation_date" class="form-control ps-10"
                                        max="{{ date('Y-m-d') }}" min="1950-01-01">
                                    @error('graduation_date')
                                        <span class="text-red-500 text-sm">{{ $message }}</span>
                                    @enderror
                                </div>
                            </div>
                        </div>
                        <div class="space-y-8">
                            <!-- Work Schedule -->
                            <div>
                                <label
                                    class="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
                                    <svg class="w-5 h-5 me-2 text-blue-600" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                    {{ __('preferred_schedule') }} *
                                </label>
                                <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    @foreach ($this->getWorkScheduleOptions() as $key => $value)
                                        <label class="schedule-checkbox-item group cursor-pointer">
                                            <input type="checkbox" wire:model="work_schedule"
                                                value="{{ $key }}" class="sr-only">
                                            <div
                                                class="flex items-center p-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/10">
                                                <div
                                                    class="checkbox-icon w-5 h-5 me-3 rounded border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center transition-all duration-200">
                                                    <svg class="w-3 h-3 text-white opacity-0 transition-opacity duration-200"
                                                        fill="currentColor" viewBox="0 0 20 20">
                                                        <path fill-rule="evenodd"
                                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                            clip-rule="evenodd"></path>
                                                    </svg>
                                                </div>
                                                <span
                                                    class="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">{{ $value }}</span>
                                            </div>
                                        </label>
                                    @endforeach
                                </div>
                                @error('work_schedule')
                                    <span class="text-red-500 text-sm mt-2">{{ $message }}</span>
                                @enderror
                            </div>

                            <!-- Teaching Methods -->
                            <div>
                                <label
                                    class="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
                                    <svg class="w-5 h-5 me-2 text-blue-600" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z">
                                        </path>
                                    </svg>
                                    {{ __('teaching_methods') }} *
                                </label>
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    @foreach ($this->getTeachingMethodOptions() as $key => $value)
                                        <label class="schedule-checkbox-item group cursor-pointer">
                                            <input type="checkbox" wire:model="teaching_methods"
                                                value="{{ $key }}" class="sr-only">
                                            <div
                                                class="flex items-center p-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/10">
                                                <div
                                                    class="checkbox-icon w-5 h-5 me-3 rounded border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center transition-all duration-200">
                                                    <svg class="w-3 h-3 text-white opacity-0 transition-opacity duration-200"
                                                        fill="currentColor" viewBox="0 0 20 20">
                                                        <path fill-rule="evenodd"
                                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                            clip-rule="evenodd"></path>
                                                    </svg>
                                                </div>
                                                <span
                                                    class="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">{{ $value }}</span>
                                            </div>
                                        </label>
                                    @endforeach
                                </div>
                                @error('teaching_methods')
                                    <span class="text-red-500 text-sm mt-2">{{ $message }}</span>
                                @enderror
                            </div>
                            <!-- NEW: Lesson Locations -->
                            <div>
                                <label
                                    class="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
                                    <svg class="w-5 h-5 me-2 text-blue-600" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z">
                                        </path>
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                    </svg>
                                    {{ __('lesson_locations') }} *
                                </label>
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    @foreach ($this->getLessonLocationOptions() as $key => $value)
                                        <label class="schedule-checkbox-item group cursor-pointer">
                                            <input type="checkbox" wire:model="lesson_locations"
                                                value="{{ $key }}" class="sr-only">
                                            <div
                                                class="flex items-center p-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/10">
                                                <div
                                                    class="checkbox-icon w-5 h-5 me-3 rounded border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center transition-all duration-200">
                                                    <svg class="w-3 h-3 text-white opacity-0 transition-opacity duration-200"
                                                        fill="currentColor" viewBox="0 0 20 20">
                                                        <path fill-rule="evenodd"
                                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                            clip-rule="evenodd"></path>
                                                    </svg>
                                                </div>
                                                <span
                                                    class="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">{{ $value }}</span>
                                            </div>
                                        </label>
                                    @endforeach
                                </div>
                                @error('lesson_locations')
                                    <span class="text-red-500 text-sm mt-2">{{ $message }}</span>
                                @enderror
                            </div>
                            <!-- File Uploads - Multiple Files Support -->
                            <div class="space-y-6">
                                <!-- Qualifications Files -->
                                <div class="file-upload-container">
                                    <label
                                        class="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                                        <svg class="w-5 h-5 me-2 text-blue-600" fill="none" stroke="currentColor"
                                            viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
                                            </path>
                                        </svg>
                                        {{ __('qualification_documents') }}
                                        <span class="text-gray-500 ms-1">({{ __('optional') }})</span>
                                    </label>

                                    <!-- File Upload Area -->
                                    <div class="file-upload-wrapper">
                                        <input type="file" wire:model="qualification_files" multiple
                                            accept=".pdf" class="file-upload-input">
                                        <div class="file-upload-display">
                                            <svg class="w-8 h-8 text-gray-400 mb-2" fill="none"
                                                stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12">
                                                </path>
                                            </svg>
                                            <p class="text-sm text-gray-600 dark:text-gray-400">
                                                {{ __('multiple_pdf_files_max_5mb_each') }}</p>
                                        </div>
                                    </div>

                                    <!-- Display Selected Files -->
                                    @if (!empty($qualification_files))
                                        <div class="mt-3 space-y-2">
                                            @foreach ($qualification_files as $index => $file)
                                                @if ($file)
                                                    <div
                                                        class="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                                        <div class="flex items-center">
                                                            <svg class="w-4 h-4 text-red-600 me-2" fill="none"
                                                                stroke="currentColor" viewBox="0 0 24 24">
                                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                                    stroke-width="2"
                                                                    d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z">
                                                                </path>
                                                            </svg>
                                                            <span
                                                                class="text-sm text-gray-700 dark:text-gray-300">{{ $file->getClientOriginalName() }}</span>
                                                            <span
                                                                class="text-xs text-gray-500 ms-2">({{ number_format($file->getSize() / 1024, 1) }}
                                                                KB)</span>
                                                        </div>
                                                        <button type="button"
                                                            wire:click="removeQualificationFile({{ $index }})"
                                                            class="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300">
                                                            <svg class="w-4 h-4" fill="none" stroke="currentColor"
                                                                viewBox="0 0 24 24">
                                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                                    stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                                            </svg>
                                                        </button>
                                                    </div>
                                                @endif
                                            @endforeach
                                        </div>
                                    @endif

                                    @error('qualification_files.*')
                                        <span class="text-red-500 text-sm mt-1">{{ $message }}</span>
                                    @enderror
                                </div>

                                <!-- Experience Files -->
                                <div class="file-upload-container">
                                    <label
                                        class="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                                        <svg class="w-5 h-5 me-2 text-blue-600" fill="none" stroke="currentColor"
                                            viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 002 2M8 6v2a2 2 0 002 2h4a2 2 0 002-2V6">
                                            </path>
                                        </svg>
                                        {{ __('experience_documents') }}
                                        <span class="text-gray-500 ms-1">({{ __('optional') }})</span>
                                    </label>

                                    <!-- File Upload Area -->
                                    <div class="file-upload-wrapper">
                                        <input type="file" wire:model="experience_files" multiple accept=".pdf"
                                            class="file-upload-input">
                                        <div class="file-upload-display">
                                            <svg class="w-8 h-8 text-gray-400 mb-2" fill="none"
                                                stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12">
                                                </path>
                                            </svg>
                                            <p class="text-sm text-gray-600 dark:text-gray-400">
                                                {{ __('multiple_pdf_files_max_5mb_each') }}</p>
                                        </div>
                                    </div>

                                    <!-- Display Selected Files -->
                                    @if (!empty($experience_files))
                                        <div class="mt-3 space-y-2">
                                            @foreach ($experience_files as $index => $file)
                                                @if ($file)
                                                    <div
                                                        class="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                                        <div class="flex items-center">
                                                            <svg class="w-4 h-4 text-green-600 me-2" fill="none"
                                                                stroke="currentColor" viewBox="0 0 24 24">
                                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                                    stroke-width="2"
                                                                    d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z">
                                                                </path>
                                                            </svg>
                                                            <span
                                                                class="text-sm text-gray-700 dark:text-gray-300">{{ $file->getClientOriginalName() }}</span>
                                                            <span
                                                                class="text-xs text-gray-500 ms-2">({{ number_format($file->getSize() / 1024, 1) }}
                                                                KB)</span>
                                                        </div>
                                                        <button type="button"
                                                            wire:click="removeExperienceFile({{ $index }})"
                                                            class="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300">
                                                            <svg class="w-4 h-4" fill="none" stroke="currentColor"
                                                                viewBox="0 0 24 24">
                                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                                    stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                                            </svg>
                                                        </button>
                                                    </div>
                                                @endif
                                            @endforeach
                                        </div>
                                    @endif

                                    @error('experience_files.*')
                                        <span class="text-red-500 text-sm mt-1">{{ $message }}</span>
                                    @enderror
                                </div>
                            </div>
                        </div>

                        <!-- Navigation -->
                        <div class="flex justify-between pt-6">
                            <button type="button" wire:click="previousStage"
                                class="btn btn-outline-secondary px-6 py-2 rounded-xl">
                                <svg class="w-4 h-4 me-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M15 19l-7-7 7-7">
                                    </path>
                                </svg>
                                {{ __('previous') }}
                            </button>
                            <button type="submit"
                                class="btn bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-3 rounded-xl">
                                {{ __('next') }}
                                <svg class="w-4 h-4 ms-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M9 5l7 7-7 7">
                                    </path>
                                </svg>
                            </button>
                        </div>
                    </div>
                @endif

                @if ($currentStage == 4)
                    <!-- Stage 4: Profile Completion (keeping existing content) -->
                    <div class="glass rounded-2xl p-8 space-y-6">
                        <!-- Keep all existing Stage 4 content exactly as it is -->
                        <div class="flex items-center mb-6">
                            <svg class="w-6 h-6 text-blue-600 me-3" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z">
                                </path>
                            </svg>
                            <h3 class="text-xl font-bold text-gray-900 dark:text-white">
                                {{ __('complete_profile') }}
                            </h3>
                        </div>

                        <div class="space-y-6">
                            <!-- Profile Image -->
                            <div class="profile-image-upload">
                                <label
                                    class="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                                    <svg class="w-5 h-5 me-2 text-blue-600" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z">
                                        </path>
                                    </svg>
                                    {{ __('profile_photo') }}
                                    <span class="text-gray-500 ms-1">({{ __('optional') }})</span>
                                </label>
                                <div class="file-upload-wrapper">
                                    <input type="file" wire:model="profile_image" accept="image/*"
                                        class="file-upload-input">
                                    <div class="file-upload-display">
                                        <svg class="w-8 h-8 text-gray-400 mb-2" fill="none" stroke="currentColor"
                                            viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M4 6h16a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2zm4 6l2.586-2.586a2 2 0 012.828 0L16 12l2-2 2 2M8 16h8" />
                                        </svg>

                                        <p class="text-sm text-gray-600 dark:text-gray-400">
                                            {{ __('image_max_2mb') }}
                                        </p>
                                    </div>
                                </div>
                                @error('profile_image')
                                    <span class="text-red-500 text-sm">{{ $message }}</span>
                                @enderror
                            </div>

                            <!-- Bio -->
                            <div>
                                <label
                                    class="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                                    <svg class="w-5 h-5 me-2 text-blue-600" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z">
                                        </path>
                                    </svg>
                                    {{ __('about_yourself') }} *
                                </label>
                                <textarea wire:model.live="bio" class="form-control resize-none" rows="4"
                                    placeholder="{{ __('tell_us_about_your_teaching_experience_and_approach') }}"></textarea>
                                <div class="flex justify-between items-center mt-2">
                                    <span
                                        class="text-sm {{ $this->bioCharacterCount >= 50 ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400' }}">
                                        {{ __('minimum_50_characters') }}
                                    </span>
                                    <span class="text-sm text-gray-500">{{ $this->bioCharacterCount }}/50</span>
                                </div>
                                @error('bio')
                                    <span class="text-red-500 text-sm">{{ $message }}</span>
                                @enderror
                            </div>

                            <!-- Experience & Rate -->
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <!-- Years of Experience & Hourly Rate -->
                                <div class="relative">
                                    <div class="grid grid-cols-2 gap-3">
                                        <!-- Years of Experience -->
                                        <div class="relative">
                                            <div
                                                class="absolute inset-y-0 start-0 ps-2 flex items-center pointer-events-none z-10">
                                                <svg class="h-4 w-4 text-gray-400" fill="none"
                                                    stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                </svg>
                                            </div>
                                            <input type="number" wire:model="years_of_experience"
                                                class="form-control ps-8 text-sm"
                                                placeholder="{{ __('years_experience') }} *" min="0"
                                                max="50">
                                        </div>

                                        <!-- Hourly Rate -->
                                        <div class="relative">
                                            <div
                                                class="absolute inset-y-0 start-0 ps-2 flex items-center pointer-events-none z-10">
                                                <span class="text-gray-400 text-sm">﷼</span>
                                            </div>
                                            <input type="number" wire:model="hourly_rate"
                                                class="form-control ps-8 text-sm"
                                                placeholder="{{ __('hourly_rate') }} *" min="10"
                                                max="1000" step="0.01">
                                        </div>
                                    </div>

                                    <!-- Errors below both fields -->
                                    <div class="mt-1">
                                        @error('years_of_experience')
                                            <span class="text-red-500 text-sm">{{ $message }}</span>
                                        @enderror
                                        @error('hourly_rate')
                                            <span class="text-red-500 text-sm block">{{ $message }}</span>
                                        @enderror
                                    </div>
                                </div>

                                <!-- Speaking Language & Neighborhood -->
                                <div class="relative">
                                    <div class="grid grid-cols-2 gap-3">
                                        <!-- Speaking Language -->
                                        <div class="relative">
                                            <div
                                                class="absolute inset-y-0 start-0 ps-2 flex items-center pointer-events-none z-10">
                                                <svg class="h-4 w-4 text-gray-400" fill="none"
                                                    stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z">
                                                    </path>
                                                </svg>
                                            </div>
                                            <select wire:model="speaking_language" class="form-control ps-8 text-sm">
                                                <option value="">{{ __('language') }} *</option>
                                                @foreach ($this->getSpeakingLanguageOptions() as $value => $label)
                                                    <option value="{{ $value }}">{{ $label }}
                                                    </option>
                                                @endforeach
                                            </select>
                                        </div>

                                        <!-- Neighborhood -->
                                        <div class="relative">
                                            <div
                                                class="absolute inset-y-0 start-0 ps-2 flex items-center pointer-events-none z-10">
                                                <svg class="h-4 w-4 text-gray-400" fill="none"
                                                    stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4">
                                                    </path>
                                                </svg>
                                            </div>
                                            <input type="text" wire:model="neighborhood"
                                                class="form-control ps-8 text-sm"
                                                placeholder="{{ __('neighborhood_optional') }}">
                                        </div>
                                    </div>

                                    <!-- Errors below both fields -->
                                    <div class="mt-1">
                                        @error('speaking_language')
                                            <span class="text-red-500 text-sm">{{ $message }}</span>
                                        @enderror
                                        @error('neighborhood')
                                            <span class="text-red-500 text-sm block">{{ $message }}</span>
                                        @enderror
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Final Submit -->
                    <div class="flex justify-between pt-6">
                        <button type="button" wire:click="previousStage"
                            class="btn btn-outline-secondary px-6 py-2 rounded-xl">
                            <svg class="w-4 h-4 me-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M15 19l-7-7 7-7">
                                </path>
                            </svg>
                            {{ __('previous') }}
                        </button>
                        <button type="button" wire:click="finalSubmit" wire:loading.attr="disabled"
                            wire:target="finalSubmit"
                            class="btn bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-3 rounded-xl relative">
                            <span wire:loading.remove wire:target="finalSubmit" class="flex items-center">
                                {{ __('complete_registration') }}
                                <svg class="w-4 h-4 ms-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M5 13l4 4L19 7">
                                    </path>
                                </svg>
                            </span>
                            <span wire:loading wire:target="finalSubmit" class="flex items-center">
                                <svg class="animate-spin -ms-1 me-3 h-4 w-4 text-white"
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10"
                                        stroke="currentColor" stroke-width="4"></circle>
                                    <path class="opacity-75" fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                    </path>
                                </svg>
                                {{ __('submitting') }}...
                            </span>
                        </button>
                    </div>
    </div>
    @endif

    </form>

    <!-- Messages -->
    @if (session()->has('status'))
        <div class="mt-6 success-message animate-slide-up">
            <div class="flex items-center">
                <svg class="success-icon text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd"></path>
                </svg>
                <span class="success-text">{{ session('status') }}</span>
            </div>
        </div>
    @endif

    @if (session()->has('error'))
        <div class="mt-6 error-message animate-slide-up">
            <div class="flex items-center">
                <svg class="error-icon text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clip-rule="evenodd"></path>
                </svg>
                <span class="error-text">{{ session('error') }}</span>
            </div>
        </div>
    @endif

    @error('general')
        <div class="mt-6 error-message animate-slide-up">
            <div class="flex items-center">
                <svg class="error-icon text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clip-rule="evenodd"></path>
                </svg>
                <span class="error-text">{{ $message }}</span>
            </div>
        </div>
    @enderror

    @endif

    <!-- Loading Overlay for Final Submit -->
    <div wire:loading.flex wire:target="finalSubmit"
        class="fixed inset-0 bg-gray-900 bg-opacity-50 z-50 items-center justify-center">
        <div
            class="bg-white dark:bg-gray-800 rounded-2xl p-8 flex flex-col items-center space-y-6 max-w-md mx-4 min-w-[320px]">
            <!-- Animated Progress Circle -->
            <div class="relative w-16 h-16">
                <svg class="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
                    <circle cx="32" cy="32" r="28" stroke="currentColor"
                        class="text-gray-200 dark:text-gray-600" stroke-width="4" fill="none" />
                    <circle cx="32" cy="32" r="28" stroke="currentColor"
                        class="text-blue-600 animate-pulse" stroke-width="4" fill="none"
                        stroke-dasharray="175.93" stroke-dashoffset="87.96" stroke-linecap="round" />
                </svg>
                <div class="absolute inset-0 flex items-center justify-center">
                    <svg class="w-8 h-8 text-blue-600 animate-spin" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                </div>
            </div>

            <!-- Dynamic Status Messages -->
            <div class="text-center space-y-2">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                    {{ __('processing_registration') }}
                </h3>

                <!-- Progress Status -->
                <div x-data="{
                    currentStep: 0,
                    steps: [
                        '{{ __('validating_information') }}',
                        '{{ __('uploading_files') }}',
                        '{{ __('creating_profile') }}',
                        '{{ __('finalizing_registration') }}'
                    ]
                }" x-init="setInterval(() => {
                    currentStep = (currentStep + 1) % steps.length;
                }, 2000);">
                    <p class="text-gray-600 dark:text-gray-300 min-h-[20px]" x-text="steps[currentStep]"></p>
                </div>

                <!-- Progress Dots -->
                <div class="flex justify-center space-x-2 pt-2">
                    <div class="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                    <div class="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style="animation-delay: 0.1s;">
                    </div>
                    <div class="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style="animation-delay: 0.2s;">
                    </div>
                </div>
            </div>

            <!-- Encouragement Message -->
            <div class="text-center">
                <p class="text-sm text-gray-500 dark:text-gray-400">
                    {{ __('please_dont_close_this_window') }}
                </p>
            </div>
        </div>
    </div>

</div>
<script>
    function phoneInput() {
        return {
            iti: null,
            validationStatus: null,

            initPhone() {
                this.$nextTick(() => {
                    this.iti = window.intlTelInput(this.$refs.phoneInput, {
                        initialCountry: 'sa',
                        preferredCountries: ['sa', 'ae', 'kw', 'qa', 'bh', 'om', 'jo', 'eg'],
                        separateDialCode: true, // flag + dial-code visible
                        autoPlaceholder: 'aggressive',
                        formatOnDisplay: true,
                        nationalMode: false,
                        utilsScript: 'https://cdn.jsdelivr.net/npm/intl-tel-input@18.2.1/build/js/utils.min.js'
                    });

                    // Load existing value if Livewire holds one
                    const currentPhone = @this.get('phone');
                    if (currentPhone) {
                        this.iti.setNumber(currentPhone);
                    }

                    this.$refs.phoneInput.addEventListener('countrychange', () => this.validatePhone());
                    this.$refs.phoneInput.addEventListener('input', () => this.validatePhone());
                });
            },

            updatePhone() {
                if (!this.iti) return;
                @this.set('phone', this.iti.getNumber());
                this.validatePhone();
            },

            validatePhone() {
                if (!this.iti) return;
                const ok = this.iti.isValidNumber();
                this.validationStatus = ok ? 'valid' : 'invalid';

                // Toggle Tailwind error/success styles
                this.$refs.phoneInput.classList.toggle('border-red-500', !ok);
                this.$refs.phoneInput.classList.toggle('ring-red-500/20', !ok);
                this.$refs.phoneInput.classList.toggle('border-green-500', ok);
                this.$refs.phoneInput.classList.toggle('ring-green-500/20', ok);
            }
        }
    }
</script>

</div>
