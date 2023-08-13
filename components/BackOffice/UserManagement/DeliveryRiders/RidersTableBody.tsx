// import { statusText, statusType } from '@/utils/index';
// import { Packages } from '@/utils/types';
import { Tbody, Tr, Td, Flex, Box, Text, Image } from '@chakra-ui/react';
// import { useAdminDataTableController } from 'controllers/BackOffice/useAdminDataTableController';
// import dayjs from 'dayjs';
import React from 'react';
// import { useDispatch } from 'react-redux';
// import {
//   setSelectedPackageToView,
//   setSelectedPackages,
//   useDashboardState,
// } from 'store/dashboard/slice';
import { RidersList } from 'store/interfaces';

type PackageTableBodyProps = {
  data: any;
  showAvatar?: boolean;
  showRiderDetails: (item: RidersList) => void;
};
export const RidersTableBody = ({
  data,
  showAvatar = false,
  showRiderDetails,
}: PackageTableBodyProps) => {
  //   const dashboard = useDashboardState();
  //   const dispatch = useDispatch();
  // const packageIds = useMemo(() => getPackageIds(data?.data), [data?.data])
  return (
    <>
      {data?.length ? (
        <Tbody>
          {data?.map((item: any) => (
            <Tr
              key={item?.id}
              onClick={() => showRiderDetails(item)}
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
                    <Box>{item?.fullName}</Box>
                  </Flex>
                ) : (
                  <Box>{item?.fullName}</Box>
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
                {item?.email}
              </Td>
              <Td fontSize={'14px'} fontWeight={'700'} lineHeight={'14px'} letterSpacing={'0.02em'}>
                <Box
                  bg={item?.isActive ? 'rgba(33, 150, 83, 0.1)' : 'rgba(235, 87, 87, 0.1)'}
                  border={'1px'}
                  borderRadius={'4px'}
                  p={2}
                  color={item?.isActive ? '#219653' : '#EB5757'}
                  fontSize={'14px'}
                  textAlign={'center'}
                  lineHeight={'16px'}
                  fontWeight={'500'}>
                  {item?.isActive ? 'Active' : 'Inactive'}
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
                <Text>Rider Not Found</Text>
              </Flex>
            </Td>
          </Tr>
        </Tbody>
      )}
    </>
  );
};
