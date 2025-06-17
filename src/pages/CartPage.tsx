import React, { Component } from 'react';
import { Box, Text, VStack, HStack, Button } from '@chakra-ui/react';
import { colors } from '@/components/ui/colors';
import { useColorMode } from '@/components/ui/color-mode';
import { FaTrashAlt } from 'react-icons/fa';
import { getMyCart, removeFromCart } from '@/api/cart';
import { Link as RouterLink } from 'react-router';
import { clearCart } from '@/api/cart';

export type OrderItem = {
  id: string;
  name: string | undefined;
  price: number;
  quantity: number;
  imageUrl: string | undefined;
};

type Props = {
  colorMode: 'light' | 'dark';
};

type State = {
  orders: OrderItem[];
};

class CartPageInner extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      orders: [],
    };

    this.clearCart = this.clearCart.bind(this);
  }

  public async clearCart(): Promise<void> {
    this.setState({ orders: [] });
    await clearCart();
  }

  public componentDidMount(): void {
    void this.loadCart();
  }

  public removeFromOrder = async (name: string | undefined): Promise<void> => {
    try {
      const productArrayInCart = await getMyCart();

      const product = productArrayInCart[0].lineItems.find(
        (p) => p.name?.['en-US'] === name
      );
      const lineItemId: string | undefined = product?.id;

      await removeFromCart(lineItemId);

      this.setState((previousState) => {
        const updatedOrders = previousState.orders
          .map((order) =>
            order.name === name
              ? { ...order, quantity: order.quantity - 1 }
              : order
          )
          .filter((order) => order.quantity > 0);

        return { orders: updatedOrders };
      });
    } catch (error) {
      console.error('Error removing from order:', error);
    }
  };

  public render(): React.JSX.Element {
    const { colorMode } = this.props;
    const currentColors = colors[colorMode];
    const { orders } = this.state;

    const aggregatedOrders: OrderItem[] = [];

    for (const item of orders) {
      const existing = aggregatedOrders.find((o) => o.name === item.name);
      if (existing) {
        existing.quantity += item.quantity;
      } else {
        aggregatedOrders.push({ ...item });
      }
    }

    return (
      <>
        <Box display="flex" justifyContent="flex-end" mt={6} mb={2} mr={8}>
          <Button
            variant="outline"
            size="md"
            onClick={async () => {
              await this.clearCart();
            }}
            _hover={{ bg: currentColors.button, color: currentColors.cardBg }}
          >
            Remove All
          </Button>
        </Box>

        <Box
          padding={8}
          maxWidth="1200px"
          w="60%"
          margin="40px auto"
          bg={currentColors.bg}
          borderRadius="8px"
          boxShadow="md"
        >
          <Text
            fontSize="2xl"
            fontWeight="bold"
            marginBottom={4}
            color={currentColors.text}
          >
            Shopping Cart
          </Text>

          {aggregatedOrders.length === 0 ? (
            <Text color={currentColors.text}>
              Your cart is empty
              <RouterLink
                to="/catalog"
                style={{
                  color: currentColors.button,
                  textDecoration: 'underline',
                  marginLeft: '8px',
                }}
              >
                Go to Catalog
              </RouterLink>
            </Text>
          ) : (
            <VStack align="start" spacing={4} width="100%">
              <HStack
                width="100%"
                fontWeight="bold"
                borderBottom="1px solid gray"
                paddingBottom={2}
                color={currentColors.text}
              >
                <Box flex="2">Product</Box>
                <Box flex="1" textAlign="right">
                  Price (€)
                </Box>
                <Box flex="1" textAlign="right">
                  Amount
                </Box>
              </HStack>

              {aggregatedOrders.map((item) => (
                <HStack
                  key={item.id}
                  width="100%"
                  paddingY={2}
                  borderBottom="1px solid #eee"
                  color={currentColors.text}
                >
                  <Box flex="2" display="flex" alignItems="center" gap={3}>
                    {item.imageUrl && (
                      <Box boxSize="50px" flexShrink={0}>
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          style={{
                            width: '50px',
                            height: '50px',
                            objectFit: 'cover',
                            borderRadius: '4px',
                          }}
                        />
                      </Box>
                    )}
                    <Box>{item.name}</Box>
                  </Box>
                  <Box flex="1" textAlign="right">
                    {(item.price / 100).toFixed(2)}
                  </Box>
                  <Box flex="1" textAlign="right">
                    {item.quantity}
                  </Box>
                  <Box width="40px" textAlign="center">
                    <FaTrashAlt
                      cursor="pointer"
                      onClick={() => {
                        void this.removeFromOrder(item.name);
                      }}
                      color={currentColors.button}
                      title="Remove one"
                    />
                  </Box>
                </HStack>
              ))}

              <Box width="100%" borderBottom="2px solid gray" mt={4} mb={4} />

              <HStack width="100%" fontWeight="bold" color={currentColors.text}>
                <Box flex="2">Total:</Box>
                <Box flex="1" />
                <Box flex="1" textAlign="right">
                  {(
                    aggregatedOrders.reduce(
                      (accumulator, item) =>
                        accumulator + item.price * item.quantity,
                      0
                    ) / 100
                  ).toFixed(2)}
                  €
                </Box>
                <Box width="40px" />
              </HStack>
            </VStack>
          )}
        </Box>
      </>
    );
  }

  private async loadCart(): Promise<void> {
    try {
      const carts = await getMyCart();

      if (carts.length === 0) {
        this.setState({ orders: [] });
        return;
      }

      const firstCart = carts[0];

      if (!Array.isArray(firstCart.lineItems)) {
        this.setState({ orders: [] });
        return;
      }

      const orders: OrderItem[] = firstCart.lineItems.map((item) => ({
        id: item.id,
        name: item.name?.['en-US'],
        price: item.price?.value?.centAmount || 0,
        quantity: item.quantity,
        imageUrl: item.variant?.images?.[0]?.url,
      }));

      this.setState({ orders });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Ошибка при загрузке корзины:', error.message);
      } else {
        console.error('Неизвестная ошибка:', error);
      }
    }
  }
}

const CartPage: React.FC = () => {
  const { colorMode } = useColorMode();
  return <CartPageInner colorMode={colorMode} />;
};

export default CartPage;
