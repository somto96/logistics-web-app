import { ToastNotify } from '../../../helperFunctions/toastNotify';
import { useAxiosPrivate } from '../../../apiService/useAxiosPrivate';
import { POST_ADD_NEW_RIDER } from '../../../urls';
import { setLoadingState } from '../../../../store/dashboard/slice';
import { useDispatch } from 'react-redux';

export const useAddNewRider = () => {
  const makePrivateRequest = useAxiosPrivate();
  const dispatch = useDispatch();

  const handleAddNewRider = async (payload: any) => {
    dispatch(setLoadingState(['add-new-rider']));
    try {
      const response = await makePrivateRequest.post(POST_ADD_NEW_RIDER, payload);
      // console.log("response-new-rider", response);
      // dispatch(setRidersList(response?.data?.responseObject));
      //   dispatch(setPaginationControls(payload));
      // if(response?.data?.responseObject)
      dispatch(setLoadingState([]));
      return ToastNotify({
        type: 'success',
        message: response?.data?.responseObject,
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
    handleAddNewRider,
  };
};
