import { Box, Flex, Heading, Text, Link } from '@chakra-ui/react';
import { useColorMode } from '../components/ui/color-mode';
import { Link as RouterLink } from 'react-router';

const MainPage = (): React.JSX.Element => {
  const { colorMode } = useColorMode();

  const colors = {
    light: {
      bg: 'linear(to-br, #F5E9DC, #F8F1E9)',
      primary: '#D4A373',
      secondary: '#E6C9A8',
      text: '#5C3D2E',
      button: '#D4A373',
      buttonHover: '#BC8A5F',
    },
    dark: {
      bg: 'linear(to-b, #3E2723, #5D4037)',
      primary: '#8D6E63',
      secondary: '#A1887F',
      text: '#EFEBE9',
      button: '#BC8A5F',
      buttonHover: '#D4A373',
    },
  };

  const currentColors = colorMode === 'dark' ? colors.dark : colors.light;

  return (
    <Box bgGradient={currentColors.bg}>
      <Flex
        direction={{ base: 'column', md: 'row' }}
        align="center"
        justify="space-between"
        minH="calc(100vh - 80px)"
        px={{ base: 4, md: 8, lg: 16 }}
        py={12}
        position="relative"
        overflow="hidden"
      >
        <Box
          zIndex={2}
          maxW={{ base: '100%', md: '50%' }}
          textAlign={{ base: 'center', md: 'left' }}
        >
          <Text
            fontSize={{ base: 'lg', md: 'xl' }}
            mb={2}
            color={currentColors.text}
            fontWeight="medium"
          >
            Welcome to
          </Text>

          <Heading
            as="h1"
            size={{ base: '2xl', md: '3xl', lg: '4xl' }}
            lineHeight="shorter"
            mb={4}
            color={currentColors.primary}
            fontWeight="bold"
            letterSpacing="tight"
          >
            CROISSANT
          </Heading>

          <Text
            fontSize={{ base: 'md', md: 'lg' }}
            mb={8}
            color={currentColors.text}
            maxW={{ md: '90%' }}
          >
            The freshest and most fragrant pastries. Natural ingredients,
            handmade with love in every crumb.
          </Text>

          <Flex gap={4} justify={{ base: 'center', md: 'flex-start' }}>
            <Link
              asChild
              bg={currentColors.button}
              color="white"
              px={8}
              height={10}
              borderRadius="13px"
              _hover={{
                bg: currentColors.buttonHover,
                transform: 'translateY(-2px)',
                boxShadow: 'lg',
              }}
              transition="all 0.2s"
            >
              <RouterLink to="/register">Sign Up</RouterLink>
            </Link>

            <Link
              asChild
              borderColor={currentColors.primary}
              borderWidth="1px"
              color={currentColors.primary}
              px={8}
              borderRadius="13px"
              _hover={{
                bg:
                  colorMode === 'dark'
                    ? 'rgba(141, 110, 99, 0.1)'
                    : 'rgba(212, 163, 115, 0.1)',
                transform: 'translateY(-2px)',
              }}
              transition="all 0.2s"
            >
              <RouterLink to="/login">Login</RouterLink>
            </Link>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default MainPage;
