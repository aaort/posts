import { styled } from '@/theme';
import type { Tab as TabType } from '@/types';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import PostLimit from './PostLimit';
import Tab from './Tab';
import Row from './common/Row';

type TabsProps = {
  selectedTab: TabType;
  setSelectedTab: React.Dispatch<React.SetStateAction<TabType>>;
};

const tabs: TabType[] = ['posts', 'photos', 'todos'];

const Tabs: React.FC<TabsProps> = (props) => {
  return (
    <HeaderRow>
      <Root>
        <List>
          {tabs.map((tab) => (
            <Tab
              key={tab}
              title={tab}
              setSelectedTab={props.setSelectedTab}
              selected={props.selectedTab === tab}
            />
          ))}
        </List>
      </Root>
      <PostLimit />
    </HeaderRow>
  );
};

const Root = styled(NavigationMenu.Root, {
  my: '$2',
});

const HeaderRow = styled(Row, {
  width: '100%',
  justifyContent: 'center',
  gap: '$2',
});

const List = styled(NavigationMenu.List, {
  display: 'flex',
  justifyContent: 'center',
  gap: '$4',
  listStyle: 'none',
  padding: 'calc($2 - 0.8rem) $3',
  borderRadius: '50rem',
  backgroundColor: '$gray3',
});

export default Tabs;
