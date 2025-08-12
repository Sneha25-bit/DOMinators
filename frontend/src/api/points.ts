import apiClient from './index';

export const addUserPoints = (points: number) =>
  apiClient.post('users/add-points/', { points });
