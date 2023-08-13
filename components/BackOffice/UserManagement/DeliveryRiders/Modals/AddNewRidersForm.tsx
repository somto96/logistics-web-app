import { LOCATIONS } from '../../../../../utils/index';
// import { createAccountSchema } from '../../../../../utils/validationSchemas/onboarding/createAccountValidations';
import { SimpleGrid, Flex, Button, Image } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
// import { POST_CREATE_ACCOUNTS_ACTION } from "../store/onboarding/actions";
import { TextInput } from '../../../../Reusables/Inputs/TextInput';
import { SelectField } from '../../../../Reusables/Inputs/SelectField';
import { useAddNewRider } from '@/utils/hooks/Dashboard/Backoffice/useAddNewRider';
import { useDashboardState } from 'store/dashboard/slice';
// import { useCreateAccountsController } from 'controllers/useCreateAccountController';

export const AddNewRidersForm = () => {
  const { handleAddNewRider } = useAddNewRider();
  const { loading } = useDashboardState();
  return (
    <>
      <Flex w={'100%'} flexDir={'column'} gap={5} alignItems={'center'} justifyContent={'center'}>
        <Image w={'70px'} h={'70px'} src="../../../images/svgs/user-avatar.svg" alt="avatar" />
        <Button
          size={'sm'}
          py={1.5}
          px={3}
          bg="brand.white"
          color="brand.black"
          border={'1px'}
          borderColor={'brand.black'}
          onClick={() => {
            console.log('add-profile-pic');
          }}
          fontSize="12px"
          fontWeight={400}
          _hover={{
            background: 'brand.white',
            color: 'brand.black',
          }}
          style={{
            borderRadius: '20px',
            lineHeight: '22px',
          }}>
          Add Picture
        </Button>
      </Flex>
      <Formik
        initialValues={{
          fullName: '',
          phoneNumber: '',
          email: '',
          frequentLocation: '',
          bikeRegistrationNumber: '',
          licenseNumber: '',
        }}
        onSubmit={async values => {
          // console.log('values', values);
          handleAddNewRider(values);
        }}
        // validationSchema={}
      >
        {({ handleChange, handleBlur, errors, touched, isValid, dirty, values }) => {
          return (
            <Form>
              <SimpleGrid columns={1} spacing={10} p={5}>
                <TextInput
                  name="fullName"
                  label="CONTACT FULLNAME"
                  value={values?.fullName}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  hasError={errors?.fullName && touched?.fullName}
                  error={errors?.fullName}>
                  <Image src={'../../../../images/svgs/form-user-icon.svg'} alt={'avatar-icon'} />
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
                  <Image src="../../../../images/svgs/form-phone-icon.svg" alt={'phone-icon'} />
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
                    <Image src="../../../../images/svgs/form-mail-icon.svg" alt={'mail-icon'} />
                  </>
                </TextInput>
              </SimpleGrid>
              <SimpleGrid columns={1} spacing={10} p={5}>
                <SelectField
                  name={'frequentLocation'}
                  label={'FREQUENT DELIVERY LOCATION'}
                  value={values?.frequentLocation}
                  options={LOCATIONS}
                  onChange={e => {
                    handleChange(e);
                  }}
                  hasError={errors?.frequentLocation && touched?.frequentLocation}
                  error={errors?.frequentLocation}
                  iconSrc="../../../../images/svgs/ChevronDownIcon.svg"
                />
              </SimpleGrid>
              <SimpleGrid columns={1} spacing={10} p={5}>
                <TextInput
                  name="bikeRegistrationNumber"
                  label="BIKE REGISTRATION NUMBER"
                  value={values?.bikeRegistrationNumber}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  hasError={errors?.bikeRegistrationNumber && touched?.bikeRegistrationNumber}
                  error={errors?.bikeRegistrationNumber}>
                  <>
                    <Image src="../../../../images/svgs/hash.svg" alt={'hash-icon'} />
                  </>
                </TextInput>
              </SimpleGrid>
              <SimpleGrid columns={1} spacing={10} p={5}>
                <TextInput
                  name="licenseNumber"
                  label="RIDER LICENSE NUMBER"
                  value={values?.licenseNumber}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  hasError={errors?.licenseNumber && touched?.licenseNumber}
                  error={errors?.licenseNumber}>
                  <>
                    <Image src="../../../../images/svgs/hash.svg" alt={'hash-icon'} />
                  </>
                </TextInput>
              </SimpleGrid>
              <Flex
                alignItems={'center'}
                justifyContent={'center'}
                mt={5}
                mb={5}
                id="recaptcha"></Flex>
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
                  isDisabled={!(isValid && dirty) || loading?.includes('add-new-rider')}>
                  {loading?.includes('add-new-rider') ? 'Adding...' : 'Add rider'}
                </Button>
              </Flex>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};
