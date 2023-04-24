import { removeLoadingState } from '@/utils/helperFunctions';
import { ToastNotify } from '@/utils/helperFunctions/toastNotify';
import { AuthState } from 'store/interfaces';

export const triggerLogin = (state: AuthState, action: any) => {
  state.loading = removeLoadingState(state.loading, 'POST_LOGIN');

  if (action?.payload?.data?.isSuccessful && action?.payload?.status === 200) {
    state.loginData = {
      ...state.loginData,
      isLoggedIn: true,
      successStatus: true,
      user: action?.payload?.data?.responseObject,
      successMessage: {
        title: action?.payload?.data?.message,
        action: '',
      },
    };
    ToastNotify({
      type: 'success',
      message: action?.payload?.data?.message,
      position: 'top-right',
    });
  } else {
    state.loginData = {
      ...state.loginData,
      isLoggedIn: false,
      successStatus: false,
      errorMessage: action?.payload?.response?.data?.message,
    };
    ToastNotify({
      type: 'error',
      message: action?.payload?.response?.data?.message,
      position: 'top-right',
    });
  }
};
