import { ToastNotify } from '../../../helperFunctions/toastNotify';
import { useAxiosPrivate } from '../../../apiService/useAxiosPrivate';
import { POST_UPDATE_PACKAGE_STATUS } from '../../../urls';
import { setLoadingState } from '../../../../store/dashboard/slice';
import { useDispatch } from 'react-redux';

export const useUpdatePackageStatus = (setActiveScreen: any) => {
  const makePrivateRequest = useAxiosPrivate();
  const dispatch = useDispatch();

  const handleUpdatePackageStatus = async (payload: any) => {
    dispatch(setLoadingState(['update-package-status']));
    try {
      const response = await makePrivateRequest.post(POST_UPDATE_PACKAGE_STATUS, payload);
      // console.log('response', response);
      // dispatch(setRidersList(response?.data?.responseObject));
      //   dispatch(setPaginationControls(payload));
      // if(response?.data?.responseObject)
      response.status === 200 && setActiveScreen("dashboard-view")
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
    handleUpdatePackageStatus,
  };
};
