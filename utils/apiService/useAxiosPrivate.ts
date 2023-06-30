import { useEffect } from 'react';
import { useAuthState } from '../../store/auth/slice';
import { makePrivateRequest } from './useApiRequest';
import { useRefreshToken } from './useRefreshToken';

export const useAxiosPrivate = () => {
  const auth = useAuthState();
  const refresh = useRefreshToken();

  useEffect(() => {
    const requestIntercept = makePrivateRequest.interceptors.request.use(
      config => {
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${auth?.loginData?.user?.token}`;
        }
        return config;
      },
      error => Promise.reject(error)
    );
    const responseIntercept = makePrivateRequest.interceptors.response.use(
      response => response,
      async error => {
        const prevRequest = error?.config;
        if (error?.response?.status === 401) {
          const newToken = await refresh();
          prevRequest.headers['Authorization'] = `Bearer ${newToken}`;
          return makePrivateRequest(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      makePrivateRequest.interceptors.response.eject(responseIntercept);
      makePrivateRequest.interceptors.request.eject(requestIntercept);
    };
  }, [auth?.loginData?.user?.token, refresh]);
  
  return makePrivateRequest;
};
