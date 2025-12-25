import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import Header from './Header';

const API_URL = process.env.REACT_APP_API_URL || '/api';

const AdminDashboard = () => {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    ingredients: [],
    instructions: '',
    prep_time: 0,
    cook_time: 0,
    servings: 1,
    difficulty: 'medium',
    category: '',
    image_url: ''
  });
  const [ingredientInput, setIngredientInput] = useState('');

  useEffect(() => {
    fetchRecipes();
    fetchCategories();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get(`${API_URL}/recipes`, {
        params: { per_page: 100 } // Get all recipes for admin dashboard
      });
      // Handle paginated or non-paginated response
      const recipesData = response.data.data || response.data;
      setRecipes(recipesData);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_URL}/recipes/categories`);
      setCategories(response.data);
    } catch (error) {
      // Error fetching categories
    }
  };

  const handleOpenModal = (recipe = null) => {
    if (recipe) {
      setEditingRecipe(recipe);
      setFormData({
        title: recipe.title,
        description: recipe.description,
        ingredients: recipe.ingredients || [],
        instructions: recipe.instructions,
        prep_time: recipe.prep_time,
        cook_time: recipe.cook_time,
        servings: recipe.servings,
        difficulty: recipe.difficulty,
        category: recipe.category || '',
        image_url: recipe.image_url || ''
      });
    } else {
      setEditingRecipe(null);
      setFormData({
        title: '',
        description: '',
        ingredients: [],
        instructions: '',
        prep_time: 0,
        cook_time: 0,
        servings: 1,
        difficulty: 'medium',
        category: '',
        image_url: ''
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingRecipe(null);
    setIngredientInput('');
  };

  const handleAddIngredient = () => {
    if (ingredientInput.trim()) {
      setFormData({
        ...formData,
        ingredients: [...formData.ingredients, ingredientInput.trim()]
      });
      setIngredientInput('');
    }
  };

  const handleRemoveIngredient = (index) => {
    const newIngredients = formData.ingredients.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      ingredients: newIngredients
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingRecipe) {
        await axios.put(`${API_URL}/recipes/${editingRecipe.id}`, formData);
      } else {
        await axios.post(`${API_URL}/recipes`, formData);
      }
      fetchRecipes();
      handleCloseModal();
    } catch (error) {
      alert('Erreur lors de la sauvegarde de la recette');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette recette ?')) {
      try {
        await axios.delete(`${API_URL}/recipes/${id}`);
        fetchRecipes();
      } catch (error) {
        alert('Erreur lors de la suppression de la recette');
      }
    }
  };

  const getDifficultyLabel = (difficulty) => {
    const labels = {
      easy: 'Facile',
      medium: 'Moyen',
      hard: 'Difficile'
    };
    return labels[difficulty] || difficulty;
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Chargement...</div>
      </div>
    );
  }

  return (
    <>  
      <Header />
    <div className='container'>
      <div className="admin-container">
        <div className="admin-header">
          <h1 className="admin-title">Dashboard Admin</h1>
          <button className="add-recipe-btn" onClick={() => handleOpenModal()}>
            + Ajouter une recette
          </button>
        </div>

        <div className="recipes-table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Titre</th>
                <th>Catégorie</th>
                <th>Difficulté</th>
                <th>Temps</th>
                <th>Portions</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {recipes.map(recipe => (
                <tr key={recipe.id}>
                  <td>{recipe.id}</td>
                  <td>{recipe.title}</td>
                  <td>{recipe.category || '-'}</td>
                  <td>
                    <span className={`difficulty-badge difficulty-${recipe.difficulty}`}>
                      {getDifficultyLabel(recipe.difficulty)}
                    </span>
                  </td>
                  <td>{recipe.prep_time + recipe.cook_time} min</td>
                  <td>{recipe.servings}</td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="btn-edit"
                        onClick={() => handleOpenModal(recipe)}
                      >
                        Modifier
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => handleDelete(recipe.id)}
                      >
                        Supprimer
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showModal && (
          <div className="modal-overlay" onClick={handleCloseModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2 className="modal-title">
                  {editingRecipe ? 'Modifier la recette' : 'Nouvelle recette'}
                </h2>
                <button className="close-button" onClick={handleCloseModal}>
                  ×
                </button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Titre *</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Description *</label>
                  <textarea
                    className="form-textarea"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Ingrédients *</label>
                  <div className="ingredients-input-group">
                    <input
                      type="text"
                      className="form-input"
                      value={ingredientInput}
                      onChange={(e) => setIngredientInput(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddIngredient();
                        }
                      }}
                      placeholder="Ajouter un ingrédient"
                    />
                    <button
                      type="button"
                      className="btn-add-ingredient"
                      onClick={handleAddIngredient}
                    >
                      Ajouter
                    </button>
                  </div>
                  <ul className="ingredients-list-edit">
                    {formData.ingredients.map((ingredient, index) => (
                      <li key={index}>
                        <span>{ingredient}</span>
                        <button
                          type="button"
                          className="btn-remove-ingredient"
                          onClick={() => handleRemoveIngredient(index)}
                        >
                          Supprimer
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="form-group">
                  <label className="form-label">Instructions *</label>
                  <textarea
                    className="form-textarea"
                    value={formData.instructions}
                    onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                    required
                    rows="6"
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Temps de préparation (min) *</label>
                    <input
                      type="number"
                      className="form-input"
                      value={formData.prep_time}
                      onChange={(e) => setFormData({ ...formData, prep_time: parseInt(e.target.value) || 0 })}
                      min="0"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Temps de cuisson (min) *</label>
                    <input
                      type="number"
                      className="form-input"
                      value={formData.cook_time}
                      onChange={(e) => setFormData({ ...formData, cook_time: parseInt(e.target.value) || 0 })}
                      min="0"
                      required
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Portions *</label>
                    <input
                      type="number"
                      className="form-input"
                      value={formData.servings}
                      onChange={(e) => setFormData({ ...formData, servings: parseInt(e.target.value) || 1 })}
                      min="1"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Difficulté *</label>
                    <select
                      className="form-select"
                      value={formData.difficulty}
                      onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                      required
                    >
                      <option value="easy">Facile</option>
                      <option value="medium">Moyen</option>
                      <option value="hard">Difficile</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Catégorie</label>
                    <select
                      className="form-select"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                      <option value="">Sélectionner une catégorie</option>
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">URL de l'image</label>
                  <input
                    type="url"
                    className="form-input"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div className="form-actions">
                  <button type="button" className="btn-cancel" onClick={handleCloseModal}>
                    Annuler
                  </button>
                  <button type="submit" className="btn-submit">
                    {editingRecipe ? 'Modifier' : 'Créer'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default AdminDashboard;

