import { createSlice } from '@reduxjs/toolkit';
import { AuthState } from '../interfaces';
import { RootState } from '../store';
import { useAppSelector } from '../../utils/hooks/useReduxHooks';
import { removeLoadingState } from '../../utils/helperFunctions';
import { POST_LOGIN_ACTION } from './actions';
import { triggerLogin } from './assistFunctions';

const dataObject = {
  loading: [],
  loginData: {
    user: {},
    isLoggedIn: false,
    successStatus: false,
    successMessage:{
        title: "",
        action: "",
    },
    errorMessage: "",
  }

} as AuthState;

export const initialState: AuthState = { ...dataObject };

export const authSlice = createSlice({
  name: 'auth',
  initialState,

  reducers: {
    resetAuthState: (): AuthState => initialState,
  },

  extraReducers: builder => {
    builder
      // POST_LOGIN_ACTION
      .addCase(POST_LOGIN_ACTION.pending, state => {
        state.loading = ['POST_LOGIN'];
      })
      .addCase(POST_LOGIN_ACTION.fulfilled, (state, action): void => {
        triggerLogin(state, action);
      })
      .addCase(POST_LOGIN_ACTION.rejected, (state): void => {
        state.loading = removeLoadingState(state.loading, 'POST_LOGIN');
      });
  },
});

// Selectors
const selectAuth = (state: RootState) => state.auth;

// Reducers and actions
export const { resetAuthState } = authSlice.actions;

//App Redux State
export const useAuthState = () => useAppSelector(selectAuth);

export default authSlice.reducer;
