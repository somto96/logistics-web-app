import {
  Box,
  Image,
  Flex,
  Text,
  Step,
  StepDescription,
  StepIndicator,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
  Button,
} from '@chakra-ui/react';
import React, { useState, useEffect, useMemo } from 'react';
import { TRACKING_STATUS } from '@/utils/index';
import { TableFilterDropDown } from '@/components/TableComponents/TableFilterDropdown';
import dayjs from 'dayjs';
// import { AdminPackages } from 'store/interfaces';
import { useUpdatePackageStatus } from '@/utils/hooks/Dashboard/Backoffice/useUpdatePackageStatus';
import { useDashboardState } from 'store/dashboard/slice';
import { useAdminDataTableController } from 'controllers/BackOffice/useAdminDataTableController';

export const AdminTrackingInfoScreen = ({ setActiveScreen }: any) => {
  const [status, setStatus] = useState(null);
  const {
    loading,
    selectedPackageToView,
    // pickupRiderDetails,
    // deliveryRiderDetails
  } = useDashboardState();
  const { handleUpdatePackageStatus } = useUpdatePackageStatus(setActiveScreen);
  const { packageStatusUpdates, dynamicSteps } = useAdminDataTableController();
  const steps = [
    {
      title: 'Order Picked up',
      description: {
        message: 'Your package has been left at the pickup location',
        date: `${dayjs(selectedPackageToView?.pickupDate).format('ddd D, YYYY')?.toUpperCase()}`,
      },
      number: 0,
    },
    {
      title: 'Order in Warehouse',
      description: {
        message: 'Package sorted and ready to be sent out to customer location',
        date: `${dayjs(selectedPackageToView?.expectedDeliveryDate)
          .format('ddd D, YYYY')
          ?.toUpperCase()}`,
      },
      number: 1,
    },
    {
      title: 'Order in Delivery ',
      description: {
        message: 'Package is on it’s way to customer location',
        date: `${dayjs(selectedPackageToView?.expectedDeliveryDate)
          .format('ddd D, YYYY')
          ?.toUpperCase()}`,
      },
      number: 2,
    },
    {
      title: 'Delivered',
      description: {
        message: 'Package was successfully delivered',
        date: `${dayjs(selectedPackageToView?.expectedDeliveryDate)
          .format('ddd D, YYYY')
          ?.toUpperCase()}`,
      },
      number: 3,
    },
  ];
  const sortedSteps = useMemo(
    () => dynamicSteps(steps, selectedPackageToView.status, selectedPackageToView),
    [dynamicSteps, selectedPackageToView.status]
  );
  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });

  useEffect(() => {
    setActiveStep(packageStatusUpdates(selectedPackageToView.status));
  }, [selectedPackageToView.status, packageStatusUpdates, setActiveStep]);
  return (
    <Flex flexDir={'column'} w={'100%'} p={5} gap={3}>
      <Flex bg={'brand.white'} w={'100%'} alignItems={'center'} justifyContent={'space-between'}>
        <Flex flexDir={'column'} gap={1}>
          <Text fontSize={'22px'} lineHeight={'26.63px'}>
            Tracking information
          </Text>
          <Text fontSize={'14px'} lineHeight={'16.94px'}>
            Tracking #:{`${selectedPackageToView?.trackingNumber}`}
          </Text>
        </Flex>
        <Text
          cursor={'pointer'}
          fontSize={'12px'}
          lineHeight={'14.52px'}
          letterSpacing={'3%'}
          color={'brand.text'}
          onClick={() => setActiveScreen('dashboard-view')}>
          Back
        </Text>
      </Flex>

      <Box
        w="100%"
        h="100vh"
        bgImage={'../images/pngs/map.png'}
        bgPosition="center"
        bgSize="cover"
        position={'relative'}>
        <Box position={'absolute'} left={5} bottom={10}>
          <Image src={'../images/svgs/track-route.svg'} alt={'marker'} />
        </Box>
        <Box
          w={{ md: '452px', sm: '100%' }}
          h={"100vh"}
          position={'absolute'}
          top={5}
          right={{ md: 5, sm: 1 }}
          bg={'rgba(255, 255, 255, 0.9)'}>
          <Flex
            w={'100%'}
            alignItems={'center'}
            py={3}
            px={5}
            borderBottom={'1px'}
            borderBottomColor={'#BDBDBD'}>
            <Flex flexDir={'column'} gap={2} p={3}>
              <Text
                color={'#A9A9A9'}
                fontWeight={600}
                fontSize={'10px'}
                lineHeight={'12.1px'}
                letterSpacing={'3%'}>
                PICKUP ADDRESS
              </Text>
              <Text
                color={'brand.text'}
                fontSize={'14px'}
                lineHeight={'16.94px'}
                letterSpacing={'2%'}>
                {/* Ayetoro street, Lekki Phase 1, Lagos. */}
                {`${selectedPackageToView?.pickUpAddress}, ${selectedPackageToView?.pickUpCity}`}
              </Text>
              <Text color={'#828282'} fontSize={'10px'} lineHeight={'12.1px'} letterSpacing={'3%'}>
                {`${selectedPackageToView?.customerFirstName?.toUpperCase()} ${selectedPackageToView?.customerLastName?.toUpperCase()}`}
              </Text>
              <Text color={'#BDBDBD'} fontSize={'10px'} lineHeight={'12.1px'} letterSpacing={'3%'}>
                {selectedPackageToView?.customerPhoneNumber}
              </Text>
            </Flex>
            <Flex flexDir={'column'} gap={2} p={3} borderLeft={'1px'} borderLeftColor={'#BDBDBD'}>
              <Text
                color={'#A9A9A9'}
                fontWeight={600}
                fontSize={'10px'}
                lineHeight={'12.1px'}
                letterSpacing={'3%'}>
                DELIVERY ADDRESS
              </Text>
              <Text
                color={'brand.text'}
                fontSize={'14px'}
                lineHeight={'16.94px'}
                letterSpacing={'2%'}>
                {`${selectedPackageToView?.deliveryAddress}, ${selectedPackageToView?.deliveryCity}`}
              </Text>
              <Text color={'#828282'} fontSize={'10px'} lineHeight={'12.1px'} letterSpacing={'3%'}>
                {`${selectedPackageToView?.customerFirstName?.toUpperCase()} ${selectedPackageToView?.customerLastName?.toUpperCase()}`}
              </Text>
              <Text color={'#BDBDBD'} fontSize={'10px'} lineHeight={'12.1px'} letterSpacing={'3%'}>
                {selectedPackageToView?.customerPhoneNumber}
              </Text>
            </Flex>
          </Flex>
          <Flex flexDir={'column'} justifyContent={'center'} gap={3} px={5} py={2}>
            <Text
              color={'#A9A9A9'}
              fontSize={'14px'}
              lineHeight={'16.94px'}
              letterSpacing={'1%'}
              fontWeight={600}>
              TRACKING DETAILS
            </Text>
            <Stepper
              index={activeStep}
              orientation="vertical"
              colorScheme={'customColorScheme'}
              height="250px"
              gap="0">
              {sortedSteps.map(
                (
                  step: {
                    title: string;
                    description: {
                      message: string;
                      date: string;
                    };
                    number: number;
                  },
                  index
                ) => (
                  <Step key={index}>
                    <StepIndicator>
                      <StepStatus />
                    </StepIndicator>

                    <Box w={"100%"} flexShrink="0">
                      <StepTitle
                        style={{
                          fontSize: '16px',
                          lineHeight: '19.36px',
                          color: activeStep === step.number ? 'brand.text' : '#828282',
                        }}>
                        {step?.title}
                      </StepTitle>
                      <Flex flexDir={'column'} w={"100%"} alignItems={'flex-start'} gap={3} px={2} py={1} overflowWrap={"break-word"}>
                        <StepDescription
                          style={{
                            fontSize: '12px',
                            lineHeight: '14.52px',
                            color: '#828282',
                          }}>
                          {step?.description?.message}
                        </StepDescription>
                        <StepDescription
                          style={{
                            fontSize: '10px',
                            lineHeight: '12.1px',
                            color: '#828282',
                          }}>
                          {step?.description?.date}
                        </StepDescription>
                      </Flex>
                    </Box>

                    <StepSeparator
                      style={{
                        width: '1px',
                        border: '1px dashed #BDBDBD',
                      }}
                    />
                  </Step>
                )
              )}
            </Stepper>
          </Flex>
          <Flex width={'100%'} alignItems={'center'} gap={3} p={5} mt={5}>
            <TableFilterDropDown
              width={'174px'}
              options={TRACKING_STATUS}
              label={''}
              value={status}
              placeholder="Select Status"
              height="200px"
              icon={''}
              onChange={(e: any) => {
                setStatus(e);
              }}
            />
            <Button
              size={'sm'}
              py={1.5}
              px={3}
              bg="brand.black"
              color="brand.white"
              onClick={() => {
                handleUpdatePackageStatus({
                  status,
                  trackingNumber: selectedPackageToView?.trackingNumber,
                });
              }}
              disabled={loading?.includes('update-package-status')}
              fontSize="14px"
              _hover={{
                background: 'brand.black',
                color: 'brand.white',
              }}
              style={{
                borderRadius: '20px',
                lineHeight: '22px',
              }}>
              {loading?.includes('update-package-status') ? 'Loading...' : 'Update Tracking'}
            </Button>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
};
