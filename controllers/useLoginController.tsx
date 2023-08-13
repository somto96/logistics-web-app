import { useState } from 'react';
import { useAuthState, setLogin } from '../store/auth/slice';
import { LoginType } from '../utils/types/auth';
import { useDispatch } from 'react-redux';
import { makeRequest } from '../utils/apiService/useApiRequest';
import { POST_LOGIN } from '../utils/urls/authRoutes';
import { useRouter } from 'next/router';
import { ToastNotify } from '../utils/helperFunctions/toastNotify';

export const useLoginController = () => {
  const dispatch = useDispatch();
  const authState = useAuthState();
  const router = useRouter();
  const [isChecked, setIsChecked] = useState<boolean>(false);
  // const [loading, setLoading] = useState<boolean>(false);

  //   Initial values
  const initialValueData = {
    email: '',
    password: '',
  };

  const redirectRoute = (role: string) => {
    switch (role?.toLowerCase()) {
      case 'company':
        return "/dashboard/user";
      case 'rider':
        return "/dashboard/rider";
      default:
        return "/dashboard/back-office";
    }
  };

  //Handler Functions
  const handleFormSubmit = async (values: LoginType) => {
    try {
      const payload: LoginType = {
        email: values.email,
        password: values.password,
      };
      const response = await makeRequest.post(POST_LOGIN, payload);
      dispatch(setLogin(response));
      ToastNotify({
        type: 'success',
        message: response?.data?.message,
        position: 'top-right',
      });
      return router.push(redirectRoute(response?.data?.responseObject?.role));
      // return router.push("/dashboard/back-office");
    } catch (error: any) {
      return ToastNotify({
        type: 'error',
        message: error?.response?.data?.message,
        position: 'top-right', 
      });
    }
  };

  return {
    authState,
    initialValueData,
    handleFormSubmit,
    setIsChecked,
    isChecked,
    // loading,
  };
};
