import { styled } from '@/theme';
import Button from './Button';
import Row from './Row';

type BoxTypes = {
  title: string;
  subtitle: string;
  content: string;
  actions?: {
    onComments: () => void;
    onEdit: () => void;
    onFavorite: () => void;
    onDelete: () => void;
  };
};

const Box: React.FC<BoxTypes> = (props) => {
  return (
    <Container>
      <Row css={{ gap: '$1' }}>
        <Title>{props.title}</Title> |{' '}
        <Username>{`@${props.subtitle}`}</Username>
      </Row>
      <p>{props.content}</p>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          justifyContent: 'flex-end',
        }}
      >
        <Button handleClick={() => {}} title={'Comments'}></Button>
        <Button handleClick={() => {}} title={'Edit'}></Button>
        <Button
          handleClick={() => {}}
          type="success"
          title={'Favorite'}
        ></Button>
        <Button
          handleClick={() => {}}
          type="dangerous"
          title={'Delete'}
        ></Button>
      </div>
    </Container>
  );
};

const Container = styled('div', {
  padding: '$2',
  backgroundColor: '$card',
  borderRadius: '$medium',
  color: '$background',
});

const Title = styled('span', {
  fontSize: '$2',
  maxLines: 1,
});

const Username = styled('span', {
  fontSize: 'calc($2 - 0.4rem)',
  color: '$gray4',
});

export default Box;
