import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

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

  const getDifficultyLabel = (difficulty) => {
    const labels = {
      easy: 'Facile',
      medium: 'Moyen',
      hard: 'Difficile'
    };
    return labels[difficulty] || difficulty;
  };

  const featuredRecipe = filteredRecipes.length > 0 ? filteredRecipes[0] : null;
  const displayRecipes = filteredRecipes.slice(1);

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Chargement des recettes...</div>
      </div>
    );
  }

  const categoryIcons = {
    'Breakfast': '🍙',
    'Vegan': '🌿',
    'Meat': '🥩',
    'Dessert': '🍰',
    'Lunch': '🥪',
    'Chocolate': '🍫',
    'Italien': '🍝',
    'Salade': '🥗',
    'Français': '🥖',
    'Mexicain': '🌮',
    'Japonais': '🍣'
  };

  return (
    <>
      {/* Hero Section */}
      {featuredRecipe && (
        <section className="hero-section">
          <div className="container">
            <div className="hero-content">
              <div className="hero-text">
                <span className="hot-recipes-badge">Hot Recipes</span>
                <h1 className="hero-title">{featuredRecipe.title}</h1>
                <p className="hero-description">{featuredRecipe.description}</p>
                <div className="hero-meta">
                  <span className="hero-meta-item">
                    <span className="icon">⏱️</span>
                    {featuredRecipe.prep_time + featuredRecipe.cook_time} Minutes
                  </span>
                  {featuredRecipe.category && (
                    <span className="hero-meta-item">
                      <span className="icon">🍴</span>
                      {featuredRecipe.category}
                    </span>
                  )}
                </div>
                <div className="hero-author">
                  <div className="author-avatar">JS</div>
                  <div className="author-info">
                    <div className="author-name">John Smith</div>
                    <div className="author-date">{new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
                  </div>
                </div>
                <button 
                  className="view-recipe-btn"
                  onClick={() => navigate(`/recipe/${featuredRecipe.id}`)}
                >
                  View Recipe ▶
                </button>
              </div>
              <div className="hero-image">
                {featuredRecipe.image_url ? (
                  <img
                    src={featuredRecipe.image_url}
                    alt={featuredRecipe.title}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/600x400?text=Recette';
                    }}
                  />
                ) : (
                  <div className="hero-placeholder">No Image</div>
                )}
                <div className="handpicked-badge">HANDPICKED RECIPES</div>
              </div>
            </div>
          </div>
        </section>
      )}

      <div className="container">
        {/* Categories Section */}
        <section className="categories-section">
          <div className="section-header">
            <h2 className="section-title">Categories</h2>
            <button className="view-all-btn">View All Categories</button>
          </div>
          <div className="categories-grid">
            {categories.slice(0, 6).map(category => (
              <div
                key={category}
                className="category-card"
                onClick={() => {
                  setCategoryFilter(categoryFilter === category ? '' : category);
                }}
              >
                <div className="category-icon">{categoryIcons[category] || '🍽️'}</div>
                <div className="category-name">{category}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Recipes Section */}
        <section className="recipes-section">
          <div className="section-header">
            <h2 className="section-title">Simple and tasty recipes</h2>
            <p className="section-description">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="search-filters">
            <div className="search-bar">
              <input
                type="text"
                className="search-input"
                placeholder="Search recipes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="filter-group">
              <select
                className="filter-select"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <select
                className="filter-select"
                value={difficultyFilter}
                onChange={(e) => setDifficultyFilter(e.target.value)}
              >
                <option value="">All Difficulties</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
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

