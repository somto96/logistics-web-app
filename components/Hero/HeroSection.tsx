import React from 'react';
import {
  Box,
  Image,
  ResponsiveArray,
  Flex,
  Text,
  InputGroup,
  Input,
  Button,
  InputRightElement,
  FormControl,
  FormLabel,
  useMediaQuery,
} from '@chakra-ui/react';
import Carousel from 'nuka-carousel';
import { sliderData } from './index';
import { Property } from 'csstype';

export const HeroSection = () => {
  const [isLargerThan800] = useMediaQuery('(min-width: 800px)');
  return (
    <Box w="100%">
      <Carousel
        renderCenterLeftControls={({ previousSlide }) => {
          if (isLargerThan800) {
            return (
              <Box onClick={previousSlide} cursor="pointer" p={10}>
                <Image
                  src="/images/svgs/left-icon.svg"
                  loading={'lazy'}
                  alt="left-icon"
                  sx={{
                    cursor: 'pointer',
                  }}
                />
              </Box>
            );
          }
          return null;
        }}
        renderCenterRightControls={({ currentSlide, goToSlide }) => {
          if (isLargerThan800) {
            return (
              <Box onClick={() => goToSlide(currentSlide + 1)} cursor="pointer" p={10}>
                <Image
                  src="/images/svgs/right-icon.svg"
                  loading={'lazy'}
                  alt="right-icon"
                  sx={{
                    cursor: 'pointer',
                  }}
                />
              </Box>
            );
          }
          return null;
        }}>
        {sliderData?.map(
          (item: {
            id: React.Key | null | undefined;
            url:
              | string
              | (string & {})
              | ResponsiveArray<Property.BackgroundImage>
              | Partial<Record<string | (string & {}), Property.BackgroundImage>>
              | undefined;
          }) => (
            <Box
              w="100%"
              h="100vh"
              key={item?.id}
              bgImage={item?.url}
              bgPosition="center"
              bgSize="cover"
              p={{ base: '10px', md: '10px' }}>
              <Box pos="relative" h={'100%'}>
                <Box pos="absolute" top={0} right={0} mt={12}>
                  <Image loading={'lazy'} src="/images/svgs/corner-tr.svg" alt="corner-tr" />
                </Box>
                <Box pos="absolute" bottom={0} left={0}>
                  <Image loading={'lazy'} src="/images/svgs/corner-bl.svg" alt="corner-bl" />
                </Box>
                <Flex
                  alignItems={'center'}
                  justifyContent={'center'}
                  h={'100%'}
                  flexDir={'column'}
                  gap={8}>
                  <Text
                    textAlign={{ base: 'center', md: 'left' }}
                    fontWeight={'800'}
                    color={'brand.white'}
                    fontSize="60px"
                    lineHeight="65px">
                    Delivery made easy
                  </Text>
                  <Text
                    color={'brand.white'}
                    fontSize="18px"
                    textAlign={{ base: 'center', md: 'left' }}
                    lineHeight="22px"
                    letterSpacing="0.05em">
                    Integrate our easy-to-use logistic platform to your businesses
                  </Text>
                  <Box w={{ base: '100%', sm: '100%', md: '50%' }}>
                    <Box
                      bgColor="rgba(242, 242, 242, 0.75)"
                      borderRadius="10px"
                      mixBlendMode="normal"
                      px={{ base: '1rem', sm: '5rem', md: '2rem' }}
                      py={{ base: '2rem', sm: '5rem', md: '3rem' }}
                      pos="relative">
                      <FormControl>
                        <FormLabel
                          fontSize="14px"
                          lineHeight="22px"
                          fontWeight={700}
                          letterSpacing={'0.01em'}>
                          TRACK YOUR PACKAGE
                        </FormLabel>
                        <InputGroup size="md">
                          <Input
                            bgColor={'brand.white'}
                            pr={{ base: '5rem', sm: '5rem', md: '7rem' }}
                            type={'text'}
                            placeholder="Enter your tracking number"
                            zIndex={2}
                            borderRadius="20px"
                            _focusVisible={{
                              borderColor: 'transparent',
                            }}
                            _placeholder={{
                              fontSize: '14px',
                              lineHeight: '22px',
                              letterSpacing: '0.01em',
                              color: '#828282',
                            }}
                          />
                          <InputRightElement width="6rem" right={1}>
                            <Button
                              h="1.75rem"
                              size="md"
                              borderRadius="16px"
                              py={2}
                              px={5}
                              bg={'brand.black'}
                              color={'brand.white'}
                              fontWeight={500}
                              fontSize="16px"
                              lineHeight="22px"
                              letterSpacing="0.01em"
                              _hover={{
                                backgroundColor: 'brand.black',
                                color: 'brand.white',
                              }}
                              _active={{
                                backgroundColor: 'brand.black',
                                color: 'brand.white',
                              }}
                              // onClick={() => console.log('test')}
                            >
                              {'TRACK'}
                            </Button>
                          </InputRightElement>
                        </InputGroup>
                      </FormControl>
                    </Box>
                  </Box>
                </Flex>
              </Box>
            </Box>
          )
        )}
      </Carousel>
    </Box>
  );
};
