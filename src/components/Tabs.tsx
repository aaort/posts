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
  '@sm': {
    flexDirection: 'column',
    borderRadius: '$medium',
    gap: '$2',
    alignItems: 'center',
  },
  '@md': {
    flexDirection: 'row',
    borderRadius: '50rem',
    gap: '$3',
  },
  display: 'flex',
  justifyContent: 'center',
  listStyle: 'none',
  px: '$2',
  py: '1rem',
  backgroundColor: '$gray3',
  boxShadow: '$medium',
});

export default Tabs;
