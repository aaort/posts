import { styled } from '@/theme';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {};

const Input: React.FC<InputProps> = (props) => {
  return <Container {...props} />;
};

const Container = styled('input', {
  padding: '$1 1rem',
  backgroundColor: '$background',
  borderRadius: '$small',
  border: '1px solid $primary',
  fontSize: 'inherit',
  outline: 'none',
});

export default Input;
