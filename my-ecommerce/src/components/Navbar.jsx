import React, { useState } from "react";
import { Home, LogIn, Mail } from "lucide-react"; // Importing icons
import { Link } from "react-router-dom";

const Navbar = ({ scrollToProducts, scrollToContact }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full fixed top-0 left-0 bg-white shadow-md z-50">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        
        {/* Logo Section */}
        <Link to="/" className="flex items-center space-x-3">
          <img 
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk6p460g_jh7r196-itgMQtmr6brMvE-WKjg4ZsozFD01fenD3y3Sn7aKFeuSGruA8_zE&usqp=CAU" 
            alt="Male Fashion Logo" 
            className="w-12 h-12"
          />
          <span className="text-2xl font-bold text-black">Male Fashion</span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex space-x-8">
          <button 
            onClick={scrollToProducts} 
            className="flex items-center text-xl font-bold text-black hover:text-gray-700 space-x-2"
          >
            <Home className="w-6 h-6" /> <span>Home</span>
          </button>

          <Link to="/login" className="flex items-center text-xl font-bold text-black hover:text-gray-700 space-x-2">
            <LogIn className="w-6 h-6" /> <span>Login</span>
          </Link>

          <button 
            onClick={scrollToContact} 
            className="flex items-center text-xl font-bold text-black hover:text-gray-700 space-x-2"
          >
            <Mail className="w-6 h-6" /> <span>Contact</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden text-black focus:outline-none" 
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white shadow-md p-4">
          <button 
            onClick={scrollToProducts} 
            className="block py-2 text-xl font-bold text-black hover:text-gray-700 w-full text-left"
          >
            <Home className="inline w-6 h-6 mr-2" /> Home
          </button>

          <Link to="/login" className="block py-2 text-xl font-bold text-black hover:text-gray-700">
            <LogIn className="inline w-6 h-6 mr-2" /> Login
          </Link>

          <button 
            onClick={scrollToContact} 
            className="block py-2 text-xl font-bold text-black hover:text-gray-700 w-full text-left"
          >
            <Mail className="inline w-6 h-6 mr-2" /> Contact
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
