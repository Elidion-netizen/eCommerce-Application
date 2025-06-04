import { Box, Button, Text } from '@chakra-ui/react';
import { useRef, useState } from 'react';

interface SortMenuProps {
  currentColors: { [key: string]: string };
  onSortAll: () => void;
  onSortByPriceAsc: () => void;
  onSortByPriceDesc: () => void;
  onSortDiscounted: () => void;
  onSortByNameAsc: () => void;
  onSortByNameDesc: () => void;
  sortLabel?: string;
}

export const SortMenu = ({
  currentColors,
  onSortAll,
  onSortByPriceAsc,
  onSortByPriceDesc,
  onSortDiscounted,
  onSortByNameAsc,
  onSortByNameDesc,
  sortLabel = 'Sort',
}: SortMenuProps): React.JSX.Element => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPriceSubmenuOpen, setIsPriceSubmenuOpen] = useState(false);
  const [isNameSubmenuOpen, setIsNameSubmenuOpen] = useState(false);

  const menuReference = useRef<HTMLDivElement>(null);

  return (
    <Box position="relative" ref={menuReference}>
      <Button
        bg="#D4A373"
        color="#5C3D2E"
        _hover={{ bg: '#BC8A5F', color: '#5C3D2E' }}
        onClick={() => {
          setIsMenuOpen(!isMenuOpen);
          setIsPriceSubmenuOpen(false);
          setIsNameSubmenuOpen(false);
        }}
        minW="120px"
        fontWeight={800}
        boxShadow="md"
        borderRadius="md"
      >
        {sortLabel}
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
              setIsNameSubmenuOpen(false);
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

          <Box
            position="relative"
            px={4}
            py={2}
            cursor="pointer"
            color={currentColors.text}
            onMouseEnter={() => {
              setIsNameSubmenuOpen(true);
              setIsPriceSubmenuOpen(false);
            }}
            onMouseLeave={() => {
              setIsNameSubmenuOpen(false);
            }}
            _hover={{
              bg: currentColors.border,
              color: currentColors.cardBg,
              fontWeight: 'bold',
            }}
          >
            By Name
            {isNameSubmenuOpen && (
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
                    onSortByNameAsc();
                    setIsMenuOpen(false);
                  }}
                >
                  A → Z
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
                    onSortByNameDesc();
                    setIsMenuOpen(false);
                  }}
                >
                  Z → A
                </Text>
              </Box>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
};
