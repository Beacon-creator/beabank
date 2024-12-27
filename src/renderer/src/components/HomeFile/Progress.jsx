import React, { useState, useEffect } from 'react'
import refresh from '../../assets/refresh.svg'
import start from '../../assets/start.png'

export default function Progress() {
  const [timer, setTimer] = useState(() => {
    const storedTimer = localStorage.getItem('timer')
    return storedTimer ? parseInt(storedTimer, 10) : 86400 // Default to 24 hours in seconds
  })
  const [isRunning, setIsRunning] = useState(false)
  const [balance, setBalance] = useState(() => {
    const storedBalance = localStorage.getItem('balance')
    return storedBalance ? parseFloat(storedBalance) : 0.0
  })
  const [userId, setUserId] = useState(null)
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Update local storage whenever timer or balance changes
  useEffect(() => {
    localStorage.setItem('timer', timer)
    localStorage.setItem('balance', balance.toFixed(4))
  }, [timer, balance])

  // Fetch user ID
  const fetchUserId = async () => {
    try {
      const response = await fetch('http://localhost:3000/auth/user-data', {
        method: 'GET',
        credentials: 'include' // Ensure cookies are sent with the request
      })

      if (!response.ok) {
        throw new Error('Failed to fetch user data')
      }

      const data = await response.json()
      return data.id
    } catch (error) {
      console.error('Error fetching user ID:', error)
      return null
    }
  }

  useEffect(() => {
    const fetchAndSetUserId = async () => {
      const id = await fetchUserId()
      if (id) {
        setUserId(id)
        // Fetch user progress after retrieving the user ID
        fetchProgress(id)
      } else {
        console.error('No user ID found')
      }
    }

    fetchAndSetUserId()
  }, [])

  // Fetch progress from the backend
  const fetchProgress = async (userId) => {
    if (!userId) return

    try {
      const response = await fetch(`http://localhost:3000/api/balance/${userId}`, {
        method: 'GET',
        credentials: 'include'
      })
      if (!response.ok) throw new Error('Failed to fetch progress')
      const data = await response.json()
      setBalance(data.balance)
      setTimer(data.timer)
    } catch (err) {
      console.error(err.message)
    }
  }

  // Start mining process
  const handleStart = async () => {
    if (!isRunning) {
      setIsRunning(true)
    }
  }

  // Refresh the balance and timer
  const handleRefresh = async () => {
    setIsRefreshing(true) // Set loader to true
    try {
      await fetchProgress(userId) // Update from backend
    } finally {
      setIsRefreshing(false) // Remove loader after API completes
    }
  }

  // Timer and balance update logic
  useEffect(() => {
    let interval = null
    if (isRunning) {
      interval = setInterval(async () => {
        setTimer((prev) => {
          if (prev <= 0) {
            clearInterval(interval)
            setTimer(86400) // Reset timer for next session
            setIsRunning(false)
            return prev
          }
          return prev - 1
        })

        // Update balance locally
        setBalance((prev) => prev + 0.0001)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRunning])

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  }

  return (
    <div className="flex-col flex items-center justify-center p-2">
      <div
        className="p-5 m-5 rounded-lg bg-gray-300 focus:outline-none"
        style={{ width: '280px', height: '150px' }}
      >
        <div className="flex text-xl">
          <h2 className="text-green-700">Current balance: </h2>
          <h2 className="mx-2 ">{balance.toFixed(4)}</h2>
        </div>
        <div className="flex text-sm pt-5 mt-5">
          <h2 className="">Timer: </h2>
          <h2 className="mx-2"> {formatTime(timer)}</h2>
        </div>
      </div>
      <div className="rounded-xl m-2 flex-grow flex items-center justify-center">
        {/* Start Button */}
        <button
          id="start"
          className={`bg-green-400 hover:bg-emerald-900 p-2 mr-4 rounded-lg shadow-lg focus:outline-none ${
            isRunning ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={handleStart}
          disabled={isRunning}
          title="Start Mining"
        >
          <img src={start} alt="start" className="h-5" />
        </button>

        {/* Refresh Button */}
        <button
          id="refresh"
          className={`bg-green-400 hover:bg-emerald-900 p-2 ml-4 rounded-lg shadow-lg focus:outline-none ${
            isRefreshing ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={handleRefresh}
          disabled={isRefreshing}
          title="Refresh Balance"
        >
          {isRefreshing ? (
            <div className="spinner h-5 w-5 border-2 border-t-green-700 border-green-400 rounded-full animate-spin"></div>
          ) : (
            <img src={refresh} alt="refresh" className="h-5" />
          )}
        </button>
      </div>
    </div>
  )
}
