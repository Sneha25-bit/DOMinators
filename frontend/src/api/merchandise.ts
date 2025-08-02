import apiClient from './index';

export const recordMerchAchievement = async (title: string) => {
  const res = await apiClient.post('users/redeem-merch/', { title });
  return res.data;
};
