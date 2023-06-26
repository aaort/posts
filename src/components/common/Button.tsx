import { styled } from '../../theme';

type ButtonProps = {
  title: string;
  handleClick: () => void;
};

const Button: React.FC<ButtonProps> = (props) => {
  return <Container onClick={props.handleClick}>{props.title}</Container>;
};

const Container = styled('button', {
  backgroundColor: '$background',
  padding: '$1 $2',
  border: 'none',
  fontSize: '$1',
  borderRadius: '$medium',
});

export default Button;
