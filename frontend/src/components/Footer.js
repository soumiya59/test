import React from 'react';
import { Link } from 'react-router-dom';
import { FacebookIcon, TwitterIcon, InstagramIcon } from './SocialIcons';
import logoIcon from '../assets/images/icons/logo.svg';

const Footer = () => {
  return (
    <footer className="bg-white text-black py-12 border-t border-gray-200">
      <div className="container mx-auto px-5 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Left Section */}
          <div className="flex flex-col">
            <Link to="/" className="mb-4">
              <img 
                src={logoIcon} 
                alt="Foodieland" 
                className="h-8 w-auto"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'inline';
                }}
              />
              <span className="hidden text-2xl font-bold text-black">
                Foodieland<span className="text-primary">.</span>
              </span>
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed max-w-md">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          
          {/* Right Section */}
          <div className="flex flex-col md:items-end">
            <nav className="flex flex-wrap gap-6 mb-6 md:justify-end">
              <Link to="/" className="text-black hover:text-primary transition-colors text-sm">Recipes</Link>
              <Link to="/" className="text-black hover:text-primary transition-colors text-sm">Blog</Link>
              <Link to="/" className="text-black hover:text-primary transition-colors text-sm">Contact</Link>
              <Link to="/" className="text-black hover:text-primary transition-colors text-sm">About us</Link>
            </nav>
            <div className="flex gap-4 mb-6">
              <a href="#" className="flex items-center justify-center w-8 h-8 hover:scale-110 transition-transform text-black" aria-label="Facebook">
                <FacebookIcon className="w-5 h-5" />
              </a>
              <a href="#" className="flex items-center justify-center w-8 h-8 hover:scale-110 transition-transform text-black" aria-label="Twitter">
                <TwitterIcon className="w-5 h-5" />
              </a>
              <a href="#" className="flex items-center justify-center w-8 h-8 hover:scale-110 transition-transform text-black" aria-label="Instagram">
                <InstagramIcon className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="text-center text-gray-600 text-sm pt-8 border-t border-gray-200">
          © 2024 Foodieland. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
