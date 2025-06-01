export const colors = {
  light: {
    bg: '#F5E9DC',
    text: '#5C3D2E',
    border: '#E6C9A8',
    primary: '#D4A373',
    cardBg: 'white',
    secondary: '#E6C9A8',
    button: '#D4A373',
    buttonHover: '#BC8A5F',
    gradient: 'linear(to-br, #F5E9DC, #F8F1E9)',
  },
  dark: {
    bg: '#3E2723',
    text: '#EFEBE9',
    border: '#8D6E63',
    primary: '#BC8A5F',
    cardBg: '#5D4037',
    secondary: '#A1887F',
    button: '#BC8A5F',
    buttonHover: '#D4A373',
    gradient: 'linear(to-b, #3E2723, #5D4037)',
  },
} as const;

export type ColorMode = keyof typeof colors;
