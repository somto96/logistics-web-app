// 1. Import `extendTheme`
import { extendTheme } from '@chakra-ui/react';

// Pass your custom values here
export const customTheme = extendTheme({
  colors: {
    brand: {
      white: '#FFFFFF',
      black: '#000000',
      bg: '#F5F5F5',
      track: '#F2F2F2',
      text: '#0D0D0D',
      error: '#EB5757',
      success: '#219653',
      inputBorderColor: "#333333",
    },
  },
  fonts: {
    heading: `'Inter', sans-serif`,
    body: `'Inter', sans-serif`,
  },
});
