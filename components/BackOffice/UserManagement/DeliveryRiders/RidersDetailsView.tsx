import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  DrawerHeader,
  Flex,
  Text,
  Image,
  Box,
  Button,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import React from 'react';
import { RidersList } from 'store/interfaces';

type Props = {
  isOpen: boolean;
  onClose: any;
  showEditForm: any;
  item: RidersList;
};

export const RidersDetailsView = ({ isOpen, onClose, item, showEditForm }: Props) => {
  const router = useRouter();
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
          <DrawerHeader mb={3}></DrawerHeader>
          <DrawerBody bg={'brand.white'} px={0}>
            <Flex w={'100%'} flexDir={'column'} gap={5}>
              <Flex
                bg={'#F2F2F2'}
                alignItems={'center'}
                justifyContent={'space-between'}
                px={5}
                py={3}>
                <Flex alignItems={'center'} gap={2}>
                  <Text fontSize={'12px'} lineHeight={'16px'} color={'brand.text'}>
                    Added:
                  </Text>
                  <Text fontSize={'12px'} lineHeight={'16px'} color={'brand.text'} fontWeight={600}>
                    {dayjs().format('DD/MM/YYYY')}
                  </Text>
                </Flex>
              </Flex>
              <Flex flexDir={'column'} gap={3} borderBottom={'1px'} borderBottomColor={'#828282'}>
                <Flex alignItems={'center'} justifyContent={'center'} px={5} py={1}>
                  <Image
                    w={'70px'}
                    h={'70px'}
                    src="../../../images/svgs/user-avatar.svg"
                    alt="avatar"
                  />
                </Flex>
                <Flex alignItems={'center'} justifyContent={'space-between'} px={5} py={1}>
                  <Text fontWeight={500} fontSize={'14px'} lineHeight={'16px'}>
                    Rider details
                  </Text>
                  <Box
                    onClick={() => {
                      showEditForm();
                      onClose();
                    }}
                    cursor={'pointer'}>
                    <Image src="../../../images/svgs/edit-icon.svg" alt="Edit" />
                  </Box>
                </Flex>
                <Flex alignItems={'center'} gap={8} px={5} py={1}>
                  <Flex flexDir={'column'} gap={1}>
                    <Text color={'#A9A9A9'} fontSize={'12px'} lineHeight={'14.52px'}>
                      Full Name
                    </Text>
                    <Text color={'brand.text'} fontSize={'14px'} lineHeight={'16.94px'}>
                      {item.fullName}
                    </Text>
                  </Flex>
                  <Flex flexDir={'column'} gap={1}>
                    <Text color={'#A9A9A9'} fontSize={'12px'} lineHeight={'14.52px'}>
                      Phone No
                    </Text>
                    <Text color={'brand.text'} fontSize={'14px'} lineHeight={'16.94px'}>
                      {item.phoneNumber}
                    </Text>
                  </Flex>
                </Flex>
                <Flex alignItems={'center'} gap={8} px={5} py={1}>
                  <Flex flexDir={'column'} gap={1}>
                    <Text color={'#A9A9A9'} fontSize={'12px'} lineHeight={'14.52px'}>
                      Email Address
                    </Text>
                    <Text color={'brand.text'} fontSize={'14px'} lineHeight={'16.94px'}>
                      {item.email}
                    </Text>
                  </Flex>
                </Flex>
                <Flex alignItems={'center'} gap={8} p={5}>
                  <Flex flexDir={'column'} gap={1}>
                    <Text color={'#A9A9A9'} fontSize={'12px'} lineHeight={'14.52px'}>
                      Bike Registration no
                    </Text>
                    <Text color={'brand.text'} fontSize={'14px'} lineHeight={'16.94px'}>
                      {item.bikeRegistrationNumber}
                    </Text>
                  </Flex>
                  <Flex flexDir={'column'} gap={1}>
                    <Text color={'#A9A9A9'} fontSize={'12px'} lineHeight={'14.52px'}>
                      Rider License no
                    </Text>
                    <Text color={'brand.text'} fontSize={'14px'} lineHeight={'16.94px'}>
                      {item.licenseNumber}
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
              <Flex flexDir={'column'} gap={3} borderBottom={'1px'} borderBottomColor={'#828282'}>
                <Flex alignItems={'center'} px={5} py={3}>
                  <Text fontWeight={500} fontSize={'14px'} lineHeight={'16px'}>
                    Pending Delivery
                  </Text>
                </Flex>
                <Flex
                  bg={'#F2F2F2'}
                  alignItems={'center'}
                  justifyContent={'space-between'}
                  px={5}
                  py={3}>
                  <Flex alignItems={'center'} gap={2}>
                    <Text fontSize={'12px'} lineHeight={'16px'} color={'brand.text'}>
                      Frequent location:
                    </Text>
                    <Text
                      fontSize={'12px'}
                      lineHeight={'16px'}
                      color={'brand.text'}
                      fontWeight={600}>
                      {item.frequentLocation}
                    </Text>
                  </Flex>
                </Flex>
                {/* <Flex w={'100%'} flexDir={'column'} px={5} py={3} gap={3}>
                  <Flex alignItems={'flex-start'} p={3} gap={2} bg={'#F2F2F2'} borderRadius={'8px'}>
                    <Box>
                      <Image src="../../../images/svgs/bike-icon.svg" alt="bike-icon" />
                    </Box>
                    <Flex flexDir={'column'} gap={2}>
                      <Text fontWeight={600} fontSize={'12px'} lineHeight={'14px'}>
                        Kolade Johnson
                      </Text>
                      <Text fontWeight={300} fontSize={'12px'} lineHeight={'14px'}>
                        Admiral Rd, Magodo Phase 2, Law School, Lagos.
                      </Text>
                    </Flex>
                  </Flex>
                </Flex> */}
                <Flex flexDir={'column'} alignItems={'center'} px={5} py={5} gap={3}>
                  <Box>
                    <Image src="../../../images/svgs/notice-pad-icon.svg" alt="notice-icon" />
                  </Box>
                  <Text textAlign={'center'} fontSize={'14px'} lineHeight={'19px'}>
                    No delivery duties assigned to this rider yet.
                  </Text>
                </Flex>
              </Flex>
              <Flex alignItems={'center'} justifyContent={'center'} mb={3} gap={8}>
                <Button
                  size={'sm'}
                  py={1.5}
                  px={3}
                  bg="brand.white"
                  color="brand.black"
                  border={'1px'}
                  borderColor={'brand.black'}
                  onClick={() => {}}
                  fontSize="13px"
                  fontWeight={400}
                  _hover={{
                    background: 'brand.white',
                    color: 'brand.black',
                  }}
                  style={{
                    borderRadius: '20px',
                    lineHeight: '22px',
                  }}>
                  Remove rider
                </Button>
                <Button
                  size={'sm'}
                  py={2}
                  px={5}
                  bg="brand.black"
                  color="brand.white"
                  onClick={() => {
                    router.push('/dashboard/back-office');
                  }}
                  fontSize="13px"
                  fontWeight={400}
                  _hover={{
                    background: 'brand.black',
                    color: 'brand.white',
                  }}
                  style={{
                    borderRadius: '20px',
                    lineHeight: '22px',
                  }}>
                  Assign delivery
                </Button>
              </Flex>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
