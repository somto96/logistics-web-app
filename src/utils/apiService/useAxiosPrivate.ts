import { useEffect } from 'react';
import { useAuthState } from '../../store/auth/slice';
import { makePrivateRequest } from './useApiRequest';
import { useRefreshToken } from './useRefreshToken';
import { useRouter } from 'next/router';
import { ToastNotify } from '../helperFunctions/toastNotify';

export const useAxiosPrivate = () => {
  const auth = useAuthState();
  const router = useRouter();
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
        // const prevRequest = error?.config;
        if (error?.response?.status === 401) {
          ToastNotify({
            type: 'error',
            message: "Your session timed out"
          })
          return router.push("/logout")
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
