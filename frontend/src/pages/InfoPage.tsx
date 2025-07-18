
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Waves, Fish, Users, Heart, Camera, Gamepad2 } from 'lucide-react';

const InfoPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Create floating bubbles transistion effects
    const createBubble = () => {
      const bubble = document.createElement('div');
      bubble.className = 'bubble';
      bubble.style.left = Math.random() * 100 + 'vw';
      bubble.style.width = bubble.style.height = Math.random() * 50 + 20 + 'px';
      bubble.style.animationDelay = Math.random() * 8 + 's';
      document.body.appendChild(bubble);
      
      setTimeout(() => {
        if (document.body.contains(bubble)) {
          document.body.removeChild(bubble);
        }
      }, 8000);
    };

    const bubbleInterval = setInterval(createBubble, 2000);
    return () => clearInterval(bubbleInterval);
  }, []);

  const features = [
    {
      icon: Camera,
      title: "Live Ocean Cams",
      description: "Experience the underwater world through live cameras from oceans worldwide"
    },
    {
      icon: Gamepad2,
      title: "Marine Games",
      description: "Play exciting games like Tic-Tac-Toe and Guess the Fish with ocean themes"
    },
    {
      icon: Heart,
      title: "Marine Life Donations",
      description: "Support marine conservation efforts through our donation platform"
    },
    {
      icon: Users,
      title: "Ocean Community",
      description: "Connect with fellow ocean lovers and share your marine adventures"
    },
    {
      icon: Fish,
      title: "Fun Facts & News",
      description: "Discover amazing facts about marine life and stay updated with ocean news"
    },
    {
      icon: Waves,
      title: "Interactive Learning",
      description: "Learn about ocean conservation in a fun and engaging way"
    }
  ];

  return (
    <div className="min-h-screen ocean-gradient relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/info-background/5968a9fc-4957-4514-a427-0a9442a24e20.png')] bg-cover bg-center opacity-40"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12 float-animation">
          <div className="flex items-center justify-center mb-4">
            <Waves className="w-12 h-12 text-white mr-4" />
            <h1 className="text-6xl font-bold text-white drop-shadow-lg">
              Ocean Explorer
            </h1>
            <Fish className="w-12 h-12 text-white ml-4" />
          </div>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Dive into the fascinating world of marine life and ocean exploration. 
            Join our community of ocean lovers and discover the wonders beneath the waves.
          </p>
        </header>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => (
            <Card key={index} className="bg-white/20 backdrop-blur-md border-white/30 hover:bg-white/30 transition-all duration-300 ripple-effect glow">
              <CardHeader className="text-center">
                <feature.icon className="w-12 h-12 text-white mx-auto mb-2" />
                <CardTitle className="text-white">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-white/80 text-center">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center bg-white/20 backdrop-blur-md rounded-2xl p-8 border border-white/30">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Explore the Ocean?
          </h2>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Join thousands of ocean enthusiasts in our community. Share your passion for marine life, 
            learn fascinating facts, play games, and contribute to ocean conservation efforts.
          </p>
          <div className="space-x-4">
            <Button 
              onClick={() => navigate('/signup')}
              className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-3 text-lg ripple-effect"
            >
              Join the Community
            </Button>
            <Button 
              onClick={() => navigate('/login')}
              variant="outline"
              className="bg-blue-600 border-white text-white hover:bg-white/20 transition duration-200 rounded-lg px-8 py-3 text-lg"
            >
              Sign In
            </Button>
          </div>
        </div>

        {/* Fun Fact Teaser */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-md rounded-2xl p-6 border border-white/30">
            <Fish className="w-8 h-8 text-white mx-auto mb-2 float-animation" />
            <p className="text-white font-medium">
              🐋 Did you know? Blue whales are the largest animals ever known to have lived on Earth!
            </p>
            <p className="text-white/70 text-sm mt-2">
              Join us to discover more amazing marine facts!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoPage;
