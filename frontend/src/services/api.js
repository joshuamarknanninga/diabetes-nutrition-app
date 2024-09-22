import axios from 'axios';

const api = axios.create({
  baseURL: 'http://your-backend-url/api',
});

// Add a request interceptor to include JWT token if available
api.interceptors.request.use((config) => {
  const token = // Retrieve token from storage (e.g., AsyncStorage)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
