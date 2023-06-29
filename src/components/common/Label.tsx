import * as RadixLabel from '@radix-ui/react-label';
import { styled } from '@stitches/react';
import Row from './Row';

type LabelProps = React.PropsWithChildren & {
  name: string;
  text: string;
};

const Label: React.FC<LabelProps> = (props) => (
  <Container>
    <LabelRoot htmlFor={props.name}>{props.text}</LabelRoot>
    {props.children}
  </Container>
);

const LabelRoot = styled(RadixLabel.Root, {
  lineHeight: '35px',
  color: '$primary',
  fontWeight: '$3',
  fontSize: '$2',
});

const Container = styled(Row, {
  padding: '0 20px',
  flexWrap: 'wrap',
  gap: '$1',
});

export default Label;
