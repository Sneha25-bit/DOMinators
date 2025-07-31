import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Waves, Fish, Sparkles, ArrowRight, Star } from "lucide-react"
import "../styles/animations.css"

const InfoPage = () => {
  const navigate = useNavigate()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    // Enhanced floating bubbles with different sizes and speeds
    const createBubble = () => {
      const bubble = document.createElement("div")
      const size = Math.random() * 60 + 20
      const speed = Math.random() * 3 + 2

      bubble.className = "bubble"
      bubble.style.cssText = `
        position: fixed;
        left: ${Math.random() * 100}vw;
        bottom: -100px;
        width: ${size}px;
        height: ${size}px;
        background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), rgba(59,130,246,0.4));
        border-radius: 50%;
        pointer-events: none;
        z-index: 1;
        animation: floatUp ${speed + 6}s linear infinite;
        box-shadow: 0 0 20px rgba(59,130,246,0.3);
      `

      document.body.appendChild(bubble)

      setTimeout(
        () => {
          if (document.body.contains(bubble)) {
            document.body.removeChild(bubble)
          }
        },
        (speed + 6) * 1000,
      )
    }

    // Create swimming fish
    const createFish = () => {
      const fish = document.createElement("div")
      const fishTypes = ["🐠", "🐟", "🦈", "🐡", "🦑", "🐙"]
      const randomFish = fishTypes[Math.floor(Math.random() * fishTypes.length)]
      const size = Math.random() * 30 + 20
      const speed = Math.random() * 15 + 10

      fish.innerHTML = randomFish
      fish.style.cssText = `
        position: fixed;
        right: -100px;
        top: ${Math.random() * 80 + 10}%;
        font-size: ${size}px;
        pointer-events: none;
        z-index: 2;
        animation: swimAcross ${speed}s linear infinite;
        filter: drop-shadow(0 0 10px rgba(59,130,246,0.5));
      `

      document.body.appendChild(fish)

      setTimeout(() => {
        if (document.body.contains(fish)) {
          document.body.removeChild(fish)
        }
      }, speed * 1000)
    }

    // Mouse tracking for interactive elements
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const bubbleInterval = setInterval(createBubble, 1000)
    const fishInterval = setInterval(createFish, 3000)

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      clearInterval(bubbleInterval)
      clearInterval(fishInterval)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const stats = [
    { number: "10K+", label: "Ocean Lovers", icon: "👥" },
    { number: "500+", label: "Marine Facts", icon: "🧠" },
    { number: "50+", label: "Live Cameras", icon: "📹" },
    { number: "$100K+", label: "Donated", icon: "💝" },
  ]

  const floatingElements = [
    { icon: "🐚", delay: "0s", duration: "6s" },
    { icon: "⭐", delay: "1s", duration: "8s" },
    { icon: "🪸", delay: "2s", duration: "7s" },
    { icon: "🦀", delay: "3s", duration: "9s" },
    { icon: "🐙", delay: "4s", duration: "5s" },
    { icon: "🦑", delay: "5s", duration: "10s" },
  ]

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Enhanced Multi-Layer Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900"></div>

      {/* Animated Ocean Depth Layers */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-800/30 to-blue-900/60 animate-pulse"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/40 via-transparent to-transparent"></div>
        <div
          className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-transparent to-teal-900/20 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Underwater Light Rays */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, index) => (
          <div
            key={index}
            className="absolute bg-gradient-to-b from-cyan-300/10 via-blue-300/5 to-transparent animate-pulse"
            style={{
              left: `${10 + index * 12}%`,
              top: "-10%",
              width: "3px",
              height: "120%",
              transform: `rotate(${-15 + index * 4}deg)`,
              animationDelay: `${index * 0.8}s`,
              animationDuration: `${4 + index * 0.5}s`,
              filter: "blur(1px)",
            }}
          />
        ))}
      </div>

      {/* Animated Caustics Effect */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 via-transparent to-blue-400/20 animate-pulse"></div>
        <div
          className="absolute inset-0 bg-gradient-to-tl from-teal-400/15 via-transparent to-cyan-400/15 animate-pulse"
          style={{ animationDelay: "1.5s" }}
        ></div>
      </div>

      {/* Interactive Mouse Follower */}
      <div
        className="fixed w-6 h-6 pointer-events-none z-50 transition-all duration-300 ease-out"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          background: "radial-gradient(circle, rgba(59,130,246,0.6), transparent)",
          borderRadius: "50%",
          filter: "blur(8px)",
        }}
      />

      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Large Floating Orbs */}
        <div className="absolute top-10 left-5 w-40 h-40 bg-gradient-to-br from-cyan-400/20 to-blue-500/10 rounded-full blur-2xl animate-pulse"></div>
        <div
          className="absolute top-32 right-10 w-32 h-32 bg-gradient-to-br from-teal-400/15 to-cyan-500/10 rounded-full blur-xl animate-bounce"
          style={{ animationDuration: "4s" }}
        ></div>
        <div
          className="absolute bottom-32 left-1/4 w-48 h-48 bg-gradient-to-br from-blue-400/10 to-indigo-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-20 right-1/3 w-36 h-36 bg-gradient-to-br from-purple-400/15 to-blue-500/10 rounded-full blur-2xl animate-bounce"
          style={{ animationDuration: "6s", animationDelay: "2s" }}
        ></div>

        {/* Medium Floating Elements */}
        <div
          className="absolute top-1/4 left-1/3 w-24 h-24 bg-gradient-to-br from-cyan-300/25 to-transparent rounded-full blur-lg animate-pulse"
          style={{ animationDelay: "0.5s" }}
        ></div>
        <div
          className="absolute top-3/4 right-1/4 w-28 h-28 bg-gradient-to-br from-blue-300/20 to-transparent rounded-full blur-lg animate-bounce"
          style={{ animationDuration: "5s" }}
        ></div>

        {/* Floating Marine Elements */}
        {floatingElements.map((element, index) => (
          <div
            key={index}
            className="absolute text-4xl opacity-40 animate-bounce filter drop-shadow-lg"
            style={{
              left: `${Math.random() * 90 + 5}%`,
              top: `${Math.random() * 80 + 10}%`,
              animationDelay: element.delay,
              animationDuration: element.duration,
              filter: "drop-shadow(0 0 15px rgba(59,130,246,0.4))",
            }}
          >
            {element.icon}
          </div>
        ))}

        {/* Coral Reef Silhouettes */}
        <div className="absolute bottom-0 left-0 w-full h-32 opacity-30">
          <div className="absolute bottom-0 left-10 w-16 h-24 bg-gradient-to-t from-teal-600/40 to-transparent rounded-t-full blur-sm"></div>
          <div className="absolute bottom-0 left-32 w-12 h-20 bg-gradient-to-t from-cyan-600/30 to-transparent rounded-t-full blur-sm"></div>
          <div className="absolute bottom-0 right-20 w-20 h-28 bg-gradient-to-t from-blue-600/35 to-transparent rounded-t-full blur-sm"></div>
          <div className="absolute bottom-0 right-48 w-14 h-22 bg-gradient-to-t from-indigo-600/30 to-transparent rounded-t-full blur-sm"></div>
        </div>
      </div>

      {/* Enhanced Multi-Layer Wave Animation */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        {/* Wave Layer 1 - Deepest */}
        <svg className="absolute bottom-0 w-full h-40 opacity-60" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            fill="rgba(59,130,246,0.2)"
          >
            <animate
              attributeName="d"
              dur="15s"
              repeatCount="indefinite"
              values="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z;M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z;M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            />
          </path>
        </svg>

        {/* Wave Layer 2 - Middle */}
        <svg className="absolute bottom-0 w-full h-32 opacity-70" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V7.23C0,65.52,268.63,112.77,600,112.77S1200,65.52,1200,7.23V0Z" fill="rgba(34,197,94,0.15)">
            <animate
              attributeName="d"
              dur="10s"
              repeatCount="indefinite"
              values="M0,0V7.23C0,65.52,268.63,112.77,600,112.77S1200,65.52,1200,7.23V0Z;M0,0V4.23C0,41.52,268.63,76.77,600,76.77S1200,41.52,1200,4.23V0Z;M0,0V7.23C0,65.52,268.63,112.77,600,112.77S1200,65.52,1200,7.23V0Z"
            />
          </path>
        </svg>

        {/* Wave Layer 3 - Surface */}
        <svg className="absolute bottom-0 w-full h-24 opacity-80" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            fill="rgba(59,130,246,0.3)"
          >
            <animate
              attributeName="d"
              dur="8s"
              repeatCount="indefinite"
              values="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z;M234.39,76.44c58-10.79,114.16-20.13,172-31.86,82.39-16.72,168.19-27.73,250.45-10.39C736.78,51,819.67,82,898.66,102.83c70.05,18.48,146.53,36.09,214.34,13V0H0V47.35A600.21,600.21,0,0,0,234.39,76.44Z;M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            />
          </path>
        </svg>

        {/* Foam Layer */}
        <svg className="absolute bottom-0 w-full h-16 opacity-90" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            fill="rgba(255,255,255,0.1)"
          >
            <animate
              attributeName="d"
              dur="6s"
              repeatCount="indefinite"
              values="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z;M898.66,102.83C819.67,82,736.78,51,656.84,34.19c-82.26-17.34-168.06-6.33-250.45,10.39-57.84,11.73-114,21.07-172,31.86A600.21,600.21,0,0,1,0,47.35V120H1200V105.8C1132.19,128.92,1055.71,121.31,898.66,102.83Z;M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            />
          </path>
        </svg>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Enhanced Header */}
        <header className="text-center mb-16">
          <div className="flex items-center justify-center mb-6 group">
            <Waves className="w-16 h-16 text-cyan-300 mr-4 animate-pulse" />
            <div className="relative">
              <h1 className="text-8xl font-bold bg-gradient-to-r from-cyan-300 via-blue-300 to-teal-300 bg-clip-text text-transparent drop-shadow-2xl animate-pulse">
                Ocean Explorer
              </h1>
              <Sparkles className="absolute -top-4 -right-12 w-12 h-12 text-yellow-300 animate-spin" />
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full animate-pulse"></div>
            </div>
            <Fish className="w-16 h-16 text-blue-300 ml-4 animate-bounce" />
          </div>

          <p className="text-3xl text-blue-100 max-w-4xl mx-auto leading-relaxed mb-12 animate-fade-in">
            Dive into the fascinating world of marine life and ocean exploration. Join our community of ocean lovers and
            discover the wonders beneath the waves.
          </p>

          {/* Animated Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto mb-16">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="group bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-cyan-500/25 relative overflow-hidden"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="text-4xl mb-2 animate-bounce" style={{ animationDelay: `${index * 0.3}s` }}>
                    {stat.icon}
                  </div>
                  <div className="text-4xl font-bold text-cyan-300 mb-1">{stat.number}</div>
                  <div className="text-blue-200 text-sm">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </header>

        {/* Interactive Ocean Depth Visualization */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-white mb-4 animate-pulse">Explore Ocean Depths</h2>
            <p className="text-xl text-blue-200">Discover what lies beneath the surface...Click on the zones to know more</p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Ocean Layers */}
            <div className="space-y-6">
              {[
                { depth: "Surface", color: "from-cyan-400 to-blue-500", creatures: ["🐠", "🦈", "🐟"], height: "h-20" },
                {
                  depth: "200m - Twilight Zone",
                  color: "from-blue-600 to-indigo-700",
                  creatures: ["🦑", "🐙", "🦐"],
                  height: "h-24",
                },
                {
                  depth: "1000m - Midnight Zone",
                  color: "from-indigo-800 to-purple-900",
                  creatures: ["🐡", "🦞", "🪼"],
                  height: "h-28",
                },
                {
                  depth: "4000m - Abyssal Zone",
                  color: "from-purple-900 to-black",
                  creatures: ["🦀", "🐚", "⭐"],
                  height: "h-32",
                },
              ].map((layer, index) => (
                <div
                  key={index}
                  onClick={() => navigate("/marine-ecosystem")}
                  className={`relative ${layer.height} bg-gradient-to-r ${layer.color} rounded-2xl overflow-hidden group cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-2xl`}
                  style={{ animationDelay: `${index * 0.3}s` }}
                >
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10 flex items-center justify-between p-6 h-full">
                    <div>
                      <h3 className="text-2xl font-bold text-white">{layer.depth}</h3>
                    </div>
                    <div className="flex space-x-4">
                      {layer.creatures.map((creature, creatureIndex) => (
                        <div
                          key={creatureIndex}
                          className="text-3xl animate-bounce opacity-70 hover:opacity-100 transition-opacity duration-300"
                          style={{
                            animationDelay: `${creatureIndex * 0.5}s`,
                            animationDuration: `${2 + creatureIndex}s`,
                          }}
                        >
                          {creature}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Floating particles in each layer */}
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(5)].map((_, particleIndex) => (
                      <div
                        key={particleIndex}
                        className="absolute w-2 h-2 bg-white/30 rounded-full animate-pulse"
                        style={{
                          left: `${Math.random() * 90 + 5}%`,
                          top: `${Math.random() * 70 + 15}%`,
                          animationDelay: `${particleIndex * 0.8}s`,
                          animationDuration: `${3 + particleIndex}s`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Call to Action */}
        <div className="text-center bg-gradient-to-r from-white/15 to-white/10 backdrop-blur-lg rounded-3xl p-16 border border-white/30 shadow-2xl mb-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 animate-pulse"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-center mb-8">
              <Star className="w-12 h-12 text-yellow-300 mr-4 animate-spin" />
              <h2 className="text-5xl font-bold text-white">Ready to Explore the Ocean?</h2>
              <Star className="w-12 h-12 text-yellow-300 ml-4 animate-spin" />
            </div>
            <p className="text-blue-100 mb-10 max-w-4xl mx-auto text-2xl leading-relaxed">
              Join thousands of ocean enthusiasts in our community. Share your passion for marine life, learn
              fascinating facts, play games, and contribute to ocean conservation efforts.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button
                onClick={() => navigate("/signup")}
                className="group bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-12 py-6 text-xl rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10 flex items-center">
                  Join the Community
                  <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform duration-300" />
                </span>
              </Button>
              <Button
                onClick={() => navigate("/login")}
                variant="outline"
                className="bg-white/10 border-2 border-white/30 text-white hover:bg-white/20 hover:border-white/50 transition-all duration-300 rounded-full px-12 py-6 text-xl backdrop-blur-sm hover:scale-110"
              >
                Sign In
              </Button>
            </div>
          </div>
        </div>

        {/* Enhanced Fun Fact Teaser with Animation */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-teal-500/20 backdrop-blur-lg rounded-3xl p-10 border border-white/30 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-400 animate-pulse"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent animate-pulse"></div>
            <div className="relative z-10">
              <Fish className="w-16 h-16 text-cyan-300 mx-auto mb-6 animate-bounce" />
              <p className="text-white font-medium text-2xl mb-4 animate-fade-in">
                🐋 Did you know? Blue whales are the largest animals ever known to have lived on Earth!
              </p>
              <p className="text-blue-200 text-xl mb-6">
                Join us to discover more amazing marine facts and become an ocean expert!
              </p>
              <div className="flex justify-center space-x-3">
                {[...Array(5)].map((_, index) => (
                  <div
                    key={index}
                    className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InfoPage
