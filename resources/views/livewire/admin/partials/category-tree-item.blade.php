{{-- resources/views/livewire/admin/partials/category-tree-item.blade.php --}}

<div class="category-tree-item">
    <div class="flex items-center py-2 px-3 rounded-lg hover:bg-white/60 dark:hover:bg-gray-700/60 transition-colors cursor-pointer group"
        style="margin-inline-start: {{ $level * 20 }}px" wire:click="selectCategory({{ $category->id }})">
        <!-- Expand/Collapse Arrow -->
        @if ($category->children->count() > 0)
            <button wire:click.stop="toggleExpanded({{ $category->id }})"
                class="me-2 p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400 transform transition-transform {{ in_array($category->id, $expandedCategories) ? 'rotate-90' : '' }}"
                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
            </button>
        @else
            <div class="w-6 h-6 me-2"></div>
        @endif

        <!-- Category Icon -->
        <div class="me-3">
            @if ($category->children->count() > 0)
                <svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 01-2-2V7z"></path>
                </svg>
            @else
                <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
                    </path>
                </svg>
            @endif
        </div>

        <!-- Category Name -->
        <div class="flex-1 min-w-0">
            <div class="flex items-center">
                <span
                    class="text-sm font-medium text-gray-900 dark:text-white truncate {{ $selectedCategory && $selectedCategory->id === $category->id ? 'text-blue-600 dark:text-blue-400' : '' }}">
                    {{ $category->name }}
                </span>

                <!-- Category Type Badge -->
                @if ($category->categoryType)
                    <span
                        class="ms-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                        {{ $category->categoryType->name }}
                    </span>
                @endif

                <!-- Active Status -->
                @if (!$category->is_active)
                    <span
                        class="ms-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200">
                        Inactive
                    </span>
                @endif
            </div>

            <!-- Children Count -->
            @if ($category->children->count() > 0)
                <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {{ $category->children->count() }} {{ $category->children->count() === 1 ? 'child' : 'children' }}
                </div>
            @endif
        </div>

        <!-- Quick Actions (Show on Hover) -->
        <div class="opacity-0 group-hover:opacity-100 transition-opacity flex items-center ms-2">
            <button wire:click.stop="editCategory({{ $category->id }})"
                class="p-1 rounded text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                title="Edit">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z">
                    </path>
                </svg>
            </button>

            <button wire:click.stop="deleteCategory({{ $category->id }})"
                wire:confirm="Are you sure you want to delete this category?"
                class="p-1 rounded text-red-500 hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors ms-1"
                title="Delete">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                    </path>
                </svg>
            </button>
        </div>
    </div>

    <!-- Children (if expanded) -->
    @if (in_array($category->id, $expandedCategories) && $category->children->count() > 0)
        <div class="children">
            @foreach ($category->children as $child)
                @include('livewire.admin.partials.category-tree-item', [
                    'category' => $child,
                    'level' => $level + 1,
                ])
            @endforeach
        </div>
    @endif

</div>
