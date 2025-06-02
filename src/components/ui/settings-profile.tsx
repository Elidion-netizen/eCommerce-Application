import { Box, Container, Flex, Text, Button, Input } from '@chakra-ui/react';
import { FiEdit3 } from 'react-icons/fi';
import { useState } from 'react';

export default function Settings({
  currentColors,
  colorMode,
}: {
  currentColors: Record<string, string>;
  colorMode: string;
}): React.JSX.Element {
  const [password, setPassword] = useState('');
  const [isEditing, setIsEditing] = useState(false);

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
                    Password
                  </Text>
                  <Input
                    id="firstName"
                    padding={0}
                    border="none"
                    _focus={{ outline: 'none' }}
                    bg={currentColors.cardBg}
                    fontSize="md"
                    onChange={(event) => {
                      setPassword(event.target.value);
                    }}
                    value={password}
                    readOnly={!isEditing}
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
