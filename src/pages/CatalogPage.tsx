import { useState } from 'react';
import { Box, Heading, Container, Flex, Spinner } from '@chakra-ui/react';
import { useColorMode } from '../components/ui/color-mode';
import { colors } from '../components/ui/colors';
import { PageLoader } from '../components/ui/page-loader';
import { ProductGrid } from '../components/ui/product-grid';
import { ProductFilter } from '@/components/ui/product-filter';
import { SortMenu } from '@/components/ui/sort-menu';
import { useCatalogLogic } from '../hooks/use-catalog-logic';
import { filterProductsByCategory } from '@/api/products';
import { CategoryNavigation } from '@/components/ui/product-nav';
import { ProductSearch } from '@/components/ui/search-product';

const manualCategories = ['Cake', 'Eclair', 'Croissant'];

const CatalogPage = (): React.JSX.Element => {
  const { colorMode } = useColorMode();
  const currentColors = colors[colorMode];

  const {
    products: allProducts,
    isPageLoading,
    isProductsLoading,
    error,
    isFilterOpen,
    setIsFilterOpen,
    selectedFlavors,
    setSelectedFlavors,
    selectedPriceRange,
    setSelectedPriceRange,
    setOnlyDiscounted,
    onlyDiscounted,
    menuReference,
    applyFullFilter,
    handleMainFilter,
    handlePriceFilter,
    handleNameSort,
    flavors,
    priceRanges,
  } = useCatalogLogic();

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<typeof allProducts>([]);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  const [sortLabel, setSortLabel] = useState<string>('Sort');

  const filteredProductsByCategory = filterProductsByCategory(
    allProducts,
    selectedCategories
  );

  const handleCategoryClick = (category: string): void => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];

    setSelectedCategories(updatedCategories);

    applyFullFilter();
  };

  const handleAllCategoriesClick = (): void => {
    setSelectedCategories([]);
    applyFullFilter();
  };

  return (
    <>
      <PageLoader isLoading={isPageLoading} />
      <Box bg={currentColors.bg} minH="100vh" p={4} overflowX="auto">
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
                color={currentColors.text}
                fontWeight="medium"
                letterSpacing="tight"
              >
                CATALOG
              </Heading>

              <Box position="relative" ref={menuReference}>
                <Flex>
                  <SortMenu
                    currentColors={currentColors}
                    sortLabel={sortLabel}
                    onSortAll={() => {
                      handleMainFilter('all');
                      setSortLabel('All');
                    }}
                    onSortByPriceAsc={() => {
                      handlePriceFilter('asc');
                      setSortLabel('Price ↑');
                    }}
                    onSortByPriceDesc={() => {
                      handlePriceFilter('desc');
                      setSortLabel('Price ↓');
                    }}
                    onSortByNameAsc={() => {
                      handleNameSort('asc');
                      setSortLabel('Name A–Z');
                    }}
                    onSortByNameDesc={() => {
                      handleNameSort('desc');
                      setSortLabel('Name Z–A');
                    }}
                  />
                  <ProductFilter
                    isOpen={isFilterOpen}
                    onToggle={() => {
                      setIsFilterOpen(!isFilterOpen);
                    }}
                    selectedCategories={selectedCategories}
                    setSelectedCategories={setSelectedCategories}
                    selectedFlavors={selectedFlavors}
                    setSelectedFlavors={setSelectedFlavors}
                    selectedPriceRange={selectedPriceRange}
                    setSelectedPriceRange={setSelectedPriceRange}
                    onlyDiscounted={onlyDiscounted}
                    setOnlyDiscounted={setOnlyDiscounted}
                    onApply={() => {
                      applyFullFilter();
                    }}
                    categories={manualCategories}
                    flavors={flavors}
                    priceRanges={priceRanges}
                    currentColors={currentColors}
                  />
                </Flex>
              </Box>
            </Flex>

            <ProductSearch
              products={filteredProductsByCategory}
              onResults={setSearchResults}
              onLoading={setIsSearchLoading}
              onError={setSearchError}
            />

            <CategoryNavigation
              categories={manualCategories}
              selectedCategories={selectedCategories}
              onCategoryClick={handleCategoryClick}
              onAllCategoriesClick={handleAllCategoriesClick}
              currentColors={currentColors}
            />

            {(isSearchLoading || isProductsLoading) && <Spinner my={6} />}

            {searchError && (
              <Box color="red.500" mb={4}>
                {searchError}
              </Box>
            )}

            <ProductGrid
              products={searchResults}
              isLoading={isSearchLoading || isProductsLoading}
              error={error ?? (searchError || undefined)}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default CatalogPage;
