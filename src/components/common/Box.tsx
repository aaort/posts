import { styled } from '@/theme';
import type { CSS } from '@stitches/react';
import Column from './Column';

type BoxProps = React.PropsWithChildren & {
  css?: CSS;
};

const Box: React.FC<BoxProps> = (props) => {
  return <Container css={props.css}>{props.children}</Container>;
};

const Container = styled(Column, {
  width: '100%',
  maxWidth: '80%',
  p: '$3',
  alignItems: 'space-between',
  backgroundColor: '$gray3',
  borderRadius: '$medium',
  gap: '$3',
  boxShadow: '$small',
});

export default Box;
