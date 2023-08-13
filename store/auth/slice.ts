import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AuthState } from '../interfaces';
import { RootState } from '../store';
import { useSelector } from 'react-redux';


const dataObject = {
  loading: [],
  loginData: {
    user: {
      token: '',
      reIssueToken: '',
      name: '',
      email: '',
      phoneNumber: '',
      role: '',
      id: '',
    },
    isLoggedIn: false,
    successStatus: false,
    successMessage: {
      title: '',
      action: '',
    },
    errorMessage: '',
  },
} as AuthState;

export const initialState: AuthState = { ...dataObject };

export const authSlice = createSlice({
  name: 'auth',
  initialState,

  reducers: {
    resetAuthState: (): AuthState => initialState,
    setLogin: (state: AuthState, action: PayloadAction<any>) => {
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
    },
    setTokenAndRefreshToken: (state: AuthState, action: PayloadAction<any>) => {
      state.loginData.user = {
        ...state.loginData.user,
        token: action?.payload?.token,
        reIssueToken: action?.payload?.refreshToken,
      };
    },
  },
});

// Selectors
const selectAuth = (state: RootState) => state.auth;

// Reducers and actions
export const { resetAuthState, setLogin, setTokenAndRefreshToken } = authSlice.actions;

//App Redux State
export const useAuthState = () => useSelector(selectAuth);

export default authSlice.reducer;
