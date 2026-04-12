<div>
    <!-- Page Header -->
    <div class="mb-8 animate-fade-in">
        <div class="text-center">
            <h1
                class="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                👥 إدارة المستخدمين
            </h1>
            <p class="text-lg text-gray-600 dark:text-gray-300">
                عرض وإدارة جميع مستخدمي المنصة بأدوارهم المختلفة
            </p>
        </div>
    </div>

    <!-- Statistics Cards -->
    <div class="grid grid-cols-1 md:grid-cols-6 gap-4 mb-8 animate-slide-up">
        <div class="glass rounded-2xl p-4 hover:scale-105 transform transition-all duration-300">
            <div class="flex items-center">
                <div
                    class="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mr-3">
                    <span class="text-white text-lg">👥</span>
                </div>
                <div>
                    <p class="text-sm text-gray-600 dark:text-gray-400">إجمالي المستخدمين</p>
                    <p class="text-xl font-bold text-gray-900 dark:text-white">{{ $userStats['total'] ?? 0 }}</p>
                </div>
            </div>
        </div>

        <div class="glass rounded-2xl p-4 hover:scale-105 transform transition-all duration-300">
            <div class="flex items-center">
                <div
                    class="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mr-3">
                    <span class="text-white text-lg">👑</span>
                </div>
                <div>
                    <p class="text-sm text-gray-600 dark:text-gray-400">مديرين</p>
                    <p class="text-xl font-bold text-gray-900 dark:text-white">{{ $userStats['admins'] ?? 0 }}</p>
                </div>
            </div>
        </div>

        <div class="glass rounded-2xl p-4 hover:scale-105 transform transition-all duration-300">
            <div class="flex items-center">
                <div
                    class="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center mr-3">
                    <span class="text-white text-lg">👨‍🏫</span>
                </div>
                <div>
                    <p class="text-sm text-gray-600 dark:text-gray-400">مدرسين</p>
                    <p class="text-xl font-bold text-gray-900 dark:text-white">{{ $userStats['teachers'] ?? 0 }}</p>
                </div>
            </div>
        </div>

        <div class="glass rounded-2xl p-4 hover:scale-105 transform transition-all duration-300">
            <div class="flex items-center">
                <div
                    class="w-10 h-10 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center mr-3">
                    <span class="text-white text-lg">👨‍👩‍👧‍👦</span>
                </div>
                <div>
                    <p class="text-sm text-gray-600 dark:text-gray-400">أولياء أمور</p>
                    <p class="text-xl font-bold text-gray-900 dark:text-white">{{ $userStats['parents'] ?? 0 }}</p>
                </div>
            </div>
        </div>

        <div class="glass rounded-2xl p-4 hover:scale-105 transform transition-all duration-300">
            <div class="flex items-center">
                <div
                    class="w-10 h-10 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center mr-3">
                    <span class="text-white text-lg">🎓</span>
                </div>
                <div>
                    <p class="text-sm text-gray-600 dark:text-gray-400">طلاب</p>
                    <p class="text-xl font-bold text-gray-900 dark:text-white">{{ $userStats['students'] ?? 0 }}</p>
                </div>
            </div>
        </div>

        <div class="glass rounded-2xl p-4 hover:scale-105 transform transition-all duration-300">
            <div class="flex items-center">
                <div
                    class="w-10 h-10 bg-gradient-to-r from-gray-500 to-gray-600 rounded-xl flex items-center justify-center mr-3">
                    <span class="text-white text-lg">👤</span>
                </div>
                <div>
                    <p class="text-sm text-gray-600 dark:text-gray-400">ضيوف</p>
                    <p class="text-xl font-bold text-gray-900 dark:text-white">{{ $userStats['guests'] ?? 0 }}</p>
                </div>
            </div>
        </div>
    </div>

    <!-- Filters -->
    <div class="glass rounded-3xl p-6 mb-8 animate-slide-up delay-200">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <!-- Search -->
            <div class="md:col-span-2">
                <label for="search" class="form-label">🔍 البحث</label>
                <input type="text" wire:model.live="search" placeholder="ابحث بالاسم، البريد، الهاتف، أو المدينة..."
                    class="form-input">
            </div>

            <!-- Role Filter -->
            <div>
                <label for="role" class="form-label">👤 الدور</label>
                <select wire:model.live="selectedRole" class="form-input">
                    <option value="">جميع الأدوار</option>
                    @foreach ($roles as $key => $name)
                        <option value="{{ $key }}">{{ $name }}</option>
                    @endforeach
                </select>
            </div>

            <!-- Status Filter -->
            <div>
                <label for="status" class="form-label">⚡ الحالة</label>
                <select wire:model.live="statusFilter" class="form-input">
                    <option value="all">جميع الحالات</option>
                    <option value="active">نشط</option>
                    <option value="inactive">غير نشط</option>
                </select>
            </div>
        </div>

        <div class="mt-4">
            <button wire:click="clearFilters"
                class="btn bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white">
                🗑️ مسح الفلاتر
            </button>
        </div>
    </div>

    <!-- Users List -->
    <div class="glass rounded-3xl overflow-hidden shadow-2xl animate-slide-up delay-300">
        <!-- Table Header -->
        <div class="px-6 py-4 bg-white/20 dark:bg-gray-800/20 border-b border-white/20 dark:border-gray-700/30">
            <h3 class="text-lg font-bold text-gray-900 dark:text-white">
                👥 المستخدمين ({{ $users->total() }})
            </h3>
        </div>

        <!-- Table -->
        <div class="overflow-x-auto">
            <table class="min-w-full">
                <thead class="bg-white/10 dark:bg-gray-800/20">
                    <tr>
                        <th class="px-6 py-4 text-right text-sm font-bold text-gray-700 dark:text-gray-300">
                            المستخدم
                        </th>
                        <th class="px-6 py-4 text-right text-sm font-bold text-gray-700 dark:text-gray-300">
                            الدور
                        </th>
                        <th class="px-6 py-4 text-right text-sm font-bold text-gray-700 dark:text-gray-300">
                            معلومات التواصل
                        </th>
                        <th class="px-6 py-4 text-right text-sm font-bold text-gray-700 dark:text-gray-300">
                            الحالة
                        </th>
                        <th class="px-6 py-4 text-right text-sm font-bold text-gray-700 dark:text-gray-300">
                            تاريخ التسجيل
                        </th>
                        <th class="px-6 py-4 text-right text-sm font-bold text-gray-700 dark:text-gray-300">
                            الإجراءات
                        </th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-white/10 dark:divide-gray-700/30">
                    @forelse($users as $user)
                        <tr class="hover:bg-white/10 dark:hover:bg-gray-800/20 transition-colors duration-200">
                            <!-- User Info -->
                            <td class="px-6 py-4">
                                <div class="flex items-center">
                                    <div
                                        class="w-12 h-12 rounded-2xl flex items-center justify-center mr-3 shadow-lg
                                    @if ($user->role->value === 'admin') bg-gradient-to-r from-purple-500 to-purple-600
                                    @elseif($user->role->value === 'teacher') bg-gradient-to-r from-green-500 to-green-600
                                    @elseif($user->role->value === 'parent') bg-gradient-to-r from-yellow-500 to-yellow-600
                                    @elseif($user->role->value === 'student') bg-gradient-to-r from-blue-500 to-blue-600
                                    @else bg-gradient-to-r from-gray-500 to-gray-600 @endif">
                                        <span class="text-white text-lg">
                                            @if ($user->role->value === 'admin')
                                                👑
                                            @elseif($user->role->value === 'teacher')
                                                👨‍🏫
                                            @elseif($user->role->value === 'parent')
                                                👨‍👩‍👧‍👦
                                            @elseif($user->role->value === 'student')
                                                🎓
                                            @else
                                                👤
                                            @endif
                                        </span>
                                    </div>
                                    <div>
                                        <p class="text-sm font-semibold text-gray-900 dark:text-white">
                                            {{ $user->getDisplayName() }}</p>
                                        <p class="text-xs text-gray-500 dark:text-gray-400">{{ $user->email }}</p>
                                        @if ($user->isTeacher() && $user->teacher)
                                            <div class="flex flex-wrap gap-1 mt-1">
                                                <span
                                                    class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                                                    ✅ مربوط بملف مدرس
                                                </span>

                                                @if ($user->teacher->is_verified)
                                                    <span
                                                        class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                                                        🏆 مُعتمد
                                                    </span>
                                                @else
                                                    <span
                                                        class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300">
                                                        ⏳ في انتظار الاعتماد
                                                    </span>
                                                @endif

                                                @if ($user->teacher->profile_completed)
                                                    <span
                                                        class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300">
                                                        📋 الملف مكتمل
                                                    </span>
                                                @else
                                                    <span
                                                        class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300">
                                                        📝 الملف ناقص
                                                    </span>
                                                @endif
                                            </div>
                                        @elseif($user->isTeacher() && !$user->teacher)
                                            <span
                                                class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 mt-1">
                                                ⚠️ ملف المدرس مفقود
                                            </span>
                                        @endif
                                    </div>
                                </div>
                            </td>

                            <!-- Role -->
                            <td class="px-6 py-4">
                                <span
                                    class="inline-flex items-center px-3 py-1 rounded-2xl text-sm font-semibold shadow-lg
                                @if ($user->role->value === 'admin') bg-gradient-to-r from-purple-500 to-purple-600 text-white
                                @elseif($user->role->value === 'teacher') bg-gradient-to-r from-green-500 to-green-600 text-white
                                @elseif($user->role->value === 'parent') bg-gradient-to-r from-yellow-500 to-yellow-600 text-white
                                @elseif($user->role->value === 'student') bg-gradient-to-r from-blue-500 to-blue-600 text-white
                                @else bg-gradient-to-r from-gray-500 to-gray-600 text-white @endif">
                                    {{ $user->getRoleDisplayName() }}
                                </span>
                            </td>

                            <!-- Contact Info -->
                            <td class="px-6 py-4">
                                <div class="space-y-1">
                                    @if ($user->phone)
                                        <div class="flex items-center text-sm text-gray-700 dark:text-gray-300">
                                            <span class="mr-2">📱</span>{{ $user->phone }}
                                        </div>
                                    @endif
                                    @if ($user->city)
                                        <div class="flex items-center text-sm text-gray-700 dark:text-gray-300">
                                            <span class="mr-2">🏙️</span>{{ $user->city }}
                                        </div>
                                    @endif
                                </div>
                            </td>

                            <!-- Status -->
                            <td class="px-6 py-4">
                                <div class="space-y-2">
                                    <span
                                        class="inline-flex items-center px-3 py-1 rounded-2xl text-xs font-semibold shadow-lg
                                    @if ($user->is_active) bg-gradient-to-r from-green-500 to-green-600 text-white 
                                    @else bg-gradient-to-r from-red-500 to-red-600 text-white @endif">
                                        @if ($user->is_active)
                                            ✅ نشط
                                        @else
                                            ❌ غير نشط
                                        @endif
                                    </span>

                                    @if ($user->email_verified_at)
                                        <span
                                            class="inline-flex items-center px-3 py-1 rounded-2xl text-xs font-semibold bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg">
                                            ✉️ مؤكد
                                        </span>
                                    @else
                                        <span
                                            class="inline-flex items-center px-3 py-1 rounded-2xl text-xs font-semibold bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg">
                                            ⏳ غير مؤكد
                                        </span>
                                    @endif
                                </div>
                            </td>

                            <!-- Registration Date -->
                            <td class="px-6 py-4">
                                <div class="text-sm">
                                    <p class="font-medium text-gray-900 dark:text-white">
                                        {{ $user->created_at->format('d/m/Y') }}</p>
                                    <p class="text-gray-500 dark:text-gray-400">
                                        {{ $user->created_at->diffForHumans() }}</p>
                                    @if ($user->last_login_at)
                                        <p class="text-xs text-gray-400 dark:text-gray-500 mt-1">
                                            آخر دخول: {{ $user->last_login_at->diffForHumans() }}
                                        </p>
                                    @endif
                                </div>
                            </td>

                            <!-- Actions -->
                            <td class="px-6 py-4">
                                <div class="flex items-center gap-2">
                                    <!-- Status Toggle -->
                                    <button wire:click="toggleUserStatus('{{ $user->id }}')"
                                        class="p-2 rounded-lg transition-colors {{ $user->is_active ? 'text-green-600 hover:bg-green-100 dark:hover:bg-green-900/20' : 'text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20' }}"
                                        title="{{ $user->is_active ? 'إلغاء تفعيل' : 'تفعيل' }}">
                                        @if ($user->is_active)
                                            <svg class="w-5 h-5" fill="none" stroke="currentColor"
                                                viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M5 13l4 4L19 7"></path>
                                            </svg>
                                        @else
                                            <svg class="w-5 h-5" fill="none" stroke="currentColor"
                                                viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M6 18L18 6M6 6l12 12"></path>
                                            </svg>
                                        @endif
                                    </button>

                                    @if ($user->isTeacher() && $user->teacher)
                                        <!-- Teacher-Specific Actions -->
                                        <div class="relative" x-data="{ teacherActions: false }">
                                            <button @click="teacherActions = !teacherActions"
                                                class="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                                                title="إجراءات المدرس">
                                                <svg class="w-5 h-5" fill="none" stroke="currentColor"
                                                    viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4">
                                                    </path>
                                                </svg>
                                            </button>

                                            <div x-show="teacherActions"
                                                x-transition:enter="transition ease-out duration-100"
                                                x-transition:enter-start="transform opacity-0 scale-95"
                                                x-transition:enter-end="transform opacity-100 scale-100"
                                                @click.away="teacherActions = false"
                                                class="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">

                                                <button wire:click="viewTeacherProfile('{{ $user->id }}')"
                                                    class="w-full px-4 py-2 text-right text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2">
                                                    👤 عرض الملف الشخصي
                                                </button>

                                                @if (!$user->teacher->is_verified)
                                                    <button wire:click="approveTeacher('{{ $user->id }}')"
                                                        class="w-full px-4 py-2 text-right text-sm text-green-600 hover:bg-green-100 dark:hover:bg-green-900/20 flex items-center gap-2">
                                                        ✅ اعتماد المدرس
                                                    </button>
                                                    <button wire:click="rejectTeacher('{{ $user->id }}')"
                                                        class="w-full px-4 py-2 text-right text-sm text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 flex items-center gap-2">
                                                        ❌ رفض الطلب
                                                    </button>
                                                @else
                                                    <button wire:click="suspendTeacher('{{ $user->id }}')"
                                                        class="w-full px-4 py-2 text-right text-sm text-orange-600 hover:bg-orange-100 dark:hover:bg-orange-900/20 flex items-center gap-2">
                                                        ⏸️ إيقاف مؤقت
                                                    </button>
                                                @endif
                                            </div>
                                        </div>
                                    @elseif($user->isTeacher() && !$user->teacher)
                                        <!-- Missing Teacher Profile - Create Link -->
                                        <button wire:click="createMissingTeacherProfile('{{ $user->id }}')"
                                            class="p-2 text-yellow-600 hover:bg-yellow-100 dark:hover:bg-yellow-900/20 rounded-lg transition-colors"
                                            title="إنشاء ملف مدرس">
                                            <svg class="w-5 h-5" fill="none" stroke="currentColor"
                                                viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                            </svg>
                                        </button>
                                    @endif

                                    <!-- Role Change Dropdown -->
                                    <div class="relative" x-data="{ roleDropdown: false }">
                                        <button @click="roleDropdown = !roleDropdown"
                                            class="p-2 text-purple-600 hover:bg-purple-100 dark:hover:bg-purple-900/20 rounded-lg transition-colors"
                                            title="تغيير الدور">
                                            <svg class="w-5 h-5" fill="none" stroke="currentColor"
                                                viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M8 9l4-4 4 4m0 6l-4 4-4-4"></path>
                                            </svg>
                                        </button>

                                        <!-- Role Change Dropdown -->
                                        <div x-show="roleDropdown" x-transition @click.away="roleDropdown = false"
                                            class="absolute left-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                                            @foreach ($roles as $roleKey => $roleName)
                                                @if ($roleKey !== $user->role->value)
                                                    <button
                                                        wire:click="changeUserRole('{{ $user->id }}', '{{ $roleKey }}')"
                                                        class="w-full px-4 py-2 text-right text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                                                        {{ $roleName }}
                                                    </button>
                                                @endif
                                            @endforeach
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="6" class="px-6 py-16 text-center">
                                <div class="text-gray-500 dark:text-gray-400">
                                    <div
                                        class="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-gray-400 to-gray-500 rounded-3xl flex items-center justify-center">
                                        <span class="text-3xl text-white">👥</span>
                                    </div>
                                    <p class="text-lg font-medium">لا توجد مستخدمين</p>
                                    <p class="text-sm mt-2">لم يتم العثور على مستخدمين يطابقون معايير البحث</p>
                                </div>
                            </td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>

        <!-- Pagination -->
        @if ($users->hasPages())
            <div class="px-6 py-4 bg-white/10 dark:bg-gray-800/20 border-t border-white/20 dark:border-gray-700/30">
                {{ $users->links() }}
            </div>
        @endif
    </div>
</div>
