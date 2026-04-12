{{-- resources/views/components/teacher-category-selector.blade.php --}}
@props(['category', 'level' => 0])

<div class="category-item">
    <!-- Main Category Row -->
    <div class="flex items-center py-2 px-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer group"
        style="margin-inline-start: {{ $level * 20 }}px" wire:click="toggleCategorySelection({{ $category->id }})">

        <!-- Expand/Collapse Button -->
        @if ($category->children->count() > 0)
            <button type="button" wire:click.stop="toggleCategoryExpansion({{ $category->id }})"
                class="flex-shrink-0 w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 me-2">
                <x-heroicon-o-chevron-right
                    class="w-4 h-4 transition-transform duration-200 {{ in_array($category->id, $expandedCategories) ? 'rotate-90' : '' }}" />
            </button>
        @else
            <div class="w-6 h-6 me-2"></div>
        @endif

        <!-- Checkbox -->
        <div class="flex-shrink-0 me-3">
            <div
                class="w-5 h-5 border-2 rounded-md flex items-center justify-center transition-colors
                        {{ isset($selectedCategories[$category->id])
                            ? 'bg-blue-500 border-blue-500'
                            : 'border-gray-300 dark:border-gray-600 hover:border-blue-400' }}">
                @if (isset($selectedCategories[$category->id]))
                    <x-heroicon-o-check class="w-3 h-3 text-white" />
                @endif
            </div>
        </div>

        <!-- Category Icon -->
        @if ($category->icon)
            <span class="flex-shrink-0 text-lg me-2">{{ $category->icon }}</span>
        @endif

        <!-- Category Name with Search Highlighting -->
        <div class="flex-1 min-w-0">
            <div
                class="text-sm font-medium text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors
                        {{ isset($selectedCategories[$category->id]) ? 'text-blue-600 dark:text-blue-400' : '' }}">
                {!! $this->highlightSearchTerm($category->name, $categorySearchTerm ?? '') !!}
            </div>

            @if ($category->description)
                <div class="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">
                    {{ $category->description }}
                </div>
            @endif
        </div>

        <!-- Children Count Badge -->
        @if ($category->children->count() > 0)
            <div class="flex-shrink-0 ms-2">
                <span
                    class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
                             {{ isset($selectedCategories[$category->id])
                                 ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                                 : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300' }}">
                    {{ $category->children->count() }}
                </span>
            </div>
        @endif
    </div>

    <!-- Children (Recursive) -->
    @if ($category->children->count() > 0 && in_array($category->id, $expandedCategories))
        <div class="mt-1 space-y-1">
            @foreach ($category->children->where('is_active', true)->sortBy('sort_order') as $child)
                @include('components.teacher-category-selector', [
                    'category' => $child,
                    'level' => $level + 1,
                ])
            @endforeach
        </div>
    @endif
</div>
