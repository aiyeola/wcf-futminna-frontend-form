import React, { useEffect } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { StateMachineProvider, createStore } from 'little-state-machine';

const DevTool = dynamic(
  //@ts-ignore
  () => import('little-state-machine-devtools').then((mod) => mod.DevTool),
  { ssr: false },
);

import theme from 'src/theme';
import '@styles/global.css';

const queryClient = new QueryClient();

createStore({
  personalInfo: {
    firstName: '',
    lastName: '',
    gender: '',
    origin: '',
    homeAddress: '',
    schoolAddress: '',
    dob: new Date(),
  },
  contactInfo: {
    email: '',
    contactNumber1: '',
    contactNumber2: '',
  },
});

function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <StateMachineProvider>
            {process.env.NODE_ENV !== 'production' && <DevTool />}
            <Component {...pageProps} />
          </StateMachineProvider>
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default App;
