import { Packages } from '@/utils/types';
import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { useDashboardState } from 'store/dashboard/slice';

type Props = {
  goBack: () => void;
  packageDetails: Packages;
};
export const PackageDetailsScreen = ({ goBack, packageDetails }: Props) => {
  const { pickupRiderDetails, deliveryRiderDetails } = useDashboardState();
  return (
    <Box
      w={{ md: '452px', sm: '100%' }}
      position={'absolute'}
      // h={'100vh'}
      top={5}
      right={{ md: 5, sm: 1 }}
      bg={'rgba(255, 255, 255, 0.9)'}>
      <Flex
        px={5}
        py={2}
        borderBottom={'1px'}
        borderBottomColor={'#BDBDBD'}
        w={'100%'}
        alignItems={'center'}
        justifyContent={'space-between'}>
        <Text
          cursor={'pointer'}
          fontSize={'12px'}
          lineHeight={'14.52px'}
          letterSpacing={'3%'}
          color={'brand.text'}
          onClick={() => {
            goBack();
          }}>
          Back
        </Text>
        <Text fontWeight={600} fontSize={"12px"} lineHeight={"14.52px"}>
          Order Picked Up
        </Text>
      </Flex>
      <Flex flexDir={"column"} px={5} py={2} borderBottom={'1px'} borderBottomColor={'#BDBDBD'} w={'100%'} gap={3}>
        <Text fontWeight={600} fontSize={'10px'} lineHeight={'12.1px'} color={'#A9A9A9'}>
          PACKAGE DETAILS
        </Text>
        <Flex flexDir={'column'} gap={2}>
          <Text fontSize={'12px'} lineHeight={'14.52px'} color={'#A9A9A9'}>
            Package description
          </Text>
          <Text>{packageDetails.packageDescription}</Text>
        </Flex>
        <Flex flexDir={'column'} gap={2}>
          <Text fontSize={'12px'} lineHeight={'14.52px'} color={'#A9A9A9'}>
            Note
          </Text>
          <Text fontSize={"14px"} lineHeight={"16.94px"}>
            {packageDetails.notes ?? 'Delivery should be swift, customer needs package urgently.'}
          </Text>
        </Flex>
      </Flex>
      <Flex flexDir={"column"} px={5} py={2} borderBottom={'1px'} borderBottomColor={'#BDBDBD'} w={'100%'} gap={3}>
        <Text fontWeight={600} fontSize={'10px'} lineHeight={'12.1px'} color={'#A9A9A9'}>
          PICKUP ADDRESS
        </Text>
        <Text fontSize={'14px'} lineHeight={'16.94px'}>
          {packageDetails.pickUpAddress}
        </Text>
        <Flex flexDir={'column'} gap={2}>
          <Text fontSize={'10px'} lineHeight={'12.1px'} color={'#828282'} fontWeight={600}>
            {`${packageDetails.customerFirstName} ${packageDetails.customerLastName}`}
          </Text>
          <Text fontSize={'10px'} lineHeight={'12.1px'} color={'#BDBDBD'} fontWeight={600}>
            {packageDetails.customerPhoneNumber}
          </Text>
        </Flex>
      </Flex>
      <Flex flexDir={"column"} px={5} py={2} borderBottom={'1px'} borderBottomColor={'#BDBDBD'} w={'100%'} gap={3}>
        <Text fontWeight={600} fontSize={'10px'} lineHeight={'12.1px'} color={'#A9A9A9'}>
          PICKUP RIDER DETAILS
        </Text>
        <Text fontSize={'14px'} lineHeight={'16.94px'}>
          {pickupRiderDetails.fullName}
        </Text>
        <Flex flexDir={'column'} gap={2}>
          <Text fontSize={'10px'} lineHeight={'12.1px'} color={'#828282'} fontWeight={600}>
            {pickupRiderDetails.phoneNumber}
          </Text>
          <Text fontSize={'10px'} lineHeight={'12.1px'} color={'#BDBDBD'} fontWeight={600}>
            {pickupRiderDetails.bikeRegistrationNumber}
          </Text>
        </Flex>
      </Flex>
      <Flex flexDir={"column"} px={5} py={2} borderBottom={'1px'} borderBottomColor={'#BDBDBD'} w={'100%'} gap={3}>
        <Text fontWeight={600} fontSize={'10px'} lineHeight={'12.1px'} color={'#A9A9A9'}>
          DELIVERY ADDRESS
        </Text>
        <Text fontSize={'14px'} lineHeight={'16.94px'}>
          {packageDetails.deliveryAddress}
        </Text>
        <Flex flexDir={'column'} gap={2}>
          <Text fontSize={'10px'} lineHeight={'12.1px'} color={'#828282'} fontWeight={600}>
            {`${packageDetails.customerFirstName} ${packageDetails.customerLastName}`}
          </Text>
          <Text fontSize={'10px'} lineHeight={'12.1px'} color={'#BDBDBD'} fontWeight={600}>
            {packageDetails.customerPhoneNumber}
          </Text>
        </Flex>
      </Flex>
      <Flex flexDir={"column"} px={5} py={2} mb={5} w={'100%'} gap={3}>
        <Text fontWeight={600} fontSize={'10px'} lineHeight={'12.1px'} color={'#A9A9A9'}>
          DELIVERY RIDER DETAILS
        </Text>
        <Text fontSize={'14px'} lineHeight={'16.94px'}>
          {deliveryRiderDetails.fullName}
        </Text>
        <Flex flexDir={'column'} gap={2}>
          <Text fontSize={'10px'} lineHeight={'12.1px'} color={'#828282'} fontWeight={600}>
            {deliveryRiderDetails.phoneNumber}
          </Text>
          <Text fontSize={'10px'} lineHeight={'12.1px'} color={'#BDBDBD'} fontWeight={600}>
            {deliveryRiderDetails.bikeRegistrationNumber}
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};
