import { Box, Container, Flex, Text, Link } from '@chakra-ui/react';
import RegistrationForm from '../components/registration/RegistrationForm';
import { useColorMode } from '../components/ui/color-mode';
import { Link as RouterLink } from 'react-router';

const RegistrationPage = (): React.JSX.Element => {
  const { colorMode } = useColorMode();

  const colors = {
    light: {
      bg: '#F8F1E9',
      cardBg: 'white',
      headingGradient: 'linear(to-r, #D4A373, #BC8A5F)',
      border: '#E6C9A8',
      text: '#5C3D2E',
    },
    dark: {
      bg: '#3E2723',
      cardBg: '#5D4037',
      headingGradient: 'linear(to-r, #BC8A5F, #D4A373)',
      border: '#8D6E63',
      text: '#EFEBE9',
    },
  };

  const currentColors = colors[colorMode];

  return (
    <Box
      minH="100vh"
      // bg={currentColors.bg}
      py={10}
      px={{ base: 4, md: 6 }}
      display="flex"
      flexDirection="column"
    >
      <Container maxW="700px" flex={1} display="flex" flexDirection="column">
        <Flex direction="column" gap={6} align="center" flex={1}>
          <Box
            p={{ base: 6, md: 8 }}
            borderWidth={1}
            borderColor={currentColors.border}
            borderRadius="2xl"
            boxShadow="xl"
            bg={currentColors.cardBg}
            width="full"
            transition="all 0.3s ease-in-out"
            _hover={{ boxShadow: '2xl', transform: 'translateY(-3px)' }}
          >
            <Text
              textAlign="center"
              mb={4}
              fontSize="xl"
              fontWeight="bold"
              color={currentColors.text}
            >
              CREATE YOUR ACCOUNT
            </Text>
            <RegistrationForm />
          </Box>

          <Text mt={1} color={currentColors.text}>
            Already have an account?{' '}
            <Link
              asChild
              color={colorMode === 'dark' ? 'orange.300' : 'orange.600'}
              fontWeight="semibold"
              display="inline"
              _hover={{
                textDecoration: 'underline',
                textUnderlineOffset: '3px',
              }}
            >
              <RouterLink to="/login">Sign in</RouterLink>
            </Link>
          </Text>
        </Flex>
      </Container>
    </Box>
  );
};
export default RegistrationPage;
