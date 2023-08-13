import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalFooter,
} from '@chakra-ui/react';
import React from 'react';

type ModalComponentProps = {
  isOpen: boolean;
  showCloseBtn?: boolean;
  showFooter?: boolean;
  onClose: any;
  size: string;
  align?: string;
  header?: string | React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  style?: any;
};
export const ModalComponent = ({
  isOpen,
  onClose,
  size,
  showCloseBtn = true,
  showFooter = false,
  align = 'center',
  header = '',
  children,
  style,
  footer,
}: ModalComponentProps) => {

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={size}>
      <ModalOverlay />
      <ModalContent>
        {header !== '' ? (
          <ModalHeader  borderBottom={'1px'} borderBottomColor={'#BDBDBD'} sx={{
            textAlign: `${align}`
          }}>
            {header}
          </ModalHeader>
        ) : (
          <ModalHeader></ModalHeader>
        )}
        {showCloseBtn && <ModalCloseButton />}
        <ModalBody sx={style}>{children}</ModalBody>
        {showFooter && (
          <ModalFooter textAlign={'center'} borderTop={'1px'} borderTopColor={'#BDBDBD'}>
            {footer}
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  );
};
