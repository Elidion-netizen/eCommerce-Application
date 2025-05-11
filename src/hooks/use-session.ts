import type { TokenModel } from '@/models/token/token.model';
import type { LoginResponse } from '@/models/login/login.model';
import { TOKEN_KEY } from '@/constants';
import { useState } from 'react';
import { validToken } from '@/models/token/validators';

export interface SessionHook {
  login: (token: LoginResponse) => void;
  logout: () => void;
  token: TokenModel | null;
}

export const useSession = (): SessionHook => {
  const [token, setToken] = useState<TokenModel | null>(() => {
    const data: unknown = localStorage.getItem(TOKEN_KEY);
    if (!data || typeof data !== 'string') {
      return null;
    }
    const session: unknown = JSON.parse(data);
    if (!session || !validToken(session)) {
      return null;
    }
    return session;
  });

  const login = (token: LoginResponse): void => {
    const { access_token, expires_in, refresh_token } = token;
    localStorage.setItem(
      TOKEN_KEY,
      JSON.stringify({ access_token, expires_in, refresh_token })
    );
    setToken({ access_token, expires_in, refresh_token });
  };

  const logout = (): void => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
  };

  return { login, logout, token };
};
