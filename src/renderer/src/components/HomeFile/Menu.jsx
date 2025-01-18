/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import menuIcon from '../../assets/menu_icon.svg';
import fanalerapic from '../../assets/fanalerapic.png';
import { useNavigate } from 'react-router-dom';
// import { Camera } from 'lucide-react';

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);
  // const [profileImage, setProfileImage] = useState(null);
  // const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };


  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:3000/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        console.log('Logout successful');
        navigate('/signin');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <div className="flex items-center justify-between w-full py-3 px-4 bg-white">
      {/* Left: Menu Icon */}
      <div className="relative">
        <button onClick={toggleMenu} className="p-2 rounded-full hover:bg-gray-200 focus:outline-none">
          <img src={menuIcon} alt="Menu" className="w-6 h-6" />
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute left-0 mt-1 w-48 bg-white shadow-lg rounded-lg z-50">
            <ul className="text-sm">
              <li onClick={handleLogout} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Center: Logo */}
      <div className="flex justify-center">
        <img src={fanalerapic} alt="Logo" className="h-8" />
      </div>

    </div>
  );
}
