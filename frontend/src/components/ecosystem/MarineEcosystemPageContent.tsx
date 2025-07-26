
import { useState, useEffect, useRef } from "react"
import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Waves, Anchor, Eye, Droplets } from "lucide-react"
import Layout from "@/components/Layout"

interface MarineLife {
  id: string
  name: string
  type: "fish" | "mammal" | "invertebrate" | "plant"
  description: string
  habitat: string
  diet: string
  size: string
  depth: string
  funFact: string
  position: { x: number; y: number }
}

interface OceanZone {
  id: string
  name: string
  depth: string
  description: string
  characteristics: string[]
  color: string
  life: MarineLife[]
}

const oceanZones: OceanZone[] = [
  {
    id: "sunlight",
    name: "Sunlight Zone (Epipelagic)",
    depth: "0 - 200m",
    description: "The top layer where sunlight penetrates, supporting photosynthesis and most marine life.",
    characteristics: ["Abundant sunlight", "Warm temperatures", "Rich in oxygen", "Most biodiversity"],
    color: "from-blue-300 to-blue-500",
    life: [
      {
        id: "dolphin",
        name: "Bottlenose Dolphin",
        type: "mammal",
        description: "Highly intelligent marine mammals known for their playful behavior and echolocation abilities.",
        habitat: "Coastal and open ocean waters",
        diet: "Fish, squid, and crustaceans",
        size: "2-4 meters",
        depth: "0-200m",
        funFact: "Dolphins have names for each other - unique whistle signatures!",
        position: { x: 20, y: 30 },
      },
      {
        id: "tuna",
        name: "Bluefin Tuna",
        type: "fish",
        description: "Fast-swimming predatory fish, highly valued commercially.",
        habitat: "Open ocean, migratory",
        diet: "Small fish, squid, crustaceans",
        size: "1-3 meters",
        depth: "0-250m",
        funFact: "Can swim up to 70 km/h and regulate their body temperature!",
        position: { x: 70, y: 50 },
      },
      {
        id: "kelp",
        name: "Giant Kelp",
        type: "plant",
        description: "Large brown algae forming underwater forests.",
        habitat: "Rocky coastal areas",
        diet: "Photosynthesis and nutrient absorption",
        size: "Up to 60 meters tall",
        depth: "0-40m",
        funFact: "Can grow up to 2 feet per day - one of the fastest growing organisms!",
        position: { x: 10, y: 70 },
      },
      {
        id: "sea-turtle",
        name: "Green Sea Turtle",
        type: "mammal",
        description: "Large sea turtle known for its herbivorous diet as adults.",
        habitat: "Tropical and subtropical oceans",
        diet: "Seagrass and algae (adults), jellyfish (juveniles)",
        size: "1-1.5 meters",
        depth: "0-200m",
        funFact: "They return to the same beach where they were born to lay eggs!",
        position: { x: 50, y: 20 },
      },
    ],
  },
  {
    id: "twilight",
    name: "Twilight Zone (Mesopelagic)",
    depth: "200 - 1000m",
    description: "Dimly lit zone where many creatures have bioluminescent adaptations.",
    characteristics: ["Dim light", "Cooler temperatures", "Bioluminescence common", "Vertical migration"],
    color: "from-blue-600 to-blue-800",
    life: [
      {
        id: "lanternfish",
        name: "Lanternfish",
        type: "fish",
        description: "Small bioluminescent fish that migrate vertically each day.",
        habitat: "Open ocean, mesopelagic zone",
        diet: "Zooplankton and small crustaceans",
        size: "2-30 cm",
        depth: "200-1000m",
        funFact: "They make the largest migration on Earth - vertically every day!",
        position: { x: 30, y: 40 },
      },
      {
        id: "vampire-squid",
        name: "Vampire Squid",
        type: "invertebrate",
        description: "Neither squid nor octopus, this unique cephalopod lives in oxygen minimum zones.",
        habitat: "Deep ocean, low oxygen zones",
        diet: "Marine snow and organic particles",
        size: "15-30 cm",
        depth: "600-900m",
        funFact: "Can turn itself inside out when threatened!",
        position: { x: 60, y: 60 },
      },
      {
        id: "hatchetfish",
        name: "Hatchetfish",
        type: "fish",
        description: "Silver fish with light-producing organs for camouflage.",
        habitat: "Open ocean, twilight zone",
        diet: "Small crustaceans and fish larvae",
        size: "2-12 cm",
        depth: "200-1500m",
        funFact: "Uses bioluminescence to match the light from above - perfect camouflage!",
        position: { x: 80, y: 30 },
      },
    ],
  },
  {
    id: "midnight",
    name: "Midnight Zone (Bathypelagic)",
    depth: "1000 - 4000m",
    description: "Completely dark zone with extreme pressure and cold temperatures.",
    characteristics: ["No sunlight", "Near freezing", "High pressure", "Sparse life"],
    color: "from-blue-900 to-slate-900",
    life: [
      {
        id: "anglerfish",
        name: "Anglerfish",
        type: "fish",
        description: "Predatory fish with a bioluminescent lure to attract prey.",
        habitat: "Deep ocean floor and water column",
        diet: "Fish and crustaceans",
        size: "20 cm - 1 meter",
        depth: "1000-3000m",
        funFact: "Males are much smaller and fuse permanently to females!",
        position: { x: 40, y: 50 },
      },
      {
        id: "giant-squid",
        name: "Giant Squid",
        type: "invertebrate",
        description: "Massive deep-sea cephalopod, one of the largest invertebrates.",
        habitat: "Deep ocean worldwide",
        diet: "Deep-sea fish and other squid",
        size: "Up to 13 meters",
        depth: "300-1000m",
        funFact: "Has the largest eyes in the animal kingdom - up to 25cm across!",
        position: { x: 20, y: 70 },
      },
      {
        id: "gulper-eel",
        name: "Gulper Eel",
        type: "fish",
        description: "Eel with an enormous mouth that can unhinge to swallow large prey.",
        habitat: "Deep ocean waters",
        diet: "Fish, squid, and crustaceans",
        size: "Up to 1 meter",
        depth: "500-3000m",
        funFact: "Can unhinge its massive jaw to swallow prey larger than itself!",
        position: { x: 70, y: 40 },
      },
    ],
  },
  {
    id: "abyssal",
    name: "Abyssal Zone (Abyssopelagic)",
    depth: "4000 - 6000m",
    description: "Near-freezing waters with immense pressure and unique adapted life forms.",
    characteristics: ["Extreme pressure", "Near 0°C", "Low oxygen", "Specialized organisms"],
    color: "from-slate-900 to-black",
    life: [
      {
        id: "dumbo-octopus",
        name: "Dumbo Octopus",
        type: "invertebrate",
        description: "Deep-sea octopus with ear-like fins, living at extreme depths.",
        habitat: "Deep ocean floor",
        diet: "Worms, crustaceans, and copepods",
        size: "20-30 cm",
        depth: "3000-7000m",
        funFact: "Named after Disney's Dumbo elephant due to its ear-like fins!",
        position: { x: 50, y: 60 },
      },
      {
        id: "sea-pig",
        name: "Sea Pig",
        type: "invertebrate",
        description: "Deep-sea sea cucumber that walks along the ocean floor in herds.",
        habitat: "Abyssal ocean floor",
        diet: "Organic particles in sediment",
        size: "10-15 cm",
        depth: "4000-6000m",
        funFact: "They move in herds across the seafloor like underwater pigs!",
        position: { x: 30, y: 80 },
      },
      {
        id: "tripod-fish",
        name: "Tripod Fish",
        type: "fish",
        description: "Fish that stands on the seafloor using elongated fin rays like stilts.",
        habitat: "Deep ocean floor",
        diet: "Small crustaceans and organic matter",
        size: "30-40 cm",
        depth: "900-6000m",
        funFact: "Stands on three elongated fins like a tripod to save energy!",
        position: { x: 80, y: 70 },
      },
    ],
  },
  {
    id: "hadal",
    name: "Hadal Zone (Hadalpelagic)",
    depth: "6000m+",
    description: "The deepest ocean trenches with the most extreme conditions on Earth.",
    characteristics: ["Crushing pressure", "Complete darkness", "Unique ecosystems", "Rare life forms"],
    color: "from-black to-slate-950",
    life: [
      {
        id: "snailfish",
        name: "Mariana Snailfish",
        type: "fish",
        description: "Deepest living fish, adapted to extreme pressure in ocean trenches.",
        habitat: "Ocean trenches",
        diet: "Small crustaceans and organic matter",
        size: "10-25 cm",
        depth: "6000-8000m+",
        funFact: "Holds the record for deepest living fish ever recorded!",
        position: { x: 40, y: 50 },
      },
      {
        id: "xenophyophore",
        name: "Xenophyophore",
        type: "invertebrate",
        description: "Giant single-celled organisms, among the largest cells on Earth.",
        habitat: "Deep ocean floor",
        diet: "Organic particles and bacteria",
        size: "Up to 20 cm",
        depth: "4000-10000m+",
        funFact: "Despite being single-celled, they can grow larger than a dinner plate!",
        position: { x: 60, y: 70 },
      },
      {
        id: "amphipod",
        name: "Deep-sea Amphipod",
        type: "invertebrate",
        description: "Small crustaceans that thrive in the deepest ocean trenches.",
        habitat: "Ocean trenches and deep seafloor",
        diet: "Organic matter and detritus",
        size: "1-10 cm",
        depth: "6000-11000m",
        funFact: "Can survive pressure over 1000 times greater than at sea level!",
        position: { x: 20, y: 80 },
      },
    ],
  },
]

export function MarineEcosystemPageContent() {
  const [activeZone, setActiveZone] = useState<string>("sunlight")
  const [selectedLife, setSelectedLife] = useState<MarineLife | null>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const zoneRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return

      const container = containerRef.current
      const scrollTop = container.scrollTop
      const scrollHeight = container.scrollHeight - container.clientHeight
      const progress = scrollTop / scrollHeight

      setScrollProgress(progress)

      // Determine active zone based on which section is most visible
      const containerHeight = container.clientHeight
      const containerCenter = scrollTop + containerHeight / 2

      let currentZone = "sunlight"
      let maxVisibility = 0

      oceanZones.forEach((zone) => {
        const zoneElement = zoneRefs.current[zone.id]
        if (zoneElement) {
          const zoneTop = zoneElement.offsetTop
          const zoneBottom = zoneTop + zoneElement.offsetHeight

          // Calculate how much of the zone is visible in the center area
          const visibleTop = Math.max(zoneTop, containerCenter - containerHeight / 4)
          const visibleBottom = Math.min(zoneBottom, containerCenter + containerHeight / 4)
          const visibility = Math.max(0, visibleBottom - visibleTop)

          if (visibility > maxVisibility) {
            maxVisibility = visibility
            currentZone = zone.id
          }
        }
      })

      setActiveZone(currentZone)
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener("scroll", handleScroll)
      return () => container.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const getLifeIcon = (type: string) => {
    switch (type) {
      case "fish":
        return "🐟"
      case "mammal":
        return "🐋"
      case "invertebrate":
        return "🦑"
      case "plant":
        return "🌿"
      default:
        return "🐟"
    }
  }

  const handleDepthClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return

    const rect = event.currentTarget.getBoundingClientRect()
    const clickY = event.clientY - rect.top
    const clickProgress = clickY / rect.height

    // Calculate target scroll position
    const container = containerRef.current
    const scrollHeight = container.scrollHeight - container.clientHeight
    const targetScroll = clickProgress * scrollHeight

    // Smooth scroll to target position
    container.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    })
  }

  const animationStyles = `
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
`

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-200 to-blue-900">
      <style dangerouslySetInnerHTML={{ __html: animationStyles }} />
      
      {/* Depth Progress Indicator */}
      <div className="absolute right-6 top-24 bottom-1 z-30 w-16 cursor-pointer" onClick={handleDepthClick}>
        <div className="relative h-full bg-gradient-to-b from-blue-300 via-blue-600 via-blue-900 via-slate-900 to-black rounded-full border-2 border-white/20 shadow-lg backdrop-blur-sm">
          {/* Zone markers and labels */}
          {oceanZones.map((zone, index) => {
            // Position zones based on their actual scroll position in the page
            const position = (index / (oceanZones.length - 1)) * 100
            const isActive = activeZone === zone.id

            return (
              <div key={zone.id} className="absolute w-full" style={{ top: `${position}%` }}>
                {/* Zone marker line */}
                <div className="absolute left-0 w-full h-0.5 bg-white/40" />

                {/* Zone depth label */}
                <div className="absolute right-20 top-1/2 -translate-y-1/2">
                  <div
                    className={`px-2 py-1 rounded text-xs font-medium transition-all duration-300 ${
                      isActive ? "bg-cyan-400 text-black scale-110 shadow-lg" : "bg-black/60 text-white/80"
                    }`}
                  >
                    {zone.depth}
                  </div>
                </div>

                {/* Zone name (only for active zone) */}
                {isActive && (
                  <div className="absolute right-20 top-6">
                    <div className="px-2 py-1 bg-cyan-400/90 text-black rounded text-xs font-bold whitespace-nowrap">
                      {zone.name.split(" ")[0]} Zone
                    </div>
                  </div>
                )}
              </div>
            )
          })}

          {/* Current position indicator */}
          <div
            className="absolute left-1/2 -translate-x-1/2 w-6 h-6 transition-all duration-300"
            style={{ top: `${scrollProgress * 100}%` }}
          >
            <div className="w-full h-full bg-cyan-400 rounded-full border-2 border-white shadow-lg animate-pulse">
              <div className="absolute inset-1 bg-cyan-200 rounded-full" />
            </div>

            {/* Depth readout - now shows depth based on active zone */}
            <div className="absolute right-8 top-1/2 -translate-y-1/2">
              <div className="px-3 py-1 bg-cyan-400 text-black rounded-full text-sm font-bold shadow-lg whitespace-nowrap">
                {(() => {
                  // Calculate approximate depth based on active zone and scroll progress within that zone
                  const zoneIndex = oceanZones.findIndex((z) => z.id === activeZone)
                  const zoneProgress = scrollProgress * oceanZones.length - zoneIndex

                  let depth = 0
                  switch (activeZone) {
                    case "sunlight":
                      depth = Math.round(zoneProgress * 200)
                      break
                    case "twilight":
                      depth = Math.round(200 + zoneProgress * 800)
                      break
                    case "midnight":
                      depth = Math.round(1000 + zoneProgress * 3000)
                      break
                    case "abyssal":
                      depth = Math.round(4000 + zoneProgress * 2000)
                      break
                    case "hadal":
                      depth = Math.round(6000 + zoneProgress * 5000)
                      break
                  }

                  return Math.max(0, Math.min(11000, depth))
                })()}m deep
              </div>
            </div>
          </div>

          {/* Depth scale markers */}
          {[0, 200, 1000, 4000, 6000, 11000].map((depth, index) => {
            const position = (depth / 11000) * 100
            return (
              <div key={depth} className="absolute left-0" style={{ top: `${position}%` }}>
                <div className="w-3 h-0.5 bg-white/60" />
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-xs text-white/80 font-mono">{depth}m</div>
              </div>
            )
          })}

          {/* Surface indicator */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2">
            <div className="px-2 py-1 bg-yellow-400 text-black rounded text-xs font-bold">Ocean Surface</div>
          </div>

          {/* Ocean floor indicator */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
            <div className="px-2 py-1 bg-gray-800 text-white rounded text-xs font-bold">Trench Floor</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div ref={containerRef} className="relative h-screen overflow-y-auto pt-0 pr-0 scrollbar-hide">
        {oceanZones.map((zone, index) => (
          <div
            key={zone.id}
            ref={(el) => (zoneRefs.current[zone.id] = el)}
            className={`min-h-screen relative bg-gradient-to-b ${zone.color} transition-all duration-1000`}
          >
            {/* Zone Info */}
            <div className="absolute top-8 left-8 z-20">
              <Card className="bg-white/90 backdrop-blur-sm max-w-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Anchor className="h-5 w-5" />
                    {zone.name}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <Droplets className="h-4 w-4" />
                    {zone.depth}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-3">{zone.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {zone.characteristics.map((char, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {char}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Marine Life */}
            <div className="absolute inset-0 overflow-hidden">
              {zone.life.map((life) => (
                <Button
                  key={life.id}
                  variant="ghost"
                  className="absolute p-2 hover:scale-110 transition-all duration-300 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full"
                  style={{
                    left: `${life.position.x}%`,
                    top: `${life.position.y}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                  onClick={() => setSelectedLife(life)}
                >
                  <span className="text-2xl">{getLifeIcon(life.type)}</span>
                </Button>
              ))}
            </div>

            {/* Zone Transition Effect */}
            {index < oceanZones.length - 1 && (
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-transparent to-black/20" />
            )}
          </div>
        ))}
      </div>

      {/* Marine Life Detail Modal */}
      <Dialog open={!!selectedLife} onOpenChange={() => setSelectedLife(null)}>
        <DialogContent className="max-w-2xl">
          {selectedLife && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  <span className="text-3xl">{getLifeIcon(selectedLife.type)}</span>
                  {selectedLife.name}
                </DialogTitle>
                <DialogDescription>{selectedLife.description}</DialogDescription>
              </DialogHeader>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold flex items-center gap-2">
                      <Eye className="h-4 w-4" />
                      Habitat
                    </h4>
                    <p className="text-sm text-muted-foreground">{selectedLife.habitat}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold">Diet</h4>
                    <p className="text-sm text-muted-foreground">{selectedLife.diet}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold">Size</h4>
                    <p className="text-sm text-muted-foreground">{selectedLife.size}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold flex items-center gap-2">
                      <Droplets className="h-4 w-4" />
                      Depth Range
                    </h4>
                    <p className="text-sm text-muted-foreground">{selectedLife.depth}</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">🎯 Fun Fact</h4>
                <p className="text-sm text-blue-800">{selectedLife.funFact}</p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
