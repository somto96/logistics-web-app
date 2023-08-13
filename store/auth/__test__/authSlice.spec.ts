import axios from 'axios';
import { POST_LOGIN } from '../../../utils/urls';
import dotenv from 'dotenv';
import reducer, { initialState, resetAuthState } from '../slice';
import { successfulLoginResponse, failedLoginResponse } from './mocks';
import { LoginType } from '../../../utils/types/auth';

// Load environment variables from .env file
dotenv.config();

jest.mock('axios');

const loginEndpoint = `${process.env.NEXT_PUBLIC_BASE_URL}/${POST_LOGIN}`;
describe('auth slice', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });
  it('should login successfully', async () => {
    const payload: LoginType = {
      email: 'john.doe@gmail.com',
      password: 'john123',
    };
    (axios.post as jest.MockedFunction<typeof axios.post>).mockResolvedValueOnce(
      successfulLoginResponse
    );
    const result = await axios.post(loginEndpoint, payload);

    expect(result.status).toEqual(200);

    // Verify that the POST request was made with the correct data
    expect(axios.post).toHaveBeenCalledWith(loginEndpoint, payload);
  });
  it('should fail upon login with invalid details', async () => {
    const payload: LoginType = {
      email: 'john.doe@gmail.com',
      password: 'test2',
    };
    (axios.post as jest.MockedFunction<typeof axios.post>).mockResolvedValueOnce(
      failedLoginResponse
    );
    const result = await axios.post(loginEndpoint, payload);

    expect(result.status).toEqual(400);

    // Verify that the POST request was made with the correct data
    expect(axios.post).toHaveBeenCalledWith(loginEndpoint, payload);
  });

  it('should reset the state', () => {
    const testState = {
      ...initialState,
      user: {
        token:
          'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibW90aXZhdGVkc29tdG9AZ21haWwuY29tIiwianRpIjoiMGQxODMwMmUtMTE2ZC00YTgxLWE2NjktOGFlMjA2YTVkMmE3IiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQ29tcGFueSIsImV4cCI6MTY4NTE1MjY1OCwiaXNzIjoiaW1wZXJpdW1jb3VyaWVyIiwiYXVkIjoiaW1wZXJpdW1jb3VyaWVyIn0.aASnOtPs80K5Z1OoQnFZsMdSPLeg5px6NO7mqwkJCuX_6vV6rvdVrBOewfOt3tUGtsH1E8mOu-JBX72DMMgkLw',
        reIssueToken:
          'WVsomt6TcOsfUznixFzhaQCEc3p0ViqMjHPiIEAqDkYOGLZR99Hy1qbns9mVU+GItm8ZytaSEWfCUaY7JvhRjA==',
        name: 'Test Plc',
        email: 'motivatedsomto@gmail.com',
        phoneNumber: '08164076996',
        role: "admin",
        id: "123567"
      }
    }
    const action = resetAuthState();
    const newState = reducer(testState, action);
    expect(newState).toEqual(initialState);
  });
});
