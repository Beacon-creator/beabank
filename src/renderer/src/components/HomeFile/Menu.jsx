import React, { useState } from 'react'
import menuIcon from '../../assets/menu_icon.svg'
import fanalerapic from '../../assets/fanalerapic.png'
import user from '../../assets/user.png'
import { useNavigate } from 'react-router-dom' // Import useNavigate


export default function Menu() {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate() // Hook for navigation
  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const profilePic = () => {
    // Handle profile picture click
  }
  const handleReferral = () => {
    // Add your login logic here (e.g., validation, API calls)
  }

  const handleSettings = () => {
   
    navigate('/settings') // Navigate to Home page
  }

  const handleLogout = () => {
    // Add your login logic here (e.g., validation, API calls)
    navigate('/signin') // Navigate to Home page
  }

  return (
    <div className="flex items-center justify-between w-full p-2 bg-white">
      {/* Left: Menu Icon */}
      <div className="relative">
        <button
          onClick={toggleMenu}
          className="p-2 rounded-full hover:bg-gray-200 focus:outline-none"
        >
          <img src={menuIcon} alt="Menu" className="w-6 h-6" />
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute left-0 mt-1 w-36 bg-white shadow-lg rounded-lg z-50">
            <ul className="text-xs">
              <li onClick={handleReferral} className="px-2 py-2 hover:bg-gray-100 cursor-pointer">
                Referral link
              </li>
              <li onClick={handleSettings} className="px-2 py-2 hover:bg-gray-100 cursor-pointer">
                Settings
              </li>
              <li onClick={handleLogout} className="px-2 py-2 hover:bg-gray-100 cursor-pointer">
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

      {/* Right: Profile Picture */}
      <div>
        <button
          onClick={profilePic}
          className="p-2 m-1 rounded-full bg-gray hover:bg-gray-200 focus:outline-none"
        >
          <img src={user} alt="Profile" className="w-6 h-6" />
        </button>
      </div>
    </div>
  )
}
