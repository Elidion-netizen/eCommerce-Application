import type { LoginResponse } from '@/models/login/login.model';
import { TOKEN_KEY } from '@/constants';
import { validToken } from '@/models/token/validators';

export function isLogged(): boolean {
  const data: unknown = localStorage.getItem(TOKEN_KEY);
  if (!data || typeof data !== 'string') {
    return false;
  }
  const session: unknown = JSON.parse(data);
  if (!session && !validToken(session)) {
    return false;
  }
  return true;
}

export function getToken(): string | null {
  const data: unknown = localStorage.getItem(TOKEN_KEY);
  if (!data || typeof data !== 'string') {
    return null;
  }
  const token: unknown = JSON.parse(data);
  if (token && validToken(token)) {
    return token.access_token;
  }
  return null;
}

export function saveToken(response: LoginResponse): void {
  const { access_token, expires_in, refresh_token } = response;
  localStorage.setItem(
    TOKEN_KEY,
    JSON.stringify({ access_token, expires_in, refresh_token })
  );
}

export function removeToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}
