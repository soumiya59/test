import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const NotFound = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="container px-5 mx-auto max-w-7xl text-center">
          <div className="max-w-md mx-auto">
            {/* 404 Number */}
            <h1 className="text-9xl font-bold text-gray-200 mb-4">404</h1>
            
            {/* Error Message */}
            <h2 className="text-3xl font-bold text-black mb-4">Page Not Found</h2>
            <p className="text-lg text-gray-600 mb-8">
              Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
            </p>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="px-8 py-4 text-base font-semibold text-white transition-colors bg-black rounded-lg hover:bg-gray-800"
              >
                Go to Homepage
              </Link>
              <Link
                to="/recipes"
                className="px-8 py-4 text-base font-semibold text-black transition-colors bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Browse Recipes
              </Link>
            </div>
            
            {/* Decorative Elements */}
            <div className="mt-12 flex justify-center gap-4 text-6xl opacity-20">
              <span>🍳</span>
              <span>🥗</span>
              <span>🍰</span>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NotFound;

