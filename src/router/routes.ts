import RootPage from '@/pages/RootPage';
import { createBrowserRouter, redirect } from 'react-router';
import NotFoundPage from '@/pages/NotFoundPage';
import LoginPage from '@/pages/LoginPage';
import { protectedLoader } from './protected-router';
import MainPage from '@/pages/MainPage';
import RegistrationPage from '@/pages/RegistrationPage';
import AboutUsPage from '@/pages/AboutUsPage';
export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootPage,
    children: [
      {
        index: true,
        loader: (): Response => redirect('main'),
      },
      { path: 'main', Component: MainPage },
      { path: 'register', Component: RegistrationPage },
      { path: 'login', loader: protectedLoader, Component: LoginPage },
      { path: 'about', Component: AboutUsPage },
    ],
  },
  {
    path: '*',
    Component: NotFoundPage,
  },
]);
