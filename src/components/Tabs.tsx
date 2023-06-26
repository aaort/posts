import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { styled } from '../theme';

import Tab from './Tab';

const Tabs = () => {
  return (
    <Root>
      <List>
        <Tab title="Posts" />
        <Tab title="Photos" />
        <Tab title="Tasks" />
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
  gap: '$2',
  listStyle: 'none',
  padding: 0,
});

export default Tabs;
