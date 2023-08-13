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
    Button,
  } from '@chakra-ui/react';
  import dayjs from 'dayjs';
  import React from 'react';
  import { CustomersList } from 'store/interfaces';
  
  type Props = {
    isOpen: boolean;
    onClose: any;
    showEditForm: any;
    item: CustomersList;
  };
  
  export const CustomerDetailsView = ({ isOpen, onClose, item, showEditForm }: Props) => {
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
                      Joined:
                    </Text>
                    <Text fontSize={'12px'} lineHeight={'16px'} color={'brand.text'} fontWeight={600}>
                      {dayjs(item.dateCreated).format('DD/MM/YYYY')}
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
                      Customer details
                    </Text>
                  </Flex>
                  <Flex alignItems={'center'} gap={8} px={5} py={1}>
                    <Flex flexDir={'column'} gap={1}>
                      <Text color={'#A9A9A9'} fontSize={'12px'} lineHeight={'14.52px'}>
                        Full Name
                      </Text>
                      <Text color={'brand.text'} fontSize={'14px'} lineHeight={'16.94px'}>
                        {item?.name}
                      </Text>
                    </Flex>
                    <Flex flexDir={'column'} gap={1}>
                      <Text color={'#A9A9A9'} fontSize={'12px'} lineHeight={'14.52px'}>
                       Company Phone No
                      </Text>
                      <Text color={'brand.text'} fontSize={'14px'} lineHeight={'16.94px'}>
                        {item?.phoneNumber}
                      </Text>
                    </Flex>
                  </Flex>
                  <Flex alignItems={'center'} gap={8} px={5} py={1}>
                    <Flex flexDir={'column'} gap={1}>
                      <Text color={'#A9A9A9'} fontSize={'12px'} lineHeight={'14.52px'}>
                        Company Email
                      </Text>
                      <Text color={'brand.text'} fontSize={'14px'} lineHeight={'16.94px'}>
                        {item?.emailAddress?.address}
                      </Text>
                    </Flex>
                  </Flex>
                  <Flex alignItems={'center'} gap={8} p={5}>
                    <Flex flexDir={'column'} gap={1}>
                      <Text color={'#A9A9A9'} fontSize={'12px'} lineHeight={'14.52px'}>
                        Company Address
                      </Text>
                      <Text color={'brand.text'} fontSize={'14px'} lineHeight={'16.94px'}>
                        {item?.address}
                      </Text>
                    </Flex>
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
                    Deactivate user
                  </Button>
                  <Button
                    size={'sm'}
                    py={2}
                    px={5}
                    bg="brand.black"
                    color="brand.white"
                    onClick={() => {
                        showEditForm();
                        onClose();
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
                    Edit details
                  </Button>
                </Flex>
              </Flex>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </>
    );
  };
  