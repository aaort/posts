import Tabs from '@/components/Tabs';
import LimitContext from '@/context/LImit';
import { styled } from '@/theme';
import { Limit, Tab } from '@/types';
import { getLimit } from '@/utils';
import { Suspense, lazy, useState } from 'react';
import { Column } from './common';
import Loading from './common/Loading';

const Posts = lazy(() => import('./lists/Posts'));
const Photos = lazy(() => import('./lists/Photos'));
const Todos = lazy(() => import('./lists/Todos'));

const TabsContainer: React.FC<{}> = () => {
  const [selectedTab, setSelectedTab] = useState<Tab>('posts');
  const [limit, setLimit] = useState<Limit>(getLimit());

  return (
    <LimitContext.Provider value={[limit, setLimit]}>
      <Container>
        <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        <Suspense fallback={<Loading />}>
          {selectedTab === 'posts' ? (
            <Posts />
          ) : selectedTab === 'photos' ? (
            <Photos />
          ) : (
            <Todos />
          )}
        </Suspense>
      </Container>
    </LimitContext.Provider>
  );
};

const Container = styled(Column, {
  alignItems: 'center',
  gap: '$2',
});

export default TabsContainer;
