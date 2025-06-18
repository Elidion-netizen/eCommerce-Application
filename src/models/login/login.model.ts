export interface LoginResponse {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: 'Bearer';
}

export interface LoginError {
  statusCode: number;
  message: string;
}
