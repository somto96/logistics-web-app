import { combineReducers } from '@reduxjs/toolkit';
import onboardingReducer from './onboarding/slice';
import authReducer from './auth/slice';
import dashboardReducer from './dashboard/slice';

export const rootReducer = combineReducers({
  onboarding: onboardingReducer,
  auth: authReducer,
  dashboard: dashboardReducer
});
