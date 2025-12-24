import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './components/HomePage';
import RecipeList from './components/RecipeList';
import RecipeDetail from './components/RecipeDetail';
import AdminDashboard from './components/AdminDashboard';
import Header from './components/Header';
import Footer from './components/Footer';

function AppContent() {
  const location = useLocation();
  const isRecipeDetail = location.pathname.startsWith('/recipe/');

  return (
    <div className="min-h-screen flex flex-col">
      {!isRecipeDetail && <Header />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/recipes" element={<RecipeList />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </main>
      {!isRecipeDetail && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;

