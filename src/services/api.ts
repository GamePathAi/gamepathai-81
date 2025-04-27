
const API_BASE_URL = "http://gamepathai-dev-lb-1728469102.us-east-1.elb.amazonaws.com";

export const apiClient = {
  async fetch(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const headers = {
      "Content-Type": "application/json",
      ...(options.headers || {})
    };
    
    const token = localStorage.getItem("auth_token");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    
    try {
      const response = await fetch(url, {
        ...options,
        headers,
        mode: 'cors'
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw {
          status: response.status,
          ...errorData
        };
      }
      
      return response.json();
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error);
      throw {
        status: 'error',
        message: 'Failed to fetch data from server',
        originalError: error
      };
    }
  }
};
