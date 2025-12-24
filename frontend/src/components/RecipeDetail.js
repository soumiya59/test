import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

const API_URL = process.env.REACT_APP_API_URL || '/api';

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [otherRecipes, setOtherRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecipe();
    fetchOtherRecipes();
  }, [id]);

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
      // Exclure la recette actuelle et prendre 3 autres
      const filtered = response.data.filter(r => r.id !== parseInt(id)).slice(0, 3);
      setOtherRecipes(filtered);
    } catch (error) {
      console.error('Error fetching other recipes:', error);
    }
  };

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
      <div className="container">
        <div className="loading">Loading recipe...</div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="container">
        <div className="empty-state">
          <h3>Recipe not found</h3>
          <button className="back-button" onClick={() => navigate('/')}>
            Back to list
          </button>
        </div>
      </div>
    );
  }

  // Split ingredients into main dish and sauce (simple logic)
  const mainIngredients = recipe.ingredients?.slice(0, Math.ceil(recipe.ingredients.length / 2)) || [];
  const sauceIngredients = recipe.ingredients?.slice(Math.ceil(recipe.ingredients.length / 2)) || [];

  // Split instructions into steps
  const instructionSteps = recipe.instructions?.split('\n').filter(step => step.trim()) || [recipe.instructions || ''];

  return (
    <div className="recipe-detail-page">
      {/* Header - Centered Logo */}
      <div className="recipe-detail-header-logo">
        <div className="container">
          <h1 className="detail-logo">Foodieland<span className="logo-dot">.</span></h1>
        </div>
      </div>

      <div className="container">
        <div className="recipe-detail-wrapper">
          <div className="recipe-detail-main">
            {/* Title and Metadata */}
            <div className="recipe-detail-title-section">
              <h1 className="recipe-detail-title">{recipe.title}</h1>
              <div className="recipe-detail-metadata">
                <div className="recipe-author">
                  <div className="author-avatar-small">JS</div>
                  <div className="author-info-small">
                    <div className="author-name-small">John Smith</div>
                    <div className="author-date-small">{new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
                  </div>
                </div>
                <div className="recipe-meta-items">
                  <div className="meta-item">
                    <span className="meta-icon">⏱️</span>
                    <span className="meta-label">PREP TIME</span>
                    <span className="meta-value">{recipe.prep_time} Minutes</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-icon">⏱️</span>
                    <span className="meta-label">COOK TIME</span>
                    <span className="meta-value">{recipe.cook_time} Minutes</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-icon">🍴</span>
                    <span className="meta-label">{recipe.category || 'Recipe'}</span>
                  </div>
                </div>
                <button className="share-button" onClick={handleShare}>
                  <span className="share-icon">📤</span>
                  <span className="share-text">SHARE</span>
                </button>
              </div>
            </div>

            {/* Main Image with Play Button */}
            <div className="recipe-main-image-wrapper">
              {recipe.image_url ? (
                <div className="recipe-main-image-container">
                  <img
                    src={recipe.image_url}
                    alt={recipe.title}
                    className="recipe-main-image"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/800x500?text=Recipe';
                    }}
                  />
                  <div className="play-button-overlay">
                    <div className="play-button">▶</div>
                  </div>
                </div>
              ) : (
                <div className="recipe-main-image-placeholder">No Image</div>
              )}
            </div>

            {/* Description */}
            <div className="recipe-description-section">
              <p className="recipe-intro-text">{recipe.description}</p>
            </div>

            {/* Ingredients Section */}
            <div className="ingredients-section">
              <h2 className="ingredients-title">Ingredients</h2>
              
              {mainIngredients.length > 0 && (
                <div className="ingredients-subsection">
                  <h3 className="ingredients-subtitle">For main dish</h3>
                  <ul className="ingredients-checklist">
                    {mainIngredients.map((ingredient, index) => (
                      <li key={index} className="ingredient-item">
                        <input type="checkbox" id={`ingredient-${index}`} defaultChecked={index === 0} />
                        <label htmlFor={`ingredient-${index}`}>{ingredient}</label>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {sauceIngredients.length > 0 && (
                <div className="ingredients-subsection">
                  <h3 className="ingredients-subtitle">For the sauce</h3>
                  <ul className="ingredients-checklist">
                    {sauceIngredients.map((ingredient, index) => (
                      <li key={index + mainIngredients.length} className="ingredient-item">
                        <input type="checkbox" id={`ingredient-${index + mainIngredients.length}`} />
                        <label htmlFor={`ingredient-${index + mainIngredients.length}`}>{ingredient}</label>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Directions Section */}
            <div className="directions-section">
              <h2 className="directions-title">Directions</h2>
              {instructionSteps.map((step, index) => (
                <div key={index} className="direction-step">
                  <div className="step-number">{index + 1}.</div>
                  <div className="step-content">
                    <p className="step-text">{step}</p>
                    {index === 0 && recipe.image_url && (
                      <div className="step-image">
                        <img
                          src={recipe.image_url}
                          alt={`Step ${index + 1}`}
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/600x400?text=Step+Image';
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="recipe-detail-sidebar">
            {/* Nutrition Information */}
            <div className="nutrition-box">
              <h3 className="nutrition-title">Nutrition Information</h3>
              <div className="nutrition-list">
                <div className="nutrition-item">
                  <span className="nutrition-label">Calories</span>
                  <span className="nutrition-value">219.9 kcal</span>
                </div>
                <div className="nutrition-item">
                  <span className="nutrition-label">Total Fat</span>
                  <span className="nutrition-value">10.7 g</span>
                </div>
                <div className="nutrition-item">
                  <span className="nutrition-label">Protein</span>
                  <span className="nutrition-value">7.9 g</span>
                </div>
                <div className="nutrition-item">
                  <span className="nutrition-label">Carbohydrate</span>
                  <span className="nutrition-value">22.3 g</span>
                </div>
                <div className="nutrition-item">
                  <span className="nutrition-label">Cholesterol</span>
                  <span className="nutrition-value">37.4 mg</span>
                </div>
              </div>
            </div>

            {/* Other Recipes */}
            <div className="other-recipes-section">
              <h3 className="other-recipes-title">Other Recipe</h3>
              <div className="other-recipes-list">
                {otherRecipes.map(otherRecipe => (
                  <div
                    key={otherRecipe.id}
                    className="other-recipe-card"
                    onClick={() => navigate(`/recipe/${otherRecipe.id}`)}
                  >
                    <div className="other-recipe-image">
                      {otherRecipe.image_url ? (
                        <img
                          src={otherRecipe.image_url}
                          alt={otherRecipe.title}
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/100x100?text=Recipe';
                          }}
                        />
                      ) : (
                        <div className="other-recipe-placeholder">No Image</div>
                      )}
                    </div>
                    <div className="other-recipe-info">
                      <h4 className="other-recipe-title">{otherRecipe.title}</h4>
                      <p className="other-recipe-author">By Andreas Paula</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
