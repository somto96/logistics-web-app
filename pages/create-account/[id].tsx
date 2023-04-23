import { Header } from '@/components/Header';
import { CardWrapper } from '@/components/Reusables/CardWrapper';
import PasswordInput from '@/components/Reusables/Inputs/PasswordInput';
import { useAppDispatch } from '@/utils/hooks/useReduxHooks';
import { setPasswordSchema } from '@/utils/validationSchemas/onboarding/setPasswordValidations';
import { PageLoader } from '@/components/Reusables/Loaders/PageLoader';
import { Box, Button, Flex, SimpleGrid,} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React from 'react';
import { POST_SET_PASSWORD_ACTION } from 'store/onboarding/actions';
import { useOnboardingState } from 'store/onboarding/slice';

const SetPassword = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { loading } = useOnboardingState();
  return (
    <>
      {loading?.includes('POST_SET_PASSWORD') && <PageLoader />}
      <Header />
      <Box
        w="100%"
        h="100vh"
        bgImage={"url('../images/pngs/slider-two.png')"}
        bgPosition="center"
        bgSize="cover"
        py={10}
        p={{ base: '10px', md: '10px' }}>
        <CardWrapper
          pageTitle={'Create Account'}
          title={'Email confirmed, kindly set your password'}
          width={{ sm: '515px', md: '818px' }}>
          {/* {createAccount?.successStatus && (
          <Box
            bg={'brand.success'}
            textAlign={'center'}
            color="brand.white"
            p={5}
            borderRadius={'16px'}>
            <Text fontWeight={600} fontSize={'16px'} lineHeight={'18px'} letterSpacing={'0.02em'}>
              {createAccount?.successMessage?.title}
            </Text>
            <Text fontSize={'14px'} lineHeight={'18px'} letterSpacing={'0.02em'}>
              {createAccount?.successMessage?.action}
            </Text>
          </Box>
        )} */}
          <Formik
            initialValues={{
              password: '',
              confirmPassword: '',
            }}
            onSubmit={async values => {
              const payload = {
                companyId: router.query?.id,
                password: values.password,
                confirmPassword: values.confirmPassword
              };

            //   console.log('payload', payload);
              dispatch(POST_SET_PASSWORD_ACTION(payload));
            }}
            validationSchema={setPasswordSchema}
          >
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
                    <PasswordInput
                      name="password"
                      label="PASSWORD"
                      value={values?.password}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      hasError={errors?.password && touched?.password}
                      error={errors?.password}
                    />
                    <PasswordInput
                      name="confirmPassword"
                      label="CONFIRM PASSWORD"
                      value={values?.confirmPassword}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      hasError={errors?.confirmPassword && touched?.confirmPassword}
                      error={errors?.confirmPassword}
                    />
                  </SimpleGrid>

                  <Flex alignItems={'center'} justifyContent={'center'} mt={5} mb={5}>
                    <Button
                      bg="brand.black"
                      color="brand.white"
                      type="submit"
                      py={3}
                      px={10}
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
                      Login
                    </Button>
                  </Flex>
                </Form>
              );
            }}
          </Formik>
        </CardWrapper>
      </Box>
    </>
  );
};

export default SetPassword;
