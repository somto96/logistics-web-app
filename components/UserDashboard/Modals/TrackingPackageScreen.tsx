import {
  Box,
  Image,
} from '@chakra-ui/react';
import React, { useState } from 'react';
// import { useDashboardState } from 'store/dashboard/slice';
import { Packages } from '@/utils/types';
import { PackageStatusScreen } from '../Screens/PackageStatusScreen';
import { PackageDetailsScreen } from '../Screens/PackageDetailsScreen';
type Props = {
  packageDetails: Packages;
  routeType: string;
};
export const TrackingPackageScreen = ({
  packageDetails,
  routeType = 'onboarding',
}: Props) => {
  const [showMoreDetails, setShowMoreDetails] = useState<boolean>(false);
  return (
    <>
      <Box
        w="100%"
        h="100vh"
        bgImage={'../../images/pngs/map.png'}
        bgPosition="center"
        bgSize="cover"
        position={'relative'}>
        <Box position={'absolute'} left={5} bottom={10}>
          <Image src={'../../images/svgs/track-route.svg'} alt={'marker'} />
        </Box>
        {
            !showMoreDetails ? (
                <PackageStatusScreen packageDetails={packageDetails} routeType={routeType} showMoreDetails={() => setShowMoreDetails(true)} />
            ): (
                <PackageDetailsScreen goBack={() => setShowMoreDetails(false)} packageDetails={packageDetails}  />
            )
        }

      </Box>
    </>
  );
};
