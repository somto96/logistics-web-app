import { Flex, Box, Text, Image, Button } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { ModalComponent } from '../Reusables/Modals/ModalComponent';
import { TableDateInput } from '../TableComponents/TableDateInput';
import { TableSearchInput } from '../TableComponents/TableSearchInput';
import { TableFilterDropDown } from '../TableComponents/TableFilterDropdown';
import { ADMIN_PACKAGES_TABLE_HEADERS, LOCATIONS, PACKAGE_STATUS } from '@/utils/index';
import { DataTable } from '../Reusables/Table/DataTable';
import { mockPackagesData } from '@/utils/hooks/Dashboard/Backoffice/__test__/mocks';
import { useAdminDataTableController } from 'controllers/BackOffice/useAdminDataTableController';
import { AdminPackagesTableBody } from './AdminPackagesTableBody';
import { useDashboardState } from 'store/dashboard/slice';
import dayjs from '@/utils/dayjsLib';
import { PageLoader } from '../Reusables/Loaders/PageLoader';
import { useFetchAdminPackages } from '@/utils/hooks/Dashboard/Backoffice/useFetchAdminPackages';

export const DashboardView = ({ setActiveScreen }: any) => {
  const [showFilters, setShowFilters] = useState<boolean>(false);

  const [selectedFilter, setSelectedFilter] = useState<{ today: boolean; yesterday: boolean }>({
    today: false,
    yesterday: false,
  });
  const [filters, setFilters] = useState({
    from: '',
    to: '',
    search: '',
    location: '',
    status: '',
  });
  const { handleFetchPrev, handleFetchNext, handleApplyFilters } = useAdminDataTableController();
  const { handleFetchAdminPackages } = useFetchAdminPackages();

  const dashboard = useDashboardState();

  // console.log('filters', filters);

  useEffect(() => {
    handleFetchAdminPackages({
      pagedQuery: {
        pageNumber: 1,
        pageSize: 10,
      },
    });
  }, []);

  return (
    <>
      {dashboard.loading?.includes('fetch_admin_packages') && <PageLoader />}
      <Flex flexDir={'column'} w={'100%'}>
        {/* Title */}
        <Flex
          borderBottom={'1px'}
          borderRight={'1px'}
          borderColor={'#E0E0E0'}
          alignItems={'center'}
          p={4}>
          <Text fontWeight={'700'} fontSize={'18px'} lineHeight={'21.78px'}>
            Dashboard
          </Text>
        </Flex>

        <Flex flexDir={'column'} gap={8} p={5}>
          {/* <Flex alignItems={'center'} gap={3}>
            Packages Stats
            <Flex bg={'#F9F9F9'} borderRadius={'20px'} p={3} flexDir={'column'} gap={3}>
              <Text fontSize={'16px'} lineHeight={'20px'} color={'#4F4F4F'}>
                Total Packages
              </Text>
              <Text fontWeight={700} fontSize={'22px'} lineHeight={'30px'}>
                10,593,093
              </Text>
            </Flex>
          </Flex> */}

          {/* Data Table Filters */}
          {dashboard.selectedPackages?.length ? (
            <Flex alignItems={'center'} justifyContent={'space-between'}>
              <Flex alignItems={'center'} gap={8}>
                <Flex flexDir={'column'} gap={3}>
                  <Text fontWeight={700} fontSize={'16px'} lineHeight={'18px'}>
                    All Deliveries
                  </Text>
                  <Text color={'#828282'} fontSize={'12px'} lineHeight={'14px'}>
                    {dashboard.adminPackages.items?.length}
                  </Text>
                </Flex>
                <Box
                  bg={'brand.black'}
                  borderRadius={'20px'}
                  p={3}
                  cursor={'pointer'}
                  onClick={() => setShowFilters(true)}>
                  <Text
                    color={'brand.white'}
                    fontSize={'13px'}
                    lineHeight={'15.73px'}
                    letterSpacing={'2%'}>
                    Show filters
                  </Text>
                </Box>
              </Flex>
              <Box
                bg={'brand.black'}
                borderRadius={'20px'}
                p={3}
                cursor={'pointer'}
                onClick={() => {
                  setActiveScreen('assign-package-view');
                }}>
                <Text
                  color={'brand.white'}
                  fontSize={'13px'}
                  lineHeight={'15.73px'}
                  letterSpacing={'2%'}>
                  {`Assign(${dashboard.selectedPackages?.length})`}
                </Text>
              </Box>
            </Flex>
          ) : (
            <Flex alignItems={'center'} gap={8}>
              <Flex flexDir={'column'} gap={3}>
                <Text fontWeight={700} fontSize={'16px'} lineHeight={'18px'}>
                  All Deliveries
                </Text>
                <Text color={'#828282'} fontSize={'12px'} lineHeight={'14px'}>
                  {dashboard.adminPackages.items.length
                    ? dashboard.adminPackages.items?.length
                    : mockPackagesData.data.responseObject.items?.length}
                </Text>
              </Flex>
              <Box
                bg={selectedFilter?.today ? 'brand.text' : '#F2F2F2'}
                borderRadius={'20px'}
                p={3}
                cursor={'pointer'}
                onClick={() => {
                  setSelectedFilter({
                    ...selectedFilter,
                    yesterday: false,
                    today: !selectedFilter?.today,
                  });
                  if (selectedFilter?.today) {
                    setFilters({
                      ...filters,
                      from: `${dayjs().toISOString()}`,
                      to: `${dayjs().toISOString()}`,
                    });
                  } else {
                    setFilters({
                      ...filters,
                      from: '',
                      to: '',
                    });
                  }

                  handleApplyFilters({
                    from: filters?.from,
                    to: filters?.to,
                    keyword: filters?.search,
                    filter: filters?.status,
                  });
                }}>
                <Text
                  color={selectedFilter?.today ? 'brand.white' : '#4F4F4F'}
                  fontSize={'13px'}
                  lineHeight={'15.73px'}
                  letterSpacing={'2%'}>
                  Today
                </Text>
              </Box>
              <Box
                bg={selectedFilter?.yesterday ? 'brand.text' : '#F2F2F2'}
                borderRadius={'20px'}
                p={3}
                cursor={'pointer'}
                onClick={() => {
                  setSelectedFilter({
                    ...selectedFilter,
                    today: false,
                    yesterday: !selectedFilter?.yesterday,
                  });
                  if (selectedFilter?.yesterday) {
                    setFilters({
                      ...filters,
                      from: `${dayjs().add(-1, 'day').toISOString()}`,
                      to: `${dayjs().toISOString()}`,
                    });
                  } else {
                    setFilters({
                      ...filters,
                      from: '',
                      to: '',
                    });
                  }

                  handleApplyFilters({
                    from: filters?.from,
                    to: filters?.to,
                    keyword: filters?.search,
                    filter: filters?.status,
                  });
                }}>
                <Text
                  color={selectedFilter?.yesterday ? 'brand.white' : '#4F4F4F'}
                  fontSize={'13px'}
                  lineHeight={'15.73px'}
                  letterSpacing={'2%'}>
                  Yesterday
                </Text>
              </Box>
              <Box
                bg={'brand.black'}
                borderRadius={'20px'}
                p={3}
                cursor={'pointer'}
                onClick={() => setShowFilters(true)}>
                <Text
                  color={'brand.white'}
                  fontSize={'13px'}
                  lineHeight={'15.73px'}
                  letterSpacing={'2%'}>
                  Show filters
                </Text>
              </Box>
            </Flex>
          )}
        </Flex>
        <Box>
          <DataTable
            extras={dashboard.adminPackages ?? mockPackagesData?.data?.responseObject}
            handleNext={() => handleFetchNext()}
            handlePrev={() => handleFetchPrev()}
            body={
              <AdminPackagesTableBody
                data={
                  dashboard.adminPackages.items ?? mockPackagesData?.data?.responseObject?.items
                }
                showPackageDetails={() => setActiveScreen('package-details-view')}
                assignPackage={() => setActiveScreen('assign-package-view')}
                showTrackingInfo={() => setActiveScreen('view-tracking-info')}
                showCheckbox
              />
            }
            headers={ADMIN_PACKAGES_TABLE_HEADERS}
            showPagination
            showCheckbox
          />
        </Box>
      </Flex>
      <ModalComponent isOpen={showFilters} onClose={() => setShowFilters(false)} size={'md'}>
        <Flex
          w={'100%'}
          alignItems={'center'}
          justifyContent={'center'}
          flexDirection={'column'}
          gap={8}>
          <TableSearchInput
            name="search"
            value={filters?.search}
            label="Search"
            handleChange={e =>
              setFilters({
                ...filters,
                search: e?.target?.value,
              })
            }
          />
          <TableDateInput
            label={'From'}
            handleChange={e =>
              setFilters({
                ...filters,
                from: e?.target?.value,
              })
            }
            name={'from'}
            value={filters?.from}
          />
          <TableDateInput
            label={'To'}
            handleChange={e =>
              setFilters({
                ...filters,
                to: e?.target?.value,
              })
            }
            name={'to'}
            value={filters?.to}
          />
          <TableFilterDropDown
            options={PACKAGE_STATUS}
            label={'Sort Status'}
            value={filters?.status}
            placeholder="Sort Status"
            height="200px"
            onChange={e => {
              setFilters({
                ...filters,
                status: e,
              });
            }}
          />
          <TableFilterDropDown
            options={LOCATIONS}
            label={'By Location'}
            value={filters?.status}
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
          <Flex w={'100%'} alignItems={'center'} justifyContent={'center'} gap={5} mb={5}>
            <Button
              bg="brand.white"
              color="brand.black"
              onClick={() =>
                setFilters({
                  from: '',
                  to: '',
                  search: '',
                  location: '',
                  status: '',
                })
              }
              p="5"
              fontSize="14px"
              border={'1px'}
              borderColor={'brand.black'}
              _hover={{
                background: 'brand.white',
                color: 'brand.black',
              }}
              style={{
                borderRadius: '20px',
                lineHeight: '22px',
              }}>
              Reset
            </Button>
            <Button
              bg="brand.black"
              color="brand.white"
              onClick={() => {
                setShowFilters(false);
              }}
              p="5"
              fontSize="14px"
              _hover={{
                background: 'brand.black',
                color: 'brand.white',
              }}
              style={{
                borderRadius: '20px',
                lineHeight: '22px',
              }}>
              Apply
            </Button>
          </Flex>
        </Flex>
      </ModalComponent>
    </>
  );
};
