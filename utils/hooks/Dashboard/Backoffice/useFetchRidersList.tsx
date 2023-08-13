import { ToastNotify } from '../../../helperFunctions/toastNotify';
import { useAxiosPrivate } from '../../../apiService/useAxiosPrivate';
import { POST_FETCH_RIDERS_LIST } from '../../../urls';
import {
  setLoadingState,
  setRidersList,
} from '../../../../store/dashboard/slice';
import { useDispatch } from 'react-redux';

export const useFetchRidersList = () => {
  const makePrivateRequest = useAxiosPrivate();
  const dispatch = useDispatch();

  const handleFetchRiders = async (payload: any) => {
    dispatch(setLoadingState(['fetch_riders_list']));
    try {
      const response = await makePrivateRequest.post(POST_FETCH_RIDERS_LIST, payload);
      dispatch(setRidersList(response?.data?.responseObject));
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
    handleFetchRiders,
  };
};
