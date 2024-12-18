import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Import your components
import Home from './components/Home'
import Signup from './components/Registration/Signup'
import Signin from './components/Registration/Signin'
import MinExit from './components/MinExit'
import Settings from './components/HomeFile/Settings'

function App() {
  return (
    <Router>
      {/* Navigation / Static Components */}
      <MinExit />

      {/* Main Routes */}
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/home" element={<Home />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>

      {/* Other components displayed outside routes */}
      {/* <div className="flex flex-col items-center">
        <Home />
       
      </div> */}
    </Router>
  )
}

export default App
