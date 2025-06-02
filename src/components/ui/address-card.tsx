import React, { useState } from 'react';
import { Box, Button, Container, Flex, Text, Input } from '@chakra-ui/react';
import { FiEdit3 } from 'react-icons/fi';
import { CiSquareRemove } from 'react-icons/ci';

export type AddressType = 'Billing' | 'Shipping';

interface AddressProps {
  type: AddressType;
  currentColors: Record<string, string>;
  colorMode: string;
}

export default function AddressCard({
  type,
  currentColors,
  colorMode,
}: AddressProps): React.JSX.Element {
  const [isEditing, setIsEditing] = useState(false);
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [postCode, setPostCode] = useState('');
  const [street, setStreet] = useState('');

  return (
    <Container
      maxW="700px"
      display="flex"
      flexDirection="column"
      px={0}
      w="full"
      key={type}
    >
      <Flex direction="column" gap={6} align="center">
        <Box
          p={{ base: 6, md: 8 }}
          borderWidth={1}
          borderColor={currentColors.border}
          borderRadius="2xl"
          boxShadow="xl"
          bg={currentColors.cardBg}
          width="full"
          transition="all 0.3s ease-in-out"
          _hover={{ boxShadow: '2xl', transform: 'translateY(-3px)' }}
        >
          <Flex
            alignItems="center"
            justifyContent="space-between"
            mb={8}
            flexWrap="wrap"
            gap={4}
          >
            <Text
              textAlign="left"
              fontSize="xl"
              fontWeight="bold"
              color={currentColors.text}
              flex="1 1 auto"
            >
              Default {type} Address
            </Text>
            <Box display="flex" gap={4}>
              <Button
                onClick={() => {
                  setIsEditing(!isEditing);
                }}
                borderColor={currentColors.border}
                borderWidth="1px"
                color={currentColors.border}
                px={4}
                height={8}
                borderRadius="13px"
                variant="outline"
                _hover={{
                  bg:
                    colorMode === 'dark'
                      ? 'rgba(141, 110, 99, 0.1)'
                      : 'rgba(212, 163, 115, 0.1)',
                  transform: 'translateY(-2px)',
                }}
                transition="all 0.2s"
                display="flex"
                alignItems="center"
                gap={2}
              >
                {isEditing ? 'Save' : 'Edit'} <FiEdit3 />
              </Button>
              <CiSquareRemove
                color={currentColors.text}
                size={32}
                style={{ cursor: 'pointer' }}
              />
            </Box>
          </Flex>

          <Box display="flex" flexDirection="column" gap={8}>
            <Flex
              gap={8}
              direction={{ base: 'column', md: 'row' }}
              flexWrap="wrap"
            >
              <Box flex={{ base: '1 1 100%', md: '1 1 45%' }}>
                <Text color={currentColors.border} fontSize="lg" mb={1}>
                  Country
                </Text>
                <Input
                  readOnly={!isEditing}
                  padding={0}
                  border="none"
                  _focus={{ outline: 'none' }}
                  onChange={(event) => {
                    setCountry(event.target.value);
                  }}
                  bg={currentColors.cardBg}
                  fontSize="md"
                  value={country}
                  _placeholder={{ color: currentColors.text }}
                  color={currentColors.text}
                />
              </Box>

              <Box flex={{ base: '1 1 100%', md: '1 1 45%' }}>
                <Text color={currentColors.border} fontSize="lg" mb={1}>
                  City/State
                </Text>
                <Input
                  readOnly={!isEditing}
                  border="none"
                  _focus={{ outline: 'none' }}
                  bg={currentColors.cardBg}
                  padding={0}
                  onChange={(event) => {
                    setCity(event.target.value);
                  }}
                  value={city}
                  fontSize="md"
                  color={currentColors.text}
                />
              </Box>
            </Flex>

            <Flex
              gap={8}
              direction={{ base: 'column', md: 'row' }}
              flexWrap="wrap"
            >
              <Box flex={{ base: '1 1 100%', md: '1 1 45%' }}>
                <Text color={currentColors.border} fontSize="lg" mb={1}>
                  Postal Code
                </Text>
                <Input
                  readOnly={!isEditing}
                  padding={0}
                  border="none"
                  _focus={{ outline: 'none' }}
                  bg={currentColors.cardBg}
                  onChange={(event) => {
                    setPostCode(event.target.value);
                  }}
                  fontSize="md"
                  value={postCode}
                  color={currentColors.text}
                />
              </Box>

              <Box flex={{ base: '1 1 100%', md: '1 1 45%' }}>
                <Text color={currentColors.border} fontSize="lg" mb={1}>
                  Street
                </Text>
                <Input
                  readOnly={!isEditing}
                  border="none"
                  _focus={{ outline: 'none' }}
                  bg={currentColors.cardBg}
                  onChange={(event) => {
                    setStreet(event.target.value);
                  }}
                  padding={0}
                  value={street}
                  fontSize="md"
                  _placeholder={{ color: currentColors.text }}
                  color={currentColors.text}
                />
              </Box>
            </Flex>
          </Box>
        </Box>
      </Flex>
    </Container>
  );
}
