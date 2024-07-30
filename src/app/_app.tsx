import React from 'react'; // Add this line
import { AppProps } from 'next/app';
import RootLayout from '../app/layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RootLayout>
      <Component {...pageProps} />
    </RootLayout>
  );
}

export default MyApp;
