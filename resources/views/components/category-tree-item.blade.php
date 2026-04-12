@props(['category', 'level'])

<div class="category-tree-item">
    <div class="flex items-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150 cursor-pointer py-2 px-2 rounded-lg"
        style="{{ app()->getLocale() === 'ar' ? 'padding-right' : 'padding-left' }}: {{ $level * 1.2 + 0.5 }}rem;"
        wire:click="selectCategory({{ $category->id }})">

        <!-- Expand/Collapse Arrow (only if has children) -->
        @if ($category->children->count() > 0)
            <button type="button" wire:click.stop="toggleCategoryExpansion({{ $category->id }})"
                class="flex-shrink-0 w-5 h-5 flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 {{ app()->getLocale() === 'ar' ? 'ml-2' : 'mr-2' }}">
                <svg class="w-4 h-4 transition-transform duration-200 {{ in_array($category->id, $expandedCategories ?? []) ? 'rotate-90' : '' }} {{ app()->getLocale() === 'ar' ? 'rotate-180' : '' }}"
                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
            </button>
        @else
            <div class="w-5 h-5 {{ app()->getLocale() === 'ar' ? 'ml-2' : 'mr-2' }}"></div>
        @endif

        <!-- Category Name -->
        <div class="flex-1 min-w-0">
            <div
                class="text-sm font-medium text-gray-900 dark:text-gray-100 truncate 
                        {{ isset($selectedCategory) && $selectedCategory->id === $category->id ? 'text-blue-600 dark:text-blue-400' : '' }}">
                {!! $this->highlightSearchTerm($category->name, $treeSearch ?? '') !!}
            </div>
        </div>
    </div>

    <!-- Children -->
    @if ($category->children->count() > 0 && in_array($category->id, $expandedCategories ?? []))
        <div class="mt-1">
            @foreach ($category->children->where('is_active', true)->sortBy('sort_order') as $child)
                @include('livewire.admin.partials.category-tree-item', [
                    'category' => $child,
                    'level' => $level + 1,
                ])
            @endforeach
        </div>
    @endif
</div>
