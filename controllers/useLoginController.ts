import { useAppDispatch } from '../utils/hooks/useReduxHooks';
import { useState } from 'react';
import { useAuthState } from '../store/auth/slice';
import { LoginType } from '../utils/types/auth';
import { POST_LOGIN_ACTION } from '../store/auth/actions';

export const useLoginController = () => {
  const dispatch = useAppDispatch();
  const authState = useAuthState();
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  //   Initial values
  const initialValueData = {
    email: '',
    password: '',
  };

  //Handler Functions
  const handleFormSubmit = async (values: LoginType) => {
    const payload: LoginType = {
      email: values.email,
      password: values.password,
    };
    dispatch(POST_LOGIN_ACTION(payload));
    setSubmitted(true);
  };

  return {
    authState,
    initialValueData,
    handleFormSubmit,
    setIsChecked,
    isChecked,
    submitted
  }
};
