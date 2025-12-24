import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';
import Header from './Header';

const API_URL = process.env.REACT_APP_API_URL || '/api';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecipes();
    fetchCategories();
  }, []);

  useEffect(() => {
    filterRecipes();
  }, [searchTerm, categoryFilter, difficultyFilter, recipes]);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get(`${API_URL}/recipes`);
      setRecipes(response.data);
      console.log(response.data);
      setFilteredRecipes(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching recipes:', error);
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_URL}/recipes/categories`);
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const filterRecipes = () => {
    let filtered = [...recipes];

    if (searchTerm) {
      filtered = filtered.filter(recipe =>
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter) {
      filtered = filtered.filter(recipe => recipe.category === categoryFilter);
    }

    if (difficultyFilter) {
      filtered = filtered.filter(recipe => recipe.difficulty === difficultyFilter);
    }

    setFilteredRecipes(filtered);
  };

  const displayRecipes = filteredRecipes;

  if (loading) {
    return (
      <>
        <Header />
        <div className="container px-5 py-8 mx-auto mt-24 max-w-7xl">
          <div className="text-center text-gray-600">Loading recipes...</div>
        </div>
      </>
    );
  }

  return (
    <>
    <Header />
      <div className="container px-5 py-8 mx-auto mt-24 max-w-7xl">
        {/* Recipes Section */}
        <section className="mt-16 mb-12">
          <div className="mb-8 text-center">
            <h2 className="mb-2 text-4xl font-bold text-black">Simple and tasty recipes</h2>
            <p className="text-gray-600">Discover delicious recipes for every occasion</p>
          </div>

          {/* Modern Search and Filters */}
          <div className="mb-8">
            {/* Search Bar */}
            <div className="relative mb-6">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                className="w-full py-4 pl-12 pr-4 text-gray-700 placeholder-gray-400 transition-colors duration-200 bg-white border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-black"
                placeholder="Search recipes by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 transition-colors hover:text-gray-600"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Filters */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-wrap gap-4">
                {/* Category Filter */}
                <div className="relative flex-1 min-w-[200px] md:flex-initial">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                  </div>
                  <select
                    className="w-full py-3 pl-12 pr-10 text-gray-700 transition-colors duration-200 bg-white border-2 border-gray-200 appearance-none cursor-pointer rounded-xl focus:outline-none focus:border-black"
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                  >
                    <option value="">All Categories</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* Difficulty Filter */}
                <div className="relative flex-1 min-w-[200px] md:flex-initial">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <select
                    className="w-full py-3 pl-12 pr-10 text-gray-700 transition-colors duration-200 bg-white border-2 border-gray-200 appearance-none cursor-pointer rounded-xl focus:outline-none focus:border-black"
                    value={difficultyFilter}
                    onChange={(e) => setDifficultyFilter(e.target.value)}
                  >
                    <option value="">All Difficulties</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Clear Filters Button */}
              {(searchTerm || categoryFilter || difficultyFilter) && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setCategoryFilter('');
                    setDifficultyFilter('');
                  }}
                  className="flex items-center gap-2 px-6 py-3 text-sm font-semibold text-gray-700 transition-colors duration-200 bg-gray-100 rounded-xl hover:bg-gray-200"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Clear Filters
                </button>
              )}
            </div>

            {/* Active Filters Display */}
            {(searchTerm || categoryFilter || difficultyFilter) && (
              <div className="flex flex-wrap items-center gap-2 mt-4">
                <span className="text-sm font-medium text-gray-600">Active filters:</span>
                {searchTerm && (
                  <span className="inline-flex items-center gap-2 px-3 py-1 text-sm font-medium text-black bg-[#E8F5F4] rounded-full">
                    Search: "{searchTerm}"
                    <button
                      onClick={() => setSearchTerm('')}
                      className="text-gray-600 hover:text-black"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                )}
                {categoryFilter && (
                  <span className="inline-flex items-center gap-2 px-3 py-1 text-sm font-medium text-black bg-[#E8F5F4] rounded-full">
                    Category: {categoryFilter}
                    <button
                      onClick={() => setCategoryFilter('')}
                      className="text-gray-600 hover:text-black"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                )}
                {difficultyFilter && (
                  <span className="inline-flex items-center gap-2 px-3 py-1 text-sm font-medium text-black bg-[#E8F5F4] rounded-full">
                    Difficulty: {difficultyFilter}
                    <button
                      onClick={() => setDifficultyFilter('')}
                      className="text-gray-600 hover:text-black"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                )}
              </div>
            )}
          </div>

          {displayRecipes.length === 0 ? (
            <div className="empty-state">
              <h3>No recipes found</h3>
              <p>Try adjusting your search criteria</p>
            </div>
          ) : (
            <div className="recipes-grid">
              {displayRecipes.map(recipe => (
                <div
                  key={recipe.id}
                  className="recipe-card"
                  onClick={() => navigate(`/recipe/${recipe.id}`)}
                >
                  <div className="recipe-image-wrapper">
                    {recipe.image_url ? (
                      <img
                        src={recipe.image_url}
                        alt={recipe.title}
                        className="recipe-image"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/400x250?text=Recipe';
                        }}
                      />
                    ) : (
                      <div className="recipe-image-placeholder">No Image</div>
                    )}
                  </div>
                  <div className="recipe-card-content">
                    <h3 className="recipe-title">{recipe.title}</h3>
                    <div className="recipe-meta">
                      <span className="recipe-meta-item">
                        <span className="icon">⏱️</span>
                        {recipe.prep_time + recipe.cook_time} Minutes
                      </span>
                      {recipe.category && (
                        <span className="recipe-meta-item">
                          <span className="icon">🍴</span>
                          {recipe.category}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default RecipeList;

