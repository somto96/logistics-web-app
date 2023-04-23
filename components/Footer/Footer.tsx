import {
  Flex,
  Heading,
  useMediaQuery,
  Link,
  FormLabel,
  FormControl,
  InputGroup,
  Input,
  Image,
  Button,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { LEGAL_LINKS, GET_STARTED_LINKS, QUICK_LINKS, SOCIAL_LINKS } from '@/utils/index';

export const Footer = () => {
  const [isLargerThan800] = useMediaQuery('(min-width: 800px)');
  return (
    <Flex
      flexDir={'column'}
      w={'100%'}
      bgImage={"url('images/pngs/footer-bg.png')"}
      bgPosition="center"
      bgSize="cover">
      <Flex
        flexDir={isLargerThan800 ? 'row' : 'column'}
        flexWrap={'wrap'}
        alignItems={'flex-start'}
        justifyContent={isLargerThan800 ? 'space-between' : 'flex-start'}
        gap={isLargerThan800 ? 0 : 10}
        p={8}
        borderBottom={'1px'}
        borderColor="rgba(232, 232, 232, 0.5)">
        <Flex flexDir={'column'} alignItems={'flex-start'}>
          <Heading
            fontWeight={700}
            fontSize={'18px'}
            lineHeight={'20px'}
            letterSpacing={'0.03em'}
            color={'brand.white'}>
            ImperiumLogistics
          </Heading>
        </Flex>
        <Flex flexDir={'column'} alignItems={'flex-start'} gap={3}>
          <Heading
            fontWeight={700}
            fontSize={'18px'}
            lineHeight={'20px'}
            letterSpacing={'0.03em'}
            color={'brand.white'}>
            QUICK LINKS
          </Heading>
          {QUICK_LINKS?.map(item => (
            <Link
              key={item?.id}
              color={'brand.white'}
              fontSize={'16px'}
              lineHeight={'20px'}
              letterSpacing={'0.03em'}
              href={item?.path}
              style={{
                color: 'brand.white',
                textDecoration: 'none',
              }}>
              {item?.title}
            </Link>
          ))}
        </Flex>
        <Flex flexDir={'column'} alignItems={'flex-start'} gap={3}>
          <Heading
            fontWeight={700}
            fontSize={'18px'}
            lineHeight={'20px'}
            letterSpacing={'0.03em'}
            color={'brand.white'}>
            GET STARTED
          </Heading>
          {GET_STARTED_LINKS?.map(item => (
            <Link
              key={item?.id}
              color={'brand.white'}
              fontSize={'16px'}
              lineHeight={'20px'}
              letterSpacing={'0.03em'}
              href={item?.path}
              style={{
                color: 'brand.white',
                textDecoration: 'none',
              }}>
              {item?.title}
            </Link>
          ))}
        </Flex>
        <Flex flexDir={'column'} alignItems={'flex-start'} gap={3}>
          <Heading
            fontWeight={700}
            fontSize={'18px'}
            lineHeight={'20px'}
            letterSpacing={'0.03em'}
            color={'brand.white'}>
            LEGAL
          </Heading>
          {LEGAL_LINKS?.map(item => (
            <Link
              key={item?.id}
              color={'brand.white'}
              fontSize={'16px'}
              lineHeight={'20px'}
              letterSpacing={'0.03em'}
              href={item?.path}
              style={{
                color: 'brand.white',
                textDecoration: 'none',
              }}>
              {item?.title}
            </Link>
          ))}
        </Flex>
        <Flex flexDir={'column'} alignItems={'flex-start'} gap={3}>
          <Heading
            fontWeight={700}
            fontSize={'18px'}
            lineHeight={'20px'}
            letterSpacing={'0.03em'}
            color={'brand.white'}>
            SUBSCRIBE FOR NEWLETTER
          </Heading>
          <FormControl>
            <FormLabel
              fontSize="16px"
              lineHeight="20px"
              letterSpacing={'0.03em'}
              color={'brand.white'}>
              Do not miss any update from us
            </FormLabel>
            <InputGroup size="sm">
              <Input
                bgColor={'brand.white'}
                p={5}
                type={'text'}
                placeholder="Enter your email address"
                zIndex={2}
                borderRadius="5px"
                _focusVisible={{
                  borderColor: 'transparent',
                }}
                _placeholder={{
                  fontSize: '14px',
                  lineHeight: '27px',
                  letterSpacing: '0.03em',
                  color: '#BDBDBD',
                }}
              />
            </InputGroup>
            <Button
              mt={4}
              bg={'#333333'}
              fontSize={'16px'}
              fontWeight={500}
              lineHeight={'22px'}
              letterSpacing={'0.01em'}
              color={'brand.white'}
              type="submit">
              Submit
            </Button>
          </FormControl>
        </Flex>
      </Flex>
      <Flex
        flexDir={'row'}
        flexWrap={'wrap'}
        alignItems={'center'}
        justifyContent={isLargerThan800 ? 'space-between' : 'flex-start'}
        p={8}
        borderBottom={'1px'}
        borderColor="rgba(232, 232, 232, 0.5)">
        <Flex
          gap={3}
          alignItems={'center'}
          w={isLargerThan800 ? 'auto' : '100%'}
          justifyContent={isLargerThan800 ? 'flex-start' : 'center'}
          mb={8}>
          {SOCIAL_LINKS?.map(item => (
            <Link key={item?.id}>
              <Image src={item?.src} alt={item?.alt} />
            </Link>
          ))}
        </Flex>
        <Flex
          alignItems={'center'}
          flexDir={isLargerThan800 ? 'row' : 'column'}
          gap={3}
          w={isLargerThan800 ? 'auto' : '100%'}
          justifyContent={isLargerThan800 ? 'flex-start' : 'center'}>
          <Heading
            fontWeight={700}
            fontSize={'18px'}
            lineHeight={'20px'}
            letterSpacing={'0.03em'}
            color={'brand.white'}>
            CONTACT US:
          </Heading>
          <Flex
            gap={3}
            bg={'#E8FAF8'}
            borderRadius={'5px'}
            cursor={'pointer'}
            p={3}
            onClick={() => window.open('tel:+2348095594903')}>
            <Image src={'images/svgs/phone-icon.svg'} alt={`Telephone`} />
            <Text fontSize={'14px'} lineHeight={'17px'} fontWeight={600}>
              +2348095594903
            </Text>
          </Flex>
          <Flex
            gap={3}
            bg={'#E8FAF8'}
            borderRadius={'5px'}
            cursor={'pointer'}
            p={3}
            onClick={() => window.open('mailto:email@example.com')}>
            <Image src={'images/svgs/phone-icon.svg'} alt={`Telephone`} />
            <Text fontSize={'14px'} lineHeight={'17px'} fontWeight={600}>
              mailto:email@example.com
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <Flex flexDir={'row'} alignItems={'center'} justifyContent={'center'} p={5}>
        <Text color={'#E0E0E0'} fontSize={'14px'} lineHeight={'120%'}>
          All Rights Reserved © logistics 2022
        </Text>
      </Flex>
    </Flex>
  );
};
