import { Header } from '@/components/Header';
import { Flex, Text, Image, Box, Divider, SimpleGrid, useMediaQuery } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { PORTFOLIO, TEAMS } from '../utils';
import { ContactUs } from '@/components/ContactUs/ContactUs';
import { Footer } from '@/components/Footer/Footer';
import Head from 'next/head';

const AboutUs = () => {
  const [scroll, setScroll] = useState(false);
  const [isLargerThan800] = useMediaQuery('(min-width: 800px)');

  useEffect(() => {
    const changeBg = () => {
      if (window.scrollY >= 50) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };

    window.addEventListener('scroll', changeBg);

    return () => {
      window.removeEventListener('scroll', changeBg);
    };
  }, []);
  return (
    <>
      <Head>
        <title>Imperium Logistics || About Us</title>
        <meta name="description" content="About Us" />
      </Head>
      <Header
        showMenuList
        showMobileNav
        position={scroll ? 'fixed' : 'sticky'}
        showBreadCrumbs={true}
        isCurrentPage
        route={'/about-us'}
        pageName={'About us'}
      />

      <Flex
        flexDir={'column'}
        bg={'brand.white'}
        px={{ base: '1rem', md: '5rem' }}
        py={2}
        gap={8}
        color="brand.text">
        <Flex
          alignItems={'center'}
          justifyContent={'center'}
          gap={2}
          px={{ base: '1rem', md: '5rem' }}
          py={'3rem'}
          flexDir={{ base: 'column', md: 'row' }}>
          <Box
            w={{ base: '100%', md: '50%' }}
            data-aos={isLargerThan800 ? 'fade-left' : 'fade-up'}
            data-aos-duration="500"
            data-aos-delay="0">
            <Text fontWeight={600} fontSize={'30px'} lineHeight={'40px'}>
              We enhance smooth operation of your businesses by bringing delivery system closer to
              you
            </Text>
          </Box>
          <Box
            w={{ base: '100%', md: '50%' }}
            data-aos={isLargerThan800 ? 'fade-right' : 'fade-down'}
            data-aos-duration="500"
            data-aos-delay="0">
            <Text fontSize={'13px'} lineHeight={'18px'}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown
              printer took a galley of type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into electronic typesetting,
              remaining essentially unchanged. It was popularised in the 1960s with the release of
              Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </Text>
          </Box>
        </Flex>
        <Flex flexDir={'row'} data-aos="fade-down" data-aos-duration="900" data-aos-delay="0">
          <Image loading={'lazy'} src="images/pngs/summary-img.png" alt="summary" />
        </Flex>
        <Flex px={{ base: '1rem', md: '5rem' }}>
          <Divider
            sx={{
              borderColor: '#828282',
            }}
          />
        </Flex>
        <Flex
          alignItems={'flex-start'}
          justifyContent={'center'}
          gap={5}
          px={{ base: '1rem', md: '5rem' }}
          py={'1rem'}
          flexDir={{ base: 'column', md: 'row' }}>
          <Box
            w={{ base: '100%', md: '50%' }}
            px={5}
            data-aos={isLargerThan800 ? 'fade-left' : 'fade-up'}
            data-aos-duration="1200"
            data-aos-delay="0">
            <Text fontWeight={700} fontSize={'30px'} lineHeight={'40px'}>
              Our Mission
            </Text>
            <Text fontSize={'13px'} lineHeight={'18px'}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown
              printer took a galley of type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into electronic typesetting,
              remaining essentially unchanged. It was popularised in the 1960s with the release of
              Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </Text>
          </Box>
          <Box
            w={{ base: '100%', md: '50%' }}
            data-aos="zoom-in"
            data-aos-duration="1200"
            data-aos-delay="0">
            <Image w={'auto'} loading={'lazy'} src="images/pngs/mission-img.png" alt="mission" />
          </Box>
        </Flex>
        <Flex
          alignItems={'flex-start'}
          justifyContent={'center'}
          gap={5}
          px={{ base: '1rem', md: '5rem' }}
          py={'1rem'}
          flexDir={{ base: 'column', md: 'row' }}>
          <Box
            w={{ base: '100%', md: '50%' }}
            data-aos="zoom-in"
            data-aos-duration="1500"
            data-aos-delay="0">
            <Image w={'auto'} loading={'lazy'} src="images/pngs/vision-img.png" alt="vision" />
          </Box>
          <Box w={{ base: '100%', md: '50%' }} px={5}>
            <Text fontWeight={700} fontSize={'30px'} lineHeight={'40px'}>
              Our Vision
            </Text>
            <Text
              fontSize={'13px'}
              lineHeight={'18px'}
              data-aos={isLargerThan800 ? 'fade-right' : 'fade-up'}
              data-aos-duration="1500"
              data-aos-delay="0">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown
              printer took a galley of type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into electronic typesetting,
              remaining essentially unchanged. It was popularised in the 1960s with the release of
              Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </Text>
          </Box>
        </Flex>
        <Flex
          flexDir={{ base: 'column', md: 'row' }}
          alignItems={'center'}
          justifyContent={{ base: 'center', md: 'space-between' }}
          px={{ base: '1rem', md: '5rem' }}
          gap={8}
          py={'1rem'}
          data-aos="fade-up"
          data-aos-duration="2000"
          data-aos-delay="0">
          {PORTFOLIO?.map(item => (
            <Flex key={item?.id} flexDir={'column'} gap={5}>
              <Text fontWeight={500} fontSize={'20px'} lineHeight={'22px'}>
                {item?.title}
              </Text>
              <Text fontSize={'13px'} lineHeight={'18px'}>
                {item?.description}
              </Text>
              <Text fontWeight={700} fontSize={'60px'} lineHeight={'64px'}>
                {item?.numbers}
              </Text>
            </Flex>
          ))}
        </Flex>
        <Flex px={{ base: '1rem', md: '5rem' }}>
          <Divider
            sx={{
              borderColor: '#828282',
            }}
          />
        </Flex>

        <Flex bg={'#F9F9F9'} py={10} flexDir={'column'} px={{ base: '1rem', md: '5rem' }} gap={10}>
          <Flex
            gap={5}
            flexDir={'column'}
            data-aos="fade-down"
            data-aos-duration="2500"
            data-aos-delay="0">
            <Text fontWeight={700} fontSize={'30px'} lineHeight={'40px'}>
              Meet our wonderful leadership team
            </Text>
            <Divider
              sx={{
                borderColor: '#828282',
              }}
            />
          </Flex>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10} p={5}>
            {TEAMS?.map((member, index) => (
              <Flex
                key={member?.id}
                flexDir={'column'}
                gap={1}
                data-aos="up"
                data-aos-duration={`${(index + 1) * 6000}`}
                data-aos-delay="0">
                <Image loading="lazy" src={member?.url} alt={member?.name} />
                <Text fontWeight={600} fontSize={'16px'} lineHeight={'18px'}>
                  {member?.name}
                </Text>
                <Text fontSize={'12px'} lineHeight={'14px'} color={'#4F4F4F'}>
                  {member?.position}
                </Text>
              </Flex>
            ))}
          </SimpleGrid>
        </Flex>

        <ContactUs message={'Need help to get started?'} />
      </Flex>
      <Footer />
    </>
  );
};

export default AboutUs;
