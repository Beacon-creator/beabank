import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import fanalerapic from '../../assets/fanalerapic.png'
import { faUser, faEnvelope, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

export default function Signup() {
  const [passwordVisible, setPasswordVisible] = useState(false)

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible)
  }

  return (
    <div className="flex flex-col items-center justify-center bg-white-100">
      <div className="flex justify-center my-10">
        <img src={fanalerapic} alt="Logo" className="h-10" />
      </div>
      <div className="bg-white shadow-lg p-3 mt-10 rounded-lg">
        <div className="text-center mb-6">
          <h2 className="text-lg font-bold text-gray-800">Become a Fanalera Miner today!</h2>
          <h5 className="text-gray-600">Signup and let's partner</h5>
        </div>

        {/* Name Entry */}
        <div className="relative mb-3">
          <input
            type="text"
            placeholder="Name"
            className="w-[280px] h-[50px] px-4 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="absolute top-[50%] left-3 transform -translate-y-1/2 text-gray-500">
            <FontAwesomeIcon icon={faUser} />
          </span>
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

        {/* Signup Button */}
        <button className="w-[280px] h-[50px] bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition">
          Signup
        </button>

        {/* Login Label */}
        <div className="text-center mt-4">
          <span className="text-gray-600">Already have an account? </span>
          <a href="/signin" className="text-blue-600 font-semibold hover:underline">
            Login
          </a>
        </div>
      </div>
    </div>
  )
}
