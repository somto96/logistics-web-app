import { useAppDispatch } from '@/utils/hooks/useReduxHooks';
import { DROPDOWN_LINKS, MOBILE_DROPDOWN_LINKS } from '@/utils/index';
import {
  Flex,
  Button,
  Link,
  Box,
  Text,
  Image,
  useMediaQuery,
  Step,
  StepStatus,
  StepIndicator,
  StepTitle,
  Stepper,
  useSteps,
  Progress,
  Divider,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  StepNumber,
  StepIcon,
} from '@chakra-ui/react';

import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { resetStore } from 'store/reset';
import { ModalComponent } from '../Reusables/Modals/ModalComponent';
import { PickupAddressAndSenderDetailsForm } from '../Forms/AddNewDelivery/PickupAddressAndSenderDetailsForm';
import { DeliveryAddressAndReceiverForm } from '../Forms/AddNewDelivery/DeliveryAddressAndReceiverForm';
import { PackageDurationAndDescription } from '../Forms/AddNewDelivery/PackageDurationAndDescription';
import { Notes } from '../Forms/AddNewDelivery/Notes';
import { ToastNotify } from '@/utils/helperFunctions/toastNotify';
import { setCreateDeliveryStatus, useDashboardState } from 'store/dashboard/slice';
import { useFetchPackages } from '@/utils/hooks/Dashboard/useFetchPackages';
import { PageLoader } from '../Reusables/Loaders/PageLoader';

type DashboardHeaderProps = {
  user: string;
};
const steps = [
  { title: 'Pickup Details', stepNumber: 1 },
  { title: 'Delivery Details', stepNumber: 2 },
  { title: 'Package Details', stepNumber: 3 },
  { title: 'Notes', stepNumber: 4 },
];
export const DashboardHeader = ({ user }: DashboardHeaderProps) => {
  const dispatch = useAppDispatch();
  const { handleFetchPackages } = useFetchPackages();
  const { createNewDelivery, loading, deliveryAddressAndReceiver, pickupAddressAndSender } =
    useDashboardState();
  const router = useRouter();
  const [isLargerThan800] = useMediaQuery('(min-width: 800px)');
  const options = isLargerThan800 ? DROPDOWN_LINKS : MOBILE_DROPDOWN_LINKS;
  const [showAddDeliveryModal, setShowAddDeliveryModal] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });
  const max = steps.length - 1;
  const progressPercent = (activeStep / max) * 100;
  const handleGoHome = () => {
    resetStore(dispatch);
    router.push('/');
  };

  useEffect(() => {
    createNewDelivery?.successStatus && setShowSuccessModal(true);
  }, [createNewDelivery?.successStatus, showSuccessModal]);

  return (
    <>
      {(loading?.includes("create_package") || loading?.includes("fetch_packages")) && <PageLoader /> }
      <Flex flexDir={'column'} position={'sticky'} w={'100%'}>
        <Flex
          width="100%"
          alignItems="center"
          gap="2"
          bg={'brand.black'}
          px={{ base: '1rem', md: '5rem' }}
          py={1}
          justifyContent="space-between">
          <Box p="2" onClick={handleGoHome} cursor={'pointer'}>
            <Image loading="lazy" src={'../images/svgs/header-logo.svg'} alt="header-logo" />
          </Box>
          {isLargerThan800 ? (
            <Flex flexDir="row" justifyContent="space-between" alignItems="center" gap="5">
              <Link
                href={'/api'}
                color="brand.white"
                _hover={{
                  fontWeight: '500',
                }}
                style={{
                  textDecoration: 'none',
                  fontSize: '14px',
                  lineHeight: '22px',
                }}>
                API Documentation
              </Link>
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
                  cursor={'pointer'}
                  onClick={() => setShowAddDeliveryModal(true)}>
                  Add New Delivery
                </Button>
              </Box>
              <Divider colorScheme={'whiteAlpha'} orientation="vertical" width={3} />
              <Menu matchWidth>
                <MenuButton
                  bg={'brand.white'}
                  border={'1px'}
                  fontSize={'14px'}
                  borderRadius={'20px'}
                  lineHeight={'14px'}
                  letterSpacing={'0.02em'}
                  color={'brand.text'}
                  cursor={'pointer'}
                  sx={{
                    span: {
                      fontSize: '14px',
                      lineHeight: '14px',
                      letterSpacing: '0.02em',
                      color: 'brand.text',
                      fontWeight: 500,
                    },
                  }}
                  _hover={{
                    bg: 'brand.white',
                  }}
                  w="100%"
                  as={Button}
                  textAlign={'left'}
                  rightIcon={
                    <Image src="../images/svgs/ChevronDownIcon.svg" alt="ChevronDownIcon" />
                  }
                  leftIcon={<Image src="../images/svgs/profile-avatar.svg" alt="avatar" />}>
                  {user}
                </MenuButton>
                <MenuList
                  w="100%"
                  h={'auto'}
                  zIndex={5}
                  position={'relative'}
                  overflowY={'auto'}
                  fontSize={'14px'}
                  lineHeight={'14px'}
                  letterSpacing={'0.02em'}
                  px={0}
                  py={0}>
                  {options.map(option => (
                    <MenuItem
                      key={option?.id}
                      p={4}
                      borderBottom={'1px'}
                      borderColor="rgba(189, 189, 189, 1)"
                      onClick={() => router.push(option.path)}>
                      {option.title}
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
            </Flex>
          ) : (
            <Menu>
              <MenuButton
                bg={'brand.white'}
                border={'1px'}
                fontSize={'14px'}
                borderRadius={'20px'}
                lineHeight={'14px'}
                letterSpacing={'0.02em'}
                color={'brand.text'}
                cursor={'pointer'}
                sx={{
                  span: {
                    fontSize: '14px',
                    lineHeight: '14px',
                    letterSpacing: '0.02em',
                    color: 'brand.text',
                    fontWeight: 500,
                  },
                }}
                _hover={{
                  bg: 'brand.white',
                }}
                // w="100%"
                as={Button}
                textAlign={'left'}
                rightIcon={<Image src="../images/svgs/ChevronDownIcon.svg" alt="ChevronDownIcon" />}
                leftIcon={<Image src="../images/svgs/profile-avatar.svg" alt="avatar" />}>
                {user}
              </MenuButton>
              <MenuList
                w="100%"
                h={'auto'}
                zIndex={5}
                position={'relative'}
                overflowY={'auto'}
                fontSize={'14px'}
                lineHeight={'14px'}
                letterSpacing={'0.02em'}
                px={0}
                py={0}>
                {options.map(option => (
                  <MenuItem
                    key={option?.id}
                    p={4}
                    borderBottom={'1px'}
                    borderColor="rgba(189, 189, 189, 1)"
                    onClick={() => {
                      if (option?.id === 'add-new-delivery') return setShowAddDeliveryModal(true);
                      return router.push(option.path);
                    }}>
                    {option.title}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          )}
        </Flex>
      </Flex>
      <ModalComponent
        size={'4xl'}
        isOpen={showAddDeliveryModal}
        onClose={() => setShowAddDeliveryModal(false)}>
        <Box position="relative" mb={8}>
          {isLargerThan800 ? (
            <Stepper index={activeStep} colorScheme={'customColorScheme'} cursor={'pointer'}>
              {steps.map((step, index) => (
                // Add onClick={() => setActiveStep(index)} to Step component to access forms
                <Step key={index}>
                  <StepIndicator>
                    <StepStatus
                      complete={<StepNumber />}
                      incomplete={<StepNumber />}
                      active={<StepNumber />}
                    />
                  </StepIndicator>
                  <Box flexShrink="0" fontSize={'16px'} lineHeight={'19px'}>
                    <StepTitle>{step.title}</StepTitle>
                  </Box>
                </Step>
              ))}
            </Stepper>
          ) : (
            <Stepper index={activeStep} colorScheme={'customColorScheme'} cursor={'pointer'}>
              {steps.map((step, index) => (
                <Step key={index}>
                  <StepIndicator bg="white">
                    <StepStatus complete={<StepIcon />} />
                  </StepIndicator>
                </Step>
              ))}
            </Stepper>
          )}

          <Progress
            size={'xs'}
            value={progressPercent}
            colorScheme={'brand.black'}
            position="absolute"
            height="3px"
            width="full"
            top="40px"
            zIndex={-1}
          />
        </Box>
        <Box>
          {activeStep === 0 && <PickupAddressAndSenderDetailsForm setActive={setActiveStep} />}
          {activeStep === 1 && <DeliveryAddressAndReceiverForm setActive={setActiveStep} />}
          {activeStep === 2 && <PackageDurationAndDescription setActive={setActiveStep} />}
          {activeStep === 3 && <Notes setActive={setActiveStep} closeModal={() => setShowAddDeliveryModal(false)} />}
        </Box>
      </ModalComponent>
      <ModalComponent
        size={'4xl'}
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        showCloseBtn={false}>
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
              <Image w={"217px"} h={"217px"} src={`data:image/png;base64,${createNewDelivery?.successMessage?.qrCode}`} alt="qr-code" />
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
                await navigator.clipboard.writeText(createNewDelivery?.successMessage?.trackingNumber);
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
                setShowSuccessModal(false);
                dispatch(setCreateDeliveryStatus({
                  successStatus: false,
                  successMessage: {}
                }));
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
    </>
  );
};
