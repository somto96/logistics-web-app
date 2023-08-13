import { DashboardHeader } from '@/components/Header/DashboardHeader';
import { AuthLayout } from '@/components/Layout/AuthLayout';
import { Grid, GridItem, useMediaQuery } from '@chakra-ui/react';
import React from 'react';
import { useAuthState } from 'store/auth/slice';
import { DROPDOWN_LINKS } from '@/utils/index';
import { SideBar } from '@/components/Layout/SideBar';
import { RidersMainView } from '@/components/BackOffice/UserManagement/DeliveryRiders/RidersMainView';
import Head from 'next/head';

const Customers = () => {
  const { loginData } = useAuthState();
  const [isLargerThan800] = useMediaQuery('(min-width: 800px)');

  return (
    <>
      <Head>
        <title>User Management || Riders </title>
        <meta name="description" content="Rider's Dashboard (Admin's View)" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AuthLayout bg="brand.white">
        <DashboardHeader
          user={loginData?.user?.name}
          optionList={DROPDOWN_LINKS}
          usage={'back-office'}
          logoSrc={'../../../images/svgs/header-logo.svg'}
          rightIconSrc="../../../images/svgs/ChevronDownIcon.svg"
          leftIconSrc="../../../images/svgs/profile-avatar.svg"
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
            <RidersMainView />
          </GridItem>
        </Grid>
      </AuthLayout>
    </>
  );
};

export default Customers;
