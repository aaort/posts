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
      css={{
        backgroundColor: props.selected ? '$gray7' : 'none',
        color: props.selected ? '$background' : 'initial',
      }}
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
  px: '$2',
  py: '1rem',
  transition: 'background-color 150ms linear',
  '&:hover': {
    backgroundColor: '$gray7',
    color: '$background',
  },
  '@md': {
    '&:nth-child(1)': {
      borderTopLeftRadius: 'inherit',
      borderBottomLeftRadius: 'inherit',
    },
    '&:nth-child(2)': {
      borderInline: '1px solid $primary',
    },
    '&:nth-child(3)': {
      borderTopRightRadius: 'inherit',
      borderBottomRightRadius: 'inherit',
    },
  },
  '@sm': {
    borderRadius: '$small',
    border: 'none',
  },
});

export default Tab;
