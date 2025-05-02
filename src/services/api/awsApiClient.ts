
import axios from 'axios';
import { toast } from "sonner";

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
      
      // Only show error toast if not a ping/health check
      if (!error.config?.url?.includes('/health') && 
          !error.config?.url?.includes('/ping')) {
        toast.error("Network error", {
          description: "Could not connect to the server. Check your connection."
        });
      }
      
      return Promise.reject({
        message: 'Network error - please check your connection',
        original: error,
        isNetworkError: true
      });
    }
    
    // Handle authentication errors
    if (error.response?.status === 401) {
      console.error('Authentication error:', error);
      // Token refresh logic could go here
      
      toast.error("Authentication error", {
        description: "Your session has expired. Please log in again."
      });
    }
    
    // Handle server errors
    if (error.response?.status >= 500) {
      console.error('Server error:', error);
      
      toast.error("Server error", {
        description: "The server encountered an error. Please try again later."
      });
    }
    
    return Promise.reject({
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
      original: error,
      isHtmlResponse: error.response?.headers?.['content-type']?.includes('text/html')
    });
  }
);

// Utility function to check if server is reachable
awsApiClient.isServerReachable = async (): Promise<boolean> => {
  try {
    await axios.head(`${AWS_BACKEND_URL}/api/health`, { 
      timeout: 3000,
      headers: { 'X-No-Redirect': '1' }
    });
    return true;
  } catch (error) {
    console.log('Server not reachable:', error);
    return false;
  }
};

export default awsApiClient;
