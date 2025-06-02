import type { LoginResponse } from '@/models/login/login.model';
import { TOKEN_KEY } from '@/constants';
import { validToken } from '@/models/token/validators';

interface SessionToken {
  access_token: string;
  expires_in: number;
  refresh_token: string;
}

function isSessionToken(object: unknown): object is SessionToken {
  if (typeof object !== 'object' || object === null) return false;

  return (
    'access_token' in object &&
    typeof (object as Record<string, unknown>)['access_token'] === 'string' &&
    'expires_in' in object &&
    typeof (object as Record<string, unknown>)['expires_in'] === 'number' &&
    'refresh_token' in object &&
    typeof (object as Record<string, unknown>)['refresh_token'] === 'string'
  );
}

export function getToken(): string | null {
  const data: unknown = localStorage.getItem(TOKEN_KEY);
  if (!data || typeof data !== 'string') {
    return null;
  }
  try {
    const session: unknown = JSON.parse(data);
    if (!isSessionToken(session) || !validToken(session)) {
      return null;
    }
    return session.access_token;
  } catch {
    return null;
  }
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
