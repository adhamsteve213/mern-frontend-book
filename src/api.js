import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_BASE || 'https://mern-a8cbf9c8fvbfbkep.uaenorth-01.azurewebsites.net';

export const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true
});

export const setAuthToken = (token) => {
  if (token) api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  else delete api.defaults.headers.common['Authorization'];
};

export default api;
