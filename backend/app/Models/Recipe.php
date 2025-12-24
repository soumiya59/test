<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Recipe extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'ingredients',
        'instructions',
        'prep_time',
        'cook_time',
        'servings',
        'difficulty',
        'category',
        'image_url',
    ];

    protected $casts = [
        'ingredients' => 'array',
        'prep_time' => 'integer',
        'cook_time' => 'integer',
        'servings' => 'integer',
    ];
}

