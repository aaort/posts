import Column from '@/components/common/Column';
import { styled } from '@/theme';

const List: React.FC<React.PropsWithChildren & {}> = ({ children }) => {
  return <Container>{children}</Container>;
};

const Container = styled(Column, {
  gap: '$3',
  px: '$5',
  mb: '$2',
});

export default List;
