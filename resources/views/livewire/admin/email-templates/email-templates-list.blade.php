<div>
    <!-- Page Header -->
    <div class="mb-8 animate-fade-in">
        <div class="text-center">
            <h1 class="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                📧 قوالب البريد الإلكتروني
            </h1>
            <p class="text-lg text-gray-600 dark:text-gray-300">
                إدارة وتحرير قوالب البريد الإلكتروني للمنصة
            </p>
        </div>
    </div>

    <!-- Statistics Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 animate-slide-up">
        <div class="glass rounded-3xl p-6 hover:scale-105 transform transition-all duration-500 hover:shadow-2xl">
            <div class="flex items-center justify-between">
                <div>
                    <p class="text-sm font-medium text-gray-600 dark:text-gray-400">إجمالي القوالب</p>
                    <p class="text-3xl font-bold text-gray-900 dark:text-white">{{ $stats['total_templates'] ?? 0 }}</p>
                </div>
                <div class="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center">
                    <span class="text-white text-2xl">📧</span>
                </div>
            </div>
        </div>

        <div class="glass rounded-3xl p-6 hover:scale-105 transform transition-all duration-500 hover:shadow-2xl">
            <div class="flex items-center justify-between">
                <div>
                    <p class="text-sm font-medium text-gray-600 dark:text-gray-400">القوالب النشطة</p>
                    <p class="text-3xl font-bold text-gray-900 dark:text-white">{{ $stats['active_templates'] ?? 0 }}</p>
                </div>
                <div class="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center">
                    <span class="text-white text-2xl">✅</span>
                </div>
            </div>
        </div>

        <div class="glass rounded-3xl p-6 hover:scale-105 transform transition-all duration-500 hover:shadow-2xl">
            <div class="flex items-center justify-between">
                <div>
                    <p class="text-sm font-medium text-gray-600 dark:text-gray-400">قوالب النظام</p>
                    <p class="text-3xl font-bold text-gray-900 dark:text-white">{{ $stats['system_templates'] ?? 0 }}</p>
                </div>
                <div class="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center">
                    <span class="text-white text-2xl">🛠️</span>
                </div>
            </div>
        </div>

        <div class="glass rounded-3xl p-6 hover:scale-105 transform transition-all duration-500 hover:shadow-2xl">
            <div class="flex items-center justify-between">
                <div>
                    <p class="text-sm font-medium text-gray-600 dark:text-gray-400">القوالب المخصصة</p>
                    <p class="text-3xl font-bold text-gray-900 dark:text-white">{{ $stats['custom_templates'] ?? 0 }}</p>
                </div>
                <div class="w-12 h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center">
                    <span class="text-white text-2xl">👤</span>
                </div>
            </div>
        </div>
    </div>

    <!-- Action Header -->
    <div class="text-center mb-8 animate-slide-up delay-100">
        <a href="{{ route('admin.email-templates.create') }}" 
           class="btn bg-gradient-to-r from-green-500 via-blue-500 to-purple-600 hover:from-green-600 hover:via-blue-600 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300">
            ➕ إنشاء قالب جديد
        </a>
    </div>

    <!-- Filters -->
    <div class="glass rounded-3xl p-6 mb-8 animate-slide-up delay-200">
        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">🔍 الفلاتر</h3>
        <div class="grid grid-cols-1 md:grid-cols-6 gap-4">
            <!-- Search -->
            <div class="md:col-span-2">
                <label for="search" class="form-label">🔍 البحث</label>
                <input type="text" 
                       wire:model.live="search" 
                       placeholder="ابحث في الاسم، المفتاح، أو الوصف..."
                       class="form-input">
            </div>

            <!-- Category Filter -->
            <div>
                <label for="category" class="form-label">📂 الفئة</label>
                <select wire:model.live="selectedCategory" 
                        class="form-input">
                    <option value="">جميع الفئات</option>
                    @foreach($categories as $key => $name)
                    <option value="{{ $key }}">{{ $name }}</option>
                    @endforeach
                </select>
            </div>

            <!-- Locale Filter -->
            <div>
                <label for="locale" class="form-label">🌐 اللغة</label>
                <select wire:model.live="selectedLocale" 
                        class="form-input">
                    @foreach($locales as $key => $name)
                    <option value="{{ $key }}">{{ $name }}</option>
                    @endforeach
                </select>
            </div>

            <!-- Status Filter -->
            <div>
                <label for="status" class="form-label">⚡ الحالة</label>
                <select wire:model.live="statusFilter" 
                        class="form-input">
                    <option value="all">جميع الحالات</option>
                    <option value="active">نشط</option>
                    <option value="inactive">غير نشط</option>
                </select>
            </div>

            <!-- Type Filter -->
            <div>
                <label for="type" class="form-label">🎨 النوع</label>
                <select wire:model.live="typeFilter" 
                        class="form-input">
                    <option value="all">جميع الأنواع</option>
                    <option value="system">قوالب النظام</option>
                    <option value="custom">قوالب مخصصة</option>
                </select>
            </div>
        </div>

        <div class="mt-6 flex justify-center">
            <button wire:click="clearFilters" 
                    class="btn bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-semibold px-6 py-2 rounded-xl">
                🗑️ مسح الفلاتر
            </button>
        </div>
    </div>

    <!-- Templates List -->
    <div class="glass rounded-3xl overflow-hidden shadow-2xl animate-slide-up delay-300">
        <!-- Table Header -->
        <div class="px-6 py-4 bg-white/20 dark:bg-gray-800/20 border-b border-white/20 dark:border-gray-700/30">
            <div class="flex justify-between items-center">
                <h3 class="text-xl font-bold text-gray-900 dark:text-white">
                    📧 القوالب ({{ $templates->total() }})
                </h3>
                <button wire:click="exportTemplates" 
                        class="btn bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium px-4 py-2 rounded-xl">
                    📥 تصدير
                </button>
            </div>
        </div>

        <!-- Table -->
        <div class="overflow-x-auto">
            <table class="min-w-full">
                <thead class="bg-white/10 dark:bg-gray-800/20">
                    <tr>
                        <th class="px-6 py-4 text-right text-sm font-bold text-gray-700 dark:text-gray-300">
                            القالب
                        </th>
                        <th class="px-6 py-4 text-right text-sm font-bold text-gray-700 dark:text-gray-300">
                            الفئة
                        </th>
                        <th class="px-6 py-4 text-right text-sm font-bold text-gray-700 dark:text-gray-300">
                            اللغة
                        </th>
                        <th class="px-6 py-4 text-right text-sm font-bold text-gray-700 dark:text-gray-300">
                            الحالة
                        </th>
                        <th class="px-6 py-4 text-right text-sm font-bold text-gray-700 dark:text-gray-300">
                            الإحصائيات
                        </th>
                        <th class="px-6 py-4 text-right text-sm font-bold text-gray-700 dark:text-gray-300">
                            الإجراءات
                        </th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-white/10 dark:divide-gray-700/30">
                    @forelse($templates as $template)
                    <tr class="hover:bg-white/10 dark:hover:bg-gray-800/20 transition-colors duration-200">
                        <!-- Template Info -->
                        <td class="px-6 py-4">
                            <div class="flex items-center">
                                <div class="w-12 h-12 rounded-2xl flex items-center justify-center mr-3 shadow-lg
                                    @if($template->is_system) bg-gradient-to-r from-purple-500 to-purple-600 @else bg-gradient-to-r from-blue-500 to-blue-600 @endif">
                                    <span class="text-white text-lg">
                                        @if($template->is_system) 🛠️ @else 👤 @endif
                                    </span>
                                </div>
                                <div>
                                    <p class="text-sm font-semibold text-gray-900 dark:text-white">{{ $template->name }}</p>
                                    <p class="text-xs text-gray-500 dark:text-gray-400">{{ $template->key }}</p>
                                    @if($template->description)
                                    <p class="text-xs text-gray-400 dark:text-gray-500 mt-1">{{ Str::limit($template->description, 50) }}</p>
                                    @endif
                                </div>
                            </div>
                        </td>

                        <!-- Category -->
                        <td class="px-6 py-4 whitespace-nowrap">
                            <span class="inline-flex items-center px-3 py-1 rounded-2xl text-sm font-semibold shadow-lg bg-gradient-to-r from-gray-500 to-gray-600 text-white">
                                {{ $categories[$template->category] ?? $template->category }}
                            </span>
                        </td>

                        <!-- Locale -->
                        <td class="px-6 py-4 whitespace-nowrap">
                            <span class="text-sm font-medium text-gray-900 dark:text-white">{{ $locales[$template->locale] ?? $template->locale }}</span>
                        </td>

                        <!-- Status -->
                        <td class="px-6 py-4 whitespace-nowrap">
                            <button wire:click="toggleStatus({{ $template->id }})"
                                    class="inline-flex items-center px-3 py-1 rounded-2xl text-sm font-semibold shadow-lg transition-all duration-300 transform hover:scale-105
                                    @if($template->is_active) bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 @else bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 @endif">
                                @if($template->is_active) ✅ نشط @else ❌ غير نشط @endif
                            </button>
                        </td>

                        <!-- Statistics -->
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="backdrop-blur-md bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl p-3 border border-white/20">
                                <p class="text-sm font-semibold text-gray-900 dark:text-white">📧 {{ number_format($template->sent_count) }} مرسل</p>
                                @if($template->last_sent_at)
                                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">آخر إرسال: {{ $template->last_sent_at->diffForHumans() }}</p>
                                @endif
                            </div>
                        </td>

                        <!-- Actions -->
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="flex items-center space-x-2 space-x-reverse">
                                <!-- Preview -->
                                <a href="{{ route('admin.email-templates.preview', $template) }}" 
                                   class="w-8 h-8 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-lg" 
                                   title="معاينة">
                                    👁️
                                </a>

                                <!-- Edit -->
                                <a href="{{ route('admin.email-templates.edit', $template) }}" 
                                   class="w-8 h-8 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-lg" 
                                   title="تحرير">
                                    ✏️
                                </a>

                                <!-- Test Email -->
                                <button wire:click="confirmTestEmail({{ $template->id }})" 
                                        class="w-8 h-8 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-lg" 
                                        title="اختبار الإرسال">
                                    🧪
                                </button>

                                <!-- Duplicate -->
                                <button wire:click="confirmDuplicate({{ $template->id }})" 
                                        class="w-8 h-8 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-lg" 
                                        title="نسخ">
                                    📋
                                </button>

                                <!-- Delete (only for custom templates) -->
                                @if(!$template->is_system)
                                <button wire:click="confirmDelete({{ $template->id }})" 
                                        class="w-8 h-8 rounded-xl bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-lg" 
                                        title="حذف">
                                    🗑️
                                </button>
                                @endif
                            </div>
                        </td>
                    </tr>
                    @empty
                    <tr>
                        <td colspan="6" class="px-6 py-16 text-center">
                            <div class="max-w-md mx-auto">
                                <div class="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl">
                                    <span class="text-white text-4xl">📧</span>
                                </div>
                                <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">لا توجد قوالب</h3>
                                <p class="text-gray-500 dark:text-gray-400 mb-6">لم يتم العثور على قوالب تطابق معايير البحث</p>
                                <a href="{{ route('admin.email-templates.create') }}" 
                                   class="btn bg-gradient-to-r from-green-500 via-blue-500 to-purple-600 hover:from-green-600 hover:via-blue-600 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300">
                                    إنشاء أول قالب
                                </a>
                            </div>
                        </td>
                    </tr>
                    @endforelse
                </tbody>
            </table>
        </div>

        <!-- Pagination -->
        @if($templates->hasPages())
        <div class="mt-6 flex justify-center">
            <div class="glass border border-white/20 dark:border-gray-700/30 shadow-2xl rounded-2xl p-4">
                {{ $templates->links() }}
            </div>
        </div>
        @endif
    </div>

    <!-- Delete Modal -->
    @if($showDeleteModal)
    <div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
        <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div class="mt-3 text-center">
                <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                    <span class="text-red-600 text-xl">🗑️</span>
                </div>
                <h3 class="text-lg font-medium text-gray-900 mt-4">حذف القالب</h3>
                <div class="mt-2 px-7 py-3">
                    <p class="text-sm text-gray-500">
                        هل أنت متأكد من حذف القالب "{{ $templateToDelete?->name }}"؟<br>
                        هذا الإجراء لا يمكن التراجع عنه.
                    </p>
                </div>
                <div class="items-center px-4 py-3 flex justify-center space-x-4 space-x-reverse">
                    <button wire:click="deleteTemplate" 
                            class="px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-red-700">
                        حذف
                    </button>
                    <button wire:click="closeDeleteModal" 
                            class="px-4 py-2 bg-gray-300 text-gray-800 text-base font-medium rounded-md shadow-sm hover:bg-gray-400">
                        إلغاء
                    </button>
                </div>
            </div>
        </div>
    </div>
    @endif

    <!-- Duplicate Modal -->
    @if($showDuplicateModal)
    <div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
        <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div class="mt-3">
                <h3 class="text-lg font-medium text-gray-900 text-center mb-4">📋 نسخ القالب</h3>
                <div class="mt-2 px-4 py-3">
                    <label for="duplicateKey" class="block text-sm font-medium text-gray-700 mb-2">
                        مفتاح القالب الجديد
                    </label>
                    <input type="text" 
                           wire:model="duplicateKey" 
                           class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                           placeholder="template_key_copy">
                </div>
                <div class="items-center px-4 py-3 flex justify-center space-x-4 space-x-reverse">
                    <button wire:click="duplicateTemplate" 
                            class="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-green-700">
                        نسخ
                    </button>
                    <button wire:click="closeDuplicateModal" 
                            class="px-4 py-2 bg-gray-300 text-gray-800 text-base font-medium rounded-md shadow-sm hover:bg-gray-400">
                        إلغاء
                    </button>
                </div>
            </div>
        </div>
    </div>
    @endif

    <!-- Test Email Modal -->
    @if($showTestEmailModal)
    <div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
        <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div class="mt-3">
                <h3 class="text-lg font-medium text-gray-900 text-center mb-4">🧪 اختبار الإرسال</h3>
                <div class="mt-2 px-4 py-3">
                    <label for="testEmail" class="block text-sm font-medium text-gray-700 mb-2">
                        البريد الإلكتروني للاختبار
                    </label>
                    <input type="email" 
                           wire:model="testEmail" 
                           class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                           placeholder="test@example.com">
                    @error('testEmail') 
                    <span class="text-red-500 text-sm">{{ $message }}</span> 
                    @enderror
                </div>
                <div class="items-center px-4 py-3 flex justify-center space-x-4 space-x-reverse">
                    <button wire:click="sendTestEmail" 
                            class="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-blue-700">
                        إرسال
                    </button>
                    <button wire:click="closeTestEmailModal" 
                            class="px-4 py-2 bg-gray-300 text-gray-800 text-base font-medium rounded-md shadow-sm hover:bg-gray-400">
                        إلغاء
                    </button>
                </div>
            </div>
        </div>
    </div>
    @endif
</div>
