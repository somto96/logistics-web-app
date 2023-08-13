import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { OnboardingState } from '../interfaces';
import { RootState } from '../store';
import { useAppSelector } from '../../utils/hooks/useReduxHooks';
import { removeLoadingState } from '../../utils/helperFunctions';
import { POST_CREATE_ACCOUNTS_ACTION, POST_SET_PASSWORD_ACTION } from './actions';
import { triggerCreateAccounts, triggerSetPassword } from './assistFunctions';

const dataObject = {
  loading: [],
  createAccount: {
    successStatus: false,
    successMessage: {
      title: '',
      action: '',
    },
    errorMessage: '',
  },
  setPassword: {
    successStatus: false,
    successMessage: {
      title: '',
      action: '',
    },
    errorMessage: '',
  },
  packageDetails: {
    numberOfItems: 0,
    weightOfPackage: 0,
    packagePlacedBy: '',
    packageDescription: '',
    deliveryAddress: '',
    deliveryCity: '',
    deliveryState: '',
    deliveryLandMark: '',
    customerFirstName: '',
    customerLastName: '',
    customerPhoneNumber: '',
    pickUpAddress: '',
    pickUpCity: '',
    pickUpState: '',
    pickUpLandMark: '',
    deliveryRider: '',
    pickUpRider: '',
    id: '',
    trackingNumber: '',
    notes: "",
    qrCode: '',
    status: '',
    expectedDeliveryDate: '',
    pickupDate: '',
  },
} as OnboardingState;

export const initialState: OnboardingState = { ...dataObject };

export const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,

  reducers: {
    resetOnboardingData: (): OnboardingState => initialState,
    setPackageDetails: (state: OnboardingState, action: PayloadAction<any>) => {
      state.packageDetails = action.payload;
    },
    setLoadingState: (state: OnboardingState, action: PayloadAction<any>) => {
      state.loading = action.payload;
    },
  },

  extraReducers: builder => {
    builder
      // POST_CREATE_ACCOUNTS_ACTION
      .addCase(POST_CREATE_ACCOUNTS_ACTION.pending, state => {
        state.loading = ['POST_CREATE_ACCOUNTS'];
      })
      .addCase(POST_CREATE_ACCOUNTS_ACTION.fulfilled, (state, action): void => {
        triggerCreateAccounts(state, action);
      })
      .addCase(POST_CREATE_ACCOUNTS_ACTION.rejected, (state): void => {
        state.loading = removeLoadingState(state.loading, 'POST_CREATE_ACCOUNTS');
      })
      // POST_SET_PASSWORD_ACTION
      .addCase(POST_SET_PASSWORD_ACTION.pending, state => {
        state.loading = ['POST_SET_PASSWORD'];
      })
      .addCase(POST_SET_PASSWORD_ACTION.fulfilled, (state, action): void => {
        triggerSetPassword(state, action);
      })
      .addCase(POST_SET_PASSWORD_ACTION.rejected, (state): void => {
        state.loading = removeLoadingState(state.loading, 'POST_SET_PASSWORD');
      });
  },
});

// Selectors
const selectOnboarding = (state: RootState) => state.onboarding;

// Reducers and actions
export const { resetOnboardingData, setPackageDetails, setLoadingState } = onboardingSlice.actions;

//App Redux State
export const useOnboardingState = () => useAppSelector(selectOnboarding);

export default onboardingSlice.reducer;
