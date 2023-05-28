import { STATES } from "../../utils/index";
import { createAccountSchema } from "../../utils/validationSchemas/onboarding/createAccountValidations";
import { SimpleGrid, Link, Flex, Button, Image, Text} from "@chakra-ui/react";
import { Formik, Form } from "formik";
// import { POST_CREATE_ACCOUNTS_ACTION } from "../store/onboarding/actions";
import { TextInput } from "../Reusables/Inputs/TextInput";
import { SelectField } from '../Reusables/Inputs/SelectField';
import { useCreateAccountsController } from "controllers/useCreateAccountController";

export const CreateAccountForm = () => {
    const {
        initialValueData,
        handleFormSubmit
    } = useCreateAccountsController();
    return (
        <Formik
        initialValues={initialValueData}
        onSubmit={handleFormSubmit}
        validationSchema={createAccountSchema}>
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
              <SimpleGrid columns={{ sm: 1, md: 2 }} spacing={10} p={5}>
                <TextInput
                  name="contactFullName"
                  label="CONTACT FULLNAME"
                  value={values?.contactFullName}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  hasError={errors?.contactFullName && touched?.contactFullName}
                  error={errors?.contactFullName}>
                  <Image src={'/images/svgs/form-user-icon.svg'} alt={'avatar-icon'} />
                </TextInput>
                <TextInput
                  name="companyName"
                  label="COMPANY NAME"
                  value={values?.companyName}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  hasError={errors?.companyName && touched?.companyName}
                  error={errors?.companyName}>
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
    )
}