import { Flex, Box, Heading, Button, Link, useMediaQuery } from '@chakra-ui/react';
import { WEBSITE_MENU_LINKS } from '@/utils/index';
import { useState, useEffect } from 'react';
import { Hamburger } from '@/components/Reusables/Hamburger/Hamburger';
import { MobileNav } from './MobileNav';
import { useRouter } from 'next/router';

type HeaderProps =  {
  showMenuList?: boolean,
  showMobileNav?: boolean
}
export const Header = ({
  showMenuList= false,
  showMobileNav= false,
}: HeaderProps) => {
  const [isLargerThan800] = useMediaQuery('(min-width: 800px)');
  const [expand, setExpand] = useState(false);
  const [scroll, setScroll] = useState(false);
  const router = useRouter();

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
      <Flex
        width="100%"
        alignItems="center"
        gap="2"
        bg={scroll ? 'brand.black' : 'transparent'}
        position="fixed"
        zIndex={10}
        px={{ base: '1rem', md: '5rem' }}
        py={1}
        justifyContent="space-between">
        <Box p="2" onClick={() => router.push("/")} cursor={"pointer"}>
          <Heading size="md" color="brand.white" fontSize="22px">
            ImperiumLogistics
          </Heading>
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
                cursor={"pointer"}
                onClick={() => router.push("/create-account")}
                >
                Create Account
              </Button>
            </Box>
          </Flex>
        )}
        { showMobileNav && !isLargerThan800 &&  (
          <Box p={2} onClick={() => setExpand(true)} cursor={"pointer"}>
            <Hamburger color={'#FFFFFF'} />
          </Box>
        )}
      </Flex>
      <MobileNav isOpen={expand} onClose={() => setExpand(false)} />
    </>
  );
};
