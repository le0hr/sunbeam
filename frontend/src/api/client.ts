import axios from 'axios';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_WOOCOMMERCE_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  params: {
    consumer_key: import.meta.env.VITE_WC_CONSUMER_KEY,
    consumer_secret: import.meta.env.VITE_WC_CONSUMER_SECRET,
  }
});