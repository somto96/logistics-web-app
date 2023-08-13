import { statusText, statusType } from '@/utils/index';
// import { Packages } from '@/utils/types';
import { Tbody, Tr, Td, Flex, Box, Text, Image } from '@chakra-ui/react';
import { useAdminDataTableController } from 'controllers/BackOffice/useAdminDataTableController';
// import dayjs from 'dayjs';
import React from 'react';
import { useDispatch } from 'react-redux';
import {
  setSelectedPackageToView,
  setSelectedPackages,
  useDashboardState,
} from 'store/dashboard/slice';

type PackageTableBodyProps = {
  data: any;
  showCheckbox?: boolean;
  showPackageDetails?: any;
  assignPackage?: any;
  showTrackingInfo?: any;
};
export const AdminPackagesTableBody = ({
  data,
  showCheckbox = false,
  showPackageDetails,
  assignPackage,
  showTrackingInfo,
}: PackageTableBodyProps) => {
  const dashboard = useDashboardState();
  const { handleCheckboxChange, handleAssignBtnLabelText } = useAdminDataTableController();
  const dispatch = useDispatch();
  // const packageIds = useMemo(() => getPackageIds(data?.data), [data?.data])
  const handleViewDetails = (item: any) => {
    // console.log('view-details', item);
    dispatch(setSelectedPackageToView(item));
    showPackageDetails();
  };

  const handlePackagesToAssign = (item: any) => {
    if (dashboard.selectedPackages?.includes(item?.trackingNumber)) {
      assignPackage();
    } else {
      dispatch(setSelectedPackages([item?.trackingNumber]));
      assignPackage();
    }
  };
  return (
    <>
      {data?.length ? (
        <Tbody>
          {data?.map((item: any) => (
            <Tr key={item?.id}>
              <Td
                fontSize={'14px'}
                fontWeight={'700'}
                lineHeight={'14px'}
                color={'brand.text'}
                letterSpacing={'0.02em'}>
                {showCheckbox ? (
                  <Flex alignItems={'center'} gap={2}>
                    <Box
                      h={'17px'}
                      w={'17px'}
                      cursor={'pointer'}
                      onClick={() => {
                        if (
                          item?.status?.toLowerCase() === 'availableforpickup' ||
                          item?.status?.toLowerCase() === 'undelivered'
                        )
                          return handleCheckboxChange({
                            item: item.trackingNumber,
                            packages: dashboard.selectedPackages,
                            allPackagesSelected: dashboard.allPackagesSelected,
                          });
                        return;
                      }}>
                      {dashboard.selectedPackages?.includes(item?.trackingNumber) ? (
                        <Image
                          src="../images/svgs/custom-filled-checkbox.svg"
                          alt="checkbox-filled"
                        />
                      ) : (
                        <Image src="../images/svgs/custom-checkbox.svg" alt="checkbox-not-filled" />
                      )}
                    </Box>
                    <Box>{item?.trackingNumber}</Box>
                  </Flex>
                ) : (
                  <Box>{item?.trackingNumber}</Box>
                )}
              </Td>
              {/* <Td>
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
              </Td> */}
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
                  // bg={statusType(item?.status?.toLowerCase())}
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
                      : statusType(item?.status?.toLowerCase())
                  }
                  fontSize={'14px'}
                  textAlign={'center'}
                  lineHeight={'16px'}
                  fontWeight={'500'}>
                  {statusText(item?.status?.toLowerCase())}
                </Box>
              </Td>
              <Td>
                <Flex alignItems={'center'} gap={3}>
                  {dashboard?.allPackagesSelected ? (
                    <Box bg={'#F2F2F2'} borderRadius={'8px'} p={3} w={'95px'} cursor={'pointer'}>
                      <Text
                        color={'brand.black'}
                        fontSize={'14px'}
                        lineHeight={'16px'}
                        textAlign={'center'}>
                        {handleAssignBtnLabelText(item?.status?.toLowerCase())}
                      </Text>
                    </Box>
                  ) : (
                    <Box
                      bg={
                        item?.status?.toLowerCase() === 'availableforpickup' ||
                        item?.status?.toLowerCase() === 'undelivered'
                          ? 'brand.black'
                          : '#F2F2F2'
                      }
                      borderRadius={'8px'}
                      p={3}
                      w={'95px'}
                      cursor={'pointer'}
                      onClick={() => {
                        if (
                          item?.status?.toLowerCase() === 'undelivered' ||
                          item?.status?.toLowerCase() === 'availableforpickup'
                        )
                          return handlePackagesToAssign(item);
                        return;
                      }}>
                      <Text
                        color={
                          item?.status?.toLowerCase() === 'availableforpickup' ||
                          item?.status?.toLowerCase() === 'undelivered'
                            ? 'brand.white'
                            : 'brand.black'
                        }
                        fontSize={'14px'}
                        lineHeight={'16px'}
                        textAlign={'center'}>
                        {handleAssignBtnLabelText(item?.status?.toLowerCase())}
                      </Text>
                    </Box>
                  )}

                  <Box
                    w={'36px'}
                    h={'32px'}
                    cursor={'pointer'}
                    onClick={() => handleViewDetails(item)}>
                    <Image src="../images/svgs/view-icon.svg" alt="view-icon" />
                  </Box>
                  <Box
                    w={'36px'}
                    h={'32px'}
                    cursor={'pointer'}
                    onClick={() => {
                      showTrackingInfo();
                      dispatch(setSelectedPackageToView(item));
                    }}>
                    <Image src="../images/svgs/tracking-info-icon.svg" alt="tracking-info-icon" />
                  </Box>
                </Flex>
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
      {/* <ModalComponent
        align="left"
        style={{
          padding: '0px',
        }}
        header={
          <Flex flexDir={'column'} gap={1}>
            <Text fontSize={'22px'} lineHeight={'26.63px'}>
              Tracking information
            </Text>
            <Text fontSize={'14px'} lineHeight={'16.94px'}>
              Tracking #: {`${selectedItem?.trackingNumber}`}
            </Text>
          </Flex>
        }
        isOpen={showTrackingInfo}
        onClose={() => setShowTrackingInfo(false)}
        size={'3xl'}>
        <TrackingInfoScreen {...selectedItem} />
      </ModalComponent> */}
    </>
  );
};
