import { createAsyncThunk } from '@reduxjs/toolkit';
import { useApiRequest } from '../../utils/apiService/useApiRequest';
import { POST_LOGIN} from '../../utils/urls';
import { LoginPayload } from '../interfaces';

export const POST_LOGIN_ACTION = createAsyncThunk(
  'POST_LOGIN',
  async (payload: LoginPayload) => {
    const makeRequest = useApiRequest();
    try {
      const response = await makeRequest.post(POST_LOGIN, payload);
      return response;
    } catch (error: any) {
      return error;
    }
  }
);