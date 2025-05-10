import RootPage from '@/pages/RootPage';
import { createBrowserRouter } from 'react-router';
import NotFoundPage from '@/pages/NotFoundPage';
import LoginPage from '@/pages/LoginPage';
import { protectedLoader } from './protected-router';
import MainPage from '@/pages/MainPage';
import RegistrationPage from '@/pages/RegistrationPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootPage,
    children: [
      { index: true, Component: MainPage },
      { path: 'register', Component: RegistrationPage },
      { path: 'login', loader: protectedLoader, Component: LoginPage },
    ],
  },
  {
    path: '*',
    Component: NotFoundPage,
  },
]);
