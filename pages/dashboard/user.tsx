import React from 'react';
import { DashboardHeader } from '../../components/Header/DashboardHeader';
import { useAuthState } from 'store/auth/slice';
import { AuthLayout } from '../../components/Layout/AuthLayout';
import { Grid, GridItem, useMediaQuery } from '@chakra-ui/react';
import { SideBar } from '../../components/Layout/SideBar';
import { UserDataView } from '../../components/UserDashboard/UserDataView';
import { DROPDOWN_LINKS, MOBILE_DROPDOWN_LINKS } from '@/utils/index';
import Head from 'next/head';

// import { useDashboardState } from 'store/dashboard/slice';

const User = () => {
  const { loginData } = useAuthState();
  // const dashboard = useDashboardState();
  const [isLargerThan800] = useMediaQuery('(min-width: 800px)');
  const optionList = isLargerThan800 ? DROPDOWN_LINKS : MOBILE_DROPDOWN_LINKS;
  return (
    <>
      <Head>
        <title>Imperium Logistics || Business</title>
        <meta name="description" content="Company's Dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AuthLayout bg="brand.white">
        <DashboardHeader
          user={loginData?.user?.name}
          optionList={optionList}
          showAddDelivery
          allowSuccess
          usage="user"
        />
        <Grid h={'100%'} templateRows="repeat(1, 1fr)" templateColumns="repeat(10, 1fr)">
          {isLargerThan800 && (
            <GridItem colSpan={2} bg="brand.black">
              <SideBar role={'company'} />
            </GridItem>
          )}
          <GridItem colSpan={isLargerThan800 ? 8 : 10} bg="brand.white">
            {/* {dashboard?.createNewDelivery?.successStatus ? } */}
            <UserDataView />
          </GridItem>
        </Grid>
      </AuthLayout>
    </>
  );
};

export default User;
