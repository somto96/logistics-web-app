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
