import { styled } from '@/theme';
import { ButtonType } from '@/types';
import Tooltip from './Tooltip';

type ButtonProps = {
  title: string;
  handleClick?: () => void;
  type?: ButtonType;
  tooltip?: string;
};

// This component is specifically designed to be used as action buttons
// for Post, Album and Todo components
const Button: React.FC<ButtonProps> = (props) => {
  const Content = (
    <Container type={props.type} onClick={props.handleClick}>
      {props.title}
    </Container>
  );

  if (props.tooltip) {
    return <Tooltip text={props.tooltip}>{Content}</Tooltip>;
  }

  return Content;
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
      primary: {
        backgroundColor: '$gray6',
        color: '$background',
      },
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
