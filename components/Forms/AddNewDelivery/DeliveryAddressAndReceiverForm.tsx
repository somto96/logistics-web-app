import { SelectField } from '@/components/Reusables/Inputs/SelectField';
import { TextInput } from '@/components/Reusables/Inputs/TextInput';
import { STATES } from '@/utils/index';
import { SimpleGrid, Flex, Button, Text, Image, Divider } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { deliveryAddressAndReceiverDetailsSchema } from '../../../utils/validationSchemas/addNewDelivery/deliveryAddressAndReceiverSchema.validations';
import React from 'react';
import { setDeliveryDetails } from 'store/dashboard/slice';
import { useDispatch } from 'react-redux';

export const DeliveryAddressAndReceiverForm = ({ setActive }: any) => {
  const dispatch = useDispatch();
  return (
    <Formik
      initialValues={{
        deliveryAddress: '',
        deliveryCity: '',
        deliveryState: '',
        deliveryLandmark: '',
        receiverFirstname: '',
        receiverLastname: '',
        receiverPhoneNumber: '',
      }}
      onSubmit={async values => {
        setActive((a: number) => a + 1);
        dispatch(setDeliveryDetails(values));
      }}
      validationSchema={deliveryAddressAndReceiverDetailsSchema}>
      {({ handleChange, handleBlur, errors, touched, isValid, dirty, values }) => {
        return (
          <Form>
            <Text
              textAlign={'center'}
              fontSize={'24px'}
              fontWeight={'700'}
              lineHeight={'29px'}
              color={'brand.text'}>
              Delivery Address
            </Text>
            <SimpleGrid columns={1} spacing={10} p={5}>
              <TextInput
                name="deliveryAddress"
                label="Delivery Address"
                value={values?.deliveryAddress}
                handleChange={handleChange}
                handleBlur={handleBlur}
                hasError={errors?.deliveryAddress && touched?.deliveryAddress}
                error={errors?.deliveryAddress}></TextInput>
            </SimpleGrid>
            <SimpleGrid columns={{ sm: 1, md: 2 }} spacing={10} p={5}>
              <TextInput
                name="deliveryCity"
                label="CITY"
                value={values?.deliveryCity}
                handleChange={handleChange}
                handleBlur={handleBlur}
                hasError={errors?.deliveryCity && touched?.deliveryCity}
                error={errors?.deliveryCity}>
                <Image src="../images/svgs/form-map-pin-icon.svg" alt={'map-pin-icon'} />
              </TextInput>
              <SelectField
                name={'deliveryState'}
                label={'STATE'}
                value={values?.deliveryState}
                iconSrc="../images/svgs/ChevronDownIcon.svg"
                options={STATES}
                onChange={e => {
                  handleChange(e);
                }}
                hasError={errors?.deliveryState && touched?.deliveryState}
                error={errors?.deliveryState}
              />
            </SimpleGrid>
            <SimpleGrid columns={1} spacing={10} p={5} mb={4}>
              <TextInput
                name="deliveryLandmark"
                label="Landmark"
                value={values?.deliveryLandmark}
                handleChange={handleChange}
                handleBlur={handleBlur}
                hasError={errors?.deliveryLandmark && touched?.deliveryLandmark}
                error={errors?.deliveryLandmark}></TextInput>
            </SimpleGrid>

            <Divider orientation="horizontal" />

            <Text
              textAlign={'center'}
              fontSize={'24px'}
              fontWeight={'700'}
              lineHeight={'29px'}
              color={'brand.text'}
              mt={4}>
              Receiver
            </Text>
            <SimpleGrid columns={{ sm: 1, md: 2 }} spacing={10} p={5}>
              <TextInput
                name="receiverFirstname"
                label="First Name"
                value={values?.receiverFirstname}
                handleChange={handleChange}
                handleBlur={handleBlur}
                hasError={errors?.receiverFirstname && touched?.receiverFirstname}
                error={errors?.receiverFirstname}></TextInput>
              <TextInput
                name="receiverLastname"
                label="Last Name"
                value={values?.receiverLastname}
                handleChange={handleChange}
                handleBlur={handleBlur}
                hasError={errors?.receiverLastname && touched?.receiverLastname}
                error={errors?.receiverLastname}></TextInput>
            </SimpleGrid>
            <SimpleGrid columns={1} spacing={10} p={5} mb={4}>
              <TextInput
                name="receiverPhoneNumber"
                label="Phone Number"
                value={values?.receiverPhoneNumber}
                handleChange={handleChange}
                handleBlur={handleBlur}
                hasError={errors?.receiverPhoneNumber && touched?.receiverPhoneNumber}
                error={errors?.receiverPhoneNumber}
                maxLength={11}></TextInput>
            </SimpleGrid>

            <Flex alignItems={'center'} justifyContent={'space-around'} mt={5} mb={5}>
              <Button
                bg="brand.white"
                color="brand.text"
                // px={5}
                fontSize="14px"
                style={{
                  borderRadius: '20px',
                  lineHeight: '22px',
                }}
                _hover={{
                  backgroundColor: 'brand.white',
                }}
                _active={{
                  backgroundColor: 'brand.white',
                }}
                cursor={'pointer'}
                border={'1px'}
                borderColor={'brand.text'}
                onClick={() => setActive((a: number) => a - 1)}>
                Previous
              </Button>
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
                isDisabled={!(isValid && dirty)}>
                Next
              </Button>
            </Flex>
          </Form>
        );
      }}
    </Formik>
  );
};
