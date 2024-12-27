import React, { useState, useEffect } from 'react'
import menuIcon from '../../assets/menu_icon.svg'
import fanalerapic from '../../assets/fanalerapic.png'
import user from '../../assets/user.png'
import { useNavigate } from 'react-router-dom'

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false)
  const [profileImage, setProfileImage] = useState(user) // Default profile image
  const navigate = useNavigate()

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  // Fetch the profile picture on mount
  useEffect(() => {
    const fetchProfilePic = async () => {
      try {
        const response = await fetch('http://localhost:3000/auth/user-data', {
          method: 'GET',
          credentials: 'include'
        })
        if (!response.ok) throw new Error('Failed to fetch user data')

        const data = await response.json()
        if (data.profilePic) {
          setProfileImage(`http://localhost:3000/${data.profilePic}?t=${new Date().getTime()}`)
        }
      } catch (error) {
        console.error('Error fetching profile picture:', error)
      }
    }

    fetchProfilePic()
  }, [])

  // Handle Profile Picture Upload
  const handleProfilePicUpload = async (event) => {
    const file = event.target.files[0]
    if (file) {
      const formData = new FormData()
      formData.append('profilePic', file)

      try {
        const response = await fetch('http://localhost:3000/auth/upload-profile-pic', {
          method: 'POST',
          credentials: 'include',
          body: formData
        })

        if (!response.ok) throw new Error('Failed to upload profile picture')

        const data = await response.json()

        // Update profile picture with cache busting
        if (data.profilePicUrl) {
          setProfileImage(`${data.profilePicUrl}?t=${new Date().getTime()}`)
        } else {
          console.error('Profile picture URL is missing from the server response')
        }
      } catch (error) {
        console.error('Error uploading profile picture:', error)
      }
    }
  }

  // const handleSettings = () => {
  //   navigate('/settings')
  // }

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:3000/auth/logout', {
        method: 'POST',
        credentials: 'include'
      })

      if (response.ok) {
        console.log('Logout successful')
        navigate('/signin')
      } else {
        console.error('Logout failed')
      }
    } catch (error) {
      console.error('Error during logout:', error)
    }
  }

  return (
    <div className="flex items-center justify-between w-full py-3 px-4 bg-white">
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
          <div className="absolute left-0 mt-1 w-30 bg-white shadow-lg rounded-lg z-50">
            <ul className="text-xs">
              {/* <li onClick={handleSettings} className="px-2 py-2 hover:bg-gray-100 cursor-pointer">
                Settings
              </li> */}
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
      <div className="relative p-1">
        <label htmlFor="profilePicInput" className="cursor-pointer group relative">
          {/* Profile Image */}
          <img
            src={profileImage}
            alt="Profile"
            className="w-10 h-10 rounded-full border-2 border-gray-300 object-cover"
          />
          {/* Edit Label */}
          <span
            className="absolute bottom-0 right-0 bg-gray-800 text-white text-xs px-1 py-0.5 rounded-full
              opacity-80 group-hover:opacity-100"
          >
            Edit
          </span>
        </label>
        <input
          id="profilePicInput"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleProfilePicUpload} // Handle file input
        />
      </div>
    </div>
  )
}
