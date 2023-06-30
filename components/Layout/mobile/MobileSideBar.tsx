import React from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Flex,
  Box,
  Text,
  Link,
} from '@chakra-ui/react';
import { USER_SIDEBAR_LINKS } from '../utils';
import { isActive } from '../../../utils/helperFunctions';
import { useRouter } from 'next/router';

type Props = {
  isOpen: boolean;
  onClose: any;
};

export const MobileSideBar = ({ isOpen, onClose }: Props) => {
  const router = useRouter();
  return (
    <>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent
          sx={{
            backgroundColor: 'brand.black',
          }}>
          <DrawerCloseButton
            size={'lg'}
            sx={{
              color: 'brand.white',
            }}
          />
          <DrawerBody mt={10}>
            <Flex alignItems={'center'} flexDir={'column'} justifyContent={'center'} gap={8} p={5}>
              {USER_SIDEBAR_LINKS?.map(link => (
                <Box
                  key={link?.id}
                  cursor={'pointer'}
                  bg={
                    isActive({
                      currentPath: router.pathname,
                      linkPath: `${link.path}`,
                    })
                      ? 'brand.white'
                      : 'brand.black'
                  }
                  w={'100%'}
                  borderRadius={'20px'}>
                  <Link
                    href={link?.path}
                    color={
                      isActive({
                        currentPath: router.pathname,
                        linkPath: `${link.path}`,
                      })
                        ? 'brand.black'
                        : 'brand.white'
                    }
                    _hover={{
                      textDecoration: 'none',
                    }}>
                    <Flex
                      flexDir={'row'}
                      justifyContent={'flex-start'}
                      alignItems={'center'}
                      p={3}
                      w={'100%'}
                      gap={5}>
                      <Box>
                        {isActive({
                          currentPath: router.pathname,
                          linkPath: `${link.path}`,
                        })
                          ? link?.activeIcon
                          : link?.icon}
                      </Box>
                      <Text
                        fontSize={'16px'}
                        fontWeight={'600'}
                        lineHeight={'18px'}
                        color={
                          isActive({
                            currentPath: router.pathname,
                            linkPath: `${link.path}`,
                          })
                            ? 'brand.text'
                            : 'brand.white'
                        }>
                        {link.name}
                      </Text>
                    </Flex>
                  </Link>
                </Box>
              ))}
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
