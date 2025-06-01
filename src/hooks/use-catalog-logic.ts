import { useState, useEffect, useRef } from 'react';
import { type RefObject } from 'react';
import {
  productService,
  type IProductWithSortFields,
  enrichProductsForSorting,
} from '../api/products';
import { filterProducts } from '../api/products';

export const categories = ['Cake', 'Eclair', 'Croissant'];
export const flavors = ['Chocolate', 'Vanilla', 'Strawberry', 'Lemon'];
export const priceRanges = ['0-3', '3-6', '6-9', '9+'];

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

interface UseCatalogLogicResult {
  allProducts: IProductWithSortFields[];
  products: IProductWithSortFields[];
  isPageLoading: boolean;
  isProductsLoading: boolean;
  error: string | null;
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isFilterOpen: boolean;
  setIsFilterOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedCategories: string[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
  selectedFlavors: string[];
  setSelectedFlavors: React.Dispatch<React.SetStateAction<string[]>>;
  selectedPriceRange: string | null;
  setSelectedPriceRange: React.Dispatch<React.SetStateAction<string | null>>;
  onlyDiscounted: boolean;
  setOnlyDiscounted: React.Dispatch<React.SetStateAction<boolean>>;
  isPriceSubmenuOpen: boolean;
  setIsPriceSubmenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  menuReference: RefObject<HTMLDivElement>;
  toggleSelection: (
    value: string,
    selected: string[],
    setSelected: React.Dispatch<React.SetStateAction<string[]>>
  ) => void;
  applyFullFilter: () => void;
  handleMainFilter: (filter: 'all' | 'price' | 'discounted') => void;
  handlePriceFilter: (order: 'asc' | 'desc') => void;
  categories: string[];
  flavors: string[];
  priceRanges: string[];
}

export function useCatalogLogic(): UseCatalogLogicResult {
  const [allProducts, setAllProducts] = useState<IProductWithSortFields[]>([]);
  const [products, setProducts] = useState<IProductWithSortFields[]>([]);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isProductsLoading, setIsProductsLoading] = useState(true);
  const [error, setError] = useState<string | null>();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isPriceSubmenuOpen, setIsPriceSubmenuOpen] = useState(false);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedFlavors, setSelectedFlavors] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string | null>();
  const [onlyDiscounted, setOnlyDiscounted] = useState<boolean>(false);

  const menuReference = useRef<HTMLDivElement>(null);

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

  const applyFullFilter = (): void => {
    setIsFilterOpen(false);
    setIsProductsLoading(true);
    try {
      const filtered = filterProducts(allProducts, {
        categories: selectedCategories,
        flavors: selectedFlavors,
        priceRange: selectedPriceRange,
        onlyDiscounted,
      });
      setProducts(filtered);
    } catch {
      setError('Failed to apply filters');
    } finally {
      setIsProductsLoading(false);
    }
  };

  const handleMainFilter = (filter: 'all' | 'price' | 'discounted'): void => {
    if (filter === 'price') {
      setIsPriceSubmenuOpen(!isPriceSubmenuOpen);
      return;
    }
    setIsMenuOpen(false);
    setIsPriceSubmenuOpen(false);
    setIsProductsLoading(true);
    setError(undefined);

    try {
      switch (filter) {
        case 'all': {
          setProducts(allProducts);
          break;
        }
        case 'discounted': {
          const filtered = allProducts.filter((p) => p.discountAmount > 0);
          setProducts(filtered);
          break;
        }
      }
    } catch {
      setError('Failed to apply filter');
    } finally {
      setIsProductsLoading(false);
    }
  };

  const handlePriceFilter = (order: 'asc' | 'desc'): void => {
    setIsMenuOpen(false);
    setIsPriceSubmenuOpen(false);
    setIsProductsLoading(true);
    setError(undefined);

    try {
      const sorted = [...allProducts].sort((a, b) =>
        order === 'asc' ? a.price - b.price : b.price - a.price
      );
      setProducts(sorted);
    } catch {
      setError('Failed to apply price filter');
    } finally {
      setIsProductsLoading(false);
    }
  };

  return {
    allProducts,
    products,
    isPageLoading,
    isProductsLoading,
    error,
    isMenuOpen,
    setIsMenuOpen,
    isFilterOpen,
    setIsFilterOpen,
    selectedCategories,
    setSelectedCategories,
    selectedFlavors,
    setSelectedFlavors,
    selectedPriceRange,
    setSelectedPriceRange,
    onlyDiscounted,
    setOnlyDiscounted,
    isPriceSubmenuOpen,
    setIsPriceSubmenuOpen,
    menuReference,
    toggleSelection,
    applyFullFilter,
    handleMainFilter,
    handlePriceFilter,
    categories,
    flavors,
    priceRanges,
  };
}
