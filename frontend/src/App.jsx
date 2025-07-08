import './App.css'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Info from './components/Info'
import Login from './components/Login'
import Signup from './components/Signup'
import Home from './components/Home'
import Community from './components/Community'
import Games from './components/Games'
import ExploreOcean from './components/ExploreOcean'
import Footer from './components/Footer'

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />  {/* Auto-hides on non-auth pages */}
      <Routes>
        <Route path="/" element={<Info />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/community" element={<Community />} />
        <Route path="/games" element={<Games />} />
        <Route path="/explore-ocean" element={<ExploreOcean />} />
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
