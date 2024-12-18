import React from 'react'
import { useNavigate } from 'react-router-dom' // Import useNavigate hook

export default function Settings() {
  const navigate = useNavigate() // Initialize navigate hook

  const goBack = () => {
    navigate(-1) // Go back to the previous page
  }

  return (
    <div className="p-4">
      <button
        onClick={goBack}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
         Back
      </button>

      <h1 className="text-2xl font-bold mt-4">Settings Page</h1>
      {/* Add your settings content here */}
    </div>
  )
}
