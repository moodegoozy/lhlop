<div dir="{{ app()->getLocale() === 'ar' ? 'rtl' : 'ltr' }}" class="min-h-screen" x-data="{
    showMobileFilters: false,
    showFilterDialog: false,
    tempSortBy: @entangle('sortBy').defer
}"
    x-effect="document.body.classList.toggle('overflow-hidden', showMobileFilters || showFilterDialog)">

    <!-- Mobile Filter Modal -->
    <div x-cloak x-show="showMobileFilters" class="fixed inset-0 z-50 md:hidden"
        x-transition:enter="transition ease-out duration-300" x-transition:enter-start="opacity-0"
        x-transition:enter-end="opacity-100" x-transition:leave="transition ease-in duration-200"
        x-transition:leave-start="opacity-100" x-transition:leave-end="opacity-0">

        <!-- Mobile backdrop -->
        <div class="absolute inset-0 bg-black bg-opacity-50" @click="showMobileFilters = false"></div>

        <!-- Mobile modal content -->
        <div class="absolute inset-x-0 top-32 bottom-0 bg-white dark:bg-gray-900 rounded-t-2xl shadow-2xl flex flex-col"
            x-transition:enter="transition ease-out duration-300" x-transition:enter-s tart="transform translate-y-full"
            x-transition:enter-end="transform translate-y-0" x-transition:leave="transition ease-in duration-200"
            x-transition:leave-start="transform translate-y-0" x-transition:leave-end="transform translate-y-full"
            x-data="{
                startY: 0,
                currentY: 0,
                isDragging: false
            }" @touchstart.passive="startY = $event.touches[0].clientY; isDragging = true;"
            @touchmove.passive="if (isDragging) { currentY = Math.max(0, $event.touches[0].clientY - startY); $el.style.transform = 'translateY(' + currentY + 'px)';}"
            @touchend.passive="if (isDragging) {isDragging = false;if (currentY > 100) { showMobileFilters = false; }$el.style.transform = '';currentY = 0;}">

            <!-- Handle Bar -->
            <div class="flex justify-center pt-4 pb-2 flex-shrink-0">
                <div class="w-12 h-1 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
            </div>

            <!-- Header -->
            <div class="px-4 pb-4 flex-shrink-0">
                <div class="flex items-center justify-between">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                        {{ __('filters') }}
                    </h3>
                    <button @click="showMobileFilters = false"
                        class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
            </div>

            <!-- Scrollable Content -->
            <div class="px-4 flex-1 overflow-y-auto min-h-0">
                <div class="space-y-4 pb-4">
                    <!-- Sort Section (NEW - More prominent on mobile) -->
                    <div
                        class="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-4">
                        <label class="block text-sm font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                            <svg class="w-4 h-4 me-2 text-blue-600 dark:text-blue-400" fill="none"
                                stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"></path>
                            </svg>
                            {{ __('sort_by') }}
                        </label>
                        <div class="grid grid-cols-2 gap-2">
                            @foreach (['rating' => '⭐ ' . __('rating'), 'experience' => '🎓 ' . __('experience'), 'price_low' => '💰 ' . __('price_low'), 'price_high' => '💰 ' . __('price_high'), 'newest' => '🆕 ' . __('newest')] as $value => $label)
                                <button wire:click="$set('sortBy', '{{ $value }}')"
                                    class="p-3 rounded-lg text-sm font-medium transition-all {{ $sortBy === $value ? 'bg-blue-600 text-white shadow-lg' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700' }}">
                                    {!! $label !!}
                                </button>
                            @endforeach
                        </div>
                    </div>

                    <!-- Gender -->
                    <div>
                        <label class="block text-sm font-bold text-gray-900 dark:text-white mb-2">
                            {{ __('gender') }}
                        </label>
                        <select wire:model.live="selectedGender" class="form-input w-full text-sm">
                            <option value="">{{ __('select_gender') }}</option>
                            @foreach ($this->genderOptions as $option)
                                <option value="{{ $option }}">{{ __($option) }}</option>
                            @endforeach
                        </select>
                    </div>

                    <!-- Qualification -->
                    <div>
                        <label class="block text-sm font-bold text-gray-900 dark:text-white mb-2">
                            {{ __('qualification') }}
                        </label>
                        <select wire:model.live="selectedQualification" class="form-input w-full text-sm">
                            <option value="">{{ __('select_qualification') }}</option>
                            @foreach ($this->qualificationOptions as $option)
                                <option value="{{ $option }}">{{ __($option) }}</option>
                            @endforeach
                        </select>
                    </div>

                    <!-- Lesson Location -->
                    <div>
                        <label class="block text-sm font-bold text-gray-900 dark:text-white mb-2">
                            {{ __('lesson_locations') }}
                        </label>
                        <div class="grid grid-cols-2 gap-2">
                            @foreach ($this->lessonLocationOptions as $key => $label)
                                <button
                                    wire:click="$set('selectedLessonLocation', '{{ $selectedLessonLocation === $key ? '' : $key }}')"
                                    class="p-3 rounded-lg text-sm font-medium transition-all {{ $selectedLessonLocation === $key ? 'bg-green-600 text-white shadow-lg' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700' }}">
                                    {{ $label }}
                                </button>
                            @endforeach
                        </div>
                    </div>

                    <!-- Nationality -->
                    <div>
                        <label class="block text-sm font-bold text-gray-900 dark:text-white mb-2">
                            {{ __('nationality') }}
                        </label>
                        <select wire:model.live="selectedNationality" class="form-input w-full text-sm">
                            <option value="">{{ __('select_nationality') }}</option>
                            @foreach ($this->nationalityOptions as $option)
                                <option value="{{ $option }}">{{ __($option) }}</option>
                            @endforeach
                        </select>
                    </div>

                    <!-- Location (Country & City) -->
                    <div>
                        <label class="block text-sm font-bold text-gray-900 dark:text-white mb-2">
                            {{ __('service_provider_resides_in') }}
                        </label>
                        <div class="space-y-2">
                            <select wire:model.live="selectedCountry" class="form-input w-full text-sm">
                                <option value="">{{ __('select_country') }}</option>
                                @foreach ($this->countryOptions as $code => $name)
                                    <option value="{{ $code }}">{{ $name }}</option>
                                @endforeach
                            </select>

                            <select wire:model.live="selectedCity" class="form-input w-full text-sm"
                                @if (!$selectedCountry) disabled @endif>
                                <option value="">{{ __('select_city') }}</option>
                                @foreach ($this->cityOptions as $id => $name)
                                    <option value="{{ $id }}">{{ $name }}</option>
                                @endforeach
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Footer - Fixed at bottom -->
            <div
                class="px-4 py-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
                <div class="flex gap-3">
                    <button wire:click="clearFilters" @click="showMobileFilters = false"
                        class="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 px-4 rounded-lg text-sm font-medium transition-colors">
                        {{ __('clear_filters') }}
                    </button>
                    <button @click="showMobileFilters = false"
                        class="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 px-4 rounded-lg text-sm font-medium transition-all">
                        {{ __('done') }}
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Desktop Filter Dialog -->
    <div x-cloak x-show="showFilterDialog" x-on:open-filter-dialog.window="showFilterDialog = true; tempSortBy = $wire.sortBy"
        class="fixed inset-0 z-50 overflow-hidden hidden md:block" x-transition:enter="transition ease-out duration-300"
        x-transition:enter-start="opacity-0" x-transition:enter-end="opacity-100"
        x-transition:leave="transition ease-in duration-200" x-transition:leave-start="opacity-100"
        x-transition:leave-end="opacity-0">

        <!-- Desktop backdrop -->
        <div class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" @click="showFilterDialog = false"></div>

        <!-- Centering container -->
        <div class="fixed inset-0 flex items-center justify-center pointer-events-none h-[100dvh]">
            <!-- Dialog -->
            <div class="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full max-h-full overflow-hidden pointer-events-auto"
                x-transition:enter="transition ease-out duration-300"
                x-transition:enter-start="opacity-0 transform scale-95"
                x-transition:enter-end="opacity-100 transform scale-100"
                x-transition:leave="transition ease-in duration-200"
                x-transition:leave-start="opacity-100 transform scale-100"
                x-transition:leave-end="opacity-0 transform scale-95" @click.stop>

                <!-- Header -->
                <div
                    class="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex-shrink-0">
                    <div class="flex items-center justify-between">
                        <h2 class="text-lg font-bold text-gray-900 dark:text-white">
                            {{ __('filters_and_sort') }}
                        </h2>
                        <button @click="showFilterDialog = false"
                            class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>
                </div>

                <!-- Content (scrollable) -->
                <div class="px-6 py-4 overflow-y-auto" style="max-height: calc(100dvh - 200px);">

                    <!-- Sort Section -->
                    <div class="mb-6">
                        <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                            {{ __('sort_by') }}
                        </h3>
                        <div class="space-y-2">
                            @foreach (['rating', 'experience', 'price_low', 'price_high', 'newest'] as $option)
                                <label
                                    class="flex items-center p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors"
                                    :class="{ 'bg-blue-50 dark:bg-blue-900/20 border-blue-500': tempSortBy === '{{ $option }}' }">
                                    <input type="radio" x-model="tempSortBy" value="{{ $option }}"
                                        class="text-blue-600 focus:ring-blue-500">
                                    <span class="ms-3 flex-1 text-sm font-medium"
                                        :class="{ 'text-blue-600 dark:text-blue-400': tempSortBy === '{{ $option }}' }">
                                        {{ __($option) }}
                                    </span>
                                    @if ($option === 'price_low')
                                        <span class="text-xs text-gray-500">{{ __('low_to_high') }}</span>
                                    @elseif($option === 'price_high')
                                        <span class="text-xs text-gray-500">{{ __('high_to_low') }}</span>
                                    @endif
                                </label>
                            @endforeach
                        </div>
                    </div>

                    <!-- Divider -->
                    <div class="border-t border-gray-200 dark:border-gray-700 my-6"></div>

                    <!-- Future Advanced Filters Section -->
                    <div class="space-y-6">
                        <!-- Price Range (placeholder for future) -->
                        <div class="opacity-50 pointer-events-none">
                            <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                                {{ __('price_range') }}
                            </h3>
                            <div class="text-xs text-gray-500">{{ __('coming_soon') }}</div>
                        </div>

                        <!-- Experience Years (placeholder for future) -->
                        <div class="opacity-50 pointer-events-none">
                            <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                                {{ __('experience_years') }}
                            </h3>
                            <div class="text-xs text-gray-500">{{ __('coming_soon') }}</div>
                        </div>

                        <!-- Rating Filter (placeholder for future) -->
                        <div class="opacity-50 pointer-events-none">
                            <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                                {{ __('minimum_rating') }}
                            </h3>
                            <div class="text-xs text-gray-500">{{ __('coming_soon') }}</div>
                        </div>
                    </div>

                </div>

                <!-- Footer -->
                <div
                    class="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-6 py-4 flex-shrink-0">
                    <div class="flex gap-3">
                        <button @click="showFilterDialog = false"
                            class="flex-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 py-2.5 px-4 rounded-lg font-medium transition-colors">
                            {{ __('cancel') }}
                        </button>
                        <button @click="$wire.set('sortBy', tempSortBy); showFilterDialog = false"
                            class="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-2.5 px-4 rounded-lg font-medium transition-all shadow-lg">
                            {{ __('apply_filters') }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Main Content -->
    <section id="filters" class="relative z-30">
        <div class="container-custom-nopadding">
            <div class="filter-box relative animate-slide-up shadow-2xl" wire:loading.class="opacity-60">

                <div wire:loading class="loading-overlay">
                    <div class="flex items-center space-x-2">
                        <div class="spinner"></div>
                        <span
                            class="text-gray-600 dark:text-gray-400 font-semibold text-sm">{{ __('updating') }}</span>
                    </div>
                </div>

                <!-- Horizontal Pills Filters -->
                <div class="mb-2 sm:mb-3">
                    <!-- Categories Filter Pills -->
                    <div class="mb-2">
                        <!-- Always show root categories first -->
                        <div class="filter-slider">
                            @foreach ($this->rootCategories as $category)
                                <button wire:click="$set('selectedCategoryId', {{ $category->id }})"
                                    class="filter-pill {{ $this->isInSelectedPath($category->id) ? 'filter-pill-active' : 'filter-pill-inactive' }} whitespace-nowrap">
                                    @if ($category->icon)
                                        <span class="me-1">{{ $category->icon }}</span>
                                    @endif
                                    <span>{{ $category->name }}</span>
                                </button>
                            @endforeach
                        </div>

                        <!-- Show children of selected categories in subsequent rows -->
                        @if ($selectedCategoryId)
                            @foreach ($this->categoryPath as $pathCategory)
                                @if ($pathCategory->children()->exists())
                                    <div class="filter-slider mt-1 border-t border-gray-200 dark:border-gray-700 pt-1">
                                        @foreach ($pathCategory->children()->active()->ordered()->get() as $childCategory)
                                            <button wire:click="$set('selectedCategoryId', {{ $childCategory->id }})"
                                                class="filter-pill {{ $this->isInSelectedPath($childCategory->id) ? 'filter-pill-active' : 'filter-pill-inactive' }} whitespace-nowrap animate-fade-in">
                                                @if ($childCategory->icon)
                                                    <span class="me-1">{{ $childCategory->icon }}</span>
                                                @endif
                                                <span>{{ $childCategory->name }}</span>
                                            </button>
                                        @endforeach
                                    </div>
                                @endif
                            @endforeach
                        @endif
                    </div>

                    <!-- Teaching Methods Filter Pills (only show at deepest category level) -->
                    @if ($this->shouldShowTeachingMethods)
                        <div class="filter-slider">
                            @foreach ($this->teachingMethodOptions as $key => $label)
                                <button
                                    wire:click="$set('selectedTeachingMethod', '{{ $selectedTeachingMethod === $key ? '' : $key }}')"
                                    class="filter-pill {{ $selectedTeachingMethod === $key ? 'filter-pill-active' : 'filter-pill-inactive' }} whitespace-nowrap">
                                    <span>{{ $label }}</span>
                                </button>
                            @endforeach
                        </div>
                    @endif
                </div>

                <!-- Desktop Dropdown Filters -->
                <div class="hidden md:block">
                    <div class="grid grid-cols-3 lg:grid-cols-6 gap-2 mb-3">
                        <div>
                            <select wire:model.live="selectedGender" class="form-input appearance-none text-sm">
                                <option value="">{{ __('gender') }}</option>
                                @foreach ($this->genderOptions as $option)
                                    <option value="{{ $option }}">{{ __($option) }}</option>
                                @endforeach
                            </select>
                        </div>

                        <div>
                            <select wire:model.live="selectedQualification"
                                class="form-input appearance-none text-sm">
                                <option value="">{{ __('qualification') }}</option>
                                @foreach ($this->qualificationOptions as $option)
                                    <option value="{{ $option }}">{{ __($option) }}</option>
                                @endforeach
                            </select>
                        </div>

                        <div>
                            <select wire:model.live="selectedLessonLocation"
                                class="form-input appearance-none text-sm">
                                <option value="">{{ __('lesson_locations') }}</option>
                                @foreach ($this->lessonLocationOptions as $key => $label)
                                    <option value="{{ $key }}">{{ $label }}</option>
                                @endforeach
                            </select>
                        </div>

                        <div>
                            <select wire:model.live="selectedNationality" class="form-input appearance-none text-sm">
                                <option value="">{{ __('nationality') }}</option>
                                @foreach ($this->nationalityOptions as $option)
                                    <option value="{{ $option }}">{{ $option }}</option>
                                @endforeach
                            </select>
                        </div>

                        <div>
                            <select wire:model.live="selectedCountry" class="form-input appearance-none text-sm">
                                <option value="">{{ __('service_provider_resides_in_country') }}</option>
                                @foreach ($this->countryOptions as $code => $name)
                                    <option value="{{ $code }}">{{ $name }}</option>
                                @endforeach
                            </select>
                        </div>

                        <div>
                            <select wire:model.live="selectedCity" class="form-input appearance-none text-sm"
                                @if (!$selectedCountry) disabled @endif>
                                <option value="">{{ __('city') }}</option>
                                @foreach ($this->cityOptions as $id => $name)
                                    <option value="{{ $id }}">{{ $name }}</option>
                                @endforeach
                            </select>
                        </div>
                    </div>

                    <div class="flex gap-2 items-center">
                        <div class="flex-1">
                            <input type="text" wire:model.live.debounce.500ms="search"
                                placeholder="{{ __('teacher_search_placeholder') }}" class="form-input text-sm">
                        </div>

                        <div class="flex gap-1">
                            <button wire:click="clearFilters"
                                class="btn bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-2 py-2 rounded-lg">
                                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>

                            <button @click="$dispatch('open-filter-dialog')"
                                class="btn bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-2 py-2 rounded-lg">
                                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"></path>
                                </svg>
                            </button>
                        </div>
                        <p class="inline">{{ __('results') }}({{ $teachers->total() }})</p>
                    </div>
                </div>

                <!-- Mobile Filter Button -->
                <div class="md:hidden">
                    <div class="flex gap-2 items-center mb-2">
                        <div class="flex-1">
                            <input type="text" wire:model.live.debounce.500ms="search"
                                placeholder="{{ __('teacher_search_placeholder') }}" class="form-input text-sm">
                        </div>
                        <button @click="showMobileFilters = true"
                            class="btn bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-3 py-2 rounded-lg flex items-center gap-1.5 shadow-lg">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z">
                                </path>
                            </svg>
                            <span class="text-xs font-medium">{{ __('filters') }}</span>
                            @if (
                                $selectedGender ||
                                    $selectedQualification ||
                                    $selectedLessonLocation ||
                                    $selectedNationality ||
                                    $selectedCountry ||
                                    $selectedCity ||
                                    $sortBy !== 'rating')
                                <span
                                    class="bg-white text-blue-600 text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                                    {{ collect([$selectedGender, $selectedQualification, $selectedLessonLocation, $selectedNationality, $selectedCountry, $selectedCity, $sortBy !== 'rating' ? $sortBy : null])->filter()->count() }}
                                </span>
                            @endif
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="py-6">
        <div class="container-custom">

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4"
                wire:key="teachers-grid">
                @forelse($teachers as $teacher)
                    <div wire:key="teacher-{{ $teacher->id }}"
                        class="group relative backdrop-blur-xl bg-white/70 dark:bg-gray-900/30 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-white/20 dark:border-white/10 hover:bg-white/80 dark:hover:bg-gray-900/40">
                        <div class="p-3">
                            <div class="flex items-start">
                                <div
                                    class="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-white/30 dark:ring-white/20 group-hover:ring-blue-400/50 transition-all duration-500 shadow-lg">
                                    @if ($teacher->profile_image)
                                        <img src="{{ Storage::url($teacher->profile_image) }}"
                                            alt="{{ $teacher->name }}" class="w-full h-full object-cover">
                                    @else
                                        <div
                                            class="w-full h-full bg-gradient-to-br from-blue-500 via-purple-600 to-pink-600 flex items-center justify-center text-white font-bold text-xs">
                                            {{ strtoupper(substr($teacher->name, 0, 2)) }}</div>
                                    @endif
                                </div>
                                <div class="text-start ms-2 min-w-0 flex-1">
                                    <h3
                                        class="font-bold text-sm text-gray-900 dark:text-white mb-0.5 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                                        {{ $teacher->name }}</h3>
                                    <p class="text-xs text-gray-600/80 dark:text-gray-400/80 mb-0.5 truncate">
                                        {{ $teacher->latest_qualification }}</p>
                                </div>
                                <div class="ms-2 text-center flex flex-shrink-0 text-red-500">
                                    <div class="flex items-center">
                                        <span
                                            class="text-xs
                                        font-bold text-yellow-600 dark:text-yellow-400
                                        me-1">{{ number_format($teacher->rating, 1) }}</span>
                                        <span
                                            class="text-xs text-gray-600/80 dark:text-gray-400/80">({{ $teacher->total_ratings }})</span>
                                    </div>
                                    <x-bi-youtube class="h-10 w-10" />
                                </div>
                            </div>
                            <div
                                class="backdrop-blur-md bg-gradient-to-r from-green-500/10 via-blue-500/10 to-purple-500/10 rounded-lg p-2 mb-3 border border-white/20 dark:border-white/10">
                                <div class="flex items-center justify-between">
                                    <div class="text-center">
                                        <div class="text-lg font-bold text-green-600 dark:text-green-400">
                                            {{ number_format($teacher->hourly_rate, 0) }} <span
                                                class="riyal-symbol text-sm">{{ __('sar') }}</span></div>
                                        <div class="text-xs font-medium text-green-700/80 dark:text-green-300/80">
                                            {{ __('per_hour') }}</div>
                                    </div>
                                    <div class="text-center">
                                        <div class="text-lg font-bold text-blue-600 dark:text-blue-400">
                                            {{ number_format($teacher->completed_hours) }}</div>
                                        <div class="text-xs font-medium text-blue-700/80 dark:text-blue-300/80">
                                            {{ __('hours_completed') }}</div>
                                    </div>
                                </div>
                            </div>
                            <a href="{{ route('teacher.calendar', $teacher) }}"
                                class="w-full backdrop-blur-md bg-gradient-to-r from-green-500 via-blue-500 to-purple-600 hover:from-green-600 hover:via-blue-600 hover:to-purple-700 text-white font-bold py-2 px-3 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 border border-white/20 block text-center text-sm">
                                {{ __('book_now') }}
                            </a>
                        </div>
                    </div>
                @empty
                    <div class="col-span-full text-center py-12">
                        <div class="max-w-md mx-auto">
                            <div
                                class="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                                <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
                                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z">
                                    </path>
                                </svg>
                            </div>
                            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                {{ __('no_teachers_found') }}</h3>
                            <p class="text-gray-500 dark:text-gray-400 text-sm">{{ __('try_different_filters') }}
                            </p>
                        </div>
                    </div>
                @endforelse
            </div>

            <div class="mt-8">
                {{ $teachers->links() }}
            </div>
        </div>
    </section>

</div>
