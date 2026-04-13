<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Teacher extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'name', 'profile_image', 'gender', 'nationality',
        'qualification', 'latest_qualification', 'bio', 'hourly_rate',
        'rating', 'total_ratings', 'completed_hours', 'experience_years',
        'lesson_location', 'teaching_method', 'country_code', 'city_id',
        'is_active',
    ];

    protected $casts = [
        'hourly_rate' => 'decimal:2',
        'rating' => 'decimal:2',
        'is_active' => 'boolean',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function categories()
    {
        return $this->belongsToMany(Category::class);
    }

    public function getRouteKeyName()
    {
        return 'id';
    }
}
