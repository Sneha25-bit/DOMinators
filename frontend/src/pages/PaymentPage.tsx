import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from 'react-router-dom';


import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';
import { jwtDecode } from 'jwt-decode';
import { createDonation } from '@/api/donation';
import { addUserPoints } from '@/api/points';
import { logUserActivity } from '@/api/dashboard';
import { motion } from 'framer-motion';
import { HeartHandshake, Loader2, CheckCircle2 } from 'lucide-react';




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

const logActivity = async (
  type: 'donation',
  description: string,
  points: number
) => {
  try {
    await logUserActivity({ type, description, points });
  } catch (err) {
    console.error('Failed to log activity:', err);
  }
};

const PaymentPage: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const [selectedSchemeId, setSelectedSchemeId] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const token = localStorage.getItem('access_token');
  let userId = 0;
  if (token) {
    try {
      const decoded: any = jwtDecode(token);
      userId = decoded.user_id;
    } catch (err) {
      console.error('Token decoding failed', err);
    }
  }

  const selectedScheme = donationSchemes.find(
    (s) => s.id === selectedSchemeId
  );

  const handleDonate = async () => {
    if (!selectedSchemeId || !amount || !userId || !selectedScheme) {
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
    setSuccess(false);

    try {
  await createDonation(
    {
      scheme: selectedSchemeId,
      amount: donationAmount,
      payment_method: paymentMethod,
      user: userId,
      description: selectedScheme.description,
      impact: selectedScheme.impact,
    },
    token || ''
  );

  
  await logActivity(
    'donation',
    `Donated $${donationAmount} to ${selectedScheme.name}`,
    points
  );

  setSuccess(true);
  setMessage('Donation successful! Thank you 💙');
  setAmount('');
  setSelectedSchemeId('');

 
  toast({
    title: "Points will update after login",
    description: "You’ll see updated points after your next login.",
    duration: 5000,
  });

 
  setTimeout(() => {
    navigate('/my-donations');
  }, 2000);
} catch (error: any) {
  console.error('Donation error:', error.response?.data || error.message);
  setMessage(
    'Donation failed: ' +
      (error.response?.data?.detail || 'Unknown error')
  );
} finally {
  setLoading(false);
}

  };

  return (
    <motion.div
      className="max-w-xl mx-auto mt-12 p-4"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="shadow-xl border border-sky-200">
        <CardHeader className="flex items-center gap-2">
          <HeartHandshake className="text-blue-500" />
          <CardTitle className="text-2xl font-bold">
            Make a Donation
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6 py-4">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-3"
          >
            <label className="text-sm font-medium">Select Scheme</label>
            <Select onValueChange={setSelectedSchemeId} value={selectedSchemeId}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a scheme" />
              </SelectTrigger>
              <SelectContent>
                {donationSchemes.map((scheme) => (
                  <SelectItem key={scheme.id} value={scheme.id}>
                    {scheme.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-3"
          >
            <label className="text-sm font-medium">Amount</label>
            <Input
              type="number"
              placeholder="Enter donation amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-3"
          >
            <label className="text-sm font-medium">Payment Method</label>
            <Select onValueChange={setPaymentMethod} value={paymentMethod}>
              <SelectTrigger>
                <SelectValue placeholder="Choose payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="card">Card</SelectItem>
                <SelectItem value="paypal">PayPal</SelectItem>
                <SelectItem value="google">Google Pay</SelectItem>
                <SelectItem value="apple">Apple Pay</SelectItem>
              </SelectContent>
            </Select>
          </motion.div>

          <motion.div
            className="pt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Button
              onClick={handleDonate}
              disabled={loading}
              className="w-full"
            >
              {loading ? (
                <Loader2 className="animate-spin h-4 w-4 mr-2" />
              ) : (
                'Donate Now'
              )}
            </Button>
          </motion.div>

          {message && (
            <motion.p
              className={`text-sm text-center ${
                success ? 'text-green-600' : 'text-red-500'
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {success ? (
                <span className="flex items-center justify-center gap-2">
                  <CheckCircle2 className="text-green-600 w-4 h-4" />
                  {message}
                </span>
              ) : (
                message
              )}
            </motion.p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PaymentPage;
