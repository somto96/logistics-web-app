import { combineReducers } from '@reduxjs/toolkit';
import onboardingReducer from './onboarding/slice';
import resetReducer from './reset/slice';

export const rootReducer = combineReducers({
  onboarding: onboardingReducer,
  reset: resetReducer
});


