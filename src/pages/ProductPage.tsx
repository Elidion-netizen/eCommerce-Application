import { Container, Text, Link } from '@chakra-ui/react';
import { Link as RouterLink, useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { productService, type IProductProjection } from '../api/products';
import { PageLoader } from '../components/ui/page-loader';
import { ProductCard } from '../components/ui/product-card';
import { addToCart } from '@/api/cart';

const ProductPage = (): React.JSX.Element => {
  const { productId } = useParams();
  const [product, setProduct] = useState<IProductProjection | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    const loadProduct = async (): Promise<void> => {
      if (!productId) return;

      try {
        setIsLoading(true);
        setError(undefined);
        const data = await productService.getProductById(productId);
        setProduct(data);
      } catch (error) {
        console.error('Failed to load product:', error);
        setError('Failed to load product. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    void loadProduct();
  }, [productId]);

  if (isLoading) {
    return <PageLoader isLoading={true} />;
  }

  if (error || !product) {
    return (
      <Container
        maxW="container.xl"
        py={8}
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Text>{error || 'Product not found'}</Text>
        <Link asChild px="2.5" color="orange.600">
          <RouterLink to="/"> Return </RouterLink>
        </Link>
      </Container>
    );
  }

  return (
    <Container
      maxW="container.xl"
      py={8}
      display="flex"
      justifyContent="center"
    >
      <ProductCard
        product={product}
        variant="detailed"
        showNavigationArrows={true}
        onAddToCart={() => {
          addToCart(product.id).catch((error: unknown) => {
            console.log(error);
          });
        }}
      />
    </Container>
  );
};

export default ProductPage;
