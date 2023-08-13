import { resetAuthState } from 'store/auth/slice';
import { resetDashboardState } from 'store/dashboard/slice';
import { resetOnboardingData } from 'store/onboarding/slice';
export const resetStore = (dispatch: any) => {
  dispatch(resetAuthState());
  dispatch(resetOnboardingData());
  dispatch(resetDashboardState());
};
