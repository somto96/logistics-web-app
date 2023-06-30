import { Packages } from '../../../utils/types';
import {
  TableContainer,
  Table,
  Th,
  Thead,
  Tr,
  Tbody,
  //   Tfoot,
  Td,
  Flex,
  Text,
  Image,
  Box,
  Center,
  //   HStack,
} from '@chakra-ui/react';
import { statusType } from '../../../utils/index';
import dayjs from '../../../utils/dayjsLib';

type DataTableProps = {
  data?: Packages[];
  extras?: any;
  handleClick: (item: Packages) => void;
  handleNext: () => void;
  handlePrev: () => void;
  headers?: { id: number; name: string }[];
  showPagination?: boolean;
};
export const DataTable = ({
  data,
  extras,
  headers,
  handleNext,
  handlePrev,
  showPagination,
  handleClick,
}: DataTableProps) => {
  const totalPages = Math.ceil(Number(extras?.totalItemCount) / 10);
  return (
    <>
      <TableContainer>
        <Table variant="simple" size={"lg"}>
          <Thead borderTop={'1px'} borderColor={'#E0E0E0'}>
            <Tr
              fontSize={'12px'}
              fontWeight={'600'}
              lineHeight={'14px'}
              letterSpacing={'0.02em'}
              textTransform={'uppercase'}>
              {headers?.map(header => (
                <Th key={header?.id} color={"#A9A9A9"}>{header?.name?.toUpperCase()}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {data?.map(item => (
              <Tr
                key={item?.id}
                onClick={() => handleClick(item)}
                cursor={'pointer'}
                _hover={{
                  backgroundColor: '#F2F2F2',
                }}>
                <Td
                  fontSize={'14px'}
                  fontWeight={'700'}
                  lineHeight={'14px'}
                  color={'brand.text'}
                  letterSpacing={'0.02em'}>
                  {item?.trackingNumber}
                </Td>
                <Td>
                  <Flex flexDir={'column'} justifyContent={'flex-start'} gap={2}>
                    <Text
                      fontSize={'14px'}
                      fontWeight={'700'}
                      lineHeight={'14px'}
                      color={'brand.text'}>
                      {`${item?.pickUpCity}, ${item?.pickUpState}`}
                    </Text>

                    <Text
                      fontSize={'12px'}
                      fontWeight={'600'}
                      lineHeight={'15px'}
                      letterSpacing={'0.02em'}
                      color={'#C4C4C4'}>{`${dayjs(item?.pickupDate)
                      .format('ddd')
                      ?.toUpperCase()}  ${dayjs(item?.pickupDate).format('DD/MM/YYYY')}`}</Text>
                  </Flex>
                </Td>
                <Td>
                  <Flex flexDir={'column'} gap={2}>
                    <Text
                      fontSize={'14px'}
                      fontWeight={'700'}
                      lineHeight={'14px'}
                      color={'brand.text'}>
                      {`${item?.deliveryCity}, ${item?.deliveryState}`}
                    </Text>
                    <Text
                      fontSize={'12px'}
                      fontWeight={'600'}
                      lineHeight={'15px'}
                      letterSpacing={'0.02em'}
                      color={'#C4C4C4'}>{`${dayjs(item?.expectedDeliveryDate)
                      .format('ddd')
                      ?.toUpperCase()}  ${dayjs(item?.expectedDeliveryDate).format(
                      'DD/MM/YYYY'
                    )}`}</Text>
                  </Flex>
                </Td>
                <Td
                  fontSize={'14px'}
                  fontWeight={'700'}
                  lineHeight={'14px'}
                  color={'brand.text'}
                  letterSpacing={'0.02em'}>
                  {`${item?.customerFirstName} ${item?.customerLastName}`}
                </Td>
                <Td
                  fontSize={'14px'}
                  fontWeight={'700'}
                  lineHeight={'14px'}
                  color={'brand.text'}
                  letterSpacing={'0.02em'}>
                  <Box
                    bg={statusType(item?.status?.toLowerCase())}
                    border={'1px'}
                    borderRadius={'20px'}
                    borderColor={
                      item?.status?.toLowerCase() === 'availableforpickup'
                        ? 'brand.text'
                        : statusType(item?.status?.toLowerCase())
                    }
                    p={2}
                    fontSize={'14px'}
                    lineHeight={'16px'}
                    fontWeight={'500'}>
                    {item?.status}
                  </Box>
                </Td>
              </Tr>
            ))}
          </Tbody>
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
                <Image src="../images/svgs/page-left-icon.svg" alt="page-left" />
              </Center>
              <Center
                bg={extras?.hasNext ? 'brand.text' : '#BDBDBD'}
                p={4}
                cursor={'pointer'}
                onClick={() => {
                  if (extras?.hasNext) handleNext();
                }}>
                <Image src="../images/svgs/page-right-icon.svg" alt="page-right" />
              </Center>
            </Flex>
          </Flex>
        </Flex>
      )}
    </>
  );
};
