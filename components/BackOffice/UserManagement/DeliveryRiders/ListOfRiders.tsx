import { Flex, Box, Text, Image } from '@chakra-ui/react';
import React, { useEffect, useMemo, useState } from 'react';
// import { ModalComponent } from '../../../Reusables/Modals/ModalComponent';
import { TableFilterDropDown } from '../../../TableComponents/TableFilterDropdown';
import { RIDERS_TABLE_HEADERS, RIDER_STATUS } from '@/utils/index';
import { DataTable } from '../../../Reusables/Table/DataTable';
// import { AdminPackagesTableBody } from './AdminPackagesTableBody';
import { useDashboardState } from 'store/dashboard/slice';
// import dayjs from '@/utils/dayjsLib';
import { PageLoader } from '../../../Reusables/Loaders/PageLoader';
import { useFetchRidersList } from '@/utils/hooks/Dashboard/Backoffice/useFetchRidersList';
import { useRiderController } from 'controllers/BackOffice/useRiderController';
import { TableSearchInput } from '@/components/TableComponents/TableSearchInput';
import { RidersTableBody } from './RidersTableBody';
import { RidersDetailsView } from './RidersDetailsView';
import { ModalComponent } from '@/components/Reusables/Modals/ModalComponent';
import { EditRidersForm } from './Modals/EditRidersForm';
import { AddNewRidersForm } from './Modals/AddNewRidersForm';

export const ListOfRiders = () => {
  const [filters, setFilters] = useState({
    status: '',
    search: '',
  });
  const [showRiderDetails, setShowRiderDetails] = useState<boolean>(false);
  const [riderDetails, setRiderDetails] = useState<any>({});
  const [showEditRiderForm, setShowEditRiderForm] = useState<boolean>(false);
  const [showAddNewRiderForm, setShowAddNewRiderForm] = useState<boolean>(false);
  const { handleFetchPrev, handleFetchNext, handleSearchForRiders } = useRiderController();
  const { handleFetchRiders } = useFetchRidersList();

  const dashboard = useDashboardState();

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
      if (filters.status !== '') {
        handleFetchRiders({
          pagedQuery: {
            pageNumber: 1,
            pageSize: 10,
          },
          textFilter: {
            keyword: filters.status !== '' ? filters.status : null,
          },
        });
      } else {
        handleFetchRiders({
          pagedQuery: {
            pageNumber: 1,
            pageSize: 10,
          },
        });
      }
    }, 3000);

    return () => clearTimeout(timeout);
  }, [filters.status]);

  const riders = useMemo(
    () => handleSearchForRiders(filters?.search, dashboard.riders?.items),
    [dashboard.riders?.items, filters?.search, handleSearchForRiders]
  );

  const isLoading = dashboard.loading?.includes('add-new-rider') || dashboard.loading?.includes('fetch_riders_list')

  return (
    <>
      { isLoading && <PageLoader />}
      <Flex flexDir={'column'} w={'100%'}>
        {/* Title */}
        <Flex
          borderBottom={'1px'}
          borderRight={'1px'}
          borderColor={'#E0E0E0'}
          alignItems={'center'}
          justifyContent={'space-between'}
          p={4}>
          <Text fontWeight={'700'} fontSize={'18px'} lineHeight={'21.78px'}>
            User Management
          </Text>
          <Box
            p={2}
            bg={'brand.black'}
            color={'brand.white'}
            borderRadius={'20px'}
            cursor={'pointer'}
            onClick={() => setShowAddNewRiderForm(true)}>
            <Text>+ Add Rider</Text>
          </Box>
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

          <Flex w={'100%'} alignItems={'center'} justifyContent={'space-between'}>
            <Flex alignItems={'center'} gap={3}>
              <Flex flexDir={'column'} gap={3}>
                <Text fontWeight={700} fontSize={'16px'} lineHeight={'18px'}>
                  All Delivery Riders
                </Text>
                <Text color={'#828282'} fontSize={'12px'} lineHeight={'14px'}>
                  {dashboard.riders?.items?.length}
                </Text>
              </Flex>

              <TableSearchInput
                name="search"
                value={filters?.search}
                label="Search"
                placeholder="Search rider name"
                handleChange={e =>
                  setFilters({
                    ...filters,
                    search: e?.target?.value,
                  })
                }
              />
            </Flex>

            <Box>
              <TableFilterDropDown
                options={RIDER_STATUS}
                label={'Sort Status'}
                value={filters?.status}
                placeholder="Sort by status"
                icon={<Image src="../../../images/svgs/filter-icon.svg" alt="filter" />}
                rightIcon={
                  <Image src="../../../images/svgs/ChevronDownIcon.svg" alt="ChevronDownIcon" />
                }
                onChange={e => {
                  setFilters({
                    ...filters,
                    status: e,
                  });
                }}
              />
            </Box>
          </Flex>
        </Flex>
        <Box>
          <DataTable
            extras={dashboard.riders}
            handleNext={() => handleFetchNext()}
            handlePrev={() => handleFetchPrev()}
            prevIconSrc={'../../../images/svgs/page-left-icon.svg'}
            nextIconSrc={'../../../images/svgs/page-right-icon.svg'}
            body={
              <RidersTableBody
                data={riders}
                showRiderDetails={(e: any) => {
                  setShowRiderDetails(true);
                  setRiderDetails(e);
                }}
                showAvatar
              />
            }
            headers={RIDERS_TABLE_HEADERS}
            showPagination
          />
        </Box>
      </Flex>
      <RidersDetailsView
        item={riderDetails}
        isOpen={showRiderDetails}
        onClose={() => setShowRiderDetails(false)}
        showEditForm={() => setShowEditRiderForm(true)}
      />
      <ModalComponent
        isOpen={showEditRiderForm}
        onClose={() => setShowEditRiderForm(false)}
        size={'2xl'}>
        <EditRidersForm rider={riderDetails} />
      </ModalComponent>
      {!dashboard.loading?.includes('add-new-rider') && (
        <ModalComponent
          isOpen={showAddNewRiderForm}
          onClose={() => {
            setShowAddNewRiderForm(false);
          }}
          size={'2xl'}>
          <AddNewRidersForm />
        </ModalComponent>
      )}
    </>
  );
};
