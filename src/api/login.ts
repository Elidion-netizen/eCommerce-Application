import type { LoginResponse } from '@/models/login/login.model';
import { validLoginError, validLogiResponse } from '@/models/login/validators';
// import { getToken } from '@/store/local-storage';

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
      body: `grant_type=password&username=${data.email}&password=${encodeURIComponent(data.password)}&scope=${VITE_CTP_SCOPES}`,
    }
  );
  if (response.ok) {
    const json: unknown = await response.json();
    if (validLogiResponse(json)) {
      return json;
    }
    throw new Error('invalid response data');
  } else {
    const error: unknown = await response.json();
    if (validLoginError(error)) {
      throw new Error(error.message);
    }
    throw new Error('unknown error');
  }
}

// export const getAnonymousToken = async () => {
//   const credentials = btoa('CLIENT_ID:CLIENT_SECRET');

//   const anonymousId = crypto.randomUUID();

//   const response = await fetch(
//     `${VITE_CTP_AUTH_URL}/oauth/${VITE_CTP_PROJECT_KEY}/anonymous/token`,
//     {
//       method: 'POST',
//       headers: {
//         Authorization: `Basic ${credentials}`,
//         'Content-Type': 'application/x-www-form-urlencoded',
//       },
//       body: `grant_type=anonymous_id&anonymous_id=${anonymousId}`,
//     }
//   );

//   if (!response.ok) {
//     throw new Error('Failed to get anonymous token');
//   }

//   const data: unknown = await response.json();
//   localStorage.setItem('accessToken', data.access_token);
//   return data.access_token;
// };
