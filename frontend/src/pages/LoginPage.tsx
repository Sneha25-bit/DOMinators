"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Waves, Fish, Sparkles, Eye, EyeOff } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { toast } from "sonner"
import { loginUser, fetchUserProfile } from "@/api/auth"
import "../styles/animations.css" // Import the shared animations CSS

const LoginPage = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })

  useEffect(() => {
    // Enhanced floating bubbles
    const createBubble = () => {
      const bubble = document.createElement("div")
      const size = Math.random() * 40 + 15
      const speed = Math.random() * 3 + 2

      bubble.className = "bubble"
      bubble.style.cssText = `
        position: fixed;
        left: ${Math.random() * 100}vw;
        bottom: -100px;
        width: ${size}px;
        height: ${size}px;
        background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.6), rgba(59,130,246,0.3));
        border-radius: 50%;
        pointer-events: none;
        z-index: 1;
        animation: floatUp ${speed + 6}s linear infinite;
        box-shadow: 0 0 15px rgba(59,130,246,0.2);
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
      const fishTypes = ["🐠", "🐟", "🐡", "🦑"]
      const randomFish = fishTypes[Math.floor(Math.random() * fishTypes.length)]
      const size = Math.random() * 25 + 15
      const speed = Math.random() * 12 + 8

      fish.innerHTML = randomFish
      fish.style.cssText = `
        position: fixed;
        right: -100px;
        top: ${Math.random() * 70 + 15}%;
        font-size: ${size}px;
        pointer-events: none;
        z-index: 1;
        animation: swimAcross ${speed}s linear infinite;
        filter: drop-shadow(0 0 8px rgba(59,130,246,0.4));
        opacity: 0.7;
      `

      document.body.appendChild(fish)

      setTimeout(() => {
        if (document.body.contains(fish)) {
          document.body.removeChild(fish)
        }
      }, speed * 1000)
    }

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const bubbleInterval = setInterval(createBubble, 1500)
    const fishInterval = setInterval(createFish, 4000)

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      clearInterval(bubbleInterval)
      clearInterval(fishInterval)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.username || !formData.password) {
      toast.error("Please fill in all fields")
      return
    }
    try {
      const { data } = await loginUser(formData)
      const access = data.access
      const refresh = data.refresh
      // Store access & refresh tokens
      localStorage.setItem("access_token", access)
      localStorage.setItem("refresh_token", refresh)

      const { data: user } = await fetchUserProfile(access)
      login(user, access)

      toast.success("Welcome back to Ocean Explorer!")
      window.location.href = "/home"
    } catch (error: any) {
      toast.error("Invalid username or password")
    }
  }

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
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="absolute bg-gradient-to-b from-cyan-300/8 via-blue-300/4 to-transparent animate-pulse"
            style={{
              left: `${15 + index * 15}%`,
              top: "-10%",
              width: "2px",
              height: "120%",
              transform: `rotate(${-10 + index * 3}deg)`,
              animationDelay: `${index * 1}s`,
              animationDuration: `${5 + index * 0.5}s`,
              filter: "blur(1px)",
            }}
          />
        ))}
      </div>

      {/* Animated Caustics Effect */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 via-transparent to-blue-400/20 animate-pulse"></div>
        <div
          className="absolute inset-0 bg-gradient-to-tl from-teal-400/15 via-transparent to-cyan-400/15 animate-pulse"
          style={{ animationDelay: "1.5s" }}
        ></div>
      </div>

      {/* Interactive Mouse Follower */}
      <div
        className="fixed w-4 h-4 pointer-events-none z-50 transition-all duration-300 ease-out"
        style={{
          left: mousePosition.x - 8,
          top: mousePosition.y - 8,
          background: "radial-gradient(circle, rgba(59,130,246,0.4), transparent)",
          borderRadius: "50%",
          filter: "blur(6px)",
        }}
      />

      {/* Enhanced Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-cyan-400/15 to-blue-500/8 rounded-full blur-2xl animate-pulse"></div>
        <div
          className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-teal-400/12 to-cyan-500/8 rounded-full blur-xl animate-bounce"
          style={{ animationDuration: "4s" }}
        ></div>
        <div
          className="absolute bottom-32 left-1/4 w-40 h-40 bg-gradient-to-br from-blue-400/8 to-indigo-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-20 right-1/3 w-28 h-28 bg-gradient-to-br from-purple-400/12 to-blue-500/8 rounded-full blur-2xl animate-bounce"
          style={{ animationDuration: "6s", animationDelay: "2s" }}
        ></div>

        {/* Floating Marine Elements */}
        {["🐚", "⭐", "🪸", "🦀"].map((icon, index) => (
          <div
            key={index}
            className="absolute text-3xl opacity-20 animate-bounce filter drop-shadow-lg"
            style={{
              left: `${Math.random() * 90 + 5}%`,
              top: `${Math.random() * 80 + 10}%`,
              animationDelay: `${index * 1.5}s`,
              animationDuration: `${6 + index}s`,
              filter: "drop-shadow(0 0 10px rgba(59,130,246,0.3))",
            }}
          >
            {icon}
          </div>
        ))}
      </div>

      {/* Enhanced Wave Animation */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg className="absolute bottom-0 w-full h-32 opacity-40" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            fill="rgba(59,130,246,0.2)"
          >
            <animate
              attributeName="d"
              dur="12s"
              repeatCount="indefinite"
              values="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z;M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z;M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            />
          </path>
        </svg>

        <svg className="absolute bottom-0 w-full h-20 opacity-50" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V7.23C0,65.52,268.63,112.77,600,112.77S1200,65.52,1200,7.23V0Z" fill="rgba(34,197,94,0.1)">
            <animate
              attributeName="d"
              dur="8s"
              repeatCount="indefinite"
              values="M0,0V7.23C0,65.52,268.63,112.77,600,112.77S1200,65.52,1200,7.23V0Z;M0,0V4.23C0,41.52,268.63,76.77,600,76.77S1200,41.52,1200,4.23V0Z;M0,0V7.23C0,65.52,268.63,112.77,600,112.77S1200,65.52,1200,7.23V0Z"
            />
          </path>
        </svg>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl relative overflow-hidden">
          {/* Card Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>

          <CardHeader className="text-center relative z-10">
            <div className="flex items-center justify-center mb-6">
              <Waves className="w-10 h-10 text-cyan-300 mr-3 animate-pulse" />
              <div className="relative">
                <CardTitle className="text-3xl text-white font-bold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
                  Welcome Back
                </CardTitle>
                <Sparkles className="absolute -top-2 -right-6 w-6 h-6 text-yellow-300 animate-spin" />
              </div>
              <Fish className="w-10 h-10 text-blue-300 ml-3 animate-bounce" />
            </div>
            <CardDescription className="text-blue-100 text-lg">
              Sign in to continue your ocean exploration
            </CardDescription>
          </CardHeader>

          <CardContent className="relative z-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-white font-medium">
                  Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={(e) => setFormData((prev) => ({ ...prev, username: e.target.value }))}
                  className="bg-white/15 border-white/30 text-white placeholder:text-white/60 focus:border-cyan-400 focus:ring-cyan-400/20 transition-all duration-300"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                    className="bg-white/15 border-white/30 text-white placeholder:text-white/60 focus:border-cyan-400 focus:ring-cyan-400/20 transition-all duration-300 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors duration-200"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white py-3 text-lg font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10">Sign In & Dive In 🌊</span>
              </Button>
            </form>
            <div className="mt-6 text-center">
              <p className="text-blue-100">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-cyan-300 hover:text-cyan-200 font-medium hover:underline transition-colors duration-200"
                >
                  Join the community
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default LoginPage
