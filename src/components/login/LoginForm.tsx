import {
  Box,
  Button,
  Field,
  IconButton,
  Input,
  InputGroup,
  Stack,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useColorMode } from '@/components/ui/color-mode';
import { colorSchemes } from '@/components/login/constants';
import { emailValidator, passwordValidator } from './validators';
import { useState } from 'react';
import { CloseEyeIcon, OpenEyeIcon } from '../ui/EyeIcon';
import { getTokenPassword } from '@/api/login';
import { useNavigate } from 'react-router';
import { useAuth } from '@/store/session-provider';

interface FormValues {
  email: string;
  password: string;
}

export default function LoginForm(): React.JSX.Element {
  const { colorMode } = useColorMode();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm<FormValues>();

  async function onSubmit(values: FormValues): Promise<void> {
    try {
      const data = await getTokenPassword(values);
      login(data);
      await navigate('/');
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError('root.serverError', {
          type: 'server',
          message: error.message,
        });
      }
    }
  }

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
      <form
        onSubmit={handleSubmit(onSubmit)}
        onChange={() => {
          clearErrors('root.serverError');
        }}
      >
        <Stack>
          <Field.Root invalid={!!errors.email}>
            <Field.Label>Email</Field.Label>
            <Input
              {...register('email', emailValidator)}
              bg={currentColors.inputBg}
              _focus={{ borderColor: currentColors.primary }}
            />
            <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!errors.password}>
            <Field.Label>Password</Field.Label>
            <InputGroup
              endElement={
                <IconButton
                  onClick={() => {
                    setShowPassword((pre) => !pre);
                  }}
                  variant="ghost"
                  aria-label="Show password"
                >
                  {showPassword ? (
                    <OpenEyeIcon color={currentColors.text} />
                  ) : (
                    <CloseEyeIcon color={currentColors.text} />
                  )}
                </IconButton>
              }
            >
              <Input
                {...register('password', passwordValidator)}
                bg={currentColors.inputBg}
                type={showPassword ? 'text' : 'password'}
                _focus={{ borderColor: currentColors.primary }}
              />
            </InputGroup>
            <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!errors.root?.serverError.message}>
            <Field.ErrorText>
              {errors.root?.serverError.message}
            </Field.ErrorText>
          </Field.Root>

          <Button
            type="submit"
            loading={isSubmitting}
            loadingText="Submitting"
            spinnerPlacement="start"
            mt={4}
          >
            Submit
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
