export const countries = {
  Austria: 'AT',
  Belgium: 'BE',
  Germany: 'DE',
  France: 'FR',
  Italy: 'IT',
  Netherlands: 'NL',
  Spain: 'ES',
  Sweden: 'SE',
  'United Kingdom': 'GB',
} as const;

export type CountryCode = (typeof countries)[keyof typeof countries];

export const colorSchemes = {
  light: {
    bg: '#F5E9DC',
    text: '#5C3D2E',
    inputBg: 'white',
    border: '#E6C9A8',
    primary: '#D4A373',
    error: 'red.500',
  },
  dark: {
    bg: '#3E2723',
    text: '#EFEBE9',
    inputBg: '#5D4037',
    border: '#8D6E63',
    primary: '#BC8A5F',
    error: 'red.300',
  },
};
