import axios from 'axios';
import { config } from '@/config';
import { sleep } from '@/utils';

export const http = axios.create({
  baseURL: `${config.API_URL}/v1/shopkeeper`,
  validateStatus: (status) => status < 400,
});

http.interceptors.response.use(async (response) => {
  const ms = 1000;
  if (config.NODE_ENV === 'development') await sleep(ms);
  return response;
});
