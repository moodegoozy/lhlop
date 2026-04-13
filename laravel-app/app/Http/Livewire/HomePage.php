<?php

namespace App\Http\Livewire;

use App\Models\Category;
use App\Models\Teacher;
use Livewire\Component;
use Livewire\WithPagination;

class HomePage extends Component
{
    use WithPagination;

    // Filter properties
    public $sortBy = 'rating';
    public $selectedGender = '';
    public $selectedQualification = '';
    public $selectedLessonLocation = '';
    public $selectedNationality = '';
    public $selectedCountry = '';
    public $selectedCity = '';
    public $selectedCategoryId = null;
    public $selectedTeachingMethod = '';
    public $search = '';

    protected $queryString = [
        'sortBy' => ['except' => 'rating'],
        'selectedGender' => ['except' => ''],
        'selectedQualification' => ['except' => ''],
        'selectedLessonLocation' => ['except' => ''],
        'selectedNationality' => ['except' => ''],
        'selectedCountry' => ['except' => ''],
        'selectedCity' => ['except' => ''],
        'selectedCategoryId' => ['except' => null],
        'selectedTeachingMethod' => ['except' => ''],
    ];

    public function updatingSearch()
    {
        $this->resetPage();
    }

    public function updatingSelectedGender()
    {
        $this->resetPage();
    }

    public function updatingSelectedQualification()
    {
        $this->resetPage();
    }

    public function updatingSelectedLessonLocation()
    {
        $this->resetPage();
    }

    public function updatingSelectedNationality()
    {
        $this->resetPage();
    }

    public function updatingSelectedCountry()
    {
        $this->resetPage();
        $this->selectedCity = '';
    }

    public function updatingSelectedCity()
    {
        $this->resetPage();
    }

    public function updatingSelectedTeachingMethod()
    {
        $this->resetPage();
    }

    // Computed properties
    public function getGenderOptionsProperty()
    {
        return ['male', 'female'];
    }

    public function getQualificationOptionsProperty()
    {
        return ['bachelor', 'master', 'phd', 'diploma'];
    }

    public function getLessonLocationOptionsProperty()
    {
        return [
            'online' => __('online'),
            'in_person' => __('in_person'),
            'both' => __('both'),
        ];
    }

    public function getNationalityOptionsProperty()
    {
        return ['saudi', 'egyptian', 'jordanian', 'syrian', 'other'];
    }

    public function getCountryOptionsProperty()
    {
        return [
            'SA' => 'السعودية',
            'EG' => 'مصر',
            'JO' => 'الأردن',
            'AE' => 'الإمارات',
        ];
    }

    public function getCityOptionsProperty()
    {
        if (!$this->selectedCountry) {
            return [];
        }

        $cities = [
            'SA' => [1 => 'الرياض', 2 => 'جدة', 3 => 'مكة', 4 => 'المدينة'],
            'EG' => [5 => 'القاهرة', 6 => 'الإسكندرية', 7 => 'الجيزة'],
            'JO' => [8 => 'عمان', 9 => 'إربد'],
            'AE' => [10 => 'دبي', 11 => 'أبوظبي'],
        ];

        return $cities[$this->selectedCountry] ?? [];
    }

    public function getRootCategoriesProperty()
    {
        return Category::whereNull('parent_id')->orderBy('sort_order')->get();
    }

    public function getCategoryPathProperty()
    {
        if (!$this->selectedCategoryId) {
            return collect();
        }

        $path = collect();
        $cat = Category::find($this->selectedCategoryId);
        while ($cat) {
            $path->prepend($cat);
            $cat = $cat->parent;
        }
        return $path;
    }

    public function getTeachingMethodOptionsProperty()
    {
        return [
            'individual' => __('individual'),
            'group' => __('group'),
        ];
    }

    public function getShouldShowTeachingMethodsProperty()
    {
        return true;
    }

    public function getTeachersProperty()
    {
        $query = Teacher::where('is_active', true);

        if ($this->selectedCategoryId) {
            $query->whereHas('categories', function ($q) {
                $q->where('categories.id', $this->selectedCategoryId);
            });
        }

        if ($this->selectedGender) {
            $query->where('gender', $this->selectedGender);
        }

        if ($this->selectedQualification) {
            $query->where('qualification', $this->selectedQualification);
        }

        if ($this->selectedLessonLocation) {
            $query->where('lesson_location', $this->selectedLessonLocation);
        }

        if ($this->selectedNationality) {
            $query->where('nationality', $this->selectedNationality);
        }

        if ($this->selectedCountry) {
            $query->where('country_code', $this->selectedCountry);
        }

        if ($this->selectedCity) {
            $query->where('city_id', $this->selectedCity);
        }

        if ($this->selectedTeachingMethod) {
            $query->where('teaching_method', $this->selectedTeachingMethod);
        }

        if ($this->search) {
            $query->where(function ($q) {
                $q->where('name', 'like', '%' . $this->search . '%')
                  ->orWhere('latest_qualification', 'like', '%' . $this->search . '%');
            });
        }

        switch ($this->sortBy) {
            case 'experience':
                $query->orderByDesc('experience_years');
                break;
            case 'price_low':
                $query->orderBy('hourly_rate');
                break;
            case 'price_high':
                $query->orderByDesc('hourly_rate');
                break;
            case 'newest':
                $query->orderByDesc('created_at');
                break;
            case 'rating':
            default:
                $query->orderByDesc('rating');
                break;
        }

        return $query->paginate(20);
    }

    public function isInSelectedPath($categoryId)
    {
        return $this->selectedCategoryId === $categoryId;
    }

    public function selectCategory($categoryId)
    {
        $this->selectedCategoryId = $categoryId;
        $this->resetPage();
    }

    public function clearFilters()
    {
        $this->reset([
            'sortBy', 'selectedGender', 'selectedQualification',
            'selectedLessonLocation', 'selectedNationality',
            'selectedCountry', 'selectedCity', 'selectedCategoryId',
            'selectedTeachingMethod', 'search',
        ]);
        $this->sortBy = 'rating';
        $this->resetPage();
    }

    public function render()
    {
        return view('livewire.home-page', [
            'teachers' => $this->teachers,
        ]);
    }
}
