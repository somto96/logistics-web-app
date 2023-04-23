import { Flex, Box, Image, useMediaQuery, Text } from '@chakra-ui/react';
import React from 'react';
import { testimonialData } from './testimonialData';
import Carousel from 'nuka-carousel';
import { TestimonialCard } from './TestimonialCard';

export const TestimonialSection = () => {
  const [isLargerThan1210px, isLargerThan769px, isLargerThan800px] = useMediaQuery([
    '(min-width: 1210px)',
    '(min-width: 769px)',
    '(min-width: 800px)',
  ]);

  return (
    <Flex
      flexDir={'column'}
      alignItems={'center'}
      justifyContent={'center'}
      w="100%"
      mt={5}
      p={10}
      position={'relative'}>
      <Box pos="absolute" top={0} left={0} zIndex={isLargerThan800px ? 1 : -1}>
        <Image src="/images/svgs/blob-tl.svg" alt="blob-tl" />
      </Box>
      <Box pos="absolute" bottom={0} right={0} zIndex={isLargerThan800px ? 1 : -1}>
        <Image src="/images/svgs/ellipse-br.svg" alt="blob-tl" />
      </Box>
      <Text
        fontWeight={600}
        fontSize={'36px'}
        lineHeight={'31px'}
        color={'brand.text'}
        mb={5}
        zIndex={5}
        textAlign={'center'}>
        What our happy clients are saying
      </Text>
      <Flex
        flexDir={'column'}
        maxWidth={isLargerThan1210px ? '1210px' : isLargerThan769px ? '769px' : '347px'}
        width={'100%'}
        transition="all 0.3s ease"
        alignSelf={'center'}
        alignItems={'center'}
        mb={'32px'}
        zIndex={5}>
        <Carousel
          wrapAround={true}
          slidesToScroll={1}
          speed={1000}
          style={{
            maxWidth: isLargerThan1210px ? 1140 : isLargerThan769px ? 769 : 347,
            width: '100%',
            marginTop: '20px',
          }}
          slidesToShow={isLargerThan1210px ? 3 : isLargerThan769px ? 2 : 1}
          renderBottomCenterControls={null}
          renderCenterLeftControls={({ previousSlide, currentSlide }) => {
            if (isLargerThan800px) {
              return (
                <Flex
                  flexDir={'row'}
                  justifyContent="center"
                  alignItems={'center'}
                  cursor="pointer"
                  ml={'-60px'}>
                  <Box
                    onClick={previousSlide}
                    cursor="pointer"
                    color={currentSlide === 0 ? '#E0E0E0' : 'brand.text'}>
                    <Image
                      src="/images/svgs/testimonial-slide-left.svg"
                      alt="test"
                    />
                  </Box>
                </Flex>
              );
            }
            return null;
          }}
          renderCenterRightControls={({ currentSlide, goToSlide }) => {
            if (isLargerThan800px) {
              return (
                <Flex
                  flexDir={'row'}
                  justifyContent="center"
                  alignItems={'center'}
                  cursor="pointer"
                  mr={'-60px'}>
                  <Box onClick={() => goToSlide(currentSlide + 1)} cursor="pointer">
                    <Image
                      src="/images/svgs/testimonial-slide-right.svg"
                      alt="test"
                    />
                  </Box>
                </Flex>
              );
            }
            return null;
          }}>
          {testimonialData?.map((item) => {
            return <TestimonialCard key={item?.id} data={item} />;
          })}
        </Carousel>
      </Flex>
    </Flex>
  );
};
