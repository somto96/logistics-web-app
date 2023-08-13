// import { Packages } from '../../../utils/types';
import { mockPackagesData } from '@/utils/hooks/Dashboard/Backoffice/__test__/mocks';
import {
  TableContainer,
  Table,
  Th,
  Thead,
  Tr,
  // Tbody,
  //   Tfoot,
  // Td,
  Flex,
  Text,
  Image,
  // Box,
  Center,
  Box,
  //   HStack,
} from '@chakra-ui/react';
import { useAdminDataTableController } from 'controllers/BackOffice/useAdminDataTableController';
import { useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setAllPackagesSelected, setSelectedPackages, useDashboardState } from 'store/dashboard/slice';
// import { statusType } from '../../../utils/index';
// import dayjs from '../../../utils/dayjsLib';

type DataTableProps = {
  // data?: Packages[];
  extras?: any;
  // handleClick: (item: Packages) => void;
  handleNext: () => void;
  handlePrev: () => void;
  headers?: { id: number; name: string }[];
  showPagination?: boolean;
  showCheckbox?: boolean;
  prevIconSrc ?: string;
  nextIconSrc ?: string;
  body: React.ReactElement;
};
export const DataTable = ({
  // data,
  extras,
  headers,
  handleNext,
  handlePrev,
  showPagination,
  showCheckbox,
  body,
  prevIconSrc = "../images/svgs/page-left-icon.svg",
  nextIconSrc = "../images/svgs/page-right-icon.svg",
}: // handleClick,
DataTableProps) => {
  const totalPages = Math.ceil(Number(extras?.totalItemCount) / 10);
  const dispatch = useDispatch();
  const dashboard = useDashboardState();
  const [checked, setChecked] = useState<boolean>(dashboard?.allPackagesSelected);
  const { getPackageTrackingIds } = useAdminDataTableController();
  const packageTrackingIds = useMemo(() => getPackageTrackingIds(mockPackagesData?.data?.responseObject?.items), [mockPackagesData])
  // console.log("packageIds", packageTrackingIds)
  return (
    <>
      <TableContainer>
        <Table variant="simple" size={'lg'}>
          <Thead borderTop={'1px'} borderColor={'#E0E0E0'}>
            <Tr
              fontSize={'12px'}
              fontWeight={'600'}
              lineHeight={'14px'}
              letterSpacing={'0.02em'}
              textTransform={'uppercase'}>
              {headers?.map(header => (
                <Th key={header?.id} color={'#A9A9A9'}>
                  {showCheckbox ? (
                    <Flex alignItems={'center'} gap={2}>
                      {header?.id === 0 && (
                        <Box
                          cursor={'pointer'}
                          onClick={() => {
                            setChecked(!checked)
                            dispatch(setAllPackagesSelected(!dashboard?.allPackagesSelected));
                            if(checked) {
                              dispatch(setSelectedPackages(packageTrackingIds))
                            }else {
                              dispatch(setSelectedPackages([]));
                              dispatch(setAllPackagesSelected(false));
                            }
                          }}>
                          {dashboard?.allPackagesSelected ? (
                            <Image
                              src="../images/svgs/custom-filled-checkbox.svg"
                              alt="checkbox-filled"
                            />
                          ) : (
                            <Image
                              src="../images/svgs/custom-checkbox.svg"
                              alt="checkbox-not-filled"
                            />
                          )}
                        </Box>
                      )}
                      <Box>{header?.name?.toUpperCase()}</Box>
                    </Flex>
                  ) : (
                    <Box>{header?.name?.toUpperCase()}</Box>
                  )}
                </Th>
              ))}
            </Tr>
          </Thead>
          {body}
        </Table>
      </TableContainer>
      {showPagination && (
        <Flex
          flexDir={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
          w={'100%'}
          p={4}>
          <Text fontSize={'14px'} lineHeight={'150%'} color={'#BDBDBD'}>
            {`Showing ${extras?.currentPageNumber} of ${extras?.totalItemCount}`}
          </Text>
          <Flex alignItems={'center'} gap={4}>
            <Text fontSize={'14px'} lineHeight={'150%'} color={'#BDBDBD'}>
              {`${extras?.currentPageNumber} - ${totalPages}`}
            </Text>
            <Flex>
              <Center
                bg={extras?.hasPrevious ? 'brand.text' : '#BDBDBD'}
                p={4}
                cursor={'pointer'}
                onClick={() => {
                  if (extras?.hasPrevious) handlePrev();
                }}>
                <Image src={prevIconSrc} alt="page-left" />
              </Center>
              <Center
                bg={extras?.hasNext ? 'brand.text' : '#BDBDBD'}
                p={4}
                cursor={'pointer'}
                onClick={() => {
                  if (extras?.hasNext) handleNext();
                }}>
                <Image src={nextIconSrc} alt="page-right" />
              </Center>
            </Flex>
          </Flex>
        </Flex>
      )}
    </>
  );
};
