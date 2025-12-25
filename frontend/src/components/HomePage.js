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
import chefImg from '../assets/images/chef.png';
import leftNewsletterImg from '../assets/images/left.png';
import rightNewsletterImg from '../assets/images/right.png';
import Header from './Header';

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
      const response = await axios.get(`${API_URL}/recipes`, {
        params: { per_page: 100 } // Get more recipes for homepage
      });
      // Handle paginated or non-paginated response
      const recipesData = response.data.data || response.data;
      // Sort recipes by ID descending to get most recent first
      const sortedRecipes = recipesData.sort((a, b) => b.id - a.id);
      setRecipes(sortedRecipes);
      setLoading(false);
    } catch (error) {
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

  return (
    <>
    <Header />
      {/* Hero Section */}
        <section className="relative py-16 mb-16 bg-white">
          <div className="container px-5 mx-auto max-w-7xl">
            <div className="grid items-stretch grid-cols-1 gap-0 lg:grid-cols-2">
              {/* Left Section - Light Mint Green Background with rounded corners */}
              <div className="bg-[#E7FAFE] rounded-l-3xl p-8 lg:p-12 relative overflow-visible">
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
                      <div className="absolute inset-0 hidden items-center justify-center w-10 h-10 text-xs font-bold text-white bg-gray-500 rounded-full">KM</div>
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
                <div className="absolute z-30 top-6 -right-12 lg:top-8 lg:-right-16">
                  <svg 
                    width="140" 
                    height="140" 
                    viewBox="0 0 140 140" 
                    className="drop-shadow-2xl"
                  >
                    <defs>
                      {/* Path for text along the top curve - middle of black ring */}
                      <path 
                        id="textPathTop" 
                        d="M 25,70 A 45,45 0 0,1 115,70"
                      />
                      {/* Mask to create black ring */}
                      <mask id="ringMask">
                        <rect width="140" height="140" fill="white"/>
                        <circle cx="70" cy="70" r="35" fill="black"/>
                      </mask>
                    </defs>
                    
                    {/* Black ring - outer circle with mask to cut inner circle */}
                    <circle 
                      cx="70" 
                      cy="70" 
                      r="55" 
                      fill="black"
                      mask="url(#ringMask)"
                    />
                    
                    {/* Text along the top curve of black ring */}
                    <text 
                      fill="white" 
                      fontSize="8" 
                      fontWeight="bold" 
                      letterSpacing="1.5"
                    >
                      <textPath 
                        href="#textPathTop" 
                        startOffset="50%"
                        textAnchor="middle"
                      >
                        HANDPICKED RECIPES
                      </textPath>
                    </text>
                    
                    {/* Vertical separator lines at the bottom of black ring */}
                    {[...Array(20)].map((_, i) => {
                      // Angles from 0° (right) to 180° (left) - bottom half
                      const angle = (i * 9) * (Math.PI / 180);
                      if (angle > 0 && angle < Math.PI) {
                        const x1 = 70 + 35 * Math.cos(angle);
                        const y1 = 70 + 35 * Math.sin(angle);
                        const x2 = 70 + 55 * Math.cos(angle);
                        const y2 = 70 + 55 * Math.sin(angle);
                        return (
                          <line
                            key={i}
                            x1={x1}
                            y1={y1}
                            x2={x2}
                            y2={y2}
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        );
                      }
                      return null;
                    })}
                    
                    {/* White circle in center */}
                    <circle 
                      cx="70" 
                      cy="70" 
                      r="30" 
                      fill="white"
                    />
                    
                    {/* Like icon in center */}
                    <foreignObject x="50" y="50" width="40" height="40">
                      <div className="flex items-center justify-center w-full h-full">
                        <img 
                          src={likeIcon} 
                          alt="Like"
                          className="object-contain w-8 h-8"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            const fallback = document.createElement('span');
                            fallback.textContent = '👍';
                            fallback.className = 'text-2xl';
                            e.target.parentElement.appendChild(fallback);
                          }}
                        />
                      </div>
                    </foreignObject>
                  </svg>
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
            <button className="px-6 py-3 font-semibold text-black transition-colors bg-[#E7FAFE] rounded-md hover:bg-[#d0f0f5]">
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
                <div className="p-6 bg-[#E7FAFE]">
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
                <div className="p-6 bg-[#E7FAFE]">
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
        <section className="">
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
              <div className="relative overflow-hidden  rounded-2xl min-h-[500px] lg:min-h-[600px] flex items-center justify-center">
                <img
                  src={chefImg}
                  alt="Chef with plate"
                  className="object-contain w-full h-full p-8"
                  onError={(e) => {
                    // Fallback to placeholder if image not found
                    e.target.src = 'https://via.placeholder.com/600x600?text=Chef+Image';
                  }}
                />
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
          <div className="grid grid-cols-1 gap-6 my-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                image: freshAndHealthyImg,
                carousel: '1/9',
                caption: 'The vegetables dishes need to have certain vitamin for this people',
                date: 'September 10'
              },
              {
                image: strawberryImg,
                carousel: '1/3',
                caption: 'Sweet food can bring someon into happiness long as they can\'t eat to mu',
                date: 'September 19'
              },
              {
                image: healthyFriedJapaneseImg,
                carousel: '1/3',
                caption: 'What are you doing before start cooking? prepare the foo\'s or ingredients?',
                date: 'September 19'
              },
              {
                image: bigAndJuicyImg,
                carousel: '1/3',
                caption: 'Steak never be wrong, It\'s suitable for you who want romantic dinner',
                date: 'September 19'
              }
            ].map((post, index) => (
              <div key={index} className="overflow-hidden bg-white border border-gray-200 rounded-lg shadow-sm">
                {/* Header */}
                <div className="flex items-center justify-between p-3 border-b border-gray-200">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-8 h-8 text-xs font-bold text-white rounded-full bg-gradient-to-br from-purple-500 to-pink-500">FL</div>
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-semibold text-black">Foodieland.</span>
                        <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="text-xs text-gray-600">Tokyo, Japan</div>
                    </div>
                  </div>
                </div>
                
                {/* Image with carousel indicator */}
                <div className="relative w-full overflow-hidden bg-gray-100 aspect-square">
                  <img
                    src={post.image}
                    alt={`Instagram post ${index + 1}`}
                    className="object-cover w-full h-full"
                    onError={(e) => {
                      e.target.src = `https://via.placeholder.com/400x400?text=Post+${index + 1}`;
                    }}
                  />
                  {/* Carousel indicator */}
                  <div className="absolute px-2 py-1 text-xs text-white rounded top-2 right-2 bg-black/60">
                    {post.carousel}
                  </div>
                </div>
                
                {/* Footer */}
                <div className="p-3">
                  {/* Icons */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-4">
                      <svg className="w-6 h-6 text-black transition-colors cursor-pointer hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      <svg className="w-6 h-6 text-black transition-colors cursor-pointer hover:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      <svg className="w-6 h-6 text-black transition-colors cursor-pointer hover:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.885 12.938 9 12.482 9 12c0-.482-.115-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                      </svg>
                    </div>
                    <svg className="w-6 h-6 text-black transition-colors cursor-pointer hover:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                  </div>
                  
                  {/* Likes */}
                  <div className="mb-2">
                    <span className="text-sm font-semibold text-black">Liked by <span className="font-bold">craig_love</span> and <span className="font-bold">44,686</span> others</span>
                  </div>
                  
                  {/* Caption */}
                  <div className="mb-2 text-left">
                    <span className="text-sm font-semibold text-black">Foodieland. Foodieland. </span>
                    <span className="text-sm text-gray-800">{post.caption}</span>
                  </div>
                  
                  {/* Date */}
                  <div className="text-xs text-left text-gray-500">{post.date}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <button className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white transition-colors bg-black rounded-md hover:bg-gray-800">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
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
        <section className="bg-[#E7FAFE] py-16 my-16 relative overflow-visible rounded-3xl">
          <div className="container relative px-5 mx-auto max-w-7xl">
            <div className="relative z-10 max-w-2xl mx-auto mb-8 text-center">
              <h2 className="mb-4 text-4xl font-bold text-black">Deliciousness to your inbox</h2>
              <p className="mb-8 text-base leading-relaxed text-gray-600">
                Lorem ipsum dolor sit amet, consectetuipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqut enim ad minim
              </p>
              <div className="flex flex-col max-w-lg gap-4 mx-auto sm:flex-row">
                <input
                  type="email"
                  placeholder="Your email address..."
                  className="flex-1 px-4 py-4 text-base bg-white border-2 border-white rounded-lg"
                />
                <button className="px-8 py-4 text-base font-semibold text-white transition-colors bg-black rounded-lg hover:bg-gray-800 whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          
          {/* Decorative Images - Positioned at bottom of section */}
          {/* Left side - Salad ingredients scattered */}
          <div className="absolute bottom-0 left-0 z-0 pointer-events-none">
            <img
              src={leftNewsletterImg}
              alt="Salad ingredients"
              className="object-contain"
              style={{ width: '256px', height: 'auto' }}
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
          
          {/* Right side - Salad bowl */}
          <div className="absolute bottom-0 right-0 z-0 pointer-events-none">
            <img
              src={rightNewsletterImg}
              alt="Fresh salad bowl"
              className="object-contain"
              style={{ width: '224px', height: 'auto' }}
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
        </section>
      </div>
    </>
  );
};

export default HomePage;

