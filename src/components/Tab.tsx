import { styled } from '@/theme';
import type { Tab as TabType } from '@/types';
import { Item as NavigationItem } from '@radix-ui/react-navigation-menu';
import { Dispatch, SetStateAction } from 'react';

type TabTypes = {
  title: TabType;
  setSelectedTab: Dispatch<SetStateAction<TabType>>;
  selected: boolean;
};

const Tab: React.FC<TabTypes> = (props) => {
  const handleClick = () => props.setSelectedTab(props.title);

  return (
    <Item
      css={{ textDecoration: props.selected ? 'underline' : 'none' }}
      onClick={handleClick}
    >
      {props.title}
    </Item>
  );
};

const Item = styled(NavigationItem, {
  cursor: 'pointer',
  fontSize: '$2',
  textTransform: 'uppercase',
  letterSpacing: '0.2rem',
  textUnderlineOffset: '0.5rem',
});

export default Tab;
