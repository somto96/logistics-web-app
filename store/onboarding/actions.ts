import { createAsyncThunk } from '@reduxjs/toolkit';
import { makeRequest } from '../../utils/apiService/useApiRequest';
import { POST_CREATE_ACCOUNT, POST_SET_PASSWORD } from '../../utils/urls';
import { CreateAccountPayload, SetPasswordPayload } from '../interfaces';

export const POST_CREATE_ACCOUNTS_ACTION = createAsyncThunk(
  'POST_CREATE_ACCOUNTS',
  async (payload: CreateAccountPayload) => {
    try {
      const response = await makeRequest.post(POST_CREATE_ACCOUNT, payload);
      return response;
    } catch (error) {
      return error;
    }
  }
);
export const POST_SET_PASSWORD_ACTION = createAsyncThunk(
  'POST_SET_PASSWORD',
  async (payload: SetPasswordPayload) => {
    try {
      const response = await makeRequest.post(POST_SET_PASSWORD, payload);
      return response;
    } catch (error) {
      return error;
    }
  }
);
