import '@/styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { customTheme } from '@/styles/theme';
import { store, persistor } from '../store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { ReCaptchaProvider } from 'next-recaptcha-v3';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}>
        <PersistGate loading={null} persistor={persistor}>
          <ChakraProvider theme={customTheme}>
            <Component {...pageProps} />
          </ChakraProvider>
          <ToastContainer />
        </PersistGate>
      </ReCaptchaProvider>
    </Provider>
  );
}
