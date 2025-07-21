import apiClient from "./index";
type ActivityType = 'game' | 'donation' | 'community';

interface ActivityInput {
  type: ActivityType;
  description: string;
  points: number;
}

export const fetchUserDashboard = async () => {
  const res = await apiClient.get('users/dashboard/');
  return res.data;
};

export const logUserActivity = async (activity: ActivityInput) => {
  const res = await apiClient.post('users/dashboard/activity/', activity);
  return res.data;
};