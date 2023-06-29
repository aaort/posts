import { styled } from '@/theme';
import {
  Link as RouterLink,
  LinkProps as ReactLinkProps,
} from 'react-router-dom';

type LinkProps = ReactLinkProps & {};

const Link: React.FC<LinkProps> = (props) => {
  return <Container {...props} />;
};

const Container = styled(RouterLink, {
  color: '$primary',
  textUnderlineOffset: '0.4rem',
  '&:hover': {
    color: '$gray6',
  },
});

export default Link;
