import axios from 'axios';

export const backendClient = axios.create({
  baseURL: "https://sunbeambe.com/api",
  headers: {
    'Content-Type': 'application/json',
  },
});

export const wpClient = axios.create({
  baseURL: "https://sunbeambe.com/wp-json/sunbeam/v1",
});
