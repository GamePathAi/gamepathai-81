
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserData {
  id: string;
  email: string;
  username?: string;
}

interface AuthContextType {
  user: UserData | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<UserData>;
  register: (email: string, username: string, password: string) => Promise<UserData>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => ({ id: '', email: '' }),
  register: async () => ({ id: '', email: '' }),
  logout: () => {},
  isAuthenticated: false,
});

export const useAuthContext = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(false);

  const login = async (email: string, password: string): Promise<UserData> => {
    setLoading(true);
    try {
      // Mock login for now
      const user = { id: '1', email };
      setUser(user);
      return user;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, username: string, password: string): Promise<UserData> => {
    setLoading(true);
    try {
      // Mock registration for now
      const user = { id: '1', email, username };
      setUser(user);
      return user;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
