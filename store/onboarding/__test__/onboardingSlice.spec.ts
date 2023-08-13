import axios from 'axios';
import { POST_CREATE_ACCOUNT, POST_SET_PASSWORD } from '../../../utils/urls';
import dotenv from 'dotenv';
import reducer, { initialState, resetOnboardingData } from '../slice';
import {
  successfulOnboardingResponse,
  mockSetPasswordSuccessResponse,
} from './mocks';
import { CreateAccount } from '../../../utils/types/onboarding';

// Load environment variables from .env file
dotenv.config();

jest.mock('axios');

const onboardingEndpoint = `${process.env.NEXT_PUBLIC_BASE_URL}/${POST_CREATE_ACCOUNT}`;
const setPasswordEndpoint = `${process.env.NEXT_PUBLIC_BASE_URL}/${POST_SET_PASSWORD}`;
describe('onboarding slice', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });
  it('should create an account successfully', async () => {
    const payload: CreateAccount = {
      contactFullName: 'John Doe',
      companyName: 'Test Plc',
      phoneNumber: '08012345678',
      email: 'john.doe@gmail.com',
      city: 'Ajah',
      state: 'Lagos',
      address: 'Ajah, Lagos',
    };
    (axios.post as jest.MockedFunction<typeof axios.post>).mockResolvedValueOnce(
      successfulOnboardingResponse
    );
    const result = await axios.post(onboardingEndpoint, payload);

    expect(result.status).toEqual(200);

    // Verify that the POST request was made with the correct data
    expect(axios.post).toHaveBeenCalledWith(onboardingEndpoint, payload);
  });
  it("should set a user's password successfully", async () => {
    const payload = {
      password: 'john123',
      confirmPassword: 'john123',
    };
    (axios.post as jest.MockedFunction<typeof axios.post>).mockResolvedValueOnce(
      mockSetPasswordSuccessResponse
    );
    const result = await axios.post(setPasswordEndpoint, payload);

    expect(result.status).toEqual(200);

    // Verify that the POST request was made with the correct data
    expect(axios.post).toHaveBeenCalledWith(setPasswordEndpoint, payload);
  });

  it('should reset the state', () => {
    const testState = {
      ...initialState,
      createAccount: {
        successStatus: true,
        successMessage: {
          title: 'Account Created Successfully',
          action: '',
        },
        errorMessage: '',
      },
    };
    const action = resetOnboardingData();
    const newState = reducer(testState, action);
    expect(newState).toEqual(initialState);
  });
});
