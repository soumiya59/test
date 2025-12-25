<?php

namespace App\Http\Controllers;

use App\Models\Recipe;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class RecipeController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Recipe::query();

        // Recherche par titre ou description
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        // Filtre par catégorie
        if ($request->has('category') && $request->category) {
            $query->where('category', $request->category);
        }

        // Filtre par difficulté
        if ($request->has('difficulty') && $request->difficulty) {
            $query->where('difficulty', $request->difficulty);
        }

        // Filtre par temps de préparation (min)
        if ($request->has('min_prep_time') && $request->min_prep_time) {
            $query->where('prep_time', '>=', (int)$request->min_prep_time);
        }
        if ($request->has('max_prep_time') && $request->max_prep_time) {
            $query->where('prep_time', '<=', (int)$request->max_prep_time);
        }

        // Filtre par temps total (prep_time + cook_time)
        if ($request->has('min_total_time') && $request->min_total_time) {
            $query->whereRaw('(prep_time + cook_time) >= ?', [(int)$request->min_total_time]);
        }
        if ($request->has('max_total_time') && $request->max_total_time) {
            $query->whereRaw('(prep_time + cook_time) <= ?', [(int)$request->max_total_time]);
        }

        // Filtre par portions
        if ($request->has('min_servings') && $request->min_servings) {
            $query->where('servings', '>=', (int)$request->min_servings);
        }
        if ($request->has('max_servings') && $request->max_servings) {
            $query->where('servings', '<=', (int)$request->max_servings);
        }

        // Tri
        $allowedSortFields = ['created_at', 'title', 'prep_time', 'cook_time', 'total_time', 'servings', 'difficulty', 'category'];
        $sortBy = $request->get('sort_by', 'created_at');
        
        // Validate sort field
        if (!in_array($sortBy, $allowedSortFields)) {
            $sortBy = 'created_at';
        }

        $sortOrder = strtolower($request->get('sort_order', 'desc'));
        if (!in_array($sortOrder, ['asc', 'desc'])) {
            $sortOrder = 'desc';
        }

        // Special handling for total time sorting
        if ($sortBy === 'total_time') {
            $query->orderByRaw('(prep_time + cook_time) ' . $sortOrder);
        } else {
            $query->orderBy($sortBy, $sortOrder);
        }

        // Pagination
        $perPage = $request->get('per_page', 12);
        // Limit per_page to prevent abuse
        $perPage = min(max((int)$perPage, 1), 100);
        
        $recipes = $query->paginate($perPage);

        return response()->json($recipes);
    }

    public function show($id): JsonResponse
    {
        $recipe = Recipe::findOrFail($id);
        return response()->json($recipe);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'ingredients' => 'required|array',
            'instructions' => 'required|string',
            'prep_time' => 'required|integer|min:0',
            'cook_time' => 'required|integer|min:0',
            'servings' => 'required|integer|min:1',
            'difficulty' => 'required|in:easy,medium,hard',
            'category' => 'nullable|string|max:255',
            'image_url' => 'nullable|url',
        ]);

        $recipe = Recipe::create($validated);

        return response()->json($recipe, 201);
    }

    public function update(Request $request, $id): JsonResponse
    {
        $recipe = Recipe::findOrFail($id);

        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'ingredients' => 'sometimes|required|array',
            'instructions' => 'sometimes|required|string',
            'prep_time' => 'sometimes|required|integer|min:0',
            'cook_time' => 'sometimes|required|integer|min:0',
            'servings' => 'sometimes|required|integer|min:1',
            'difficulty' => 'sometimes|required|in:easy,medium,hard',
            'category' => 'nullable|string|max:255',
            'image_url' => 'nullable|url',
        ]);

        $recipe->update($validated);

        return response()->json($recipe);
    }

    public function destroy($id): JsonResponse
    {
        $recipe = Recipe::findOrFail($id);
        $recipe->delete();

        return response()->json(['message' => 'Recipe deleted successfully']);
    }

    public function categories(): JsonResponse
    {
        $categories = Recipe::distinct()->pluck('category')->filter()->values();
        return response()->json($categories);
    }
}

