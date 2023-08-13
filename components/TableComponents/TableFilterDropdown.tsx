import { Button, Menu, MenuButton, MenuItem, MenuList, Image, Text, Flex } from '@chakra-ui/react';
import { useState } from 'react';

interface Option {
  id: number;
  label: string;
  value: any;
}

type TableFilterDropDownProps = {
  options: Option[];
  // name: string;
  width?: string;
  placeholder: string;
  label: string;
  onChange: (value: string) => void;
  value?: any;
  icon?: any;
  rightIcon?: any;
  height?: string;
};

export const TableFilterDropDown = ({
  options,
  // name,
  placeholder = 'Filter',
  width = '100%',
  value,
  rightIcon = <Image src="../images/svgs/ChevronDownIcon.svg" alt="ChevronDownIcon" />,
  icon = <Image src="../images/svgs/sort-icon.svg" alt="sort" />,
  label,
  height = 'auto',
  onChange,
}: TableFilterDropDownProps) => {
  const [selectedOption, setSelectedOption] = useState<Option | null>(
    options.find(option => option.value === value) || null
  );
  const handleOptionSelect = (option: Option) => {
    setSelectedOption(option);
    onChange(option.value); // call onChange with the updated value
  };
  return (
    <Flex flexDir="column" gap={2} w={width}>
      {label !== '' && (
        <Text
          fontWeight={'500'}
          fontSize={'12px'}
          lineHeight={'15px'}
          letterSpacing={'0.02em'}
          color={'brand.text'}>
          {label}
        </Text>
      )}
      <Menu matchWidth>
        <MenuButton
          bg={'brand.white'}
          size={'sm'}
          border={'1px'}
          fontSize={'12px'}
          borderRadius="20px"
          borderColor={'#A9A9A9'}
          lineHeight={'15px'}
          letterSpacing={'0.02em'}
          color={'brand.text'}
          cursor={'pointer'}
          sx={{
            span: {
              fontSize: '14px',
              lineHeight: '14px',
              letterSpacing: '0.02em',
              color: 'brand.text',
              fontWeight: 400,
            },
          }}
          _hover={{
            bg: 'brand.white',
          }}
          w="100%"
          as={Button}
          textAlign={'left'}
          rightIcon={rightIcon}
          leftIcon={icon}>
          {selectedOption?.label || placeholder}
        </MenuButton>
        <MenuList
          w="100%"
          h={height}
          zIndex={5}
          position={'relative'}
          overflowY={'auto'}
          fontSize={'14px'}
          lineHeight={'14px'}
          letterSpacing={'0.02em'}
          px={0}
          py={0}>
          {options.map(option => (
            <MenuItem
              key={option?.id}
              p={4}
              borderBottom={'1px'}
              borderColor="rgba(189, 189, 189, 1)"
              onClick={() => handleOptionSelect(option)}>
              {option.label}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Flex>
  );
};
