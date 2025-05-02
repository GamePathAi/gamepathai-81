
import axios from 'axios';

// AWS backend URL
const AWS_BACKEND_URL = 'http://gamepathai-dev-lb-1728469102.us-east-1.elb.amazonaws.com';
const isDev = process.env.NODE_ENV === 'development';

// Create axios instance with appropriate configuration
const awsApiClient = axios.create({
  baseURL: isDev ? '/api' : `${AWS_BACKEND_URL}/api`,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    'X-Client-Source': 'gamepathai-client',
    'X-No-Redirect': '1'
  }
});

// Request interceptor for auth tokens
awsApiClient.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor with error handling
awsApiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Handle network errors
    if (!error.response) {
      console.error('Network error:', error);
      return Promise.reject({
        message: 'Network error - please check your connection',
        original: error
      });
    }
    
    // Handle authentication errors
    if (error.response?.status === 401) {
      console.error('Authentication error:', error);
      // Token refresh logic could go here
    }
    
    return Promise.reject(error);
  }
);

export default awsApiClient;
