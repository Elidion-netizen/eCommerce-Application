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
