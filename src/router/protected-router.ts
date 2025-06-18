import { TOKEN_KEY } from '@/constants';
import { redirect } from 'react-router';

export function protectedLoader(): Response | null {
  const token = localStorage.getItem(TOKEN_KEY);

  if (token) {
    return redirect('/');
  }

  return null;
}
