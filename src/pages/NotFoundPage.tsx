import { Flex, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router';

export default function NotFoundPage(): React.JSX.Element {
  return (
    <Flex align="center" justify="center" height="100vh">
      <p>Oops. Something went wrong</p>
      <Link asChild pl="2.5" color="orange.600">
        <RouterLink to="/"> Return </RouterLink>
      </Link>
    </Flex>
  );
}
