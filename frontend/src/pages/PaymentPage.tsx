import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/Layout';
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Heart, Info, Shield, Fish, Waves, Shell } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm.tsx';
import { logUserActivity } from '@/api/dashboard';

const logActivity = async (type: 'community', description: string, points: number) => {
  try {
    await logUserActivity({ type, description, points });
  } catch (err) {
    console.error('Failed to log activity:', err);
  }
};

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY!);

const PaymentPage = () => {
  const navigate = useNavigate();
  const [selectedScheme, setSelectedScheme] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  const donationSchemes = [
    {
      id: 'coral-reef',
      name: 'Coral Reef Protection',
      description: 'Help protect coral reefs from bleaching and ocean acidification',
      minAmount: 25,
      icon: Shell,
      impact: '$25 protects 50 sq ft of coral reef for one year'
    },
    {
      id: 'sea-turtle',
      name: 'Sea Turtle Conservation',
      description: 'Support sea turtle nesting beach protection and rehabilitation',
      minAmount: 50,
      icon: Fish,
      impact: '$50 protects one sea turtle nest for the entire nesting season'
    },
    {
      id: 'ocean-cleanup',
      name: 'Ocean Cleanup Initiative',
      description: 'Remove plastic waste and debris from ocean waters',
      minAmount: 30,
      icon: Waves,
      impact: '$30 removes 25 lbs of plastic waste from the ocean'
    },
    {
      id: 'marine-research',
      name: 'Marine Research Fund',
      description: 'Support cutting-edge marine biology research projects',
      minAmount: 40,
      icon: Fish,
      impact: '$40 funds 3 hours of marine research activities'
    }
  ];

  const selectedSchemeData = donationSchemes.find(s => s.id === selectedScheme);

  const handleDonation = () => {
    if (!selectedScheme) {
      toast.error('Please select a donation scheme');
      return;
    }
    if (!amount || parseFloat(amount) < (selectedSchemeData?.minAmount || 0)) {
      toast.error(`Minimum donation amount is $${selectedSchemeData?.minAmount}`);
      return;
    }
    if (!paymentMethod) {
      toast.error('Please select a payment method');
      return;
    }

    if (paymentMethod !== 'card') {
      toast.success('Simulated payment successful! Thank you.');
      setTimeout(() => {
        navigate('/my-donations');
      }, 2000);
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center">
            <Heart className="w-10 h-10 mr-4 text-red-400" />
            Make a Donation
            <Waves className="w-10 h-10 ml-4 text-blue-400" />
          </h1>
          <p className="text-white/80 text-lg">
            Support marine life conservation and make a positive impact on our oceans
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Donation Schemes */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Choose Your Cause</h2>
            {donationSchemes.map((scheme) => {
              const Icon = scheme.icon;
              return (
                <Card
                  key={scheme.id}
                  className={`bg-white/20 backdrop-blur-md border-white/30 cursor-pointer hover:bg-white/30 transition-all ${
                    selectedScheme === scheme.id ? 'ring-2 ring-cyan-400' : ''
                  }`}
                  onClick={() => setSelectedScheme(scheme.id)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-cyan-600/20 rounded-full">
                          <Icon className="w-6 h-6 text-cyan-400" />
                        </div>
                        <div>
                          <CardTitle className="text-white">{scheme.name}</CardTitle>
                          <Badge className="bg-cyan-600 text-white mt-1">
                            Min: ${scheme.minAmount}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-white/80 mb-3">
                      {scheme.description}
                    </CardDescription>
                    <div className="bg-cyan-600/20 p-3 rounded-lg">
                      <div className="flex items-start space-x-2">
                        <Info className="w-4 h-4 text-cyan-300 mt-0.5" />
                        <p className="text-cyan-200 text-sm">{scheme.impact}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Payment Form */}
          <div className="space-y-4">
            <Card className="bg-white/20 backdrop-blur-md border-white/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Payment Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Amount */}
                <div className="space-y-2">
                  <Label className="text-white">Donation Amount ($)</Label>
                  <Input
                    type="number"
                    placeholder={selectedSchemeData ? `Min: $${selectedSchemeData.minAmount}` : 'Enter amount'}
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                  />
                </div>

                {/* Payment Method */}
                <div className="space-y-2">
                  <Label className="text-white">Payment Method</Label>
                  <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                    <SelectTrigger className="bg-white/20 border-white/30 text-white">
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="card">Credit/Debit Card</SelectItem>
                      <SelectItem value="paypal">PayPal</SelectItem>
                      <SelectItem value="apple">Apple Pay</SelectItem>
                      <SelectItem value="google">Google Pay</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Stripe Card Payment */}
                {paymentMethod === 'card' && (
                  <Elements stripe={stripePromise}>
                    <CheckoutForm
                      amount={parseFloat(amount)}
                      selectedScheme={selectedSchemeData}
                      onSuccess={() => {
                        toast.success('Payment successful! Thank you.');
                        navigate('/my-donations');
                      }}
                    />
                  </Elements>
                )}

                {/* Simulated payment button for non-card */}
                {paymentMethod !== 'card' && (
                  <Button
                    onClick={handleDonation}
                    className="w-full bg-red-600 hover:bg-red-700 text-white text-lg py-3"
                    size="lg"
                  >
                    <Heart className="w-5 h-5 mr-2" />
                    Donate {amount ? `$${amount}` : ''}
                  </Button>
                )}

                {/* Security Note */}
                <div className="bg-green-600/20 p-3 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <Shield className="w-4 h-4 text-green-300 mt-0.5" />
                    <p className="text-green-200 text-sm">
                      Your payment information is secure and encrypted. We never store your card details.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Summary */}
            {selectedSchemeData && amount && (
              <Card className="bg-white/20 backdrop-blur-md border-white/30">
                <CardHeader>
                  <CardTitle className="text-white">Donation Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-white">
                    <div className="flex justify-between">
                      <span>Cause:</span>
                      <span>{selectedSchemeData.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Amount:</span>
                      <span>${amount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Ocean Points:</span>
                      <span>+{parseFloat(amount)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PaymentPage;
