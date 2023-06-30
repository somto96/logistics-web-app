import { Flex, Button, SimpleGrid, Text } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import React from 'react';
import { setPackageNotes, useDashboardState } from '../../../store/dashboard/slice';
import { useDispatch } from 'react-redux';
import { TextArea } from '@/components/Reusables/Inputs/TextArea';
import { useCreatePackage } from '@/utils/hooks/Dashboard/useCreatePackage';
import dayjs from '../../../utils/dayjsLib';

export const Notes = ({ setActive, closeModal }: any) => {
  const dispatch = useDispatch();
  const { handleCreatePackage } = useCreatePackage();
  const { pickupAddressAndSender, deliveryAddressAndReceiver, packageDurationAndDescription } =
    useDashboardState();
  //   const [isLargerThan800] = useMediaQuery('(min-width: 800px)');

  return (
    <Formik
      initialValues={{
        notes: '',
      }}
      onSubmit={async values => {
        const payload = {
          ...pickupAddressAndSender,
          ...deliveryAddressAndReceiver,
          ...packageDurationAndDescription,
          numberOfItems: 1,
          weightOfPackage: 1,
          pickUpDate: dayjs(packageDurationAndDescription?.pickUpDate).toISOString(),
          deliveryDate: dayjs(packageDurationAndDescription?.deliveryDate).toISOString(),
        };
        closeModal();
        dispatch(setPackageNotes(values?.notes));
        handleCreatePackage(payload);
      }}>
      {({ handleChange, values }) => {
        return (
          <Form>
            <Text
              textAlign={'center'}
              fontSize={'24px'}
              fontWeight={'700'}
              lineHeight={'29px'}
              color={'brand.text'}>
              Notes
            </Text>
            <SimpleGrid columns={1} spacing={10} p={5} mb={4}>
              <TextArea
                size={'lg'}
                handleChange={handleChange}
                value={values?.notes}
                label={'Notes'}
                name={'notes'}
                placeholder="Type your message here..."
              />
            </SimpleGrid>

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
                }}>
                Create delivery
              </Button>
            </Flex>
          </Form>
        );
      }}
    </Formik>
  );
};
