import React from 'react';
import { Flex } from '@chakra-ui/react';

export type PageLoaderProps = {
  message?: string;
}

export const PageLoader = ({
  message= "Please wait"
}: PageLoaderProps) => {
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
        {message}
    </Flex>
  );
};
