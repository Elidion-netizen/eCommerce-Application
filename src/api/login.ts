import type { LoginResponse } from '@/models/login/login.model';
import { validLoginError, validLogiResponse } from '@/models/login/validators';

const {
  VITE_CTP_CLIENT_ID,
  VITE_CTP_CLIENT_SECRET,
  VITE_CTP_PROJECT_KEY,
  VITE_CTP_AUTH_URL,
  VITE_CTP_SCOPES,
} = import.meta.env;

export async function getTokenPassword(data: {
  email: string;
  password: string;
}): Promise<LoginResponse> {
  const basicAuth = btoa(`${VITE_CTP_CLIENT_ID}:${VITE_CTP_CLIENT_SECRET}`);
  const response = await fetch(
    `${VITE_CTP_AUTH_URL}/oauth/${VITE_CTP_PROJECT_KEY}/customers/token`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${basicAuth}`,
      },
      body: `grant_type=password&username=${data.email}&password=${data.password}&scope=${VITE_CTP_SCOPES}`,
    }
  );
  if (response.ok) {
    const json: unknown = await response.json();
    if (validLogiResponse(json)) {
      return json;
    }
    throw new TypeError('invalid response data');
  } else {
    const error: unknown = await response.json();
    if (validLoginError(error)) {
      throw new TypeError(error.message);
    }
    throw new TypeError('unknown error');
  }
}
