const API_BASE_URL = "http://gamepathai-dev-lb-1728469102.us-east-1.elb.amazonaws.com";

export const apiClient = {
  async fetch(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const headers = {
      "Content-Type": "application/json",
      ...(options.headers || {})
    };
    
    // Adicionar token de autenticação se disponível
    const token = localStorage.getItem("auth_token");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    
    try {
      const response = await fetch(url, {
        ...options,
        headers
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return Promise.reject({
          status: response.status,
          ...errorData
        });
      }
      
      return response.json();
    } catch (error) {
      console.error("API request failed:", error);
      return Promise.reject(error);
    }
  }
};
