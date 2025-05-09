import { Box, Flex, Link } from '@chakra-ui/react';
import { ColorModeButton, useColorMode } from './color-mode';
import { MdBakeryDining } from 'react-icons/md';
import { Link as RouterLink } from 'react-router-dom';
import { useLocation } from 'react-router';

const Header = (): React.JSX.Element => {
  const { colorMode } = useColorMode();
  const location = useLocation();
  const currentPath = location.pathname;

  const headerColors = {
    light: {
      bg: 'rgba(230, 201, 169, 0.9)',
      text: '#5C3D2E',
      textHover: '#8D6E63',
      icon: '#BC8A5F',
      border: '#E6C9A8',
      active: '#BC8A5F',
    },
    dark: {
      bg: 'rgba(56, 37, 31, 0.9)',
      text: '#EFEBE9',
      textHover: '#D4A373',
      icon: '#D4A373',
      border: '#5D4037',
      active: '#F6AD55',
    },
  };

  const colors = colorMode === 'dark' ? headerColors.dark : headerColors.light;

  return (
    <Box
      as="header"
      position="sticky"
      top={0}
      zIndex="sticky"
      backdropFilter="blur(10px)"
      bg={colors.bg}
      py={4}
      borderRadius={'0 0 13px 13px'}
      borderBottomColor={colors.border}
      boxShadow="sm"
    >
      <Flex
        maxW="container.lg"
        mx="auto"
        justify="space-between"
        align="center"
        px={4}
      >
        <Flex align="center" gap={2}>
          <MdBakeryDining size={28} color={colors.icon} />
          <Box
            as={RouterLink}
            to="/"
            color={colors.text}
            fontWeight="bold"
            letterSpacing="wide"
            fontSize="lg"
            cursor={'default'}
            _hover={{ textDecoration: 'none' }}
            _focus={{ outline: 'none' }}
          >
            CROISSANT
          </Box>
        </Flex>

        <Flex gap={{ base: 4, md: 8 }} align="center">
          <Flex gap={{ base: 4, md: 6 }} display={{ base: 'none', md: 'flex' }}>
            {['/catalog', '/about', '/register', '/login', '/profile'].map(
              (path) => {
                const name = path.slice(1);
                const isActive = currentPath === path;

                return (
                  <Link
                    key={path}
                    as={isActive ? Box : RouterLink}
                    to={isActive ? undefined : path}
                    color={isActive ? colors.active : colors.text}
                    fontWeight="medium"
                    fontSize="md"
                    position="relative"
                    cursor={isActive ? 'default' : 'pointer'}
                    _hover={{
                      textDecoration: 'none',
                      color: isActive ? colors.active : colors.textHover,
                      _after: {
                        width: '100%',
                        opacity: 1,
                      },
                    }}
                    _focus={{ outline: 'none' }}
                    _after={{
                      content: '""',
                      position: 'absolute',
                      bottom: '-4px',
                      left: 0,
                      width: isActive ? '100%' : '0%',
                      height: '2px',
                      bg: colors.active,
                      opacity: isActive ? 1 : 0,
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {name.charAt(0).toUpperCase() + name.slice(1)}
                  </Link>
                );
              }
            )}
          </Flex>

          <ColorModeButton
            color={colors.text}
            _hover={{
              bg:
                colorMode === 'dark'
                  ? 'rgba(189, 142, 95, 0.2)'
                  : 'rgba(212, 163, 115, 0.2)',
              color: colors.textHover,
            }}
          />
        </Flex>
      </Flex>
    </Box>
  );
};
export default Header;
