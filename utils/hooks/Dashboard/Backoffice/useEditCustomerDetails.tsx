import { ToastNotify } from '../../../helperFunctions/toastNotify';
import { useAxiosPrivate } from '../../../apiService/useAxiosPrivate';
import { POST_UPDATE_CUSTOMER_DETAILS } from '../../../urls';
import { setLoadingState } from '../../../../store/dashboard/slice';
import { useDispatch } from 'react-redux';

export const useEditCustomerDetails = () => {
  const makePrivateRequest = useAxiosPrivate();
  const dispatch = useDispatch();

  const handleEditCustomerDetails = async (payload: any) => {
    dispatch(setLoadingState(['update-customer-details']));
    try {
      const response = await makePrivateRequest.post(POST_UPDATE_CUSTOMER_DETAILS, payload);
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
    handleEditCustomerDetails,
  };
};
