import { useState } from 'react';
import Button from './Button';
import Column from './Column';
import Row from './Row';
import { styled } from '@/theme';
import type { ButtonType } from '@/types';
import type { CSS } from '@stitches/react';

type BoxProps = {
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

type Data = Pick<BoxProps, 'title' | 'subtitle' | 'content'>;

const Box: React.FC<BoxProps> = (props) => {
  const [data, setData] = useState<Data>(getDataFromProps(props));
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const toggleEditing = (value?: boolean) => setIsEditing(value ?? !isEditing);

  const handleSave = () => {
    toggleEditing(false);
  };

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    setData({ ...data, [event.currentTarget.name]: event.currentTarget.value });
  };

  const handleDiscard = () => {
    setData(getDataFromProps(props));
    toggleEditing(false);
  };

  return (
    <Container css={props.css}>
      <Row css={{ gap: '$1' }}>
        {isEditing ? (
          <input value={data.title} name="title" onChange={handleChange} />
        ) : (
          <Title>{data.title}</Title>
        )}
        |
        {isEditing ? (
          <input
            value={data.subtitle}
            name="subtitle"
            onChange={handleChange}
          />
        ) : (
          <Subtitle>{`${data.subtitle}`}</Subtitle>
        )}
      </Row>
      {typeof props.content === 'string' ? (
        <p>{props.content}</p>
      ) : (
        props.content
      )}
      <Actions>
        {props.actions?.map((action, i) => (
          <Button
            key={i}
            handleClick={action.onClick}
            type={action.type}
            title={action.title}
            tooltip={action.tooltip}
          />
        ))}
        {!isEditing ? (
          <Button handleClick={toggleEditing} type={'primary'} title={'Edit'} />
        ) : (
          <>
            <Button
              handleClick={handleDiscard}
              type={'dangerous'}
              title={'Discard'}
            />
            <Button handleClick={handleSave} type={'success'} title={'Save'} />
          </>
        )}
      </Actions>
    </Container>
  );
};

const getDataFromProps = (props: BoxProps): Data => ({
  title: props.title,
  subtitle: props.subtitle,
  content: props.content,
});

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
