import { combineReducers } from '@reduxjs/toolkit';
import onboardingReducer from './onboarding/slice';
import authReducer from './auth/slice'
import resetReducer from './reset/slice';

export const rootReducer = combineReducers({
  onboarding: onboardingReducer,
  auth: authReducer,
  reset: resetReducer
});


