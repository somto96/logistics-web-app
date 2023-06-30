import { ToastNotify } from '../../helperFunctions/toastNotify';
import { useAxiosPrivate } from '../../../utils/apiService/useAxiosPrivate';
import { POST_FETCH_PACKAGES } from '../../urls';
import {
  setPackages,
  setPaginationControls,
  setLoadingState,
} from '../../../store/dashboard/slice';
import { useDispatch } from 'react-redux';

export const useFetchPackages = () => {
  const makePrivateRequest = useAxiosPrivate();
  const dispatch = useDispatch();

  const handleFetchPackages = async (payload: any) => {
    dispatch(setLoadingState(['fetch_packages']));
    try {
      const response = await makePrivateRequest.post(POST_FETCH_PACKAGES, payload);
      dispatch(setPackages(response?.data?.responseObject));
      dispatch(setPaginationControls(payload));
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
    handleFetchPackages,
  };
};
