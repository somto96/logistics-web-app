import React from 'react';
import { Box, Flex, Image, Text, Divider } from '@chakra-ui/react';

interface TestimonialCardProps {
  data: {
    message: string;
    name: string;
    occupation: string;
    company: string;
    avatar: string;
  };
  animation: {
    dataAOS: string;
    dataAOSDuration: string;
    dataAOSDelay: string;
  }
}
export const TestimonialCard = ({ data, animation }: TestimonialCardProps) => {
  return (
    <Flex
      bg={'brand.white'}
      flexDir={'column'}
      h={'292px'}
      w={{ md: "362px", base: "320px"}}
      p={3}
      borderRadius={'8px'}
      border="1px"
      borderColor="rgba(0, 0, 0, 0.1)"
      ml={{ md: '0px', base: '11px' }}
      data-aos={animation?.dataAOS}
      data-aos-duration={animation?.dataAOSDuration}
      data-aos-delay={animation?.dataAOSDelay} 
      >
      <Flex
        flexDir={'row'}
        w={'100%'}
        alignItems={'start'}
        justifyContent={'center'}
        mb={3}
        gap={3}>
        <Image src="images/svgs/quotes-icon.svg" alt="quotes" />
        <Box>
          <Text fontWeight={300} fontSize={'15px'} lineHeight={'20px'} color={'brand.black'}>
            {data?.message}
          </Text>
        </Box>
      </Flex>
      <Divider colorScheme={'red'} />
      <Flex
        flexDir={'row'}
        w={'100%'}
        alignItems={'center'}
        justifyContent={'flex-start'}
        gap={3}
        mt={3}>
        <Image src={data?.avatar} alt={`${data?.name}'s avatar`} />

        <Flex flexDir={'column'} gap={1} color={'brand.black'}>
          <Text as={'span'} fontWeight={'bold'} fontSize={'14px'} lineHeight={'18px'}>
            {data?.name}
          </Text>
          <Text as={'span'} fontSize={'10px'} lineHeight={'14px'}>
            {data?.occupation}
          </Text>
          <Text as={'span'} fontSize={'12px'} lineHeight={'16px'}>
            {data?.company}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};
