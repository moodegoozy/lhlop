<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Teacher;
use Illuminate\Database\Seeder;

class TeacherSeeder extends Seeder
{
    public function run()
    {
        // Create root categories
        $categories = [
            ['name' => 'الرياضيات', 'icon' => '📐', 'sort_order' => 1],
            ['name' => 'اللغة العربية', 'icon' => '📚', 'sort_order' => 2],
            ['name' => 'اللغة الإنجليزية', 'icon' => '🔤', 'sort_order' => 3],
            ['name' => 'الفيزياء', 'icon' => '⚛️', 'sort_order' => 4],
            ['name' => 'الكيمياء', 'icon' => '🧪', 'sort_order' => 5],
            ['name' => 'البرمجة', 'icon' => '💻', 'sort_order' => 6],
        ];

        $catModels = [];
        foreach ($categories as $cat) {
            $catModels[] = Category::create($cat);
        }

        // Sub-categories
        $subs = [
            1 => [['name' => 'جبر', 'icon' => '➕'], ['name' => 'هندسة', 'icon' => '📐'], ['name' => 'تفاضل وتكامل', 'icon' => '∫']],
            2 => [['name' => 'نحو وصرف', 'icon' => '📝'], ['name' => 'أدب', 'icon' => '📖'], ['name' => 'بلاغة', 'icon' => '🖋']],
            3 => [['name' => 'محادثة', 'icon' => '💬'], ['name' => 'قواعد', 'icon' => '📘'], ['name' => 'أعمال', 'icon' => '💼']],
            4 => [['name' => 'ميكانيكا', 'icon' => '⚙️'], ['name' => 'كهرباء', 'icon' => '⚡'], ['name' => 'بصريات', 'icon' => '🔍']],
            5 => [['name' => 'كيمياء عضوية', 'icon' => '🧬'], ['name' => 'كيمياء تحليلية', 'icon' => '🔬']],
            6 => [['name' => 'بايثون', 'icon' => '🐍'], ['name' => 'جافا', 'icon' => '☕'], ['name' => 'تطوير ويب', 'icon' => '🌐']],
        ];

        foreach ($subs as $parentIdx => $children) {
            $parent = $catModels[$parentIdx - 1];
            $order = 1;
            foreach ($children as $child) {
                Category::create(array_merge($child, [
                    'parent_id' => $parent->id,
                    'sort_order' => $order++,
                ]));
            }
        }

        // Sample teachers
        $firstNames = [
            'male' => ['أحمد', 'محمد', 'عبدالله', 'خالد', 'فيصل', 'سعود', 'عمر', 'يوسف', 'إبراهيم', 'سلطان', 'ناصر', 'تركي', 'بندر', 'ماجد', 'عبدالرحمن'],
            'female' => ['نورة', 'سارة', 'فاطمة', 'مريم', 'ريم', 'هند', 'لمى', 'دانة', 'عبير', 'منال', 'هيا', 'العنود', 'مها', 'أسماء', 'جواهر'],
        ];

        $lastNames = ['العتيبي', 'الشمري', 'الحربي', 'القحطاني', 'الدوسري', 'المالكي', 'السبيعي', 'الغامدي', 'الزهراني', 'المطيري', 'العنزي', 'البلوي', 'الرشيدي', 'السلمي', 'الجهني'];

        $nationalities = ['saudi', 'saudi', 'saudi', 'egyptian', 'jordanian', 'syrian', 'saudi'];
        $qualifications = ['bachelor', 'master', 'phd', 'diploma', 'bachelor', 'master'];
        $qualLabels = [
            'bachelor' => 'بكالوريوس',
            'master' => 'ماجستير',
            'phd' => 'دكتوراه',
            'diploma' => 'دبلوم',
        ];
        $subjects = ['رياضيات', 'لغة عربية', 'لغة إنجليزية', 'فيزياء', 'كيمياء', 'برمجة'];
        $locations = ['online', 'in_person', 'both'];
        $methods = ['individual', 'group'];
        $countries = ['SA', 'SA', 'SA', 'EG', 'JO', 'SA'];

        $allCatIds = Category::whereNull('parent_id')->pluck('id')->toArray();

        for ($i = 0; $i < 30; $i++) {
            $gender = $i % 3 === 0 ? 'female' : 'male';
            $names = $firstNames[$gender];
            $firstName = $names[array_rand($names)];
            $lastName = $lastNames[array_rand($lastNames)];

            $qual = $qualifications[array_rand($qualifications)];
            $subjectIdx = $i % count($subjects);

            $teacher = Teacher::create([
                'name' => $firstName . ' ' . $lastName,
                'gender' => $gender,
                'nationality' => $nationalities[array_rand($nationalities)],
                'qualification' => $qual,
                'latest_qualification' => $qualLabels[$qual] . ' ' . $subjects[$subjectIdx],
                'hourly_rate' => rand(50, 300),
                'rating' => round(rand(30, 50) / 10, 1),
                'total_ratings' => rand(5, 200),
                'completed_hours' => rand(10, 1500),
                'experience_years' => rand(1, 20),
                'lesson_location' => $locations[array_rand($locations)],
                'teaching_method' => $methods[array_rand($methods)],
                'country_code' => $countries[array_rand($countries)],
                'is_active' => true,
            ]);

            // Attach 1-3 categories
            $catCount = rand(1, 3);
            $assignedCats = (array) array_rand(array_flip($allCatIds), min($catCount, count($allCatIds)));
            $teacher->categories()->attach($assignedCats);
        }
    }
}
