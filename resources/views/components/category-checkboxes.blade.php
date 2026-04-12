@props([
    'categoryType',
    'categories',
    'selected' => [],
    'name' => 'categories',
    'label' => null,
    'childCallback' => null,
])

@php
    $selected = is_array($selected) ? $selected : ($selected ? [$selected] : []);
    $componentId = 'category-checkboxes-' . $categoryType->slug . '-' . uniqid();
    $showSearch = $categoryType->shouldShowSearch() || $categories->count() > 10;
@endphp

<div class="category-checkboxes-container" 
     x-data="categoryCheckboxes({
         selected: {{ json_encode($selected) }},
         componentId: '{{ $componentId }}',
         name: '{{ $name }}',
         categoryTypeSlug: '{{ $categoryType->slug }}',
         childCallback: {{ $childCallback ? $childCallback : 'null' }}
     })"
     x-init="updateHiddenInputs()">

    @if($label)
        <label class="form-label">
            @if($categoryType->icon)
                <span class="me-2">{{ $categoryType->icon }}</span>
            @endif
            {{ $label }}
        </label>
    @endif

    <!-- Search box -->
    @if($showSearch)
        <div class="mb-4">
            <div class="relative">
                <input type="text" 
                       x-model="searchTerm"
                       @input="filterCategories"
                       placeholder="{{ $categoryType->display_settings['search_placeholder'] ?? __('search_placeholder') }}"
                       class="form-input pe-10">
                <div class="absolute inset-y-0 end-3 flex items-center pointer-events-none">
                    <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                </div>
            </div>
        </div>
    @endif

    <!-- Hidden inputs container -->
    <div id="{{ $componentId }}-inputs"></div>

    <!-- Checkboxes container -->
    <div class="checkboxes-grid max-h-80 overflow-y-auto border border-gray-200/60 dark:border-gray-600/60 rounded-2xl p-4 bg-white/50 dark:bg-gray-800/50">
        @foreach($categories as $category)
            @include('components.category-checkbox-item', [
                'category' => $category,
                'selected' => $selected,
                'componentId' => $componentId,
                'depth' => 0
            ])
        @endforeach
    </div>

    <!-- Selected count -->
    <div x-show="selected.length > 0" x-transition class="mt-3">
        <div class="text-sm text-gray-600 dark:text-gray-400">
            تم اختيار <span x-text="selected.length" class="font-semibold text-blue-600 dark:text-blue-400"></span> 
            {{ $categoryType->allowsMultipleSelection() ? 'عنصر' : 'عنصر واحد' }}
        </div>
    </div>

    <!-- Clear all button -->
    <div x-show="selected.length > 0" x-transition class="mt-3">
        <button type="button" 
                @click="clearAll()"
                class="text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors">
            مسح جميع الاختيارات
        </button>
    </div>
</div>

<style>
.checkboxes-grid {
    display: grid;
    gap: 0.5rem;
}

.checkbox-item {
    @apply flex items-start space-x-3 space-x-reverse p-3 rounded-xl hover:bg-white/60 dark:hover:bg-gray-700/60 transition-colors cursor-pointer;
}

.checkbox-item input[type="checkbox"] {
    @apply mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2;
}

.checkbox-item.depth-1 { padding-right: 2rem; }
.checkbox-item.depth-2 { padding-right: 3rem; }
.checkbox-item.depth-3 { padding-right: 4rem; }
.checkbox-item.depth-4 { padding-right: 5rem; }

.checkbox-item.selected {
    @apply bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800;
}

.category-name {
    @apply text-sm font-medium text-gray-900 dark:text-white;
}

.category-description {
    @apply text-xs text-gray-600 dark:text-gray-400 mt-1;
}

.category-path {
    @apply text-xs text-gray-500 dark:text-gray-500 mt-1 italic;
}

.hidden-category {
    display: none !important;
}
</style>

<script>
function categoryCheckboxes(config) {
    return {
        selected: config.selected,
        componentId: config.componentId,
        name: config.name,
        categoryTypeSlug: config.categoryTypeSlug,
        childCallback: config.childCallback,
        searchTerm: '',
        
        toggle(categoryId) {
            if (this.selected.includes(categoryId)) {
                this.selected = this.selected.filter(id => id !== categoryId);
            } else {
                this.selected.push(categoryId);
            }
            
            this.updateHiddenInputs();
            this.triggerChange();
        },
        
        clearAll() {
            this.selected = [];
            // Uncheck all checkboxes
            document.querySelectorAll(`[data-component="${this.componentId}"] input[type="checkbox"]`).forEach(cb => {
                cb.checked = false;
            });
            this.updateHiddenInputs();
            this.triggerChange();
        },
        
        filterCategories() {
            const term = this.searchTerm.toLowerCase();
            const items = document.querySelectorAll(`[data-component="${this.componentId}"] .checkbox-item`);
            
            items.forEach(item => {
                const text = item.textContent.toLowerCase();
                const shouldShow = !term || text.includes(term);
                
                if (shouldShow) {
                    item.classList.remove('hidden-category');
                } else {
                    item.classList.add('hidden-category');
                }
            });
        },
        
        updateHiddenInputs() {
            const container = document.getElementById(this.componentId + '-inputs');
            container.innerHTML = '';
            
            this.selected.forEach(id => {
                const input = document.createElement('input');
                input.type = 'hidden';
                input.name = this.name + '[]';
                input.value = id;
                container.appendChild(input);
            });
        },
        
        triggerChange() {
            if (typeof window.categoryChanged === 'function') {
                window.categoryChanged(this.categoryTypeSlug, this.selected);
            }
            
            if (this.childCallback) {
                this.childCallback(this.selected);
            }
        }
    }
}
</script> 