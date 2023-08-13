import { statusType } from '@/utils/index';
import { Packages } from '@/utils/types';
import { Tbody, Tr, Td, Flex, Box, Text } from '@chakra-ui/react';
import dayjs from 'dayjs';
import React from 'react';

type PackageTableBodyProps = {
  data: Packages[];
  handleClick: (item: Packages) => void;
};
export const PackageTableBody = ({ data, handleClick }: PackageTableBodyProps) => {
  // console.log('test', data);
  return (
    <>
      {data?.length ? (
        <Tbody>
          {data?.map(item => (
            <Tr
              key={item?.id}
              onClick={() => handleClick(item)}
              cursor={'pointer'}
              _hover={{
                backgroundColor: '#F2F2F2',
              }}>
              <Td
                fontSize={'14px'}
                fontWeight={'700'}
                lineHeight={'14px'}
                color={'brand.text'}
                letterSpacing={'0.02em'}>
                {item?.trackingNumber}
              </Td>
              <Td>
                <Flex flexDir={'column'} justifyContent={'flex-start'} gap={2}>
                  <Text
                    fontSize={'14px'}
                    fontWeight={'700'}
                    lineHeight={'14px'}
                    color={'brand.text'}>
                    {`${item?.pickUpCity}, ${item?.pickUpState}`}
                  </Text>

                  <Text
                    fontSize={'12px'}
                    fontWeight={'600'}
                    lineHeight={'15px'}
                    letterSpacing={'0.02em'}
                    color={'#C4C4C4'}>{`${dayjs(item?.pickupDate)
                    .format('ddd')
                    ?.toUpperCase()}  ${dayjs(item?.pickupDate).format('DD/MM/YYYY')}`}</Text>
                </Flex>
              </Td>
              <Td>
                <Flex flexDir={'column'} gap={2}>
                  <Text
                    fontSize={'14px'}
                    fontWeight={'700'}
                    lineHeight={'14px'}
                    color={'brand.text'}>
                    {`${item?.deliveryCity}, ${item?.deliveryState}`}
                  </Text>
                  <Text
                    fontSize={'12px'}
                    fontWeight={'600'}
                    lineHeight={'15px'}
                    letterSpacing={'0.02em'}
                    color={'#C4C4C4'}>{`${dayjs(item?.expectedDeliveryDate)
                    .format('ddd')
                    ?.toUpperCase()}  ${dayjs(item?.expectedDeliveryDate).format(
                    'DD/MM/YYYY'
                  )}`}</Text>
                </Flex>
              </Td>
              <Td
                fontSize={'14px'}
                fontWeight={'700'}
                lineHeight={'14px'}
                color={'brand.text'}
                letterSpacing={'0.02em'}>
                {`${item?.customerFirstName} ${item?.customerLastName}`}
              </Td>
              <Td
                fontSize={'14px'}
                fontWeight={'700'}
                lineHeight={'14px'}
                color={'brand.text'}
                letterSpacing={'0.02em'}>
                <Box
                  bg={statusType(item?.status?.toLowerCase())}
                  border={'1px'}
                  borderRadius={'20px'}
                  borderColor={
                    item?.status?.toLowerCase() === 'availableforpickup'
                      ? 'brand.text'
                      : statusType(item?.status?.toLowerCase())
                  }
                  p={2}
                  color={
                    item?.status?.toLowerCase() === 'availableforpickup'
                      ? 'brand.text'
                      : 'brand.white'
                  }
                  fontSize={'14px'}
                  lineHeight={'16px'}
                  fontWeight={'500'}>
                  {item?.status}
                </Box>
              </Td>
            </Tr>
          ))}
        </Tbody>
      ) : (
        <Tbody>
          <Tr>
            <Flex alignItems={'center'} justifyContent={'center'} p={5}>
              <Text>No packages available</Text>
            </Flex>
          </Tr>
        </Tbody>
      )}
    </>
  );
};
