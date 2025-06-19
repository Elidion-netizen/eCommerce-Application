import { useEffect, useState } from 'react';
import { Input } from '@chakra-ui/react';
import { searchProductsByName } from '@/api/products';
import {
  type IProductProjection,
  type IProductWithSortFields,
} from '@/api/products';

interface ProductSearchProps {
  products: IProductWithSortFields[];
  onResults: (results: IProductProjection[]) => void;
  onLoading: (isLoading: boolean) => void;
  onError: (error: string | null) => void;
}

const fetchData = async (
  query: string,
  products: IProductProjection[],
  onResults: (results: IProductProjection[]) => void,
  onError: (error: string | null) => void,
  onLoading: (isLoading: boolean) => void
): Promise<void> => {
  try {
    onLoading(true);
    if (query.trim()) {
      const results = await searchProductsByName(query);
      onResults(results);
      onError(null);
    } else {
      onResults(products);
      onError(null);
    }
  } catch {
    onError('Ошибка при поиске');
  } finally {
    onLoading(false);
  }
};

export const ProductSearch = ({
  products,
  onResults,
  onLoading,
  onError,
}: ProductSearchProps): React.JSX.Element => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      void fetchData(query, products, onResults, onError, onLoading);
    }, 300);

    return (): void => {
      clearTimeout(handler);
    };
  }, [query, products, onResults, onError, onLoading]);

  return (
    <>
      <Input
        placeholder="Search products..."
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
        }}
        mb={4}
      />
    </>
  );
};
