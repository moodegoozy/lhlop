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
    $allowMultiple = $categoryType->allowsMultipleSelection();
    $componentId = 'category-buttons-' . $categoryType->slug;
@endphp

<div class="category-buttons-container" x-data="{
    selected: {{ json_encode($selected) }},
    allowMultiple: {{ $allowMultiple ? 'true' : 'false' }},
    
    toggle(categoryId) {
        if (this.allowMultiple) {
            if (this.selected.includes(categoryId)) {
                this.selected = this.selected.filter(id => id !== categoryId);
            } else {
                this.selected.push(categoryId);
            }
        } else {
            this.selected = this.selected.includes(categoryId) ? [] : [categoryId];
        }
        
        this.updateHiddenInputs();
        this.triggerChange();
    },
    
    updateHiddenInputs() {
        // Clear existing hidden inputs
        const container = document.getElementById('{{ $componentId }}-inputs');
        container.innerHTML = '';
        
        // Add new hidden inputs
        this.selected.forEach(id => {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = '{{ $name }}[]';
            input.value = id;
            container.appendChild(input);
        });
    },
    
    triggerChange() {
        // Trigger change event for Livewire or other listeners
        if (typeof window.categoryChanged === 'function') {
            window.categoryChanged('{{ $categoryType->slug }}', this.selected);
        }
        
        @if($childCallback)
            {{ $childCallback }}(this.selected);
        @endif
    }
}" x-init="updateHiddenInputs()">

    @if($label)
        <label class="form-label">
            @if($categoryType->icon)
                <span class="me-2">{{ $categoryType->icon }}</span>
            @endif
            {{ $label }}
        </label>
    @endif

    <!-- Hidden inputs container -->
    <div id="{{ $componentId }}-inputs"></div>

    <!-- Buttons container -->
    <div class="filter-slider mb-4">
        @if(!$categoryType->allowsMultipleSelection())
            <!-- "All" button for single selection -->
            <button type="button"
                    @click="selected = []; updateHiddenInputs(); triggerChange();"
                    :class="selected.length === 0 ? 'filter-button filter-button-blue' : 'filter-button filter-button-inactive'"
                    class="filter-button">
                الكل
            </button>
        @endif

        @foreach($categories as $category)
            <button type="button"
                    @click="toggle({{ $category->id }})"
                    :class="selected.includes({{ $category->id }}) ? 'filter-button filter-button-blue' : 'filter-button filter-button-inactive'"
                    class="filter-button animate-fade-in delay-{{ $loop->index }}00"
                    title="{{ $category->description ?? $category->name }}">
                
                @if($category->icon)
                    <span class="me-2">{{ $category->icon }}</span>
                @endif
                
                {{ $category->name }}
                
                @if($allowMultiple && $category->children()->count() > 0)
                    <span class="text-xs opacity-75 me-1">({{ $category->children()->count() }})</span>
                @endif
            </button>
        @endforeach
    </div>

    <!-- Children categories (if any category is selected) -->
    @if($categories->isNotEmpty())
        <div x-show="selected.length > 0" x-transition class="children-categories">
            @foreach($categories as $category)
                <div x-show="selected.includes({{ $category->id }})" x-transition>
                    @if($category->children()->count() > 0)
                        <div class="mt-4 p-4 bg-white/50 dark:bg-gray-800/50 rounded-2xl">
                            <h4 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                                {{ $category->name }} - اختر التفاصيل:
                            </h4>
                            
                            @php
                                $childCategoryType = $category->children()->first()?->categoryType;
                            @endphp
                            
                            @if($childCategoryType)
                                @include('components.' . $childCategoryType->getComponentName(), [
                                    'categoryType' => $childCategoryType,
                                    'categories' => $category->children,
                                    'selected' => [],
                                    'name' => $name . '_children',
                                    'childCallback' => $childCallback,
                                ])
                            @endif
                        </div>
                    @endif
                </div>
            @endforeach
        </div>
    @endif
</div>

<style>
.filter-slider {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    overflow-x: auto;
    padding: 0.5rem 0;
}

.filter-button {
    white-space: nowrap;
    flex-shrink: 0;
    min-width: fit-content;
}

.children-categories {
    margin-top: 1rem;
}

@media (max-width: 640px) {
    .filter-slider {
        gap: 0.25rem;
    }
    
    .filter-button {
        font-size: 0.875rem;
        padding: 0.5rem 0.75rem;
    }
}
</style> 