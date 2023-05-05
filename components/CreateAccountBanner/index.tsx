import { Box, Text, Flex, Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';

export const CreateAccountBanner = () => {
  const router = useRouter();
  return (
    <Box
      w="100%"
      bgImage={"url('../../images/pngs/create-account-banner.png')"}
      bgPosition="center"
      bgSize="cover"
      p={{ base: '2rem', md: '5rem' }}
      data-aos="fade-up"
      data-aos-duration="3000"
      data-aos-delay="0"
      >
      <Flex flexDir={'column'} alignItems={'start'} justifyContent={'center'}>
        <Flex flexDir={'column'} alignItems={'center'} justifyContent={'center'}>
          <Text fontWeight={500} fontSize="20px" lineHeight="22px" color="brand.black" mb={3}>
            Set up your account for free now
          </Text>
          <Button
            bg="brand.black"
            color="brand.white"
            onClick={() => router.push('/create-account')}
            p="5"
            fontSize="14px"
            _hover={{
              background: 'brand.black',
              color: 'brand.white',
            }}
            style={{
              borderRadius: '20px',
              lineHeight: '22px',
            }}>
            Create Account
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};
