import { ctpClientWithAnonymousAuth } from '../commercetools/BuildClient';
import type { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

export interface IProductImage {
  url: string;
  label?: string;
}

export interface IProductPrice {
  value: {
    currencyCode: string;
    centAmount: number;
  };
  discounted?: {
    value: {
      currencyCode: string;
      centAmount: number;
    };
  };
}

export interface IProductFilter {
  categories?: string[];
  flavors?: string[];
  priceRange?: string | null;
  onlyDiscounted?: boolean;
}

export interface IProductWithSortFields extends IProductProjection {
  price: number;
  discountAmount: number;
  type: string;
}

export function enrichProductsForSorting(
  products: IProductProjection[]
): IProductWithSortFields[] {
  return products.map((product) => {
    const priceObject: IProductPrice | undefined =
      product.masterVariant.prices?.[0];
    const price = priceObject?.value.centAmount ?? 0;

    const discountAmount = priceObject?.discounted
      ? price - priceObject.discounted.value.centAmount
      : 0;

    const type = product.key || product.name['en'] || '';

    return {
      ...product,
      price,
      discountAmount,
      type,
    };
  });
}

export interface IProductVariant {
  id: number;
  sku?: string;
  images?: IProductImage[];
  prices?: IProductPrice[];
}

export interface IProductProjection {
  id: string;
  key?: string;
  name: {
    [key: string]: string;
  };
  description?: {
    [key: string]: string;
  };
  masterVariant: IProductVariant;
  variants: IProductVariant[];
}

const createProductApi = (): ByProjectKeyRequestBuilder => {
  const apiRoot = createApiBuilderFromCtpClient(ctpClientWithAnonymousAuth);
  return apiRoot.withProjectKey({
    projectKey: import.meta.env.VITE_CTP_PROJECT_KEY,
  });
};
export const productService = {
  async getProducts(limit = 20): Promise<IProductProjection[]> {
    try {
      const { body } = await createProductApi()
        .productProjections()
        .get({
          queryArgs: {
            limit,
            expand: ['masterVariant.prices[*].discounted'],
            staged: true,
          },
        })
        .execute();

      return body.results;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error fetching products:', error.message);
      } else {
        console.error('Error fetching products:', error);
      }
      throw new Error('Failed to load products');
    }
  },
  async getProductById(id: string): Promise<IProductProjection> {
    try {
      const { body } = await createProductApi()
        .productProjections()
        .withId({ ID: id })
        .get({
          queryArgs: {
            expand: ['masterVariant.prices[*].discounted'],
            staged: true,
          },
        })
        .execute();

      return body;
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error);
      throw new Error(`Failed to load product ${id}`);
    }
  },
};

export const productUtilities = {
  getMainImage(variant: IProductVariant): string | undefined {
    return variant.images?.[0]?.url;
  },

  getMainPrice(variant: IProductVariant): IProductPrice | undefined {
    return variant.prices?.[0];
  },

  formatPrice(price?: IProductPrice): string {
    if (!price) return 'N/A';
    return (price.value.centAmount / 100).toFixed(2);
  },

  getDiscountPercentage(price: IProductPrice): number | undefined {
    if (!price.discounted) return undefined;
    const regular = price.value.centAmount;
    const discounted = price.discounted.value.centAmount;
    return Math.round(((regular - discounted) / regular) * 100);
  },
};

export function filterProducts(
  products: IProductWithSortFields[],
  filters: IProductFilter
): IProductWithSortFields[] {
  const {
    categories = [],
    flavors = [],
    priceRange = undefined,
    onlyDiscounted = false,
  } = filters;

  const lowerCategories = categories.map((c) => c.toLowerCase().trim());
  const lowerFlavors = flavors.map((f) => f.toLowerCase().trim());

  return products.filter((p) => {
    const localeKey = Object.keys(p.name)[0];
    const nameText = localeKey
      ? (p.name[localeKey] || '').toLowerCase().trim()
      : '';

    const matchesCategory =
      lowerCategories.length === 0 ||
      lowerCategories.some((cat) => nameText.includes(cat));

    const matchesFlavor =
      lowerFlavors.length === 0 ||
      lowerFlavors.some((flav) => nameText.includes(flav));

    const price = p.price || 0;
    let matchesPrice = true;

    if (priceRange) {
      const [min, max] =
        priceRange === '30+'
          ? [30, Infinity]
          : priceRange.split('-').map(Number);
      matchesPrice = price >= min * 100 && price < max * 100;
    }

    const matchesDiscount = !onlyDiscounted || p.discountAmount > 0;

    return matchesCategory && matchesFlavor && matchesPrice && matchesDiscount;
  });
}

export function filterProductsByCategory(
  products: IProductWithSortFields[],
  categories: string[]
): IProductWithSortFields[] {
  if (categories.length === 0) return products;

  const lowerCategories = categories.map((c) => c.toLowerCase().trim());
  return products.filter((product) => {
    const localeKey = Object.keys(product.name)[0];
    const nameText = localeKey
      ? (product.name[localeKey] || '').toLowerCase().trim()
      : '';
    return lowerCategories.some((cat) => nameText.includes(cat));
  });
}

export function searchProductsByName(
  products: IProductProjection[],
  searchQuery: string
): IProductProjection[] {
  if (!searchQuery || !searchQuery.trim()) return products;

  const normalizedQuery = searchQuery.toLowerCase().trim();

  return products.filter((product) => {
    return Object.values(product.name).some((localizedName) =>
      localizedName.toLowerCase().includes(normalizedQuery)
    );
  });
}
