import React from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Flex,
  Box,
  Button,
  Link,
} from '@chakra-ui/react';
import { WEBSITE_MENU_LINKS } from '@/utils/index';
import { useRouter } from 'next/router';

type Props = {
  isOpen: boolean;
  onClose: any;
};

export const MobileNav = ({ isOpen, onClose }: Props) => {
  const router = useRouter();
  return (
    <>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
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
            <Flex flexDir={'column'} gap={8}>
              {WEBSITE_MENU_LINKS.map(link => {
                return (
                  <Link
                    key={link.id}
                    href={link.path}
                    color="brand.white"
                    _hover={{
                      fontWeight: '500',
                    }}
                    style={{
                      textDecoration: 'none',
                      fontSize: '14px',
                      lineHeight: '20px',
                    }}>
                    {link.title}
                  </Link>
                );
              })}
              <Box>
                <Button
                  bg="brand.white"
                  color="brand.text"
                  fontSize="14px"
                  px={4}
                  py={2}
                  style={{
                    borderRadius: '20px',
                    lineHeight: '22px',
                  }}
                  cursor={'pointer'}
                  onClick={() => router.push('/create-account')}
                  >
                  Create Account
                </Button>
              </Box>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
