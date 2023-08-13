import dayjs from '@/utils/dayjsLib';
import { statusText } from '@/utils/index';
import { Flex, Text, Image, Box } from '@chakra-ui/react';
import { useAdminDataTableController } from 'controllers/BackOffice/useAdminDataTableController';
import React, { useEffect } from 'react';
import { setSelectedPackages, useDashboardState } from 'store/dashboard/slice';
import { useFetchRiderDetails } from '@/utils/hooks/Dashboard/Backoffice/useFetchRiderDetails';
import { useAppDispatch } from '@/utils/hooks/useReduxHooks';
// import { useAssignPackages } from '@/utils/hooks/Dashboard/Backoffice/useAssignPackages';
// import { ModalComponent } from '../Reusables/Modals/ModalComponent';

export const AdminPackageDetailsView = ({ setActiveScreen }: any) => {
  const { selectedPackageToView, pickupRiderDetails, deliveryRiderDetails } = useDashboardState();
  const { handleAssignBtnLabelText } = useAdminDataTableController();
  const { handleFetchRiderDetails } = useFetchRiderDetails();
  const dashboard = useDashboardState();
  const dispatch = useAppDispatch();


  // const [showReasons, setShowReasons] = useState<boolean>(false);

  useEffect(() => {
    handleFetchRiderDetails(
      {
        id: selectedPackageToView?.pickUpRider,
      },
      'pickup'
    );
  }, []);

  useEffect(() => {
    handleFetchRiderDetails(
      {
        id: selectedPackageToView?.deliveryRider,
      },
      'delivery'
    );
  }, []);

  const handlePackagesToAssign = (item: any) => {
    if (dashboard.selectedPackages?.includes(item?.trackingNumber)) {
      dispatch(setSelectedPackages([item?.trackingNumber]));
      setActiveScreen('assign-package-view');
    } else {
      dispatch(setSelectedPackages([...dashboard.selectedPackages, item?.trackingNumber]));
      setActiveScreen('assign-package-view');
    }
  };

  return (
    <>
      <Flex alignItems={'center'} flexDir={'column'} gap={5} w={'100%'} p={5}>
        <Flex
          borderBottom={'1px'}
          borderColor={'#E0E0E0'}
          w={'100%'}
          alignItems={'center'}
          justifyContent={'space-between'}
          p={4}>
          <Text
            cursor={'pointer'}
            fontSize={'12px'}
            lineHeight={'14.52px'}
            letterSpacing={'3%'}
            color={'brand.text'}
            onClick={() => setActiveScreen('dashboard-view')}>
            Back
          </Text>
          <Text fontWeight={'700'} fontSize={'18px'} lineHeight={'21.78px'}>
            Delivery Details
          </Text>
          <Box></Box>
        </Flex>
        <Flex
          w={'100%'}
          flexDir={'row'}
          pb={5}
          alignItems={'center'}
          gap={3}
          borderBottom={'1px'}
          borderBottomColor={'#BDBDBD'}>
          <Flex flexDir={'column'} bg={'#4F4F4F'} p={5} gap={5} w={'100%'} borderRadius={'8px'}>
            <Flex flexDir={'column'} gap={2}>
              <Text fontSize={'12px'} lineHeight={'14px'} color={'#E0E0E0'}>
                Tracking ID
              </Text>
              <Text
                color={'brand.white'}
                fontSize={'14px'}
                fontWeight={700}
                letterSpacing={'2%'}
                lineHeight={'14px'}>
                {/* HF5639FF090923 */}
                {selectedPackageToView?.trackingNumber}
              </Text>
            </Flex>
            <Flex flexDir={'column'} gap={2}>
              <Text fontSize={'12px'} lineHeight={'14px'} color={'#E0E0E0'}>
                Delivery Date
              </Text>
              <Text
                color={'brand.white'}
                fontSize={'14px'}
                fontWeight={700}
                letterSpacing={'2%'}
                lineHeight={'14px'}>
                {/* 14/11/2022 */}
                {dayjs(selectedPackageToView?.pickupDate).format('DD/MM/YYYY')}
              </Text>
            </Flex>
          </Flex>
          <Flex bg={'#4F4F4F'} flexDir={'column'} p={5} gap={5} w={'100%'} borderRadius={'8px'}>
            <Flex flexDir={'column'} gap={2}>
              <Text fontSize={'12px'} lineHeight={'14px'} color={'#E0E0E0'}>
                Delivery Attempt
              </Text>
              <Text
                color={'brand.white'}
                fontSize={'14px'}
                fontWeight={700}
                letterSpacing={'2%'}
                lineHeight={'14px'}>
                {selectedPackageToView?.status === 'undelivered' ? 1 : 0}
              </Text>
            </Flex>
            <Flex flexDir={'column'} gap={2}>
              <Text fontSize={'12px'} lineHeight={'14px'} color={'#E0E0E0'}>
                Status
              </Text>
              <Flex alignItems={'center'} justifyContent={'space-between'}>
                <Text
                  color={'brand.white'}
                  fontSize={'14px'}
                  fontWeight={700}
                  letterSpacing={'2%'}
                  lineHeight={'14px'}>
                  {statusText(selectedPackageToView?.status)}
                </Text>
                {/* {selectedPackageToView?.status === 'undelivered' && (
                  <Text
                    onClick={() => setShowReasons(true)}
                    cursor={'pointer'}
                    color={'brand.white'}
                    fontSize={'12px'}
                    lineHeight={'14.52px'}
                    letterSpacing={'3%'}
                    textAlign={'right'}
                    textDecoration={'underline'}>
                    Reasons
                  </Text>
                )} */}
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <Flex
          w={'100%'}
          flexDir={'row'}
          pb={5}
          alignItems={'center'}
          gap={3}
          borderBottom={'1px'}
          borderBottomColor={'#BDBDBD'}>
          <Flex bg={'#E0E0E0'} flexDir={'column'} p={5} gap={5} w={'100%'} borderRadius={'8px'}>
            <Flex flexDir={'column'} gap={2}>
              <Text fontSize={'12px'} lineHeight={'14px'} color={'#4F4F4F'}>
                Receiver Details
              </Text>
              <Flex flexDir={'column'} gap={3}>
                <Text
                  color={'brand.text'}
                  fontSize={'14px'}
                  fontWeight={700}
                  letterSpacing={'3%'}
                  lineHeight={'16.94px'}>
                  Kolade johnson
                </Text>
                <Text
                  color={'brand.text'}
                  fontSize={'14px'}
                  letterSpacing={'2%'}
                  lineHeight={'16.94px'}>
                  Admiral Rd, Magodo Phase 2, Lagos.
                </Text>
                <Text
                  fontSize={'12px'}
                  fontWeight={600}
                  letterSpacing={'3%'}
                  color={'#828282'}
                  lineHeight={'14.52px'}>
                  08052522522
                </Text>
              </Flex>
            </Flex>
          </Flex>
          <Flex bg={'#E0E0E0'} flexDir={'column'} p={5} gap={5} w={'100%'} borderRadius={'8px'}>
            <Flex flexDir={'column'} gap={2}>
              <Text fontSize={'12px'} lineHeight={'14px'} color={'#4F4F4F'}>
                Sender Details
              </Text>
              <Flex flexDir={'column'} gap={3}>
                <Text
                  color={'brand.text'}
                  fontSize={'14px'}
                  fontWeight={700}
                  letterSpacing={'3%'}
                  lineHeight={'16.94px'}>
                  {`${selectedPackageToView?.customerFirstName?.toUpperCase()} ${selectedPackageToView?.customerLastName?.toUpperCase()}`}
                </Text>
                <Text
                  color={'brand.text'}
                  fontSize={'14px'}
                  letterSpacing={'2%'}
                  lineHeight={'16.94px'}>
                  {selectedPackageToView?.pickUpAddress}
                </Text>
                <Text
                  fontSize={'12px'}
                  fontWeight={600}
                  letterSpacing={'3%'}
                  color={'#828282'}
                  lineHeight={'14.52px'}>
                  {selectedPackageToView?.customerPhoneNumber}
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <Flex
          w={'100%'}
          flexDir={'row'}
          pb={5}
          alignItems={'center'}
          gap={3}
          borderBottom={'1px'}
          borderBottomColor={'#BDBDBD'}>
          <Flex
            bg={'#E0E0E0'}
            flexDir={'column'}
            p={5}
            gap={5}
            w={'100%'}
            h={'128px'}
            borderRadius={'8px'}>
            <Flex flexDir={'column'} gap={2}>
              <Text fontSize={'12px'} lineHeight={'14px'} color={'#4F4F4F'}>
                Package Description
              </Text>
              <Flex flexDir={'column'} gap={3}>
                <Flex alignItems={'center'} gap={3}>
                  <Box>
                    <Image src="../images/svgs/arrow-right-icon.svg" alt="arrow-right" />
                  </Box>
                  <Text fontWeight={500} fontSize={'14px'} lineHeight={'16px'} letterSpacing={'2%'}>
                    Cosmetics
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
          <Flex
            bg={'#E0E0E0'}
            flexDir={'column'}
            p={5}
            gap={5}
            w={'100%'}
            h={'128px'}
            borderRadius={'8px'}>
            <Flex flexDir={'column'} gap={2}>
              <Text fontSize={'12px'} lineHeight={'14px'} color={'#4F4F4F'}>
                Note
              </Text>
              <Flex flexDir={'column'} gap={3}>
                <Text
                  color={'brand.text'}
                  fontSize={'14px'}
                  fontWeight={700}
                  letterSpacing={'3%'}
                  lineHeight={'16.94px'}>
                  Delivery should be swift, customer needs package urgently.
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        {selectedPackageToView?.status === 'availableforpickup' ? (
          <Flex
            w={'100%'}
            flexDir={'row'}
            pb={5}
            alignItems={'center'}
            gap={3}
            borderBottom={'1px'}
            borderBottomColor={'#BDBDBD'}>
            <Flex
              flexDir={'column'}
              alignItems={'center'}
              justifyContent={'center'}
              w={'100%'}
              gap={3}>
              <Box>
                <Image src="../images/svgs/package-list-icon.svg" alt="package-list" />
              </Box>
              <Text color={'#4F4F4F'} fontSize={'14px'} lineHeight={'19px'}>
                No pickup/delivery riders has been assigned this task yet.
              </Text>
            </Flex>
          </Flex>
        ) : (
          <Flex
            w={'100%'}
            flexDir={'row'}
            pb={5}
            alignItems={'center'}
            gap={3}
            borderBottom={'1px'}
            borderBottomColor={'#BDBDBD'}>
            <Flex
              bg={'#E0E0E0'}
              h={'128px'}
              flexDir={'column'}
              p={5}
              gap={5}
              w={'100%'}
              borderRadius={'8px'}>
              <Flex flexDir={'column'} gap={2}>
                <Text fontSize={'12px'} lineHeight={'14px'} color={'#4F4F4F'}>
                  Pickup Rider Details
                </Text>
                <Flex flexDir={'column'} gap={3}>
                  <Text
                    color={'brand.text'}
                    fontSize={'14px'}
                    fontWeight={700}
                    letterSpacing={'3%'}
                    lineHeight={'16.94px'}>
                    {/* Kolade johnson */}
                    {pickupRiderDetails?.fullName?.toUpperCase()}
                  </Text>
                  <Text
                    fontSize={'12px'}
                    fontWeight={600}
                    letterSpacing={'3%'}
                    color={'#828282'}
                    lineHeight={'14.52px'}>
                    {/* 08052522522 */}
                    {pickupRiderDetails?.phoneNumber}
                  </Text>
                  <Text
                    fontSize={'10px'}
                    fontWeight={600}
                    letterSpacing={'3%'}
                    color={'#828282'}
                    lineHeight={'12px'}>
                    {/* KTU239JK */}
                    {pickupRiderDetails?.licenseNumber}
                  </Text>
                </Flex>
              </Flex>
            </Flex>
            <Flex
              bg={'#E0E0E0'}
              flexDir={'column'}
              h={'128px'}
              p={5}
              gap={5}
              w={'100%'}
              borderRadius={'8px'}>
              <Flex flexDir={'column'} gap={2}>
                <Text fontSize={'12px'} lineHeight={'14px'} color={'#4F4F4F'}>
                  Delivery Rider Details
                </Text>
                <Flex flexDir={'column'} gap={3}>
                  <Text
                    color={'brand.text'}
                    fontSize={'14px'}
                    fontWeight={700}
                    letterSpacing={'3%'}
                    lineHeight={'16.94px'}>
                    {/* STEVEN DOE */}
                    {deliveryRiderDetails?.fullName?.toUpperCase()}
                  </Text>
                  <Text
                    fontSize={'12px'}
                    fontWeight={600}
                    letterSpacing={'3%'}
                    color={'#828282'}
                    lineHeight={'14.52px'}>
                    {deliveryRiderDetails?.phoneNumber}
                  </Text>
                  <Text
                    fontSize={'10px'}
                    fontWeight={600}
                    letterSpacing={'3%'}
                    color={'#828282'}
                    lineHeight={'12px'}>
                    {deliveryRiderDetails?.licenseNumber}
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        )}

        <Flex
          w={'100%'}
          flexDir={'row'}
          pb={5}
          alignItems={'center'}
          justifyContent={'center'}
          gap={4}>
          <Box
            bg={'#F2F2F2'}
            borderRadius={'20px'}
            p={3}
            w={'136px'}
            cursor={'pointer'}
            onClick={() => console.log('assign')}>
            <Text color={'brand.text'} fontSize={'14px'} lineHeight={'22px'} textAlign={'center'}>
              Delete
            </Text>
          </Box>
          <Box
            bg={'brand.white'}
            borderRadius={'20px'}
            border={'1px'}
            borderColor={'brand.text'}
            p={3}
            w={'136px'}
            cursor={'pointer'}
            onClick={() => {
              setActiveScreen('view-tracking-info');
            }}>
            <Text color={'brand.text'} fontSize={'14px'} lineHeight={'22px'} textAlign={'center'}>
              Update Tracking
            </Text>
          </Box>
          <Box
            bg={
              selectedPackageToView?.status?.toLowerCase() === 'availableforpickup' ||
              selectedPackageToView?.status?.toLowerCase() === 'undelivered'
                ? 'brand.black'
                : '#F2F2F2'
            }
            borderRadius={'20px'}
            border={'1px'}
            borderColor={'brand.text'}
            p={3}
            w={'136px'}
            cursor={'pointer'}
            onClick={() => {
              if (
                selectedPackageToView?.status?.toLowerCase() === 'availableforpickup' ||
                selectedPackageToView?.status?.toLowerCase() === 'undelivered'
              ) {
                handlePackagesToAssign(selectedPackageToView);
              }
            }}>
            <Text
              color={
                selectedPackageToView?.status?.toLowerCase() === 'availableforpickup' ||
                selectedPackageToView?.status?.toLowerCase() === 'undelivered'
                  ? 'brand.white'
                  : 'brand.black'
              }
              fontSize={'14px'}
              lineHeight={'22px'}
              textAlign={'center'}>
              {handleAssignBtnLabelText(selectedPackageToView?.status?.toLowerCase())}
            </Text>
          </Box>
        </Flex>
      </Flex>
      {/* <ModalComponent isOpen={showReasons} onClose={() => }></ModalComponent> */}
    </>
  );
};
