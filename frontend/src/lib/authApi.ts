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

authApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refresh_token');
        if (!refreshToken) throw new Error('No refresh token');

        const res = await axios.post('http://localhost:8000/api/users/token/refresh/', {
          refresh: refreshToken,
        });

        const newAccessToken = res.data.access;
        localStorage.setItem('access_token', newAccessToken);

        
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return authApi(originalRequest);
      } catch (refreshError) {
        console.error('Refresh token expired or invalid');

        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export const registerUser = (userData: any) => authApi.post('register/', userData);

export const loginUser = (credentials: { username: string; password: string }) =>
  authApi.post('token/', credentials);

export const fetchUserProfile = () =>
  authApi.get('/me/');

export default authApi;