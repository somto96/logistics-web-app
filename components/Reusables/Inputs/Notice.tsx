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
  title: string | any;
  body: string | ReactNode;
  bg?: string;
}

export const Notice = ({
  placement,
  onClose,
  isOpen,
  body,
  title,
  bg = 'brand.black',
}: NoticeProps) => {
  return (
    <>
      <Drawer placement={placement} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent bg={bg}>
          <DrawerCloseButton
            size={'lg'}
            color={bg === 'brand.white' ? 'brand.text' : 'brand.white'}
          />
          <DrawerHeader color={'brand.white'}>{title}</DrawerHeader>
          <DrawerBody>{body}</DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
