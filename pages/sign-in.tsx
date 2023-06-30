import { Header } from '@/components/Header';
import { CardWrapper } from '@/components/Reusables/CardWrapper';
import { Notice } from '@/components/Reusables/Inputs/Notice';
import { PageLoader } from '@/components/Reusables/Loaders/PageLoader';
import {
  Box,
  Image,
  Flex,
  Text,
  Button,
  Checkbox,
  Link,
  SimpleGrid,
  Stack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
// import { LoginForm } from '@/components/Forms/LoginForm';
import { useLoginController } from 'controllers/useLoginController';
import { resetStore } from 'store/reset';
import { useDispatch } from 'react-redux';
import PasswordInput from '@/components/Reusables/Inputs/PasswordInput';
import { TextInput } from '@/components/Reusables/Inputs/TextInput';
import { loginSchema } from '@/utils/validationSchemas/authValidations/loginValidations';
import { Formik, Form } from 'formik';

const Signin = () => {
  // const router = useRouter();
  const dispatch = useDispatch();
  const [showNotice, setShowNotice] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { authState } = useLoginController();
  useEffect(() => {
    resetStore(dispatch);
  }, []);
  const { initialValueData, handleFormSubmit, setIsChecked, isChecked } = useLoginController();
  return (
    <>
      {loading && <PageLoader />}
      <Header background={'transparent'} />

      <Box
        w="100%"
        h="100vh"
        bgImage={"url('images/pngs/slider-two.png')"}
        bgPosition="center"
        bgSize="cover"
        py={10}
        p={{ base: '10px', md: '10px' }}>
        <CardWrapper
          pageTitle={''}
          title={'Sign in'}
          align={'left'}
          width={{ sm: '300px', md: '500px' }}>
          {/* <LoginForm /> */}
          <Formik
            initialValues={initialValueData}
            onSubmit={async (values) => {
              setLoading(true)
              try {
                await handleFormSubmit(values);
                setLoading(false);
              } catch (error) {
                setLoading(false);
                return error;
              }
            }}
            validationSchema={loginSchema}>
            {({ handleChange, handleBlur, errors, touched, isValid, dirty, values }) => {
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
                      disabled={!(isValid && dirty)}>
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
        </CardWrapper>
      </Box>
      {showNotice && (
        <Notice
          placement={'bottom'}
          onClose={() => setShowNotice(false)}
          isOpen={showNotice}
          title={`Welcome ${authState?.loginData?.user?.companyName}`}
          body={
            <Flex
              flexDir={'column'}
              alignItems={'center'}
              justifyContent={'center'}
              color="brand.white"
              gap={10}
              mb={8}>
              <Image
                src="images/svgs/under-construction.svg"
                w={'auto'}
                h={'200px'}
                alt="under-construction"
              />
              <Text textAlign={'center'}>Your dashboard is still under construction</Text>
            </Flex>
          }
        />
      )}
    </>
  );
};

export default Signin;
