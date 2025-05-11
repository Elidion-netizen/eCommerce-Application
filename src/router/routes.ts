import RootPage from '@/pages/RootPage';
import { createBrowserRouter } from 'react-router';
import NotFoundPage from '@/pages/NotFoundPage';
import LoginPage from '@/pages/LoginPage';
import { protectedLoader } from './protected-router';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootPage,
    children: [
      { path: 'login', loader: protectedLoader, Component: LoginPage },
    ],
  },
  {
    path: '*',
    Component: NotFoundPage,
  },
]);
