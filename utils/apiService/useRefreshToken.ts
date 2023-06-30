import { makeRequest } from './useApiRequest';
import { setTokenAndRefreshToken, useAuthState } from './../../store/auth/slice';
import { POST_REFRESH_TOKEN } from '../urls';

export const useRefreshToken = () => {
  const auth = useAuthState();

  const refreshToken = async () => {
    const response = await makeRequest.post(POST_REFRESH_TOKEN, {
      refreshToken: auth?.loginData?.user?.token,
    });
    setTokenAndRefreshToken({
        token: response?.data?.responseObject?.token,
        reissueToken: response?.data?.responseObject?.refreshToken
    })
    return response?.data?.responseObject?.token
  };

  return refreshToken
};
