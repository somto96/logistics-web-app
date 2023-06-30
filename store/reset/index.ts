import { resetAuthState } from "store/auth/slice";
export const resetStore = (dispatch: any) => {
  dispatch(resetAuthState());
};