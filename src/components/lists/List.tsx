import Column from '@/components/common/Column';
import { styled } from '@/theme';

const List: React.FC<React.PropsWithChildren & {}> = ({ children }) => {
  return <Container>{children}</Container>;
};

const Container = styled(Column, {
  maxWidth: '70%',
  gap: '$3',
  mx: 'auto',
  mb: '$2',
});

export default List;
