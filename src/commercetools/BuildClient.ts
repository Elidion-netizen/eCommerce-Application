import {
  ClientBuilder,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
  type PasswordAuthMiddlewareOptions,
} from '@commercetools/ts-client';

const {
  VITE_CTP_CLIENT_ID,
  VITE_CTP_CLIENT_SECRET,
  VITE_CTP_PROJECT_KEY,
  VITE_CTP_API_URL,
  VITE_CTP_AUTH_URL,
  VITE_CTP_SCOPES,
} = import.meta.env;

interface Credentials {
  clientId: string;
  clientSecret: string;
  user?: {
    username: string;
    password: string;
  };
  anonymousId?: string;
  refreshToken?: string;
}

interface CommonAuthOptions {
  host: string;
  projectKey: string;
  credentials: Credentials;
  scopes: [string, ...string[]];
  fetch: typeof fetch;
}

const COMMON_AUTH_OPTIONS: CommonAuthOptions = {
  host: VITE_CTP_AUTH_URL,
  projectKey: VITE_CTP_PROJECT_KEY,
  credentials: {
    clientId: VITE_CTP_CLIENT_ID,
    clientSecret: VITE_CTP_CLIENT_SECRET,
  },
  scopes: [VITE_CTP_SCOPES],
  fetch,
};

const clientCredentialsAuthMiddlewareOptions: AuthMiddlewareOptions = {
  ...COMMON_AUTH_OPTIONS,
};

const passwordAuthMiddlewareOptions: PasswordAuthMiddlewareOptions = {
  ...COMMON_AUTH_OPTIONS,
  credentials: {
    ...COMMON_AUTH_OPTIONS.credentials,
    user: {
      username: '',
      password: '',
    },
  },
};

const anonymousAuthMiddlewareOptions: AuthMiddlewareOptions = {
  ...COMMON_AUTH_OPTIONS,
  credentials: {
    ...COMMON_AUTH_OPTIONS.credentials,
    anonymousId: crypto.randomUUID(),
  },
};

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: VITE_CTP_API_URL,
  httpClient: fetch,
};

export const ctpClientWithClientCredentials = new ClientBuilder()
  .withProjectKey(VITE_CTP_PROJECT_KEY)
  .withClientCredentialsFlow(clientCredentialsAuthMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();

export const ctpClientWithAnonymousAuth = new ClientBuilder()
  .withProjectKey(VITE_CTP_PROJECT_KEY)
  .withAnonymousSessionFlow(anonymousAuthMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();

export const ctpClientWithPasswordAuth = new ClientBuilder()
  .withProjectKey(VITE_CTP_PROJECT_KEY)
  .withPasswordFlow(passwordAuthMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();
