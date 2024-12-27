import React, { useState } from 'react'
import reminder from '../../assets/reminder.svg'

export default function Strength() {
  const [networkStrength, setNetworkStrength] = useState(null) // State for network strength
  const [loading, setLoading] = useState(false) // State for loading spinner

  const fetchNetworkStrength = async () => {
    setLoading(true)
    try {
      const response = await fetch('http://localhost:3000/api/network-strength', {
        method: 'GET'
      })

      if (!response.ok) throw new Error('Failed to fetch network strength')

      const data = await response.json()
      setNetworkStrength(data.strength.toFixed(2)) // Update state with strength
    } catch (error) {
      console.error('Error fetching network strength:', error)
      setNetworkStrength('N/A') // Handle error gracefully
    } finally {
      setLoading(false) // Stop spinner
    }
  }

  return (
    <div className="flex-col flex items-center justify-center">
      <div
        className="bg-gray-100 border-white rounded-lg 
      p-1 my-5"
        style={{ width: '280px' }}
      >
        <div className="flex text-sm px-2 my-2">
          <h2 className="">Network Strength : </h2>
          <h2 className="ml-5">{networkStrength ? `${networkStrength}%` : '--'}</h2>
        </div>
      </div>

      <div className="my-5">
        <button
          className="flex items-center justify-center px-3 py-3 text-sm border-2 
          border-white rounded-lg bg-emerald-900 hover:bg-emerald-300 transition"
          style={{ width: '280px' }}
          onClick={fetchNetworkStrength} // Call function on click
        >
          <img src={reminder} alt="reminder" className="h-5" />
          <h2 className="mx-2">{loading ? 'Checking...' : 'Check Network Strength'}</h2>
        </button>
        <div>
          <h2 className="text-xs justify-center flex my-1">
            Let's keep growing the <i>&nbsp;fanalera&nbsp;technology!</i>
          </h2>
        </div>
      </div>
    </div>
  )
}
