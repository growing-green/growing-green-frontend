import { baseURL } from './index';
import axios from 'axios';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 1000,
});

api.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem('user');

    if (user) {
      config.headers['Authorization'] = `bearer ${user.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default api;
