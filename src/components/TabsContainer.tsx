import { useState } from 'react';
import { styled } from '../theme';
import { Tab } from '../types';
import Tabs from './Tabs';
import { Column } from './common';
import Posts from './lists/Posts';

const TabsContainer: React.FC<{}> = () => {
  const [selectedTab, setSelectedTab] = useState<Tab>('posts');

  return (
    <Container>
      <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <Posts />
    </Container>
  );
};

const Container = styled(Column, {
  alignItems: 'center',
  gap: '$2',
});

export default TabsContainer;
