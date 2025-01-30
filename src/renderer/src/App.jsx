import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
// import { useEffect, useState } from 'react'

// Import your components
import Home from './components/Home'
import Signup from './components/Registration/Signup'
import Signin from './components/Registration/Signin'
import MinExit from './components/MinExit'

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* Navigation / Static Components */}
        <MinExit />

        {/* Main Routes */}
        <Routes>
          <Route path="/" element={<Navigate to="/signin" replace />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </Router>
  )
}
export default App
