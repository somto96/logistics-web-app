import { Flex, Text } from '@chakra-ui/react';
import React from 'react';
type Props = {
  data: number;
  title: string;
};
export const AnalyticsCard = ({ data, title }: Props) => {
  return (
    <Flex
      bg={'#F9F9F9'}
      w={{ md: '192px', sm: 'auto' }}
      borderRadius={'20px'}
      p={8}
      flexDir={'column'}
      justifyContent={'space-between'}
      gap={3}
      h={'150px'}>
      <Text textAlign={"left"} w={"123px"} overflowWrap={"break-word"} fontSize={'16px'} lineHeight={'20px'} color={'#4F4F4F'}>
        {title}
      </Text>
      <Text fontWeight={700} fontSize={'22px'} lineHeight={'30px'}>
        {new Intl.NumberFormat('en-US', { maximumSignificantDigits: 3 }).format(data)}
      </Text>
    </Flex>
  );
};
