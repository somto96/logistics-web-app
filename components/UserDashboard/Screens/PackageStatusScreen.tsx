import { Packages } from '@/utils/types';
import {
  Box,
  Flex,
  Stepper,
  Step,
  StepIndicator,
  StepStatus,
  StepTitle,
  StepDescription,
  StepSeparator,
  Button,
  Text,
  useSteps,
  Image,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import { useAdminDataTableController } from 'controllers/BackOffice/useAdminDataTableController';
import React, { useEffect, useMemo } from 'react';

type Props = {
  packageDetails: Packages;
  routeType: string;
  showMoreDetails: () => void;
};

export const PackageStatusScreen = ({
  packageDetails,
  routeType = 'onboarding',
  showMoreDetails,
}: Props) => {
  const steps = [
    {
      title: 'Order Picked up',
      description: {
        message: 'Your package has been left at the pickup location',
        date: `${dayjs(packageDetails?.pickupDate).format('ddd D, YYYY')?.toUpperCase()}`,
      },
      number: 0,
    },
    {
      title: 'Order in Warehouse',
      description: {
        message: 'Package sorted and ready to be sent out to customer location',
        date: `${dayjs(packageDetails?.expectedDeliveryDate).format('ddd D, YYYY')?.toUpperCase()}`,
      },
      number: 1,
    },
    {
      title: 'Order in Delivery ',
      description: {
        message: 'Package is on it’s way to customer location',
        date: `${dayjs(packageDetails?.expectedDeliveryDate).format('ddd D, YYYY')?.toUpperCase()}`,
      },
      number: 2,
    },
    {
      title: 'Delivered',
      description: {
        message: 'Package was successfully delivered',
        date: `${dayjs(packageDetails?.expectedDeliveryDate).format('ddd D, YYYY')?.toUpperCase()}`,
      },
      number: 3,
    },
  ];
  const { dynamicSteps, packageStatusUpdates } = useAdminDataTableController();
  const sortedSteps = useMemo(
    () => dynamicSteps(steps, packageDetails.status, packageDetails),
    [dynamicSteps, packageDetails.status]
  );
  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });

  useEffect(() => {
    setActiveStep(packageStatusUpdates(packageDetails.status));
  }, [packageDetails.status, packageStatusUpdates, setActiveStep]);

  return (
    <Box
      w={{ md: '452px', sm: '100%' }}
      position={'absolute'}
      h={'100vh'}
      top={0}
      right={0}
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
          <Text color={'brand.text'} fontSize={'14px'} lineHeight={'16.94px'} letterSpacing={'2%'}>
            {/* Ayetoro street, Lekki Phase 1, Lagos. */}
            {`${packageDetails?.pickUpAddress}, ${packageDetails?.pickUpCity}`}
          </Text>
          <Text color={'#828282'} fontSize={'10px'} lineHeight={'12.1px'} letterSpacing={'3%'}>
            {`${packageDetails?.customerFirstName?.toUpperCase()} ${packageDetails?.customerLastName?.toUpperCase()}`}
          </Text>
          <Text color={'#BDBDBD'} fontSize={'10px'} lineHeight={'12.1px'} letterSpacing={'3%'}>
            {packageDetails?.customerPhoneNumber}
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
          <Text color={'brand.text'} fontSize={'14px'} lineHeight={'16.94px'} letterSpacing={'2%'}>
            {`${packageDetails?.deliveryAddress}, ${packageDetails?.deliveryCity}`}
          </Text>
          <Text color={'#828282'} fontSize={'10px'} lineHeight={'12.1px'} letterSpacing={'3%'}>
            {`${packageDetails?.customerFirstName?.toUpperCase()} ${packageDetails?.customerLastName?.toUpperCase()}`}
          </Text>
          <Text color={'#BDBDBD'} fontSize={'10px'} lineHeight={'12.1px'} letterSpacing={'3%'}>
            {packageDetails?.customerPhoneNumber}
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
        {packageDetails.status?.toLowerCase() === 'availableforpickup' ? (
          <Flex flexDir={'column'} p={8} gap={5} alignItems={'center'} justifyContent={'center'}>
            <Image
              src={'../../../images/svgs/no-package-details.svg'}
              alt={'no-package-details-illustration'}
            />
            <Text textAlign={'center'} fontSize={'12px'} lineHeight={'17px'}>
              No tracking information at the moment. This is likely because your order is yet to be
              picked up from your vendor. Please check back later for more details
            </Text>
          </Flex>
        ) : (
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
                index: number
              ) => (
                <Step key={index}>
                  <StepIndicator>
                    <StepStatus />
                  </StepIndicator>

                  <Box w={'100%'} flexShrink="0">
                    <StepTitle
                      style={{
                        fontSize: '16px',
                        lineHeight: '19.36px',
                        color: activeStep === step.number ? 'brand.text' : '#828282',
                      }}>
                      {step.title}
                    </StepTitle>
                    <Flex
                      flexDir={'column'}
                      alignItems={'flex-start'}
                      gap={3}
                      px={2}
                      py={1}
                      overflowWrap={'break-word'}>
                      <StepDescription
                        style={{
                          fontSize: '12px',
                          lineHeight: '14.52px',
                          color: '#828282',
                        }}>
                        {step.description.message}
                      </StepDescription>
                      <StepDescription
                        style={{
                          fontSize: '10px',
                          lineHeight: '12.1px',
                          color: '#828282',
                        }}>
                        {step.description.date}
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
        )}
      </Flex>
      {routeType === 'onboarding' && (
        <Flex width={'100%'} alignItems={'center'} gap={3} p={5} mt={5}>
          <Button
            size={'sm'}
            py={1.5}
            px={3}
            bg="brand.white"
            color="brand.text"
            onClick={() => {
              showMoreDetails();
            }}
            border={'1px'}
            borderColor={'brand.black'}
            fontSize="14px"
            _hover={{
              background: 'brand.white',
              color: 'brand.black',
            }}
            style={{
              borderRadius: '20px',
              lineHeight: '22px',
            }}
            rightIcon={
              <Image src={'../../../images/svgs/btn-right-icon.svg'} alt={'btn-right-icon'} />
            }>
            View more details
          </Button>
        </Flex>
      )}
    </Box>
  );
};
