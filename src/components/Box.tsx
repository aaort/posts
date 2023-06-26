import { styled } from '../theme';

type BoxTypes = React.PropsWithChildren & {};

const Box: React.FC<BoxTypes> = ({ children }) => {
  return <Container>{children}</Container>;
};

const Container = styled('div', {
  padding: '$2',
  backgroundColor: '$card',
});

export default Box;
