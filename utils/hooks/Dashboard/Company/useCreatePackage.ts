import { ToastNotify } from '../../../helperFunctions/toastNotify';
import { useAxiosPrivate } from '../../../apiService/useAxiosPrivate';
import { POST_CREATE_PACKAGE } from '../../../urls';
import {
  setLoadingState,
  setCreateDeliveryStatus
} from '../../../../store/dashboard/slice';
import { useDispatch } from 'react-redux';

export const useCreatePackage = () => {
  const makePrivateRequest = useAxiosPrivate();
  const dispatch = useDispatch();

  const handleCreatePackage = async (payload: any) => {
    dispatch(setLoadingState(['create_package']));
    try {
      const response = await makePrivateRequest.post(POST_CREATE_PACKAGE, payload);
      if(response?.data?.isSuccessful){
        dispatch(setCreateDeliveryStatus({
          successStatus: true,
          successMessage: response?.data?.responseObject
        }));
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
    handleCreatePackage,
  };
};
