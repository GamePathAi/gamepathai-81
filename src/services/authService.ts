
import { apiClient } from "./api";

export const authService = {
  login: (email: string, password: string) => 
    apiClient.fetch("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password })
    }),
    
  register: (email: string, username: string, password: string) => 
    apiClient.fetch("/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, username, password })
    })
};
