import { useFetchAdminPackages } from '../../utils/hooks/Dashboard/Backoffice/useFetchAdminPackages';
import { useDispatch } from 'react-redux';
import {
  setAllPackagesSelected,
  setPaginationControls,
  setSelectedPackages,
  useDashboardState,
} from '../../store/dashboard/slice';
import dayjs from '../../utils/dayjsLib';
import { AdminPackages, RidersList } from 'src/store/interfaces';
import { Packages } from 'src/utils/types';

export const useAdminDataTableController = () => {
  const dispatch = useDispatch();
  const { handleFetchAdminPackages } = useFetchAdminPackages();
  const { paginationControls } = useDashboardState();

  const handleFetchNext = async () => {
    dispatch(
      setPaginationControls({
        pagedQuery: {
          pageNumber: paginationControls?.pagedQuery?.pageNumber + 1,
          pageSize: paginationControls?.pagedQuery?.pageSize + 10,
        },
      })
    );
    await handleFetchAdminPackages({
      pagedQuery: {
        pageNumber: paginationControls?.pagedQuery?.pageNumber + 1,
        pageSize: 10,
      },
      dateFilter: {
        from: paginationControls?.dateFilter?.from,
        to: paginationControls?.dateFilter?.to, //ISO
      },
      textFilter: {
        keyword: paginationControls?.textFilter?.keyword,
      },
    });
  };
  const handleFetchPrev = async () => {
    dispatch(
      setPaginationControls({
        pagedQuery: {
          pageNumber: paginationControls?.pagedQuery?.pageNumber - 1,
          pageSize: paginationControls?.pagedQuery?.pageSize - 10,
        },
      })
    );
    await handleFetchAdminPackages({
      pagedQuery: {
        pageNumber: paginationControls?.pagedQuery?.pageNumber - 1,
        pageSize: 10,
      },
      dateFilter: {
        from: paginationControls?.dateFilter?.from,
        to: paginationControls?.dateFilter?.to, //ISO
      },
      textFilter: {
        keyword: paginationControls?.textFilter?.keyword,
      },
    });
  };

  type FilterTypes = {
    from: string;
    to: string;
    keyword: string;
    filter: string;
  };
  const handleApplyFilters = async ({ from, to, keyword, filter }: FilterTypes) => {
    dispatch(
      setPaginationControls({
        pagedQuery: {
          keyword: filter,
          pageNumber: 1,
          pageSize: 10,
        },
        dateFilter: {
          from: from,
          to: to, //ISO
        },
        textFilter: {
          keyword: keyword,
        },
      })
    );
    await handleFetchAdminPackages({
      pagedQuery: {
        keyword: filter !== '' ? filter : null,
        pageNumber: 1,
        pageSize: 10,
      },
      dateFilter: {
        from: from !== '' ? dayjs(from).toISOString() : null,
        to: to !== '' ? dayjs(to).toISOString() : null, //ISO
      },
      textFilter: {
        keyword: keyword !== '' ? keyword : null,
      },
    });
  };

  type HandleCheckboxChangeArgs = {
    item: string;
    packages: string[];
    allPackagesSelected: boolean;
  };

  const handleCheckboxChange = ({
    item,
    packages,
    allPackagesSelected,
  }: HandleCheckboxChangeArgs) => {
    if (packages?.includes(item)) {
      const newPackageList = packages.filter((data: any) => data !== item);
      // console.log("test", newPackageList);
      allPackagesSelected && dispatch(setAllPackagesSelected(false));
      dispatch(setSelectedPackages(newPackageList));
    } else {
      dispatch(setSelectedPackages([...packages, ...[item]]));
    }
  };

  const getAvailablePackages = (packages: AdminPackages[]) => {
    return packages?.filter(
      (item: AdminPackages) =>
        item.status?.toLowerCase() === 'availableforpickup' ||
        item.status?.toLowerCase() === 'undelivered'
    );
  };

  const getPackageTrackingIds = (packages: AdminPackages[]) => {
    const availablePackages = getAvailablePackages(packages);
    // console.log('available', availablePackages);
    return availablePackages?.map((item: any) => {
      if (
        item.status?.toLowerCase() === 'availableforpickup' ||
        item.status?.toLowerCase() === 'undelivered'
      )
        return item?.trackingNumber;
    });
  };

  const handleAssignBtnLabelText = (status: string) => {
    switch (status) {
      case 'availableforpickup':
        return 'Assign';
      case 'undelivered':
        return 'Reassign';
      default:
        return 'Assigned';
    }
  };

  const handleAssignBg = (status: string) => {
    switch (status) {
      case 'availableforpickup':
        return 'brand.black';
      case 'undelivered':
        return 'brand.black';
      default:
        return '#F2F2F2';
    }
  };

  const returnPackageLocation = (packageTrackingNum: string, packages: AdminPackages[]) => {
    return packages?.find((item: AdminPackages) => item.trackingNumber === packageTrackingNum)
      ?.deliveryCity;
  };

  const handleSearchForAssigningPackages = (
    query: string,
    data: RidersList[]
  ): [] | RidersList[] => {
    const newData = data?.filter((item: RidersList) => {
      if (query !== '') {
        const queryString = query?.toLowerCase();
        const riderNames = item.fullName?.toLowerCase();
        return riderNames?.toLowerCase()?.includes(queryString);
      }
      return item;
    });

    return newData;
  };

  const returnPackageIds = (packageTrackingNum: string[], packages: AdminPackages[]): string[] => {
    let packageIds: string[] = [];
    for (let i = 0; i < packageTrackingNum.length; i++) {
      for (let j = 0; j < packages.length; j++) {
        packageTrackingNum[i] === packages[j].trackingNumber &&
          packageIds.push(`${packages[j].id}`);
      }
    }
    return packageIds;
  };

  const packageStatusUpdates = (status: string) => {
    // AvailableForPickUp = 0,
    // PickedUp = 1,
    // WareHouse = 2,
    // InDelivery = 3,
    // UnDelivered = 4,
    // SLABreach = 5,
    // Delivered = 6
    switch (status) {
      case 'PickedUp':
        return 0;
      case 'WareHouse':
        return 1;
      case 'InDelivery':
        return 2;
      case 'UnDelivered':
      case 'SLABreach':
      case 'Delivered':
        return 3;
      default:
        return 0;
    }
  };

  const dynamicSteps = (steps: any[], status: string, item: Packages | AdminPackages) => {
    if (status?.toLowerCase() === 'undelivered') {
      steps.pop();
      return [
        ...steps,
        {
          title: 'Undelivered',
          description: {
            message: `We were unable to complete delivery to you. We’ll schedule another delivery to you. 
              Please note that we may be forced to cancel this delivery if we are unable to deliver to you in the next 2 attempts.`,
            date: `${dayjs(item?.expectedDeliveryDate).format('ddd D, YYYY')?.toUpperCase()}`,
          },
          number: 3,
        },
      ];
    }
    if (status?.toLowerCase() === 'slabreach') {
      steps.pop();
      return [
        ...steps,
        {
          title: 'In breach of SLA ',
          description: {
            message: `For some reasons beyond our control, we cannot deliver at the stipulated time. 
            We’ll schedule another delivery date and communicate with you. Please bear with us.`,
            date: `${dayjs(item?.expectedDeliveryDate).format('ddd D, YYYY')?.toUpperCase()}`,
          },
          number: 3,
        },
      ];
    }

    return steps;
  };

  return {
    handleApplyFilters,
    handleFetchNext,
    handleFetchPrev,
    handleCheckboxChange,
    getPackageTrackingIds,
    handleAssignBtnLabelText,
    handleAssignBg,
    returnPackageLocation,
    handleSearchForAssigningPackages,
    returnPackageIds,
    packageStatusUpdates,
    dynamicSteps,
  };
};
