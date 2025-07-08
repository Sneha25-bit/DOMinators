import { useNavigate } from 'react-router-dom'
import './Info.css'

const Info = () => {
  const navigate = useNavigate()

  return (
    <div className="hero d-flex flex-column justify-content-center align-items-center text-center">
      <h1 className="display-3 fw-bold text-white">Explore the Ocean with Ripple Reef</h1>
      <p className="lead text-white-50 mt-3 mb-4">
        Dive into marine life, play ocean-themed games, and support marine conservation.
      </p>
      <button className="btn btn-outline-light btn-lg" onClick={() => navigate('/login')}>
        Get Started
      </button>
    </div>
  )
}

export default Info
