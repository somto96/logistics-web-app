import { Flex, Link, Text, Box, Collapse } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { isActive } from '../../utils/helperFunctions';
import React, { useState } from 'react';
import {
  USER_SIDEBAR_LINKS,
  ADMIN_SIDEBAR_LINKS,
  RIDER_SIDEBAR_LINKS,
  USER_MANAGEMENT_SUBMENU,
} from '@/components/Layout/utils';

type Props = {
  role: string;
};

export const SideBar = ({ role = 'company' }: Props) => {
  const router = useRouter();
  const [showSubMenu, setShowSubMenu] = useState<boolean>(false);
  const links = () => {
    switch (role?.toLowerCase()) {
      case 'company':
        return USER_SIDEBAR_LINKS;
      case 'rider':
        return RIDER_SIDEBAR_LINKS;
      default:
        return ADMIN_SIDEBAR_LINKS;
    }
  };
  return (
    <Flex alignItems={'center'} flexDir={'column'} justifyContent={'center'} gap={8} p={5}>
      {links()?.map((link: any) => (
        <Box
          key={link?.id}
          cursor={'pointer'}
          onClick={() =>
            link?.hasDropdown ? setShowSubMenu(!showSubMenu) : router.push(link.path)
          }
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
              gap={5}>
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
            <Collapse in={showSubMenu && link?.hasDropdown} animateOpacity>
              <Flex
                alignItems={'flex-start'}
                flexDir={'column'}
                gap={1}
                w={'100%'}
                color="brand.inputBorderColor"
                bg="brand.white"
                rounded="md"
                shadow="md">
                {USER_MANAGEMENT_SUBMENU?.map((item: any) => (
                  <Flex p={3} key={item?.id}>
                    <Text
                      onClick={() => {
                        router.push(item?.path);
                        setShowSubMenu(true);
                      }}
                      color={router.pathname === item?.path ? 'brand.text' : '#828282'}
                      fontSize={'14px'}
                      lineHeight={'18px'}
                      textAlign={'left'}>
                      {item?.name}
                    </Text>
                  </Flex>
                ))}
              </Flex>
            </Collapse>
          </Link>
        </Box>
      ))}
    </Flex>
  );
};
