import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { styled } from '../theme';
import type { Tab as TabType } from '../types';
import Tab from './Tab';

type TabsProps = {
  selectedTab: TabType;
  setSelectedTab: React.Dispatch<React.SetStateAction<TabType>>;
};

const tabs: TabType[] = ['posts', 'photos', 'tasks'];

const Tabs: React.FC<TabsProps> = (props) => {
  return (
    <Root>
      <List>
        {tabs.map((tab) => (
          <Tab
            title={tab}
            setSelectedTab={props.setSelectedTab}
            selected={props.selectedTab === tab}
          />
        ))}
      </List>
    </Root>
  );
};

const Root = styled(NavigationMenu.Root, {
  display: 'flex',
  justifyContent: 'center',
  width: '20rem',
});

const List = styled(NavigationMenu.List, {
  display: 'flex',
  width: '20rem',
  justifyContent: 'center',
  gap: '$3',
  listStyle: 'none',
  padding: 0,
});

export default Tabs;
