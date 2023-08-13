import { STATES } from '../../../../../utils/index';
// import { createAccountSchema } from '../../../../../utils/validationSchemas/onboarding/createAccountValidations';
import { SimpleGrid, Flex, Button, Image } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { TextInput } from '../../../../Reusables/Inputs/TextInput';
import { SelectField } from '../../../../Reusables/Inputs/SelectField';
import { CustomersList } from 'store/interfaces';
import { useDashboardState } from 'store/dashboard/slice';
import { useEditCustomerDetails } from '@/utils/hooks/Dashboard/Backoffice/useEditCustomerDetails';

type Props = {
  customer: CustomersList;
};
export const EditCustomersForm = ({ customer }: Props) => {
  const { handleEditCustomerDetails } = useEditCustomerDetails();
  const { loading } = useDashboardState();
  return (
    <>
      <Formik
        initialValues={{
          contactFullName: customer.name ?? '',
          address: customer.address ?? '',
          email: customer.emailAddress.address ?? '',
          city: customer.city ?? '',
          state: customer.state ?? '',
          phoneNumber: customer.phoneNumber ?? '',
        }}
        onSubmit={values => {
          const payload = {
            id: customer.id,
            ...values,
          };
          handleEditCustomerDetails(payload);
        }}>
        {({ handleChange, handleBlur, errors, touched, values }) => {
          return (
            <Form>
              <SimpleGrid columns={1} spacing={10} p={5}>
                <TextInput
                  name="contactFullName"
                  label="CONTACT FULLNAME"
                  value={values?.contactFullName}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  hasError={errors?.contactFullName && touched?.contactFullName}
                  error={errors?.contactFullName}>
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
                <TextInput
                  name="address"
                  label="COMPANY ADDRESS"
                  value={values?.address}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  hasError={errors?.address && touched?.address}
                  error={errors?.address}>
                  <>
                    <Image src="../../../../images/svgs/form-mail-icon.svg" alt={'mail-icon'} />
                  </>
                </TextInput>
              </SimpleGrid>
              <SimpleGrid columns={{ sm: 1, md: 2 }} spacing={10} p={5}>
                <TextInput
                  name="city"
                  label="City"
                  value={values?.city}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  hasError={errors?.city && touched?.city}
                  error={errors?.city}>
                  <>
                    <Image
                      src="../../../../../../images/svgs/form-map-pin-icon.svg"
                      alt={'map-pin-icon'}
                    />
                  </>
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
                  iconSrc="../../../../images/svgs/ChevronDownIcon.svg"
                />
              </SimpleGrid>
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
                  disabled={loading?.includes('update-customer-details')}
                  style={{
                    borderRadius: '20px',
                    lineHeight: '22px',
                  }}>
                  {loading?.includes('update-customer-details') ? 'Saving...' : 'Save Changes'}
                </Button>
              </Flex>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};
