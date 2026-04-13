<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Teacher;
use Illuminate\Database\Seeder;

class TeacherSeeder extends Seeder
{
    public function run()
    {
        // Clear existing data
        \DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        \DB::table('category_teacher')->truncate();
        Teacher::truncate();
        Category::truncate();
        \DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        // Root categories matching lhloop.com
        $roots = [
            ['name' => 'ابتدائي', 'icon' => '🎒', 'sort_order' => 1],
            ['name' => 'متوسط', 'icon' => '📚', 'sort_order' => 2],
            ['name' => 'ثانوي', 'icon' => '🎓', 'sort_order' => 3],
            ['name' => 'جامعي', 'icon' => '🏛️', 'sort_order' => 4],
        ];

        $catModels = [];
        foreach ($roots as $cat) {
            $catModels[] = Category::create($cat);
        }

        // Sub-categories per level
        $subs = [
            1 => [
                ['name' => 'رياضيات ابتدائي', 'icon' => '📐'],
                ['name' => 'لغتي', 'icon' => '📝'],
                ['name' => 'علوم ابتدائي', 'icon' => '🔬'],
                ['name' => 'إنجليزي ابتدائي', 'icon' => '🔤'],
                ['name' => 'تربية إسلامية', 'icon' => '📖'],
            ],
            2 => [
                ['name' => 'رياضيات متوسط', 'icon' => '📐'],
                ['name' => 'لغة عربية', 'icon' => '📝'],
                ['name' => 'علوم متوسط', 'icon' => '🔬'],
                ['name' => 'إنجليزي متوسط', 'icon' => '🔤'],
                ['name' => 'حاسب آلي', 'icon' => '💻'],
            ],
            3 => [
                ['name' => 'رياضيات ثانوي', 'icon' => '📐'],
                ['name' => 'فيزياء', 'icon' => '⚛️'],
                ['name' => 'كيمياء', 'icon' => '🧪'],
                ['name' => 'أحياء', 'icon' => '🧬'],
                ['name' => 'إنجليزي ثانوي', 'icon' => '🔤'],
                ['name' => 'قدرات وتحصيلي', 'icon' => '📊'],
            ],
            4 => [
                ['name' => 'رياضيات جامعي', 'icon' => '📐'],
                ['name' => 'فيزياء جامعي', 'icon' => '⚛️'],
                ['name' => 'برمجة', 'icon' => '💻'],
                ['name' => 'إدارة أعمال', 'icon' => '📈'],
                ['name' => 'محاسبة', 'icon' => '🧮'],
                ['name' => 'هندسة', 'icon' => '⚙️'],
            ],
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

        // Teacher data
        $maleNames = ['أحمد', 'محمد', 'عبدالله', 'خالد', 'فيصل', 'سعود', 'عمر', 'يوسف', 'إبراهيم', 'سلطان', 'ناصر', 'تركي', 'بندر', 'ماجد', 'عبدالرحمن', 'فهد', 'سالم', 'حسن', 'علي', 'طلال', 'مشاري', 'نايف', 'بدر', 'حمد', 'سعد'];
        $femaleNames = ['نورة', 'سارة', 'فاطمة', 'مريم', 'ريم', 'هند', 'لمى', 'دانة', 'عبير', 'منال', 'هيا', 'العنود', 'مها', 'أسماء', 'جواهر', 'لطيفة', 'غادة', 'أمل', 'وفاء', 'حنان', 'رنا', 'شيماء', 'بشاير', 'نوف', 'ديمة'];
        $lastNames = ['العتيبي', 'الشمري', 'الحربي', 'القحطاني', 'الدوسري', 'المالكي', 'السبيعي', 'الغامدي', 'الزهراني', 'المطيري', 'العنزي', 'البلوي', 'الرشيدي', 'السلمي', 'الجهني', 'الشهري', 'العمري', 'الأحمدي', 'السهلي', 'الخالدي'];

        $nationalities = ['saudi', 'saudi', 'saudi', 'saudi', 'egyptian', 'jordanian', 'syrian', 'saudi'];
        $qualifications = ['bachelor', 'master', 'phd', 'diploma'];
        $qualLabels = [
            'bachelor' => 'بكالوريوس',
            'master' => 'ماجستير',
            'phd' => 'دكتوراه',
            'diploma' => 'دبلوم تربوي',
        ];
        $qualSuffixes = ['', ' + دبلوم تربوي', '', ' تربوي'];
        $locations = ['online', 'in_person', 'both'];
        $methods = ['individual', 'group'];
        $countries = ['SA', 'SA', 'SA', 'SA', 'EG', 'JO', 'SA'];

        $allCatIds = Category::whereNull('parent_id')->pluck('id')->toArray();

        for ($i = 0; $i < 176; $i++) {
            $gender = $i % 3 === 0 ? 'female' : 'male';
            $names = $gender === 'male' ? $maleNames : $femaleNames;
            $firstName = $names[array_rand($names)];
            $lastName = $lastNames[array_rand($lastNames)];

            $qual = $qualifications[array_rand($qualifications)];
            $suffix = $qualSuffixes[array_rand($qualSuffixes)];

            $teacher = Teacher::create([
                'name' => $firstName . ' ' . $lastName,
                'gender' => $gender,
                'nationality' => $nationalities[array_rand($nationalities)],
                'qualification' => $qual,
                'latest_qualification' => $qualLabels[$qual] . $suffix,
                'hourly_rate' => rand(30, 350),
                'rating' => round(rand(30, 50) / 10, 1),
                'total_ratings' => rand(5, 200),
                'completed_hours' => rand(10, 1500),
                'experience_years' => rand(1, 25),
                'lesson_location' => $locations[array_rand($locations)],
                'teaching_method' => $methods[array_rand($methods)],
                'country_code' => $countries[array_rand($countries)],
                'is_active' => true,
            ]);

            // Attach 1-3 categories
            $catCount = rand(1, min(3, count($allCatIds)));
            $shuffled = $allCatIds;
            shuffle($shuffled);
            $teacher->categories()->attach(array_slice($shuffled, 0, $catCount));
        }
    }
}
