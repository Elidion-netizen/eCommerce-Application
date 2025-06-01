import { Box, Text, Button } from '@chakra-ui/react';
import React from 'react';
import { CiFilter } from 'react-icons/ci';

interface ProductFilterProps {
  isOpen: boolean;
  onToggle: () => void;
  selectedCategories: string[];
  setSelectedCategories: (value: string[]) => void;
  selectedFlavors: string[];
  setSelectedFlavors: (value: string[]) => void;
  selectedPriceRange: string | null;
  setSelectedPriceRange: (value: string) => void;
  onlyDiscounted: boolean;
  setOnlyDiscounted: (value: boolean) => void;
  onApply: () => void;
  categories: string[];
  flavors: string[];
  priceRanges: string[];
  currentColors: { [key: string]: string };
}

function toggleSelection(
  value: string,
  selected: string[],
  setSelected: (v: string[]) => void
): void {
  if (selected.includes(value)) {
    setSelected(selected.filter((item) => item !== value));
  } else {
    setSelected([...selected, value]);
  }
}

export const ProductFilter = ({
  isOpen,
  onToggle,
  selectedCategories,
  setSelectedCategories,
  selectedFlavors,
  setSelectedFlavors,
  selectedPriceRange,
  setSelectedPriceRange,
  onlyDiscounted,
  setOnlyDiscounted,
  onApply,
  categories,
  flavors,
  priceRanges,
  currentColors,
}: ProductFilterProps): React.JSX.Element => {
  return (
    <div style={{ position: 'relative' }}>
      <div
        style={{
          display: 'inline-block',
          padding: '4px 10px',
          cursor: 'pointer',
        }}
        onClick={onToggle}
        role="button"
      >
        <CiFilter size={32} />
      </div>

      {isOpen && (
        <Box
          position="absolute"
          top="calc(100% + 8px)"
          right={0}
          bg={currentColors.cardBg}
          p={4}
          borderRadius="md"
          boxShadow="md"
          zIndex={20}
          minW="250px"
        >
          <Text fontWeight="bold" mb={2}>
            Product Type
          </Text>
          {categories.map((cat) => (
            <Box key={cat}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat.toLowerCase())}
                  onChange={() => {
                    toggleSelection(
                      cat.toLowerCase(),
                      selectedCategories,
                      setSelectedCategories
                    );
                  }}
                  style={{ marginRight: '8px' }}
                />
                {cat}
              </label>
            </Box>
          ))}

          <Text fontWeight="bold" mt={4} mb={2}>
            Flavor
          </Text>
          {flavors.map((flavor) => (
            <Box key={flavor}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedFlavors.includes(flavor.toLowerCase())}
                  onChange={() => {
                    toggleSelection(
                      flavor.toLowerCase(),
                      selectedFlavors,
                      setSelectedFlavors
                    );
                  }}
                  style={{ marginRight: '8px' }}
                />
                {flavor}
              </label>
            </Box>
          ))}

          <Text fontWeight="bold" mt={4} mb={2}>
            Price Range
          </Text>
          {priceRanges.map((range) => (
            <Box key={range}>
              <label>
                <input
                  type="radio"
                  name="priceRange"
                  checked={selectedPriceRange === range}
                  onChange={() => {
                    setSelectedPriceRange(range);
                  }}
                  style={{ marginRight: '8px' }}
                />
                {range === '30+' ? '30+ €' : `${range} €`}
              </label>
            </Box>
          ))}

          <Text fontWeight="bold" mt={4} mb={2}>
            Discount
          </Text>
          <Box>
            <label>
              <input
                type="checkbox"
                checked={onlyDiscounted}
                onChange={() => {
                  setOnlyDiscounted(!onlyDiscounted);
                }}
                style={{ marginRight: '8px' }}
              />
              Only Discounted
            </label>
          </Box>

          <Button
            size="sm"
            mt={4}
            onClick={onApply}
            bg="#D4A373"
            color="#5C3D2E"
            _hover={{ bg: '#BC8A5F' }}
            w="full"
          >
            Apply Filters
          </Button>
        </Box>
      )}
    </div>
  );
};
