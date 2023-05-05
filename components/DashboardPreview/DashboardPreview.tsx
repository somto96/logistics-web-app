import { Flex, Image, Text, useMediaQuery } from '@chakra-ui/react';
import React from 'react';

export const DashboardPreview = () => {
  const [isLargerThan800] = useMediaQuery('(min-width: 800px)');
  return (
    <Flex
      flexDir={{ base: 'column', sm: 'column', md: 'column', lg: 'row' }}
      gap={3}
      alignItems={'center'}
      py={2}
      px={{ base: '2rem', sm: '2rem', md: '3rem' }}
      mt={3}>
      <Image
        src="images/pngs/dashboard-view.png"
        placeholder="blur"
        alt="dashboard preview"
        data-aos="zoom-in"
        data-aos-duration="5000"
        data-aos-delay="0"
      />
      <Text
        fontWeight={600}
        fontSize={{ base: '30px', sm: '30px', md: '30px', lg: '45px' }}
        lineHeight="55px"
        letterSpacing="0.02em"
        color="brand.black"
        textAlign={{ base: 'center', sm: 'center', md: 'center', lg: 'left' }}
        data-aos={ isLargerThan800 ? "fade-right" : "fade-down"}
        data-aos-duration="5000"
        data-aos-delay="0">
        Easy to use Dashboard, register packages and create tracking IDs
      </Text>
    </Flex>
  );
};
