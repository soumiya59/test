<?php

namespace Database\Seeders;

use App\Models\Recipe;
use Illuminate\Database\Seeder;

class RecipeSeeder extends Seeder
{
    public function run(): void
    {
        $recipes = [
            [
                'title' => 'Spicy and delicious chicken wings',
                'description' => 'Crispy chicken wings with a spicy kick, perfect for sharing with friends',
                'ingredients' => [
                    '2 lbs chicken wings',
                    '1/2 cup hot sauce',
                    '1/4 cup butter',
                    '1 tsp garlic powder',
                    '1 tsp paprika',
                    'Salt and pepper',
                    'Blue cheese dressing',
                    'Celery sticks'
                ],
                'instructions' => '1. Preheat oven to 400°F\n2. Season wings with salt, pepper, and paprika\n3. Bake for 45 minutes until crispy\n4. Mix hot sauce with melted butter and garlic powder\n5. Toss wings in sauce\n6. Serve with blue cheese and celery',
                'prep_time' => 15,
                'cook_time' => 45,
                'servings' => 4,
                'difficulty' => 'easy',
                'category' => 'Chicken',
                'image_url' => 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=800'
            ],
            [
                'title' => 'Big and Juicy Wagyu Beef Cheeseburger',
                'description' => 'A premium wagyu beef burger with melted cheese and fresh toppings',
                'ingredients' => [
                    '8 oz wagyu beef patty',
                    '1 brioche bun',
                    '2 slices cheddar cheese',
                    'Lettuce',
                    'Tomato',
                    'Onion',
                    'Pickles',
                    'Special sauce'
                ],
                'instructions' => '1. Form wagyu beef into patty\n2. Season with salt and pepper\n3. Grill to medium-rare\n4. Add cheese and melt\n5. Toast bun\n6. Assemble with toppings\n7. Serve immediately',
                'prep_time' => 10,
                'cook_time' => 10,
                'servings' => 1,
                'difficulty' => 'easy',
                'category' => 'Snack',
                'image_url' => 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800'
            ],
            [
                'title' => 'Fresh Lime Roasted Salmon with Ginger Sauce',
                'description' => 'Tender salmon fillets roasted with fresh lime and served with a zesty ginger sauce',
                'ingredients' => [
                    '4 salmon fillets',
                    '2 limes',
                    '2 tbsp fresh ginger',
                    '2 cloves garlic',
                    '2 tbsp soy sauce',
                    '1 tbsp honey',
                    'Olive oil',
                    'Fresh herbs'
                ],
                'instructions' => '1. Preheat oven to 400°F\n2. Place salmon on baking sheet\n3. Squeeze lime over salmon\n4. Roast for 12-15 minutes\n5. Make ginger sauce with soy, honey, and ginger\n6. Drizzle sauce over salmon\n7. Garnish with herbs',
                'prep_time' => 10,
                'cook_time' => 15,
                'servings' => 4,
                'difficulty' => 'medium',
                'category' => 'Fish',
                'image_url' => 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800'
            ],
            [
                'title' => 'Strawberry Oatmeal Pancake with Honey Syrup',
                'description' => 'Fluffy oatmeal pancakes topped with fresh strawberries and drizzled with honey',
                'ingredients' => [
                    '1 cup rolled oats',
                    '1 cup flour',
                    '2 eggs',
                    '1 cup milk',
                    '2 tbsp honey',
                    '1 cup strawberries',
                    '1 tsp baking powder',
                    'Butter',
                    'Maple syrup'
                ],
                'instructions' => '1. Blend oats into flour\n2. Mix dry ingredients\n3. Whisk eggs, milk, and honey\n4. Combine wet and dry ingredients\n5. Cook pancakes on griddle\n6. Top with strawberries and honey',
                'prep_time' => 10,
                'cook_time' => 15,
                'servings' => 4,
                'difficulty' => 'easy',
                'category' => 'Breakfast',
                'image_url' => 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=800'
            ],
            [
                'title' => 'Fresh and Healthy Mixed Mayonnaise Salad',
                'description' => 'A refreshing mixed salad with creamy mayonnaise dressing and fresh vegetables',
                'ingredients' => [
                    'Mixed greens',
                    'Cherry tomatoes',
                    'Cucumber',
                    'Red onion',
                    'Chickpeas',
                    'Olives',
                    'Mayonnaise',
                    'Lemon juice',
                    'Olive oil'
                ],
                'instructions' => '1. Wash and chop all vegetables\n2. Mix mayonnaise with lemon juice\n3. Toss greens with dressing\n4. Add tomatoes, cucumber, and onion\n5. Top with chickpeas and olives\n6. Drizzle with olive oil',
                'prep_time' => 15,
                'cook_time' => 0,
                'servings' => 4,
                'difficulty' => 'easy',
                'category' => 'Healthy',
                'image_url' => 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800'
            ],
            [
                'title' => 'Chicken Meatball with Creamy Cheese Inside',
                'description' => 'Tender chicken meatballs with a surprise creamy cheese center',
                'ingredients' => [
                    '1 lb ground chicken',
                    '1/2 cup breadcrumbs',
                    '1 egg',
                    '4 oz cream cheese',
                    '2 cloves garlic',
                    'Fresh herbs',
                    'Marinara sauce',
                    'Parmesan cheese'
                ],
                'instructions' => '1. Mix chicken with breadcrumbs and egg\n2. Form meatballs with cheese center\n3. Bake at 375°F for 20 minutes\n4. Heat marinara sauce\n5. Serve meatballs with sauce\n6. Garnish with parmesan',
                'prep_time' => 15,
                'cook_time' => 20,
                'servings' => 4,
                'difficulty' => 'medium',
                'category' => 'Meat',
                'image_url' => 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=800'
            ],
            [
                'title' => 'Fruity Pancake with Orange & Blueberry',
                'description' => 'Light and fluffy pancakes topped with fresh oranges and blueberries',
                'ingredients' => [
                    '1 cup flour',
                    '1 cup milk',
                    '1 egg',
                    '2 tbsp sugar',
                    '1 tsp baking powder',
                    '1 orange',
                    '1/2 cup blueberries',
                    'Butter',
                    'Maple syrup'
                ],
                'instructions' => '1. Mix dry ingredients\n2. Whisk wet ingredients\n3. Combine and let rest\n4. Cook pancakes on griddle\n5. Top with orange segments\n6. Add blueberries\n7. Drizzle with syrup',
                'prep_time' => 10,
                'cook_time' => 15,
                'servings' => 4,
                'difficulty' => 'easy',
                'category' => 'Sweet',
                'image_url' => 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800'
            ],
            [
                'title' => 'The Best Easy One Pot Chicken and Rice',
                'description' => 'A simple one-pot meal with tender chicken and perfectly cooked rice',
                'ingredients' => [
                    '4 chicken thighs',
                    '1 cup rice',
                    '2 cups chicken broth',
                    '1 onion',
                    '2 cloves garlic',
                    '1 tsp turmeric',
                    'Salt and pepper',
                    'Fresh parsley'
                ],
                'instructions' => '1. Season chicken thighs\n2. Brown chicken in pot\n3. Add onion and garlic\n4. Add rice and broth\n5. Bring to boil then simmer\n6. Cook until rice is tender\n7. Garnish with parsley',
                'prep_time' => 10,
                'cook_time' => 30,
                'servings' => 4,
                'difficulty' => 'easy',
                'category' => 'Snack',
                'image_url' => 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800'
            ],
            [
                'title' => 'The Creamiest Creamy Chicken and Bacon Pasta',
                'description' => 'Indulgent pasta with creamy sauce, tender chicken, and crispy bacon',
                'ingredients' => [
                    '1 lb pasta',
                    '2 chicken breasts',
                    '6 slices bacon',
                    '1 cup heavy cream',
                    '1/2 cup parmesan',
                    '2 cloves garlic',
                    'Fresh basil',
                    'Salt and pepper'
                ],
                'instructions' => '1. Cook pasta according to package\n2. Cook bacon until crispy\n3. Cook chicken in bacon fat\n4. Make cream sauce\n5. Add parmesan to sauce\n6. Toss pasta with sauce\n7. Top with bacon and basil',
                'prep_time' => 15,
                'cook_time' => 20,
                'servings' => 4,
                'difficulty' => 'medium',
                'category' => 'Noodles',
                'image_url' => 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800'
            ]
        ];

        foreach ($recipes as $recipe) {
            Recipe::create($recipe);
        }
    }
}

