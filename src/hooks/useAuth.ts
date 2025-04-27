import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { authService } from "../services/authService";
import { apiClient } from "../services/api";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const queryClient = useQueryClient();
  
  useEffect(() => {
    // Verificar token existente ao carregar
    const token = localStorage.getItem("auth_token");
    if (!token) {
      setLoading(false);
      return;
    }
    
    // Validar token obtendo perfil do usuário
    apiClient.fetch("/api/user/profile")
      .then(userData => setUser(userData))
      .catch(() => {
        // Token inválido, fazer logout
        localStorage.removeItem("auth_token");
      })
      .finally(() => setLoading(false));
  }, []);
  
  const login = async (email: string, password: string) => {
    const response = await authService.login(email, password);
    localStorage.setItem("auth_token", response.access_token);
    
    // Obter perfil do usuário após login
    const userData = await apiClient.fetch("/api/user/profile");
    setUser(userData);
    return userData;
  };
  
  const register = async (email: string, username: string, password: string) => {
    const response = await authService.register(email, username, password);
    localStorage.setItem("auth_token", response.access_token);
    
    // Obter perfil do usuário após registro
    const userData = await apiClient.fetch("/api/user/profile");
    setUser(userData);
    return userData;
  };
  
  const logout = () => {
    localStorage.removeItem("auth_token");
    setUser(null);
    queryClient.clear(); // Limpar cache do React Query
  };
  
  return {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user
  };
}
