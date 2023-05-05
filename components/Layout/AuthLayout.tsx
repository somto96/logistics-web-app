import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useAuthState } from 'store/auth/slice';

export type AuthLayoutProps = {
  children: React.ReactNode;
};

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  const router = useRouter();
  const { loginData } = useAuthState();

  useEffect(() => {
    if (!loginData?.isLoggedIn) {
      router.push('/logout');
    }
  }, []);

  return <>{children}</>;
};
