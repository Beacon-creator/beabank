import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

// Import your components
import Home from './components/Home'
import Signup from './components/Registration/Signup'
import Signin from './components/Registration/Signin'
import MinExit from './components/MinExit'


function App() {
  return (
    <Router>
      {/* Navigation / Static Components */}
      <MinExit />

      {/* Main Routes */}
      <Routes>
        <Route path="/" element={<Navigate to="/signin" replace />} /> {/* Default to Signin */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/home" element={<Home />} />
      </Routes>

      {/* Other components displayed outside routes */}
      {/* <div className="flex flex-col items-center">
        <Signin />
      </div> */}
    </Router>
  )
}

export default App
