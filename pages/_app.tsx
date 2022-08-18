import '../styles/globals.scss';

import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import nextI18nConfig from '../next-i18next.config';
import { RecoilRoot } from 'recoil';
import { memoize } from 'src/utils/common';
import ErrorBoundary from 'src/components/ErrorBoundary';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name='robots' content='index, follow' />
        <meta charSet='utf-8' />
        <meta name='theme-color' content='#476055' />
        <meta name='title' content='Nextjs Initial' />
        <meta name='description' content='Nextjs Initial' />
        <link rel='shortcut icon' href='/static/favicon.ico' />
        <meta
          name='viewport'
          content='width=device-width,initial-scale=1,maximum-scale=2,shrink-to-fit=no'
        />
      </Head>

      <ErrorBoundary>
        <RecoilRoot>
          <Component {...pageProps} />
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
