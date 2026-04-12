{{-- resources/views/livewire/admin/email-templates/email-template-editor.blade.php --}}
@section('page-title', $isEditing ? 'تحرير القالب' : 'إنشاء قالب جديد')
@section('breadcrumbs')
    <span>لوحة الإدارة</span> /
    <a href="{{ route('admin.email-templates.index') }}" class="text-blue-600 dark:text-blue-400">قوالب البريد</a> /
    <span class="text-gray-900 dark:text-white">{{ $isEditing ? 'تحرير' : 'إنشاء' }}</span>
@endsection

<div>
    <!-- Page Header -->
    <div class="mb-8 animate-fade-in">
        <div class="text-center">
            <h1
                class="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                @if ($isEditing)
                    ✏️ تحرير القالب
                @else
                    ➕ إنشاء قالب جديد
                @endif
            </h1>
            <p class="text-lg text-gray-600 dark:text-gray-300">
                @if ($isEditing)
                    تحرير قالب "{{ $template->name }}"
                @else
                    إنشاء قالب بريد إلكتروني جديد
                @endif
            </p>
        </div>

        <div class="flex justify-center mt-6 space-x-4 space-x-reverse">
            @if ($isEditing)
                <button wire:click="preview"
                    class="btn bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-xl">
                    👁️ معاينة
                </button>
            @endif
            <a href="{{ route('admin.email-templates.index') }}"
                class="btn bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-semibold px-6 py-3 rounded-xl">
                📋 العودة للقائمة
            </a>
        </div>
    </div>

    <!-- Form -->
    <form wire:submit="save">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Main Content -->
            <div class="lg:col-span-2 space-y-8">
                <!-- Basic Information -->
                <div class="glass rounded-3xl p-6 animate-slide-up">
                    <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">📝 معلومات أساسية</h3>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <!-- Key -->
                        <div>
                            <label for="key" class="form-label">
                                🔑 مفتاح القالب <span class="text-red-500">*</span>
                            </label>
                            <input type="text" wire:model="key" class="form-input" placeholder="template_key"
                                @if ($isEditing && $template->is_system) disabled @endif>
                            @error('key')
                                <span class="text-red-500 text-sm mt-1 block">{{ $message }}</span>
                            @enderror
                        </div>

                        <!-- Name -->
                        <div>
                            <label for="name" class="form-label">
                                💬 اسم القالب <span class="text-red-500">*</span>
                            </label>
                            <input type="text" wire:model="name" class="form-input" placeholder="اسم القالب">
                            @error('name')
                                <span class="text-red-500 text-sm mt-1 block">{{ $message }}</span>
                            @enderror
                        </div>

                        <!-- Category -->
                        <div>
                            <label for="category" class="form-label">
                                🗂️ الفئة <span class="text-red-500">*</span>
                            </label>
                            <select wire:model="category" class="form-input">
                                @foreach ($categories as $key => $name)
                                    <option value="{{ $key }}">{{ $name }}</option>
                                @endforeach
                            </select>
                            @error('category')
                                <span class="text-red-500 text-sm mt-1 block">{{ $message }}</span>
                            @enderror
                        </div>

                        <!-- Locale -->
                        <div>
                            <label for="locale" class="form-label">
                                🌍 اللغة <span class="text-red-500">*</span>
                            </label>
                            <select wire:model="locale" class="form-input">
                                @foreach ($locales as $key => $name)
                                    <option value="{{ $key }}">{{ $name }}</option>
                                @endforeach
                            </select>
                            @error('locale')
                                <span class="text-red-500 text-sm mt-1 block">{{ $message }}</span>
                            @enderror
                        </div>
                    </div>

                    <!-- Description -->
                    <div class="mt-6">
                        <label for="description" class="form-label">
                            📝 الوصف
                        </label>
                        <textarea wire:model="description" rows="3" class="form-input" placeholder="وصف مختصر للقالب..."></textarea>
                        @error('description')
                            <span class="text-red-500 text-sm mt-1 block">{{ $message }}</span>
                        @enderror
                    </div>
                </div>

                <!-- Email Content -->
                <div class="glass rounded-3xl p-6 animate-slide-up">
                    <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">📬 محتوى البريد
                        الإلكتروني</h3>

                    <!-- Subject -->
                    <div class="mb-6">
                        <label for="subject" class="form-label">
                            📧 موضوع البريد <span class="text-red-500">*</span>
                        </label>
                        <input type="text" wire:model="subject" class="form-input"
                            placeholder="موضوع البريد الإلكتروني...">
                        @error('subject')
                            <span class="text-red-500 text-sm mt-1 block">{{ $message }}</span>
                        @enderror
                    </div>

                    <!-- Preheader -->
                    <div class="mb-6">
                        <label for="preheader" class="form-label">
                            📄 نص المعاينة
                        </label>
                        <input type="text" wire:model="preheader" class="form-input"
                            placeholder="النص الذي يظهر في معاينة البريد...">
                        @error('preheader')
                            <span class="text-red-500 text-sm mt-1 block">{{ $message }}</span>
                        @enderror
                        <p class="text-xs text-gray-500 mt-1">هذا النص يظهر في معاينة البريد الإلكتروني في صندوق البريد
                        </p>
                    </div>

                    <!-- HTML Content -->
                    <div class="mb-6">
                        <label for="html_content" class="form-label">
                            📄 محتوى HTML <span class="text-red-500">*</span>
                        </label>
                        <textarea wire:model="html_content" rows="15" class="form-input font-mono text-sm"
                            placeholder="محتوى البريد الإلكتروني بصيغة HTML..."></textarea>
                        @error('html_content')
                            <span class="text-red-500 text-sm mt-1 block">{{ $message }}</span>
                        @enderror
                    </div>

                    <!-- Text Content -->
                    <div class="mb-6">
                        <label for="text_content" class="form-label">
                            📄 محتوى النص العادي
                        </label>
                        <textarea wire:model="text_content" rows="8" class="form-input"
                            placeholder="النسخة النصية من البريد الإلكتروني..."></textarea>
                        @error('text_content')
                            <span class="text-red-500 text-sm mt-1 block">{{ $message }}</span>
                        @enderror
                        <p class="text-xs text-gray-500 mt-1">نسخة احتياطية للعملاء الذين لا يدعمون HTML</p>
                    </div>
                </div>

                <!-- Sender Settings -->
                <div class="glass rounded-3xl p-6 animate-slide-up">
                    <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">👤 إعدادات المرسل</h3>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <!-- From Name -->
                        <div>
                            <label for="from_name" class="form-label">
                                👤 اسم المرسل
                            </label>
                            <input type="text" wire:model="from_name" class="form-input"
                                placeholder="اتركه فارغاً لاستخدام الافتراضي">
                            @error('from_name')
                                <span class="text-red-500 text-sm mt-1 block">{{ $message }}</span>
                            @enderror
                        </div>

                        <!-- From Email -->
                        <div>
                            <label for="from_email" class="form-label">
                                📧 بريد المرسل
                            </label>
                            <input type="email" wire:model="from_email" class="form-input"
                                placeholder="اتركه فارغاً لاستخدام الافتراضي">
                            @error('from_email')
                                <span class="text-red-500 text-sm mt-1 block">{{ $message }}</span>
                            @enderror
                        </div>
                    </div>

                    <!-- Active Status -->
                    <div class="mt-6">
                        <label class="flex items-center">
                            <input type="checkbox" wire:model="is_active" class="form-checkbox rounded">
                            <span class="mr-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                📍 القالب نشط
                            </span>
                        </label>
                        <p class="text-xs text-gray-500 mt-1">القوالب غير النشطة لن تُستخدم في الإرسال التلقائي</p>
                    </div>
                </div>

                <!-- Form Actions -->
                <div class="flex gap-4 justify-center">
                    <button type="submit"
                        class="btn bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold px-8 py-3 rounded-xl">
                        {{ $isEditing ? '💾 حفظ التغييرات' : '✨ إنشاء القالب' }}
                    </button>

                    <a href="{{ route('admin.email-templates.index') }}"
                        class="btn bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-semibold px-8 py-3 rounded-xl">
                        ❌ إلغاء
                    </a>
                </div>
            </div>

            <!-- Sidebar -->
            <div class="space-y-6">

                <!-- Template Variables Help -->
                <div class="glass rounded-3xl p-6 animate-slide-up">
                    <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">📖 مساعدة الصيغة</h3>

                    <div class="space-y-4 text-sm">
                        <div>
                            <h4 class="font-medium text-gray-700 dark:text-gray-200 mb-2">المتغيرات العامة:</h4>
                            <div class="space-y-1">
                                @foreach ($commonVariables as $var => $desc)
                                    <div class="flex justify-between">
                                        <code
                                            class="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-blue-600">
                                            &#123;&#123; {{ $var }} &#125;&#125;
                                        </code>
                                        <span class="text-xs text-gray-500">{{ $desc }}</span>
                                    </div>
                                @endforeach
                            </div>
                        </div>

                        <div>
                            <h4 class="font-medium text-gray-700 dark:text-gray-200 mb-2">متغيرات الحجز:</h4>
                            <div class="space-y-1">
                                @foreach ($bookingVariables as $var => $desc)
                                    <div class="flex justify-between">
                                        <code
                                            class="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-purple-600">
                                            &#123;&#123; {{ $var }} &#125;&#125;
                                        </code>
                                        <span class="text-xs text-gray-500">{{ $desc }}</span>
                                    </div>
                                @endforeach
                            </div>
                        </div>

                        <div>
                            <h4 class="font-medium text-gray-700 dark:text-gray-200 mb-2">الشروط:</h4>
                            <code
                                class="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md text-green-600 block">
                                &#123;&#123;#if condition&#125;&#125;...&#123;&#123;/if&#125;&#125;
                            </code>
                        </div>

                        <div>
                            <h4 class="font-medium text-gray-700 dark:text-gray-200 mb-2">التكرار:</h4>
                            <code
                                class="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md text-orange-600 block">
                                &#123;&#123;#each items&#125;&#125;...&#123;&#123;/each&#125;&#125;
                            </code>
                        </div>
                    </div>
                </div>

                <!-- Template Preview (if editing) -->
                @if ($isEditing)
                    <div class="glass rounded-3xl p-6 animate-slide-up">
                        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">📊 إحصائيات القالب
                        </h3>

                        <div class="space-y-4">
                            <div class="flex justify-between">
                                <span class="text-gray-600 dark:text-gray-400">آخر تحديث:</span>
                                <span class="font-medium">{{ $template->updated_at->diffForHumans() }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600 dark:text-gray-400">مرات الإرسال:</span>
                                <span class="font-medium">{{ $template->sent_count ?? 0 }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600 dark:text-gray-400">آخر إرسال:</span>
                                <span
                                    class="font-medium">{{ $template->last_sent_at ? $template->last_sent_at->diffForHumans() : 'لم يُرسل بعد' }}</span>
                            </div>
                        </div>
                    </div>
                @endif
            </div>
        </div>
    </form>
</div>
