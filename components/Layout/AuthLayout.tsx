import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useAuthState } from 'store/auth/slice';
import { Box } from '@chakra-ui/react';

export type AuthLayoutProps = {
  children: React.ReactNode;
  bg: string;
};

export const AuthLayout = ({ children, bg }: AuthLayoutProps) => {
  const router = useRouter();
  const { loginData } = useAuthState();

  useEffect(() => {
    if (!loginData?.isLoggedIn) {
      router.push('/logout');
    }
  }, []);

  return (
    <Box h="100vh" bg={bg}>
      {children}
    </Box>
  );
};
