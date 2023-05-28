import { removeLoadingState } from '../../utils/helperFunctions';
import { ToastNotify } from '../../utils/helperFunctions/toastNotify';
import { OnboardingState } from 'store/interfaces';

export const triggerCreateAccounts = (state: OnboardingState, action: any) => {
  state.loading = removeLoadingState(state.loading, 'POST_CREATE_ACCOUNTS');

  if (action?.payload?.data?.isSuccessful && action?.payload?.status === 200) {
    state.createAccount = {
      ...state.createAccount,
      successStatus: true,
      successMessage: {
        title: action?.payload?.data?.message,
        action: action?.payload?.data?.responseObject
      },
    };
    ToastNotify({
      type: 'success',
      message: action?.payload?.data?.message,
      position: 'top-right',
    });
  } else {
    state.createAccount = {
      ...state.createAccount,
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
export const triggerSetPassword = (state: OnboardingState, action: any) => {
  state.loading = removeLoadingState(state.loading, 'POST_SET_PASSWORD');

  if (action?.payload?.data?.isSuccessful && action?.payload?.status === 200) {
    state.setPassword = {
      ...state.setPassword,
      successStatus: true,
      successMessage: {
        title: action?.payload?.data?.message,
        action: action?.payload?.data?.responseObject
      },
    };
    ToastNotify({
      type: 'success',
      message: action?.payload?.data?.message,
      position: 'top-right',
    });
  } else {
    state.setPassword = {
      ...state.setPassword,
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
