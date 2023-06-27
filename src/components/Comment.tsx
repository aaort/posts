import { styled } from '@/theme';
import { Column, Row } from './common';
import { Comment as CommentType } from '@/types';

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
        {'|'}
        <span>{comment.email}</span>
      </Row>
      <p>{comment.body}</p>
    </Container>
  );
};

const Container = styled(Column, {
  gap: '$1',
});

const Title = styled('span', {
  fontSize: 'calc($2 - 0.2rem)',
});

export default Comment;
