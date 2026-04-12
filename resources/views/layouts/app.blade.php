<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}" dir="{{ app()->getLocale() === 'ar' ? 'rtl' : 'ltr' }}" x-data="{
    darkMode: JSON.parse(localStorage.getItem('darkMode') || JSON.stringify(window.matchMedia('(prefers-color-scheme: dark)').matches)),
    mobileMenuOpen: false
}"
    x-init="$watch('darkMode', val => localStorage.setItem('darkMode', JSON.stringify(val)))" :class="{ 'dark': darkMode }">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <!-- Performance & SEO -->
    <meta name="robots" content="index, follow">
    <meta name="theme-color" x-bind:content="darkMode ? '#0f172a' : '#ffffff'">
    <meta name="color-scheme" x-bind:content="darkMode ? 'dark' : 'light'">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="default">

    <title>{{ __('site_name') }}</title>
    <meta name="description" content="{{ __('description') }}">

    <!-- Performance optimizations -->
    <link rel="dns-prefetch" href="//fonts.googleapis.com">
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

    <!-- Critical CSS -->
    <style>
        /* Critical above-the-fold styles */
        [x-cloak] {
            display: none !important;
        }

        body {
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            transition: background-color 0.3s ease, color 0.3s ease;
        }

        .loading-screen {
            position: fixed;
            inset: 0;
            background: linear-gradient(135deg, rgb(59 130 246) 0%, rgb(139 92 246) 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999 !important;
            transition: opacity 0.5s ease;
        }

        .loading-spinner {
            width: 40px;
            height: 40px;
            border: 3px solid rgba(255, 255, 255, 0.3);
            border-top: 3px solid white;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }

        @keyframes spin {
            0% {
                transform: rotate(0deg);
            }

            100% {
                transform: rotate(360deg);
            }
        }

        .fade-out {
            opacity: 0;
            pointer-events: none;
        }
    </style>

    <!-- Main Styles -->
    <link rel="stylesheet" href="/build/assets/app-2yfFkqO-.css">
    <script src="/build/assets/vendor-l0sNRNKZ.js" defer></script>
    <script src="/build/assets/app-BP5eHSZ0.js" defer></script>
    @livewireStyles

    <!-- jQuery and Select2 for dynamic components -->
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>
    <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />

    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

    <!-- International Phone Input CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/intl-tel-input@18.2.1/build/css/intlTelInput.min.css">

    <!-- International Phone Input JS -->
    <script src="https://cdn.jsdelivr.net/npm/intl-tel-input@18.2.1/build/js/intlTelInput.min.js"></script>

    <!-- Fonts with optimized loading -->
    <link
        href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700;800&display=swap"
        rel="stylesheet" media="print" onload="this.media='all'">
    <noscript>
        <link
            href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700;800&display=swap"
            rel="stylesheet">
    </noscript>
</head>

<body class="antialiased min-h-screen transition-all duration-300">
    <!-- Loading Screen -->
    <div id="loading-screen" class="loading-screen" style="display: none;">
        <div class="text-center">
            <div class="loading-spinner mx-auto mb-4"></div>
            <div class="text-white font-semibold text-lg">{{ __('loading') }}</div>
        </div>
    </div>

    <!-- Global Loading Indicator -->
    <div id="global-loading" class="fixed top-4 start-4 z-50 hidden opacity-0 transition-all duration-300">
        <div
            class="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-white/30 dark:border-gray-600/40 shadow-2xl rounded-2xl px-4 py-3 flex items-center space-x-3">
            <div class="spinner"></div>
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ __('updating') }}</span>
        </div>
    </div>
    @php
        use Illuminate\Support\Str;
    @endphp
    <!-- Header -->
    <header class="header-gradient sticky top-0 z-40 backdrop-blur-xl">
        <div class="container-custom">
            <div class="flex items-center justify-between h-16 lg:h-20">

                <!-- Desktop Layout -->
                <div class="hidden md:flex items-center justify-between w-full">

                    <!-- Left Side: User Account + Cart + Search + Join as Teacher -->
                    <div class="flex items-center gap-2">

                        <!-- User Account Dropdown -->
                        @auth
                            <div class="relative" x-data="{ accountOpen: false }">
                                <button @click="accountOpen = !accountOpen"
                                    class="flex items-center gap-2 text-white hover:text-yellow-300 transition-colors bg-white/10 hover:bg-white/20 px-3 py-2 rounded-xl">
                                    <div
                                        class="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                        {{ Str::substr(Auth::user()->name, 0, 1) }}
                                    </div>
                                    <span class="text-sm font-medium">{{ __('my_account') }}</span>
                                    <svg class="w-4 h-4 transition-transform duration-200"
                                        :class="{ 'rotate-180': accountOpen }" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M19 9l-7 7-7-7"></path>
                                    </svg>
                                </button>

                                <!-- Account Dropdown -->
                                <div x-show="accountOpen" x-transition:enter="transition ease-out duration-200"
                                    x-transition:enter-start="opacity-0 transform scale-95"
                                    x-transition:enter-end="opacity-100 transform scale-100"
                                    x-transition:leave="transition ease-in duration-150"
                                    x-transition:leave-start="opacity-100 transform scale-100"
                                    x-transition:leave-end="opacity-0 transform scale-95"
                                    @click.outside="accountOpen = false" @keydown.escape.window="accountOpen = false"
                                    x-cloak
                                    class="absolute top-full mt-2 start-0 sm:end-0 sm:start-auto w-64bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-600/40 shadow-2xl rounded-xl py-2 z-50 origin-top [pointer-events:auto]">
                                    <!-- User Info -->
                                    <div class="px-4 py-3 border-b border-gray-200/50 dark:border-gray-600/50">
                                        <div class="text-sm font-semibold text-gray-900 dark:text-white">
                                            {{ Auth::user()->name }}</div>
                                        <div class="text-xs text-gray-600 dark:text-gray-400">{{ Auth::user()->email }}
                                        </div>
                                    </div>

                                    <!-- Account Links -->
                                    <livewire:nav.account-links />


                                    <!-- Logout -->
                                    <div class="border-t border-gray-200/50 dark:border-gray-600/50 mt-2 pt-2">
                                        <form method="POST" action="{{ route('logout') }}">
                                            @csrf
                                            <button type="submit"
                                                class="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                                                {{ __('logout') }}
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        @else
                            <!-- Login Button -->
                            <a href="{{ route('login') }}"
                                class="flex items-center gap-2 text-white hover:text-yellow-300 transition-colors bg-white/10 hover:bg-white/20 px-3 py-2 rounded-xl">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1">
                                    </path>
                                </svg>
                                <span class="text-sm font-medium">{{ __('login') }}</span>
                            </a>
                        @endauth

                        <!-- Cart Icon -->
                        <button
                            class="relative text-white hover:text-yellow-300 transition-colors p-2 hover:bg-white/10 rounded-xl">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 7M7 13l2.5 7m0 0h9.5m-9.5 0v0M17 20a1 1 0 100-2 1 1 0 000 2zm-8 0a1 1 0 100-2 1 1 0 000 2z">
                                </path>
                            </svg>
                            <!-- Cart Badge -->
                            <span
                                class="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">3</span>
                        </button>

                        <!-- Search Icon -->
                        <button
                            class="text-white hover:text-yellow-300 transition-colors p-2 hover:bg-white/10 rounded-xl">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                        </button>
                        <!-- Language Toggle with Icon -->
                        <div class="flex items-center gap-2">
                            @php
                                $currentLocale = app()->getLocale();
                                $oppositeLocale = $currentLocale === 'ar' ? 'en' : 'ar';
                                $oppositeLabel = $currentLocale === 'ar' ? 'EN' : 'AR';
                            @endphp

                            <a href="{{ route('settings.language', $oppositeLocale) }}"
                                class="toggle-button flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-white bg-white/10 hover:bg-white/20 rounded-xl border border-white/20 backdrop-blur-sm transition-all duration-200 hover:scale-105">
                                {{ $oppositeLabel }}
                            </a>
                        </div>

                        <!-- Theme Toggle -->
                        <button @click="darkMode = !darkMode"
                            class="toggle-button p-2 transition-transform duration-300"
                            :class="{ 'rotate-180': darkMode }"
                            :title="darkMode ? '{{ __('light_mode') }}' : '{{ __('dark_mode') }}'">
                            <!-- Light Mode Icon -->
                            <svg x-show="!darkMode" class="w-5 h-5 text-yellow-400 transition-all duration-300"
                                fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd"
                                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                                    clip-rule="evenodd"></path>
                            </svg>
                            <!-- Dark Mode Icon -->
                            <svg x-show="darkMode" class="w-5 h-5 text-indigo-400 transition-all duration-300"
                                fill="currentColor" viewBox="0 0 20 20">
                                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                            </svg>
                        </button>

                        <!-- Spacer -->
                        <div class="w-px h-6 bg-white/20"></div>

                        <!-- Join as Teacher Button (only if not logged in) -->
                        @guest
                            <a href="{{ route('teacher.register') }}"
                                class="btn bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold px-4 py-2 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300">
                                🎓 {{ __('join_as_teacher') }}
                            </a>
                        @endguest
                    </div>



                    <!-- Right Side: Theme & Language Controls + Navigation Burger -->
                    <div class="flex items-center gap-4">


                        <!-- Center: Logo -->
                        <div class="flex-1 flex justify-center">
                            <a href="{{ route('home') }}"
                                class="flex items-center hover:opacity-80 transition-opacity">
                                <img src="{{ asset('images/1983127.png') }}" alt="{{ __('site_name') }}"
                                    class="h-8 lg:h-10 w-auto"
                                    onerror="this.style.display='none'; this.nextElementSibling.style.display='inline';">
                                <span
                                    class="text-white font-bold text-xl lg:text-2xl hover:text-yellow-300 transition-colors"
                                    style="display: none;">
                                    {{ __('site_name') }}
                                </span>
                            </a>
                        </div>
                        <!-- Navigation Burger Menu -->
                        <div class="relative" x-data="{ navOpen: false }">
                            <button @click="navOpen = !navOpen"
                                class="text-white hover:text-yellow-300 transition-colors p-2 hover:bg-white/10 rounded-xl">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path x-show="!navOpen" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                                    <path x-show="navOpen" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>

                            <!-- Desktop Navigation Dropdown -->
                            <div x-show="navOpen" x-transition:enter="transition ease-out duration-200"
                                x-transition:enter-start="transform -translate-x-100"
                                x-transition:enter-end="transform translate-x-0"
                                x-transition:leave="transition ease-in duration-150"
                                x-transition:leave-start="transform translate-x-0"
                                x-transition:leave-end="transform -translate-x-100" @click.away="navOpen = false"
                                class="fixed top-0 end-0 w-48 h-screen bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-600/40 py-2 z-50">

                                <a href="{{ route('home') }}"
                                    class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-700/50 transition-colors {{ request()->routeIs('home') ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : '' }}">
                                    🏠 {{ __('home') }}
                                </a>
                                <a href="{{ route('about') }}"
                                    class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-700/50 transition-colors {{ request()->routeIs('about') ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : '' }}">
                                    ℹ️ {{ __('about') }}
                                </a>
                                <a href="{{ route('contact') }}"
                                    class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-700/50 transition-colors {{ request()->routeIs('contact') ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : '' }}">
                                    📞 {{ __('contact') }}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Mobile Layout -->
                <div class="md:hidden flex items-center justify-between w-full">

                    <!-- Left Side: User Account + Cart + Search -->
                    <div class="flex items-center gap-3">

                        <!-- User Account Dropdown (Mobile) -->
                        @auth
                            <div class="relative" x-data="{ mobileAccountOpen: false }">
                                <button @click="mobileAccountOpen = !mobileAccountOpen"
                                    class="flex items-center text-white hover:text-yellow-300 transition-colors">
                                    <div
                                        class="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                        {{ Str::substr(Auth::user()->name, 0, 1) }}
                                    </div>
                                </button>

                                <!-- Mobile Account Dropdown -->
                                <div x-show="mobileAccountOpen" x-transition:enter="transition ease-out duration-200"
                                    x-transition:enter-start="opacity-0 transform scale-95"
                                    x-transition:enter-end="opacity-100 transform scale-100"
                                    x-transition:leave="transition ease-in duration-150"
                                    x-transition:leave-start="opacity-100 transform scale-100"
                                    x-transition:leave-end="opacity-0 transform scale-95"
                                    @click.outside="mobileAccountOpen = false"
                                    @keydown.escape.window="mobileAccountOpen = false" x-cloak
                                    class="absolute top-full mt-2 start-0 mx-2 w-[calc(100vw-1rem)] sm:w-56 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-600/40 shadow-2xl rounded-xl py-2 z-50 origin-top">
                                    <!-- User Info -->
                                    <div class="px-4 py-3 border-b border-gray-200/50 dark:border-gray-600/50">
                                        <div class="text-sm font-semibold text-gray-900 dark:text-white">
                                            {{ Auth::user()->name }}
                                        </div>
                                        <div class="text-xs text-gray-600 dark:text-gray-400">
                                            {{ Auth::user()->email }}
                                        </div>
                                    </div>

                                    <!-- Account Links (only renders existing routes) -->
                                    <livewire:nav.account-links />

                                    <!-- Logout -->
                                    <div class="border-t border-gray-200/50 dark:border-gray-600/50 mt-2 pt-2">
                                        <form method="POST" action="{{ route('logout') }}">
                                            @csrf
                                            <button type="submit"
                                                class="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                                                {{ __('logout') }}
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        @else
                            <!-- Mobile Login Button -->
                            <a href="{{ route('login') }}" class="text-white hover:text-yellow-300 transition-colors">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1">
                                    </path>
                                </svg>
                            </a>
                        @endauth

                        <!-- Mobile Cart Icon -->
                        <button class="relative text-white hover:text-yellow-300 transition-colors">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 7M7 13l2.5 7m0 0h9.5m-9.5 0v0M17 20a1 1 0 100-2 1 1 0 000 2zm-8 0a1 1 0 100-2 1 1 0 000 2z">
                                </path>
                            </svg>
                            <span
                                class="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">3</span>
                        </button>

                        <!-- Mobile Search Icon -->
                        <button class="text-white hover:text-yellow-300 transition-colors">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                        </button>
                    </div>

                    <!-- Center: Logo -->
                    <div class="flex-1 flex justify-center">
                        <a href="{{ route('home') }}"
                            class="text-white font-bold text-lg hover:text-yellow-300 transition-colors">
                            {{ __('site_name') }}
                        </a>
                    </div>

                    <!-- Right Side: Mobile Burger Menu -->
                    <div class="flex items-center">
                        <button @click="mobileMenuOpen = !mobileMenuOpen"
                            class="text-white hover:text-yellow-300 transition-colors">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path x-show="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                                <path x-show="mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Mobile Menu -->
        <div x-show="mobileMenuOpen" x-transition:enter="transition ease-out duration-200"
            x-transition:enter-start="transform -translate-x-100" x-transition:enter-end="transform translate-x-0"
            x-transition:leave="transition ease-in duration-150" x-transition:leave-start="transform translate-x-0"
            x-transition:leave-end="transform -translate-x-100"
            class="md:hidden absolute top-0 end-0 bg-black h-screen w-[100vw-1rem]"
            @click.away="mobileMenuOpen = !mobileMenuOpen">
            <div class="px-4 py-3 space-y-3">

                <!-- Navigation Links -->
                <a href="{{ route('home') }}"
                    class="mobile-nav-link {{ request()->routeIs('home') ? 'text-yellow-300' : 'text-white/80' }}">
                    🏠 {{ __('home') }}
                </a>
                <a href="{{ route('about') }}"
                    class="mobile-nav-link {{ request()->routeIs('about') ? 'text-yellow-300' : 'text-white/80' }}">
                    ℹ️ {{ __('about') }}
                </a>
                <a href="{{ route('contact') }}"
                    class="mobile-nav-link {{ request()->routeIs('contact') ? 'text-yellow-300' : 'text-white/80' }}">
                    📞 {{ __('contact') }}
                </a>

                @guest
                    <!-- Join as Teacher for Mobile (only when not logged in) -->
                    <a href="{{ route('teacher.register') }}" class="mobile-nav-link text-purple-300">
                        🎓 {{ __('join_as_teacher') }}
                    </a>

                    <!-- Register Link for Mobile -->
                    <div class="border-t border-white/20 pt-3 mt-3">
                        <a href="{{ route('register') }}"
                            class="block bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-4 py-2 rounded-lg transition-colors text-center">
                            {{ __('register') }}
                        </a>
                    </div>
                @endguest

                <!-- Mobile Language & Theme Toggle -->
                <div class="border-t border-white/20 pt-3 mt-3">
                    <div class="text-white/60 text-sm mb-2">{{ __('language') }}:</div>
                    <div class="flex space-x-2 mb-4">
                        <a href="{{ route('settings.language', 'ar') }}"
                            class="mobile-lang-button {{ app()->getLocale() === 'ar' ? 'active' : '' }}">
                            عربي
                        </a>
                        <a href="{{ route('settings.language', 'en') }}"
                            class="mobile-lang-button {{ app()->getLocale() === 'en' ? 'active' : '' }}">
                            EN
                        </a>
                    </div>

                    <div class="text-white/60 text-sm mb-2">{{ __('theme') }}:</div>
                    <button @click="darkMode = !darkMode"
                        class="flex items-center space-x-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all duration-300"
                        :class="{ 'bg-white/20': darkMode }"
                        :title="darkMode ? '{{ __('light_mode') }}' : '{{ __('dark_mode') }}'">
                        <!-- Light Mode Icon -->
                        <svg x-show="!darkMode" class="w-5 h-5 text-yellow-400 transition-all duration-300"
                            fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd"
                                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                                clip-rule="evenodd"></path>
                        </svg>
                        <!-- Dark Mode Icon -->
                        <svg x-show="darkMode" class="w-5 h-5 text-indigo-400 transition-all duration-300"
                            fill="currentColor" viewBox="0 0 20 20">
                            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                        </svg>
                        <!-- Toggle Text -->
                        <span x-text="darkMode ? '{{ __('light_mode') }}' : '{{ __('dark_mode') }}'"
                            class="text-sm font-medium"></span>
                    </button>
                </div>
            </div>
        </div>
    </header>

    <!-- Main Content -->
    <main class="relative min-h-screen">
        <!-- Background Elements -->
        <div class="hero-bg fixed inset-0 opacity-30 dark:opacity-50 -z-10"></div>
        <div class="fixed inset-0 -z-10">
            <div
                class="absolute top-10 left-10 w-32 h-32 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob">
            </div>
            <div
                class="absolute top-10 right-10 w-32 h-32 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob delay-1000">
            </div>
            <div
                class="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob delay-500">
            </div>
        </div>

        <!-- Content -->
        <div class="relative z-10 animate-fade-in">
            @yield('content')
        </div>
    </main>

    <!-- Scripts -->
    @livewireScripts

    @yield('scripts')

    <!-- Alpine.js & App Logic -->
    <script>
        // document.addEventListener('alpine:init', () => {
        //     // Initialize dark mode from system preference if not set
        //     if (!localStorage.getItem('darkMode')) {
        //         const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        //         localStorage.setItem('darkMode', JSON.stringify(isDarkMode));

        //         // Force Alpine to re-read the localStorage value
        //         window.Alpine.store('darkMode', isDarkMode);
        //     }
        // });

        // Loading screen management
        document.addEventListener('DOMContentLoaded', function() {
            const loadingScreen = document.getElementById('loading-screen');

            // Hide loading screen after content loads
            window.addEventListener('load', function() {
                setTimeout(() => {
                    loadingScreen.classList.add('fade-out');
                    setTimeout(() => {
                        loadingScreen.remove();
                    }, 500);
                }, 300);
            });
        });

        // Livewire loading states
        document.addEventListener('livewire:init', () => {
            const globalLoading = document.getElementById('global-loading');

            Livewire.hook('morph.updating', () => {
                if (globalLoading) {
                    globalLoading.style.display = 'block';
                    globalLoading.classList.remove('hidden');
                }
            });

            Livewire.hook('morph.updated', () => {
                if (globalLoading) {
                    setTimeout(() => {
                        globalLoading.style.display = 'none';
                        globalLoading.classList.add('hidden');
                    }, 500);
                }
            });
        });

        // Enhanced image lazy loading
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.classList.add('loaded');
                            img.classList.remove('skeleton');
                            observer.unobserve(img);
                        }
                    }
                });
            }, {
                rootMargin: '50px 0px',
                threshold: 0.01
            });

            // Observe all images with data-src
            document.querySelectorAll('img[data-src]').forEach(img => {
                img.classList.add('skeleton');
                imageObserver.observe(img);
            });
        }

        // Theme color updates
        function updateThemeColor(isDark) {
            const metaThemeColor = document.querySelector('meta[name="theme-color"]');
            if (metaThemeColor) {
                metaThemeColor.setAttribute('content', isDark ? '#0f172a' : '#ffffff');
            }
        }

        // Watch for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('darkMode')) {
                updateThemeColor(e.matches);
            }
        });

        // Performance monitoring
        if ('performance' in window) {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    const perfData = performance.getEntriesByType('navigation')[0];
                    if (perfData.loadEventEnd - perfData.loadEventStart > 2000) {
                        console.info('⚡ Consider optimizing page load time');
                    }
                }, 1000);
            });
        }

        // Smooth scrolling for anchor links
        document.addEventListener('click', function(e) {
            if (e.target.tagName === 'A' && e.target.getAttribute('href')?.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(e.target.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    </script>
</body>

</html>
