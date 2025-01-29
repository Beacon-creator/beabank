/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import refresh from '../../assets/refresh.svg';
import start from '../../assets/start.png';

export default function Progress() {
  const [timer, setTimer] = useState("00:00:00");
  const [rawTimer, setRawTimer] = useState(86400);
  const [isRunning, setIsRunning] = useState(false);
  const [balance, setBalance] = useState(0.0);
  const [userId, setUserId] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [userError, setUserError] = useState('');

  const formatTime = (seconds) => {
    if (isNaN(seconds)) return "00:00:00";
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Enhanced user data fetching
  const fetchUserData = async () => {
    try {
      const response = await fetch('https://beabankapi.onrender.com/auth/user-data', {
        method: 'GET',
        credentials: 'include', // Send cookies
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Invalid response format');
      }

      const data = await response.json();
      if (!data.id) throw new Error('Invalid user data structure');
      
      setUserId(data.id);
      fetchProgress(data.id);
      setUserError('');

    } catch (error) {
      console.error('User data fetch error:', error);
      setUserError('Failed to load data. Please login again.');
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchProgress = async (id) => {
    if (!id) return;
    
    try {
      const response = await fetch(`https://beabankapi.onrender.com/api/balance/${id}`, {
        method: 'GET',
        credentials: 'include',
      });
      
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      
      const data = await response.json();
      setBalance(parseFloat(data.balance));
      setRawTimer(data.timer);
      setTimer(formatTime(data.timer));
      setLastUpdated(new Date(data.lastUpdated));
      setIsRunning(data.timer > 0);
      
    } catch (error) {
      console.error('Progress fetch error:', error);
    }
  };

  // Timer management useEffect
  useEffect(() => {
    let interval;
    let syncInterval;
  
    const syncWithBackend = async () => {
      if (isRunning && userId) {
        try {
          const response = await fetch(`https://beabankapi.onrender.com/api/balance/${userId}`, {
            method: 'GET',
            credentials: 'include',
          });
  
          if (!response.ok) throw new Error('Failed to sync with backend');
  
          const data = await response.json();
          setBalance(parseFloat(data.balance));
          setRawTimer(data.timer);
          setTimer(formatTime(data.timer));
          setIsRunning(data.timer > 0);
        } catch (error) {
          console.error('Sync error:', error);
        }
      }
    };
  
    if (isRunning && rawTimer > 0) {
      // Local countdown
      interval = setInterval(() => {
        setRawTimer(prev => {
          const newTime = prev - 1;
          if (newTime <= 0) {
            setIsRunning(false);
            return 0;
          }
          return newTime;
        });
      }, 1000);
  
      // Sync with backend every 30 seconds
      syncInterval = setInterval(syncWithBackend, 30000);
    }
  
    return () => {
      clearInterval(interval);
      clearInterval(syncInterval);
    };
  }, [isRunning, rawTimer, userId]);

  const handleStart = async () => {
    if (!isRunning && userId) {
      try {
        const response = await fetch(`https://beabankapi.onrender.com/api/start-mining`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ userId })
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Start mining failed');
        }

        const data = await response.json();
        setRawTimer(data.timer);
        setTimer(formatTime(data.timer));
        setBalance(parseFloat(data.balance));
        setIsRunning(true);
        setLastUpdated(new Date(data.lastUpdated));

      } catch (error) {
        console.error('Start mining error:', error.message);
      }
    }
  };

  const handleRefresh = async () => {
    if (isRefreshing || !userId) return;
    setIsRefreshing(true);
    try {
      await fetchProgress(userId);
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <div className="flex-col flex items-center justify-center p-2">
      {userError && (
        <div className="text-red-500 mb-4 p-2 bg-red-100 rounded">
          {userError}
        </div>
      )}
      
      <div className="p-5 m-5 rounded-lg bg-gray-300" style={{ width: '280px', height: '150px' }}>
        <div className="flex text-xl">
          <h2 className="text-green-700">Current balance: </h2>
          <h2 className="mx-2">{balance.toFixed(4)}</h2>
        </div>
        
        <div className="flex flex-col text-sm pt-5 mt-5">
          <div className="flex items-center">
            <h2>Timer : </h2>
            <h2 className="mx-1">{timer}</h2>
            {isRunning && (
              <span className="ml-2 mt-0.5 h-2 w-2 bg-green-500 rounded-full animate-pulse" 
                    title="Timer is running" />
            )}
          </div>
          {isRunning && (
            <p className="text-xs text-green-700 mt-1">
              Mining in progress...
            </p>
          )}
        </div>
      </div>

      <div className="rounded-xl m-2 flex-grow flex items-center justify-center">
        <button
          id="start"
          className={`bg-green-400 hover:bg-emerald-900 p-2 mr-4 rounded-lg shadow-lg transition-colors ${
            isRunning ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={handleStart}
          disabled={isRunning}
          title="Start Mining"
        >
          <img src={start} alt="start" className="h-5" />
        </button>

        <button
          id="refresh"
          className={`bg-green-400 hover:bg-emerald-900 p-2 ml-4 rounded-lg shadow-lg transition-colors ${
            isRefreshing ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={handleRefresh}
          disabled={isRefreshing}
          title="Refresh Balance"
        >
          {isRefreshing ? (
            <div className="spinner h-5 w-5 border-2 border-t-green-700 border-green-400 rounded-full animate-spin" />
          ) : (
            <img src={refresh} alt="refresh" className="h-5" />
          )}
        </button>
      </div>
    </div>
  );
}