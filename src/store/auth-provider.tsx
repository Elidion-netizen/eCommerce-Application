import type { LoginResponse } from '@/models/login/login.model';
import { createContext, type ReactNode, useContext, useState } from 'react';
import { getToken, removeToken, saveToken } from './local-storage';

interface AuthData {
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
  const [isAuth, setIsAuth] = useState<boolean>(getToken());
  const login = (response: LoginResponse): void => {
    saveToken(response);
    setIsAuth(true);
  };

  const logout = (): void => {
    removeToken();
    setIsAuth(false);
  };

  return (
    <SessionContext value={{ isAuth, login, logout }}>
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
