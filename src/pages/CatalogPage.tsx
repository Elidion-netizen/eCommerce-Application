import { Box, Heading, Container, Flex, Button, Text } from '@chakra-ui/react';
import { useColorMode } from '../components/ui/color-mode';
import { useEffect, useState, useRef } from 'react';
import {
  productService,
  type IProductWithSortFields,
  enrichProductsForSorting,
} from '../api/products';
import { ProductGrid } from '../components/ui/product-grid';
import { colors } from '../components/ui/colors';
import { PageLoader } from '../components/ui/page-loader';

const CatalogPage = (): React.JSX.Element => {
  const { colorMode } = useColorMode();

  const [allProducts, setAllProducts] = useState<IProductWithSortFields[]>([]);

  const [products, setProducts] = useState<IProductWithSortFields[]>([]);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isProductsLoading, setIsProductsLoading] = useState(true);
  const [error, setError] = useState<string | undefined>();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuReference = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (
        menuReference.current &&
        !menuReference.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return (): void => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const loadProducts = async (): Promise<void> => {
      try {
        setIsPageLoading(true);
        setIsProductsLoading(true);
        setError(undefined);

        const data = await productService.getProducts(10);
        const enriched = enrichProductsForSorting(data);

        setAllProducts(enriched);
        setProducts(enriched);
      } catch (error) {
        console.error('Failed to load products:', error);
        setError('Failed to load products. Please try again later.');
      } finally {
        setIsPageLoading(false);
        setIsProductsLoading(false);
      }
    };
    void loadProducts();
  }, []);

  const currentColors = colors[colorMode];

  const handleFilter = (filter: 'all' | 'price' | 'discounted'): void => {
    setIsMenuOpen(false);
    setIsProductsLoading(true);
    setError(undefined);

    try {
      switch (filter) {
        case 'all': {
          setProducts(allProducts);
          break;
        }
        case 'price': {
          const sorted = [...allProducts].sort((a, b) => a.price - b.price);
          setProducts(sorted);
          break;
        }
        case 'discounted': {
          const filtered = allProducts.filter((p) => p.discountAmount > 0);
          setProducts(filtered);
          break;
        }
        default: {
          break;
        }
      }
    } catch {
      setError('Failed to apply filter');
    } finally {
      setIsProductsLoading(false);
    }
  };

  return (
    <>
      <PageLoader isLoading={isPageLoading} />
      <Box bg={currentColors.bg} minH="100vh" p={4}>
        <Container maxW="container.xl" py={12}>
          <Box px={{ base: 4, md: 8 }}>
            <Flex
              justify="space-between"
              align="center"
              mb={12}
              direction={{ base: 'column', md: 'row' }}
              gap={4}
            >
              <Heading
                as="h2"
                size={{ base: 'xl', md: '2xl', lg: '3xl' }}
                textAlign={{ base: 'center', md: 'left' }}
                lineHeight="shorter"
                color={currentColors.text}
                fontWeight="medium"
                letterSpacing="tight"
                cursor="default"
              >
                CATALOG
              </Heading>

              <Box position="relative" ref={menuReference}>
                <Button
                  bg="#D4A373"
                  color="#5C3D2E"
                  _hover={{ bg: '#BC8A5F', color: '#5C3D2E' }}
                  onClick={() => {
                    setIsMenuOpen(!isMenuOpen);
                  }}
                  minW="120px"
                  textAlign="center"
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
                    width="100%"
                    py={2}
                  >
                    {['all', 'price', 'discounted'].map((filterType) => (
                      <Text
                        key={filterType}
                        px={4}
                        py={2}
                        cursor="pointer"
                        color={currentColors.text}
                        _hover={{
                          bg: currentColors.border,
                          color: currentColors.cardBg,
                          fontWeight: 'bold',
                        }}
                        textTransform="capitalize"
                        onClick={() => {
                          handleFilter(
                            filterType as 'all' | 'price' | 'discounted'
                          );
                        }}
                      >
                        {filterType === 'all'
                          ? 'All'
                          : filterType === 'price'
                            ? 'By Price'
                            : 'Sale'}
                      </Text>
                    ))}
                  </Box>
                )}
              </Box>
            </Flex>

            <ProductGrid
              products={products}
              isLoading={isProductsLoading}
              error={error}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default CatalogPage;
