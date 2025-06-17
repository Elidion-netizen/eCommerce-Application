import { getToken } from '@/store/local-storage';

interface PagedResponse<T> {
  limit: number;
  offset: number;
  count: number;
  total: number | null;
  results: T[];
}

type Image = {
  url: string;
};

type Variant = {
  images?: Image[];
};

interface LineItem {
  id: string;
  name?: { 'en-US'?: string };
  price?: { value?: { centAmount?: number } };
  quantity: number;
  variant?: Variant;
}

interface Cart {
  id: string;
  key: string;
  version: number;
  createdAt: string;
  lastModifiedAt: string;
  lineItems: LineItem[];
}

export async function getMyCart(): Promise<Cart[]> {
  const apiUrl = import.meta.env.VITE_CTP_API_URL;
  const projectKey = import.meta.env.VITE_CTP_PROJECT_KEY;
  const accessToken = getToken();

  if (!accessToken) {
    throw new Error('No access token provided');
  }

  const url = `${apiUrl}/${projectKey}/me/carts`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Unauthorized: invalid or expired token');
    }
    throw new Error(
      `Failed to fetch carts: ${response.status.toString()} ${response.statusText}`
    );
  }

  const data = (await response.json()) as PagedResponse<Cart>;
  return data.results;
}

export async function clearCart(): Promise<Cart[]> {
  const apiUrl = import.meta.env.VITE_CTP_API_URL;
  const projectKey = import.meta.env.VITE_CTP_PROJECT_KEY;
  const accessToken = getToken();

  const myCart = await getMyCart();
  const idCart = myCart[0].id;
  const cartVersion = myCart[0].version;

  if (!accessToken || !idCart) {
    throw new Error('No access token provided');
  }

  const url = `${apiUrl}/${projectKey}/carts/${idCart}?version=${cartVersion.toString()}`;

  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Unauthorized: invalid or expired token');
    }
    throw new Error(
      `Failed to fetch carts: ${response.status.toString()} ${response.statusText}`
    );
  }

  const data = (await response.json()) as PagedResponse<Cart>;
  return data.results;
}

export async function getProducts(): Promise<Cart[]> {
  const apiUrl = import.meta.env.VITE_CTP_API_URL;
  const projectKey = import.meta.env.VITE_CTP_PROJECT_KEY;
  const accessToken = getToken();

  if (!accessToken) {
    throw new Error('No access token provided');
  }

  const url = `${apiUrl}/${projectKey}/products/`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Unauthorized: invalid or expired token');
    }
    throw new Error(
      `Failed to fetch carts: ${response.status.toString()} ${response.statusText}`
    );
  }

  const data = (await response.json()) as PagedResponse<Cart>;
  return data.results;
}

export async function addToCart(productID: string): Promise<Cart> {
  const carts = await getMyCart();
  let cart: Cart | undefined = carts.length > 0 ? carts[0] : undefined;

  if (!cart || !cart.id) {
    cart = await createCart();
    if (!cart.id) {
      throw new Error('Cart creation failed: no ID returned');
    }
  }

  const cartId = cart.id;
  const cartVersion = cart.version;

  const apiUrl = import.meta.env.VITE_CTP_API_URL;
  const projectKey = import.meta.env.VITE_CTP_PROJECT_KEY;
  const accessToken = getToken();

  if (!accessToken) {
    throw new Error('No access token provided');
  }

  const url = `${apiUrl}/${projectKey}/me/carts/${cartId}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      version: cartVersion,
      actions: [
        {
          action: 'addLineItem',
          productId: productID,
          quantity: 1,
        },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error(
      `Failed to update cart: ${response.status.toString()} ${response.statusText}`
    );
  }

  const data = (await response.json()) as Cart;
  return data;
}

export async function removeFromCart(
  productID: string | undefined
): Promise<Cart> {
  const carts = await getMyCart();
  const cartId: string | undefined = carts[0].id;
  const cartVersion: number = carts[0].version;
  const apiUrl = import.meta.env.VITE_CTP_API_URL;
  const projectKey = import.meta.env.VITE_CTP_PROJECT_KEY;
  const accessToken = getToken();

  const body = {
    version: cartVersion,
    actions: [
      {
        action: 'removeLineItem',
        lineItemId: productID,
        quantity: 1,
      },
    ],
  };

  if (!accessToken || !cartId) {
    throw new Error('No access token provided');
  }

  const url = `${apiUrl}/${projectKey}/me/carts/${cartId}`;

  const response: Response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(
      `Failed to update cart: ${response.status.toString()} ${response.statusText}`
    );
  }

  const data = (await response.json()) as Cart;
  return data;
}

async function createCart(): Promise<Cart> {
  const apiUrl = import.meta.env.VITE_CTP_API_URL;
  const projectKey = import.meta.env.VITE_CTP_PROJECT_KEY;
  const accessToken = getToken();

  if (!accessToken) {
    throw new Error('No access token provided');
  }

  const url = `${apiUrl}/${projectKey}/me/carts`;

  const body = {
    currency: 'EUR',
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Unauthorized: invalid or expired token');
    }
    throw new Error(
      `Failed to create cart: ${response.status.toString()} ${response.statusText}`
    );
  }

  const cart = (await response.json()) as Cart;
  return cart;
}
