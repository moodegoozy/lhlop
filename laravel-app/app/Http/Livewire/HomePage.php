<?php

namespace App\Http\Livewire;

use Livewire\Component;
use Livewire\WithPagination;
use Illuminate\Pagination\LengthAwarePaginator;

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

    private function makeCategory($id, $name, $icon = null)
    {
        $obj = new \stdClass();
        $obj->id = $id;
        $obj->name = $name;
        $obj->icon = $icon;
        return $obj;
    }

    public function getRootCategoriesProperty()
    {
        return collect([
            $this->makeCategory(1, 'الرياضيات', '📐'),
            $this->makeCategory(2, 'اللغة العربية', '📚'),
            $this->makeCategory(3, 'اللغة الإنجليزية', '🔤'),
            $this->makeCategory(4, 'الفيزياء', '⚛️'),
            $this->makeCategory(5, 'الكيمياء', '🧪'),
            $this->makeCategory(6, 'البرمجة', '💻'),
        ]);
    }

    public function getCategoryPathProperty()
    {
        // Return empty for simplicity
        return collect();
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
        // Return empty paginator for now
        $items = collect();
        return new LengthAwarePaginator($items, 0, 10, 1);
    }

    public function isInSelectedPath($categoryId)
    {
        return $this->selectedCategoryId === $categoryId;
    }

    public function selectCategory($categoryId)
    {
        $this->selectedCategoryId = $categoryId;
    }

    public function clearFilters()
    {
        $this->reset([
            'sortBy', 'selectedGender', 'selectedQualification', 
            'selectedLessonLocation', 'selectedNationality',
            'selectedCountry', 'selectedCity', 'selectedCategoryId',
            'selectedTeachingMethod'
        ]);
        $this->sortBy = 'rating';
    }

    public function render()
    {
        return view('livewire.home-page', [
            'teachers' => $this->teachers,
        ]);
    }
}
