import { Button, Column, Row } from '@/components/common';
import { styled } from '@/theme';
import type { ButtonType } from '@/types';
import type { CSS } from '@stitches/react';

type BoxTypes = {
  title: string;
  subtitle: string;
  content: React.ReactNode;
  actions?: Action[];
  css?: CSS;
};

type Action = {
  title: string;
  onClick?: () => void;
  type: ButtonType;
  tooltip?: string;
};

const Box: React.FC<BoxTypes> = (props) => {
  return (
    <Container css={props.css}>
      <Row css={{ gap: '$1' }}>
        <Title>{props.title}</Title> |<Subtitle>{`${props.subtitle}`}</Subtitle>
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
            tooltip={action.tooltip}
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

const Subtitle = styled('span', {
  fontSize: 'calc($2 - 0.4rem)',
  color: '$gray7',
});

const Actions = styled(Row, {
  gap: '$2',
  justifyContent: 'flex-end',
  flexWrap: 'wrap',
});

export default Box;
