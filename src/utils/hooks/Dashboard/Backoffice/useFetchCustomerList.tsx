import { ToastNotify } from '../../../helperFunctions/toastNotify';
import { useAxiosPrivate } from '../../../apiService/useAxiosPrivate';
import { POST_FETCH_CUSTOMERS_LIST } from '../../../urls';
import {
  setLoadingState,
  setCustomersList,
} from '../../../../store/dashboard/slice';
import { useDispatch } from 'react-redux';

export const useFetchCustomerList = () => {
  const makePrivateRequest = useAxiosPrivate();
  const dispatch = useDispatch();

  const handleFetchCustomers = async (payload: any) => {
    dispatch(setLoadingState(['fetch_customers_list']));
    try {
      const response = await makePrivateRequest.post(POST_FETCH_CUSTOMERS_LIST, payload);
      dispatch(setCustomersList(response?.data?.responseObject));
    //   dispatch(setPaginationControls(payload));
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
    handleFetchCustomers,
  };
};
