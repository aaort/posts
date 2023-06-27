import Tabs from '@/components/Tabs';
import { styled } from '@/theme';
import { Tab } from '@/types';
import { Suspense, lazy, useState } from 'react';
import { Column } from './common';
import Loading from './common/Loading';

const Posts = lazy(() => import('./lists/Posts'));
const Photos = lazy(() => import('./lists/Photos'));
const Todos = lazy(() => import('./lists/Todos'));

const TabsContainer: React.FC<{}> = () => {
  const [selectedTab, setSelectedTab] = useState<Tab>('posts');

  return (
    <Column>
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
    </Column>
  );
};

export default TabsContainer;
