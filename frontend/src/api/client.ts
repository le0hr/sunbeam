import axios from 'axios';

export const apiClient = axios.create({
  baseURL: "http://localhost/api",
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// TODO: Захистити ключі