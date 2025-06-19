import { forwardRef, useImperativeHandle, useState, useEffect } from 'react';
import { FaCartShopping } from 'react-icons/fa6';
import { Box } from '@chakra-ui/react';
import { useNavigate } from 'react-router';
import { colors } from './colors';
import { useColorMode } from './color-mode';
import { getProducts, addToCart } from '@/api/cart';
import { type OrderItem } from '@/pages/CartPage';

export type CartIconHandle = {
  addToOrder: (item: OrderItem) => void;
};

const CartIcon = forwardRef<CartIconHandle, object>((_props, ref) => {
  const { colorMode } = useColorMode();
  const navigate = useNavigate();
  const currentColors = colors[colorMode];
  const [, setOrders] = useState<OrderItem[]>([]);

  useEffect(() => {
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
      try {
        const parsed = JSON.parse(savedOrders) as OrderItem[];
        setOrders(parsed);
      } catch (error) {
        console.error('Ошибка при разборе заказов из localStorage', error);
      }
    }
  }, []);

  useImperativeHandle(ref, () => ({
    addToOrder: async (item: OrderItem): Promise<void> => {
      const productArray = await getProducts();
      const itemKey = (item.name ?? '').toLowerCase().split(/\s+/).join('-');

      const product = productArray.find((p) => p.key === itemKey);

      if (!product || !itemKey) {
        console.warn(`Product with key not found`);
        return;
      }

      try {
        await addToCart(product.id);
      } catch (error) {
        console.error('Failed to add to cart:', error);
      }
    },
  }));

  return (
    <Box
      position="relative"
      cursor="pointer"
      onClick={() => {
        void navigate('/cart');
      }}
    >
      <FaCartShopping color={currentColors.text} size={20} />
    </Box>
  );
});

export default CartIcon;
