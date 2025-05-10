import RootPage from '@/pages/RootPage';
import { createBrowserRouter } from 'react-router';
import NotFoundPage from '@/pages/NotFoundPage';
import LoginPage from '@/pages/LoginPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootPage,
    children: [{ path: 'login', Component: LoginPage }],
  },
  {
    path: '*',
    Component: NotFoundPage,
  },
]);
