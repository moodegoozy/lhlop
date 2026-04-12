<div>
    <!-- Page Header -->
    <div class="mb-8 animate-fade-in">
        <div class="text-center">
            <h1 class="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                👑 لوحة الإدارة
            </h1>
            <p class="text-lg text-gray-600 dark:text-gray-300">
                مرحباً {{ auth()->user()->getDisplayName() }}، هنا يمكنك إدارة المنصة بالكامل
            </p>
        </div>
    </div>

    @if(isset($stats))
    <!-- Quick Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-slide-up">
        <!-- Users Stats -->
        <div class="glass rounded-3xl p-6 hover:scale-105 transform transition-all duration-500 hover:shadow-2xl">
            <div class="flex items-center justify-between">
                <div>
                    <p class="text-sm font-medium text-gray-600 dark:text-gray-400">المستخدمين</p>
                    <p class="text-3xl font-bold text-gray-900 dark:text-white">{{ $stats['users']['total'] ?? 0 }}</p>
                    <p class="text-xs text-green-600 dark:text-green-400 mt-1">
                        +{{ $stats['users']['new_today'] ?? 0 }} اليوم
                    </p>
                </div>
                <div class="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center">
                    <span class="text-white text-2xl">👥</span>
                </div>
            </div>
        </div>

        <!-- Teachers Stats -->
        <div class="glass rounded-3xl p-6 hover:scale-105 transform transition-all duration-500 hover:shadow-2xl">
            <div class="flex items-center justify-between">
                <div>
                    <p class="text-sm font-medium text-gray-600 dark:text-gray-400">المدرسين</p>
                    <p class="text-3xl font-bold text-gray-900 dark:text-white">{{ $stats['teachers']['total'] ?? 0 }}</p>
                    <p class="text-xs text-blue-600 dark:text-blue-400 mt-1">
                        {{ $stats['teachers']['active'] ?? 0 }} نشط
                    </p>
                </div>
                <div class="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center">
                    <span class="text-white text-2xl">👨‍🏫</span>
                </div>
            </div>
        </div>

        <!-- Bookings Stats -->
        <div class="glass rounded-3xl p-6 hover:scale-105 transform transition-all duration-500 hover:shadow-2xl">
            <div class="flex items-center justify-between">
                <div>
                    <p class="text-sm font-medium text-gray-600 dark:text-gray-400">الحجوزات</p>
                    <p class="text-3xl font-bold text-gray-900 dark:text-white">{{ $stats['bookings']['total'] ?? 0 }}</p>
                    <p class="text-xs text-purple-600 dark:text-purple-400 mt-1">
                        {{ $stats['bookings']['pending'] ?? 0 }} في الانتظار
                    </p>
                </div>
                <div class="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center">
                    <span class="text-white text-2xl">📅</span>
                </div>
            </div>
        </div>

        <!-- Email Templates Stats -->
        <div class="glass rounded-3xl p-6 hover:scale-105 transform transition-all duration-500 hover:shadow-2xl">
            <div class="flex items-center justify-between">
                <div>
                    <p class="text-sm font-medium text-gray-600 dark:text-gray-400">قوالب البريد</p>
                    <p class="text-3xl font-bold text-gray-900 dark:text-white">{{ $stats['email_templates']['total'] ?? 0 }}</p>
                    <p class="text-xs text-pink-600 dark:text-pink-400 mt-1">
                        {{ $stats['email_templates']['active'] ?? 0 }} نشط
                    </p>
                </div>
                <div class="w-12 h-12 bg-gradient-to-r from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center">
                    <span class="text-white text-2xl">📧</span>
                </div>
            </div>
        </div>
    </div>

    <!-- Charts and Details -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <!-- Recent Activity -->
        <div class="glass rounded-3xl p-6 animate-slide-up delay-200">
            <div class="flex items-center justify-between mb-6">
                <h3 class="text-xl font-bold text-gray-900 dark:text-white">📊 إحصائيات المستخدمين</h3>
            </div>
            
            <div class="space-y-4">
                <div class="flex items-center justify-between p-4 bg-white/50 dark:bg-gray-800/50 rounded-2xl">
                    <div class="flex items-center">
                        <div class="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center mr-3">
                            <span class="text-white text-sm">👑</span>
                        </div>
                        <div>
                            <p class="font-medium text-gray-900 dark:text-white">المديرين</p>
                            <p class="text-sm text-gray-600 dark:text-gray-400">إدارة كاملة للنظام</p>
                        </div>
                    </div>
                    <span class="text-lg font-bold text-purple-600 dark:text-purple-400">
                        {{ \App\Models\User::admins()->count() }}
                    </span>
                </div>

                <div class="flex items-center justify-between p-4 bg-white/50 dark:bg-gray-800/50 rounded-2xl">
                    <div class="flex items-center">
                        <div class="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center mr-3">
                            <span class="text-white text-sm">👨‍🏫</span>
                        </div>
                        <div>
                            <p class="font-medium text-gray-900 dark:text-white">المدرسين</p>
                            <p class="text-sm text-gray-600 dark:text-gray-400">حسابات المدرسين المتصلة</p>
                        </div>
                    </div>
                    <span class="text-lg font-bold text-green-600 dark:text-green-400">
                        {{ \App\Models\User::teachers()->count() }}
                    </span>
                </div>

                <div class="flex items-center justify-between p-4 bg-white/50 dark:bg-gray-800/50 rounded-2xl">
                    <div class="flex items-center">
                        <div class="w-10 h-10 bg-yellow-500 rounded-xl flex items-center justify-center mr-3">
                            <span class="text-white text-sm">👨‍👩‍👧‍👦</span>
                        </div>
                        <div>
                            <p class="font-medium text-gray-900 dark:text-white">أولياء الأمور</p>
                            <p class="text-sm text-gray-600 dark:text-gray-400">يديرون حجوزات أطفالهم</p>
                        </div>
                    </div>
                    <span class="text-lg font-bold text-yellow-600 dark:text-yellow-400">
                        {{ \App\Models\User::parents()->count() }}
                    </span>
                </div>

                <div class="flex items-center justify-between p-4 bg-white/50 dark:bg-gray-800/50 rounded-2xl">
                    <div class="flex items-center">
                        <div class="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center mr-3">
                            <span class="text-white text-sm">🎓</span>
                        </div>
                        <div>
                            <p class="font-medium text-gray-900 dark:text-white">الطلاب</p>
                            <p class="text-sm text-gray-600 dark:text-gray-400">يحجزون حصص لأنفسهم</p>
                        </div>
                    </div>
                    <span class="text-lg font-bold text-blue-600 dark:text-blue-400">
                        {{ \App\Models\User::students()->count() }}
                    </span>
                </div>
            </div>
        </div>

        <!-- System Status -->
        <div class="glass rounded-3xl p-6 animate-slide-up delay-300">
            <div class="flex items-center justify-between mb-6">
                <h3 class="text-xl font-bold text-gray-900 dark:text-white">⚡ حالة النظام</h3>
            </div>
            
            <div class="space-y-4">
                <!-- System Health -->
                <div class="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl">
                    <div class="flex items-center">
                        <div class="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                        <div>
                            <p class="font-medium text-green-800 dark:text-green-300">النظام يعمل بشكل طبيعي</p>
                            <p class="text-sm text-green-600 dark:text-green-400">جميع الخدمات متاحة</p>
                        </div>
                    </div>
                </div>

                <!-- Database -->
                <div class="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center">
                            <div class="w-8 h-8 bg-blue-500 rounded-xl flex items-center justify-center mr-3">
                                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"></path>
                                </svg>
                            </div>
                            <div>
                                <p class="font-medium text-blue-800 dark:text-blue-300">قاعدة البيانات</p>
                                <p class="text-sm text-blue-600 dark:text-blue-400">PostgreSQL</p>
                            </div>
                        </div>
                        <span class="text-green-500 text-sm font-medium">✅ متصلة</span>
                    </div>
                </div>

                <!-- Email Service -->
                <div class="p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-2xl">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center">
                            <div class="w-8 h-8 bg-purple-500 rounded-xl flex items-center justify-center mr-3">
                                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                </svg>
                            </div>
                            <div>
                                <p class="font-medium text-purple-800 dark:text-purple-300">خدمة البريد الإلكتروني</p>
                                <p class="text-sm text-purple-600 dark:text-purple-400">SMTP</p>
                            </div>
                        </div>
                        <span class="text-green-500 text-sm font-medium">✅ تعمل</span>
                    </div>
                </div>

                <!-- Storage -->
                <div class="p-4 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-2xl">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center">
                            <div class="w-8 h-8 bg-indigo-500 rounded-xl flex items-center justify-center mr-3">
                                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                                </svg>
                            </div>
                            <div>
                                <p class="font-medium text-indigo-800 dark:text-indigo-300">التخزين</p>
                                <p class="text-sm text-indigo-600 dark:text-indigo-400">Local Storage</p>
                            </div>
                        </div>
                        <span class="text-green-500 text-sm font-medium">✅ متاح</span>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Quick Actions -->
    <div class="glass rounded-3xl p-6 animate-slide-up delay-400">
        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-6">🚀 إجراءات سريعة</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <a href="{{ route('admin.users') }}" 
               class="group bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white p-6 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                <div class="flex items-center justify-between">
                    <div>
                        <h4 class="font-semibold mb-1">إدارة المستخدمين</h4>
                        <p class="text-blue-100 text-sm">عرض وتعديل المستخدمين</p>
                    </div>
                    <span class="text-2xl group-hover:scale-110 transition-transform">👥</span>
                </div>
            </a>

            <a href="{{ route('admin.email-templates.index') }}" 
               class="group bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white p-6 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                <div class="flex items-center justify-between">
                    <div>
                        <h4 class="font-semibold mb-1">قوالب البريد</h4>
                        <p class="text-purple-100 text-sm">إدارة رسائل البريد الإلكتروني</p>
                    </div>
                    <span class="text-2xl group-hover:scale-110 transition-transform">📧</span>
                </div>
            </a>

            <a href="{{ route('home') }}" 
               class="group bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white p-6 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                <div class="flex items-center justify-between">
                    <div>
                        <h4 class="font-semibold mb-1">الموقع الرئيسي</h4>
                        <p class="text-green-100 text-sm">عرض الموقع كمستخدم</p>
                    </div>
                    <span class="text-2xl group-hover:scale-110 transition-transform">🌐</span>
                </div>
            </a>

            <div class="group bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white p-6 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                <div class="flex items-center justify-between">
                    <div>
                        <h4 class="font-semibold mb-1">التقارير</h4>
                        <p class="text-pink-100 text-sm">قريباً...</p>
                    </div>
                    <span class="text-2xl group-hover:scale-110 transition-transform">📊</span>
                </div>
            </div>
        </div>
    </div>
    @endif
</div>
