import { ToastNotify } from '../../../helperFunctions/toastNotify';
import { useAxiosPrivate } from '../../../apiService/useAxiosPrivate';
import { GET_COMPANY_ANALYTICS } from '../../../urls';
import {
  setLoadingState,
  setCustomerAnalytics,
} from '../../../../store/dashboard/slice';
import { useDispatch } from 'react-redux';

export const useFetchCompanyAnalytics = () => {
  const makePrivateRequest = useAxiosPrivate();
  const dispatch = useDispatch();

  const handleFetchCompanyAnalytics = async (payload: any) => {
    dispatch(setLoadingState(['fetch-company-analytics']));
    try {
      const response = await makePrivateRequest.get(GET_COMPANY_ANALYTICS(payload.id));
      dispatch(setCustomerAnalytics(response?.data?.responseObject));
    //   dispatch(setPaginationControls(payload));
      dispatch(setLoadingState([]));
      // return ToastNotify({
      //   type: 'success',
      //   message: response?.data?.message,
      //   position: 'top-right',
      // });
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
    handleFetchCompanyAnalytics,
  };
};
