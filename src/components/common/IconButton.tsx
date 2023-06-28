import { styled } from '@/theme';

const IconButton = styled('button', {
  all: 'unset',
  fontFamily: 'inherit',
  borderRadius: '100%',
  height: 30,
  width: 30,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '$primary',
  position: 'absolute',
  top: 10,
  right: 10,
  cursor: 'pointer',

  '&:hover': { backgroundColor: '$gray3' },
});

export default IconButton;
