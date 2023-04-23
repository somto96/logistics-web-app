import React from 'react';
import { Flex } from '@chakra-ui/react';

export const PageLoader = () => {
  return (
    <Flex
      position={'fixed'}
      top={0}
      left={0}
      color="brand.white"
      alignItems={'center'}
      justifyContent={'center'}
      w="100%"
      h={'100%'}
      bg={'rgba(0, 0, 0, 0.93)'}
      zIndex={998}
      overflow={'hidden'}
      backdropFilter={'blur(4px)'}>
        Please wait...
    </Flex>
  );
};
