import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Calendar, DollarSign, Fish, Waves, Shell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import apiClient from '@/api';  

const MyDonations = () => {
  const navigate = useNavigate();
  const [donations, setDonations] = useState([]);
  const [totalDonated, setTotalDonated] = useState(0);
  const [oceanPoints, setOceanPoints] = useState(0);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        // Use apiClient instead of axios here
        const response = await apiClient.get('donation-stats/stats/');
        setDonations(response.data.donations || []);
        setTotalDonated(response.data.total_amount || 0);
        setOceanPoints(response.data.ocean_points || 0);
      } catch (error) {
        console.error('Failed to fetch donation stats:', error);
      }
    };

    fetchDonations();
  }, []);

  const handleDonateNow = () => {
    navigate('/payment');
  };



  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center">
            <Heart className="w-10 h-10 mr-4 text-red-400" />
            My Donations
            <Waves className="w-10 h-10 ml-4 text-blue-400" />
          </h1>
          <p className="text-white/80 text-lg">
            Thank you for supporting marine life conservation efforts
          </p>
        </div>

        {/* Summary Card */}
        <Card className="bg-white/20 backdrop-blur-md border-white/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <DollarSign className="w-6 h-6 mr-2" />
              Donation Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-white">${totalDonated}</p>
                <p className="text-white/70">Total Donated</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-white">{donations.length}</p>
                <p className="text-white/70">Donations Made</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-white">{oceanPoints}</p>
                <p className="text-white/70">Ocean Points Earned</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Donate Now Button */}
        <div className="text-center">
          <Button
            onClick={handleDonateNow}
            className="bg-red-600 hover:bg-red-700 text-white text-lg px-8 py-3 ripple-effect"
            size="lg"
          >
            <Heart className="w-5 h-5 mr-2" />
            Donate Now
          </Button>
        </div>

        {/* Donations List */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white mb-4">Donation History</h2>
          {donations.map((donation) => (
            <Card key={donation.id} className="bg-white/20 backdrop-blur-md border-white/30">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-cyan-600/20 rounded-full">
                      {donation.scheme.includes('Coral') && <Shell className="w-6 h-6 text-cyan-400" />}
                      {donation.scheme.includes('Turtle') && <Fish className="w-6 h-6 text-green-400" />}
                      {donation.scheme.includes('Cleanup') && <Waves className="w-6 h-6 text-blue-400" />}
                      {donation.scheme.includes('Research') && <Fish className="w-6 h-6 text-purple-400" />}
                    </div>
                    <div>
                      <CardTitle className="text-white">{donation.scheme}</CardTitle>
                      <CardDescription className="text-white/70 flex items-center mt-1">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(donation.date).toLocaleDateString()}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-white">${donation.amount}</p>
                    <Badge className="bg-green-600 text-white mt-1">
                      {donation.status}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-white/90 mb-3">{donation.description}</p>
                <div className="bg-cyan-600/20 p-3 rounded-lg">
                  <p className="text-cyan-200 font-medium">Impact:</p>
                  <p className="text-cyan-100">{donation.impact}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Impact Summary (Optional Static Block) */}
        <Card className="bg-white/20 backdrop-blur-md border-white/30">
          <CardHeader>
            <CardTitle className="text-white">Your Impact</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-white">Environmental Impact</h3>
                <ul className="space-y-2 text-white/90">
                  <li>• Protected coral reefs</li>
                  <li>• Saved endangered marine species</li>
                  <li>• Removed plastic waste</li>
                  <li>• Funded marine research</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-white">Community Recognition</h3>
                <div className="space-y-2">
                  <Badge className="bg-yellow-600 text-white mr-2">Ocean Hero</Badge>
                  <Badge className="bg-blue-600 text-white mr-2">Reef Protector</Badge>
                  <Badge className="bg-green-600 text-white">Turtle Guardian</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default MyDonations;
