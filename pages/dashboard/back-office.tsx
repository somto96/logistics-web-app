import { DashboardHeader } from '@/components/Header/DashboardHeader';
import { AuthLayout } from '@/components/Layout/AuthLayout';
import { Grid, GridItem, useMediaQuery } from '@chakra-ui/react';
import React from 'react';
import { useAuthState } from 'store/auth/slice';
import { DROPDOWN_LINKS } from '@/utils/index';
import { SideBar } from '@/components/Layout/SideBar';
// import { DashboardView } from '@/components/BackOffice/DashboardView';
import { AdminMainView } from '@/components/BackOffice/AdminMainView';
import Head from 'next/head';

const BackOffice = () => {
  const { loginData } = useAuthState();
  const [isLargerThan800] = useMediaQuery('(min-width: 800px)');

  return (
    <>
      <Head>
        <title>Admin&apos;s Dashboard </title>
        <meta name="description" content="Admin's Dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AuthLayout bg="brand.white">
        <DashboardHeader
          user={loginData?.user?.name}
          optionList={DROPDOWN_LINKS}
          usage={'back-office'}
        />
        <Grid h={'100%'} templateRows="repeat(1, 1fr)" templateColumns="repeat(10, 1fr)">
          {/* {isLargerThan800 && (
          <GridItem colSpan={2} bg="brand.black">
            <SideBar />
          </GridItem>
        )} */}
          <GridItem colSpan={2} bg="brand.black">
            <SideBar role={'admin'} />
          </GridItem>
          <GridItem colSpan={isLargerThan800 ? 8 : 10} bg="brand.white">
            <AdminMainView />
          </GridItem>
        </Grid>
      </AuthLayout>
    </>
  );
};

export default BackOffice;
