import '../styles/globals.scss';

import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import nextI18nConfig from '../next-i18next.config';
import { RecoilRoot } from 'recoil';
import { memoize } from '@utils/common';
import AppLayout from '@layout/AppLayout';
import ErrorBoundary from '@components/ErrorBoundary';
import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ? Component.getLayout : (page: any) => page;

  return (
    <>
      <Head>
        <meta name='robots' content='index, follow' />
        <meta name='googlebot' content={'index,follow'} />
        <meta charSet='utf-8' />
        <meta name='theme-color' content='#476055' />
        <meta name='title' content='Maby Client' />
        <meta name='description' content='Maby Client' />
        <link rel='shortcut icon' href='/static/favicon.ico' />
        <meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1' />
      </Head>

      <ErrorBoundary>
        <RecoilRoot>
          <AppLayout>{getLayout(<Component {...pageProps} />)}</AppLayout>
        </RecoilRoot>
      </ErrorBoundary>
    </>
  );
}

// ignore in-browser next/js recoil warnings until its fixed.
const mutedConsole = memoize((console: any) => ({
  ...console,
  warn: (...args: any) => (args[0].includes('Duplicate atom key') ? null : console.warn(...args)),
}));
global.console = mutedConsole(global.console);

export default appWithTranslation(MyApp, nextI18nConfig);
