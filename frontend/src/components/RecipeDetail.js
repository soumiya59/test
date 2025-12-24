import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import instructionsImage from '../assets/images/icons/instructions.png';

const API_URL = process.env.REACT_APP_API_URL || '/api';

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [otherRecipes, setOtherRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`${API_URL}/recipes/${id}`);
        setRecipe(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching recipe:', error);
        setLoading(false);
      }
    };

    const fetchOtherRecipes = async () => {
      try {
        const response = await axios.get(`${API_URL}/recipes`);
        // Exclude current recipe and take 3 others
        const filtered = response.data.filter(r => r.id !== parseInt(id)).slice(0, 3);
        setOtherRecipes(filtered);
      } catch (error) {
        console.error('Error fetching other recipes:', error);
      }
    };
    
    fetchRecipe();
    fetchOtherRecipes();
  }, [id]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: recipe?.title,
        text: recipe?.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="container px-5 py-12 mx-auto max-w-7xl">
          <div className="text-xl text-center text-gray-600">Loading recipe...</div>
        </div>
      </>
    );
  }

  if (!recipe) {
    return (
      <>
        <Header />
        <div className="container px-5 py-12 mx-auto max-w-7xl">
          <div className="text-center">
            <h3 className="mb-4 text-2xl font-bold">Recipe not found</h3>
            <button 
              className="px-6 py-3 text-white bg-black rounded-lg hover:bg-gray-800"
              onClick={() => navigate('/')}
            >
              Back to list
            </button>
          </div>
        </div>
      </>
    );
  }

  // Format date
  const formattedDate = recipe.created_at 
    ? new Date(recipe.created_at).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })
    : new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });

  // Split ingredients into main dish and sauce
  const mainIngredients = recipe.ingredients?.slice(0, Math.ceil(recipe.ingredients.length / 2)) || [];
  const sauceIngredients = recipe.ingredients?.slice(Math.ceil(recipe.ingredients.length / 2)) || [];

  return (
    <>
      <Header />
      
      <div className="container px-5 py-8 mx-auto mt-24 max-w-7xl">
        {/* Title Section - Centered */}
        <div className="mt-8 mb-10">
          <h1 className="my-8 text-4xl font-bold text-black lg:text-5xl">
            {recipe.title}
          </h1>
          
          {/* Author, Recipe Details, and Share Button */}
          <div className="flex flex-col gap-6 mb-8 lg:flex-row lg:items-center lg:justify-between">
            {/* Author Info and Recipe Details - Left */}
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-8">
              {/* Author Info */}
              <div className="flex items-center gap-3">
                <div className="relative flex-shrink-0">
                  <div className="flex items-center justify-center w-10 h-10 text-xs font-bold text-gray-700 bg-gray-300 rounded-full">
                    JS
                  </div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-black">John Smith</div>
                  <div className="text-xs text-gray-600">{formattedDate}</div>
                </div>
              </div>

              {/* Recipe Details - Next to Author */}
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-gray-700 uppercase">PREP TIME</span>
                    <span className="text-sm text-gray-600">{recipe.prep_time} Minutes</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-gray-700 uppercase">COOK TIME</span>
                    <span className="text-sm text-gray-600">{recipe.cook_time} Minutes</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path d="M3 9.75C3 8.231 4.231 7 5.75 7h12.5c1.519 0 2.75 1.231 2.75 2.75 0 1.204-.78 2.249-1.893 2.628C18.784 14.728 16.7 17 12 17s-6.784-2.272-6.107-4.622A2.751 2.751 0 013 9.75zM8.5 19a1.5 1.5 0 003 0" stroke="currentColor" strokeLinejoin="round" />
                  </svg>
                  <span className="text-sm font-semibold text-gray-700">{recipe.category || 'Recipe'}</span>
                </div>
              </div>
            </div>

            {/* Share Button - Right */}
            <button 
              onClick={handleShare}
              className="flex flex-col items-center gap-1 text-gray-700 transition-colors hover:text-black"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-xs font-semibold uppercase">SHARE</span>
            </button>
          </div>
        </div>

        {/* Main Content - Image and Nutrition Info */}
        <div className="grid grid-cols-1 gap-8 mb-8 lg:grid-cols-3">
          {/* Recipe Image with Play Button - Left (2 columns) */}
          <div className="relative lg:col-span-2">
            {recipe.image_url ? (
              <div className="relative w-full h-[500px] lg:h-[600px] rounded-2xl overflow-hidden">
                <img
                  src={recipe.image_url}
                  alt={recipe.title}
                  className="object-cover w-full h-full"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/800x600?text=Recipe';
                  }}
                />
                {/* Play Button Overlay - Centered */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex items-center justify-center w-20 h-20 transition-transform rounded-full shadow-lg cursor-pointer bg-white/90 hover:scale-110">
                    <svg className="w-10 h-10 ml-1 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                    </svg>
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full h-[500px] lg:h-[600px] bg-gray-200 rounded-2xl flex items-center justify-center text-gray-500">
                No Image
              </div>
            )}
          </div>

          {/* Nutrition Information Box - Right (1 column) */}
          <div className="lg:col-span-1">
            <div className="bg-[#E8F5F4] rounded-2xl p-6 h-full">
              <h3 className="mb-6 text-xl font-bold text-black">Nutrition Information</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-gray-300">
                  <span className="text-sm font-medium text-gray-700">Calories</span>
                  <span className="text-sm font-semibold text-black">219.9 kcal</span>
                </div>
                <div className="flex items-center justify-between pb-3 border-b border-gray-300">
                  <span className="text-sm font-medium text-gray-700">Total Fat</span>
                  <span className="text-sm font-semibold text-black">10.7 g</span>
                </div>
                <div className="flex items-center justify-between pb-3 border-b border-gray-300">
                  <span className="text-sm font-medium text-gray-700">Protein</span>
                  <span className="text-sm font-semibold text-black">7.9 g</span>
                </div>
                <div className="flex items-center justify-between pb-3 border-b border-gray-300">
                  <span className="text-sm font-medium text-gray-700">Carbohydrate</span>
                  <span className="text-sm font-semibold text-black">22.3 g</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Cholesterol</span>
                  <span className="text-sm font-semibold text-black">37.4 mg</span>
                </div>
              </div>
            <p className="mt-6 text-sm leading-relaxed text-gray-500">
              adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            </div>
            
            {/* Placeholder Text Below Nutrition Box */}
          </div>
        </div>

        {/* Description/Placeholder Text - Full Width */}
        <div className="mb-12">
          <p className="text-base leading-relaxed text-gray-500">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>

        {/* Ingredients, Directions and Other Recipes Section */}
        <div className="grid grid-cols-1 gap-8 mb-12 lg:grid-cols-3">
          {/* Left Column (2 columns) - Ingredients and Directions */}
          <div className="space-y-8 lg:col-span-2">
            {/* Ingredients Section */}
            <div>
              <h2 className="mb-6 text-3xl font-bold text-black">Ingredients</h2>
              
              {/* For main dish */}
              {mainIngredients.length > 0 && (
                <div className="mb-8">
                  <h3 className="mb-4 text-lg font-semibold text-black">For main dish</h3>
                  <ul className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                    {mainIngredients.map((ingredient, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          id={`ingredient-main-${index}`}
                          className="w-5 h-5 mt-1 text-black border-2 border-gray-300 rounded-full cursor-pointer focus:ring-2 focus:ring-black"
                        />
                        <label
                          htmlFor={`ingredient-main-${index}`}
                          className="flex-1 text-sm leading-relaxed text-black cursor-pointer"
                        >
                          {ingredient || 'Lorem ipsum dolor sit amet'}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* For the sauce */}
              {sauceIngredients.length > 0 && (
                <div>
                  <h3 className="mb-4 text-lg font-semibold text-black">For the sauce</h3>
                  <ul className="space-y-3">
                    {sauceIngredients.map((ingredient, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          id={`ingredient-sauce-${index}`}
                          className="w-5 h-5 mt-1 text-black border-2 border-gray-300 rounded-full cursor-pointer focus:ring-2 focus:ring-black"
                        />
                        <label
                          htmlFor={`ingredient-sauce-${index}`}
                          className="flex-1 text-sm leading-relaxed text-black cursor-pointer"
                        >
                          {ingredient || 'Lorem ipsum dolor sit amet'}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Directions Section */}
            <div>
              <h2 className="mb-6 text-3xl font-bold text-black">Directions</h2>
              
              {/* Split instructions into steps */}
              {(() => {
                // Helper function to clean all newline characters
                const cleanNewlines = (text) => {
                  if (!text) return '';
                  return String(text)
                    .replace(/\r\n/g, ' ')  // Windows line endings
                    .replace(/\r/g, ' ')     // Mac line endings
                    .replace(/\n/g, ' ')      // Unix line endings
                    .replace(/\\n/g, ' ')    // Escaped newlines
                    .replace(/\s+/g, ' ')      // Multiple spaces to single space
                    .trim();
                };
                
                // Get instructions from backend - split by newlines or numbered patterns
                let instructionSteps = [];
                
                if (recipe.instructions) {
                  if (typeof recipe.instructions === 'string') {
                    // Clean the instructions first
                    const cleaned = cleanNewlines(recipe.instructions);
                    
                    // Split by newlines (after cleaning, split by space patterns that indicate steps)
                    // First try splitting by numbered patterns (1., 2., etc.)
                    if (cleaned.match(/\d+\.\s/)) {
                      instructionSteps = cleaned
                        .split(/(?=\d+\.\s)/)
                        .map(step => cleanNewlines(step))
                        .filter(step => step.length > 0);
                    } else {
                      // Fallback: split by common delimiters or use as single step
                      instructionSteps = cleaned.split(/[.!?]\s+/)
                        .map(step => cleanNewlines(step))
                        .filter(step => step.length > 0);
                      
                      if (instructionSteps.length === 0) {
                        instructionSteps = [cleaned];
                      }
                    }
                  } else if (Array.isArray(recipe.instructions)) {
                    instructionSteps = recipe.instructions.map(step => cleanNewlines(step));
                  } else {
                    instructionSteps = [cleanNewlines(String(recipe.instructions))];
                  }
                }
                
                // If no steps found, use placeholder
                if (instructionSteps.length === 0) {
                  instructionSteps = ['Lorem ipsum dolor sit amet'];
                }
                
                return instructionSteps.map((step, index) => {
                  const cleanedStep = cleanNewlines(step);
                  return (
                    <div key={index} className="mb-6">
                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          id={`direction-${index}`}
                          className="w-5 h-5 mt-1 text-black border-2 border-gray-300 rounded-full cursor-pointer focus:ring-2 focus:ring-black"
                        />
                        <div className="flex-1">
                          <h3 className="mb-3 text-lg font-bold text-black">
                            {cleanedStep || `${index + 1}. Lorem ipsum dolor sit amet`}
                          </h3>
                          <p className="mb-4 text-base leading-relaxed text-gray-600">
                            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
                          </p>
                          {/* Show instructions image only for first direction */}
                          {index === 0 && (
                            <div className="mb-4">
                              <img
                                src={instructionsImage}
                                alt="Cooking instructions"
                                className="w-full rounded-2xl"
                                onError={(e) => {
                                  e.target.src = 'https://via.placeholder.com/800x500?text=Cooking+Step';
                                }}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                });
              })()}
            </div>
          </div>

          {/* Other Recipes Section - Right (1 column) */}
          <div className="lg:col-span-1">
            <h2 className="mb-6 text-3xl font-bold text-black">Other Recipe</h2>
            <div className="space-y-6">
              {otherRecipes.map((otherRecipe) => (
                <div
                  key={otherRecipe.id}
                  onClick={() => navigate(`/recipe/${otherRecipe.id}`)}
                  className="flex gap-4 p-4 transition-shadow bg-white shadow-sm cursor-pointer rounded-2xl hover:shadow-md"
                >
                  <div className="flex-shrink-0 w-24 h-24 overflow-hidden rounded-xl">
                    {otherRecipe.image_url ? (
                      <img
                        src={otherRecipe.image_url}
                        alt={otherRecipe.title}
                        className="object-cover w-full h-full"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/100x100?text=Recipe';
                        }}
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full text-xs text-gray-400 bg-gray-200">
                        No Image
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="mb-1 text-base font-bold text-black line-clamp-2">
                      {otherRecipe.title}
                    </h3>
                    <p className="text-sm text-gray-600">By Andreas Paula</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipeDetail;
