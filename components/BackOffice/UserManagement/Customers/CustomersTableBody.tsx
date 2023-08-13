import { Tbody, Tr, Td, Flex, Box, Text, Image } from '@chakra-ui/react';
import React from 'react';
import { CustomersList } from 'store/interfaces';

type PackageTableBodyProps = {
  data: CustomersList[];
  showAvatar?: boolean;
  showCustomerDetails: (item: CustomersList) => void;
};
export const CustomersTableBody = ({
  data,
  showAvatar = false,
  showCustomerDetails,
}: PackageTableBodyProps) => {
  return (
    <>
      {data.length ? (
        <Tbody>
          {data?.map((item: CustomersList) => (
            <Tr
              key={item.id}
              onClick={() => showCustomerDetails(item)}
              cursor={'pointer'}
              _hover={{
                backgroundColor: '#F2F2F2',
              }}>
              <Td
                fontSize={'14px'}
                fontWeight={'600'}
                lineHeight={'14px'}
                color={'brand.text'}
                letterSpacing={'0.02em'}>
                {showAvatar ? (
                  <Flex alignItems={'center'} gap={2}>
                    <Box w={'32px'} h={'32px'}>
                      <Image src="../../../images/svgs/user-avatar.svg" alt="avatar" />
                    </Box>
                    <Box>{item.name}</Box>
                  </Flex>
                ) : (
                  <Box>{item.name}</Box>
                )}
              </Td>
              <Td
                fontSize={'14px'}
                fontWeight={'700'}
                lineHeight={'14px'}
                color={'brand.text'}
                letterSpacing={'0.02em'}>
                {item?.phoneNumber}
              </Td>
              <Td
                fontSize={'14px'}
                fontWeight={'700'}
                lineHeight={'14px'}
                color={'brand.text'}
                letterSpacing={'0.02em'}>
                {item.emailAddress.address}
              </Td>
              <Td fontSize={'14px'} fontWeight={'700'} lineHeight={'14px'} letterSpacing={'0.02em'}>
                <Box
                  bg={item.emailAddress.isVerified ? 'rgba(33, 150, 83, 0.1)' : 'rgba(235, 87, 87, 0.1)'}
                  border={'1px'}
                  borderRadius={'4px'}
                  p={2}
                  color={item?.emailAddress.isVerified ? '#219653' : '#EB5757'}
                  fontSize={'14px'}
                  textAlign={'center'}
                  lineHeight={'16px'}
                  fontWeight={'500'}>
                  {item?.emailAddress.isVerified ? 'Active' : 'Inactive'}
                </Box>
              </Td>
            </Tr>
          ))}
        </Tbody>
      ) : (
        <Tbody>
          <Tr>
            <Td colSpan={4}>
              <Flex alignItems={'center'} justifyContent={'center'} p={5}>
                <Text>Customer Not Found</Text>
              </Flex>
            </Td>
          </Tr>
        </Tbody>
      )}
    </>
  );
};
