@props(['category', 'selected', 'depth' => 0])

<option value="{{ $category->id }}" 
        class="category-option-depth-{{ $depth }}"
        {{ in_array($category->id, $selected) ? 'selected' : '' }}
        data-full-path="{{ $category->full_path }}">
    {{ str_repeat('— ', $depth) }}{{ $category->name }}
    @if($category->children()->count() > 0)
        <span class="text-gray-500">({{ $category->children()->count() }} عنصر)</span>
    @endif
</option>

@foreach($category->children as $child)
    @include('components.category-select2-option', [
        'category' => $child,
        'selected' => $selected,
        'depth' => $depth + 1
    ])
@endforeach 