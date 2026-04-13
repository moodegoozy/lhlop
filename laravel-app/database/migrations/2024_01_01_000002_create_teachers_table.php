<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTeachersTable extends Migration
{
    public function up()
    {
        Schema::create('teachers', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->nullable();
            $table->string('name');
            $table->string('profile_image')->nullable();
            $table->enum('gender', ['male', 'female'])->default('male');
            $table->string('nationality')->nullable();
            $table->string('qualification')->nullable();
            $table->string('latest_qualification')->nullable();
            $table->text('bio')->nullable();
            $table->decimal('hourly_rate', 8, 2)->default(0);
            $table->decimal('rating', 3, 2)->default(0);
            $table->integer('total_ratings')->default(0);
            $table->integer('completed_hours')->default(0);
            $table->integer('experience_years')->default(0);
            $table->string('lesson_location')->nullable(); // online, in_person, both
            $table->string('teaching_method')->nullable(); // individual, group
            $table->string('country_code', 5)->nullable();
            $table->unsignedBigInteger('city_id')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('set null');
        });
    }

    public function down()
    {
        Schema::dropIfExists('teachers');
    }
}
