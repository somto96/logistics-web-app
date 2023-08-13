import { Flex } from '@chakra-ui/react';
import React, { useMemo } from 'react';
import { AnalyticsCard } from './AnalyticsCard';
import { useCompanyDataTableController } from 'controllers/useCompanyDataTableController';

type Props = {
  analytics: {
    packageAvailableForPickUp: number;
    packageAtWareHouse: number;
    packageDelivered: number;
    packageUnDelivered: number;
  };
};
export const DashboardAnalytics = ({ analytics }: Props) => {
    const {customerAnalyticsTitle } = useCompanyDataTableController();
  const analyticsKeysArr = useMemo(() => {
    if (analytics !== null && analytics !== undefined) {
      const keys = Object.keys(analytics);
      return keys;
    }
  }, [analytics]);

  return (
    <Flex alignItems={'center'} flexWrap={"wrap"} gap={5} p={3} w={"100%"} justifyContent={{sm: "center", md: "flex-start"}}>
      {analyticsKeysArr?.map((item: string, index: number) => {
        return <AnalyticsCard key={index} data={analytics[item as keyof typeof analytics]} title={customerAnalyticsTitle(item)}/>;
      })}
    </Flex>
  );
};
