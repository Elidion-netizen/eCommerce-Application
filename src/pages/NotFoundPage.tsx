import { Flex, Link, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router';

export default function NotFoundPage(): React.JSX.Element {
  return (
    <Flex align="center" justify="center" height="100vh">
      <Text px="2em">
        404. The page you are looking for has not been found. Use the link to
        return to the main page.
        <Link asChild px="2.5" color="orange.600">
          <RouterLink to="/"> Return </RouterLink>
        </Link>
      </Text>
    </Flex>
  );
}
