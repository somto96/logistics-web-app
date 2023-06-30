import {
  FormControl,
  //   FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  InputLeftElement,
  Flex,
  Text,
} from '@chakra-ui/react';
import React from 'react';

export interface TextInputProps {
  value?: string;
  type?: string;
  placeholder?: string;
  label?: string;
  children?: React.ReactNode;
  iconElement?: React.ReactNode;
  hasError?: boolean | any;
  error?: string;
  name?: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur?: React.FocusEventHandler<HTMLInputElement> | undefined;
  maxLength?: number;
}

export const TextInput = ({
  value,
  hasError = false,
  type = 'text',
  placeholder,
  label,
  children,
  iconElement,
  error,
  name,
  handleChange,
  maxLength,
  handleBlur,
}: TextInputProps) => {
  return (
    <FormControl>
      <FormLabel fontSize="12px" lineHeight="14px" letterSpacing={'0.02em'} color={'brand.text'}>
        {label?.toUpperCase()}
      </FormLabel>
      <InputGroup size="md">
        <InputLeftElement>{iconElement}</InputLeftElement>
        <Input
          name={name}
          value={value}
          bgColor={'brand.white'}
          maxLength={maxLength}
          p={5}
          py={3}
          fontSize={'14px'}
          lineHeight={'14px'}
          letterSpacing={'0.02em'}
          color={'brand.text'}
          type={type}
          placeholder={placeholder}
          onChange={e => handleChange(e)}
          onBlur={handleBlur}
          zIndex={2}
          borderRadius="8px"
          borderColor={hasError ? 'brand.error' : '#333333'}
          _focusVisible={{
            borderColor: '#333333',
          }}
          _hover={{
            borderColor: '#333333',
          }}
          _placeholder={{
            fontSize: '14px',
            lineHeight: '27px',
            letterSpacing: '0.03em',
            color: '#BDBDBD',
          }}
        />
        <InputRightElement>{children}</InputRightElement>
      </InputGroup>
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
