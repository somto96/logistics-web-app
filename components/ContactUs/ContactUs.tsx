import { Button, Flex, Text } from '@chakra-ui/react';
import React from 'react';

type ContactUsProps = {
  message?: string;
};
export const ContactUs = ({ message = 'Want to know more?' }: ContactUsProps) => {
  return (
    <Flex
      flexDir={'column'}
      p={5}
      alignItems={'center'}
      justifyContent={'center'}
      bg={'brand.white'}
      data-aos="fade-up"
      data-aos-duration="9000"
      data-aos-delay="0">
      <Text fontWeight={700} fontSize={'20px'} lineHeight={'25px'} letterSpacing={'0.01em'} mb={5}>
        {message}
      </Text>
      <Button
        bg={'brand.text'}
        borderRadius={'20px'}
        color={'brand.white'}
        lineHeight={'22px'}
        fontWeight={500}
        fontSize={'14px'}
        _hover={{
          backgroundColor: 'brand.text',
          color: 'brand.white',
        }}
        _active={{
          backgroundColor: 'brand.text',
          color: 'brand.white',
        }}>
        Contact Us
      </Button>
    </Flex>
  );
};
