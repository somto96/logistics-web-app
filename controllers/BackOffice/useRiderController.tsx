import { useDispatch } from 'react-redux';
import { setRiderTablePaginationControls, useDashboardState } from '../../store/dashboard/slice';
import dayjs from '../../utils/dayjsLib';
// import { RidersList } from 'store/interfaces';
import { useFetchRidersList } from '@/utils/hooks/Dashboard/Backoffice/useFetchRidersList';
import { RidersList } from 'store/interfaces';

export const useRiderController = () => {
  const dispatch = useDispatch();
  const { handleFetchRiders } = useFetchRidersList();
  const { riderPaginationControls } = useDashboardState();

  const handleFetchNext = async () => {
    dispatch(
      setRiderTablePaginationControls({
        pagedQuery: {
          pageNumber: riderPaginationControls?.pagedQuery?.pageNumber + 1,
          pageSize: riderPaginationControls?.pagedQuery?.pageSize + 10,
        },
      })
    );
    await handleFetchRiders({
      pagedQuery: {
        pageNumber: riderPaginationControls?.pagedQuery?.pageNumber + 1,
        pageSize: 10,
      },
      dateFilter: {
        from: riderPaginationControls?.dateFilter?.from,
        to: riderPaginationControls?.dateFilter?.to, //ISO
      },
      textFilter: {
        keyword: riderPaginationControls?.textFilter?.keyword,
      },
    });
  };
  const handleFetchPrev = async () => {
    dispatch(
      setRiderTablePaginationControls({
        pagedQuery: {
          pageNumber: riderPaginationControls?.pagedQuery?.pageNumber - 1,
          pageSize: riderPaginationControls?.pagedQuery?.pageSize - 10,
        },
      })
    );
    await handleFetchRiders({
      pagedQuery: {
        pageNumber: riderPaginationControls?.pagedQuery?.pageNumber - 1,
        pageSize: 10,
      },
      dateFilter: {
        from: riderPaginationControls?.dateFilter?.from,
        to: riderPaginationControls?.dateFilter?.to, //ISO
      },
      textFilter: {
        keyword: riderPaginationControls?.textFilter?.keyword,
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
      setRiderTablePaginationControls({
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
    await handleFetchRiders({
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

  const handleSearchForRiders = (
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

  return {
    handleApplyFilters,
    handleFetchNext,
    handleFetchPrev,
    handleSearchForRiders
  };
};
