import { Header } from '@/components/Header';
import { CardWrapper } from '@/components/Reusables/CardWrapper';
import PasswordInput from '@/components/Reusables/Inputs/PasswordInput';
import { useAppDispatch } from '@/utils/hooks/useReduxHooks';
import { setPasswordSchema } from '@/utils/validationSchemas/onboarding/setPasswordValidations';
import { PageLoader } from '@/components/Reusables/Loaders/PageLoader';
import { Box, Button, Flex, SimpleGrid, Image, Text } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { POST_SET_PASSWORD_ACTION } from 'store/onboarding/actions';
import { useOnboardingState } from 'store/onboarding/slice';
import { Notice } from '@/components/Reusables/Inputs/Notice';

const ResetPassword = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, setPassword } = useOnboardingState();
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [showNotice, setShowNotice] = useState<boolean>(false);

  useEffect(() => {
    if (submitted) {
      setPassword?.successStatus && setShowNotice(true);
    }
  }, [setPassword?.successStatus, submitted]);
  return (
    <>
      {loading?.includes('POST_SET_PASSWORD') && <PageLoader />}
      <Header showMenuList />
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
                confirmPassword: values.confirmPassword,
              };

              //   console.log('payload', payload);
              dispatch(POST_SET_PASSWORD_ACTION(payload));
              setSubmitted(true);
            }}
            validationSchema={setPasswordSchema}>
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
                      Reset Password
                    </Button>
                  </Flex>
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
          title={`Welcome ${setPassword?.successMessage?.action?.companyName}`}
          body={
            <Flex
              flexDir={'column'}
              alignItems={'center'}
              justifyContent={'center'}
              color="brand.white"
              gap={10}
              mb={8}>
              <Image
                src="../images/svgs/under-construction.svg"
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

export default ResetPassword;
