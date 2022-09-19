import type { NextPage } from 'next';
import { useTranslation } from 'next-i18next';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { Select } from 'antd';
import MainLayout from '@layout/MainLayout';
import Home from '@components/Home';

const HomePage: NextPage = () => {
  const { t } = useTranslation('home');

  return (
    <MainLayout title={t('home.title')}>
      <Home />
      <Select></Select>
    </MainLayout>
  );
};

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'home'])),
      // Will be passed to the page component as props
    },
  };
}

export default HomePage;
