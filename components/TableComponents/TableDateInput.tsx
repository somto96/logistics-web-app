import { FormControl, FormLabel, Input, InputGroup } from '@chakra-ui/react';

type TableDateInputProps = {
  label: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  value: string;
};
export const TableDateInput = ({ label, handleChange, name, value }: TableDateInputProps) => {
  return (
    <FormControl>
      <FormLabel
        fontSize={'12px'}
        lineHeight={'15px'}
        letterSpacing={'0.02em'}
        color={'brand.text'}>
        {label}
      </FormLabel>
      <InputGroup size={'sm'}>
        <Input
          bgColor={'brand.white'}
          name={name}
          type="Date"
          value={value}
          onChange={e => handleChange(e)}
          placeholder=""
          fontSize={'12px'}
          lineHeight={'15px'}
          letterSpacing={'0.02em'}
          color={'brand.text'}
          borderRadius="20px"
          borderColor={'#A9A9A9'}
          _focusVisible={{
            borderColor: '#A9A9A9',
          }}
          _hover={{
            borderColor: '#A9A9A9',
          }}
          _placeholder={{
            fontSize: '12px',
            lineHeight: '15px',
            letterSpacing: '0.02em',
            color: '#A9A9A9',
          }}
        />
      </InputGroup>
    </FormControl>
  );
};
