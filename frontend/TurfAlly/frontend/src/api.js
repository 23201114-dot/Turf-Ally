import axios from 'axios';

const API_URL = 'http://localhost:8000/api/';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to attach the access token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Interceptor to handle token refresh on 401 Unauthorized
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refresh_token');
        if (refreshToken) {
          const res = await axios.post(`${API_URL}token/refresh/`, {
            refresh: refreshToken
          });
          if (res.status === 200) {
            localStorage.setItem('access_token', res.data.access);
            originalRequest.headers.Authorization = `Bearer ${res.data.access}`;
            return api(originalRequest);
          }
        }
      } catch (refreshError) {
        // If refresh fails, log the user out
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        // Optional: redirect to login or trigger a logout event
      }
    }
    return Promise.reject(error);
  }
);

// Auth Endpoints
export const loginUser = (credentials) => api.post('token/', credentials);
export const refreshToken = (refresh) => api.post('token/refresh/', { refresh });

// Turfs & Venues
export const getTurfs = () => api.get('turfs/');
export const getTurfDetails = (id) => api.get(`turfs/${id}/`);
export const getVenues = () => api.get('venues/');

// Bookings
export const getBookings = () => api.get('bookings/');
export const createBooking = (bookingData) => api.post('bookings/', bookingData);

// Profile
export const getAthleteProfiles = () => api.get('athlete-profiles/');
export const getMyProfile = () => api.get('users/me/'); // Assuming we might add a 'me' endpoint or filter
