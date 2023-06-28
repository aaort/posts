import { styled } from '@/theme';
import { ButtonType } from '@/types';
import { CSS } from '@stitches/react';
import Button from './Button';
import Column from './Column';
import Row from './Row';

type BoxTypes = {
  title: string;
  subtitle: string;
  content: React.ReactNode;
  actions?: { title: string; onClick?: () => void; type: ButtonType }[];
  css?: CSS;
};

const Box: React.FC<BoxTypes> = (props) => {
  return (
    <Container css={props.css}>
      <Row css={{ gap: '$1' }}>
        <Title>{props.title}</Title> |<Username>{`${props.subtitle}`}</Username>
      </Row>
      {typeof props.content === 'string' ? (
        <p>{props.content}</p>
      ) : (
        props.content
      )}
      <Actions>
        {props.actions?.map((action) => (
          <Button
            handleClick={action.onClick}
            type={action.type}
            title={action.title}
          />
        ))}
      </Actions>
    </Container>
  );
};

const Container = styled(Column, {
  '@xs': {
    minWidth: '30rem',
  },
  '@sm': {
    minWidth: '35rem',
  },
  '@md': {
    minWidth: '40rem',
  },
  '@lg': {
    minWidth: '50rem',
  },
  '@xl': {
    minWidth: '60rem',
  },
  width: '100%',
  maxWidth: '80%',
  padding: '$2',
  alignItems: 'space-between',
  backgroundColor: '$gray3',
  borderRadius: '$medium',
  gap: '$2',
});

const Title = styled('span', {
  fontSize: '$2',
  maxLines: 1,
});

const Username = styled('span', {
  fontSize: 'calc($2 - 0.4rem)',
  color: '$gray7',
});

const Actions = styled(Row, {
  gap: '$2',
  justifyContent: 'flex-end',
  flexWrap: 'wrap',
});

export default Box;
