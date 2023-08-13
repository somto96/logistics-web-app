export const successfulLoginResponse = {
  status: 200,
  data: {
    data: {
      responseObject: {
        token:
          'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibW90aXZhdGVkc29tdG9AZ21haWwuY29tIiwianRpIjoiMGQxODMwMmUtMTE2ZC00YTgxLWE2NjktOGFlMjA2YTVkMmE3IiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQ29tcGFueSIsImV4cCI6MTY4NTE1MjY1OCwiaXNzIjoiaW1wZXJpdW1jb3VyaWVyIiwiYXVkIjoiaW1wZXJpdW1jb3VyaWVyIn0.aASnOtPs80K5Z1OoQnFZsMdSPLeg5px6NO7mqwkJCuX_6vV6rvdVrBOewfOt3tUGtsH1E8mOu-JBX72DMMgkLw',
        reIssueToken:
          'WVsomt6TcOsfUznixFzhaQCEc3p0ViqMjHPiIEAqDkYOGLZR99Hy1qbns9mVU+GItm8ZytaSEWfCUaY7JvhRjA==',
        companyName: 'Test Plc',
        companyEmail: 'motivatedsomto@gmail.com',
        companyPhone: '08164076996',
      },
      responseObjectExists: true,
      message: 'Successful',
      isSuccessful: true,
      errors: [],
    },
    status: 200,
    statusText: '',
  },
};

export const failedLoginResponse = {
  status: 400,
  data: {
    data: {
      responseObject: null,
      responseObjectExists: false,
      message: 'Username or password is invalid.',
      isSuccessful: false,
      errors: ['Username or password is invalid.'],
    },
    status: 400,
    statusText: '',
  },
};
export const mockUpdatedLoginState = {
  loading: [],
  loginData: {
    user: {
      responseObject: {
        token:
          'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibW90aXZhdGVkc29tdG9AZ21haWwuY29tIiwianRpIjoiMGQxODMwMmUtMTE2ZC00YTgxLWE2NjktOGFlMjA2YTVkMmE3IiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQ29tcGFueSIsImV4cCI6MTY4NTE1MjY1OCwiaXNzIjoiaW1wZXJpdW1jb3VyaWVyIiwiYXVkIjoiaW1wZXJpdW1jb3VyaWVyIn0.aASnOtPs80K5Z1OoQnFZsMdSPLeg5px6NO7mqwkJCuX_6vV6rvdVrBOewfOt3tUGtsH1E8mOu-JBX72DMMgkLw',
        reIssueToken:
          'WVsomt6TcOsfUznixFzhaQCEc3p0ViqMjHPiIEAqDkYOGLZR99Hy1qbns9mVU+GItm8ZytaSEWfCUaY7JvhRjA==',
        name: 'Test Plc',
        email: 'motivatedsomto@gmail.com',
        phoneNumber: '08164076996',
        role: "admin"
      },
    },
    isLoggedIn: true,
    successStatus: true,
    successMessage: {
      title: 'Successful',
      action: '',
    },
    errorMessage: '',
  },
};
