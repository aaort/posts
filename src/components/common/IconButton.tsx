import { styled } from '@/theme';

const IconButton = styled('button', {
  all: 'unset',
  fontFamily: 'inherit',
  borderRadius: '$small',
  height: 30,
  width: 30,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '$primary',
  cursor: 'pointer',

  '&:hover': { backgroundColor: '$gray3' },
});

export default IconButton;
