export const emailValidator = {
  required: 'Email is required',
  pattern: {
    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Email must be properly formatted',
  },
  validate: {
    noWhitespace: (value: string): string | boolean =>
      !/\s/.test(value) ||
      'Email must not contain leading or trailing whitespace',
    hasDomain: (value: string): string | boolean =>
      (value.split('@')[1] && value.split('@')[1].includes('.')) ||
      'Email must contain a domain name',
  },
};

export const passwordValidator = {
  required: 'Password is required',
  minLength: {
    value: 8,
    message: 'Password must be at least 8 characters long',
  },
  pattern: {
    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/,
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character',
  },
  validate: {
    noWhitespace: (value: string): string | boolean =>
      !/\s/.test(value) ||
      'Password must not contain leading or trailing whitespace',
  },
};
