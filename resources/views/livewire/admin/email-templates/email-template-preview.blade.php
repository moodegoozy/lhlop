<div>
    <!-- Page Header -->
    <div class="mb-8 animate-fade-in">
        <div class="text-center">
            <h1 class="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                👁️ معاينة القالب
            </h1>
            <p class="text-lg text-gray-600 dark:text-gray-300">
                معاينة قالب "{{ $template->name }}" مع بيانات تجريبية
            </p>
        </div>
        
        <div class="flex justify-center mt-6 space-x-4 space-x-reverse">
            <a href="{{ route('admin.email-templates.edit', $template) }}" 
               class="btn bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white font-semibold px-6 py-3 rounded-xl">
                ✏️ تحرير
            </a>
            <a href="{{ route('admin.email-templates.index') }}" 
               class="btn bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-semibold px-6 py-3 rounded-xl">
                📋 العودة للقائمة
            </a>
        </div>
    </div>

    <!-- Template Info -->
    <div class="glass rounded-3xl p-6 mb-8 animate-slide-up">
        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">📋 معلومات القالب</h3>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div class="text-center">
                <div class="w-12 h-12 mx-auto mb-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center">
                    <span class="text-white text-lg">📝</span>
                </div>
                <h4 class="text-sm font-semibold text-gray-600 dark:text-gray-400">اسم القالب</h4>
                <p class="mt-1 text-sm font-bold text-gray-900 dark:text-white">{{ $template->name }}</p>
            </div>
            <div class="text-center">
                <div class="w-12 h-12 mx-auto mb-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center">
                    <span class="text-white text-lg">🔑</span>
                </div>
                <h4 class="text-sm font-semibold text-gray-600 dark:text-gray-400">المفتاح</h4>
                <p class="mt-1 text-xs font-mono font-bold text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">{{ $template->key }}</p>
            </div>
            <div class="text-center">
                <div class="w-12 h-12 mx-auto mb-3 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center">
                    <span class="text-white text-lg">📂</span>
                </div>
                <h4 class="text-sm font-semibold text-gray-600 dark:text-gray-400">الفئة</h4>
                <p class="mt-1 text-sm font-bold text-gray-900 dark:text-white">{{ $template->category }}</p>
            </div>
            <div class="text-center">
                <div class="w-12 h-12 mx-auto mb-3 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center">
                    <span class="text-white text-lg">🌐</span>
                </div>
                <h4 class="text-sm font-semibold text-gray-600 dark:text-gray-400">اللغة</h4>
                <p class="mt-1 text-sm font-bold text-gray-900 dark:text-white">{{ $template->locale }}</p>
            </div>
        </div>
    </div>

    @if($previewData)
    <!-- Email Preview -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- HTML Preview -->
        <div class="glass rounded-3xl overflow-hidden shadow-2xl animate-slide-up">
            <div class="px-6 py-4 bg-white/20 dark:bg-gray-800/20 border-b border-white/20 dark:border-gray-700/30">
                <h3 class="text-xl font-bold text-gray-900 dark:text-white text-center">🌐 معاينة HTML</h3>
            </div>
            <div class="p-6">
                <div class="backdrop-blur-md bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl p-4 border border-white/20 dark:border-gray-700/30 mb-4">
                    <p class="text-sm font-semibold text-gray-900 dark:text-white mb-2">📧 الموضوع: {{ $previewData['subject'] ?? '' }}</p>
                    @if($previewData['preheader'] ?? '')
                    <p class="text-xs text-gray-600 dark:text-gray-400">💬 المعاينة: {{ $previewData['preheader'] }}</p>
                    @endif
                </div>
                <div class="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border border-white/30 dark:border-gray-700/30 rounded-2xl p-4 shadow-2xl" style="height: 600px; overflow-y: auto;">
                    {!! $previewData['html_content'] ?? '<p class="text-gray-500">لا يوجد محتوى HTML</p>' !!}
                </div>
            </div>
        </div>

        <!-- Text Preview -->
        <div class="glass rounded-3xl overflow-hidden shadow-2xl animate-slide-up delay-100">
            <div class="px-6 py-4 bg-white/20 dark:bg-gray-800/20 border-b border-white/20 dark:border-gray-700/30">
                <h3 class="text-xl font-bold text-gray-900 dark:text-white text-center">📝 معاينة النص</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400 text-center mt-1">النسخة النصية للبريد الإلكتروني</p>
            </div>
            <div class="p-6">
                <div class="backdrop-blur-xl bg-gray-50/80 dark:bg-gray-800/80 border border-white/30 dark:border-gray-700/30 rounded-2xl p-4 shadow-2xl" style="height: 600px; overflow-y: auto;">
                    <pre class="text-sm text-gray-900 dark:text-white whitespace-pre-wrap font-mono">{{ $previewData['text_content'] ?? 'لا توجد نسخة نصية' }}</pre>
                </div>
            </div>
        </div>
    </div>

    <!-- Test Email Section -->
    <div class="mt-8 glass rounded-3xl p-6 animate-slide-up delay-200">
        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">🧪 اختبار الإرسال</h3>
        <div class="flex items-center space-x-4 space-x-reverse">
            <input type="email" 
                   x-data="{ email: '' }"
                   x-model="email"
                   placeholder="أدخل بريد إلكتروني للاختبار..." 
                   class="form-input flex-1">
            <button @click="if($event.target.previousElementSibling.value) { $wire.sendTestEmail($event.target.previousElementSibling.value) }" 
                    class="btn bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-xl">
                📧 إرسال اختبار
            </button>
        </div>
        <p class="text-xs text-gray-500 dark:text-gray-400 mt-3 text-center">سيتم إرسال البريد مع البيانات التجريبية المعروضة أعلاه</p>
    </div>

    @else
    <!-- Error State -->
    <div class="glass rounded-3xl p-8 animate-slide-up border border-red-200/30 dark:border-red-800/30">
        <div class="max-w-md mx-auto text-center">
            <div class="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center shadow-2xl">
                <span class="text-white text-4xl">⚠️</span>
            </div>
            <h3 class="text-xl font-semibold text-red-800 dark:text-red-300 mb-2">خطأ في معاينة القالب</h3>
            <p class="text-red-700 dark:text-red-400">لا يمكن عرض معاينة للقالب. تأكد من صحة محتوى القالب وصيغة المتغيرات.</p>
        </div>
    </div>
    @endif

    <!-- Template Statistics -->
    <div class="mt-8 glass rounded-3xl p-6 animate-slide-up delay-300">
        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">📊 إحصائيات القالب</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="text-center">
                <div class="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <span class="text-white text-2xl">📧</span>
                </div>
                <div class="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{{ number_format($template->sent_count) }}</div>
                <div class="text-sm font-medium text-gray-600 dark:text-gray-400">عدد المرات المرسلة</div>
            </div>
            <div class="text-center">
                <div class="w-16 h-16 mx-auto mb-4 bg-gradient-to-r {{ $template->is_active ? 'from-green-500 to-green-600' : 'from-red-500 to-red-600' }} rounded-2xl flex items-center justify-center shadow-lg">
                    <span class="text-white text-2xl">{{ $template->is_active ? '✅' : '❌' }}</span>
                </div>
                <div class="text-xl font-semibold {{ $template->is_active ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400' }}">
                    {{ $template->is_active ? 'نشط' : 'غير نشط' }}
                </div>
                <div class="text-sm text-gray-600">حالة القالب</div>
            </div>
            <div class="text-center">
                <div class="text-lg font-semibold text-gray-600">
                    {{ $template->last_sent_at ? $template->last_sent_at->diffForHumans() : 'لم يتم الإرسال بعد' }}
                </div>
                <div class="text-sm text-gray-600">آخر إرسال</div>
            </div>
        </div>
    </div>
</div>
