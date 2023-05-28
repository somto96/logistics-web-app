import { Header } from '@/components/Header';
import { CardWrapper } from '@/components/Reusables/CardWrapper';
import { Notice } from '@/components/Reusables/Inputs/Notice';
import { PageLoader } from '@/components/Reusables/Loaders/PageLoader';
import {
  Box,
  Image,
  Flex,
  Text,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { LoginForm } from '@/components/Forms/LoginForm';
import { useLoginController } from 'controllers/useLoginController';

const Signin = () => {
  const [showNotice, setShowNotice] = useState<boolean>(false);
  const { authState, submitted } = useLoginController();

  useEffect(() => {
    if (submitted) {
      authState?.loginData?.successStatus && !authState?.loading?.includes('POST_LOGIN') && setShowNotice(true);
    }
  }, [authState?.loading, authState?.loginData?.successStatus, submitted]);
  return (
    <>
      {authState?.loading?.includes('POST_LOGIN') && <PageLoader />}
      <Header background={'transparent'} />

      <Box
        w="100%"
        h="100vh"
        bgImage={"url('images/pngs/slider-two.png')"}
        bgPosition="center"
        bgSize="cover"
        py={10}
        p={{ base: '10px', md: '10px' }}>
        <CardWrapper
          pageTitle={''}
          title={'Sign in'}
          align={'left'}
          width={{ sm: '300px', md: '500px' }}>
          <LoginForm />
        </CardWrapper>
      </Box>
      {showNotice && (
        <Notice
          placement={'bottom'}
          onClose={() => setShowNotice(false)}
          isOpen={showNotice}
          title={`Welcome ${authState?.loginData?.user?.companyName}`}
          body={
            <Flex
              flexDir={'column'}
              alignItems={'center'}
              justifyContent={'center'}
              color="brand.white"
              gap={10}
              mb={8}>
              <Image
                src="images/svgs/under-construction.svg"
                w={'auto'}
                h={'200px'}
                alt="under-construction"
              />
              <Text textAlign={'center'}>Your dashboard is still under construction</Text>
            </Flex>
          }
        />
      )}
    </>
  );
};

export default Signin;
