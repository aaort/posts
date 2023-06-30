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

const tabs: TabType[] = ['posts', 'albums', 'todos'];

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
  justifyContent: 'center',
  gap: '$5',
});

const List = styled(NavigationMenu.List, {
  flexDirection: 'row',
  borderRadius: '50rem',
  display: 'flex',
  p: 0,
  gap: 0,
  justifyContent: 'space-evenly',
  listStyle: 'none',
  backgroundColor: '$gray3',
  boxShadow: '$small',
});

export default Tabs;
