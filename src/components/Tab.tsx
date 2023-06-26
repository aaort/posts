import { Item as NavigationItem } from '@radix-ui/react-navigation-menu';
import { styled } from '../theme';

type TabTypes = {
  title: string;
};

const Tab: React.FC<TabTypes> = (props) => {
  const handleClick = () => {};

  return <Item onClick={handleClick}>{props.title}</Item>;
};

const Item = styled(NavigationItem, {
  cursor: 'pointer',
  fontSize: '$2',
});

export default Tab;
