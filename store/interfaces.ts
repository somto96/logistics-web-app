import { PackageDurationAndDescription } from './../components/Forms/AddNewDelivery/PackageDurationAndDescription';
import { Packages } from '@/utils/types';
export interface CreateAccountPayload {
  contactFullName: string;
  companyName: string;
  address: string;
  city: string;
  state: string;
  phoneNumber: string;
  email: string;
}

export interface SetPasswordPayload {
  companyId: any;
  password: string;
  confirmPassword: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface OnboardingState {
  loading: any;
  createAccount: {
    successStatus: boolean;
    successMessage: {
      title: string;
      action: string;
    };
    errorMessage: string;
  };
  setPassword: {
    successStatus: boolean;
    successMessage: {
      title: string;
      action: string | any;
    };
    errorMessage: string;
  };
  packageDetails: Packages;
}

export type User = {
  token: string;
  reIssueToken: string;
  name: string;
  email: string;
  phoneNumber: string;
  role: string;
  id: string;
};

export interface AuthState {
  loading: any;
  loginData: {
    user: User;
    isLoggedIn: boolean;
    successStatus: boolean;
    successMessage: {
      title: string;
      action: string;
    };
    errorMessage: string;
  };
}

type PaginationControl = {
  pagedQuery: {
    keyword?: string;
    pageNumber: number;
    pageSize: number;
  };
  dateFilter: {
    from: string;
    to: string;
  };
  textFilter: {
    keyword: string;
  };
};

type PickupAddressAndSenderDetails = {
  pickUpAddress?: string;
  pickUpCity?: string;
  pickUpState?: string;
  pickUpLandmark?: string;
  senderFirstname?: string;
  senderLastname?: string;
  senderPhoneNumber?: string;
};

type DeliveryAddressAndReceiverDetails = {
  deliveryAddress?: string;
  deliveryCity?: string;
  deliveryState?: string;
  deliveryLandmark?: string;
  receiverFirstname?: string;
  receiverLastname?: string;
  receiverPhoneNumber?: string;
};

type PackageDurationAndDescription = {
  pickUpDate: string;
  deliveryDate: string;
  packageDescription: string;
};

export type AdminPackages = {
  numberOfItems: number;
  weightOfPackage: number;
  packagePlacedBy: string;
  packageDescription: string;
  deliveryAddress: string;
  deliveryCity: string;
  deliveryState: string;
  deliveryLandMark: string;
  customerFirstName: string;
  customerLastName: string;
  customerPhoneNumber: string;
  pickUpAddress: string;
  pickUpCity: string;
  pickUpState: string;
  pickUpLandMark: string;
  deliveryRider: string;
  pickUpRider: string;
  id: string;
  trackingNumber: string;
  qrCode: string;
  status: string;
  expectedDeliveryDate: string;
  pickupDate: string;
};

export type RidersList = {
  id: string;
  isActive: boolean;
  fullName: string;
  phoneNumber: string;
  email: string;
  frequentLocation: string;
  bikeRegistrationNumber: string;
  licenseNumber: string;
};

export type CustomersList = {
  id: string;
  dateCreated: string;
  name: string;
  phoneNumber: string;
  address: string;
  city: string;
  state: string;
  emailAddress: {
    address: string;
    isVerified: boolean;
  };
  owner: {
    fullName: string;
  };
};

export type CustomerAnalytics = {
  packageAvailableForPickUp: number;
  packageAtWareHouse: number;
  packageDelivered: number;
  packageUnDelivered: number;
};

export interface DashboardState {
  loading: string[];
  paginationControls: PaginationControl;
  packages: {
    items: Packages[];
    totalItemCount?: number;
    totalPageCount?: number;
    currentPageSize?: number;
    currentPageNumber?: number;
    hasPrevious?: boolean;
    hasNext?: boolean;
  };
  pickupAddressAndSender?: PickupAddressAndSenderDetails;
  deliveryAddressAndReceiver?: DeliveryAddressAndReceiverDetails;
  packageDurationAndDescription?: PackageDurationAndDescription;
  packageNotes?: string;
  createNewDelivery?: {
    successStatus?: boolean;
    successMessage?: any;
  };
  adminPackages: {
    items: AdminPackages[];
    totalItemCount: number;
    totalPageCount: number;
    currentPageSize: number;
    currentPageNumber: number;
    hasPrevious: boolean;
    hasNext: boolean;
  };
  allPackagesSelected: boolean;
  selectedPackages: string[];
  selectedPackageToView: AdminPackages;
  riders: {
    items: RidersList[];
    currentPageSize: number;
    currentPageNumber: number;
    hasPrevious: boolean;
    hasNext: boolean;
  };
  riderPaginationControls: PaginationControl;
  paginationControlsForCustomers: PaginationControl;
  customers: {
    items: CustomersList[];
    currentPageSize: number;
    currentPageNumber: number;
    hasPrevious: boolean;
    hasNext: boolean;
  };
  pickupRiderDetails: RidersList;
  deliveryRiderDetails: RidersList;
  customerAnalytics: CustomerAnalytics;
}
