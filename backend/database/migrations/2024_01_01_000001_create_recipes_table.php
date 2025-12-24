<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('recipes', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->json('ingredients');
            $table->text('instructions');
            $table->integer('prep_time')->default(0);
            $table->integer('cook_time')->default(0);
            $table->integer('servings')->default(1);
            $table->enum('difficulty', ['easy', 'medium', 'hard'])->default('medium');
            $table->string('category')->nullable();
            $table->string('image_url')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('recipes');
    }
};

