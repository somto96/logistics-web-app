import React from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  Flex,
  Text,
  Box,
  Image,
  Button,
  //   Link,
} from '@chakra-ui/react';
import { Packages } from '../../utils/types';
import { packageDetailsTitleAndDescription } from '../../utils/index';
import { ToastNotify } from '../../utils/helperFunctions/toastNotify';
import { useAuthState } from '../../store/auth/slice';
import dayjs from '../../utils/dayjsLib';
import { useDashboardState } from 'store/dashboard/slice';
// import { useRouter } from 'next/router';

type Props = {
  isOpen: boolean;
  onClose: any;
  showTrackingInfo: any;
  bg: string;
  item: Packages;
};

export const PackageDetailsView = ({ isOpen, onClose, item, bg, showTrackingInfo }: Props) => {
  const {
    loginData,
  } = useAuthState();
  //   const router = useRouter();
  const { pickupRiderDetails, deliveryRiderDetails } = useDashboardState();
  return (
    <>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent
          sx={{
            backgroundColor: 'brand.white',
          }}>
          <DrawerCloseButton
            size={'lg'}
            sx={{
              color: 'brand.text',
            }}
          />
          <DrawerHeader bg={bg} px={0}>
            <Flex flexDir={'column'} alignItems={'center'} w={'100%'}>
              <Flex flexDir={'column'} p={4} justifyContent={'flex-start'} w={'100%'} gap={3}>
                <Text
                  fontWeight={'500'}
                  fontSize={'16px'}
                  lineHeight={'18px'}
                  letterSpacing={'0.03em'}
                  color={
                    item?.status?.toLowerCase() === 'availableforpickup'
                      ? 'brand.text'
                      : 'brand.white'
                  }>
                  {packageDetailsTitleAndDescription(item?.status?.toLowerCase())?.title}
                </Text>
                <Text
                  fontSize={'12px'}
                  lineHeight={'14px'}
                  letterSpacing={'0.03em'}
                  color={
                    item?.status?.toLowerCase() === 'availableforpickup'
                      ? 'brand.text'
                      : 'brand.white'
                  }>
                  {packageDetailsTitleAndDescription(item?.status?.toLowerCase())?.sub}
                </Text>
              </Flex>
            </Flex>
          </DrawerHeader>
          <DrawerBody bg={'brand.white'} px={0}>
            <Flex
              alignItems={'center'}
              justifyContent={'space-between'}
              cursor={'pointer'}
              w={'100%'}
              px={4}
              py={2}
              bg={'#F2F2F2'}
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(item?.trackingNumber);
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
              <Text
                fontSize={'14px'}
                fontWeight={'700'}
                lineHeight={'16px'}
                letterSpacing={'0.02em'}>
                {item?.trackingNumber}
              </Text>
              <Box>
                <Image src="../images/svgs/copy-icon.svg" alt="copy" />
              </Box>
            </Flex>
            <Flex
              flexDir={'column'}
              alignItems={'center'}
              w={'100%'}
              borderBottom={'1px'}
              borderColor={'#828282'}>
              <Flex
                flexDir={'column'}
                px={4}
                py={5}
                justifyContent={'flex-start'}
                w={'100%'}
                gap={2}>
                <Text
                  fontWeight={'500'}
                  fontSize={'14px'}
                  lineHeight={'16px'}
                  letterSpacing={'0.03em'}
                  mb={2}
                  color={'brand.text'}>
                  Delivery details
                </Text>
                <Text
                  fontSize={'12px'}
                  lineHeight={'17px'}
                  letterSpacing={'0.02em'}
                  color={'brand.text'}>
                  {item?.deliveryAddress}
                </Text>
                <Text
                  fontSize={'10px'}
                  lineHeight={'12px'}
                  textTransform={'uppercase'}
                  letterSpacing={'0.03em'}
                  color={'#828282'}>
                  {`${item?.customerFirstName} ${item?.customerLastName}`}
                </Text>
                <Text
                  fontWeight={'600'}
                  fontSize={'10px'}
                  lineHeight={'12px'}
                  textTransform={'uppercase'}
                  letterSpacing={'0.03em'}
                  color={'#828282'}>
                  {item?.customerPhoneNumber}
                </Text>
              </Flex>
            </Flex>
            <Flex
              flexDir={'column'}
              alignItems={'center'}
              w={'100%'}
              borderBottom={'1px'}
              borderColor={'#828282'}>
              <Flex
                flexDir={'column'}
                px={4}
                py={5}
                justifyContent={'flex-start'}
                w={'100%'}
                gap={2}>
                <Text
                  fontWeight={'500'}
                  fontSize={'14px'}
                  lineHeight={'16px'}
                  letterSpacing={'0.03em'}
                  mb={2}
                  color={'brand.text'}>
                  Pickup details
                </Text>
                <Text
                  fontSize={'12px'}
                  lineHeight={'17px'}
                  letterSpacing={'0.02em'}
                  color={'brand.text'}>
                  {item?.pickUpAddress}
                </Text>
                <Text
                  fontSize={'10px'}
                  lineHeight={'12px'}
                  textTransform={'uppercase'}
                  letterSpacing={'0.03em'}
                  color={'#828282'}>
                  {loginData?.user?.name}
                </Text>
                <Text
                  fontWeight={'600'}
                  fontSize={'10px'}
                  lineHeight={'12px'}
                  textTransform={'uppercase'}
                  letterSpacing={'0.03em'}
                  color={'#828282'}>
                  {loginData?.user?.phoneNumber}
                </Text>
              </Flex>
            </Flex>
            <Flex
              alignItems={'center'}
              justifyContent={'center'}
              w={'100%'}
              p={4}
              borderBottom={'1px'}
              borderColor={'#828282'}>
              <Box>
                <Button
                  bg="brand.text"
                  color="brand.white"
                  p="5"
                  fontSize="14px"
                  style={{
                    borderRadius: '20px',
                    lineHeight: '22px',
                  }}
                  _hover={{
                    backgroundColor: 'brand.text',
                  }}
                  _active={{
                    backgroundColor: 'brand.text',
                  }}
                  cursor={'pointer'}
                  onClick={() => {
                    showTrackingInfo();
                    onClose();
                  }}
                >
                  Track Package
                </Button>
              </Box>
            </Flex>
            <Flex
              flexDir={'column'}
              alignItems={'center'}
              w={'100%'}
              borderBottom={'1px'}
              borderColor={'#828282'}>
              <Flex
                flexDir={'column'}
                px={4}
                py={5}
                justifyContent={'flex-start'}
                w={'100%'}
                gap={2}>
                <Text
                  fontWeight={'500'}
                  fontSize={'14px'}
                  lineHeight={'16px'}
                  letterSpacing={'0.03em'}
                  mb={2}
                  color={'brand.text'}>
                  Package details
                </Text>
                <Flex alignItems={'center'} gap={4}>
                  <Flex flexDir={'column'} justifyContent={'center'}>
                    <Text
                      fontSize={'12px'}
                      lineHeight={'15px'}
                      letterSpacing={'0.03em'}
                      color={'#828282'}>
                      Date created
                    </Text>
                    <Text
                      fontSize={'14px'}
                      lineHeight={'17px'}
                      letterSpacing={'0.03em'}
                      color={'brand.text'}>
                      {dayjs(item?.pickupDate).format('DD/MM/YYYY')}
                    </Text>
                  </Flex>
                  <Flex flexDir={'column'} justifyContent={'center'}>
                    <Text
                      fontSize={'12px'}
                      lineHeight={'15px'}
                      letterSpacing={'0.03em'}
                      color={'#828282'}>
                      Expected delivery
                    </Text>
                    <Text
                      fontSize={'14px'}
                      lineHeight={'17px'}
                      letterSpacing={'0.03em'}
                      color={'brand.text'}>
                      {dayjs(item?.expectedDeliveryDate).format('DD/MM/YYYY')}
                    </Text>
                  </Flex>
                </Flex>
                <Flex flexDir={'column'} justifyContent={'center'}>
                  <Text
                    fontSize={'12px'}
                    lineHeight={'15px'}
                    letterSpacing={'0.03em'}
                    color={'#828282'}>
                    Package description
                  </Text>
                  <Text
                    fontSize={'14px'}
                    lineHeight={'17px'}
                    letterSpacing={'0.03em'}
                    color={'brand.text'}>
                    {item?.packageDescription}
                  </Text>
                </Flex>
                <Flex flexDir={'column'} justifyContent={'center'} mb={2}>
                  <Text
                    fontSize={'12px'}
                    lineHeight={'15px'}
                    letterSpacing={'0.03em'}
                    color={'#828282'}>
                    Note
                  </Text>
                  <Text
                    fontSize={'14px'}
                    lineHeight={'18px'}
                    letterSpacing={'0.03em'}
                    color={'brand.text'}>
                    Delivery should be swift, customer needs package urgently.
                  </Text>
                </Flex>
              </Flex>
            </Flex>
            <Flex
              flexDir={'column'}
              alignItems={'center'}
              w={'100%'}
              borderBottom={'1px'}
              borderColor={'#828282'}>
              <Flex
                flexDir={'column'}
                px={4}
                py={5}
                justifyContent={'flex-start'}
                w={'100%'}
                gap={2}>
                <Text
                  fontWeight={'500'}
                  fontSize={'14px'}
                  lineHeight={'16px'}
                  letterSpacing={'0.03em'}
                  mb={2}
                  color={'brand.text'}>
                  Pickup rider details
                </Text>
                <Text
                  fontSize={'14px'}
                  lineHeight={'17px'}
                  letterSpacing={'0.02em'}
                  color={'brand.text'}>
                  {pickupRiderDetails.fullName}
                </Text>
                <Text
                  fontWeight={'600'}
                  fontSize={'10px'}
                  lineHeight={'12px'}
                  textTransform={'uppercase'}
                  letterSpacing={'0.03em'}
                  color={'#828282'}>
                  {pickupRiderDetails.phoneNumber}
                </Text>
                <Text
                  fontWeight={'600'}
                  fontSize={'10px'}
                  lineHeight={'12px'}
                  textTransform={'uppercase'}
                  letterSpacing={'0.03em'}
                  color={'#828282'}>
                  {pickupRiderDetails.bikeRegistrationNumber}
                </Text>
              </Flex>
            </Flex>
            <Flex
              flexDir={'column'}
              alignItems={'center'}
              w={'100%'}
              borderBottom={'1px'}
              borderColor={'#828282'}>
              <Flex
                flexDir={'column'}
                px={4}
                py={5}
                justifyContent={'flex-start'}
                w={'100%'}
                gap={2}>
                <Text
                  fontWeight={'500'}
                  fontSize={'14px'}
                  lineHeight={'16px'}
                  letterSpacing={'0.03em'}
                  mb={2}
                  color={'brand.text'}>
                  Delivery rider details
                </Text>
                <Text
                  fontSize={'14px'}
                  lineHeight={'17px'}
                  letterSpacing={'0.02em'}
                  color={'brand.text'}>
                  {deliveryRiderDetails.fullName}
                </Text>
                <Text
                  fontWeight={'600'}
                  fontSize={'10px'}
                  lineHeight={'12px'}
                  textTransform={'uppercase'}
                  letterSpacing={'0.03em'}
                  color={'#828282'}>
                  {deliveryRiderDetails.phoneNumber}
                </Text>
                <Text
                  fontWeight={'600'}
                  fontSize={'10px'}
                  lineHeight={'12px'}
                  textTransform={'uppercase'}
                  letterSpacing={'0.03em'}
                  color={'#828282'}>
                  {deliveryRiderDetails.bikeRegistrationNumber}
                </Text>
              </Flex>
            </Flex>
            <Flex
              alignItems={'center'}
              justifyContent={'center'}
              w={'100%'}
              p={4}
              borderBottom={'1px'}
              borderColor={'#828282'}>
              <Box>
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
                  // onClick={() => router.push('/add-new-delivery')}
                >
                  Cancel delivery
                </Button>
              </Box>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
