// auth/store/AuthContext.tsx
import { createContext, useContext, useState, type ReactNode } from 'react';

type AuthState = {
  username: string | null;
  token: string | null;
};

type AuthContextType = {
  authState: AuthState | undefined;
  setAuthentication: (username: string | null, token: string | null) => boolean;
  getAuthentication: () => { username?: string | null; token?: string | null };
  isAuthenticated: () => boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>();

  const setAuthentication = (username: string | null, token: string | null): boolean => {
    setAuthState({ username, token });
    return true;
  };

  const getAuthentication = () => ({
    username: authState?.username,
    token: authState?.token,
  });

  const isAuthenticated = () => !!authState?.token;

  const logout = () => {
    setAuthentication(null, null);
    localStorage.removeItem('username');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ authState, setAuthentication, getAuthentication, isAuthenticated, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};