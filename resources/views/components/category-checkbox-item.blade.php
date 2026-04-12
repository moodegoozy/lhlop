@props(['category', 'selected', 'componentId', 'depth' => 0])

<div class="checkbox-item depth-{{ $depth }} {{ in_array($category->id, $selected) ? 'selected' : '' }}" 
     data-component="{{ $componentId }}"
     @click="$event.target.tagName !== 'INPUT' && $refs.checkbox.click()">
    
    <input type="checkbox" 
           x-ref="checkbox"
           :checked="selected.includes({{ $category->id }})"
           @change="toggle({{ $category->id }})"
           @click="$event.stopPropagation()"
           class="checkbox-input">
    
    <div class="flex-1">
        <div class="category-name">
            @if($category->icon)
                <span class="me-2">{{ $category->icon }}</span>
            @endif
            {{ $category->name }}
            
            @if($category->children()->count() > 0)
                <span class="text-xs opacity-75 me-1">({{ $category->children()->count() }} {{ __('subcategories') }})</span>
            @endif
        </div>
        
        @if($category->description)
            <div class="category-description">{{ $category->description }}</div>
        @endif
        
        @if($depth > 0)
            <div class="category-path">{{ $category->full_path }}</div>
        @endif
    </div>
</div>

@foreach($category->children as $child)
    @include('components.category-checkbox-item', [
        'category' => $child,
        'selected' => $selected,
        'componentId' => $componentId,
        'depth' => $depth + 1
    ])
@endforeach 