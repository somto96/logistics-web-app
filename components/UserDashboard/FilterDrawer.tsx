import {
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
  } from '@chakra-ui/react';
  import React, { ReactNode } from 'react';
  
  interface NoticeProps {
    placement: string | any;
    onClose?: any;
    isOpen: boolean;
    body: string | ReactNode;
  }
  
  export const FilterDrawer = ({
    placement,
    onClose,
    isOpen,
    body,
  }: NoticeProps) => {
    return (
      <>
        <Drawer placement={placement} onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent bg={"brand.white"}>
            <DrawerCloseButton
              size={'lg'}
              color={'brand.text'}
            />
            <DrawerHeader></DrawerHeader>
            <DrawerBody p={5}>{body}</DrawerBody>
          </DrawerContent>
        </Drawer>
      </>
    );
  };
  