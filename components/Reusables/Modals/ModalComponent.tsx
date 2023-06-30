import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import React from 'react';


type ModalComponentProps = {
    isOpen: boolean;
    showCloseBtn?: boolean;
    onClose: any;
    size: string;
    children: React.ReactNode;

}
export const ModalComponent = ({ isOpen, onClose, size, showCloseBtn= true, children }: ModalComponentProps) => {
//   const { isOpen, onClose } = useDisclosure();

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={size}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader></ModalHeader>
        {showCloseBtn && <ModalCloseButton />}
        <ModalBody>
          {children}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
