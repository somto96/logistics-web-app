import { Header } from '@/components/Header';
import { CardWrapper } from '@/components/Reusables/CardWrapper';
import { Box, Text} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { PageLoader } from '@/components/Reusables/Loaders/PageLoader';
import { CreateAccountForm } from '@/components/Forms/CreateAccountForm';
import { useCreateAccountsController } from 'controllers/useCreateAccountController';
// import { useReCaptcha } from 'next-recaptcha-v3';

const CreateAccount = () => {
  const { onboardingState } = useCreateAccountsController();
  const [scroll, setScroll] = useState(false);
  // Import 'executeRecaptcha' using 'useReCaptcha' hook
  // const { executeRecaptcha } = useReCaptcha();
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
      {onboardingState?.loading?.includes('POST_CREATE_ACCOUNTS') && <PageLoader />}
      <Header background={scroll ? 'brand.black' : 'transparent'} />
      <Box
        w="100%"
        h="100%"
        bgImage={"url('images/pngs/slider-two.png')"}
        bgPosition="center"
        bgSize="cover"
        py={10}
        p={{ base: '10px', md: '10px' }}>
        <CardWrapper
          pageTitle={'Create Account'}
          subtitle={'Welcome, get started on joining our growing members'}
          width={{ sm: '515px', md: '818px' }}>
          {onboardingState?.createAccount?.successStatus && (
            <Box
              bg={'brand.success'}
              textAlign={'center'}
              color="brand.white"
              p={5}
              borderRadius={'16px'}>
              <Text fontWeight={600} fontSize={'16px'} lineHeight={'18px'} letterSpacing={'0.02em'}>
                {onboardingState?.createAccount?.successMessage?.title}
              </Text>
              <Text fontSize={'14px'} lineHeight={'18px'} letterSpacing={'0.02em'}>
                {onboardingState?.createAccount?.successMessage?.action}
              </Text>
            </Box>
          )}
          <CreateAccountForm />
        </CardWrapper>
      </Box>
    </>
  );
};

export default CreateAccount;
