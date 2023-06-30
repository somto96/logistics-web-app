import React from 'react';
import { DashboardHeader } from '../../components/Header/DashboardHeader';
import { useAuthState } from 'store/auth/slice';
import { AuthLayout } from '../../components/Layout/AuthLayout';
import { Grid, GridItem, useMediaQuery } from '@chakra-ui/react';
import { SideBar } from '../../components/Layout/SideBar';
import { UserDataView } from '../../components/UserDashboard/UserDataView';
// import { useDashboardState } from 'store/dashboard/slice';

const User = () => {
  const { loginData } = useAuthState();
  // const dashboard = useDashboardState();
  const [isLargerThan800] = useMediaQuery('(min-width: 800px)');
  return (
    <AuthLayout bg={'brand.white'}>
      <DashboardHeader user={loginData?.user?.companyName} />
      <Grid h={'100%'} templateRows="repeat(1, 1fr)" templateColumns="repeat(10, 1fr)">
        {isLargerThan800 && (
          <GridItem colSpan={2} bg="brand.black">
            <SideBar />
          </GridItem>
        )}
        <GridItem colSpan={ isLargerThan800 ? 8 : 10} bg="brand.white">
          {/* {dashboard?.createNewDelivery?.successStatus ? } */}
            <UserDataView />
        </GridItem>
      </Grid>
    </AuthLayout>
  );
};

export default User;
