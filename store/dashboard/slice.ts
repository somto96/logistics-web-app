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
    items: [],
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
    packageDescription: '',
  },
  packageNotes: '',
  createNewDelivery: {
    successStatus: false,
    successMessage: {},
  },
  adminPackages: {
    items: [],
    totalItemCount: 0,
    totalPageCount: 0,
    currentPageSize: 0,
    currentPageNumber: 0,
    hasPrevious: false,
    hasNext: false,
  },
  allPackagesSelected: false,
  selectedPackages: [],
  selectedPackageToView: {
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
    notes: '',
    pickUpCity: '',
    pickUpState: '',
    pickUpLandMark: '',
    deliveryRider: '',
    pickUpRider: '',
    id: '',
    trackingNumber: '',
    qrCode: '',
    status: '',
    expectedDeliveryDate: '',
    pickupDate: '',
  },
  riderPaginationControls: {
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
  paginationControlsForCustomers: {
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
  riders: {
    items: [],
    currentPageSize: 0,
    currentPageNumber: 0,
    hasPrevious: false,
    hasNext: false,
  },
  customers: {
    items: [],
    currentPageSize: 0,
    currentPageNumber: 0,
    hasPrevious: false,
    hasNext: false,
  },
  pickupRiderDetails: {
    id: '',
    isActive: false,
    fullName: '',
    phoneNumber: '',
    email: '',
    frequentLocation: '',
    bikeRegistrationNumber: '',
    licenseNumber: '',
  },
  deliveryRiderDetails: {
    id: '',
    isActive: false,
    fullName: '',
    phoneNumber: '',
    email: '',
    frequentLocation: '',
    bikeRegistrationNumber: '',
    licenseNumber: '',
  },
  customerAnalytics: {
    packageAvailableForPickUp: 0,
    packageAtWareHouse: 0,
    packageDelivered: 0,
    packageUnDelivered: 0,
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
        successMessage: action.payload.successMessage,
      };
    },
    setAdminPackages: (state: DashboardState, action: PayloadAction<any>) => {
      state.adminPackages = action.payload;
    },
    setAllPackagesSelected: (state: DashboardState, action: PayloadAction<any>) => {
      state.allPackagesSelected = action.payload;
    },
    setSelectedPackages: (state: DashboardState, action: PayloadAction<any>) => {
      state.selectedPackages = action.payload;
    },
    setSelectedPackageToView: (state: DashboardState, action: PayloadAction<any>) => {
      state.selectedPackageToView = action.payload;
    },
    setRidersList: (state: DashboardState, action: PayloadAction<any>) => {
      state.riders = action.payload;
    },
    setCustomersList: (state: DashboardState, action: PayloadAction<any>) => {
      state.customers = action.payload;
    },
    setPickupRiderDetails: (state: DashboardState, action: PayloadAction<any>) => {
      state.pickupRiderDetails = action.payload;
    },
    setDeliveryRiderDetails: (state: DashboardState, action: PayloadAction<any>) => {
      state.deliveryRiderDetails = action.payload;
    },
    setRiderTablePaginationControls: (state: DashboardState, action: PayloadAction<any>) => {
      state.riderPaginationControls = action.payload;
    },
    setCustomerTablePaginationControls: (state: DashboardState, action: PayloadAction<any>) => {
      state.paginationControlsForCustomers = action.payload;
    },
    setCustomerAnalytics: (state: DashboardState, action: PayloadAction<any>) => {
      state.customerAnalytics = action.payload;
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
  setAdminPackages,
  setAllPackagesSelected,
  setSelectedPackages,
  setSelectedPackageToView,
  setRidersList,
  setCustomersList,
  setPackageNotes,
  setPickupRiderDetails,
  setDeliveryRiderDetails,
  setRiderTablePaginationControls,
  setCustomerTablePaginationControls,
  setCustomerAnalytics
} = dashboardSlice.actions;

//App Redux State
export const useDashboardState = () => useSelector(selectDashboard);

export default dashboardSlice.reducer;
