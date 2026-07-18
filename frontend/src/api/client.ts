import axios from 'axios';

export const apiClient = axios.create({
  baseURL: "https://sunbeambe.com/api",
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// TODO: Захистити ключі