import axios from 'axios';
const API = axios.create({ baseURL: import.meta.env.VITE_SERVER_URL || 'https://chat-socket-io-axtk.onrender.com' });
API.interceptors.request.use(cfg => {
  const token = localStorage.getItem('token');
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});
export const api = API;