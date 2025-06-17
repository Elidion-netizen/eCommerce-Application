import type { LoginResponse } from '@/models/login/login.model';
import { TOKEN_KEY } from '@/constants';
import { validToken } from '@/models/token/validators';

interface Session {
  access_token: string;
}

export function getToken(): string | null {
  const data = localStorage.getItem(TOKEN_KEY);
  if (!data) return null;
  try {
    const session = JSON.parse(data) as Session;
    if (typeof session.access_token === 'string' && validToken(session)) {
      return session.access_token;
    }
  } catch {
    return null;
  }
  return null;
}

export function isTokenValid(): boolean {
  return getToken() !== null;
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
