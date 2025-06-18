import {
  Box,
  Flex,
  Heading,
  Text,
  Link,
  Container,
  Image,
} from '@chakra-ui/react';
import { useColorMode } from '../components/ui/color-mode';
import { Link as RouterLink } from 'react-router';
import { useEffect, useState } from 'react';
import { productService, type IProductProjection } from '../api/products';
import { ProductGrid } from '../components/ui/product-grid';
import { colors } from '../components/ui/colors';
import { PageLoader } from '../components/ui/page-loader';

const MainPage = (): React.JSX.Element => {
  const { colorMode } = useColorMode();
  const [products, setProducts] = useState<IProductProjection[]>([]);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isProductsLoading, setIsProductsLoading] = useState(true);
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    const loadProducts = async (): Promise<void> => {
      try {
        setIsPageLoading(true);
        setIsProductsLoading(true);
        setError(undefined);
        setIsPageLoading(false);

        const data = await productService.getProducts(10);
        setProducts(data);
      } catch (error) {
        console.error('Failed to load products:', error);
        setError('Failed to load products. Please try again later.');
      } finally {
        setIsProductsLoading(false);
      }
    };
    void loadProducts();
  }, []);

  const currentColors = colors[colorMode];

  return (
    <>
      <PageLoader isLoading={isPageLoading} />
      <Box bgGradient={currentColors.gradient}>
        <Container maxW="container.xl" py={12}>
          <Flex
            direction={{ base: 'column', md: 'row' }}
            align="center"
            justify="space-between"
            mb={12}
            px={{ base: 4, md: 8 }}
            gap={8}
            minH="calc(90vh - 100px)"
          >
            <Box
              zIndex={2}
              maxW={{ base: '100%', md: '45%' }}
              textAlign={{ base: 'center', md: 'left' }}
              ml={{ base: 0, md: 0 }}
            >
              <Text
                fontSize={{ base: 'xl', md: '2xl' }}
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
                fontSize={{ base: 'md', md: 'xl' }}
                mb={4}
                color={currentColors.text}
                maxW={{ md: '100%' }}
                lineHeight="tall"
              >
                Step into a world of artisanal baking where every pastry tells a
                story of passion and tradition.
              </Text>

              <Text
                fontSize={{ base: 'md', md: 'xl' }}
                mb={8}
                color={currentColors.text}
                maxW={{ md: '100%' }}
                lineHeight="tall"
              >
                From classic butter croissants to innovative seasonal creations,
                each bite brings you closer to the authentic taste of French
                patisserie.
              </Text>

              <Flex gap={4} justify={{ base: 'center', md: 'flex-start' }}>
                <Link
                  asChild
                  bg={currentColors.button}
                  color="white"
                  px={11}
                  height={14}
                  borderRadius="13px"
                  _hover={{
                    bg: currentColors.buttonHover,
                    transform: 'translateY(-2px)',
                    boxShadow: 'lg',
                  }}
                  transition="all 0.2s"
                  fontSize={{ base: 'md', md: 'xl' }}
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
                  fontSize={{ base: 'md', md: 'xl' }}
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

            <Box
              display="block"
              position="relative"
              mr={0}
              order={{ base: 2, md: 1 }}
            >
              <Image
                src="https://i.postimg.cc/505ZkDB1/CrouSale.png"
                alt="Sale"
                w="500px"
                h="auto"
                borderRadius={15}
                objectFit="contain"
                transition="all 0.3s ease"
              />
            </Box>
          </Flex>

          <Box px={{ base: 4, md: 8 }}>
            <Heading
              as="h2"
              size={{ base: 'xl', md: '2xl', lg: '3xl' }}
              textAlign={{ base: 'center' }}
              lineHeight="shorter"
              mb={12}
              color={currentColors.text}
              fontWeight="medium"
              letterSpacing="tight"
              cursor={'default'}
            >
              FEATURED PRODUCTS
            </Heading>
            <ProductGrid
              products={products}
              isLoading={isProductsLoading}
              error={error}
              addToOrder={() => {}}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default MainPage;
