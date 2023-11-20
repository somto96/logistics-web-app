import axios from 'axios';
export const makeRequest = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 1 * 60 * 1000,
});

export const makePrivateRequest = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 1 * 60 * 1000,
})

