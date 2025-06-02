import type { LoginResponse } from '@/models/login/login.model';
import { createContext, type ReactNode, useContext, useState } from 'react';
import { getToken, isLogged, removeToken, saveToken } from './local-storage';

interface AuthData {
  login: (token: LoginResponse) => void;
  logout: () => void;
  isAuth: boolean;
  token: string | null;
}

const SessionContext = createContext<AuthData | null>(null);

export const AuthProvider = ({
  children,
}: {
  children: ReactNode[] | ReactNode;
}): React.JSX.Element => {
  const [isAuth, setIsAuth] = useState<boolean>(isLogged());
  const [token, setToken] = useState<string | null>(getToken());

  const login = (response: LoginResponse): void => {
    saveToken(response);
    setIsAuth(true);
    setToken(getToken());
  };

  const logout = (): void => {
    removeToken();
    setIsAuth(false);
    setToken(null);
  };

  return (
    <SessionContext value={{ isAuth, login, logout, token }}>
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
