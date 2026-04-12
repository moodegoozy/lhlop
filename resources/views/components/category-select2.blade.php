@props([
    'categoryType',
    'categories',
    'selected' => [],
    'name' => 'categories',
    'label' => null,
    'placeholder' => null,
    'childCallback' => null,
])

@php
    $selected = is_array($selected) ? $selected : ($selected ? [$selected] : []);
    $componentId = 'category-select2-' . $categoryType->slug . '-' . uniqid();
    $allowMultiple = $categoryType->allowsMultipleSelection();
    $placeholder = $placeholder ?? $categoryType->display_settings['search_placeholder'] ?? __('search_placeholder');
@endphp

<div class="category-select2-container" 
     x-data="categorySelect2({
         selected: {{ json_encode($selected) }},
         allowMultiple: {{ $allowMultiple ? 'true' : 'false' }},
         componentId: '{{ $componentId }}',
         name: '{{ $name }}',
         categoryTypeSlug: '{{ $categoryType->slug }}',
         childCallback: {{ $childCallback ? $childCallback : 'null' }}
     })"
     x-init="initSelect2()">

    @if($label)
        <label class="form-label" for="{{ $componentId }}">
            @if($categoryType->icon)
                <span class="me-2">{{ $categoryType->icon }}</span>
            @endif
            {{ $label }}
        </label>
    @endif

    <!-- Hidden inputs container -->
    <div id="{{ $componentId }}-inputs"></div>

    <!-- Select2 Dropdown -->
    <div class="relative">
        <select id="{{ $componentId }}" 
                class="category-select2"
                {{ $allowMultiple ? 'multiple' : '' }}
                data-placeholder="{{ $placeholder }}"
                style="width: 100%;">
            
            @if(!$allowMultiple)
                <option value="">{{ $placeholder }}</option>
            @endif
            
            @foreach($categories as $category)
                @include('components.category-select2-option', [
                    'category' => $category,
                    'selected' => $selected,
                    'depth' => 0
                ])
            @endforeach
        </select>
    </div>

    <!-- Selected items display (for better UX) -->
    <div x-show="selected.length > 0" x-transition class="selected-categories mt-3">
        <div class="flex flex-wrap gap-2">
            <template x-for="categoryId in selected" :key="categoryId">
                <div class="selected-category-tag">
                    <span x-text="getCategoryName(categoryId)"></span>
                    <button type="button" 
                            @click="removeSelection(categoryId)"
                            class="remove-btn">
                        ×
                    </button>
                </div>
            </template>
        </div>
    </div>
</div>

<style>
.category-select2 {
    width: 100% !important;
}

.select2-container {
    width: 100% !important;
}

.select2-container--default .select2-selection--single,
.select2-container--default .select2-selection--multiple {
    border: 2px solid rgb(229 231 235 / 0.6);
    border-radius: 0.75rem;
    padding: 0.75rem;
    background-color: rgb(255 255 255 / 0.8);
    backdrop-filter: blur(8px);
    min-height: 3rem;
    transition: all 0.3s ease;
}

.select2-container--default.select2-container--focus .select2-selection--single,
.select2-container--default.select2-container--focus .select2-selection--multiple {
    border-color: rgb(59 130 246);
    box-shadow: 0 0 0 4px rgb(59 130 246 / 0.2);
}

.select2-dropdown {
    border: 2px solid rgb(229 231 235 / 0.6);
    border-radius: 0.75rem;
    background-color: rgb(255 255 255 / 0.95);
    backdrop-filter: blur(8px);
    box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
}

.select2-container--default .select2-results__option {
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    margin: 0.25rem;
    transition: all 0.2s ease;
}

.select2-container--default .select2-results__option--highlighted[aria-selected] {
    background-color: rgb(59 130 246);
    color: white;
}

.selected-category-tag {
    @apply inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300;
}

.remove-btn {
    @apply ml-2 text-blue-600 hover:text-blue-800 font-bold text-lg leading-none;
}

.category-option-depth-1 { padding-left: 2rem !important; }
.category-option-depth-2 { padding-left: 3rem !important; }
.category-option-depth-3 { padding-left: 4rem !important; }
.category-option-depth-4 { padding-left: 5rem !important; }

@media (prefers-color-scheme: dark) {
    .select2-container--default .select2-selection--single,
    .select2-container--default .select2-selection--multiple {
        background-color: rgb(31 41 55 / 0.8);
        border-color: rgb(75 85 99 / 0.6);
        color: white;
    }
    
    .select2-dropdown {
        background-color: rgb(31 41 55 / 0.95);
        border-color: rgb(75 85 99 / 0.6);
        color: white;
    }
}
</style>

<script>
function categorySelect2(config) {
    return {
        selected: config.selected,
        allowMultiple: config.allowMultiple,
        componentId: config.componentId,
        name: config.name,
        categoryTypeSlug: config.categoryTypeSlug,
        childCallback: config.childCallback,
        categoryNames: {},
        
        initSelect2() {
            // Wait for Alpine to be ready
            this.$nextTick(() => {
                // Store category names for display
                this.storeCategoryNames();
                
                // Initialize Select2
                const element = $('#' + this.componentId);
                
                element.select2({
                    placeholder: element.data('placeholder'),
                    allowClear: !this.allowMultiple,
                    multiple: this.allowMultiple,
                    width: '100%',
                    theme: 'default',
                    language: {
                        noResults: function() {
                            return 'لا توجد نتائج';
                        },
                        searching: function() {
                            return 'جاري البحث...';
                        }
                    }
                });
                
                // Set initial values
                element.val(this.selected).trigger('change.select2');
                
                // Handle selection changes
                element.on('change', (e) => {
                    const values = $(e.target).val();
                    this.selected = Array.isArray(values) ? values.map(v => parseInt(v)) : (values ? [parseInt(values)] : []);
                    this.updateHiddenInputs();
                    this.triggerChange();
                });
                
                this.updateHiddenInputs();
            });
        },
        
        storeCategoryNames() {
            // Store category names from the DOM for later use
            const select = document.getElementById(this.componentId);
            Array.from(select.options).forEach(option => {
                if (option.value) {
                    this.categoryNames[option.value] = option.textContent;
                }
            });
        },
        
        getCategoryName(categoryId) {
            return this.categoryNames[categoryId] || `Category ${categoryId}`;
        },
        
        removeSelection(categoryId) {
            this.selected = this.selected.filter(id => id !== categoryId);
            $('#' + this.componentId).val(this.selected).trigger('change.select2');
            this.updateHiddenInputs();
            this.triggerChange();
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