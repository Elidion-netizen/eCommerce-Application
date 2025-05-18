import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from '@/components/ui/provider';
import './index.css';
import { RouterProvider } from 'react-router';
import { router } from './router/routes';
import { AuthProvider } from './store/auth-provider';

const rootElement = document.querySelector('#root');

if (!rootElement) {
  throw new Error('no root element found');
}

createRoot(rootElement).render(
  <StrictMode>
    <AuthProvider>
      <Provider>
        <RouterProvider router={router} />
      </Provider>
    </AuthProvider>
  </StrictMode>
);
