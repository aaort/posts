import Column from '@/components/common/Column';
import { styled } from '@/theme';

const List = styled(Column, {
  maxWidth: '70%',
  alignItems: 'center',
  gap: 'calc($5 * 2)',
  mx: 'auto',
  mb: '$2',
});

export default List;
