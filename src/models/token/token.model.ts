import { type LoginResponse } from '../login/login.model';

export type TokenModel = Omit<LoginResponse, 'scope' | 'token_type'>;
