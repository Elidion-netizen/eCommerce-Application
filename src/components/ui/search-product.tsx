import { useEffect, useState } from 'react';
import { Input } from '@chakra-ui/react';
import { searchProductsByName } from '@/api/products';

interface Product {
  id: string;
  name: string;
}

interface ProductSearchProps {
  products: Product[];
  onResults: (results: Product[]) => void;
  onLoading: (isLoading: boolean) => void;
  onError: (error: string | null) => void;
}

export const ProductSearch = ({
  products,
  onResults,
  onLoading,
  onError,
}: ProductSearchProps): React.JSX.Element => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      try {
        if (query.trim()) {
          onLoading(true);
          const results = searchProductsByName(products, query);
          onResults(results);
          onError('');
          onLoading(false);
        } else {
          onResults(products);
          onError('');
          onLoading(false);
        }
      } catch {
        onError('Ошибка при поиске');
      } finally {
        onLoading(false);
      }
    }, 300);

    return (): void => {
      clearTimeout(handler);
    };
  });

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
