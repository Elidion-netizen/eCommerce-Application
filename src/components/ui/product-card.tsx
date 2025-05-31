import { Box, Badge, Button, Card, Image, Text, Icon } from '@chakra-ui/react';
import { useColorMode } from './color-mode';
import { useState } from 'react';
import type { IProductProjection } from '../../api/products';
import { productUtilities } from '../../api/products';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import { colors } from './colors';

interface ProductCardProps {
  product: IProductProjection;
  onAddToCart?: () => void;
}

export const ProductCard = ({
  product,
  onAddToCart,
}: ProductCardProps): React.JSX.Element => {
  const { colorMode } = useColorMode();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { masterVariant } = product;
  const images = masterVariant.images || [];
  const price = productUtilities.getMainPrice(masterVariant);
  const discountedPrice = price?.discounted;
  const hasDiscount = !!discountedPrice;
  const discountPercentage = hasDiscount
    ? productUtilities.getDiscountPercentage(price)
    : undefined;

  const handleNextImage = (): void => {
    setCurrentImageIndex((previous) => (previous + 1) % images.length);
  };

  const handlePreviousImage = (): void => {
    setCurrentImageIndex(
      (previous) => (previous - 1 + images.length) % images.length
    );
  };

  const currentColors = colors[colorMode];

  return (
    <Card.Root
      w="300px"
      h="450px"
      overflow="hidden"
      bg={currentColors.bg}
      borderWidth="1px"
      borderColor={currentColors.border}
      transition="all 0.3s ease"
      _hover={{
        transform: 'translateY(-5px)',
        shadow: 'lg',
      }}
      boxShadow="md"
      borderRadius="2xl"
      display="flex"
      flexDirection="column"
      cursor="pointer"
    >
      <Box position="relative" flex="0 0 auto">
        <Image
          src={images[currentImageIndex]?.url || '/placeholder-product.jpg'}
          alt={product.name['en-US'] || 'Product image'}
          objectFit="cover"
          w="100%"
          h="250px"
        />

        {images.length > 1 && (
          <>
            <Icon
              aria-label="Previous image"
              position="absolute"
              left="2"
              top="50%"
              transform="translateY(-50%)"
              onClick={handlePreviousImage}
              colorScheme="whiteAlpha"
              size="sm"
            >
              <FaChevronLeft />
            </Icon>
            <Icon
              aria-label="Next image"
              position="absolute"
              right="2"
              top="50%"
              transform="translateY(-50%)"
              onClick={handleNextImage}
              colorScheme="whiteAlpha"
              size="sm"
            >
              <FaChevronRight />
            </Icon>
          </>
        )}

        {discountPercentage && (
          <Badge
            position="absolute"
            bottom="2"
            left="2"
            colorScheme="red"
            borderRadius="full"
            px="2"
            py="1"
            fontSize="sm"
          >
            -{discountPercentage}%
          </Badge>
        )}
      </Box>

      <Box p="4" display="flex" flexDirection="column" flex="1">
        <Text
          fontWeight="semibold"
          fontSize="xl"
          color={currentColors.text}
          mb="1"
          lineClamp="1"
          overflow="hidden"
          textOverflow="ellipsis"
        >
          {product.name['en-US']}
        </Text>

        <Text
          color="gray.500"
          fontSize="sm"
          mb="3"
          flex="1"
          lineClamp="2"
          overflow="hidden"
          textOverflow="ellipsis"
        >
          {product.description?.['en-US'] || 'No description available'}
        </Text>

        <Box mb="4">
          {hasDiscount && (
            <Text
              as="span"
              textDecoration="line-through"
              color="gray.500"
              fontSize="md"
              mr="2"
            >
              €{productUtilities.formatPrice(price)}
            </Text>
          )}
          <Text
            as="span"
            fontSize={hasDiscount ? 'xl' : 'lg'}
            fontWeight="bold"
            color={hasDiscount ? 'red.500' : currentColors.primary}
          >
            €
            {price &&
              productUtilities.formatPrice(
                discountedPrice ? { value: discountedPrice.value } : price
              )}
          </Text>
        </Box>

        <Button
          variant="solid"
          onClick={onAddToCart}
          w="full"
          mt="auto"
          _hover={{
            transform: 'translateY(-2px)',
            boxShadow: 'md',
          }}
        >
          Add to Cart
        </Button>
      </Box>
    </Card.Root>
  );
};
