import type { LoginResponse } from '@/models/login/login.model';
import { createContext, type ReactNode, useContext, useState } from 'react';
import { getToken, removeToken, saveToken } from './local-storage';

interface AuthData {
  token: string | null;
  login: (token: LoginResponse) => void;
  logout: () => void;
  isAuth: boolean;
}

const SessionContext = createContext<AuthData | null>(null);

export const AuthProvider = ({
  children,
}: {
  children: ReactNode[] | ReactNode;
}): React.JSX.Element => {
  const initialToken = getToken();
  const [token, setToken] = useState<string | null>(initialToken);
  const [isAuth, setIsAuth] = useState<boolean>(!!initialToken);

  const login = (response: LoginResponse): void => {
    saveToken(response);
    setToken(response.access_token);
    setIsAuth(true);
  };

  const logout = (): void => {
    removeToken();
    setIsAuth(false);
  };

  return (
    <SessionContext value={{ token, isAuth, login, logout }}>
      {children}
    </SessionContext>
  );
};

export const useAuth = (): AuthData => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSessionContext must be used within a SessionProvider');
  }
  return context;
};
