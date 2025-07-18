
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Fish, Waves, Heart, Users, Camera, Gamepad2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const HomePage = () => {
  const { user } = useAuth();
  const [currentFactIndex, setCurrentFactIndex] = useState(0);

  const funFacts = [
    {
      id: 1,
      title: "Blue Whale Hearts",
      fact: "A blue whale's heart is as big as a small car and weighs about 400 pounds!",
      emoji: "🐋",
      source: "https://www.nationalgeographic.com/animals/mammals/facts/blue-whale",
      category: "Marine Mammals"
    },
    {
      id: 2,
      title: "Ocean Depth",
      fact: "We've explored less than 5% of our oceans, making them more mysterious than outer space!",
      emoji: "🌊",
      source: "https://oceanservice.noaa.gov/facts/exploration.html",
      category: "Ocean Facts"
    },
    {
      id: 3,
      title: "Dolphin Intelligence",
      fact: "Dolphins can recognize themselves in mirrors and have names for each other!",
      emoji: "🐬",
      source: "https://www.scientificamerican.com/article/dolphin-self-recognition/",
      category: "Marine Intelligence"
    },
    {
      id: 4,
      title: "Coral Reefs",
      fact: "Coral reefs support 25% of all marine species despite covering less than 1% of the ocean floor!",
      emoji: "🪸",
      source: "https://www.coral.org/coral-reefs-101/",
      category: "Ecosystems"
    },
    {
      id: 5,
      title: "Sea Turtle Navigation",
      fact: "Sea turtles use Earth's magnetic field to navigate thousands of miles across oceans!",
      emoji: "🐢",
      source: "https://www.nature.com/articles/nature04291",
      category: "Navigation"
    }
  ];

  const oceanNews = [
    {
      id: 1,
      title: "New Deep Sea Species Discovered",
      summary: "Scientists discover 30 new species in the Pacific's Clarion-Clipperton Zone...",
      date: "2024-01-15",
      source: "https://www.bbc.com/news/science-environment",
      category: "Discovery",
      image: "🔬"
    },
    {
      id: 2,
      title: "Coral Restoration Success",
      summary: "Great Barrier Reef shows signs of recovery with new coral restoration techniques...",
      date: "2024-01-12",
      source: "https://www.reuters.com/sustainability/climate-energy/",
      category: "Conservation",
      image: "🪸"
    },
    {
      id: 3,
      title: "Ocean Cleanup Progress",
      summary: "Ocean Cleanup project removes 200,000 pounds of plastic from Pacific Ocean...",
      date: "2024-01-10",
      source: "https://theoceancleanup.com/updates/",
      category: "Environment",
      image: "♻️"
    }
  ];

  const quickActions = [
    { icon: Camera, label: "Watch Live Cams", path: "/explore-ocean", color: "bg-blue-500" },
    { icon: Gamepad2, label: "Play Games", path: "/games", color: "bg-green-500" },
    { icon: Users, label: "Join Community", path: "/community", color: "bg-purple-500" },
    { icon: Heart, label: "Make Donation", path: "/my-donations", color: "bg-red-500" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFactIndex((prev) => (prev + 1) % funFacts.length);
    }, 10000); // Change fact every 10 seconds

    return () => clearInterval(interval);
  }, []);

  const handleFactClick = (source: string) => {
    window.open(source, '_blank');
  };

  const handleNewsClick = (source: string) => {
    window.open(source, '_blank');
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4 float-animation">
            Welcome back, {user?.fullName}! 🌊
          </h1>
          <p className="text-white/80 text-lg mb-6">
            Ready to dive into today's ocean discoveries?
          </p>
          <Badge className="bg-cyan-600 text-white px-4 py-2 text-lg">
            {user?.points} Ocean Points Earned
          </Badge>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Card 
              key={index} 
              className="bg-white/20 backdrop-blur-md border-white/30 hover:bg-white/30 transition-all duration-300 cursor-pointer ripple-effect"
              onClick={() => window.location.href = action.path}
            >
              <CardContent className="p-6 text-center">
                <div className={`w-12 h-12 ${action.color} rounded-full flex items-center justify-center mx-auto mb-3`}>
                  <action.icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-white font-medium">{action.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Featured Fun Fact */}
          <Card className="bg-gradient-to-br from-cyan-500/20 to-blue-500/80 backdrop-blur-md border-white/30">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white flex items-center">
                  <Fish className="w-5 h-5 mr-2" />
                  Ocean Fun Fact
                </CardTitle>
                <span className="text-3xl">{funFacts[currentFactIndex].emoji}</span>
              </div>
            </CardHeader>
            <CardContent>
              <Badge className="mb-3 bg-white/20 text-white">
                {funFacts[currentFactIndex].category}
              </Badge>
              <h3 className="text-xl font-bold text-white mb-3">
                {funFacts[currentFactIndex].title}
              </h3>
              <p className="text-white/90 mb-4 leading-relaxed">
                {funFacts[currentFactIndex].fact}
              </p>
              <Button 
                onClick={() => handleFactClick(funFacts[currentFactIndex].source)}
                className="bg-white/20 hover:bg-white/30 text-white border border-white/30"
              >
                Learn More <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          {/* All Fun Facts */}
          <Card className="bg-white/20 backdrop-blur-md border-white/30">
            <CardHeader>
              <CardTitle className="text-white">More Ocean Facts</CardTitle>
              <CardDescription className="text-white/80">
                Click any fact to explore more
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {funFacts.map((fact, index) => (
                <div 
                  key={fact.id}
                  className={`p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                    index === currentFactIndex 
                      ? 'bg-cyan-500/30 border border-cyan-400/50' 
                      : 'bg-white/10 hover:bg-white/20'
                  }`}
                  onClick={() => handleFactClick(fact.source)}
                >
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl flex-shrink-0">{fact.emoji}</span>
                    <div className="flex-1">
                      <h4 className="text-white font-medium mb-1">{fact.title}</h4>
                      <p className="text-white/80 text-sm line-clamp-2">{fact.fact}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Ocean News Section */}
        <Card className="bg-white/20 backdrop-blur-md border-white/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Waves className="w-5 h-5 mr-2" />
              Latest Ocean News
            </CardTitle>
            <CardDescription className="text-white/80">
              Stay updated with the latest marine discoveries and conservation efforts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              {oceanNews.map((news) => (
                <div 
                  key={news.id}
                  className="bg-white/10 rounded-lg p-4 hover:bg-white/20 transition-all duration-300 cursor-pointer"
                  onClick={() => handleNewsClick(news.source)}
                >
                  <div className="flex items-center mb-3">
                    <span className="text-2xl mr-3">{news.image}</span>
                    <Badge className="bg-cyan-600/80 text-white text-xs">
                      {news.category}
                    </Badge>
                  </div>
                  <h3 className="text-white font-semibold mb-2 line-clamp-2">
                    {news.title}
                  </h3>
                  <p className="text-white/80 text-sm mb-3 line-clamp-3">
                    {news.summary}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-white/60 text-xs">{news.date}</span>
                    <ExternalLink className="w-4 h-4 text-white/60" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default HomePage;
