<div>
    <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">🏷️ Category Type Management</h1>
        <p class="text-gray-600 dark:text-gray-400">Manage category types and their display settings</p>
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

    <!-- Filters and Actions -->
    <div class="glass rounded-3xl p-6 mb-8">
        <div class="flex flex-col lg:flex-row gap-4 items-end">
            <!-- Search -->
            <div class="flex-1">
                <label class="form-label">🔍 Search Category Types</label>
                <input type="text" wire:model.live.debounce.300ms="search" placeholder="Search by name or slug..."
                    class="form-input">
            </div>

            <!-- Create Button -->
            <div>
                <button wire:click="openCreateModal"
                    class="btn bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white">
                    ➕ Add Category Type
                </button>
            </div>
        </div>
    </div>

    <!-- Category Types Table -->
    <div class="glass rounded-3xl overflow-hidden">
        <div class="overflow-x-auto">
            <table class="w-full">
                <thead class="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-800">
                    <tr>
                        <th class="px-6 py-4 text-start text-sm font-bold text-gray-700 dark:text-gray-300">Type</th>
                        <th class="px-6 py-4 text-start text-sm font-bold text-gray-700 dark:text-gray-300">Slug</th>
                        <th class="px-6 py-4 text-start text-sm font-bold text-gray-700 dark:text-gray-300">Display</th>
                        <th class="px-6 py-4 text-start text-sm font-bold text-gray-700 dark:text-gray-300">Features
                        </th>
                        <th class="px-6 py-4 text-start text-sm font-bold text-gray-700 dark:text-gray-300">Categories
                        </th>
                        <th class="px-6 py-4 text-start text-sm font-bold text-gray-700 dark:text-gray-300">Actions</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                    @forelse($categoryTypes as $type)
                        <tr class="hover:bg-white/50 dark:hover:bg-gray-800/50 transition-colors">
                            <td class="px-6 py-4">
                                <div class="flex items-center">
                                    @if ($type->icon)
                                        <span class="me-2 text-lg">{{ $type->icon }}</span>
                                    @endif
                                    <div>
                                        <div class="font-semibold text-gray-900 dark:text-white">
                                            {{ $type->name }}
                                        </div>
                                        <div class="text-xs text-gray-500">
                                            Order: {{ $type->sort_order }}
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td class="px-6 py-4">
                                <code class="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm">
                                    {{ $type->slug }}
                                </code>
                            </td>
                            <td class="px-6 py-4">
                                <span class="badge bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                                    {{ ucfirst($type->display_type) }}
                                </span>
                            </td>
                            <td class="px-6 py-4">
                                <div class="flex flex-wrap gap-1">
                                    @if ($type->is_active)
                                        <span class="badge badge-success text-xs">Active</span>
                                    @else
                                        <span
                                            class="badge bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 text-xs">Inactive</span>
                                    @endif

                                    @if ($type->is_multiple_selection)
                                        <span
                                            class="badge bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 text-xs">Multi-select</span>
                                    @endif

                                    @if ($type->is_searchable)
                                        <span
                                            class="badge bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 text-xs">Searchable</span>
                                    @endif

                                    @if ($type->max_depth)
                                        <span
                                            class="badge bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300 text-xs">
                                            Max depth: {{ $type->max_depth }}
                                        </span>
                                    @endif
                                </div>
                            </td>
                            <td class="px-6 py-4">
                                <span class="text-sm text-gray-600 dark:text-gray-400">
                                    {{ $type->categories_count ?? 0 }} categories
                                </span>
                            </td>
                            <td class="px-6 py-4">
                                <div class="flex gap-2">
                                    <button wire:click="openEditModal({{ $type->id }})"
                                        class="btn-icon bg-blue-500 hover:bg-blue-600 text-white">
                                        ✏️
                                    </button>

                                    <button wire:click="deleteCategoryType({{ $type->id }})"
                                        wire:confirm="Are you sure you want to delete this category type?"
                                        class="btn-icon bg-red-500 hover:bg-red-600 text-white">
                                        🗑️
                                    </button>
                                </div>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="6" class="px-6 py-12 text-center">
                                <div class="text-gray-500 dark:text-gray-400">
                                    <div class="text-4xl mb-4">🏷️</div>
                                    <div class="text-lg font-medium mb-2">No category types found</div>
                                    <div class="text-sm">Create your first category type to get started</div>
                                </div>
                            </td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>

        <!-- Pagination -->
        @if ($categoryTypes->hasPages())
            <div class="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
                {{ $categoryTypes->links() }}
            </div>
        @endif
    </div>

    <!-- Create/Edit Modal -->
    @if ($showCreateModal || $showEditModal)
        <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50" wire:click.self="closeModals">
            <div class="glass rounded-3xl p-8 max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    {{ $showCreateModal ? '➕ Create Category Type' : '✏️ Edit Category Type' }}
                </h2>

                <form wire:submit.prevent="save" class="space-y-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <!-- Name -->
                        <div>
                            <label class="form-label">Type Name *</label>
                            <input type="text" wire:model="name" class="form-input" placeholder="Educational Level">
                            @error('name')
                                <span class="text-red-500 text-sm">{{ $message }}</span>
                            @enderror
                        </div>

                        <!-- Slug -->
                        <div>
                            <label class="form-label">Slug *</label>
                            <input type="text" wire:model="slug" class="form-input" placeholder="educational-level">
                            @error('slug')
                                <span class="text-red-500 text-sm">{{ $message }}</span>
                            @enderror
                        </div>

                        <!-- Display Type -->
                        <div>
                            <label class="form-label">Display Type *</label>
                            <select wire:model="displayType" class="form-input">
                                <option value="buttons">Buttons</option>
                                <option value="checkboxes">Checkboxes</option>
                                <option value="select2">Select2 (Searchable)</option>
                                <option value="radio">Radio Buttons</option>
                                <option value="tree">Tree View</option>
                            </select>
                            @error('displayType')
                                <span class="text-red-500 text-sm">{{ $message }}</span>
                            @enderror
                        </div>

                        <!-- Icon -->
                        <div>
                            <label class="form-label">Icon (Emoji)</label>
                            <input type="text" wire:model="icon" class="form-input" placeholder="🎓" maxlength="10">
                            @error('icon')
                                <span class="text-red-500 text-sm">{{ $message }}</span>
                            @enderror
                        </div>

                        <!-- Sort Order -->
                        <div>
                            <label class="form-label">Sort Order</label>
                            <input type="number" wire:model="sortOrder" class="form-input" min="0">
                            @error('sortOrder')
                                <span class="text-red-500 text-sm">{{ $message }}</span>
                            @enderror
                        </div>

                        <!-- Max Depth -->
                        <div>
                            <label class="form-label">Max Depth</label>
                            <input type="number" wire:model="maxDepth" class="form-input" min="1"
                                max="10" placeholder="No limit">
                            @error('maxDepth')
                                <span class="text-red-500 text-sm">{{ $message }}</span>
                            @enderror
                        </div>
                    </div>

                    <!-- Feature Checkboxes -->
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <label class="flex items-center">
                            <input type="checkbox" wire:model="isActive" class="me-2">
                            <span class="text-sm">Active</span>
                        </label>

                        <label class="flex items-center">
                            <input type="checkbox" wire:model="isMultipleSelection" class="me-2">
                            <span class="text-sm">Multiple Selection</span>
                        </label>

                        <label class="flex items-center">
                            <input type="checkbox" wire:model="isSearchable" class="me-2">
                            <span class="text-sm">Searchable</span>
                        </label>

                        <label class="flex items-center">
                            <input type="checkbox" wire:model="requiresParent" class="me-2">
                            <span class="text-sm">Requires Parent</span>
                        </label>
                    </div>

                    <!-- Actions -->
                    <div class="flex justify-end gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                        <button type="button" wire:click="closeModals"
                            class="btn bg-gray-500 hover:bg-gray-600 text-white">
                            Cancel
                        </button>
                        <button type="submit"
                            class="btn bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white">
                            {{ $showCreateModal ? 'Create Type' : 'Update Type' }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    @endif
</div>
