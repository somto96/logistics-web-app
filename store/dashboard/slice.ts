import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { DashboardState } from '../interfaces';
import { RootState } from '../store';
import { useSelector } from 'react-redux';

const dataObject = {
  paginationControls: {
    pagedQuery: {
      keyword: '',
      pageNumber: 1,
      pageSize: 10,
    },
    dateFilter: {
      from: '',
      to: '', //ISO
    },
    textFilter: {
      keyword: '',
    },
  },
  loading: [],
  packages: {
    items: [
      {
        status: '',
        numberOfItems: 0,
        weightOfPackage: 0,
        packagePlacedBy: '',
        packageDescription: '',
        expectedDeliveryDate: '',
        deliveryAddress: '',
        deliveryCity: '',
        deliveryState: '',
        deliveryLandMark: '',
        customerFirstName: '',
        customerLastName: '',
        customerPhoneNumber: '',
        pickupDate: '',
        pickUpAddress: '',
        pickUpCity: '',
        pickUpState: '',
        pickUpLandMark: '',
        id: '',
        trackingNumber: '',
      },
    ],
    totalItemCount: 0,
    totalPageCount: 0,
    currentPageSize: 0,
    currentPageNumber: 0,
    hasPrevious: false,
    hasNext: false,
  },
  pickupAddressAndSender: {
    pickUpAddress: '',
    pickUpCity: '',
    pickUpState: '',
    pickUpLandmark: '',
    senderFirstname: '',
    senderLastname: '',
    senderPhoneNumber: '',
  },
  deliveryAddressAndReceiver: {
    deliveryAddress: '',
    deliveryCity: '',
    deliveryState: '',
    deliveryLandmark: '',
    receiverFirstname: '',
    receiverLastname: '',
    receiverPhoneNumber: '',
  },
  packageDurationAndDescription: {
    pickUpDate: '',
    deliveryDate: '',
    packageDescription: "",
  },
  packageNotes: '',
  createNewDelivery: {
    successStatus: false,
    successMessage: {}
  },
} as DashboardState;

export const initialState: DashboardState = { ...dataObject };

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,

  reducers: {
    resetDashboardState: (): DashboardState => initialState,
    setPaginationControls: (state: DashboardState, action: PayloadAction<any>) => {
      state.paginationControls = action.payload;
    },
    setPackages: (state: DashboardState, action: PayloadAction<any>) => {
      state.packages = action.payload;
    },
    setLoadingState: (state: DashboardState, action: PayloadAction<any>) => {
      state.loading = action.payload;
    },
    setPickupDetails: (state: DashboardState, action: PayloadAction<any>) => {
      state.pickupAddressAndSender = action.payload;
    },
    setDeliveryDetails: (state: DashboardState, action: PayloadAction<any>) => {
      state.deliveryAddressAndReceiver = action.payload;
    },
    setPackageDurationAndDescription: (state: DashboardState, action: PayloadAction<any>) => {
      state.packageDurationAndDescription = action.payload;
    },
    setPackageNotes: (state: DashboardState, action: PayloadAction<any>) => {
      state.packageNotes = action.payload;
    },
    setCreateDeliveryStatus: (state: DashboardState, action: PayloadAction<any>) => {
      state.createNewDelivery = {
        ...state.createNewDelivery,
        successStatus: action.payload.successStatus,
        successMessage: action.payload.successMessage
      };
    },
  },
});

// Selectors
const selectDashboard = (state: RootState) => state.dashboard;

// Reducers and actions
export const {
  resetDashboardState,
  setPaginationControls,
  setPackages,
  setLoadingState,
  setPickupDetails,
  setDeliveryDetails,
  setPackageDurationAndDescription,
  setCreateDeliveryStatus,
  setPackageNotes,
} = dashboardSlice.actions;

//App Redux State
export const useDashboardState = () => useSelector(selectDashboard);

export default dashboardSlice.reducer;
