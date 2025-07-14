
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Camera, MapPin, Users, Eye } from 'lucide-react';

const ExploreOceanPage = () => {
  const liveCams = [
    {
      id: 1,
      title: 'Monterey Bay Aquarium',
      location: 'California, USA',
      viewers: 1234,
      embedId: 'fVa6-zCBR7A', 
      description: 'Watch sea otters, kelp forest, and various marine life'
    },
    {
      id: 2,
      title: 'Coral Reef Live',
      location: 'Great Barrier Reef, Australia',
      viewers: 856,
      embedId: 'jzx_n25g3kA',
      description: 'Experience the vibrant coral ecosystem'
    },
    {
      id: 3,
      title: 'Deep Sea Exploration',
      location: 'Pacific Ocean',
      viewers: 642,
      embedId: 'EF8C4v7JIbA',
      description: 'Discover the mysteries of the deep ocean'
    },
    {
      id: 4,
      title: 'Tropical Reef',
      location: 'Palau',
      viewers: 923,
      embedId: 'DHUnz4dyb54',
      description: 'Colorful tropical fish in crystal clear waters'
    }
  ];

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center">
            <Camera className="w-10 h-10 mr-4" />
            Explore Ocean Live
            <Camera className="w-10 h-10 ml-4" />
          </h1>
          <p className="text-white/80 text-lg">
            Witness the beauty of marine life through live underwater cameras from around the world
          </p>
        </div>

        {/* Live Cameras Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {liveCams.map((cam) => (
            <Card key={cam.id} className="bg-white/20 backdrop-blur-md border-white/30 overflow-hidden">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-white flex items-center">
                      {cam.title}
                      <Badge className="ml-2 bg-red-600 text-white animate-pulse">
                        LIVE
                      </Badge>
                    </CardTitle>
                    <CardDescription className="text-white/70 flex items-center mt-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      {cam.location}
                    </CardDescription>
                  </div>
                  <div className="flex items-center text-white/70 text-sm">
                    <Eye className="w-4 h-4 mr-1" />
                    {cam.viewers.toLocaleString()}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* YouTube Embed */}
                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${cam.embedId}?autoplay=1&mute=1&controls=1`}
                    title={cam.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0"
                  ></iframe>
                </div>
                <p className="text-white/90 text-sm">{cam.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Info Section */}
        <Card className="bg-white/20 backdrop-blur-md border-white/30">
          <CardHeader>
            <CardTitle className="text-white">About Live Ocean Cams</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white/90 leading-relaxed">
              These live underwater cameras provide real-time views of marine ecosystems around the world. 
              From coral reefs to kelp forests, witness the daily lives of marine creatures in their natural habitats. 
              Each camera offers a unique perspective on ocean life, helping us understand and appreciate the beauty 
              and complexity of our underwater world.
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ExploreOceanPage;
