import { Flex, Link, Text, Box } from '@chakra-ui/react';
import { USER_SIDEBAR_LINKS } from './utils';
import { useRouter } from 'next/router';
import { isActive } from '../../utils/helperFunctions';
import React from 'react';

export const SideBar = () => {
  const router = useRouter();
  return (
    <Flex alignItems={'center'} flexDir={'column'} justifyContent={'center'} gap={8} p={5}>
      {USER_SIDEBAR_LINKS?.map(link => (
        <Box
          key={link?.id}
          cursor={'pointer'}
          bg={
            isActive({
              currentPath: router.pathname,
              linkPath: `${link.path}`,
            })
              ? 'brand.white'
              : 'brand.black'
          }
          w={'100%'}
          borderRadius={'20px'}>
          <Link
            href={link?.path}
            color={
              isActive({
                currentPath: router.pathname,
                linkPath: `${link.path}`,
              })
                ? 'brand.black'
                : 'brand.white'
            }
            _hover={{
              textDecoration: 'none',
            }}>
            <Flex
              flexDir={'row'}
              justifyContent={'flex-start'}
              alignItems={'center'}
              p={3}
              w={'100%'}
              gap={5}
              >
              <Box>
                {isActive({
                  currentPath: router.pathname,
                  linkPath: `${link.path}`,
                })
                  ? link?.activeIcon
                  : link?.icon}
              </Box>

              {/* <Image
              alt={link.name}
              src={
                isActive({
                  currentPath: router.pathname,
                  linkPath: `${link.path}`,
                })
                  ? link.activeIcon
                  : link.icon
              }
              height={'24px'}
              width={'24px'}
            /> */}
              <Text
                fontSize={'16px'}
                fontWeight={'600'}
                lineHeight={'18px'}
                color={
                  isActive({
                    currentPath: router.pathname,
                    linkPath: `${link.path}`,
                  })
                    ? 'brand.text'
                    : 'brand.white'
                }>
                {link.name}
              </Text>
            </Flex>
          </Link>
        </Box>
      ))}
    </Flex>
  );
};
