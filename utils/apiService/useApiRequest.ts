import axios from 'axios';
const makeRequest = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 1 * 60 * 1000,
});

export const useApiRequest = () => {
  // Add a request interceptor
  makeRequest?.interceptors?.request.use(
    async config => {
      const userToken = localStorage.getItem('token');
      if (!userToken) return config;

      if (userToken) {
        config.headers.Authorization = 'Bearer';
        config.headers['token'] = userToken;
      }
      return config;
    },
    error => Promise.reject(error)
  );
  

  return makeRequest;
};
