export interface FormData {
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

export type FormErrors = {
  [key in keyof FormData]?: string;
};
