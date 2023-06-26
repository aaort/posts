import { styled } from '../../theme';
import type { Post as PostType } from '../../types';
import { fetcher } from '../../utils';
import Box from '../Box';
import { Row } from '../common';
import useSWR from 'swr';
import type { User } from '../../types';

type PostProps = {
  post: PostType;
};

const Post: React.FC<PostProps> = ({ post }) => {
  const endpoint = `${process.env.REACT_APP_API_BASE_URL}users/${post.userId}`;
  const { data, error, isLoading } = useSWR('api/user', () =>
    fetcher(endpoint)
  );

  const user: User = data;

  return (
    <Container>
      <Row>
        <Title> Lorem, ipsum dolor.</Title> | <span>{user.name}</span>
      </Row>
      <p>{post.body}</p>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          justifyContent: 'flex-end',
        }}
      >
        <span>Comment</span>
        <span>Edit</span>
        <span>Favorite</span>
        <span>Delete</span>
      </div>
    </Container>
  );
};

const Container = styled(Box, {
  display: 'flex',
  flexDirection: 'column',
  gap: '$2',
  color: '$background',
});

const Title = styled('span', {
  fontSize: '$2',
});

export default Post;
