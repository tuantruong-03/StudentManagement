import axios from 'axios';
import { useAuth } from './AuthProvider';


const useApi = () => {
  const { token } = useAuth();
  
  const api = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    withCredentials: true
  });

  api.interceptors.request.use(
    config => {
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );

  return api;
};

export default useApi;
