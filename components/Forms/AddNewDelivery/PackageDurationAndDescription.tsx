import { DateInput } from '@/components/Reusables/Inputs/DateInput';
import { Flex, Button, SimpleGrid, Divider, Text, useMediaQuery } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import React, { useState } from 'react';
import { PACKAGE_DESCRIPTIONS, PackageDescriptions } from '@/utils/index';
import { setPackageDurationAndDescription } from '../../../store/dashboard/slice';
import { useDispatch } from 'react-redux';
import { packageDurationAndDescriptionSchema } from '@/utils/validationSchemas/addNewDelivery/packageDurationAndDescription.validations';

export const PackageDurationAndDescription = ({ setActive }: any) => {
  const dispatch = useDispatch();
  const [isLargerThan800] = useMediaQuery('(min-width: 800px)');
  const [selectedPackageDescription, setSelectedPackageDescription] = useState<string>("");

  return (
    <Formik
      initialValues={{
        pickUpDate: '',
        deliveryDate: '',
      }}
      onSubmit={async values => {
        setActive((a: number) => a + 1);
        const payload = {
          ...values,
          packageDescriptions: selectedPackageDescription,
        };
        dispatch(setPackageDurationAndDescription(payload));
      }}
      validationSchema={packageDurationAndDescriptionSchema}>
      {({ handleChange, handleBlur, errors, touched, isValid, dirty, values }) => {
        return (
          <Form>
            <Text
              textAlign={'center'}
              fontSize={'24px'}
              fontWeight={'700'}
              lineHeight={'29px'}
              color={'brand.text'}>
              Package delivery duration
            </Text>
            <SimpleGrid columns={{ sm: 1, md: 2 }} spacing={10} p={5} mb={8}>
              <DateInput
                name="pickUpDate"
                label="PickUp Date"
                value={values?.pickUpDate}
                handleChange={handleChange}
                handleBlur={handleBlur}
                hasError={errors?.pickUpDate && touched?.pickUpDate}
                error={errors?.pickUpDate}
              />
              <DateInput
                name="deliveryDate"
                label="Expected Delivery Date"
                value={values?.deliveryDate}
                handleChange={handleChange}
                handleBlur={handleBlur}
                hasError={errors?.deliveryDate && touched?.deliveryDate}
                error={errors?.deliveryDate}
              />
            </SimpleGrid>

            <Divider orientation="horizontal" />

            <Text
              textAlign={'center'}
              fontSize={'24px'}
              fontWeight={'700'}
              lineHeight={'29px'}
              color={'brand.text'}
              mt={4}
              mb={4}>
              Package description
            </Text>
            <Flex alignItems={'center'} gap={8} flexWrap={'wrap'} mb={8}>
              {PACKAGE_DESCRIPTIONS?.map((item: PackageDescriptions) => (
                <Flex
                  key={item?.id}
                  bg={
                    selectedPackageDescription?.includes(item?.value)
                      ? 'brand.text'
                      : 'brand.white'
                  }
                  borderRadius={'20px'}
                  border={'1px'}
                  borderColor={'brand.text'}
                  alignItems={'center'}
                  px={3}
                  py={1}
                  justifyContent={'center'}
                  cursor={'pointer'}
                  width={!isLargerThan800 ? '100%' : 'auto'}
                  onClick={() =>
                    setSelectedPackageDescription(item?.value)
                  }>
                  <Text
                    fontSize={'16px'}
                    lineHeight={'43px'}
                    letterSpacing={'-0.011em'}
                    color={
                      selectedPackageDescription?.includes(item?.value)
                        ? 'brand.white'
                        : 'brand.text'
                    }>
                    {item?.title}
                  </Text>
                </Flex>
              ))}
              {selectedPackageDescription === "" && (
                <Flex flexDir={'row'} gap={2}>
                  <Text color={'brand.error'} fontSize={'12px'}>
                    Please select a package description
                  </Text>
                </Flex>
              )}
            </Flex>

            <Divider orientation="horizontal" />

            <Flex alignItems={'center'} justifyContent={'space-around'} mt={8} mb={5}>
              <Button
                bg="brand.white"
                color="brand.text"
                p="5"
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
                isDisabled={!(isValid && dirty) || selectedPackageDescription === ""}>
                Next
              </Button>
            </Flex>
          </Form>
        );
      }}
    </Formik>
  );
};
