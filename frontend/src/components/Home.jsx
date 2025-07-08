import './Home.css'

const Home = () => {
  return (
    <div className="home-container text-center text-dark">

      {/* Welcome Banner */}
      <header className="bg-light py-5">
        <h1 className="display-4 fw-bold">Welcome to Ripple Reef</h1>
        <p className="lead">Your portal to marine adventures, games, and ocean exploration</p>
      </header>

      {/* Features Section */}
      <section className="container my-5">
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Community</h5>
                <p className="card-text">Connect with ocean lovers, share updates, and participate in challenges.</p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Ocean Games</h5>
                <p className="card-text">Play fun marine-themed games like Guess the Fish and Tic Tac Toe.</p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Live Ocean Cams</h5>
                <p className="card-text">Watch underwater live streams and experience marine life up close.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section bg-primary text-white py-5">
        <h2 className="fw-bold mb-3">Support Ocean Conservation</h2>
        <p className="mb-4">Make a donation, track your impact, and join the movement to protect marine life.</p>
        <button className="btn btn-light btn-lg">Donate Now</button>
      </section>

    </div>
  )
}

export default Home
