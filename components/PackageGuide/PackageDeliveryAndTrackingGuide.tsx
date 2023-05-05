import { Flex, Text, Image } from '@chakra-ui/react';
export const PackageDeliveryAndTrackingGuide = () => {
  return (
    <>
      <Flex
        flexDir={'column'}
        alignItems={'center'}
        justifyContent={'center'}
        gap={8}
        mt={5}
        mb={5}
        px={{
          base: '2rem',
          sm: '2rem',
          md: '2rem',
        }}>
        <Text
          textAlign={{ base: 'center', md: 'left' }}
          fontWeight={600}
          fontSize="26px"
          lineHeight="31px"
          color="brand.black"
          data-aos="fade-up"
          data-aos-duration="1500"
          data-aos-delay="0">
          Package Delivery & Tracking
        </Text>
        <Image
          src={'../../images/pngs/track-guide.png'}
          alt="package delivery & tracking guide"
          data-aos="fade-down"
          data-aos-duration="1500"
          data-aos-delay="0"
        />
      </Flex>
    </>
  );
};
