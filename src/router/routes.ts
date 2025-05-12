import MainPage from '@/pages/MainPage';
import PageRoot from '@/pages/RootPage';
import RegistrationPage from '@/pages/RegistrationPage';
import { createBrowserRouter } from 'react-router';
import NotFoundPage from '@/pages/NotFoundPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: PageRoot,
    children: [
      { index: true, Component: MainPage },
      { path: 'register', Component: RegistrationPage },
    ],
  },
  {
    path: '*',
    Component: NotFoundPage,
  },
]);
