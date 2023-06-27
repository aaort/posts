import { styled } from '@/theme';

type ButtonProps = {
  title: string;
  handleClick: () => void;
  type?: ButtonType;
};

type ButtonType = 'comments' | 'edit' | 'favorite' | 'delete';

// This component is specifically designed to be used as action buttons
// for Post, Album and Todo components
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
  cursor: 'pointer',
  transition: 'box-shadow 40ms linear',
  '&:hover': {
    boxShadow: '$medium',
  },
  variants: {
    type: {
      comments: {
        backgroundColor: '$gray6',
        color: '$background',
      },
      edit: {
        backgroundColor: '$gray6',
        color: '$background',
      },
      favorite: {
        backgroundColor: '$success',
        color: '$background',
      },
      delete: {
        backgroundColor: '$error',
        color: '$background',
      },
    },
  },
});

export default Button;
