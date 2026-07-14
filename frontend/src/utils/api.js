import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
});

// Request interceptor to attach token
api.interceptors.request.use(
  (config) => {
    const savedUser = localStorage.getItem('hello_fancy_auth');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      if (user && user.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
