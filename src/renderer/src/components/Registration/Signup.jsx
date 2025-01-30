/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import fanalerapic from '../../assets/fanalerapic.png'
import { faUser, faEnvelope, faLock, faEye, faEyeSlash, faSpinner  } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'


export default function Signup() {

  const [passwordVisible, setPasswordVisible] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setIsSubmitting(true)

    try {
      const response = await fetch('https://beabankapi.onrender.com/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        // Attempt to parse JSON error, fallback to plain text
        const errorData = await response.json().catch(() => ({
          message: `Error: ${response.statusText}`
        }))
        throw new Error(errorData.message || 'Failed to signup')
      }

      const data = await response.json()
      setSuccess(data.message)
      setFormData({ fullName: '', email: '', password: '' })
      // Navigate to home page after login
      navigate('/signin')
    } catch (err) {
      setError(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center bg-white-100">
      <div className="flex justify-center my-4">
        <img src={fanalerapic} alt="Logo" className="h-10" />
      </div>
      <div className="bg-white shadow-lg p-2 mt-10 rounded-lg">
        <div className="text-center mb-4">
          <h2 className="text-lg font-bold text-gray-800">Become a Fanalera Miner today!</h2>
          <h5 className="text-gray-600">{`Signup and let's partner`}</h5>
        </div>

        {/* Error Message */}
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        {/* Success Message */}
        {success && <div className="text-green-600 text-center mb-4">{success}</div>}

        <form onSubmit={handleSubmit}>
          {/* Name Entry */}
          <div className="relative mb-3">
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Name"
              className="w-[280px] h-[50px] px-4 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200"
              required
            />
            <span className="absolute top-[50%] left-3 transform -translate-y-1/2 text-gray-500">
              <FontAwesomeIcon icon={faUser} />
            </span>
          </div>

          {/* Email Entry */}
          <div className="relative mb-4">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-[280px] h-[50px] px-4 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200"
              required
            />
            <span className="absolute top-[50%] left-3 transform -translate-y-1/2 text-gray-500">
              <FontAwesomeIcon icon={faEnvelope} />
            </span>
          </div>

          {/* Password Entry */}
          <div className="relative mb-6">
            <input
              type={passwordVisible ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-[280px] h-[50px] px-4 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200"
              required
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
          <button
            type="submit"
            className="w-[280px] h-[50px] bg-green-800 text-white font-bold rounded-lg hover:bg-green-700 transition flex items-center justify-center"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
            ) : (
              'Signup'
            )}
          </button>
        </form>

        {/* Login Label */}
        <div className="text-center mt-4">
          <span className="text-gray-600">Already have an account? </span>
          <a href="/signin" className="text-green-600 font-semibold hover:underline">
            Login
          </a>
        </div>
      </div>
    </div>
  )
}
