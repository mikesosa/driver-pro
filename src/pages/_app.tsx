import { ApolloProvider } from '@apollo/client';
import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';

import '@/styles/globals.css';

// !STARTERCONF This is for demo purposes, remove @/styles/colors.css import immediately
// import '@/styles/colors.css';
import apolloClient from '@/lib/clients/apolloClient';
import { ToastContextProvider } from '@/lib/context/ToastContext';

/**
 * !STARTERCONF info
 * ? `Layout` component is called in every page using `np` snippets. If you have consistent layout across all page, you can add it here too
 */

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <ApolloProvider client={apolloClient}>
        <ToastContextProvider>
          <Component {...pageProps} />
        </ToastContextProvider>
      </ApolloProvider>
    </SessionProvider>
  );
}

export default MyApp;
