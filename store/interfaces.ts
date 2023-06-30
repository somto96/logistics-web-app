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
}

export interface AuthState {
  loading: any;
  loginData: {
    user: any;
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

export interface DashboardState {
  loading: string[];
  paginationControls: PaginationControl;
  packages?: {
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
}
