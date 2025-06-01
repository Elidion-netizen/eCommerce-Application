import { Box, Badge, Button, Card, Image, Text, Icon } from '@chakra-ui/react';
import { useColorMode } from './color-mode';
import { useState } from 'react';
import type { IProductProjection } from '../../api/products';
import { productUtilities } from '../../api/products';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { colors } from './colors';
import { useNavigate } from 'react-router';
import { ImageModal } from './image-modal';

interface ProductCardProps {
  product: IProductProjection;
  onAddToCart?: () => void;
  variant?: 'default' | 'detailed';
  showNavigationArrows?: boolean;
}

export const ProductCard = ({
  product,
  onAddToCart,
  variant = 'default',
  showNavigationArrows = false,
}: ProductCardProps): React.JSX.Element => {
  const { colorMode } = useColorMode();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
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

  const handleCardClick = (event_: React.MouseEvent): void => {
    if ((event_.target as HTMLElement).closest('button')) {
      return;
    }
    void navigate(`/product/${product.id}`);
  };

  const handleImageClick = (): void => {
    if (variant === 'detailed') {
      setIsImageModalOpen(true);
    }
  };

  const currentColors = colors[colorMode];

  const isDetailed = variant === 'detailed';

  return (
    <>
      <Card.Root
        w={isDetailed ? '900px' : '300px'}
        h={isDetailed ? 'auto' : '450px'}
        overflow="hidden"
        bg={currentColors.bg}
        borderWidth="1px"
        borderColor={currentColors.border}
        transition="all 0.3s ease"
        _hover={{
          transform: isDetailed ? 'none' : 'translateY(-5px)',
          shadow: 'lg',
        }}
        boxShadow="md"
        borderRadius="2xl"
        display="flex"
        flexDirection={isDetailed ? 'row' : 'column'}
        cursor={isDetailed ? 'default' : 'pointer'}
        onClick={isDetailed ? undefined : handleCardClick}
      >
        <Box position="relative" flex={isDetailed ? '1' : '0 0 auto'}>
          <Image
            src={images[currentImageIndex]?.url || '/placeholder-product.jpg'}
            alt={product.name['en-US'] || 'Product image'}
            objectFit="cover"
            w="100%"
            h={isDetailed ? '400px' : '250px'}
            cursor={isDetailed ? 'zoom-in' : 'pointer'}
            onClick={handleImageClick}
          />

          {images.length > 1 && showNavigationArrows && (
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
                cursor="pointer"
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
                cursor="pointer"
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
              color="red"
              borderRadius="full"
              px="2"
              py="1"
              fontSize="sm"
            >
              -{discountPercentage}%
            </Badge>
          )}
        </Box>

        <Box
          p="4"
          display="flex"
          flexDirection="column"
          flex={isDetailed ? '1' : '1'}
        >
          <Text
            fontWeight="semibold"
            fontSize={isDetailed ? '2xl' : 'xl'}
            color={currentColors.text}
            mb="1"
            lineClamp={isDetailed ? undefined : '1'}
            overflow="hidden"
            textOverflow="ellipsis"
          >
            {product.name['en-US']}
          </Text>

          <Text
            color="gray.500"
            fontSize={isDetailed ? 'md' : 'sm'}
            mb="3"
            flex="1"
            lineClamp={isDetailed ? undefined : '2'}
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
                fontSize={isDetailed ? 'lg' : 'md'}
                mr="2"
              >
                €{productUtilities.formatPrice(price)}
              </Text>
            )}
            <Text
              as="span"
              fontSize={
                hasDiscount
                  ? isDetailed
                    ? '2xl'
                    : 'xl'
                  : isDetailed
                    ? 'xl'
                    : 'lg'
              }
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
            size={isDetailed ? 'lg' : 'md'}
            _hover={{
              transform: 'translateY(-2px)',
              boxShadow: 'md',
            }}
          >
            Add to Cart
          </Button>
        </Box>
      </Card.Root>

      <ImageModal
        isOpen={isImageModalOpen}
        onClose={() => {
          setIsImageModalOpen(false);
        }}
        images={images}
        initialImageIndex={currentImageIndex}
      />
    </>
  );
};
