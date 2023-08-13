import { Flex, Box, Text, Image } from '@chakra-ui/react';
import React, { useEffect, useMemo, useState } from 'react';
import { TableFilterDropDown } from '../../../TableComponents/TableFilterDropdown';
import { CUSTOMERS_TABLE_HEADERS, RIDER_STATUS } from '@/utils/index';
import { DataTable } from '../../../Reusables/Table/DataTable';
import { useDashboardState } from 'store/dashboard/slice';
// import dayjs from '@/utils/dayjsLib';
import { PageLoader } from '../../../Reusables/Loaders/PageLoader';
import { TableSearchInput } from '@/components/TableComponents/TableSearchInput';
import { ModalComponent } from '@/components/Reusables/Modals/ModalComponent';
import { useCustomerController } from 'controllers/BackOffice/useCustomerController';
import { CustomersTableBody } from './CustomersTableBody';
import { useFetchCustomerList } from '@/utils/hooks/Dashboard/Backoffice/useFetchCustomerList';
import { CustomerDetailsView } from './CustomerDetailsView';
import { EditCustomersForm } from './Modals/EditCustomersForm';

export const ListOfCustomers = () => {
  const [filters, setFilters] = useState({
    status: '',
    search: '',
  });
  const [showCustomerDetails, setShowCustomerDetails] = useState<boolean>(false);
  const [customerDetails, setCustomerDetails] = useState<any>({});
  const [showEditCustomerForm, setShowEditCustomerForm] = useState<boolean>(false);
  const { handleFetchPrev, handleFetchNext, handleSearchForCustomers } = useCustomerController();
  const { handleFetchCustomers } = useFetchCustomerList();

  const dashboard = useDashboardState();

  useEffect(() => {
    handleFetchCustomers({
      pagedQuery: {
        pageNumber: 1,
        pageSize: 10,
      },
    });
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (filters.status !== '' && filters.status !== "all") {
        handleFetchCustomers({
          pagedQuery: {
            pageNumber: 1,
            pageSize: 10,
          },
          textFilter: {
            keyword: filters.status !== '' ? filters.status : null,
          },
        });
      } else {
        handleFetchCustomers({
          pagedQuery: {
            pageNumber: 1,
            pageSize: 10,
          },
        });
      }
    }, 3000);

    return () => clearTimeout(timeout);
  }, [filters.status]);

  const customers = useMemo(
    () => handleSearchForCustomers(filters?.search, dashboard.customers?.items),
    [dashboard.customers?.items, filters?.search, handleSearchForCustomers]
  );

  const isLoading = dashboard.loading?.includes('fetch_customers_list');

  return (
    <>
      {isLoading && <PageLoader />}
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
                  All Customers
                </Text>
                <Text color={'#828282'} fontSize={'12px'} lineHeight={'14px'}>
                  {dashboard.customers?.items?.length}
                </Text>
              </Flex>

              <TableSearchInput
                name="search"
                value={filters?.search}
                label="Search"
                placeholder="Search customer name"
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
            extras={dashboard.customers}
            handleNext={() => handleFetchNext()}
            handlePrev={() => handleFetchPrev()}
            prevIconSrc={'../../../images/svgs/page-left-icon.svg'}
            nextIconSrc={'../../../images/svgs/page-right-icon.svg'}
            body={
              <CustomersTableBody
                data={customers}
                showCustomerDetails={(e: any) => {
                  setShowCustomerDetails(true);
                  setCustomerDetails(e);
                }}
              />
            }
            headers={CUSTOMERS_TABLE_HEADERS}
            showPagination
          />
        </Box>
      </Flex>
      <CustomerDetailsView
        item={customerDetails}
        isOpen={showCustomerDetails}
        onClose={() => setShowCustomerDetails(false)}
        showEditForm={() => setShowEditCustomerForm(true)}
      />
      <ModalComponent
        isOpen={showEditCustomerForm}
        onClose={() => setShowEditCustomerForm(false)}
        size={'2xl'}>
        <EditCustomersForm customer={customerDetails} />
      </ModalComponent>
    </>
  );
};
