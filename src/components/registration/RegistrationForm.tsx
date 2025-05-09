import {
  Box,
  Button,
  Input,
  Checkbox,
  Stack,
  Text,
  RadioGroup,
  VStack,
} from '@chakra-ui/react';
import { useColorMode } from '../ui/color-mode';
import { useRegistrationForm } from './use-registration-form';
import { countries, colorSchemes } from './constants';

const RegistrationForm = (): React.JSX.Element => {
  const { colorMode } = useColorMode();
  const {
    formData,
    errors,
    isSubmitting,
    handleInputChange,
    handleCheckboxChange,
    handleDefaultAddressChange,
    handleSubmit,
  } = useRegistrationForm();

  const currentColors = colorSchemes[colorMode];

  return (
    <Box
      bg={currentColors.bg}
      p={6}
      borderRadius="lg"
      maxW="600px"
      mx="auto"
      boxShadow="md"
    >
      <form onSubmit={handleSubmit}>
        <Stack>
          <Text fontSize="xl" fontWeight="bold" color={currentColors.primary}>
            Personal Information
          </Text>

          <Input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            bg={currentColors.inputBg}
            borderColor={
              errors.email ? currentColors.error : currentColors.border
            }
            _focus={{ borderColor: currentColors.primary }}
          />
          {errors.email && (
            <Text color={currentColors.error}>{errors.email}</Text>
          )}

          <Input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            bg={currentColors.inputBg}
            borderColor={
              errors.password ? currentColors.error : currentColors.border
            }
            _focus={{ borderColor: currentColors.primary }}
          />
          {errors.password && (
            <Text color={currentColors.error}>{errors.password}</Text>
          )}

          <Input
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleInputChange}
            bg={currentColors.inputBg}
            borderColor={
              errors.firstName ? currentColors.error : currentColors.border
            }
            _focus={{ borderColor: currentColors.primary }}
          />
          {errors.firstName && (
            <Text color={currentColors.error}>{errors.firstName}</Text>
          )}

          <Input
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleInputChange}
            bg={currentColors.inputBg}
            borderColor={
              errors.lastName ? currentColors.error : currentColors.border
            }
            _focus={{ borderColor: currentColors.primary }}
          />
          {errors.lastName && (
            <Text color={currentColors.error}>{errors.lastName}</Text>
          )}

          <Input
            name="dateOfBirth"
            type="date"
            placeholder="Date of Birth"
            value={formData.dateOfBirth}
            onChange={handleInputChange}
            bg={currentColors.inputBg}
            borderColor={
              errors.dateOfBirth ? currentColors.error : currentColors.border
            }
            _focus={{ borderColor: currentColors.primary }}
          />
          {errors.dateOfBirth && (
            <Text color={currentColors.error}>{errors.dateOfBirth}</Text>
          )}

          <Text fontSize="xl" fontWeight="bold" color={currentColors.primary}>
            Shipping Address
          </Text>

          <Input
            name="shippingStreet"
            placeholder="Street"
            value={formData.shippingStreet}
            onChange={handleInputChange}
            bg={currentColors.inputBg}
            borderColor={
              errors.shippingStreet ? currentColors.error : currentColors.border
            }
            _focus={{ borderColor: currentColors.primary }}
          />
          {errors.shippingStreet && (
            <Text color={currentColors.error}>{errors.shippingStreet}</Text>
          )}

          <Input
            name="shippingCity"
            placeholder="City"
            value={formData.shippingCity}
            onChange={handleInputChange}
            bg={currentColors.inputBg}
            borderColor={
              errors.shippingCity ? currentColors.error : currentColors.border
            }
            _focus={{ borderColor: currentColors.primary }}
          />
          {errors.shippingCity && (
            <Text color={currentColors.error}>{errors.shippingCity}</Text>
          )}

          <Input
            name="shippingPostalCode"
            placeholder="Postal Code"
            value={formData.shippingPostalCode}
            onChange={handleInputChange}
            bg={currentColors.inputBg}
            borderColor={
              errors.shippingPostalCode
                ? currentColors.error
                : currentColors.border
            }
            _focus={{ borderColor: currentColors.primary }}
          />
          {errors.shippingPostalCode && (
            <Text color={currentColors.error}>{errors.shippingPostalCode}</Text>
          )}

          <Input
            name="shippingCountry"
            list="countries"
            placeholder="Country"
            value={formData.shippingCountry}
            onChange={handleInputChange}
            bg={currentColors.inputBg}
            borderColor={
              errors.shippingCountry
                ? currentColors.error
                : currentColors.border
            }
            _focus={{ borderColor: currentColors.primary }}
          />
          <datalist id="countries">
            {countries.map((country) => (
              <option key={country} value={country} />
            ))}
          </datalist>
          {errors.shippingCountry && (
            <Text color={currentColors.error}>{errors.shippingCountry}</Text>
          )}

          <Checkbox.Root
            colorPalette="orange"
            variant="subtle"
            checked={formData.useSameAddress}
            onCheckedChange={(event) => {
              handleCheckboxChange(!!event.checked);
            }}
          >
            <Checkbox.HiddenInput />
            <Checkbox.Control cursor="pointer" />
            <Checkbox.Label cursor="pointer" color={currentColors.text}>
              Use same address for billing
            </Checkbox.Label>
          </Checkbox.Root>

          {!formData.useSameAddress && (
            <>
              <Text
                fontSize="xl"
                fontWeight="bold"
                color={currentColors.primary}
              >
                Billing Address
              </Text>

              <Input
                name="billingStreet"
                placeholder="Street"
                value={formData.billingStreet}
                onChange={handleInputChange}
                bg={currentColors.inputBg}
                borderColor={
                  errors.billingStreet
                    ? currentColors.error
                    : currentColors.border
                }
                _focus={{ borderColor: currentColors.primary }}
              />
              {errors.billingStreet && (
                <Text color={currentColors.error}>{errors.billingStreet}</Text>
              )}

              <Input
                name="billingCity"
                placeholder="City"
                value={formData.billingCity}
                onChange={handleInputChange}
                bg={currentColors.inputBg}
                borderColor={
                  errors.billingCity
                    ? currentColors.error
                    : currentColors.border
                }
                _focus={{ borderColor: currentColors.primary }}
              />
              {errors.billingCity && (
                <Text color={currentColors.error}>{errors.billingCity}</Text>
              )}

              <Input
                name="billingPostalCode"
                placeholder="Postal Code"
                value={formData.billingPostalCode}
                onChange={handleInputChange}
                bg={currentColors.inputBg}
                borderColor={
                  errors.billingPostalCode
                    ? currentColors.error
                    : currentColors.border
                }
                _focus={{ borderColor: currentColors.primary }}
              />
              {errors.billingPostalCode && (
                <Text color={currentColors.error}>
                  {errors.billingPostalCode}
                </Text>
              )}

              <Input
                name="billingCountry"
                list="countries"
                placeholder="Country"
                value={formData.billingCountry}
                onChange={handleInputChange}
                bg={currentColors.inputBg}
                borderColor={
                  errors.billingCountry
                    ? currentColors.error
                    : currentColors.border
                }
                _focus={{ borderColor: currentColors.primary }}
              />
              {errors.billingCountry && (
                <Text color={currentColors.error}>{errors.billingCountry}</Text>
              )}
            </>
          )}

          <Box>
            <Text mb={2} color={currentColors.text}>
              Default Address
            </Text>
            <RadioGroup.Root
              value={formData.defaultAddress}
              onValueChange={handleDefaultAddressChange}
            >
              <VStack align="start">
                <RadioGroup.Item value="none" cursor="pointer">
                  <RadioGroup.ItemHiddenInput />
                  <RadioGroup.ItemIndicator cursor="pointer" />
                  <RadioGroup.ItemText color={currentColors.text}>
                    No default
                  </RadioGroup.ItemText>
                </RadioGroup.Item>
                <RadioGroup.Item value="shipping" cursor="pointer">
                  <RadioGroup.ItemHiddenInput />
                  <RadioGroup.ItemIndicator cursor="pointer" />
                  <RadioGroup.ItemText color={currentColors.text}>
                    Shipping address
                  </RadioGroup.ItemText>
                </RadioGroup.Item>
                {!formData.useSameAddress && (
                  <RadioGroup.Item value="billing" cursor="pointer">
                    <RadioGroup.ItemHiddenInput />
                    <RadioGroup.ItemIndicator cursor="pointer" />
                    <RadioGroup.ItemText color={currentColors.text}>
                      Billing address
                    </RadioGroup.ItemText>
                  </RadioGroup.Item>
                )}
              </VStack>
            </RadioGroup.Root>
          </Box>

          <Button
            type="submit"
            colorScheme="orange"
            loading={isSubmitting}
            mt={4}
          >
            Sign Up
          </Button>
        </Stack>
      </form>
    </Box>
  );
};
export default RegistrationForm;
