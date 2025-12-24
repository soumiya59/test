<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RecipeController;

Route::get('/recipes', [RecipeController::class, 'index']);
Route::get('/recipes/categories', [RecipeController::class, 'categories']);
Route::get('/recipes/{id}', [RecipeController::class, 'show']);
Route::post('/recipes', [RecipeController::class, 'store']);
Route::put('/recipes/{id}', [RecipeController::class, 'update']);
Route::delete('/recipes/{id}', [RecipeController::class, 'destroy']);

