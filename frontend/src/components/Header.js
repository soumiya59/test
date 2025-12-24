import React from 'react';
import { Link } from 'react-router-dom';
import { FacebookIcon, TwitterIcon, InstagramIcon } from './SocialIcons';
import logoIcon from '../assets/images/icons/logo.svg';

const Header = () => {
  return (
    <header className="bg-white text-black py-6 shadow-sm">
      <div className="container mx-auto px-5 max-w-7xl">
        {/* Desktop Layout */}
        <div className="hidden md:grid grid-cols-[auto_1fr_auto] items-center gap-8">
          {/* Logo */}
          <Link to="/" className="flex items-center">
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
          
          {/* Navigation Links - Centered */}
          <nav className="flex justify-center gap-8 items-center flex-wrap">
            <Link to="/" className="text-black font-medium hover:text-primary transition-colors text-sm">Home</Link>
            <Link to="/" className="text-black font-medium hover:text-primary transition-colors text-sm">Recipes</Link>
            <Link to="/" className="text-black font-medium hover:text-primary transition-colors text-sm">Blog</Link>
            <Link to="/" className="text-black font-medium hover:text-primary transition-colors text-sm">Contact</Link>
            <Link to="/" className="text-black font-medium hover:text-primary transition-colors text-sm">About us</Link>
          </nav>
          
          {/* Social Icons - Right */}
          <div className="flex gap-4 items-center justify-end">
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
        
        {/* Mobile Layout */}
        <div className="md:hidden flex flex-col gap-4 text-center">
          <Link to="/" className="flex justify-center">
            <img 
              src={logoIcon} 
              alt="Foodieland" 
              className="h-8 w-auto"
            />
          </Link>
          <nav className="flex justify-center gap-4 flex-wrap">
            <Link to="/" className="text-black font-medium hover:text-primary transition-colors text-sm">Home</Link>
            <Link to="/" className="text-black font-medium hover:text-primary transition-colors text-sm">Recipes</Link>
            <Link to="/" className="text-black font-medium hover:text-primary transition-colors text-sm">Blog</Link>
            <Link to="/" className="text-black font-medium hover:text-primary transition-colors text-sm">Contact</Link>
            <Link to="/" className="text-black font-medium hover:text-primary transition-colors text-sm">About us</Link>
          </nav>
          <div className="flex justify-center gap-4">
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
    </header>
  );
};

export default Header;
