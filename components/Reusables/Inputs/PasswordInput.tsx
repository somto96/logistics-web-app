import React, { useState } from 'react';
import { TextInput, TextInputProps } from './TextInput';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { Box } from '@chakra-ui/react';

const PasswordInput = ({
  value,
  hasError = false,
  placeholder,
  label,
  error,
  name,
  handleChange,
  maxLength,
  handleBlur,
}: TextInputProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  return (
    <TextInput
      name={name}
      label={label}
      value={value}
      type={showPassword ? 'text' : 'password'}
      hasError={hasError}
      error={error}
      placeholder={placeholder}
      handleChange={handleChange}
      handleBlur={handleBlur}
      maxLength={maxLength}>
      <Box onClick={() => setShowPassword(!showPassword)} cursor={'pointer'}>
        {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
      </Box>
    </TextInput>
  );
};

export default PasswordInput;
