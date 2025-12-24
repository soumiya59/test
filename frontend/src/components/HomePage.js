import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import breakfastIcon from '../assets/images/icons/breakfast.png';
import healthyIcon from '../assets/images/icons/healthy.png';
import meatIcon from '../assets/images/icons/meat.png';
import dessertIcon from '../assets/images/icons/desert.png';
import lunchIcon from '../assets/images/icons/lunch.png';
import chocolateIcon from '../assets/images/icons/chocolate.png';
import hotRecipesIcon from '../assets/images/icons/hot_recipes.png';
import kathrynIcon from '../assets/images/icons/kathryn.png';
import likeIcon from '../assets/images/icons/like.png';
import bigAndJuicyImg from '../assets/images/foods/big and juicy.png';
import chickenMeatballImg from '../assets/images/foods/chicken meatball.png';
import freshAndHealthyImg from '../assets/images/foods/fresh and healthy.png';
import freshLimeImg from '../assets/images/foods/fresh lime.png';
import fruityImg from '../assets/images/foods/fruity.png';
import healthyFriedJapaneseImg from '../assets/images/foods/healthi fried japanese.png';
import strawberryImg from '../assets/images/foods/strawberry.png';
import theBestImg from '../assets/images/foods/the best.png';
import theCreamiestImg from '../assets/images/foods/the creamiest.png';
import heroImg from '../assets/images/foods/hero.jpeg';

// Use /api which will be proxied to backend
const API_URL = process.env.REACT_APP_API_URL || '/api';

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      console.log('Fetching recipes from:', `${API_URL}/recipes`);
      const response = await axios.get(`${API_URL}/recipes`);
      console.log('Recipes fetched:', response.data.length, 'recipes');
      // Sort recipes by ID descending to get most recent first
      const sortedRecipes = response.data.sort((a, b) => b.id - a.id);
      console.log('Sorted recipes, first 3 IDs:', sortedRecipes.slice(0, 3).map(r => r.id));
      setRecipes(sortedRecipes);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching recipes:', error);
      console.error('Error details:', error.response?.data || error.message);
      setLoading(false);
    }
  };

  // Category icons mapping
  const categoryIcons = {
    'Breakfast': { emoji: '🍙', image: breakfastIcon },
    'Healthy': { emoji: '🌿', image: healthyIcon },
    'Meat': { emoji: '🥩', image: meatIcon },
    'Dessert': { emoji: '🍰', image: dessertIcon },
    'Lunch': { emoji: '🥪', image: lunchIcon },
    'Chocolate': { emoji: '🍫', image: chocolateIcon },
  };

  // Use the correct categories from the mapping
  const defaultCategories = ['Breakfast', 'Healthy', 'Meat', 'Dessert', 'Lunch', 'Chocolate'];
  const displayCategories = defaultCategories;

  // Function to get food image based on recipe title
  const getFoodImage = (recipeTitle) => {
    if (!recipeTitle) return null;
    
    const titleLower = recipeTitle.toLowerCase();
    
    // Map recipe titles to food images
    if (titleLower.includes('big and juicy') || titleLower.includes('wagyu') || titleLower.includes('burger')) {
      return bigAndJuicyImg;
    }
    if (titleLower.includes('chicken meatball') || titleLower.includes('meatball')) {
      return chickenMeatballImg;
    }
    if (titleLower.includes('fresh and healthy') || titleLower.includes('mixed mayonnaise salad')) {
      return freshAndHealthyImg;
    }
    if (titleLower.includes('fresh lime') || titleLower.includes('lime roasted salmon')) {
      return freshLimeImg;
    }
    if (titleLower.includes('fruity') || titleLower.includes('orange & blueberry') || titleLower.includes('orange and blueberry')) {
      return fruityImg;
    }
    if (titleLower.includes('healthy fried japanese') || titleLower.includes('japanese fried rice')) {
      return healthyFriedJapaneseImg;
    }
    if (titleLower.includes('strawberry') || titleLower.includes('oatmeal pancake')) {
      return strawberryImg;
    }
    if (titleLower.includes('the best') || titleLower.includes('one pot chicken')) {
      return theBestImg;
    }
    if (titleLower.includes('the creamiest') || titleLower.includes('creamy chicken and bacon pasta')) {
      return theCreamiestImg;
    }
    
    return null;
  };

  if (loading) {
    return (
      <div className="container px-5 py-12 mx-auto max-w-7xl">
        <div className="text-xl text-center text-gray-600">Loading recipes...</div>
      </div>
    );
  }

  // Get recipes for "Try this delicious recipe" section (skip first one which is in hero)
  const moreRecipes = recipes.length > 1 ? recipes.slice(1, 9) : [];
  
  console.log('Total recipes:', recipes.length);
  console.log('More recipes to display:', moreRecipes.length);
  console.log('moreRecipes array:', moreRecipes);
  if (moreRecipes.length > 0) {
    console.log('First recipe in moreRecipes:', moreRecipes[0]?.title);
  } else {
    console.warn('⚠️ moreRecipes is empty! recipes array:', recipes);
  }

  return (
    <>
      {/* Hero Section */}
        <section className="relative py-16 mb-16 bg-white">
          <div className="container px-5 mx-auto max-w-7xl">
            <div className="grid items-stretch grid-cols-1 gap-0 lg:grid-cols-2">
              {/* Left Section - Light Mint Green Background with rounded corners */}
              <div className="bg-[#E8F5F4] rounded-l-3xl p-8 lg:p-12 relative overflow-visible">
                {/* Hot Recipes Badge - Top Left */}
                <span className="inline-flex items-center px-4 py-3 mb-6 text-xs font-semibold bg-white rounded-xl">
                  <img 
                    src={hotRecipesIcon} 
                    alt="Hot Recipes"
                    className="object-contain w-3 h-3 mr-1.5"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'inline';
                    }}
                  />
                  <span className="hidden mr-2 ">
                    <img src="/assets/images/icons/hot_recipes.png" alt="Fire" />
                  </span>
                  Hot Recipes
                </span>
                
                {/* Main Title */}
                <h1 className="mb-4 text-4xl font-bold leading-tight text-black lg:text-5xl">Spicy and delicious chicken wings</h1>
                
                {/* Description */}
                <p className="mb-6 text-base leading-relaxed text-gray-600">
                  Lorem ipsum dolor sit amet, consectetuipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqut enim ad minim
                </p>
                
                {/* Recipe Meta Tags */}
                <div className="flex flex-wrap gap-3 mb-6">
                  <span className="inline-flex items-center text-sm text-gray-700">
                    <svg className="w-4 h-4 mr-1.5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    30 Minutes
                  </span>
                  <span className="inline-flex items-center text-sm text-gray-700">
                    {/* Food Category SVG icon */}
                    <svg className="w-4 h-4 mr-1.5 text-gray-600" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path d="M3 9.75C3 8.231 4.231 7 5.75 7h12.5c1.519 0 2.75 1.231 2.75 2.75 0 1.204-.78 2.249-1.893 2.628C18.784 14.728 16.7 17 12 17s-6.784-2.272-6.107-4.622A2.751 2.751 0 013 9.75zM8.5 19a1.5 1.5 0 003 0" stroke="currentColor" strokeLinejoin="round" />
                    </svg>
                    chicken
                  </span>
                </div>
                {/* Author Info and View Recipe Button in a flex container */}
                <div className="flex flex-col items-center justify-between gap-6 mb-8 mt-36 ju sm:flex-row">
                  <div className="flex items-center gap-3">
                    <div className="relative flex-shrink-0">
                      <img 
                        src={kathrynIcon} 
                        alt="Author"
                        className="object-cover w-10 h-10 border-2 border-white rounded-full"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center hidden w-10 h-10 text-xs font-bold text-white bg-gray-500 rounded-full">KM</div>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-black">Kathryn Murphy</div>
                      <div className="text-xs text-gray-600">12 November 2021</div>
                    </div>
                  </div>

                  <button 
                    className="flex items-center gap-2 px-8 py-4 mt-4 text-base font-semibold text-white transition-colors bg-black rounded-lg hover:bg-gray-800 sm:mt-0"
                    onClick={() => navigate(`/recipes`)}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                    </svg>
                    View Recipes
                  </button>
                </div>
                
                {/* Handpicked Recipes Badge - Top Right, overlapping edge */}
                <div className="absolute z-30 flex flex-col items-center justify-center w-24 h-24 bg-black rounded-full shadow-2xl top-6 -right-12 lg:top-8 lg:-right-16 lg:w-26 lg:h-26">
                  <div className="flex items-center justify-center w-14 h-14 mb-1.5 bg-white rounded-full lg:w-18 lg:h-18">
                    <img 
                      src={likeIcon} 
                      alt="Like"
                      className="object-contain w-7 h-7 lg:w-9 lg:h-9"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'block';
                      }}
                    />
                    <span className="hidden text-xl lg:text-2xl">👍</span>
                  </div>
                  
                </div>
              </div>
              
              {/* Right Section - Food Image with rounded corners */}
              <div className="relative overflow-hidden bg-white rounded-3xl">
                {/* Time Badge on Image - Top Right */}
                
                <div className="relative w-full h-full min-h-[500px] lg:min-h-[600px]">
                  {(() => {
                    const imageSrc = heroImg;
                    if (imageSrc) {
                      return (
                        <img
                          src={imageSrc}
                          alt="Spicy and delicious chicken wings"
                          className="object-cover w-full h-full rounded-3xl"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/600x500?text=Recipe';
                          }}
                        />
                      );
                    }
                    return (
                      <div className="flex items-center justify-center w-full h-full text-gray-500 bg-gray-200 rounded-3xl">No Image</div>
                    );
                  })()}
                </div>
              </div>
            </div>
          </div>
        </section>

      <div className="container px-5 mx-auto max-w-7xl">
        {/* Categories Section */}
        <section className="my-16">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <h2 className="text-4xl font-bold text-black">Categories</h2>
            <button className="px-6 py-3 font-semibold text-black transition-colors bg-[#E8F5F4] rounded-md hover:bg-[#d0e8e6]">
              View All Categories
            </button>
          </div>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
            {displayCategories.map((category) => {
              const iconData = categoryIcons[category] || { emoji: '🍽️', image: null };
              
              // Background colors for each category matching Figma design
              const categoryColors = {
                'Breakfast': 'bg-gradient-to-t from-[#E8F5F4] to-white', // Very light green/blue
                'Healthy': 'bg-gradient-to-t from-[#D4EDDA] to-white', // Light green gradient
                'Meat': 'bg-gradient-to-t from-[#F8D7DA] to-white', // Light pink gradient
                'Dessert': 'bg-gradient-to-t from-[#FFF3CD] to-white', // Light yellow gradient
                'Lunch': 'bg-gradient-to-t from-[#F5F5F5] to-white', // Very light gray gradient
                'Chocolate': 'bg-gradient-to-t from-[#E9ECEF] to-white', // Light gray gradient
              };
              
              const bgColor = categoryColors[category] || 'bg-white';
              
              return (
                <div
                  key={category}
                  className={`p-6 text-center transition-all ${bgColor} shadow-sm cursor-pointer rounded-2xl hover:shadow-md hover:-translate-y-1`}
                  onClick={() => navigate(`/?category=${category}`)}
                >
                  <div className="mb-4 flex items-center justify-center min-h-[100px]">
                    {iconData.image ? (
                      <img
                        src={iconData.image}
                        alt={category}
                        className="object-contain w-24 h-24"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'block';
                        }}
                      />
                    ) : (
                      <span className="text-7xl">{iconData.emoji}</span>
                    )}
                  </div>
                  <div className="text-base font-semibold text-black">{category}</div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Simple and Tasty Recipes Section */}
        <section className="my-16">
          <div className="mb-8">
            <h2 className="mb-2 text-4xl font-bold text-black">Simple and tasty recipes</h2>
            <p className="max-w-2xl text-base leading-relaxed text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 mt-8 md:grid-cols-2 lg:grid-cols-3">
            {/* First 4 recipes */}
            {recipes.slice(1, 5).map((recipe) => {
              const foodImage = getFoodImage(recipe.title);
              const imageSrc = foodImage || recipe.image_url;
              
              return (
              <div
                key={recipe.id}
                className="overflow-hidden transition-all bg-white shadow-md cursor-pointer rounded-2xl hover:shadow-xl hover:-translate-y-1"
                onClick={() => navigate(`/recipe/${recipe.id}`)}
              >
                <div className="relative w-full h-64 overflow-hidden">
                  {imageSrc ? (
                    <img
                      src={imageSrc}
                      alt={recipe.title}
                      className="object-cover w-full h-full"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/400x250?text=Recipe';
                      }}
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full text-gray-500 bg-gray-200">No Image</div>
                  )}
                  <button className="absolute flex items-center justify-center w-10 h-10 transition-transform bg-white border border-gray-200 rounded-full top-4 right-4 hover:scale-110">
                    <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
                <div className="p-6 bg-[#E8F5F4]">
                  <h3 className="mb-4 text-xl font-bold leading-snug text-black">{recipe.title}</h3>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <span className="inline-flex items-center">
                      <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                      {recipe.prep_time + recipe.cook_time} Minutes
                    </span>
                    {recipe.category && (
                      <span className="inline-flex items-center">
                        <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                        </svg>
                        {recipe.category}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
            })}
            
            {/* Promotional Card - Center (5th position) */}
            <div className="bg-[#2d8659] text-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col items-center justify-center p-8 min-h-[300px]">
              <h3 className="mb-6 text-2xl font-bold text-center">Don't forget to eat healthy food</h3>
              <div className="flex items-center justify-center w-32 h-32 mb-6 overflow-hidden bg-white rounded-full">
                <span className="text-6xl">🥗</span>
              </div>
              <div className="text-sm font-medium">www.foodieland.com</div>
            </div>
            
            {/* Last 4 recipes */}
            {recipes.slice(5, 9).map((recipe) => {
              const foodImage = getFoodImage(recipe.title);
              const imageSrc = foodImage || recipe.image_url;
              
              return (
              <div
                key={recipe.id}
                className="overflow-hidden transition-all bg-white shadow-md cursor-pointer rounded-2xl hover:shadow-xl hover:-translate-y-1"
                onClick={() => navigate(`/recipe/${recipe.id}`)}
              >
                <div className="relative w-full h-64 overflow-hidden">
                  {imageSrc ? (
                    <img
                      src={imageSrc}
                      alt={recipe.title}
                      className="object-cover w-full h-full"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/400x250?text=Recipe';
                      }}
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full text-gray-500 bg-gray-200">No Image</div>
                  )}
                  <button className="absolute flex items-center justify-center w-10 h-10 transition-transform bg-white border border-gray-200 rounded-full top-4 right-4 hover:scale-110">
                    <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
                <div className="p-6 bg-[#E8F5F4]">
                  <h3 className="mb-4 text-xl font-bold leading-snug text-black">{recipe.title}</h3>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <span className="inline-flex items-center">
                      <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                      {recipe.prep_time + recipe.cook_time} Minutes
                    </span>
                    {recipe.category && (
                      <span className="inline-flex items-center">
                        <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                        </svg>
                        {recipe.category}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
            })}
          </div>
        </section>

        {/* Become a Chef Section */}
        <section className="py-16 my-16 ">
          <div className="container px-5 mx-auto max-w-7xl">
            <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
              <div>
                <h2 className="mb-6 text-4xl font-bold leading-tight text-black">Everyone can became chef on their own kitchen.</h2>
                <p className="mb-8 text-lg leading-relaxed text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <button className="px-8 py-4 text-base font-semibold text-white transition-colors bg-black rounded-md hover:bg-gray-800">
                  Learn More
                </button>
              </div>
              <div className="relative bg-gradient-to-t from-[#E8F5F4] to-white  rounded-2xl p-12 min-h-[400px] flex items-center justify-center">
                <div className="z-10 text-8xl">👨‍🍳</div>
                <div className="absolute inset-0">
                  <span className="absolute text-5xl top-[10%] left-[10%] animate-bounce" style={{ animationDelay: '0s' }}>🥩</span>
                  <span className="absolute text-5xl top-[20%] right-[15%] animate-bounce" style={{ animationDelay: '0.5s' }}>🧅</span>
                  <span className="absolute text-5xl bottom-[15%] left-[20%] animate-bounce" style={{ animationDelay: '1s' }}>🥬</span>
                  <span className="absolute text-5xl bottom-[10%] right-[10%] animate-bounce" style={{ animationDelay: '1.5s' }}>🍅</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Instagram Section */}
        <section className="my-16 text-center">
          <div className="mb-8">
            <h2 className="mb-2 text-4xl font-bold text-black">Check out foodieland on instagram</h2>
            <p className="max-w-2xl mx-auto text-base leading-relaxed text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6 my-8 md:grid-cols-4">
            {[1, 2, 3, 4].map((item, index) => {
              const recipe = recipes[index];
              return (
                <div key={index} className="overflow-hidden bg-white shadow-md rounded-xl">
                  <div className="flex items-center gap-3 p-4">
                    <div className="flex items-center justify-center text-xs font-bold text-white rounded-full w-9 h-9 bg-primary">FL</div>
                    <div className="text-sm font-semibold text-black">foodieland</div>
                  </div>
                  <div className="w-full h-64 overflow-hidden">
                    <img
                      src={recipe?.image_url || `https://via.placeholder.com/300x300?text=Post+${index + 1}`}
                      alt={`Instagram post ${index + 1}`}
                      className="object-cover w-full h-full"
                      onError={(e) => {
                        e.target.src = `https://via.placeholder.com/300x300?text=Post+${index + 1}`;
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-between p-4">
                    <div className="text-xs text-gray-600">Today, 2023</div>
                    <div className="flex gap-4">
                      <span className="text-xl transition-transform cursor-pointer hover:scale-110">❤️</span>
                      <span className="text-xl transition-transform cursor-pointer hover:scale-110">💬</span>
                      <span className="text-xl transition-transform cursor-pointer hover:scale-110">🔖</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-8">
            <button className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white transition-colors bg-black rounded-md hover:bg-gray-800">
              <span>📷</span>
              Visit Our Instagram
            </button>
          </div>
        </section>

        {/* Try This Delicious Recipe Section */}
        <section className="my-16">
          <div className="mb-8">
            <h2 className="mb-2 text-4xl font-bold text-black">Try this delicious recipe to made your day</h2>
            <p className="max-w-2xl text-base leading-relaxed text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          {moreRecipes.length === 0 ? (
            <div className="py-12 text-center text-gray-600">
              <p>No recipes available at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 mt-8 md:grid-cols-2 lg:grid-cols-4">
              {moreRecipes.map((recipe) => {
                const foodImage = getFoodImage(recipe.title);
                const imageSrc = foodImage || recipe.image_url;
                
                return (
                <div
                  key={recipe.id}
                  className="overflow-hidden transition-all bg-white shadow-md cursor-pointer rounded-2xl hover:shadow-xl hover:-translate-y-1"
                  onClick={() => navigate(`/recipe/${recipe.id}`)}
                >
                  <div className="relative w-full h-64 overflow-hidden">
                    {imageSrc ? (
                      <img
                        src={imageSrc}
                        alt={recipe.title}
                        className="object-cover w-full h-full"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/400x250?text=Recipe';
                        }}
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full text-gray-500 bg-gray-200">No Image</div>
                    )}
                    <button className="absolute flex items-center justify-center w-10 h-10 text-xl transition-transform rounded-full top-4 right-4 bg-white/90 hover:scale-110">
                      <span>❤️</span>
                    </button>
                  </div>
                  <div className="p-6">
                    <h3 className="mb-4 text-xl font-bold leading-snug text-black">{recipe.title}</h3>
                    <div className="flex flex-wrap gap-6 text-sm text-gray-600">
                      <span>{recipe.prep_time + recipe.cook_time} Minutes</span>
                      {recipe.category && <span>{recipe.category}</span>}
                    </div>
                  </div>
                </div>
              );
              })}
            </div>
          )}
        </section>

        {/* Newsletter Section */}
        <section className="bg-gradient-to-br from-[#E8F5F4] to-primary py-16 my-16 relative overflow-hidden">
          <div className="container px-5 mx-auto max-w-7xl">
            <div className="relative z-10 max-w-2xl mx-auto text-center">
              <h2 className="mb-4 text-4xl font-bold text-black">Deliciousness to your inbox</h2>
              <p className="mb-8 text-lg leading-relaxed text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <div className="flex flex-col max-w-lg gap-4 mx-auto sm:flex-row">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-4 text-base bg-white border-2 border-white rounded-md"
                />
                <button className="px-8 py-4 text-base font-semibold text-white transition-colors bg-black rounded-md hover:bg-gray-800 whitespace-nowrap">
                  Subscribe Now
                </button>
              </div>
            </div>
            {/* Decorations */}
            <div className="absolute inset-0 pointer-events-none">
              <span className="absolute text-6xl opacity-20 top-[10%] left-[5%]">🍅</span>
              <span className="absolute text-6xl opacity-20 top-[20%] left-[10%]">🍋</span>
              <span className="absolute text-6xl opacity-20 top-[30%] left-[8%]">🌿</span>
              <span className="absolute text-6xl opacity-20 top-[15%] right-[5%]">🥗</span>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default HomePage;

