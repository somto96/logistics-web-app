import React, { useState } from 'react';
import { Field, useField } from 'formik';
import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Image,
  Box,
  Flex,
} from '@chakra-ui/react';

interface Option {
  id: number;
  label: string;
  value: any;
}

interface SelectFieldProps {
  name: string;
  options: Option[];
  placeholder?: string;
  label?: string;
  onChange: (name: string, value: string) => void;
  value?: any;
  error?: string;
  hasError?: boolean | any;
  iconSrc?: string;
}

export const SelectField = ({
  name,
  options,
  placeholder,
  label,
  onChange,
  value,
  hasError,
  iconSrc = "images/svgs/ChevronDownIcon.svg"
}: SelectFieldProps) => {
  const [selectedOption, setSelectedOption] = useState<Option | null>(
    options.find(option => option.value === value) || null
  );
  const [, meta, helpers] = useField(name);

  const handleOptionSelect = (option: Option) => {
    setSelectedOption(option);
    helpers.setValue(option.value); // set the Formik field value
    onChange(name, option.value); // call onChange with the updated value
  };
  return (
    <Field name={name}>
      {() => (
        <Box>
          <Text fontSize="12px" lineHeight="14px" letterSpacing={'0.02em'} color={'brand.text'} mb={2}>
            {label}
          </Text>
          <Menu matchWidth>
            <MenuButton
              bg={'brand.white'}
              border={'1px'}
              borderColor={meta?.touched && meta?.error ? 'brand.error' : 'brand.inputBorderColor'}
              fontSize={'14px'}
              lineHeight={'14px'}
              letterSpacing={'0.02em'}
              color={'brand.text'}
              sx={{
                span: {
                  fontSize: '14px',
                  lineHeight: '14px',
                  letterSpacing: '0.02em',
                  color: 'brand.text',
                  fontWeight: 400,
                },
              }}
              _focusVisible={{
                borderColor:
                  meta?.touched && meta?.error ? 'brand.error' : 'brand.inputBorderColor',
                bg: 'brand.white',
              }}
              _active={{
                borderColor: 'brand.inputBorderColor',
                bg: 'brand.white',
              }}
              _hover={{
                borderColor:
                  meta?.touched && meta?.error ? 'brand.error' : 'brand.inputBorderColor',
                bg: 'brand.white',
              }}
              w="100%"
              as={Button}
              textAlign={'left'}
              rightIcon={<Image src={iconSrc}alt="ChevronDownIcon" />}>
              {selectedOption?.label || placeholder}
            </MenuButton>
            <MenuList
              w="100%"
              h={"200px"}
              zIndex={5}
              position={"relative"}
              overflowY={"auto"}
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
          {hasError && (
            <Flex flexDir={'row'} gap={2}>
              <Text color={'brand.error'} fontSize={'12px'}>
                {meta?.error}
              </Text>
            </Flex>
          )}
        </Box>
      )}
    </Field>
  );
};
