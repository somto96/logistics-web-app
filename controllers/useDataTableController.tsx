import { useFetchPackages } from '../utils/hooks/Dashboard/useFetchPackages';
import { useDispatch } from 'react-redux';
import { setPaginationControls, useDashboardState } from '../store/dashboard/slice';
import dayjs from "../utils/dayjsLib";

export const useDataTableController = () => {
  const dispatch = useDispatch();
  const { handleFetchPackages } = useFetchPackages();
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
    await handleFetchPackages({
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
    await handleFetchPackages({
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

  const handleApplyFilters = async (from: string, to: string, keyword: string, filter: string) => {
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
    await handleFetchPackages({
      pagedQuery: {
        keyword: filter !== "" ? filter : null,
        pageNumber: 1,
        pageSize: 10,
      },
      dateFilter: {
        from: from !== "" ? dayjs(from).toISOString() : null,
        to: to !== "" ? dayjs(to).toISOString() : null, //ISO
      },
      textFilter: {
        keyword: keyword !== "" ? keyword : null,
      },
    });
  };
  return {
    handleApplyFilters,
    handleFetchNext,
    handleFetchPrev,
  };
};
