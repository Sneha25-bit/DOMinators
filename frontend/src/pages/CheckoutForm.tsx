import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import {
  CardElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { logUserActivity } from '@/api/dashboard';

const logActivity = async (type: 'community', description: string, points: number) => {
  try {
    await logUserActivity({ type, description, points });
  } catch (err) {
    console.error('Failed to log activity:', err);
  }
};

interface CheckoutFormProps {
  amount: number;
  selectedScheme: any;
  onSuccess: () => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ amount, selectedScheme, onSuccess }) => {
  const { user, updateUserPoints } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const response = await fetch('/api/donations/create-payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            amount,
            scheme: selectedScheme?.id
          })
        });

        const data = await response.json();
        setClientSecret(data.clientSecret);
      } catch (error) {
        toast.error('Error initiating payment. Please try again.');
      }
    };

    if (amount && selectedScheme) {
      createPaymentIntent();
    }
  }, [amount, selectedScheme]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements || !clientSecret) return;

    setLoading(true);

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)!,
        billing_details: {
          name: 'Donor',
        },
      },
    });

    if (result.error) {
      toast.error(result.error.message || 'Payment failed.');
    } else if (result.paymentIntent?.status === 'succeeded') {
      onSuccess();
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="bg-white p-3 rounded-md text-black">
        <CardElement options={{ style: { base: { fontSize: '16px' } } }} />
      </div>
      <Button type="submit" disabled={!stripe || loading} className="w-full bg-red-600 hover:bg-red-700">
        {loading ? 'Processing...' : `Donate $${amount}`}
      </Button>
    </form>
  );
};

export default CheckoutForm;
