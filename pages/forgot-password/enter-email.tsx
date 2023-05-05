import { Header } from '@/components/Header';
import { CardWrapper } from '@/components/Reusables/CardWrapper';
import { TextInput } from '@/components/Reusables/Inputs/TextInput';
// import { useAppDispatch } from '@/utils/hooks/useReduxHooks';
import { enterEmailSchema } from '@/utils/validationSchemas/onboarding/forgotPasswordValidations';
import { Box, Button, Flex, SimpleGrid, Image, Text } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import React, { useState } from 'react';
// import { POST_LOGIN_ACTION } from 'store/auth/actions';

const EnterEmail = () => {
  // const dispatch = useAppDispatch();
  const [submitted, setSubmitted] = useState<boolean>(false);

  submitted && console.log('submitted', submitted);

  return (
    <>
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
          pageTitle={''}
          title={'Forgot Password'}
          align={'left'}
          width={{ sm: '300px', md: '500px' }}>
          <Text fontSize={"14px"} lineHeight={"16px"} textAlign={"center"}>Enter the registered email address linked to your account</Text>
          <Formik
            initialValues={{
              email: '',
            }}
            onSubmit={async values => {
              const payload = {
                email: values?.email,
              };

              console.log('payload', payload);

              // dispatch(POST_LOGIN_ACTION(payload));
              setSubmitted(true);
            }}
            validationSchema={enterEmailSchema}>
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
                      <Image src="../images/svgs/form-mail-icon.svg" alt={'mail-icon'} />
                    </TextInput>
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
                      Send link
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

export default EnterEmail;
