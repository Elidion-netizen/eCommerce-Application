import Header from '@/components/ui/header';
import { Toaster } from '@/components/ui/toaster';
import { Flex } from '@chakra-ui/react';
import { Outlet } from 'react-router';

export default function RootPage(): React.JSX.Element {
  return (
    <Flex height="100vh" flexDir="column">
      <Header />
      <Outlet />
      <Toaster />
    </Flex>
  );
}
