@section('page-title', 'إدارة التصنيفات')
@section('breadcrumbs')
    <span>لوحة الإدارة</span> / <span class="text-gray-900 dark:text-white">التصنيفات</span>
@endsection

<div>
    <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">📂 Category Management</h1>
        <p class="text-gray-600 dark:text-gray-400">Manage educational categories and hierarchies</p>
    </div>

    <!-- Success/Error Messages -->
    @if (session()->has('message'))
        <div class="alert alert-success mb-6">
            {{ session('message') }}
        </div>
    @endif

    @if (session()->has('error'))
        <div class="alert alert-error mb-6">
            {{ session('error') }}
        </div>
    @endif

    <!-- Add New Category Button (Top) -->
    <div class="mb-6">
        <button wire:click="openCreateModal"
            class="btn bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-4 sm:px-8 py-3 text-sm sm:text-lg font-semibold w-full sm:w-auto">
            <x-heroicon-o-plus class="w-5 h-5 sm:w-6 sm:h-6 me-2" />
            {{ __('add_a_new_category') }}
        </button>
    </div>

    <!-- Responsive Layout -->
    <div class="flex flex-col xl:grid xl:grid-cols-12 gap-6">
        <!-- Left Panel: Categories Tree -->
        <div class="xl:col-span-4 order-2 xl:order-1">
            <div class="glass rounded-3xl p-4 sm:p-6">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
                    <h2 class="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">Categories Tree</h2>
                    <!-- Search Filter for Tree -->
                    <div class="relative">
                        <input type="text" wire:model.live.debounce.300ms="treeSearch" placeholder="Search..."
                            class="form-input w-full sm:w-48 text-sm pe-10">
                        <x-heroicon-o-magnifying-glass class="w-4 h-4 absolute end-3 top-3 text-gray-400" />
                    </div>
                </div>

                <!-- Tree View Container -->
                <div class="overflow-y-auto pe-2 h-64 sm:h-80 lg:h-96 xl:h-[calc(100vh-400px)]">
                    <div class="space-y-1">
                        @forelse($categoriesTree as $category)
                            @include('livewire.admin.partials.category-tree-item', [
                                'category' => $category,
                                'level' => 0,
                            ])
                        @empty
                            <div class="text-center py-8 text-gray-500 dark:text-gray-400">
                                <x-heroicon-o-folder class="w-12 h-12 mx-auto mb-4 opacity-50" />
                                <p class="text-sm">No categories found</p>
                            </div>
                        @endforelse
                    </div>
                </div>
            </div>
        </div>

        <!-- Right Panel: Category Details -->
        <div class="xl:col-span-8 order-1 xl:order-2">
            <div class="glass rounded-3xl p-4 sm:p-6">
                @if ($selectedCategory)
                    <!-- Category Details Form -->
                    <div class="h-full flex flex-col">
                        <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
                            <h2 class="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                                {{ $editMode ? 'Edit Category' : 'Category Details' }}
                            </h2>
                            <div class="flex flex-wrap gap-2">
                                @if (!$editMode)
                                    <button wire:click="enterEditMode"
                                        class="btn bg-blue-500 hover:bg-blue-600 text-white px-3 sm:px-4 py-2 text-sm flex-1 sm:flex-none">
                                        <x-heroicon-o-pencil class="w-4 h-4 me-2" />
                                        <span class="hidden sm:inline">Edit</span>
                                    </button>
                                @else
                                    <button wire:click="cancelEdit"
                                        class="btn bg-gray-500 hover:bg-gray-600 text-white px-3 sm:px-4 py-2 text-sm flex-1 sm:flex-none">
                                        Cancel
                                    </button>
                                    <button wire:click="saveCategory"
                                        class="btn bg-green-500 hover:bg-green-600 text-white px-3 sm:px-4 py-2 text-sm flex-1 sm:flex-none">
                                        <x-heroicon-o-check class="w-4 h-4 me-2" />
                                        Save
                                    </button>
                                @endif

                                <button wire:click="deleteCategory"
                                    wire:confirm="Are you sure you want to delete this category?"
                                    class="btn bg-red-500 hover:bg-red-600 text-white px-3 sm:px-4 py-2 text-sm flex-1 sm:flex-none">
                                    <x-heroicon-o-trash class="w-4 h-4 me-2" />
                                    <span class="hidden sm:inline">Delete</span>
                                </button>
                            </div>
                        </div>

                        <!-- Category Form -->
                        <div class="flex-1 overflow-y-auto max-h-[calc(100vh-300px)]">
                            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <!-- Basic Information -->
                                <div class="space-y-4">
                                    <h3
                                        class="text-base sm:text-lg font-medium text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
                                        Basic Information
                                    </h3>

                                    <div>
                                        <label class="form-label text-sm">Name</label>
                                        <input type="text" wire:model="categoryForm.name"
                                            {{ !$editMode ? 'readonly' : '' }}
                                            class="form-input text-sm {{ !$editMode ? 'bg-gray-50 dark:bg-gray-800' : '' }}">
                                        @error('categoryForm.name')
                                            <span class="text-red-500 text-xs">{{ $message }}</span>
                                        @enderror
                                    </div>

                                    <div>
                                        <label class="form-label text-sm">Slug</label>
                                        <input type="text" wire:model="categoryForm.slug"
                                            {{ !$editMode ? 'readonly' : '' }}
                                            class="form-input text-sm {{ !$editMode ? 'bg-gray-50 dark:bg-gray-800' : '' }}">
                                        @error('categoryForm.slug')
                                            <span class="text-red-500 text-xs">{{ $message }}</span>
                                        @enderror
                                    </div>

                                    <div>
                                        <label class="form-label text-sm">Description</label>
                                        <textarea wire:model="categoryForm.description" rows="3" {{ !$editMode ? 'readonly' : '' }}
                                            class="form-input text-sm {{ !$editMode ? 'bg-gray-50 dark:bg-gray-800' : '' }}"></textarea>
                                        @error('categoryForm.description')
                                            <span class="text-red-500 text-xs">{{ $message }}</span>
                                        @enderror
                                    </div>
                                </div>

                                <!-- Category Settings -->
                                <div class="space-y-4">
                                    <h3
                                        class="text-base sm:text-lg font-medium text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
                                        Category Settings
                                    </h3>

                                    <div>
                                        <label class="form-label text-sm">Parent Category</label>
                                        <select wire:model="categoryForm.parent_id" {{ !$editMode ? 'disabled' : '' }}
                                            class="form-input text-sm {{ !$editMode ? 'bg-gray-50 dark:bg-gray-800' : '' }}">
                                            <option value="">No Parent (Root Category)</option>
                                            @foreach ($availableParents as $parent)
                                                <option value="{{ $parent->id }}">{{ $parent->name }}</option>
                                            @endforeach
                                        </select>
                                        @error('categoryForm.parent_id')
                                            <span class="text-red-500 text-xs">{{ $message }}</span>
                                        @enderror
                                    </div>

                                    <div>
                                        <label class="form-label text-sm">Category Type</label>
                                        <select wire:model="categoryForm.category_type_id"
                                            {{ !$editMode ? 'disabled' : '' }}
                                            class="form-input text-sm {{ !$editMode ? 'bg-gray-50 dark:bg-gray-800' : '' }}">
                                            <option value="">Select Type</option>
                                            @foreach ($categoryTypes as $type)
                                                <option value="{{ $type->id }}">{{ $type->name }}</option>
                                            @endforeach
                                        </select>
                                        @error('categoryForm.category_type_id')
                                            <span class="text-red-500 text-xs">{{ $message }}</span>
                                        @enderror
                                    </div>

                                    <div>
                                        <label class="form-label text-sm">Sort Order</label>
                                        <input type="number" wire:model="categoryForm.sort_order"
                                            {{ !$editMode ? 'readonly' : '' }}
                                            class="form-input text-sm {{ !$editMode ? 'bg-gray-50 dark:bg-gray-800' : '' }}">
                                        @error('categoryForm.sort_order')
                                            <span class="text-red-500 text-xs">{{ $message }}</span>
                                        @enderror
                                    </div>

                                    <div class="flex items-center">
                                        <input type="checkbox" wire:model="categoryForm.is_active"
                                            {{ !$editMode ? 'disabled' : '' }} class="form-checkbox">
                                        <label class="ms-2 text-sm text-gray-700 dark:text-gray-300">Active</label>
                                    </div>
                                </div>
                            </div>

                            <!-- Category Statistics -->
                            <div class="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                                <h3 class="text-base sm:text-lg font-medium text-gray-900 dark:text-white mb-4">
                                    Statistics</h3>
                                <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                    <div class="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-3 sm:p-4 text-center">
                                        <div class="text-lg sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
                                            {{ $selectedCategory->children_count ?? 0 }}</div>
                                        <div class="text-xs sm:text-sm text-blue-600 dark:text-blue-400">Child
                                            Categories</div>
                                    </div>
                                    <div class="bg-green-50 dark:bg-green-900/20 rounded-xl p-3 sm:p-4 text-center">
                                        <div class="text-lg sm:text-2xl font-bold text-green-600 dark:text-green-400">
                                            {{ $selectedCategory->courses_count ?? 0 }}</div>
                                        <div class="text-xs sm:text-sm text-green-600 dark:text-green-400">Courses
                                        </div>
                                    </div>
                                    <div class="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-3 sm:p-4 text-center">
                                        <div class="text-lg sm:text-2xl font-bold text-purple-600 dark:text-purple-400">
                                            {{ $selectedCategory->created_at->format('M Y') }}</div>
                                        <div class="text-xs sm:text-sm text-purple-600 dark:text-purple-400">Created
                                        </div>
                                    </div>
                                    <div class="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-3 sm:p-4 text-center">
                                        <div
                                            class="text-lg sm:text-2xl font-bold text-orange-600 dark:text-orange-400">
                                            {{ $selectedCategory->updated_at->diffForHumans() }}</div>
                                        <div class="text-xs sm:text-sm text-orange-600 dark:text-orange-400">Last
                                            Updated</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                @else
                    <!-- No Category Selected -->
                    <div class="h-64 sm:h-80 lg:h-96 flex items-center justify-center">
                        <div class="text-center px-4">
                            <x-heroicon-o-folder
                                class="w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-6 text-gray-300 dark:text-gray-600" />
                            <h3 class="text-lg sm:text-xl font-medium text-gray-900 dark:text-white mb-2">Select a
                                Category</h3>
                            <p class="text-sm sm:text-base text-gray-500 dark:text-gray-400 mb-6">Choose a category
                                from the tree to view
                                and edit its details</p>
                            <button wire:click="openCreateModal"
                                class="btn bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-4 sm:px-6 py-3 text-sm sm:text-base w-full sm:w-auto">
                                <x-heroicon-o-plus class="w-4 h-4 sm:w-5 sm:h-5 me-2" />
                                Create New Category
                            </button>
                        </div>
                    </div>
                @endif
            </div>
        </div>
    </div>

    <!-- Create/Edit Modal -->
    @if ($showCreateModal)
        <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div
                class="bg-white dark:bg-gray-800 rounded-3xl p-4 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div class="flex justify-between items-center mb-6">
                    <h2 class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                        {{ $editingCategory ? 'Edit Category' : 'Create New Category' }}
                    </h2>
                    <button wire:click="closeCreateModal"
                        class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                        <x-heroicon-o-x-mark class="w-6 h-6" />
                    </button>
                </div>

                <form wire:submit.prevent="saveCategory" class="space-y-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label class="form-label text-sm">Name</label>
                            <input type="text" wire:model="categoryForm.name" class="form-input text-sm" required>
                            @error('categoryForm.name')
                                <span class="text-red-500 text-xs">{{ $message }}</span>
                            @enderror
                        </div>

                        <div>
                            <label class="form-label text-sm">Slug</label>
                            <input type="text" wire:model="categoryForm.slug" class="form-input text-sm">
                            @error('categoryForm.slug')
                                <span class="text-red-500 text-xs">{{ $message }}</span>
                            @enderror
                        </div>

                        <div class="md:col-span-2">
                            <label class="form-label text-sm">Description</label>
                            <textarea wire:model="categoryForm.description" rows="3" class="form-input text-sm"></textarea>
                            @error('categoryForm.description')
                                <span class="text-red-500 text-xs">{{ $message }}</span>
                            @enderror
                        </div>

                        <div>
                            <label class="form-label text-sm">Parent Category</label>
                            <select wire:model="categoryForm.parent_id" class="form-input text-sm">
                                <option value="">No Parent (Root Category)</option>
                                @foreach ($availableParents as $parent)
                                    <option value="{{ $parent->id }}">{{ $parent->name }}</option>
                                @endforeach
                            </select>
                            @error('categoryForm.parent_id')
                                <span class="text-red-500 text-xs">{{ $message }}</span>
                            @enderror
                        </div>

                        <div>
                            <label class="form-label text-sm">Category Type</label>
                            <select wire:model="categoryForm.category_type_id" class="form-input text-sm" required>
                                <option value="">Select Type</option>
                                @foreach ($categoryTypes as $type)
                                    <option value="{{ $type->id }}">{{ $type->name }}</option>
                                @endforeach
                            </select>
                            @error('categoryForm.category_type_id')
                                <span class="text-red-500 text-xs">{{ $message }}</span>
                            @enderror
                        </div>

                        <div>
                            <label class="form-label text-sm">Sort Order</label>
                            <input type="number" wire:model="categoryForm.sort_order" class="form-input text-sm"
                                min="0">
                            @error('categoryForm.sort_order')
                                <span class="text-red-500 text-xs">{{ $message }}</span>
                            @enderror
                        </div>

                        <div class="flex items-center">
                            <input type="checkbox" wire:model="categoryForm.is_active" class="form-checkbox">
                            <label class="ms-2 text-sm text-gray-700 dark:text-gray-300">Active</label>
                        </div>
                    </div>

                    <div
                        class="flex flex-col sm:flex-row justify-end gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                        <button type="button" wire:click="closeCreateModal"
                            class="btn bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 text-sm order-2 sm:order-1">
                            Cancel
                        </button>
                        <button type="submit"
                            class="btn bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-6 py-2 text-sm order-1 sm:order-2">
                            <x-heroicon-o-check class="w-4 h-4 me-2" />
                            {{ $editingCategory ? 'Update' : 'Create' }} Category
                        </button>
                    </div>
                </form>
            </div>
        </div>
    @endif
</div>
