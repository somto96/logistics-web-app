import { ToastNotify } from '../../helperFunctions/toastNotify';
import { makeRequest } from '../../../utils/apiService/useApiRequest';
import { POST_SET_PASSWORD } from '../../urls';
import { handleSetPasswordState, setLoadingState } from '../../../store/onboarding/slice';
import { useDispatch } from 'react-redux';
import { setLogin } from 'store/auth/slice';
import { useRouter } from 'next/router';

export const useSetPassword = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSetPassword = async (payload: any) => {
    dispatch(setLoadingState(['set-password']));
    try {
      const response = await makeRequest.post(POST_SET_PASSWORD, payload);
      if (response.status === 200) {
        handleSetPasswordState(response?.data);
        dispatch(setLogin(response));
        router.push('/dashboard/user');
      }
      dispatch(setLoadingState([]));
      return ToastNotify({
        type: 'success',
        message: response?.data?.message,
        position: 'top-right',
      });
    } catch (err: any) {
      dispatch(setLoadingState([]));
      if (err?.response?.status === 500)
        return ToastNotify({
          type: 'error',
          message: 'Server error',
          position: 'top-right',
        });
      return ToastNotify({
        type: 'error',
        message: err?.response?.data?.message || err?.response?.data?.title,
        position: 'top-right',
      });
    }
  };

  return {
    handleSetPassword,
  };
};
