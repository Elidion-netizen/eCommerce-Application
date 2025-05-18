import type { Address } from '@commercetools/platform-sdk';
import {
  countries,
  type CountryCode,
} from '../components/registration/constants';

export interface RegistrationData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  shippingStreet: string;
  shippingCity: string;
  shippingPostalCode: string;
  shippingCountry: string;
  billingStreet: string;
  billingCity: string;
  billingPostalCode: string;
  billingCountry: string;
  useSameAddress: boolean;
  defaultAddress: 'shipping' | 'billing' | 'none';
}

export interface RegistrationError {
  code: string;
  message: string;
}

interface ApiResponse {
  code?: string;
  message?: string;
  access_token?: string;
  errors?: Array<{
    code: string;
    message: string;
    detailedErrorMessage?: string;
  }>;
}

const validateCountryCode = (country: string): CountryCode => {
  const upperCountry = country.toUpperCase();
  const countryValues = Object.values(countries);

  if (countryValues.includes(upperCountry as CountryCode)) {
    return upperCountry as CountryCode;
  }

  throw new Error(
    JSON.stringify({
      code: 'InvalidInput',
      message: `Invalid country code: ${country}. Please select a country from the list.`,
    })
  );
};

const createAddress = (
  street: string,
  city: string,
  postalCode: string,
  country: string
): Address => ({
  streetName: street,
  city,
  postalCode,
  country: validateCountryCode(country),
});

export const registerUser = async (data: RegistrationData): Promise<void> => {
  try {
    const shippingAddress = createAddress(
      data.shippingStreet,
      data.shippingCity,
      data.shippingPostalCode,
      data.shippingCountry
    );

    const billingAddress = data.useSameAddress
      ? shippingAddress
      : createAddress(
          data.billingStreet,
          data.billingCity,
          data.billingPostalCode,
          data.billingCountry
        );

    const customerDraft = {
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      dateOfBirth: data.dateOfBirth,
      addresses: [shippingAddress, billingAddress],
      shippingAddresses: [0],
      billingAddresses: [1],
      defaultShippingAddress:
        data.defaultAddress === 'shipping' ? 0 : undefined,
      defaultBillingAddress: data.defaultAddress === 'billing' ? 1 : undefined,
    };

    const apiUrl = import.meta.env.VITE_CTP_API_URL as string;
    const projectKey = import.meta.env.VITE_CTP_PROJECT_KEY as string;

    console.log('Request URL:', `${apiUrl}/${projectKey}/customers`);
    console.log('Request headers:', {
      'Content-Type': 'application/json',
      Authorization: 'Bearer [TOKEN]',
    });
    console.log('Request body:', JSON.stringify(customerDraft, undefined, 2));

    const response = await fetch(`${apiUrl}/${projectKey}/customers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${await getAccessToken()}`,
      },
      body: JSON.stringify(customerDraft),
    });

    const responseText = await response.text();
    console.log('Response status:', response.status);
    console.log('Response text:', responseText);

    if (!response.ok) {
      let errorData: ApiResponse;
      try {
        errorData = JSON.parse(responseText) as ApiResponse;
      } catch {
        errorData = {
          message: responseText,
          code: 'PARSE_ERROR',
        };
      }
      console.error('Customer creation error:', errorData);
      throw new Error(
        JSON.stringify({
          code: errorData.code || 'UNKNOWN_ERROR',
          message: errorData.message || 'An error occurred during registration',
        })
      );
    }

    const responseData = JSON.parse(responseText) as ApiResponse;
    console.log('Customer created successfully:', responseData);
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(
      JSON.stringify({
        code: 'UNKNOWN_ERROR',
        message: 'An error occurred during registration',
      })
    );
  }
};

const getAccessToken = async (): Promise<string> => {
  try {
    const authUrl = import.meta.env.VITE_CTP_AUTH_URL as string;
    const clientId = import.meta.env.VITE_CTP_CLIENT_ID as string;
    const clientSecret = import.meta.env.VITE_CTP_CLIENT_SECRET as string;
    const scopes = import.meta.env.VITE_CTP_SCOPES as string;

    // Debug information
    console.log('Environment variables:', {
      authUrl: authUrl ? 'Set' : 'Missing',
      clientId: clientId ? 'Set' : 'Missing',
      clientSecret: clientSecret ? 'Set' : 'Missing',
      scopes: scopes ? 'Set' : 'Missing',
    });

    if (!authUrl || !clientId || !clientSecret || !scopes) {
      const missingVariables = [];
      if (!authUrl) missingVariables.push('VITE_CTP_AUTH_URL');
      if (!clientId) missingVariables.push('VITE_CTP_CLIENT_ID');
      if (!clientSecret) missingVariables.push('VITE_CTP_CLIENT_SECRET');
      if (!scopes) missingVariables.push('VITE_CTP_SCOPES');

      throw new Error(
        JSON.stringify({
          code: 'CONFIG_ERROR',
          message: `Missing required environment variables: ${missingVariables.join(
            ', '
          )}`,
        })
      );
    }

    const clientResponse = await fetch(`${authUrl}/oauth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        scope: scopes,
      }),
    });

    if (!clientResponse.ok) {
      const errorData = (await clientResponse.json()) as ApiResponse;
      console.error('Client credentials error:', errorData);
      throw new Error(
        JSON.stringify({
          code: errorData.code || 'AUTH_ERROR',
          message:
            errorData.message || 'Failed to get client credentials token',
        })
      );
    }

    const clientData = (await clientResponse.json()) as ApiResponse;
    if (!clientData.access_token) {
      throw new Error(
        JSON.stringify({
          code: 'AUTH_ERROR',
          message: 'Client credentials token not found in response',
        })
      );
    }
    return clientData.access_token;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(
      JSON.stringify({
        code: 'AUTH_ERROR',
        message: 'Failed to get access token',
      })
    );
  }
};

export const handleRegistrationError = (error: RegistrationError): string => {
  switch (error.code) {
    case 'DuplicateField': {
      return 'A user with such an email already exists';
    }
    case 'InvalidInput': {
      return 'Check the correctness of the entered data';
    }
    case 'InvalidCredentials': {
      return 'Inappropriate accounting data';
    }
    case 'CONFIG_ERROR': {
      return 'Configuration error. Please contact support.';
    }
    case 'AUTH_ERROR': {
      return 'Authentication error. Please try again later.';
    }
    case 'PARSE_ERROR': {
      return 'Server response error. Please try again later.';
    }
    default: {
      return error.message;
    }
  }
};
