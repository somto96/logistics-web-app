import { ToastNotify } from '../../../helperFunctions/toastNotify';
import { useAxiosPrivate } from '../../../apiService/useAxiosPrivate';
import { POST_ASSIGN_PACKAGES } from '../../../urls';
import { setLoadingState } from '../../../../store/dashboard/slice';
import { useDispatch } from 'react-redux';

export const useAssignPackages = () => {
  const makePrivateRequest = useAxiosPrivate();
  const dispatch = useDispatch();

  const handleAssignPackages = async (payload: any) => {
    dispatch(setLoadingState(['assign-packages']));
    try {
      const response = await makePrivateRequest.post(POST_ASSIGN_PACKAGES, payload);
      // dispatch(setRidersList(response?.data?.responseObject));
      //   dispatch(setPaginationControls(payload));
      // if(response?.data?.responseObject)
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
    handleAssignPackages,
  };
};
