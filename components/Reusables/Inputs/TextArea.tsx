import {
  FormControl,
  //   FormErrorMessage,
  FormLabel,
  Flex,
  Text,
  Textarea,
} from '@chakra-ui/react';
import React from 'react';

export interface TextAreaProps {
  value: string;
  placeholder?: string;
  label: string;
  hasError?: boolean | any;
  error?: string;
  name: string;
  handleChange: any;
  size?: string;
}

export const TextArea = ({
  value,
  hasError = false,
  placeholder,
  label,
  error,
  size = 'md',
  name,
  handleChange,
}: TextAreaProps) => {
  return (
    <FormControl>
      <FormLabel fontSize="12px" lineHeight="14px" letterSpacing={'0.02em'} color={'brand.text'}>
        {label?.toUpperCase()}
      </FormLabel>
      <Textarea
        name={name}
        size={size}
        value={value}
        bgColor={'brand.white'}
        p={3}
        placeholder={placeholder}
        onChange={handleChange}
        color={'brand.text'}
        borderRadius="8px"
        fontSize={'14px'}
        lineHeight={'24px'}
        borderColor={hasError ? 'brand.error' : '#262626'}
        _focusVisible={{
          borderColor: '#262626',
        }}
        _hover={{
          borderColor: '#262626',
        }}
        _placeholder={{
          fontSize: '14px',
          lineHeight: '24px',
          color: '#262626',
          opacity: '0.4',
        }}
      />
      {hasError && (
        <Flex flexDir={'row'} gap={2}>
          <Text color={'brand.error'} fontSize={'12px'}>
            {error}
          </Text>
        </Flex>
      )}
    </FormControl>
  );
};
