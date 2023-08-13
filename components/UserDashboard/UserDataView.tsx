import {
  Flex,
  Text,
  HStack,
  useMediaQuery,
  // Button,
  Image,
  // Button,
} from '@chakra-ui/react';
import { useFetchPackages } from '../../utils/hooks/Dashboard/Company/useFetchPackages';
import React, { useEffect, useMemo, useState } from 'react';
import { useDashboardState } from '../../store/dashboard/slice';
import { PageLoader } from '../Reusables/Loaders/PageLoader';
import { TableSearchInput } from '../TableComponents/TableSearchInput';
import { TableDateInput } from '../TableComponents/TableDateInput';
import { TableFilterDropDown } from '../TableComponents/TableFilterDropdown';
import { PACKAGE_STATUS, statusType } from '../../utils/index';
import { PACKAGES_TABLE_HEADERS } from '../../utils/index';
import { DataTable } from '../Reusables/Table/DataTable';
import { PackageDetailsView } from './PackageDetailsView';
import { FilterDrawer } from './FilterDrawer';
import { MobileSideBar } from '../Layout/mobile/MobileSideBar';
// import { useDataTableController } from 'controllers/useDataTableController';
import dayjs from '../../utils/dayjsLib';
import { useCompanyDataTableController } from 'controllers/useCompanyDataTableController';
import { PackageTableBody } from './PackageTableBody';
import { Packages } from '@/utils/types';
import { useFetchRiderDetails } from '@/utils/hooks/Dashboard/Backoffice/useFetchRiderDetails';
import { ModalComponent } from '../Reusables/Modals/ModalComponent';
import { TrackingPackageScreen } from './Modals/TrackingPackageScreen';
import { useAuthState } from 'store/auth/slice';
import { useFetchCompanyAnalytics } from '@/utils/hooks/Dashboard/Company/useFetchCompanyAnalytics';
import { DashboardAnalytics } from '../Reusables/Analytics';

type TableFilters = {
  filterValue: string;
  from: string;
  to: string;
  searchValue: string;
};

export const UserDataView = () => {
  const { handleFetchPackages } = useFetchPackages();
  const [isLargerThan800] = useMediaQuery('(min-width: 800px)');
  const { loading, packages, customerAnalytics } = useDashboardState();
  const { loginData } = useAuthState();
  const { handleFetchPrev, handleFetchNext } = useCompanyDataTableController();
  const [state, setState] = useState<TableFilters>({
    filterValue: 'All',
    from: '',
    to: '',
    searchValue: '',
  });
  const [showPackageDetails, setShowPackageDetails] = useState<boolean>(false);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [showSideBar, setShowSideBar] = useState<boolean>(false);
  const [showTrackingInfo, setShowTrackingInfo] = useState<boolean>(false);
  const [packageDetails, setPackageDetails] = useState<any>({});
  const { handleFetchRiderDetails } = useFetchRiderDetails();
  const { handleFetchCompanyAnalytics } = useFetchCompanyAnalytics();

  useEffect(() => {
    handleFetchPackages({
      pagedQuery: {
        pageNumber: 1,
        pageSize: 10,
      },
    });
  }, []);

  useEffect(() => {
    handleFetchCompanyAnalytics({
      id: loginData.user.id,
    });
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (state?.to !== '' || state?.from !== '' || state?.searchValue !== '') {
        handleFetchPackages({
          pagedQuery: {
            // keyword: state?.filterValue !== '' ? state?.filterValue : null,
            pageNumber: 1,
            pageSize: 10,
          },
          dateFilter: {
            from: state?.from !== '' ? dayjs(state?.from).toISOString() : null,
            to: state?.to !== '' ? dayjs(state?.to).toISOString() : null, //ISO
          },
          textFilter: {
            keyword: state?.searchValue !== '' ? state?.searchValue : null,
          },
        });
      }
    }, 3000);

    return () => clearTimeout(timeout);
  }, [state?.from, state?.to, state?.searchValue]);

  useEffect(() => {
    if (Object.keys(packageDetails)?.length) {
      handleFetchRiderDetails(
        {
          id: packageDetails?.pickUpRider,
        },
        'pickup'
      );
    }
  }, [packageDetails]);

  useEffect(() => {
    if (Object.keys(packageDetails)?.length) {
      handleFetchRiderDetails(
        {
          id: packageDetails?.deliveryRider,
        },
        'delivery'
      );
    }
  }, [packageDetails]);

  const packagesList = useMemo(
    () =>
      packages?.items?.filter((item: Packages) => {
        if (state?.filterValue) {
          const queryString = state?.filterValue?.toLowerCase();
          if (queryString === 'all' || queryString === '') return item;
          return item?.status?.toLowerCase()?.includes(queryString);
        }
        return item;
      }),
    [packages?.items, state?.filterValue]
  );

  return (
    <>
      <Flex flexDir={'column'} w={'100%'}>
        {loading?.includes('fetch_packages') && <PageLoader />}
        <Flex
          borderBottom={'1px'}
          borderRight={'1px'}
          borderColor={'#E0E0E0'}
          justifyContent={'space-between'}
          alignItems={'center'}
          p={4}>
          <Text fontWeight={'700'} fontSize={'18px'} lineHeight={'21.78px'}>
            Dashboard
          </Text>

          {!isLargerThan800 && (
            <Flex
              bg={'brand.text'}
              borderRadius={'20px'}
              color={'brand.white'}
              alignItems={'center'}
              p={3}
              justifyContent={'center'}
              cursor={'pointer'}
              onClick={() => setShowSideBar(true)}>
              Show Menu
            </Flex>
          )}

          {/* <Button
          bg="brand.white"
          color="brand.text"
          // zIndex={1}
          leftIcon={<Image src="../images/svgs/printer-icon.svg" alt="print" />}
          // isDisabled={true}
          p="5"
          fontSize="14px"
          borderRadius={'20px'}
          borderColor={'brand.text'}
          border={'1px'}
          style={{
            lineHeight: '22px',
          }}
          cursor={'pointer'}
          _hover={{
            background: 'brand.white',
          }}
          _disabled={{
            border: '1px solid #E0E0E0',
            color: '#E0E0E0',
            cursor: 'not-allowed',
          }}
          _active={{
            background: 'brand.white',
          }}
          onClick={() => console.log('test')}>
          Print
        </Button> */}
        </Flex>
        <Flex alignItems={'center'} w={'100%'}>
          <DashboardAnalytics analytics={customerAnalytics} />
        </Flex>
        <HStack p={4} spacing={4}>
          <Flex flexDir={'column'} gap={2}>
            <Text fontWeight={'700'} fontSize={'16px'} lineHeight={'18px'} color={'brand.text'}>
              All Deliveries
            </Text>
            <Text fontSize={'12px'} lineHeight={'14px'} color={'#828282'}>
              {packages?.totalItemCount}
            </Text>
          </Flex>

          {isLargerThan800 && (
            <>
              <TableSearchInput
                name="search"
                value={state?.searchValue}
                label="Search"
                handleChange={e =>
                  setState({
                    ...state,
                    searchValue: e?.target?.value,
                  })
                }
              />
              <TableDateInput
                label={'From'}
                handleChange={e =>
                  setState({
                    ...state,
                    from: e?.target?.value,
                  })
                }
                name={'from'}
                value={state?.from}
              />
              <TableDateInput
                label={'To'}
                handleChange={e =>
                  setState({
                    ...state,
                    to: e?.target?.value,
                  })
                }
                name={'to'}
                value={state?.to}
              />
            </>
          )}
          <TableFilterDropDown
            options={PACKAGE_STATUS}
            label={'Sort Delivery'}
            value={state?.filterValue}
            placeholder="filter.."
            onChange={e => {
              setState({
                ...state,
                filterValue: e,
              });
            }}
          />
        </HStack>
        {!isLargerThan800 && (
          <Flex p={3}>
            <Flex
              bg={'brand.text'}
              borderRadius={'20px'}
              color={'brand.white'}
              alignItems={'center'}
              p={2}
              justifyContent={'center'}
              cursor={'pointer'}
              onClick={() => setShowFilters(true)}>
              Show Filters
            </Flex>
          </Flex>
        )}
        <DataTable
          extras={packages}
          handleNext={() => handleFetchNext()}
          handlePrev={() => handleFetchPrev()}
          body={
            <PackageTableBody
              handleClick={(e: any) => {
                setShowPackageDetails(true);
                setPackageDetails(e);
              }}
              data={packagesList}
            />
          }
          // data={packagesList}
          // handleClick={e => {
          //   setShowPackageDetails(true);
          //   setPackageDetails(e);
          // }}
          headers={PACKAGES_TABLE_HEADERS}
          showPagination
        />

        <PackageDetailsView
          isOpen={showPackageDetails}
          onClose={() => setShowPackageDetails(false)}
          bg={statusType(packageDetails?.status?.toLowerCase())}
          item={packageDetails}
          showTrackingInfo={() => setShowTrackingInfo(true)}
        />

        <MobileSideBar isOpen={showSideBar} onClose={() => setShowSideBar(false)} />

        <FilterDrawer
          placement={'bottom'}
          isOpen={showFilters}
          onClose={() => setShowFilters(false)}
          body={
            <Flex flexDir={'column'} justifyContent={'center'} gap={3}>
              <TableSearchInput
                name="search"
                value={state?.searchValue}
                label="Search"
                handleChange={e =>
                  setState({
                    ...state,
                    searchValue: e?.target?.value,
                  })
                }
              />
              <TableDateInput
                label={'From'}
                handleChange={e =>
                  setState({
                    ...state,
                    from: e?.target?.value,
                  })
                }
                name={'from'}
                value={state?.from}
              />
              <TableDateInput
                label={'To'}
                handleChange={e =>
                  setState({
                    ...state,
                    to: e?.target?.value,
                  })
                }
                name={'to'}
                value={state?.to}
              />

              {/* <Button
              bg="brand.text"
              color="brand.white"
              p="5"
              fontSize="14px"
              style={{
                borderRadius: '20px',
                lineHeight: '22px',
              }}
              _hover={{
                backgroundColor: 'brand.text',
              }}
              _active={{
                backgroundColor: 'brand.text',
              }}
              cursor={'pointer'}
              // from: string, to: string, keyword: string, filter: string
              onClick={() =>
                handleApplyFilters(state?.from, state?.to, state?.searchValue, state?.filterValue)
              }>
              Apply
            </Button> */}
            </Flex>
          }
        />
      </Flex>
      <ModalComponent
        isOpen={showTrackingInfo}
        onClose={() => setShowTrackingInfo(false)}
        size={'3xl'}
        style={{
          padding: '0px',
        }}
        align="left"
        header={
          <Flex bg={'brand.white'} w={'100%'} alignItems={'center'} gap={3}>
            <Image src={'../images/svgs/logo-color.svg'} alt={'marker'} />
            <Flex flexDir={'column'} gap={1}>
              <Text fontSize={'22px'} lineHeight={'26.63px'}>
                Tracking information
              </Text>
              <Text fontSize={'14px'} lineHeight={'16.94px'}>
                Tracking #:{`${packageDetails?.trackingNumber}`}
              </Text>
            </Flex>
          </Flex>
        }>
        <TrackingPackageScreen packageDetails={packageDetails} routeType={'auth'} />
      </ModalComponent>
    </>
  );
};
