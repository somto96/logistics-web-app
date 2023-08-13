import { ToastNotify } from '../../../helperFunctions/toastNotify';
import { useAxiosPrivate } from '../../../apiService/useAxiosPrivate';
import { POST_FETCH_ADMIN_PACKAGES } from '../../../urls';
import {
  setAdminPackages,
  setPaginationControls,
  setLoadingState,
} from '../../../../store/dashboard/slice';
import { useDispatch } from 'react-redux';

export const useFetchAdminPackages = () => {
  const makePrivateRequest = useAxiosPrivate();
  const dispatch = useDispatch();

  const handleFetchAdminPackages = async (payload: any) => {
    dispatch(setLoadingState(['fetch_admin_packages']));
    try {
      const response = await makePrivateRequest.post(POST_FETCH_ADMIN_PACKAGES, payload);
      dispatch(setAdminPackages(response?.data?.responseObject));
      dispatch(setPaginationControls(payload));
      dispatch(setLoadingState([]));
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
    handleFetchAdminPackages,
  };
};
