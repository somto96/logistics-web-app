import { LOCATIONS } from '../../../../../utils/index';
// import { createAccountSchema } from '../../../../../utils/validationSchemas/onboarding/createAccountValidations';
import { SimpleGrid, Flex, Button, Image } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { TextInput } from '../../../../Reusables/Inputs/TextInput';
import { SelectField } from '../../../../Reusables/Inputs/SelectField';
import { RidersList } from 'store/interfaces';
import { useEditRiderDetails } from '@/utils/hooks/Dashboard/Backoffice/useEditRiderDetails';
import { useDashboardState } from 'store/dashboard/slice';

type Props = {
  rider: RidersList;
};
export const EditRidersForm = ({ rider }: Props) => {
  const { handleEditRiderDetails } = useEditRiderDetails();
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
          fullName: rider.fullName ?? '',
          phoneNumber: rider.phoneNumber ?? '',
          email: rider.email ?? '',
          frequentLocation: rider.frequentLocation ?? '',
          bikeRegistrationNumber: rider.bikeRegistrationNumber ?? '',
          licenseNumber: rider.licenseNumber ?? '',
        }}
        onSubmit={values => {
          const payload = {
            id: rider.id,
            ...values
          };
          handleEditRiderDetails(payload);
        }}>
        {({ handleChange, handleBlur, errors, touched, values }) => {
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
                  disabled={loading?.includes('update-rider-details')}
                  style={{
                    borderRadius: '20px',
                    lineHeight: '22px',
                  }}>
                  {loading?.includes('update-rider-details') ? 'Saving...' : 'Save Changes'}
                </Button>
              </Flex>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};
