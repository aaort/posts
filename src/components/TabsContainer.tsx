import { Suspense, lazy, useState } from 'react';
import { styled } from '../theme';
import { Tab } from '../types';
import Tabs from './Tabs';
import { Column } from './common';

const Posts = lazy(() => import('./lists/Posts'));
const Photos = lazy(() => import('./lists/Photos'));
const Tasks = lazy(() => import('./lists/Tasks'));

const TabsContainer: React.FC<{}> = () => {
  const [selectedTab, setSelectedTab] = useState<Tab>('posts');

  return (
    <Container>
      <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <Suspense fallback={'Loading'}>
        {selectedTab === 'posts' ? (
          <Posts />
        ) : selectedTab === 'photos' ? (
          <Photos />
        ) : (
          <Tasks />
        )}
      </Suspense>
    </Container>
  );
};

const Container = styled(Column, {
  alignItems: 'center',
  gap: '$2',
});

export default TabsContainer;
