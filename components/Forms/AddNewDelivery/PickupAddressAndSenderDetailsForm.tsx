import { SelectField } from '@/components/Reusables/Inputs/SelectField';
import { TextInput } from '@/components/Reusables/Inputs/TextInput';
import { STATES } from '@/utils/index';
import { SimpleGrid, Flex, Button, Text, Image, Divider } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { pickupAddressAndSenderDetailsSchema } from "../../../utils/validationSchemas/addNewDelivery/pickupAndSenderAddress.validations"
import React from 'react';
import { setPickupDetails } from 'store/dashboard/slice';
import { useDispatch } from 'react-redux';

export const PickupAddressAndSenderDetailsForm = ({ setActive }: any) => {
  const dispatch = useDispatch()
  return (
    <Formik
      initialValues={{
        pickUpAddress: '',
        pickUpCity: '',
        pickUpState: '',
        pickUpLandmark: '',
        senderFirstname: '',
        senderLastname: '',
        senderPhoneNumber: '',
      }}
      onSubmit={async values => {
        setActive((a: number) => a + 1);
        dispatch(setPickupDetails(values));
      }}
      validationSchema={pickupAddressAndSenderDetailsSchema}>
      {({ handleChange, handleBlur, errors, touched, isValid, dirty, values }) => {
        return (
          <Form>
            <Text
              textAlign={'center'}
              fontSize={'24px'}
              fontWeight={'700'}
              lineHeight={'29px'}
              color={'brand.text'}>
              Pickup Address
            </Text>
            <SimpleGrid columns={1} spacing={10} p={5}>
              <TextInput
                name="pickUpAddress"
                label="Pick Up Address"
                value={values?.pickUpAddress}
                handleChange={handleChange}
                handleBlur={handleBlur}
                hasError={errors?.pickUpAddress && touched?.pickUpAddress}
                error={errors?.pickUpAddress}></TextInput>
            </SimpleGrid>
            <SimpleGrid columns={{ sm: 1, md: 2 }} spacing={10} p={5}>
              <TextInput
                name="pickUpCity"
                label="CITY"
                value={values?.pickUpCity}
                handleChange={handleChange}
                handleBlur={handleBlur}
                hasError={errors?.pickUpCity && touched?.pickUpCity}
                error={errors?.pickUpCity}>
                <Image src="../images/svgs/form-map-pin-icon.svg" alt={'map-pin-icon'} />
              </TextInput>
              <SelectField
                name={'pickUpState'}
                label={'STATE'}
                value={values?.pickUpState}
                iconSrc="../images/svgs/ChevronDownIcon.svg"
                options={STATES}
                onChange={e => {
                  handleChange(e);
                }}
                hasError={errors?.pickUpState && touched?.pickUpState}
                error={errors?.pickUpState}
              />
            </SimpleGrid>
            <SimpleGrid columns={1} spacing={10} p={5} mb={4}>
              <TextInput
                name="pickUpLandmark"
                label="Landmark"
                value={values?.pickUpLandmark}
                handleChange={handleChange}
                handleBlur={handleBlur}
                hasError={errors?.pickUpLandmark && touched?.pickUpLandmark}
                error={errors?.pickUpLandmark}></TextInput>
            </SimpleGrid>

            <Divider orientation="horizontal" />

            <Text
              textAlign={'center'}
              fontSize={'24px'}
              fontWeight={'700'}
              lineHeight={'29px'}
              color={'brand.text'}
              mt={4}>
              Sender
            </Text>
            <SimpleGrid columns={{ sm: 1, md: 2 }} spacing={10} p={5}>
              <TextInput
                name="senderFirstname"
                label="First Name"
                value={values?.senderFirstname}
                handleChange={handleChange}
                handleBlur={handleBlur}
                hasError={errors?.senderFirstname && touched?.senderFirstname}
                error={errors?.senderFirstname}></TextInput>
              <TextInput
                name="senderLastname"
                label="Last Name"
                value={values?.senderLastname}
                handleChange={handleChange}
                handleBlur={handleBlur}
                hasError={errors?.senderLastname && touched?.senderLastname}
                error={errors?.senderLastname}></TextInput>
            </SimpleGrid>
            <SimpleGrid columns={1} spacing={10} p={5} mb={4}>
              <TextInput
                name="senderPhoneNumber"
                label="Phone Number"
                value={values?.senderPhoneNumber}
                handleChange={handleChange}
                handleBlur={handleBlur}
                hasError={errors?.senderPhoneNumber && touched?.senderPhoneNumber}
                error={errors?.senderPhoneNumber}
                maxLength={11}></TextInput>
            </SimpleGrid>

            <Flex alignItems={'center'} justifyContent={'flex-end'} mt={5} mb={5}>
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
