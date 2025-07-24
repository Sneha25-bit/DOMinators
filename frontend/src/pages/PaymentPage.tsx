import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import {jwtDecode} from 'jwt-decode';
import { createDonation } from '@/api/donation';
import { addUserPoints } from '@/api/points';
import { logUserActivity } from '@/api/dashboard';

const logActivity = async (type: 'donation', description: string, points: number) => {
  try {
    await logUserActivity({ type, description, points });
  } catch (err) {
    console.error('Failed to log activity:', err);
  }
};

const donationSchemes = [
  {
    id: 'coral-reef',
    name: 'Coral Reef Protection',
    description: 'Helps preserve coral reefs.',
    impact: 'Funds reef monitoring and education.',
  },
  {
    id: 'sea-turtle',
    name: 'Sea Turtle Conservation',
    description: 'Protects nesting sites.',
    impact: 'Supports patrols and hatcheries.',
  },
  {
    id: 'ocean-cleanup',
    name: 'Ocean Cleanup Initiative',
    description: 'Removes plastic from oceans.',
    impact: 'Funds clean-up equipment and campaigns.',
  },
  {
    id: 'marine-research',
    name: 'Marine Research Fund',
    description: 'Supports ocean research.',
    impact: 'Enables scientific expeditions.',
  },
];

const PaymentPage: React.FC = () => {
  const [selectedSchemeId, setSelectedSchemeId] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const token = localStorage.getItem('access_token');
  const refresh = localStorage.getItem('refresh_token');

  const selectedSchemeData = donationSchemes.find(s => s.id === selectedSchemeId);

  let userId = 0;
  if (token) {
    try {
      const decoded: any = jwtDecode(token);
      userId = decoded.user_id;
    } catch (err) {
      console.error('Token decoding failed', err);
    }
  }

  const handleDonate = async () => {
    if (!selectedSchemeId || !amount || !userId || !selectedSchemeData) {
      setMessage('All fields are required.');
      return;
    }

    const donationAmount = parseFloat(amount);
    if (isNaN(donationAmount) || donationAmount <= 0) {
      setMessage('Please enter a valid donation amount.');
      return;
    }

    const points = Math.floor(donationAmount);

    setLoading(true);
    setMessage('');

    try {
      await createDonation({
        scheme: selectedSchemeId, 
        amount: parseFloat(amount),
        payment_method: paymentMethod,
        user: userId,
        description: selectedSchemeData.description,
        impact: selectedSchemeData.impact,
      }, token || '');

      await addUserPoints(points);

      await logActivity(
      'donation',
      `Donated $${donationAmount} to ${selectedSchemeData.name}`,
      points
    );

      setMessage('Donation successful! Thank you 💙');
      setAmount('');
      setSelectedSchemeId('');
    } catch (error: any) {
      console.error('Donation error:', error.response?.data || error.message);
      setMessage('Donation failed: ' + (error.response?.data?.detail || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <Card>
        <CardHeader>
          <CardTitle>Make a Donation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Select onValueChange={setSelectedSchemeId} value={selectedSchemeId}>
            <SelectTrigger>
              <SelectValue placeholder="Select a scheme" />
            </SelectTrigger>
            <SelectContent>
              {donationSchemes.map((scheme) => (
                <SelectItem key={scheme.id} value={scheme.id}>
                  {scheme.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <Select onValueChange={setPaymentMethod} value={paymentMethod}>
            <SelectTrigger>
              <SelectValue placeholder="Select payment method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="card">Card</SelectItem>
              <SelectItem value="paypal">PayPal</SelectItem>
            </SelectContent>
          </Select>

          <Button onClick={handleDonate} disabled={loading}>
            {loading ? 'Processing...' : 'Donate Now'}
          </Button>

          {message && <p className="text-center text-sm text-red-500">{message}</p>}
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentPage;