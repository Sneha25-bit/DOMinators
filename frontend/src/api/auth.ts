import apiClient from './index';

export const registerUser = (userData: any) =>
  apiClient.post('users/register/', userData);

export const loginUser = (credentials: { username: string; password: string }) =>
  apiClient.post('users/token/', credentials);

export const fetchUserProfile = (accessToken: string) =>
  apiClient.get('users/me/', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });