import { Flex, Text, Box, Image, Button } from '@chakra-ui/react';
import { useAdminDataTableController } from 'controllers/BackOffice/useAdminDataTableController';
import React, { useEffect, useState, useMemo } from 'react';
import { useDashboardState } from 'store/dashboard/slice';
import { TableSearchInput } from '../TableComponents/TableSearchInput';
import { TableFilterDropDown } from '../TableComponents/TableFilterDropdown';
import { LOCATIONS } from '@/utils/index';
import { useFetchRidersList } from '@/utils/hooks/Dashboard/Backoffice/useFetchRidersList';
import { useAssignPackages } from '@/utils/hooks/Dashboard/Backoffice/useAssignPackages';
import { PageLoader } from '../Reusables/Loaders/PageLoader';
import { RidersList } from 'store/interfaces';

export const AssignPackagesView = ({ setActiveScreen }: any) => {
  const { returnPackageLocation, handleSearchForAssigningPackages, returnPackageIds } =
    useAdminDataTableController();
  const dashboard = useDashboardState();
  const [filters, setFilters] = useState<{ search: string; location: string }>({
    search: '',
    location: '',
  });
  const { handleFetchRiders } = useFetchRidersList();
  const { handleAssignPackages } = useAssignPackages();

  useEffect(() => {
    handleFetchRiders({
      pagedQuery: {
        pageNumber: 1,
        pageSize: 10,
      },
    });
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (filters.search !== '')
        handleFetchRiders({
          pagedQuery: {
            pageNumber: 1,
            pageSize: 10,
          },
          textFilter: {
            keyword: filters?.search,
          },
        });
    }, 3000);

    return () => clearTimeout(timeout);
  }, [filters.search, handleFetchRiders]);

  const riders = useMemo(
    () => handleSearchForAssigningPackages(filters?.location, dashboard.riders?.items),
    [dashboard.riders?.items, filters?.location, handleSearchForAssigningPackages]
  );

  const packageIds = useMemo(
    () =>
      returnPackageIds(dashboard.selectedPackages, dashboard.adminPackages.items),
    [dashboard.selectedPackages, returnPackageIds]
  );



  const loading =
    dashboard.loading?.includes('fetch_rider_details') ||
    dashboard.loading?.includes('fetch_riders_list') ||
    dashboard.loading?.includes('assign-packages');

  return (
    <>
      {loading && <PageLoader />}
      <Flex alignItems={'center'} flexDir={'column'} w={'100%'}>
        <Flex
          borderBottom={'1px'}
          borderColor={'#E0E0E0'}
          w={'100%'}
          alignItems={'center'}
          justifyContent={'space-between'}
          p={4}>
          <Text
            cursor={'pointer'}
            fontSize={'12px'}
            lineHeight={'14.52px'}
            letterSpacing={'3%'}
            color={'brand.text'}
            onClick={() => setActiveScreen('dashboard-view')}>
            Back
          </Text>
          <Text fontWeight={'700'} fontSize={'18px'} lineHeight={'21.78px'}>
            Assign Delivery
          </Text>
          <Box></Box>
        </Flex>
        <Flex alignItems={'center'} w={'100%'} gap={5} bg={'#333333'} p={7}>
          {dashboard.selectedPackages?.map((item: string) => (
            <Flex key={item} flexDir={'column'} bg={'brand.white'} borderRadius={'8px'} p={3}>
              <Flex alignItems={'center'} gap={2}>
                <Text fontSize={'12px'} lineHeight={'14px'} color={'#4F4F4F'}>
                  Tracking ID:
                </Text>
                <Text
                  fontWeight={500}
                  fontSize={'14px'}
                  lineHeight={'14px'}
                  letterSpacing={'2%'}
                  color={'brand.text'}>
                  {item}
                </Text>
              </Flex>
              <Flex alignItems={'center'} gap={2}>
                <Text fontSize={'10px'} lineHeight={'12px'} color={'#4F4F4F'}>
                  Location:
                </Text>
                <Text fontWeight={500} fontSize={'10px'} lineHeight={'12px'} color={'#4F4F4F'}>
                  {returnPackageLocation(item, dashboard.adminPackages.items)}
                </Text>
              </Flex>
            </Flex>
          ))}

          <Flex
            alignItems={'center'}
            justifyContent={'center'}
            border={'1px'}
            borderStyle={'dashed'}
            borderColor={'#BDBDBD'}
            borderRadius={'8px'}
            onClick={() => {
              setActiveScreen('dashboard-view');
            }}
            p={3}>
            <Text color={'brand.white'} fontSize="12px" lineHeight={'14px'}>
              + Add Delivery
            </Text>
          </Flex>
        </Flex>
        <Flex alignItems={'center'} w={'100%'} gap={3} px={5} mt={5}>
          <Flex>
            <TableSearchInput
              name="search"
              value={filters?.search}
              label=""
              placeholder="Search by Rider Names"
              handleChange={e =>
                setFilters({
                  ...filters,
                  search: e?.target?.value,
                })
              }
            />
          </Flex>

          <Flex>
            <TableFilterDropDown
              options={LOCATIONS}
              label={''}
              value={filters?.location}
              placeholder="By Location"
              height="200px"
              icon={<Image src="../images/svgs/filter-icon.svg" alt="filter" />}
              onChange={e => {
                setFilters({
                  ...filters,
                  location: e,
                });
              }}
            />
          </Flex>
        </Flex>
        {riders?.length ? (
          <Flex w={'100%'} alignItems={'center'} flexDir={'column'} gap={5} mt={5}>
            {riders?.map((rider: RidersList) => (
              <Flex
                w={'100%'}
                key={rider?.id}
                alignItems={'center'}
                justifyContent={'space-between'}
                py={3}
                px={5}
                borderBottom={'1px'}
                borderBottomColor={'#BDBDBD'}>
                <Flex alignItems={'center'} gap={3}>
                  <Image w={'56px'} h={'56px'} src="../images/svgs/user-avatar.svg" alt="avatar" />
                  <Flex alignItems={'flex-start'} flexDir={'column'} gap={2}>
                    <Text
                      fontWeight={600}
                      fontSize={'15px'}
                      lineHeight={'18.15px'}
                      letterSpacing={'3%'}>
                      {rider?.fullName}
                    </Text>
                    <Flex alignItems={'center'} gap={3}>
                      <Flex
                        textAlign={'center'}
                        bg={'#F9F9F9'}
                        gap={2}
                        p={3}
                        borderRadius={'20px'}
                        fontSize={'12px'}
                        lineHeight={'12px'}>
                        <Text>Frequent location:</Text>
                        <Text fontWeight={500}>{rider?.frequentLocation}</Text>
                      </Flex>
                      {/* <Flex
                      textAlign={'center'}
                      bg={'#F9F9F9'}
                      gap={2}
                      p={3}
                      borderRadius={'20px'}
                      fontSize={'12px'}
                      lineHeight={'12px'}>
                      <Text>Pending delivery:</Text>
                      <Text fontWeight={500}>{rider?.}</Text>
                    </Flex> */}
                    </Flex>
                  </Flex>
                </Flex>
                <Button
                  bg="brand.black"
                  color="brand.white"
                  onClick={() =>
                    handleAssignPackages({
                      riderId: rider?.id,
                      packageIds,
                    })
                  }
                  p="5"
                  fontSize="14px"
                  fontWeight={500}
                  _hover={{
                    background: 'brand.black',
                    color: 'brand.white',
                  }}
                  borderRadius={'8px'}
                  lineHeight={'16px'}>
                  Assign
                </Button>
              </Flex>
            ))}

            {dashboard.riders.hasNext && (
              <Flex alignItems={'center'} justifyContent={'center'} w={'100%'}>
                <Text
                  cursor={'pointer'}
                  fontSize={'15px'}
                  lineHeight={'14.52px'}
                  letterSpacing={'3%'}
                  color={'brand.text'}
                  onClick={() => {
                    handleFetchRiders({
                      pagedQuery: {
                        pageNumber: 1,
                        pageSize: dashboard.riders.currentPageSize + 10,
                      },
                      textFilter: {
                        keyword: filters?.search,
                      },
                    });
                  }}>
                  Load More
                </Text>
              </Flex>
            )}
          </Flex>
        ) : (
          <Flex w={'100%'} alignItems={'center'} flexDir={'row'} gap={5} mt={5}>
            <Text fontSize={'15px'}>No Riders Found</Text>
          </Flex>
        )}
      </Flex>
    </>
  );
};
