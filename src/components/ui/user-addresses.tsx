import React from 'react';
import AddressCard from './address-card';
import { Box, Button } from '@chakra-ui/react';
import { FiEdit3 } from 'react-icons/fi';
import { type AddressType } from './address-card';

export default function UserAddresses({
  currentColors,
  colorMode,
}: {
  currentColors: Record<string, string>;
  colorMode: string;
}): React.JSX.Element {
  const addressTypes: AddressType[] = ['Billing', 'Shipping'];

  return (
    <Box
      py={4}
      px={{ base: 4, md: 6 }}
      display="flex"
      flexDirection="column"
      gap={12}
      minH="100px"
      maxH="600px"
      overflowY="auto"
      alignItems="center"
      justifyContent="start"
      position="relative"
    >
      <Box
        position={{ base: 'static', md: 'fixed' }}
        top={{ base: 'auto', md: 20 }}
        right={{ base: 'auto', md: 20 }}
        zIndex={999}
        width={{ base: '100%', md: 'auto' }}
        maxW={{ base: '100%', md: 'auto' }}
        px={{ base: 4, md: 0 }}
        mb={{ base: 4, md: 0 }}
      >
        <Button
          borderColor={currentColors.text}
          borderWidth="1px"
          bg={currentColors.border}
          color={currentColors.text}
          px={{ base: 4, md: 6 }}
          width={{ base: '100%', md: 'auto' }}
          height={8}
          borderRadius="13px"
          variant="outline"
          _hover={{
            bg:
              colorMode === 'dark'
                ? 'rgba(128, 91, 79, 1)'
                : 'rgba(212, 163, 115, 0.8)',
            transform: 'translateY(-2px)',
          }}
          transition="all 0.2s"
        >
          Add Address <FiEdit3 />
        </Button>
      </Box>

      {addressTypes.map((type) => (
        <AddressCard
          key={type}
          type={type}
          currentColors={currentColors}
          colorMode={colorMode}
        />
      ))}
    </Box>
  );
}
