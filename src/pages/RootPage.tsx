import Header from '@/components/ui/header';
import { Toaster } from '@/components/ui/toaster';
import { Outlet } from 'react-router';

export default function PageRoot(): React.JSX.Element {
  return (
    <>
      <Header />
      <Outlet />
      <Toaster />
    </>
  );
}
