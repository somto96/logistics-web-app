export interface CreateAccountPayload {
  firstName: string;
  lastName: string;
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

export interface OnboardingState {
  loading: any;
  createAccount: {
    successStatus: boolean;
    successMessage:{
        title: string;
        action: string;
    }
    errorMessage: string;
  };
  setPassword: {
    successStatus: boolean;
    successMessage:{
        title: string;
        action: string;
    }
    errorMessage: string;
  };
}
