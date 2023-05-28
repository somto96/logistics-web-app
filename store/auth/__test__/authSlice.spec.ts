import axios from 'axios';
import { POST_LOGIN } from '../../../utils/urls';
import dotenv from 'dotenv';
import reducer, { initialState, resetAuthState } from '../slice';
import { successfulLoginResponse, failedLoginResponse, mockUpdatedLoginState } from './mocks';
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
    const testState = mockUpdatedLoginState
    const action = resetAuthState();
    const newState = reducer(testState, action);
    expect(newState).toEqual(initialState);
  });
});
