import { ToastNotify } from '../../helperFunctions/toastNotify';
import { makeRequest } from '../../apiService/useApiRequest';
import { GET_PACKAGE_DETAILS } from '../../urls';
import { setLoadingState, setPackageDetails } from '../../../store/onboarding/slice';
import { useDispatch } from 'react-redux';

export const useFetchPackageDetails = () => {
  const dispatch = useDispatch();

  const handleFetchPackageDetails = async (payload: any) => {
    dispatch(setLoadingState(['fetch-package-details']));
    try {
      const response = await makeRequest.get(GET_PACKAGE_DETAILS(payload.trackingNumber));
      if (response.status === 200) {
        dispatch(setPackageDetails(response?.data?.responseObject));
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
    handleFetchPackageDetails,
  };
};
