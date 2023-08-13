import { ToastNotify } from '../../../helperFunctions/toastNotify';
import { useAxiosPrivate } from '../../../apiService/useAxiosPrivate';
import { GET_RIDER_DETAILS } from '../../../urls';
import {
  setLoadingState,
  setPickupRiderDetails,
  setDeliveryRiderDetails,
} from '../../../../store/dashboard/slice';
import { useDispatch } from 'react-redux';

export const useFetchRiderDetails = () => {
  const makePrivateRequest = useAxiosPrivate();
  const dispatch = useDispatch();

  const handleFetchRiderDetails = async (payload: any, type: string) => {
    dispatch(setLoadingState(['fetch_rider_details']));
    try {
      const response = await makePrivateRequest.get(GET_RIDER_DETAILS(payload.id));
      if (response.status === 200) {
        if (type === 'pickup') {
          dispatch(setPickupRiderDetails(response?.data?.responseObject));
        } else {
          dispatch(setDeliveryRiderDetails(response?.data?.responseObject));
        }
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
    handleFetchRiderDetails,
  };
};
