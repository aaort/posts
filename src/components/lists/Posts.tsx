import useSWR from 'swr';
import { styled } from '../../theme';
import type { Post as PostType } from '../../types';
import { fetcher } from '../../utils';
import Post from '../cards/Post';
import { Column } from '../common';

type PostsProps = {};

const endpoint = `${process.env.REACT_APP_API_BASE_URL}posts`;

const Posts: React.FC<PostsProps> = () => {
  const { data, error, isLoading } = useSWR('/api/posts', () =>
    fetcher(endpoint)
  );

  if (isLoading) {
    return <div></div>;
  }

  if (error) {
    return <div></div>;
  }

  return (
    <Container>
      {(data as PostType[]).map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </Container>
  );
};

const Container = styled(Column, {
  gap: '$3',
  paddingInline: '$5',
});

export default Posts;
