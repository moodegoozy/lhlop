<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCategoryTeacherTable extends Migration
{
    public function up()
    {
        Schema::create('category_teacher', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('category_id');
            $table->unsignedBigInteger('teacher_id');
            $table->timestamps();

            $table->foreign('category_id')->references('id')->on('categories')->onDelete('cascade');
            $table->foreign('teacher_id')->references('id')->on('teachers')->onDelete('cascade');
            $table->unique(['category_id', 'teacher_id']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('category_teacher');
    }
}
