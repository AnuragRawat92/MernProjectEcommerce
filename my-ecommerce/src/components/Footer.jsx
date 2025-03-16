import React from "react";
import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-3 mt-10 w-screen">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
        
        {/* Left Side - Brand */}
        <div className="flex items-center space-x-3">
          <img 
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk6p460g_jh7r196-itgMQtmr6brMvE-WKjg4ZsozFD01fenD3y3Sn7aKFeuSGruA8_zE&usqp=CAU" 
            alt="Male Fashion Logo" 
            className="w-10 h-10"
          />
          <span className="text-lg font-semibold">Male Fashion</span>
        </div>

        {/* Right Side - Social Icons */}
        <div className="flex space-x-4 mt-2 md:mt-0">
          <a href="https://www.facebook.com/share/1DM5CAmsge/" className="hover:text-gray-400"><Facebook className="w-5 h-5" /></a>
          <a href="https://www.instagram.com/imanuragrawat/profilecard/?igsh=MWloYWt6cmx4Z2R1ag==" className="hover:text-gray-400"><Instagram className="w-5 h-5" /></a>
          <a href="https://x.com/imanuragrawat92?t=x1g1zvIRO3lV5UGoXQIC2A&s=08" className="hover:text-gray-400"><Twitter className="w-5 h-5" /></a>
        </div>
      </div>

      {/* Bottom - Copyright */}
      <div className="text-center text-gray-400 text-xs mt-2 w-full">
        © {new Date().getFullYear()} Male Fashion. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
