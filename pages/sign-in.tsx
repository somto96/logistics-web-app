import { Header } from '@/components/Header';
import { CardWrapper } from '@/components/Reusables/CardWrapper';
import { Notice } from '@/components/Reusables/Inputs/Notice';
import PasswordInput from '@/components/Reusables/Inputs/PasswordInput';
import { TextInput } from '@/components/Reusables/Inputs/TextInput';
import { PageLoader } from '@/components/Reusables/Loaders/PageLoader';
import { useAppDispatch } from '@/utils/hooks/useReduxHooks';
import { loginSchema } from '@/utils/validationSchemas/authValidations/loginValidations';
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
import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { POST_LOGIN_ACTION } from 'store/auth/actions';
import { useAuthState } from 'store/auth/slice';

const Signin = () => {
  const dispatch = useAppDispatch();
  const { loading, loginData } = useAuthState();
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [showNotice, setShowNotice] = useState<boolean>(false);

  useEffect(() => {
    if (submitted) {
      loginData?.successStatus && setShowNotice(true);
    }
  }, [loginData?.successStatus, submitted]);
  return (
    <>
      {loading?.includes('POST_LOGIN') && <PageLoader />}
      <Header />

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
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            onSubmit={async values => {
              const payload = {
                email: values?.email,
                password: values?.password,
              };

              console.log('payload', payload);
              dispatch(POST_LOGIN_ACTION(payload));
              setSubmitted(true);
            }}
            validationSchema={loginSchema}>
            {({
              handleChange,
              handleBlur,
              errors,
              touched,
              //   handleSubmit,
              //   isSubmitting,
              isValid,
              dirty,
              values,
            }) => {
              return (
                <Form>
                  <SimpleGrid columns={1} spacing={10} p={5}>
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
                  <SimpleGrid columns={1} spacing={10} p={5}>
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
                      <Flex alignItems={'center'} justifyContent={'space-between'} mt={2}>
                        <Stack spacing={5} direction="row">
                          <Checkbox
                            colorScheme="blackAlpha"
                            onChange={() => setIsChecked(!isChecked)}
                            checked={isChecked}>
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
                          href={'/forgot-password'}
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
                      disabled={!(isValid && dirty) || !isChecked}>
                      Sign in
                    </Button>
                  </Flex>
                  <Text color={'#4F4F4F'} letterSpacing={'0.02em'} textAlign={'center'}>
                    New member?{' '}
                    <Link
                      color={'brand.text'}
                      fontSize={'16px'}
                      lineHeight={'20px'}
                      fontWeight={600}
                      letterSpacing={'0.03em'}
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
          title={`Welcome ${loginData?.user?.companyName}`}
          body={
            <Flex flexDir={'column'} alignItems={'center'} justifyContent={'center'} color="brand.white" gap={10} mb={8}>
              <Image src="images/svgs/under-construction.svg" w={"auto"} h={"200px"} alt="under-construction" />
              <Text textAlign={"center"}>Your dashboard is still under construction</Text>
            </Flex>
          }
        />
      )}
    </>
  );
};

export default Signin;
