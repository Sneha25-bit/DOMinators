import axios from 'axios';

const authApi = axios.create({
  baseURL: 'http://localhost:8000/api/users/',
  withCredentials: true,
});

authApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const registerUser = (userData: any) => authApi.post('register/', userData);

export const loginUser = (credentials: { username: string; password: string }) =>
  authApi.post('token/', credentials);

export const fetchUserProfile = () =>
  authApi.get('/me/');

export default authApi;