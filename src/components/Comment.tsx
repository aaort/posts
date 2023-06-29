import { styled } from '@/theme';
import { Comment as CommentType } from '@/types';
import { Column, Row } from './common';

type CommentProps = {
  comment: CommentType;
};

const Comment: React.FC<CommentProps> = ({ comment }) => {
  return (
    <Container>
      <Row css={{ gap: '$1', '& span:nth-child(2)': { color: '$gray7' } }}>
        <b>
          <Title>{comment.name}</Title>
        </b>
        <Username>{comment.email}</Username>
      </Row>
      <Content>{comment.body}</Content>
    </Container>
  );
};

const Container = styled(Column, {
  gap: '$1',
});

const Title = styled('span', {
  fontSize: 'calc($2 - 0.1rem)',
});

const Content = styled('p', {
  fontSize: 'calc($1 + 0.2rem)',
});

const Username = styled('span', {
  fontSize: 'calc($2 - 0.5rem)',
});

export default Comment;
