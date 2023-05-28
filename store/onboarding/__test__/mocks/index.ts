export const successfulOnboardingResponse = {
  status: 200,
  data: {
    message: 'Successful',
    isSuccessful: true,
    errors: [],
    responseObject: 'Account Created Successfully,. Please check your mail',
    responseObjectExists: true,
  },
};

export const mockSetPasswordSuccessResponse = {
  status: 200,
  data: {
    message: 'Successful',
    isSuccessful: true,
    errors: [],
    responseObject: {
      token: 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibW90aXZhdGVkc29tdG9AZ21haWwuY29tIiwianRpIjoiM',
      reIssueToken: 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibW90aXZhdGVkc29tdG9AZ21haWwuY29tIiwianRpIjoiM',
      companyName: 'Test Plc',
      companyEmail: 'John.Doe@gmail.com',
      companyPhone: '08012345678',
    },
    responseObjectExists: true,
  },
};

export const mockUpdatedOnboardingState = {
  loading: [],
  createAccount: {
    successStatus: true,
    successMessage: {
      title: 'Account Created Successfully',
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
};
