import { Box, Heading, Alert, SimpleGrid } from '@chakra-ui/react';
import { ProductCard } from './product-card';
import { ProductCardSkeleton } from './product-card-skeleton';
import type { IProductProjection } from '../../api/products';
import { useColorMode } from './color-mode';
import { colors } from './colors';
import { type OrderItem } from '@/pages/CartPage';

interface ProductGridProps {
  products: IProductProjection[];
  isLoading?: boolean;
  error?: string | undefined;
  title?: string;
  addToOrder: (item: OrderItem) => void;
}

export const ProductGrid = ({
  products,
  isLoading = false,
  error = undefined,
  title,
  addToOrder,
}: ProductGridProps): React.JSX.Element => {
  const { colorMode } = useColorMode();
  const currentColors = colors[colorMode];

  return (
    <Box>
      {title && (
        <Heading
          as="h2"
          size="xl"
          mb={8}
          color={currentColors.text}
          textAlign="center"
        >
          {title}
        </Heading>
      )}

      {error && (
        <Alert.Root status="error" mb={4} borderRadius="md">
          <Alert.Indicator />
          {error}
        </Alert.Root>
      )}

      <Box minH="330px">
        <SimpleGrid
          transition="all 0.3s ease"
          columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
          gap={8}
          justifyContent="center"
          justifyItems="center"
          auto-fit
        >
          {isLoading
            ? Array.from({ length: 8 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))
            : products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={() => {
                    addToOrder({
                      id: Date.now().toString(),
                      name: product.name['en-US'],
                      price: product.price ?? 0,
                      quantity: 1,
                      imageUrl: '',
                    });
                  }}
                />
              ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
};
