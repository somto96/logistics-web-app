import React from 'react';
import { ModalComponent } from '../Reusables/Modals/ModalComponent';
import { Box, Flex, Text, Image, Button } from '@chakra-ui/react';
import { setCreateDeliveryStatus, useDashboardState } from 'store/dashboard/slice';
import { ToastNotify } from '@/utils/helperFunctions/toastNotify';
import { useDispatch } from 'react-redux';
import { useFetchPackages } from '@/utils/hooks/Dashboard/Company/useFetchPackages';

type SuccessModalProps = {
  isOpen: boolean;
  onClose: any;
};

export const SuccessModal = ({ isOpen = false, onClose }: SuccessModalProps) => {
  const dispatch = useDispatch();
  const { createNewDelivery, deliveryAddressAndReceiver, pickupAddressAndSender } =
    useDashboardState();
  const { handleFetchPackages } = useFetchPackages();
  return (
    <ModalComponent size={'full'} isOpen={isOpen} onClose={() => onClose(false)} showCloseBtn={false}>
      <Flex flexDir={'column'} gap={4}>
        <Flex
          borderBottom={'1px'}
          borderColor={'#BDBDBD'}
          justifyContent={'center'}
          alignItems={'center'}
          p={5}>
          <Text fontSize={'20px'} lineHeight={'24.2px'} color={'#219653'}>
            New delivery successfully created
          </Text>
        </Flex>
        <Flex
          borderBottom={'1px'}
          borderColor={'#BDBDBD'}
          flexDir={'column'}
          alignItems={'flex-start'}
          p={5}
          gap={2}>
          <Text fontWeight={600} fontSize={'14px'} letterSpacing={'3%'} lineHeight={'16px'}>
            Delivery details
          </Text>
          <Text fontSize={'16px'} letterSpacing={'2%'} lineHeight={'19.36px'}>
            {deliveryAddressAndReceiver?.deliveryAddress}
          </Text>
          <Text fontSize={'14px'} lineHeight={'16.94px'} letterSpacing={'3%'} color={'#828282'}>
            {`${deliveryAddressAndReceiver?.receiverFirstname} ${deliveryAddressAndReceiver?.receiverLastname}`}
          </Text>
          <Text
            fontSize={'12px'}
            fontWeight={600}
            lineHeight={'14.52px'}
            letterSpacing={'3%'}
            color={'#828282'}>
            {deliveryAddressAndReceiver?.receiverPhoneNumber}
          </Text>
        </Flex>
        <Flex
          borderBottom={'1px'}
          borderColor={'#BDBDBD'}
          flexDir={'column'}
          alignItems={'flex-start'}
          p={5}
          gap={2}>
          <Text fontWeight={600} fontSize={'14px'} letterSpacing={'3%'} lineHeight={'16px'}>
            Pickup details
          </Text>
          <Text fontSize={'16px'} letterSpacing={'2%'} lineHeight={'19.36px'}>
            {pickupAddressAndSender?.pickUpAddress}
          </Text>
          <Text fontSize={'14px'} lineHeight={'16.94px'} letterSpacing={'3%'} color={'#828282'}>
            {`${pickupAddressAndSender?.senderFirstname} ${pickupAddressAndSender?.senderLastname}`}
          </Text>
          <Text
            fontSize={'12px'}
            fontWeight={600}
            lineHeight={'14.52px'}
            letterSpacing={'3%'}
            color={'#828282'}>
            {pickupAddressAndSender?.senderPhoneNumber}
          </Text>
        </Flex>
        <Flex flexDir={'column'} alignItems={'center'}>
          <Box>
            <Image
              w={'217px'}
              h={'217px'}
              src={`data:image/png;base64,${createNewDelivery?.successMessage?.qrCode}`}
              alt="qr-code"
            />
          </Box>
        </Flex>
        <Flex
          alignItems={'center'}
          w={'100%'}
          bg={'#F2F2F2'}
          cursor={'pointer'}
          p={2}
          mt={2}
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(
                createNewDelivery?.successMessage?.trackingNumber
              );
              ToastNotify({
                type: 'success',
                message: 'Copied!',
                position: 'top-center',
              });
            } catch (err) {
              ToastNotify({
                type: 'error',
                message: `${err && 'Failed to copy!'}`,
                position: 'top-center',
              });
            }
          }}>
          <Box flexGrow={1}>
            <Text
              fontSize={'16px'}
              lineHeight={'16px'}
              letterSpacing={'5%'}
              fontWeight={700}
              align={'center'}>
              {createNewDelivery?.successMessage?.trackingNumber}
            </Text>
          </Box>
          <Box>
            <Image src="../images/svgs/copy-icon.svg" alt="copy" />
          </Box>
        </Flex>
        <Flex w={'100%'} alignItems={'center'} justifyContent={'center'} gap={3} mb={5}>
          <Button
            bg="brand.white"
            color="brand.text"
            py={3}
            px={10}
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
            onClick={() => window.print()}>
            Print
          </Button>
          <Button
            bg="brand.black"
            color="brand.white"
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
            onClick={() => {
              onClose(false);
              dispatch(
                setCreateDeliveryStatus({
                  successStatus: false,
                  successMessage: {},
                })
              );
              handleFetchPackages({
                pagedQuery: {
                  pageNumber: 1,
                  pageSize: 10,
                },
              });
            }}>
            Done
          </Button>
        </Flex>
      </Flex>
    </ModalComponent>
  );
};
