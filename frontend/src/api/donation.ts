import apiClient from './index';

interface DonationData {
  scheme: string;
  amount: number;
  payment_method: string;
  user: number;
  description: string;
  impact: string;
}

export const createDonation = (data: DonationData, token: string) => {
  return apiClient.post('/donations/create/', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
