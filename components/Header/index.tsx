import {
  Flex,
  Box,
  // Heading,
  Button,
  Link,
  Image,
  useMediaQuery,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@chakra-ui/react';
import { WEBSITE_MENU_LINKS } from '@/utils/index';
import { useState } from 'react';
import { Hamburger } from '@/components/Reusables/Hamburger/Hamburger';
import { MobileNav } from './MobileNav';
import { useRouter } from 'next/router';

type HeaderProps = {
  showMenuList?: boolean;
  showMobileNav?: boolean;
  showBreadCrumbs?: boolean;
  background?: string | any;
  isCurrentPage?: boolean;
  route?: string;
  pageName?: string;
  position?: string | any;
  src ?: string
};
export const Header = ({
  showMenuList = false,
  showMobileNav = false,
  showBreadCrumbs = false,
  background = "brand.black",
  isCurrentPage = false,
  position = "fixed",
  src = "images/svgs/header-logo.svg",
  route,
  pageName,
}: HeaderProps) => {
  const [isLargerThan800] = useMediaQuery('(min-width: 800px)');
  const [expand, setExpand] = useState(false);
  const router = useRouter();
  
  return (
    <>
      <Flex flexDir={'column'} position={position} zIndex={10} w={'100%'}>
        <Flex
          width="100%"
          alignItems="center"
          gap="2"
          bg={background}
          px={{ base: '1rem', md: '5rem' }}
          py={1}
          justifyContent="space-between">
          <Box p="2" onClick={() => router.push('/')} cursor={'pointer'}>
            <Image loading="lazy" src={src} alt="header-logo" />
          </Box>
          {isLargerThan800 && showMenuList && (
            <Flex flexDir="row" justifyContent="space-between" alignItems="center" gap="5">
              {WEBSITE_MENU_LINKS.map(link => {
                return (
                  <Link
                    key={link.id}
                    href={link.path}
                    color="brand.white"
                    _hover={{
                      fontWeight: '500',
                    }}
                    style={{
                      textDecoration: 'none',
                      fontSize: '14px',
                      lineHeight: '20px',
                    }}>
                    {link.title}
                  </Link>
                );
              })}
              <Box p={2}>
                <Button
                  bg="brand.white"
                  color="brand.text"
                  p="5"
                  fontSize="14px"
                  style={{
                    borderRadius: '20px',
                    lineHeight: '22px',
                  }}
                  cursor={'pointer'}
                  onClick={() => router.push('/create-account')}>
                  Create Account
                </Button>
              </Box>
            </Flex>
          )}
          {showMobileNav && !isLargerThan800 && (
            <Box p={2} onClick={() => setExpand(true)} cursor={'pointer'}>
              <Hamburger color={'#FFFFFF'} />
            </Box>
          )}
        </Flex>
        {showBreadCrumbs && (
          <Breadcrumb
            px={{ base: '1rem', md: '5rem' }}
            py={2}
            spacing="8px"
            fontSize={'14px'}
            lineHeight={'17px'}
            color={'#4F4F4F'}
            bg={'brand.track'}
            separator={<Image src="images/svgs/chevron-right-icon.svg" alt="right-icon" />}>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">
                <Image src="images/svgs/home-icon.svg" alt="home-icon" />
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage={isCurrentPage}>
              <BreadcrumbLink href={route}>{pageName}</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        )}
      </Flex>

      <MobileNav isOpen={expand} onClose={() => setExpand(false)} />
    </>
  );
};
