import { Flex, Image, Text } from '@chakra-ui/react';
import React from 'react';

export const DashboardPreview = () => {
  return (
    <Flex
      flexDir={{ base: 'column', sm: 'column', md: 'column', lg: 'row' }}
      gap={3}
      alignItems={'center'}
      py={2}
      px={{ base: '2rem', sm: '2rem', md: '3rem' }}
      mt={3}>
      <Image src="images/pngs/dashboard-view.png" alt="dashboard preview" />
      <Text
        fontWeight={600}
        fontSize={{ base: '30px', sm: '30px', md: '30px', lg: '45px' }}
        lineHeight="55px"
        letterSpacing="0.02em"
        color="brand.black"
        textAlign={{ base: 'center', sm: 'center', md: 'center', lg: 'left' }}>
        Easy to use Dashboard, register packages and create tracking IDs
      </Text>
    </Flex>
  );
};
