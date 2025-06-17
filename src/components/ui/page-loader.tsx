import { Box, Spinner } from '@chakra-ui/react';
import { useColorMode } from './color-mode';
import { colors } from './colors';
import type { ColorMode } from './colors';

interface PageLoaderProps {
  isLoading: boolean;
}

export const PageLoader = ({
  isLoading,
}: PageLoaderProps): React.JSX.Element | undefined => {
  const { colorMode } = useColorMode();
  const currentColors = colors[colorMode as ColorMode];

  if (!isLoading) return undefined;

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg={
        colorMode === 'dark' ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.7)'
      }
      zIndex={9999}
    >
      <Spinner
        colorPalette="gray.200"
        color={currentColors.primary}
        size="xl"
      />
    </Box>
  );
};
