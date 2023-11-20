import { useDispatch } from 'react-redux';
import { setCustomerTablePaginationControls, useDashboardState } from '../../store/dashboard/slice';
import dayjs from '../../utils/dayjsLib';
import { CustomersList } from 'src/store/interfaces';
import { useFetchCustomerList } from 'src/utils/hooks/Dashboard/Backoffice/useFetchCustomerList';

export const useCustomerController = () => {
  const dispatch = useDispatch();
  const { handleFetchCustomers } = useFetchCustomerList();
  const { paginationControlsForCustomers } = useDashboardState();

  const handleFetchNext = async () => {
    dispatch(
        setCustomerTablePaginationControls({
        pagedQuery: {
          pageNumber: paginationControlsForCustomers?.pagedQuery?.pageNumber + 1,
          pageSize: paginationControlsForCustomers?.pagedQuery?.pageSize + 10,
        },
      })
    );
    await handleFetchCustomers({
      pagedQuery: {
        pageNumber: paginationControlsForCustomers?.pagedQuery?.pageNumber + 1,
        pageSize: 10,
      },
      dateFilter: {
        from: paginationControlsForCustomers?.dateFilter?.from,
        to: paginationControlsForCustomers?.dateFilter?.to, //ISO
      },
      textFilter: {
        keyword: paginationControlsForCustomers?.textFilter?.keyword,
      },
    });
  };
  const handleFetchPrev = async () => {
    dispatch(
        setCustomerTablePaginationControls({
        pagedQuery: {
          pageNumber: paginationControlsForCustomers?.pagedQuery?.pageNumber - 1,
          pageSize: paginationControlsForCustomers?.pagedQuery?.pageSize - 10,
        },
      })
    );
    await handleFetchCustomers({
      pagedQuery: {
        pageNumber: paginationControlsForCustomers?.pagedQuery?.pageNumber - 1,
        pageSize: 10,
      },
      dateFilter: {
        from: paginationControlsForCustomers?.dateFilter?.from,
        to: paginationControlsForCustomers?.dateFilter?.to, //ISO
      },
      textFilter: {
        keyword: paginationControlsForCustomers?.textFilter?.keyword,
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
        setCustomerTablePaginationControls({
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
    await handleFetchCustomers({
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

  const handleSearchForCustomers = (
    query: string,
    data: CustomersList[]
  ): [] | CustomersList[] => {
    const newData = data?.filter((item: CustomersList) => {
      if (query !== '') {
        const queryString = query?.toLowerCase();
        const customerNames = item.name?.toLowerCase();
        return customerNames?.toLowerCase()?.includes(queryString);
      }
      return item;
    });

    return newData;
  };

  return {
    handleApplyFilters,
    handleFetchNext,
    handleFetchPrev,
    handleSearchForCustomers

  };
};
