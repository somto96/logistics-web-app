import { Header } from '@/components/Header';
import { CardWrapper } from '@/components/Reusables/CardWrapper';
import { SelectField } from '@/components/Reusables/Inputs/SelectField';
import { TextInput } from '@/components/Reusables/Inputs/TextInput';
import { Box, SimpleGrid, Image, Button, Flex, Text, Link } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React from 'react';
import { STATES } from '../utils';
import { createAccountSchema } from '@/utils/validationSchemas/onboarding/createAccountValidations';
import { useAppDispatch } from '@/utils/hooks/useReduxHooks';
import { POST_CREATE_ACCOUNTS_ACTION } from 'store/onboarding/actions';
import { useOnboardingState } from 'store/onboarding/slice';
import { PageLoader } from '@/components/Reusables/Loaders/PageLoader';
// import { useReCaptcha } from 'next-recaptcha-v3';

const CreateAccount = () => {
  const dispatch = useAppDispatch();
  const { loading, createAccount } = useOnboardingState();
  // Import 'executeRecaptcha' using 'useReCaptcha' hook
  // const { executeRecaptcha } = useReCaptcha();
  return (
    <>
      {loading?.includes('POST_CREATE_ACCOUNTS') && <PageLoader />}
      <Header />

      <Box
        w="100%"
        h="100%"
        bgImage={"url('images/pngs/slider-two.png')"}
        bgPosition="center"
        bgSize="cover"
        py={10}
        p={{ base: '10px', md: '10px' }}>
        <CardWrapper
          pageTitle={'Create Account'}
          title={'Welcome, get started on joining our growing members'}
          width={{ sm: '515px', md: '818px' }}>
          {createAccount?.successStatus && (
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
          )}
          <Formik
            initialValues={{
              firstname: '',
              lastname: '',
              phoneNumber: '',
              email: '',
              address: '',
              city: '',
              state: '',
            }}
            onSubmit={async values => {
              const payload = {
                firstName: values.firstname,
                lastName: values.lastname,
                address: values.address,
                city: values.city,
                state: values.state,
                email: values.email,
                phoneNumber: values.phoneNumber,
              };

              // console.log('payload', payload);
              // Generate ReCaptcha token
              // await executeRecaptcha('form_submit');
              // console.log('token', token);
              dispatch(POST_CREATE_ACCOUNTS_ACTION(payload));
            }}
            validationSchema={createAccountSchema}>
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
                  <SimpleGrid columns={{ sm: 1, md: 2 }} spacing={10} p={5}>
                    <TextInput
                      name="firstname"
                      label="FIRST NAME"
                      value={values?.firstname}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      hasError={errors?.firstname && touched?.firstname}
                      error={errors?.firstname}>
                      <Image src={'/images/svgs/form-user-icon.svg'} alt={'avatar-icon'} />
                    </TextInput>
                    <TextInput
                      name="lastname"
                      label="LAST NAME"
                      value={values?.lastname}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      hasError={errors?.lastname && touched?.lastname}
                      error={errors?.lastname}>
                      <Image src="images/svgs/form-user-icon.svg" alt={'avatar-icon'} />
                    </TextInput>
                  </SimpleGrid>
                  <SimpleGrid columns={1} spacing={10} p={5}>
                    <TextInput
                      name="phoneNumber"
                      label="COMPANY PHONE NUMBER"
                      value={values?.phoneNumber}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      hasError={errors?.phoneNumber && touched?.phoneNumber}
                      error={errors?.phoneNumber}
                      maxLength={11}>
                      <Image src="images/svgs/form-phone-icon.svg" alt={'phone-icon'} />
                    </TextInput>
                  </SimpleGrid>
                  <SimpleGrid columns={1} spacing={10} p={5}>
                    <TextInput
                      name="email"
                      label="COMPANY EMAIL"
                      value={values?.email}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      hasError={errors?.email && touched?.email}
                      error={errors?.email}>
                      <>
                        <Image src="images/svgs/form-mail-icon.svg" alt={'mail-icon'} />
                      </>
                    </TextInput>
                  </SimpleGrid>
                  <SimpleGrid columns={1} spacing={10} p={5}>
                    <TextInput
                      name="address"
                      label="COMPANY ADDRESS"
                      value={values?.address}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      hasError={errors?.address && touched?.address}
                      error={errors?.address}>
                      <>
                        <Image src="images/svgs/form-map-pin-icon.svg" alt={'map-pin-icon'} />
                      </>
                    </TextInput>
                  </SimpleGrid>
                  <SimpleGrid columns={{ sm: 1, md: 2 }} spacing={10} p={5}>
                    <TextInput
                      name="city"
                      label="CITY"
                      value={values?.city}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      hasError={errors?.city && touched?.city}
                      error={errors?.city}>
                      <Image src="images/svgs/form-map-pin-icon.svg" alt={'map-pin-icon'} />
                    </TextInput>
                    <SelectField
                      name={'state'}
                      label={'STATE'}
                      value={values?.state}
                      options={STATES}
                      onChange={e => {
                        handleChange(e);
                      }}
                      hasError={errors?.state && touched?.state}
                      error={errors?.state}
                    />
                  </SimpleGrid>
                  <Flex alignItems={'center'} justifyContent={'center'} mt={5} mb={5} id="recaptcha"></Flex>
                  <Flex alignItems={'center'} justifyContent={'center'} mt={5} mb={5}>
                    <Button
                      bg="brand.black"
                      color="brand.white"
                      type="submit"
                      p="5"
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
                      Create Account
                    </Button>
                  </Flex>
                  <Text color={'#4F4F4F'} letterSpacing={'0.02em'} textAlign={'center'}>
                    Are you already a member?{' '}
                    <Link
                      color={'brand.text'}
                      fontSize={'16px'}
                      lineHeight={'20px'}
                      fontWeight={600}
                      letterSpacing={'0.03em'}
                      href={'/sign-in'}
                      style={{
                        color: 'brand.text',
                        textDecoration: 'none',
                      }}>
                      Sign in
                    </Link>
                  </Text>
                </Form>
              );
            }}
          </Formik>
        </CardWrapper>
      </Box>
    </>
  );
};

export default CreateAccount;
