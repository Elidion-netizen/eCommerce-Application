import { Box, Button, Text } from '@chakra-ui/react';
import { useRef, useState } from 'react';

interface SortMenuProps {
  currentColors: { [key: string]: string };
  onSortAll: () => void;
  onSortByPriceAsc: () => void;
  onSortByPriceDesc: () => void;
  onSortDiscounted: () => void;
}

export const SortMenu = ({
  currentColors,
  onSortAll,
  onSortByPriceAsc,
  onSortByPriceDesc,
  onSortDiscounted,
}: SortMenuProps): React.JSX.Element => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPriceSubmenuOpen, setIsPriceSubmenuOpen] = useState(false);

  const menuReference = useRef<HTMLDivElement>(null);

  return (
    <Box position="relative" ref={menuReference}>
      <Button
        bg="#D4A373"
        color="#5C3D2E"
        _hover={{ bg: '#BC8A5F', color: '#5C3D2E' }}
        onClick={() => {
          setIsMenuOpen(!isMenuOpen);
        }}
        minW="120px"
        fontWeight={800}
        boxShadow="md"
        borderRadius="md"
      >
        Sort
      </Button>

      {isMenuOpen && (
        <Box
          position="absolute"
          top="calc(100% + 4px)"
          left={0}
          bg={currentColors.cardBg}
          borderRadius="md"
          boxShadow="0 4px 10px rgba(0,0,0,0.1)"
          zIndex={10}
          width="160px"
          py={2}
        >
          <Text
            px={4}
            py={2}
            cursor="pointer"
            color={currentColors.text}
            _hover={{
              bg: currentColors.border,
              color: currentColors.cardBg,
              fontWeight: 'bold',
            }}
            onClick={() => {
              onSortAll();
              setIsMenuOpen(false);
            }}
          >
            All
          </Text>

          <Box
            position="relative"
            px={4}
            py={2}
            cursor="pointer"
            color={currentColors.text}
            onMouseEnter={() => {
              setIsPriceSubmenuOpen(true);
            }}
            onMouseLeave={() => {
              setIsPriceSubmenuOpen(false);
            }}
            _hover={{
              bg: currentColors.border,
              color: currentColors.cardBg,
              fontWeight: 'bold',
            }}
          >
            By Price
            {isPriceSubmenuOpen && (
              <Box
                position="absolute"
                top={0}
                right={0}
                ml={2}
                bg={currentColors.cardBg}
                borderRadius="md"
                boxShadow="0 4px 10px rgba(0,0,0,0.1)"
                width="160px"
                py={2}
                zIndex={20}
              >
                <Text
                  px={4}
                  py={2}
                  cursor="pointer"
                  color={currentColors.text}
                  _hover={{
                    bg: currentColors.border,
                    color: currentColors.cardBg,
                    fontWeight: 'bold',
                  }}
                  onClick={() => {
                    onSortByPriceAsc();
                    setIsMenuOpen(false);
                  }}
                >
                  Low to High
                </Text>
                <Text
                  px={4}
                  py={2}
                  cursor="pointer"
                  color={currentColors.text}
                  _hover={{
                    bg: currentColors.border,
                    color: currentColors.cardBg,
                    fontWeight: 'bold',
                  }}
                  onClick={() => {
                    onSortByPriceDesc();
                    setIsMenuOpen(false);
                  }}
                >
                  High to Low
                </Text>
              </Box>
            )}
          </Box>

          <Text
            px={4}
            py={2}
            cursor="pointer"
            color={currentColors.text}
            _hover={{
              bg: currentColors.border,
              color: currentColors.cardBg,
              fontWeight: 'bold',
            }}
            onClick={() => {
              onSortDiscounted();
              setIsMenuOpen(false);
            }}
          >
            Sale
          </Text>
        </Box>
      )}
    </Box>
  );
};
