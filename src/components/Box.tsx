import { styled } from '../theme';

type BoxTypes = React.PropsWithChildren & {};

const Box: React.FC<BoxTypes> = ({ children }) => {
  return <Container>{children}</Container>;
};

const Container = styled('div', {
  display: 'flex',
  padding: '$1',
  backgroundColor: '$card',
});

export default Box;
