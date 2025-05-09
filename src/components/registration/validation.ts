import type { FormData } from './FormData';
import type { FormErrors } from './FormData';

// Вспомогательные функции для валидации
const containsNumbers = (string_: string): boolean => /\d/.test(string_);
const isFutureDate = (dateString: string): boolean =>
  new Date(dateString) > new Date();
const isValidPostalCode = (code: string): boolean =>
  /^[a-zA-Z0-9\- ]{3,10}$/.test(code);
const isMinimumAge = (dateString: string, minAge: number): boolean => {
  const birthDate = new Date(dateString);
  const ageDate = new Date();
  ageDate.setFullYear(ageDate.getFullYear() - minAge);
  return birthDate <= ageDate;
};

export const validateForm = (formData: FormData): FormErrors => {
  const errors: FormErrors = {};

  if (!formData.email) {
    errors.email = 'Email is required';
  } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
    errors.email = 'Invalid email format';
  }

  if (formData.password) {
    if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }
  } else {
    errors.password = 'Password is required';
  }

  if (!formData.firstName) {
    errors.firstName = 'First name is required';
  } else if (containsNumbers(formData.firstName)) {
    errors.firstName = 'First name cannot contain numbers';
  } else if (formData.firstName.length < 2) {
    errors.firstName = 'First name must be at least 2 characters';
  }

  if (!formData.lastName) {
    errors.lastName = 'Last name is required';
  } else if (containsNumbers(formData.lastName)) {
    errors.lastName = 'Last name cannot contain numbers';
  } else if (formData.lastName.length < 2) {
    errors.lastName = 'Last name must be at least 2 characters';
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
  } else if (containsNumbers(formData.shippingStreet)) {
    errors.shippingStreet = 'Street name cannot contain numbers';
  }

  if (!formData.shippingCity) {
    errors.shippingCity = 'City is required';
  } else if (containsNumbers(formData.shippingCity)) {
    errors.shippingCity = 'City name cannot contain numbers';
  }

  if (!formData.shippingPostalCode) {
    errors.shippingPostalCode = 'Postal code is required';
  } else if (!isValidPostalCode(formData.shippingPostalCode)) {
    errors.shippingPostalCode = 'Invalid postal code format';
  }

  if (!formData.shippingCountry) {
    errors.shippingCountry = 'Country is required';
  } else if (containsNumbers(formData.shippingCountry)) {
    errors.shippingCountry = 'Country name cannot contain numbers';
  }

  if (!formData.useSameAddress) {
    if (!formData.billingStreet) {
      errors.billingStreet = 'Street is required';
    } else if (containsNumbers(formData.billingStreet)) {
      errors.billingStreet = 'Street name cannot contain numbers';
    }

    if (!formData.billingCity) {
      errors.billingCity = 'City is required';
    } else if (containsNumbers(formData.billingCity)) {
      errors.billingCity = 'City name cannot contain numbers';
    }

    if (!formData.billingPostalCode) {
      errors.billingPostalCode = 'Postal code is required';
    } else if (!isValidPostalCode(formData.billingPostalCode)) {
      errors.billingPostalCode = 'Invalid postal code format';
    }

    if (!formData.billingCountry) {
      errors.billingCountry = 'Country is required';
    } else if (containsNumbers(formData.billingCountry)) {
      errors.billingCountry = 'Country name cannot contain numbers';
    }
  }

  return errors;
};

export const isFormValid = (formData: FormData): boolean => {
  const errors = validateForm(formData);
  return Object.keys(errors).length === 0;
};
