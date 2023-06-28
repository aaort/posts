import { styled } from '@/theme';
import type { ButtonType } from '@/types';
import type { CSS } from '@stitches/react';
import { useState } from 'react';
import Input from '../Input';
import Button from './Button';
import Column from './Column';
import Row from './Row';

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

  const handleDataChange = (event: React.FormEvent<HTMLInputElement>) => {
    setData({ ...data, [event.currentTarget.name]: event.currentTarget.value });
  };

  const handleDiscard = () => {
    setData(getDataFromProps(props));
    toggleEditing(false);
  };

  const content =
    typeof data.content === 'string' && isEditing ? (
      <Input value={data.content} name="content" onChange={handleDataChange} />
    ) : typeof data.content === 'string' && !isEditing ? (
      <p>{data.content}</p>
    ) : (
      data.content
    );

  return (
    <Container css={props.css}>
      <Row css={{ gap: '$1' }}>
        {isEditing ? (
          <Input value={data.title} name="title" onChange={handleDataChange} />
        ) : (
          <Title>{data.title}</Title>
        )}
        |
        {isEditing ? (
          <Input
            value={data.subtitle}
            name="subtitle"
            onChange={handleDataChange}
          />
        ) : (
          <Subtitle>{`${data.subtitle}`}</Subtitle>
        )}
      </Row>
      {content}
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
  boxShadow: '$medium',
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
