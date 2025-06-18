import type { FormData } from './FormData';
import type { FormErrors } from './FormData';

const hasSpecialCharsOrNumbers = (string_: string): boolean =>
  /[0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(string_);
const isFutureDate = (dateString: string): boolean =>
  new Date(dateString) > new Date();
const isMinimumAge = (dateString: string, minAge: number): boolean => {
  const birthDate = new Date(dateString);
  const ageDate = new Date();
  ageDate.setFullYear(ageDate.getFullYear() - minAge);
  return birthDate <= ageDate;
};

const isValidPostalCode = (code: string): boolean =>
  /^\d{5}$/.test(code.trim());

const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
};

const isValidPassword = (password: string): boolean => {
  const trimmed = password.trim();
  return (
    trimmed.length >= 8 &&
    /[A-Z]/.test(trimmed) &&
    /[a-z]/.test(trimmed) &&
    /[0-9]/.test(trimmed) &&
    /[^A-Za-z0-9]/.test(trimmed)
  );
};

export const validateForm = (formData: FormData): FormErrors => {
  const errors: FormErrors = {};

  if (!formData.email) {
    errors.email = 'Email is required';
  } else if (formData.email !== formData.email.trim()) {
    errors.email = 'Email cannot start/end with spaces';
  } else if (!isValidEmail(formData.email)) {
    errors.email = 'Please enter a valid email (e.g., user@example.com)';
  }

  if (!formData.password) {
    errors.password = 'Password is required';
  } else if (formData.password !== formData.password.trim()) {
    errors.password = 'Password cannot start/end with spaces';
  } else if (!isValidPassword(formData.password)) {
    errors.password =
      'Password must be 8+ characters with at least: 1 uppercase, 1 lowercase, 1 number and 1 special character';
  }

  if (!formData.firstName) {
    errors.firstName = 'First name is required';
  } else if (hasSpecialCharsOrNumbers(formData.firstName)) {
    errors.firstName =
      'First name cannot contain numbers or special characters';
  } else if (formData.firstName.trim().length === 0) {
    errors.firstName = 'First name must contain at least 1 character';
  }

  if (!formData.lastName) {
    errors.lastName = 'Last name is required';
  } else if (hasSpecialCharsOrNumbers(formData.lastName)) {
    errors.lastName = 'Last name cannot contain numbers or special characters';
  } else if (formData.lastName.trim().length === 0) {
    errors.lastName = 'Last name must contain at least 1 character';
  }

  if (!formData.dateOfBirth) {
    errors.dateOfBirth = 'Date of birth is required';
  } else if (isFutureDate(formData.dateOfBirth)) {
    errors.dateOfBirth = 'Date must be in the past';
  } else if (!isMinimumAge(formData.dateOfBirth, 13)) {
    errors.dateOfBirth = 'You must be at least 13 years old';
  }

  if (!formData.shippingStreet) {
    errors.shippingStreet = 'Street is required';
  } else if (formData.shippingStreet.trim().length === 0) {
    errors.shippingStreet = 'Street must contain at least 1 character';
  }

  if (!formData.shippingCity) {
    errors.shippingCity = 'City is required';
  } else if (hasSpecialCharsOrNumbers(formData.shippingCity)) {
    errors.shippingCity = 'City cannot contain numbers or special characters';
  } else if (formData.shippingCity.trim().length === 0) {
    errors.shippingCity = 'City must contain at least 1 character';
  }

  if (!formData.shippingPostalCode) {
    errors.shippingPostalCode = 'Postal code is required';
  } else if (!isValidPostalCode(formData.shippingPostalCode)) {
    errors.shippingPostalCode = 'Postal code must be 5 digits (e.g., 10115)';
  }

  if (!formData.shippingCountry) {
    errors.shippingCountry = 'Country is required';
  }

  if (!formData.useSameAddress) {
    if (!formData.billingStreet) {
      errors.billingStreet = 'Street is required';
    } else if (formData.billingStreet.trim().length === 0) {
      errors.billingStreet = 'Street must contain at least 1 character';
    }

    if (!formData.billingCity) {
      errors.billingCity = 'City is required';
    } else if (hasSpecialCharsOrNumbers(formData.billingCity)) {
      errors.billingCity = 'City cannot contain numbers or special characters';
    } else if (formData.billingCity.trim().length === 0) {
      errors.billingCity = 'City must contain at least 1 character';
    }

    if (!formData.billingPostalCode) {
      errors.billingPostalCode = 'Postal code is required';
    } else if (!isValidPostalCode(formData.billingPostalCode)) {
      errors.billingPostalCode = 'Postal code must be 5 digits (e.g., 10115)';
    }

    if (!formData.billingCountry) {
      errors.billingCountry = 'Country is required';
    }
  }

  return errors;
};

export const isFormValid = (formData: FormData): boolean => {
  const errors = validateForm(formData);
  return Object.keys(errors).length === 0;
};
