{{-- resources/views/layouts/admin.blade.php --}}
<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}" dir="{{ app()->getLocale() === 'ar' ? 'rtl' : 'ltr' }}" x-data="{
    darkMode: JSON.parse(localStorage.getItem('darkMode') || JSON.stringify(window.matchMedia('(prefers-color-scheme: dark)').matches)),
    sidebarOpen: true,
    sidebarCollapsed: false,
    userMenuOpen: false
}"
    x-init="$watch('darkMode', val => localStorage.setItem('darkMode', JSON.stringify(val)))" :class="{ 'dark': darkMode }">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="theme-color" x-bind:content="darkMode ? '#0f172a' : '#ffffff'">
    <meta name="color-scheme" x-bind:content="darkMode ? 'dark' : 'light'">

    <title>@yield('title', 'لوحة الإدارة') - {{ config('app.name') }}</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
        rel="stylesheet">

    <!-- Scripts & Styles -->
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    @livewireStyles
</head>

<body class="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-inter transition-colors duration-300">

    <!-- Background -->
    <div class="fixed inset-0 pointer-events-none overflow-hidden">
        <!-- Gradient Background -->
        <div
            class="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900">
        </div>

        <!-- Animated Background Blobs -->
        <div
            class="absolute top-10 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob">
        </div>
        <div
            class="absolute top-10 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob delay-1000">
        </div>
        <div
            class="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob delay-500">
        </div>
    </div>

    <div class="flex h-screen relative z-10">

        <!-- Sidebar -->
        <aside class="sidebar fixed inset-y-0 left-0 z-50 flex flex-col transition-all duration-300 ease-in-out"
            :class="{
                'w-64': !sidebarCollapsed && sidebarOpen,
                'w-16': sidebarCollapsed && sidebarOpen,
                '-translate-x-full': !sidebarOpen
            }"
            x-show="sidebarOpen || window.innerWidth >= 1024" x-transition>

            <!-- Sidebar Background -->
            <div class="absolute inset-0 glass border-r border-white/20 dark:border-gray-700/30"></div>

            <!-- Sidebar Content -->
            <div class="relative flex flex-col h-full">

                <!-- Logo Section -->
                <div class="flex items-center h-16 px-4 border-b border-white/20 dark:border-gray-700/30">
                    <div class="flex items-center space-x-3" :class="{ 'justify-center': sidebarCollapsed }">
                        <div
                            class="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shrink-0">
                            <span class="text-white font-bold text-lg">👑</span>
                        </div>
                        <div x-show="!sidebarCollapsed" x-transition:enter="transition ease-out duration-200 delay-100"
                            x-transition:enter-start="opacity-0 translate-x-4"
                            x-transition:enter-end="opacity-100 translate-x-0"
                            x-transition:leave="transition ease-in duration-150"
                            x-transition:leave-start="opacity-100 translate-x-0"
                            x-transition:leave-end="opacity-0 translate-x-4">
                            <h1 class="text-sm font-bold text-gray-900 dark:text-white">لوحة الإدارة</h1>
                            <p class="text-xs text-gray-500 dark:text-gray-400">{{ config('app.name') }}</p>
                        </div>
                    </div>
                </div>

                <!-- Navigation -->
                <nav class="flex-1 px-4 py-6 space-y-2 overflow-y-auto">

                    <!-- Dashboard -->
                    <a href="{{ route('admin.dashboard') }}"
                        class="sidebar-link {{ request()->routeIs('admin.dashboard') ? 'active' : '' }}"
                        x-tooltip="sidebarCollapsed ? 'Dashboard' : ''">
                        <div class="sidebar-link-icon">
                            <x-heroicon-o-squares-2x2 class="w-5 h-5" />
                        </div>
                        <span x-show="!sidebarCollapsed" x-transition class="sidebar-link-text">Dashboard</span>
                    </a>

                    <!-- Users -->
                    <a href="{{ route('admin.users') }}"
                        class="sidebar-link {{ request()->routeIs('admin.users') ? 'active' : '' }}"
                        x-tooltip="sidebarCollapsed ? 'إدارة المستخدمين' : ''">
                        <div class="sidebar-link-icon">
                            <x-heroicon-o-users class="w-5 h-5" />
                        </div>
                        <span x-show="!sidebarCollapsed" x-transition class="sidebar-link-text">المستخدمين</span>
                    </a>

                    <!-- Categories Section -->
                    <div class="pt-4">
                        <div class="flex items-center px-3 mb-2" :class="{ 'justify-center': sidebarCollapsed }">
                            <span x-show="!sidebarCollapsed" x-transition
                                class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                التصنيفات
                            </span>
                        </div>

                        <!-- Categories -->
                        <a href="{{ route('admin.categories') }}"
                            class="sidebar-link {{ request()->routeIs('admin.categories') ? 'active' : '' }}"
                            x-tooltip="sidebarCollapsed ? 'إدارة التصنيفات' : ''">
                            <div class="sidebar-link-icon">
                                <x-heroicon-o-folder class="w-5 h-5" />
                            </div>
                            <span x-show="!sidebarCollapsed" x-transition class="sidebar-link-text">التصنيفات</span>
                        </a>

                        <!-- Category Types -->
                        <a href="{{ route('admin.category-types') }}"
                            class="sidebar-link {{ request()->routeIs('admin.category-types') ? 'active' : '' }}"
                            x-tooltip="sidebarCollapsed ? 'أنواع التصنيفات' : ''">
                            <div class="sidebar-link-icon">
                                <x-heroicon-o-tag class="w-5 h-5" />
                            </div>
                            <span x-show="!sidebarCollapsed" x-transition class="sidebar-link-text">أنواع
                                التصنيفات</span>
                        </a>
                    </div>

                    <!-- Email Templates -->
                    <div class="pt-4">
                        <div class="flex items-center px-3 mb-2" :class="{ 'justify-center': sidebarCollapsed }">
                            <span x-show="!sidebarCollapsed" x-transition
                                class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                البريد الإلكتروني
                            </span>
                        </div>

                        <a href="{{ route('admin.email-templates.index') }}"
                            class="sidebar-link {{ request()->routeIs('admin.email-templates.*') ? 'active' : '' }}"
                            x-tooltip="sidebarCollapsed ? 'قوالب البريد الإلكتروني' : ''">
                            <div class="sidebar-link-icon">
                                <x-heroicon-o-envelope class="w-5 h-5" />
                            </div>
                            <span x-show="!sidebarCollapsed" x-transition class="sidebar-link-text">قوالب
                                البريد</span>
                        </a>
                    </div>
                </nav>

                <!-- Sidebar Footer -->
                <div class="p-4 border-t border-white/20 dark:border-gray-700/30">
                    <button @click="sidebarCollapsed = !sidebarCollapsed"
                        class="w-full flex items-center justify-center p-2 rounded-xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/20 dark:border-gray-700/30 hover:bg-white/80 dark:hover:bg-gray-700/80 transition-all duration-300"
                        x-tooltip="sidebarCollapsed ? 'توسيع الشريط الجانبي' : 'تصغير الشريط الجانبي'">
                        <div class="w-5 h-5 text-gray-600 dark:text-gray-400 transition-transform duration-300"
                            :class="{ 'rotate-180': !sidebarCollapsed }">
                            <x-heroicon-o-chevron-double-left class="w-full h-full" />
                        </div>
                    </button>
                </div>
            </div>
        </aside>

        <!-- Main Content Area -->
        <div class="flex-1 flex flex-col min-h-screen transition-all duration-300 ease-in-out"
            :class="{
                'lg:ml-64': !sidebarCollapsed && sidebarOpen,
                'lg:ml-16': sidebarCollapsed && sidebarOpen,
                'lg:ml-0': !sidebarOpen
            }">

            <!-- Top Header -->
            <header
                class="flex items-center justify-between h-16 px-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-b border-white/20 dark:border-gray-700/30 sticky top-0 z-40">

                <!-- Left: Mobile menu & breadcrumbs -->
                <div class="flex items-center space-x-4 space-x-reverse">
                    <!-- Mobile Menu Button -->
                    <button @click="sidebarOpen = !sidebarOpen"
                        class="lg:hidden p-2 rounded-xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/20 dark:border-gray-700/30">
                        <x-heroicon-o-bars-3 class="w-6 h-6 text-gray-700 dark:text-gray-300" />
                    </button>

                    <!-- Page Title / Breadcrumbs -->
                    <div>
                        <h1 class="text-lg font-semibold text-gray-900 dark:text-white">
                            @yield('page-title', 'لوحة الإدارة')
                        </h1>
                        @hasSection('breadcrumbs')
                            <nav class="text-sm text-gray-500 dark:text-gray-400">
                                @yield('breadcrumbs')
                            </nav>
                        @endif
                    </div>
                </div>

                <!-- Right: Theme toggle, notifications, user menu -->
                <div class="flex items-center space-x-4 space-x-reverse">

                    <!-- Language Toggle -->
                    <div class="flex items-center gap-2">
                        <div class="flex rounded-xl overflow-hidden  border border-white/20 backdrop-blur-sm">
                            <a href="{{ route('settings.language', 'ar') }}"
                                class="toggle-button-normal{{ app()->getLocale() === 'ar' ? 'active' : '' }}">
                                عربي
                            </a>
                            <a href="{{ route('settings.language', 'en') }}"
                                class="toggle-button-normal{{ app()->getLocale() === 'en' ? 'active' : '' }}">
                                EN
                            </a>
                        </div>
                    </div>
                    <!-- Theme Toggle -->
                    <button @click="darkMode = !darkMode"
                        class="p-2 rounded-xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/20 dark:border-gray-700/30 hover:bg-white/80 dark:hover:bg-gray-700/80 transition-all duration-300"
                        :title="darkMode ? 'تفعيل الوضع النهاري' : 'تفعيل الوضع الليلي'">
                        <x-heroicon-o-sun x-show="!darkMode" class="w-5 h-5 text-yellow-500" />
                        <x-heroicon-o-moon x-show="darkMode" class="w-5 h-5 text-blue-400" />
                    </button>

                    <!-- User Menu -->
                    <div class="relative" x-data="{ open: false }">
                        <button @click="open = !open"
                            class="flex items-center space-x-3 space-x-reverse p-2 rounded-xl bg-white dark:bg-gray-800 backdrop-blur-sm border border-white/20 dark:border-gray-700/30 hover:bg-white/80 dark:hover:bg-gray-700/80 transition-all duration-300">
                            <div
                                class="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                <span
                                    class="text-white font-semibold text-sm">{{ substr(auth()->user()->name, 0, 1) }}</span>
                            </div>
                            <div class="hidden sm:block text-right">
                                <div class="text-sm font-medium text-gray-900 dark:text-white">
                                    {{ auth()->user()->name }}</div>
                                <div class="text-xs text-gray-500 dark:text-gray-400">مدير</div>
                            </div>
                            <div class="w-4 h-4 text-gray-400 transition-transform duration-200"
                                :class="{ 'rotate-180': open }">
                                <x-heroicon-o-chevron-down class="w-full h-full" />
                            </div>
                        </button>

                        <!-- User Dropdown -->
                        <div x-show="open" x-transition:enter="transition ease-out duration-200"
                            x-transition:enter-start="opacity-0 scale-95"
                            x-transition:enter-end="opacity-100 scale-100"
                            x-transition:leave="transition ease-in duration-75"
                            x-transition:leave-start="opacity-100 scale-100"
                            x-transition:leave-end="opacity-0 scale-95" @click.away="open = false"
                            class="absolute right-0 mt-2 w-48 rounded-2xl bg-white dark:bg-black border border-white/20 dark:border-gray-700/30 py-1 z-50">

                            <a href="{{ route('home') }}" class="dropdown-item">
                                <x-heroicon-o-home class="w-4 h-4" />
                                الموقع الرئيسي
                            </a>

                            <div class="border-t border-white/20 dark:border-gray-700/30 my-1"></div>

                            <form method="POST" action="{{ route('logout') }}">
                                @csrf
                                <button type="submit"
                                    class="dropdown-item w-full text-right text-red-600 dark:text-red-400">
                                    <x-heroicon-o-arrow-right-on-rectangle class="w-4 h-4" />
                                    تسجيل الخروج
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </header>

            <!-- Main Content -->
            <main class="flex-1 p-6 overflow-y-auto">
                <!-- Flash Messages -->
                @if (session('success'))
                    <div x-data="{ show: true }" x-show="show" x-transition
                        class="mb-6 glass border border-green-200 dark:border-green-800 rounded-2xl p-4">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center">
                                <div class="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center ml-3">
                                    <x-heroicon-o-check class="w-5 h-5 text-white" />
                                </div>
                                <p class="text-green-700 dark:text-green-300 font-medium">{{ session('success') }}</p>
                            </div>
                            <button @click="show = false"
                                class="text-green-500 hover:text-green-700 transition-colors">
                                <x-heroicon-o-x-mark class="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                @endif

                @if (session('error'))
                    <div x-data="{ show: true }" x-show="show" x-transition
                        class="mb-6 glass border border-red-200 dark:border-red-800 rounded-2xl p-4">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center">
                                <div class="w-10 h-10 bg-red-500 rounded-xl flex items-center justify-center ml-3">
                                    <x-heroicon-o-x-mark class="w-5 h-5 text-white" />
                                </div>
                                <p class="text-red-700 dark:text-red-300 font-medium">{{ session('error') }}</p>
                            </div>
                            <button @click="show = false" class="text-red-500 hover:text-red-700 transition-colors">
                                <x-heroicon-o-x-mark class="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                @endif

                <!-- Page Content -->
                {{ $slot }}
            </main>
        </div>
    </div>

    <!-- Mobile Sidebar Overlay -->
    <div x-show="sidebarOpen && window.innerWidth < 1024"
        x-transition:enter="transition-opacity ease-linear duration-300" x-transition:enter-start="opacity-0"
        x-transition:enter-end="opacity-100" x-transition:leave="transition-opacity ease-linear duration-300"
        x-transition:leave-start="opacity-100" x-transition:leave-end="opacity-0" @click="sidebarOpen = false"
        class="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"></div>

    @livewireScripts

</body>

</html>
