import axios from 'axios';

const api = axios.create({
        // IMPORTANT: Replace 'https://yourdomain.com' with your actual domain on HostGator
    baseURL: process.env.NODE_ENV === 'production' 
        ? 'https://integramentehwh.com/backend/api' 
        : 'http://localhost/backend_int3gr4m/api',
});

// Request interceptor to add the token to every request
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response, // Pass through successful responses
  (error) => {
    // Check if the error is a 401 or 403
    if (error.response && [401, 403].includes(error.response.status)) {
      console.error('Authentication error, redirecting to login.');
      // Remove the invalid token
      localStorage.removeItem('token');
      // Redirect to login page. Using window.location to force a full refresh.
      // This is useful outside of React component context.
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
