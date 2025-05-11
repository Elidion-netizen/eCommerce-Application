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
}

const COMMON_AUTH_OPTIONS: CommonAuthOptions = {
  host: VITE_CTP_AUTH_URL as string,
  projectKey: VITE_CTP_PROJECT_KEY as string,
  credentials: {
    clientId: VITE_CTP_CLIENT_ID as string,
    clientSecret: VITE_CTP_CLIENT_SECRET as string,
  },
  scopes: [VITE_CTP_SCOPES],
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
  host: VITE_CTP_API_URL as string,
};

export const ctpClientWithClientCredentials = new ClientBuilder()
  .withProjectKey(VITE_CTP_PROJECT_KEY as string)
  .withClientCredentialsFlow(clientCredentialsAuthMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();

export const ctpClientWithAnonymousAuth = new ClientBuilder()
  .withProjectKey(VITE_CTP_PROJECT_KEY as string)
  .withAnonymousSessionFlow(anonymousAuthMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();

export const ctpClientWithPasswordAuth = new ClientBuilder()
  .withProjectKey(VITE_CTP_PROJECT_KEY as string)
  .withPasswordFlow(passwordAuthMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();
