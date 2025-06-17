import { Box, Flex, Link, VStack } from '@chakra-ui/react';
import { ColorModeButton, useColorMode } from './color-mode';
import { MdBakeryDining } from 'react-icons/md';
import { Link as RouterLink } from 'react-router';
import { useLocation, useNavigate } from 'react-router';
import { useAuth } from '@/store/auth-provider';
import { DrawerMenu } from './drawer';
import React, { useRef } from 'react';
import CartIcon, { type CartIconHandle } from './busket';

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

interface RenderLinks {
  colors: typeof headerColors.light | typeof headerColors.dark;
  currentPath: string;
  isAuth: boolean;
  logout: () => void;
  navigate: (path: string) => Promise<void>;
}

const Header = (): React.JSX.Element => {
  const cartReference = useRef<CartIconHandle>(null);

  const { colorMode } = useColorMode();
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const colors = colorMode === 'dark' ? headerColors.dark : headerColors.light;

  const { isAuth, logout } = useAuth();

  const renderLinks = ({
    colors,
    currentPath,
    isAuth,
    logout,
    navigate,
  }: RenderLinks): React.JSX.Element[] => {
    return [
      '/catalog',
      '/about',
      ...(isAuth ? ['/profile', '/logout'] : ['/login', '/register']),
    ].map((path) => {
      const name = path.slice(1);
      const isActive = currentPath === path;

      if (path === '/logout') {
        return (
          <Link
            as="button"
            key={path}
            color={colors.text}
            fontWeight="medium"
            fontSize="md"
            onClick={() => {
              logout();
              void navigate('/');
            }}
            _hover={{ color: colors.textHover }}
          >
            Logout
          </Link>
        );
      }

      return (
        <Link
          asChild
          key={path}
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
          <RouterLink to={path}>
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </RouterLink>
        </Link>
      );
    });
  };

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

          <Link
            asChild
            color={colors.text}
            fontWeight="bold"
            letterSpacing="wide"
            fontSize="lg"
            _hover={{ textDecoration: 'none' }}
            _focus={{ outline: 'none' }}
          >
            <RouterLink to="/">CROISSANT</RouterLink>
          </Link>
        </Flex>

        <Flex gap={{ base: 4, md: 8 }} align="center">
          <Flex gap={{ base: 4, md: 6 }} display={{ base: 'none', md: 'flex' }}>
            {renderLinks({
              colors,
              currentPath,
              isAuth,
              logout,
              navigate: (path: string) => Promise.resolve(navigate(path)),
            })}
          </Flex>

          <Box
            display={{ base: 'block', md: 'none' }}
            cursor={'pointer'}
            color={colors.text}
          >
            <DrawerMenu>
              <VStack align="stretch">
                {renderLinks({
                  colors,
                  currentPath,
                  isAuth,
                  logout,
                  navigate: (path: string) => Promise.resolve(navigate(path)),
                })}
              </VStack>
            </DrawerMenu>
          </Box>

          <Flex align="center" gap={2}>
            <Link
              asChild
              color={colors.text}
              fontWeight="bold"
              letterSpacing="wide"
              fontSize="lg"
              _hover={{ textDecoration: 'none' }}
              _focus={{ outline: 'none' }}
            >
              <CartIcon ref={cartReference}></CartIcon>
            </Link>
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
