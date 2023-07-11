import Column from '@/components/common/Column';
import { styled } from '@/theme';

const List = styled(Column, {
  gap: 'calc($5 * 2)',
  mx: 'auto',
  mb: '$2',
  '@xs': {
    maxWidth: '100%',
  },
  '@sm': {
    maxWidth: '90%',
  },
  '@md': {
    maxWidth: '80%',
  },
  '@lg': {
    maxWidth: '70%',
  },
});

export default List;
