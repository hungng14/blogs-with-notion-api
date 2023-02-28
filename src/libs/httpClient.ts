import { API_BASE_URL } from '@/config/app';
import axios from 'axios';

const httpClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
export default httpClient;