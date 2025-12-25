import React, { useState, useEffect, useLayoutEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';
import Header from './Header';

const API_URL = process.env.REACT_APP_API_URL || '/api';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    per_page: 12,
    total: 0
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('');
  const [sortBy, setSortBy] = useState('created_at');
  const [sortOrder, setSortOrder] = useState('desc');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const searchTimeoutRef = useRef(null);
  const searchInputRef = useRef(null);

  // Debounce search term - update debouncedSearchTerm after user stops typing
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500); // 500ms delay

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchTerm]);

  // Track if input should maintain focus
  const shouldMaintainFocusRef = useRef(false);
  const cursorPositionRef = useRef(null);
  const blurTimeoutRef = useRef(null);

  // Store focus state and cursor position before state updates
  const handleSearchChange = (e) => {
    const input = e.target;
    shouldMaintainFocusRef.current = document.activeElement === input;
    cursorPositionRef.current = input.selectionStart;
    setSearchTerm(e.target.value);
  };

  // Track focus events to know when user is actively using the input
  const handleSearchFocus = () => {
    shouldMaintainFocusRef.current = true;
    // Clear any pending blur timeout
    if (blurTimeoutRef.current) {
      clearTimeout(blurTimeoutRef.current);
      blurTimeoutRef.current = null;
    }
  };

  const handleSearchBlur = () => {
    // Delay clearing the flag to allow re-render to restore focus if needed
    blurTimeoutRef.current = setTimeout(() => {
      // Only clear if input is still not focused (user clicked away intentionally)
      if (document.activeElement !== searchInputRef.current) {
        shouldMaintainFocusRef.current = false;
      }
    }, 100);
  };

  // Restore focus and cursor position after every render if input should maintain focus
  useLayoutEffect(() => {
    if (shouldMaintainFocusRef.current && searchInputRef.current) {
      const input = searchInputRef.current;
      // Check if input lost focus due to re-render
      if (document.activeElement !== input) {
        input.focus();
        // Restore cursor position
        if (cursorPositionRef.current !== null && cursorPositionRef.current <= input.value.length) {
          input.setSelectionRange(cursorPositionRef.current, cursorPositionRef.current);
        } else if (input.value.length > 0) {
          // If position is invalid, place cursor at end
          input.setSelectionRange(input.value.length, input.value.length);
        }
      }
    }
  });

  const fetchRecipes = useCallback(async (page = 1) => {
    try {
      setLoading(true);
      const params = {
        page,
        per_page: 12
      };

      if (debouncedSearchTerm) {
        params.search = debouncedSearchTerm;
      }
      if (categoryFilter) {
        params.category = categoryFilter;
      }
      if (difficultyFilter) {
        params.difficulty = difficultyFilter;
      }
      if (sortBy) {
        params.sort_by = sortBy;
      }
      if (sortOrder) {
        params.sort_order = sortOrder;
      }

      const response = await axios.get(`${API_URL}/recipes`, { params });
      
      // Handle paginated response
      if (response.data.data) {
        // Laravel pagination format
        setRecipes(response.data.data);
        setPagination({
          current_page: response.data.current_page,
          last_page: response.data.last_page,
          per_page: response.data.per_page,
          total: response.data.total
        });
      } else {
        // Fallback for non-paginated response
        setRecipes(response.data);
        setPagination({
          current_page: 1,
          last_page: 1,
          per_page: response.data.length,
          total: response.data.length
        });
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }, [debouncedSearchTerm, categoryFilter, difficultyFilter, sortBy, sortOrder]);

  useEffect(() => {
    fetchRecipes(1);
  }, [fetchRecipes]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_URL}/recipes/categories`);
      setCategories(response.data);
    } catch (error) {
      // Error fetching categories
    }
  };

  const handlePageChange = (page) => {
    fetchRecipes(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
                ref={searchInputRef}
                type="text"
                className="w-full py-4 pl-12 pr-4 text-gray-700 placeholder-gray-400 transition-colors duration-200 bg-white border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-black"
                placeholder="Search recipes by name or description..."
                value={searchTerm}
                onChange={handleSearchChange}
                onFocus={handleSearchFocus}
                onBlur={handleSearchBlur}
              />
              {searchTerm && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setDebouncedSearchTerm('');
                  }}
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

                {/* Sort By */}
                <div className="relative flex-1 min-w-[200px] md:flex-initial">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                    </svg>
                  </div>
                  <select
                    className="w-full py-3 pl-12 pr-10 text-gray-700 transition-colors duration-200 bg-white border-2 border-gray-200 appearance-none cursor-pointer rounded-xl focus:outline-none focus:border-black"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="created_at">Sort by Date</option>
                    <option value="title">Sort by Title</option>
                    <option value="prep_time">Sort by Prep Time</option>
                    <option value="cook_time">Sort by Cook Time</option>
                    <option value="total_time">Sort by Total Time</option>
                    <option value="servings">Sort by Servings</option>
                    <option value="difficulty">Sort by Difficulty</option>
                    <option value="category">Sort by Category</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* Sort Order */}
                <div className="relative flex-1 min-w-[150px] md:flex-initial">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                    </svg>
                  </div>
                  <select
                    className="w-full py-3 pl-12 pr-10 text-gray-700 transition-colors duration-200 bg-white border-2 border-gray-200 appearance-none cursor-pointer rounded-xl focus:outline-none focus:border-black"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                  >
                    <option value="desc">Descending</option>
                    <option value="asc">Ascending</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Clear Filters Button */}
              {(searchTerm || categoryFilter || difficultyFilter || sortBy !== 'created_at' || sortOrder !== 'desc') && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setDebouncedSearchTerm('');
                    setCategoryFilter('');
                    setDifficultyFilter('');
                    setSortBy('created_at');
                    setSortOrder('desc');
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
            {(searchTerm || categoryFilter || difficultyFilter || sortBy !== 'created_at' || sortOrder !== 'desc') && (
              <div className="flex flex-wrap items-center gap-2 mt-4">
                <span className="text-sm font-medium text-gray-600">Active filters:</span>
                {searchTerm && (
                  <span className="inline-flex items-center gap-2 px-3 py-1 text-sm font-medium text-black bg-[#E8F5F4] rounded-full">
                    Search: "{searchTerm}"
                    <button
                      onClick={() => {
                        setSearchTerm('');
                        setDebouncedSearchTerm('');
                      }}
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
                {sortBy !== 'created_at' && (
                  <span className="inline-flex items-center gap-2 px-3 py-1 text-sm font-medium text-black bg-[#E8F5F4] rounded-full">
                    Sort: {sortBy.replace('_', ' ')} ({sortOrder})
                    <button
                      onClick={() => {
                        setSortBy('created_at');
                        setSortOrder('desc');
                      }}
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

          {recipes.length === 0 ? (
            <div className="empty-state">
              <h3>No recipes found</h3>
              <p>Try adjusting your search criteria</p>
            </div>
          ) : (
            <>
              <div className="recipes-grid">
                {recipes.map(recipe => (
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

              {/* Pagination */}
              {pagination.last_page > 1 && (
                <div className="flex items-center justify-center gap-2 mt-12 mb-8">
                  {/* Previous Button */}
                  <button
                    onClick={() => handlePageChange(pagination.current_page - 1)}
                    disabled={pagination.current_page === 1}
                    className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${
                      pagination.current_page === 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-black border-2 border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  {/* Page Numbers */}
                  {Array.from({ length: pagination.last_page }, (_, i) => i + 1).map((page) => {
                    // Show first page, last page, current page, and pages around current
                    if (
                      page === 1 ||
                      page === pagination.last_page ||
                      (page >= pagination.current_page - 1 && page <= pagination.current_page + 1)
                    ) {
                      return (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${
                            page === pagination.current_page
                              ? 'bg-black text-white'
                              : 'bg-white text-black border-2 border-gray-200 hover:bg-gray-50'
                          }`}
                        >
                          {page}
                        </button>
                      );
                    } else if (
                      page === pagination.current_page - 2 ||
                      page === pagination.current_page + 2
                    ) {
                      return (
                        <span key={page} className="px-2 text-gray-400">
                          ...
                        </span>
                      );
                    }
                    return null;
                  })}

                  {/* Next Button */}
                  <button
                    onClick={() => handlePageChange(pagination.current_page + 1)}
                    disabled={pagination.current_page === pagination.last_page}
                    className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${
                      pagination.current_page === pagination.last_page
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-black border-2 border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              )}

              {/* Results Info */}
              <div className="text-center text-sm text-gray-600 mb-4">
                Showing {((pagination.current_page - 1) * pagination.per_page) + 1} to{' '}
                {Math.min(pagination.current_page * pagination.per_page, pagination.total)} of{' '}
                {pagination.total} recipes
              </div>
            </>
          )}
        </section>
      </div>
    </>
  );
};

export default RecipeList;

