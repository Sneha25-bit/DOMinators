import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/community/',
  withCredentials: true, // if using session/cookie auth
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token'); // Or your context/store
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;