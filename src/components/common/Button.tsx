import { styled } from '@/theme';

type ButtonProps = {
  title: string;
  handleClick: () => void;
  type?: 'dangerous' | 'success';
};

const Button: React.FC<ButtonProps> = (props) => {
  return (
    <Container type={props.type} onClick={props.handleClick}>
      {props.title}
    </Container>
  );
};

const Container = styled('button', {
  backgroundColor: '$background',
  padding: '$1 $2',
  border: 'none',
  fontSize: '$1',
  fontWeight: '$3',
  borderRadius: '$medium',
  color: '$primary',
  variants: {
    type: {
      dangerous: {
        backgroundColor: '$error',
        color: '$background',
      },
      success: {
        backgroundColor: '$success',
        color: '$background',
      },
    },
  },
});

export default Button;
