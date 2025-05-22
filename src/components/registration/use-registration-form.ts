import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router';
import type { FormData } from './FormData';
import { validateForm, isFormValid } from './validation';
import { showToast } from '../ui/toaster';
import {
  registerUser,
  handleRegistrationError,
  type RegistrationError,
} from '../../commercetools/auth';
import { useAuth } from '@/store/auth-provider';

export const useRegistrationForm = (): {
  formData: FormData;
  errors: Record<string, string>;
  isSubmitting: boolean;
  isFormValid: boolean;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleCheckboxChange: (checked: boolean) => void;
  handleDefaultAddressChange: (details: { value: string | null }) => void;
  handleSubmit: (event: React.FormEvent) => void;
} => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    shippingStreet: '',
    shippingCity: '',
    shippingPostalCode: '',
    shippingCountry: '',
    billingStreet: '',
    billingCity: '',
    billingPostalCode: '',
    billingCountry: '',
    useSameAddress: true,
    defaultAddress: 'none',
  });

  const navigate = useNavigate();
  const { login } = useAuth();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = useCallback(
    (name: keyof FormData, value: string): void => {
      const temporaryFormData = { ...formData, [name]: value };
      const fieldErrors = validateForm(temporaryFormData);

      setErrors((previous) => {
        if (fieldErrors[name]) {
          return { ...previous, [name]: fieldErrors[name] };
        }

        return Object.fromEntries(
          Object.entries(previous).filter(([key]) => key !== name)
        );
      });
    },
    [formData]
  );

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
    validateField(name as keyof FormData, value);
  };

  const handleCheckboxChange = (checked: boolean): void => {
    setFormData((previous) => {
      const newData = {
        ...previous,
        useSameAddress: checked,
      };

      if (checked) {
        newData.billingStreet = previous.shippingStreet;
        newData.billingCity = previous.shippingCity;
        newData.billingPostalCode = previous.shippingPostalCode;
        newData.billingCountry = previous.shippingCountry;

        validateField('billingStreet', previous.shippingStreet);
        validateField('billingCity', previous.shippingCity);
        validateField('billingPostalCode', previous.shippingPostalCode);
        validateField('billingCountry', previous.shippingCountry);
      }

      return newData;
    });
  };

  const handleDefaultAddressChange = (details: {
    value: string | null;
  }): void => {
    const value = details.value ?? 'none';
    setFormData((previous) => ({
      ...previous,
      defaultAddress: value as 'shipping' | 'billing' | 'none',
    }));
  };

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    setIsSubmitting(true);

    const formErrors = validateForm(formData);
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      void (async (): Promise<void> => {
        try {
          const token = await registerUser(formData);
          login(token);
          showToast({
            title: 'Registration Successful',
            description: 'Your account has been created!',
            status: 'success',
          });
          void navigate('/');
        } catch (error) {
          if (error instanceof Error) {
            const registrationError = JSON.parse(
              error.message
            ) as RegistrationError;
            const errorMessage = handleRegistrationError(registrationError);
            showToast({
              title: 'Registration Failed',
              description: errorMessage,
              status: 'error',
            });
          }
        } finally {
          setIsSubmitting(false);
        }
      })();
    } else {
      showToast({
        title: 'Form Validation Error',
        description: 'Please fix the highlighted fields.',
        status: 'error',
      });
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    errors,
    isSubmitting,
    isFormValid: isFormValid(formData),
    handleInputChange,
    handleCheckboxChange,
    handleDefaultAddressChange,
    handleSubmit,
  };
};
