import { loginSchema } from '../../utils/validationSchemas/authValidations/loginValidations';
import {
  Box,
  SimpleGrid,
  Image,
  Flex,
  Button,
  Text,
  Link,
  Stack,
  Checkbox,
} from '@chakra-ui/react';
import { Formik, Form } from 'formik';
// import { POST_LOGIN_ACTION } from 'store/auth/actions';
import { useLoginController } from 'controllers/useLoginController';
import PasswordInput from '../Reusables/Inputs/PasswordInput';
import { TextInput } from '../Reusables/Inputs/TextInput';

export const LoginForm = () => {
  const {  
    initialValueData, 
    handleFormSubmit, 
    setIsChecked, 
    isChecked, 
  } = useLoginController();

  return (
    <Formik
      initialValues={initialValueData}
      onSubmit={handleFormSubmit}
      validationSchema={loginSchema}>
      {({
        handleChange,
        handleBlur,
        errors,
        touched,
        isValid,
        dirty,
        values,
      }) => {
        return (
          <Form>
            <SimpleGrid columns={1} spacing={10} p={{ base: 2, md: 5 }}>
              <TextInput
                name="email"
                label="COMPANY EMAIL"
                value={values?.email}
                handleChange={handleChange}
                handleBlur={handleBlur}
                hasError={errors?.email && touched?.email}
                error={errors?.email}>
                <Image src="images/svgs/form-mail-icon.svg" alt={'mail-icon'} />
              </TextInput>
            </SimpleGrid>
            <SimpleGrid columns={1} spacing={10} p={{ base: 2, md: 5 }}>
              <Box gap={2}>
                <PasswordInput
                  name="password"
                  label="PASSWORD"
                  value={values?.password}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  hasError={errors?.password && touched?.password}
                  error={errors?.password}
                />
                <Flex alignItems={'center'} justifyContent={'space-between'} mt={2} gap={3}>
                  <Stack spacing={5} direction="row">
                    <Checkbox onChange={() => setIsChecked(!isChecked)} checked={isChecked}>
                      <Text
                        fontSize={'14px'}
                        lineHeight={'16px'}
                        letterSpacing={'0.02em'}
                        bg={'transparent'}>
                        Remember me
                      </Text>
                    </Checkbox>
                  </Stack>
                  <Link
                    color={'brand.text'}
                    fontSize={'14px'}
                    lineHeight={'16px'}
                    letterSpacing={'0.02em'}
                    href={'/forgot-password/enter-email'}
                    style={{
                      color: 'brand.text',
                      textDecoration: 'underline',
                    }}>
                    Forgot password?
                  </Link>
                </Flex>
              </Box>
            </SimpleGrid>
            <Flex alignItems={'center'} justifyContent={'center'} mt={5} mb={5}>
              <Button
                bg="brand.black"
                color="brand.white"
                type="submit"
                p={5}
                fontSize="14px"
                _hover={{
                  background: 'brand.black',
                  color: 'brand.white',
                }}
                style={{
                  borderRadius: '20px',
                  lineHeight: '22px',
                }}
                isDisabled={!(isValid && dirty)}>
                Sign in
              </Button>
            </Flex>
            <Text
              color={'#4F4F4F'}
              letterSpacing={'0.02em'}
              textAlign={'center'}
              fontSize={'14px'}
              lineHeight={'16px'}>
              New member?{' '}
              <Link
                color={'brand.text'}
                fontWeight={600}
                href={'/create-account'}
                style={{
                  color: 'brand.text',
                  textDecoration: 'none',
                }}>
                Create Account
              </Link>
            </Text>
          </Form>
        );
      }}
    </Formik>
  );
};
