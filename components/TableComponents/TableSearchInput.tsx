import { FormControl, FormLabel, InputGroup, InputLeftElement, Input, Image } from "@chakra-ui/react";

type TableSearchInputProps = {
    label: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    name: string;
    value: string;
    placeholder?: string;
}
export const TableSearchInput = ({
    label,
    handleChange,
    name,
    value,
    placeholder="Search by Tracking ID"
}: TableSearchInputProps) => {
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
        <InputLeftElement>
          <Image src="/images/svgs/search-icon.svg" alt="search" />
        </InputLeftElement>
        <Input
          name= {name}
          value={value}
          bgColor={'brand.white'}
          onChange={(e) => handleChange(e)}
          placeholder={placeholder}
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
