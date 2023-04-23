import { Button, Flex, Text } from '@chakra-ui/react';
import React from 'react';

export const ContactUs = () => {
  return (
    <Flex flexDir={"column"} p={5} alignItems={'center'} justifyContent={'center'} bg={"brand.white"}>
      <Text fontWeight={700} fontSize={'20px'} lineHeight={'25px'} letterSpacing={'0.01em'} mb={5}>
        Want to know more?
      </Text>
      <Button
        bg={'brand.text'}
        borderRadius={'20px'}
        color={'brand.white'}
        lineHeight={'22px'}
        fontWeight={500}
        fontSize={'14px'}>
        Contact Us
      </Button>
    </Flex>
  );
};
