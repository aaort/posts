import useSWR from 'swr';
import { styled } from '../../theme';
import type { Post as PostType, User } from '../../types';
import { fetcher } from '../../utils';
import Box from '../Box';
import Button from '../Button';
import { Row } from '../common';

type PostProps = {
  post: PostType;
};

const Post: React.FC<PostProps> = ({ post }) => {
  const endpoint = `${process.env.REACT_APP_API_BASE_URL}users/${post.userId}`;
  const { data, error, isLoading } = useSWR(`api/user/${post.userId}`, () =>
    fetcher(endpoint)
  );

  const user: User = data;

  // Handle edge cases when user is falsy value
  if (!user) {
    return null;
  }

  return (
    <Container>
      <Row css={{ gap: '$1' }}>
        <Title>{post.title}</Title> | <Username>{`@${user.username}`}</Username>
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
        <Button handleClick={() => {}} title={'Comment'}></Button>
        <Button handleClick={() => {}} title={'Edit'}></Button>
        <Button handleClick={() => {}} title={'Favorite'}></Button>
        <Button handleClick={() => {}} title={'Delete'}></Button>
      </div>
    </Container>
  );
};

const Container = styled(Box, {
  display: 'flex',
  flexDirection: 'column',
  gap: '$2',
  color: '$background',
  width: '100%',
});

const Title = styled('span', {
  fontSize: '$2',
  maxLines: 1,
});

const Username = styled('span', {
  fontSize: 'calc($2 - 0.4rem)',
  color: '$gray4',
});

export default Post;
