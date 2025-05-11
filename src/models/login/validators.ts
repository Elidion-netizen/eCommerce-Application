import type { LoginError, LoginResponse } from './login.,model';

export function validLoginError(data: unknown): data is LoginError {
  return (
    typeof data === 'object' &&
    data !== null &&
    'message' in data &&
    typeof data.message === 'string'
  );
}

export function validLogiResponse(data: unknown): data is LoginResponse {
  return (
    typeof data === 'object' &&
    data !== null &&
    'access_token' in data &&
    typeof data.access_token === 'string' &&
    'refresh_token' in data &&
    typeof data.refresh_token === 'string' &&
    'expires_in' in data &&
    typeof data.expires_in === 'number' &&
    'token_type' in data &&
    data.token_type === 'Bearer'
  );
}
