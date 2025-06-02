import { useEffect, useState } from 'react';
import { Input } from '@chakra-ui/react';
import { searchProductsByName } from '@/api/products';
import {
  type IProductProjection,
  type IProductWithSortFields,
} from '@/api/products';

function mapProjectionToSortFields(
  products: IProductProjection[]
): IProductWithSortFields[] {
  return products.map((product) => {
    const masterVariant = product.masterVariant;

    if (!masterVariant.price) {
      throw new Error(`Product ${product.id} is missing price`);
    }

    const priceNumber = masterVariant.price.value.centAmount;

    return {
      ...product,
      price: priceNumber,
      discountAmount: masterVariant.discountAmount ?? 0,
      type: 'default',
      masterVariant,
      variants: product.variants,
    };
  });
}

interface ProductSearchProps {
  products: IProductWithSortFields[];
  onResults: (results: IProductWithSortFields[]) => void;
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
          const mappedResults = mapProjectionToSortFields(results);
          onResults(mappedResults);
          onError(null);
          onLoading(false);
        } else {
          onResults(products);
          onError(null);
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
