import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import fanalerapic from '../../assets/fanalerapic.png'
import { faEnvelope, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom' // Import useNavigate

export default function Signin() {
  const [passwordVisible, setPasswordVisible] = useState(false)
  const navigate = useNavigate() // Hook for navigation

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible)
  }

  const handleLogin = () => {
    // Add your login logic here (e.g., validation, API calls)
    navigate('/home') // Navigate to Home page
  }

  return (
    <div className="flex flex-col items-center justify-center bg-white-100">
      <div className="flex justify-center my-10">
        <img src={fanalerapic} alt="Logo" className="h-10" />
      </div>
      <div className="bg-white shadow-lg p-3 mt-10 rounded-lg">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Start Mining</h2>
          <h5 className="text-gray-600">Login</h5>
        </div>

        {/* Email Entry */}
        <div className="relative mb-4">
          <input
            type="email"
            placeholder="Email"
            className="w-[280px] h-[50px] px-4 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="absolute top-[50%] left-3 transform -translate-y-1/2 text-gray-500">
            <FontAwesomeIcon icon={faEnvelope} />
          </span>
        </div>

        {/* Password Entry */}
        <div className="relative mb-6">
          <input
            type={passwordVisible ? 'text' : 'password'}
            placeholder="Password"
            className="w-[280px] h-[50px] px-4 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="absolute top-[50%] left-3 transform -translate-y-1/2 text-gray-500">
            <FontAwesomeIcon icon={faLock} />
          </span>
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute top-[50%] right-3 transform -translate-y-1/2 text-gray-500 focus:outline-none"
          >
            <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
          </button>
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin} // Call handleLogin on button click
          className="w-[280px] h-[50px] bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition"
        >
          Login
        </button>

        {/* Signup Label */}
        <div className="text-center mt-4">
          <span className="text-gray-600">Don't have an account? </span>
          <a href="/signup" className="text-blue-600 font-semibold hover:underline">
            Signup
          </a>
        </div>
      </div>
    </div>
  )
}
