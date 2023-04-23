import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import React, { ReactNode } from 'react';

interface CardWrapperProps {
  title: string;
  pageTitle: string;
  width: any;
  children: ReactNode;
}

export const CardWrapper = ({ title, pageTitle, width, children }: CardWrapperProps) => {
  return (
    <Flex
      alignItems={'center'}
      justifyContent={'flex-start'}
      h={'auto'}
      flexDir={'column'}
      gap={8}
      mt={12}>
      <Heading
        fontWeight={500}
        fontSize={'30px'}
        lineHeight={'38px'}
        letterSpacing={'0.02em'}
        color={'brand.white'}>
        {pageTitle}
      </Heading>
      <Flex
        flexDir={'column'}
        bg={'rgba(255, 255, 255, 0.9)'}
        w={width}
        color={'brand.text'}
        boxShadow={'0px 20px 40px rgba(0, 0, 0, 0.15)'}
        borderRadius={'16px'}>
        <Flex
          flexDir={'row'}
          alignItems={'center'}
          justifyContent={'center'}
          borderBottom={'1px'}
          borderColor="#BDBDBD"
          py={5}
          px={3}
          >
          <Text textAlign={'center'}>{title}</Text>
        </Flex>
        <Box p={5}>{children}</Box>
      </Flex>
    </Flex>
  );
};
