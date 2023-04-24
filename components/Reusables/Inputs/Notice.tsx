import { Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay } from '@chakra-ui/react';
import React, { ReactNode } from 'react';

interface NoticeProps {
  placement: string | any;
  onClose?: any;
  isOpen: boolean;
  title: string | any;
  body: string | ReactNode;
}

export const Notice = ({ placement, onClose, isOpen, body, title }: NoticeProps) => {
  return (
    <>
      <Drawer placement={placement} onClose={onClose} isOpen={isOpen}>
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
          <DrawerHeader color={"brand.white"}>{title}</DrawerHeader>
          <DrawerBody>
            {body}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
