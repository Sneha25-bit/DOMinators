import { Link, useLocation, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const hideNavbarOn = ['/', '/login', '/signup']
  if (hideNavbarOn.includes(location.pathname)) return null

  const handleLogout = () => {
    localStorage.clear()
    navigate('/')
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4">
      <Link className="navbar-brand" to="/home">Ripple Reef</Link>
      <div className="collapse navbar-collapse justify-content-between">
        <ul className="navbar-nav">
          <li className="nav-item"><Link className="nav-link" to="/home">Home</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/community">Community</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/games">Games</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/explore-ocean">Explore Ocean</Link></li>
        </ul>

        <button className="btn btn-outline-light" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  )
}

export default Navbar
