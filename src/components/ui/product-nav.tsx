import React from 'react';
import { Flex, Button } from '@chakra-ui/react';

interface CategoryNavigationProps {
  categories: string[];
  selectedCategories: string[];
  onCategoryClick: (category: string) => void;
  onAllCategoriesClick: () => void;
  currentColors: {
    primary: string;
    bg: string;
  };
}

export const CategoryNavigation: React.FC<CategoryNavigationProps> = ({
  categories,
  selectedCategories,
  onCategoryClick,
  onAllCategoriesClick,
  currentColors,
}) => {
  return (
    <Flex
      mb={8}
      overflowX="auto"
      gap={3}
      px={2}
      css={{
        '&::-webkit-scrollbar': {
          height: '6px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: currentColors.primary,
          borderRadius: '24px',
        },
        '&::-webkit-scrollbar-track': {
          background: currentColors.bg,
        },
      }}
    >
      <Button
        variant={selectedCategories.length === 0 ? 'solid' : 'outline'}
        colorScheme="blue"
        onClick={onAllCategoriesClick}
        whiteSpace="nowrap"
      >
        All
      </Button>
      {categories.map((category) => {
        const isSelected = selectedCategories.includes(category);
        return (
          <Button
            key={category}
            variant={isSelected ? 'solid' : 'outline'}
            colorScheme="blue"
            onClick={() => {
              onCategoryClick(category);
            }}
            whiteSpace="nowrap"
            textTransform="capitalize"
          >
            {category}
          </Button>
        );
      })}
    </Flex>
  );
};
