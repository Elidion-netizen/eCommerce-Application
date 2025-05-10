import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from '@/components/ui/provider';
import './index.css';
import { RouterProvider } from 'react-router';
import { router } from './router/routes';

const rootElement = document.querySelector('#root');

if (!rootElement) {
  throw new Error('no root element found');
}

createRoot(rootElement).render(
  <StrictMode>
    <Provider>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
