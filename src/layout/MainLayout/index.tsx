import Head from 'next/head';

import dynamic from 'next/dynamic';
const MainHeader = dynamic(() => import('../components/MainHeader'), {
  ssr: false,
});

const Footer = dynamic(() => import('../components/Footer'), {
  ssr: false,
});

const MainLayout = ({ children, title = 'Title' }: any) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <MainHeader />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default MainLayout;
