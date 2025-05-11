import type { TokenModel } from './token.model';

export function validToken(data: unknown): data is TokenModel {
  return (
    typeof data === 'object' &&
    data !== null &&
    'access_token' in data &&
    typeof data.access_token === 'string' &&
    'refresh_token' in data &&
    typeof data.refresh_token === 'string' &&
    'expires_in' in data &&
    typeof data.expires_in === 'number'
  );
}
