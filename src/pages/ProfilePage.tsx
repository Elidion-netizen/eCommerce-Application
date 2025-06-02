import { useState } from 'react';
import {
  Box,
  Container,
  Flex,
  Text,
  Input,
  Button,
  VStack,
} from '@chakra-ui/react';
import { useColorMode } from '@/components/ui/color-mode';
import { FiEdit3 } from 'react-icons/fi';
import type { ButtonProps } from '@chakra-ui/react';
import { CiSquareRemove } from 'react-icons/ci';

export default function SliderBar(): React.JSX.Element {
  const { colorMode } = useColorMode();
  const [activeTab, setActiveTab] = useState('User Information');

  const handleTabChange = (tab: string): void => {
    setActiveTab(tab);
  };

  const colors = {
    light: {
      bg: '#F8F1E9',
      cardBg: 'white',
      border: '#D4A373',
      text: '#5C3D2E',
      soft: '#F7F1EB',
    },
    dark: {
      bg: '#3E2723',
      cardBg: '#5D4037',
      border: '#8D6E63',
      text: '#EFEBE9',
      soft: '#695148',
    },
  };

  const currentColors = colors[colorMode];

  const getButtonStyles = (tab: string): ButtonProps => ({
    variant: 'ghost',
    justifyContent: 'flex-start',
    fontSize: 16,
    height: 12,
    color: currentColors.text,
    _hover: {
      bg: currentColors.soft,
      transform: 'translateX(2px)',
      borderRightColor: '#D4A373',
      borderRightWidth: '2px',
    },
    transition: 'all 0.2s',
    ...(activeTab === tab && {
      bg: currentColors.soft,
      borderRightColor: '#D4A373',
      borderRightWidth: '2px',
      transform: 'translateX(2px)',
    }),
  });

  return (
    <Box
      py={10}
      px={{ base: 4, md: 6 }}
      display="flex"
      flexDirection={{ base: 'column', md: 'row' }}
      alignItems={{ base: 'stretch', md: 'center' }}
      overflow="hidden"
      justifyContent="start"
      height="100%"
      bg={currentColors.bg}
    >
      <VStack
        w={{ base: '100%', md: 200 }}
        align="stretch"
        mb={{ base: 4, md: 0 }}
        spacing={2}
      >
        <Button
          {...getButtonStyles('User Information')}
          onClick={() => {
            handleTabChange('User Information');
          }}
          w="100%"
        >
          User Information
        </Button>

        <Button
          {...getButtonStyles('User Adresses')}
          onClick={() => {
            handleTabChange('User Adresses');
          }}
          w="100%"
        >
          User Addresses
        </Button>

        <Button
          {...getButtonStyles('Settings')}
          onClick={() => {
            handleTabChange('Settings');
          }}
          w="100%"
        >
          Settings
        </Button>
      </VStack>
      <Box flex="1" p={{ base: 0, md: 6 }}>
        {activeTab === 'User Information' && (
          <UserInformation
            currentColors={currentColors}
            colorMode={colorMode}
          />
        )}
        {activeTab === 'User Adresses' && (
          <UserAdresses currentColors={currentColors} colorMode={colorMode} />
        )}
        {activeTab === 'Settings' && (
          <Settings currentColors={currentColors} colorMode={colorMode} />
        )}
      </Box>
    </Box>
  );
}

function UserInformation({
  currentColors,
  colorMode,
}: {
  currentColors: Record<string, string>;
  colorMode: string;
}): React.JSX.Element {
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('2019-09-09');

  return (
    <Box
      py={10}
      px={{ base: 4, md: 6 }}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="start"
      height="100%"
    >
      <Container maxW="700px" px={{ base: 2, md: 6 }}>
        <Flex direction="column" gap={{ base: 4, md: 6 }} align="center">
          <Box
            p={{ base: 4, md: 8 }}
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
              flexDirection={{ base: 'column', md: 'row' }}
              gap={{ base: 4, md: 0 }}
            >
              <Text
                textAlign="left"
                fontSize="xl"
                fontWeight="bold"
                color={currentColors.text}
                flex="1"
              >
                Personal Information
              </Text>
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
              >
                {isEditing ? 'Save' : 'Edit'}
                <FiEdit3 />
              </Button>
            </Flex>
            <Box display="flex" flexDirection="column" gap={8}>
              <Flex
                gap={{ base: 4, md: 8 }}
                flexDirection={{ base: 'column', md: 'row' }}
              >
                <Box flex="1">
                  <Text color={currentColors.border} fontSize="lg">
                    First Name
                  </Text>
                  <Input
                    border="none"
                    value={firstName}
                    _focus={{ outline: 'none' }}
                    bg={currentColors.cardBg}
                    fontSize="md"
                    padding={0}
                    onChange={(event) => {
                      setFirstName(event.target.value);
                    }}
                    readOnly={!isEditing}
                  />
                </Box>

                <Box flex="1">
                  <Text color={currentColors.border} fontSize="lg">
                    Last Name
                  </Text>
                  <Input
                    readOnly={!isEditing}
                    id="lastName"
                    border="none"
                    _focus={{ outline: 'none' }}
                    bg={currentColors.cardBg}
                    padding={0}
                    value={lastName}
                    fontSize="md"
                    _placeholder={{ color: currentColors.text }}
                    onChange={(event) => {
                      setLastName(event.target.value);
                    }}
                    color={currentColors.text}
                  />
                </Box>
              </Flex>

              <Flex
                gap={{ base: 4, md: 8 }}
                flexDirection={{ base: 'column', md: 'row' }}
              >
                <Box flex="1">
                  <Text color={currentColors.border} fontSize="lg">
                    Email
                  </Text>
                  <Input
                    readOnly={!isEditing}
                    id="email"
                    padding={0}
                    border="none"
                    _focus={{ outline: 'none' }}
                    bg={currentColors.cardBg}
                    fontSize="md"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                    }}
                    _placeholder={{ color: currentColors.text }}
                    color={currentColors.text}
                  />
                </Box>

                <Box flex="1">
                  <Text color={currentColors.border} fontSize="lg">
                    Date of birth
                  </Text>
                  <Input
                    type="date"
                    readOnly={!isEditing}
                    id="dob"
                    border="none"
                    _focus={{ outline: 'none' }}
                    bg={currentColors.cardBg}
                    padding={0}
                    value={dob}
                    onChange={(event) => {
                      setDob(event.target.value);
                    }}
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
    </Box>
  );
}

function Settings({
  currentColors,
  colorMode,
}: {
  currentColors: Record<string, string>;
  colorMode: string;
}): React.JSX.Element {
  return (
    <Box
      py={10}
      px={{ base: 4, md: 6 }}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="start"
      height="100%"
    >
      <Container maxW="700px" px={{ base: 2, md: 6 }}>
        <Flex direction="column" gap={{ base: 4, md: 6 }} align="center">
          <Box
            p={{ base: 4, md: 8 }}
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
              flexDirection={{ base: 'column', md: 'row' }}
              gap={{ base: 4, md: 0 }}
            >
              <Text
                textAlign="left"
                fontSize="xl"
                fontWeight="bold"
                color={currentColors.text}
                flex="1"
              >
                Settings
              </Text>
              <Button
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
              >
                <FiEdit3 />
              </Button>
            </Flex>
            <Box display="flex" flexDirection="column" gap={8}>
              <Flex
                gap={{ base: 4, md: 8 }}
                flexDirection={{ base: 'column', md: 'row' }}
              >
                <Box flex="1">
                  <Text color={currentColors.border} fontSize="lg">
                    Password
                  </Text>
                  <Input
                    id="firstName"
                    padding={0}
                    border="none"
                    _focus={{ outline: 'none' }}
                    bg={currentColors.cardBg}
                    fontSize="md"
                    value="password"
                    _placeholder={{ color: currentColors.text }}
                  />
                </Box>
              </Flex>
            </Box>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}

function UserAdresses({
  currentColors,
  colorMode,
}: {
  currentColors: Record<string, string>;
  colorMode: string;
}): React.JSX.Element {
  const [isEditing, setIsEditing] = useState(false);

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

      {['Billing', 'Shipping'].map((type) => (
        <Container
          key={type}
          maxW="700px"
          display="flex"
          flexDirection="column"
          px={0}
          w="full"
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
                      bg={currentColors.cardBg}
                      fontSize="md"
                      placeholder="Belarus"
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
                      placeholder="Minsk"
                      fontSize="md"
                      _placeholder={{ color: currentColors.text }}
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
                      fontSize="md"
                      placeholder="220092"
                      _placeholder={{ color: currentColors.text }}
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
                      padding={0}
                      placeholder="Beruta"
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
      ))}
    </Box>
  );
}
