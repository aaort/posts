import useSWR from 'swr';
import { styled } from '../../theme';
import type { Post as PostType } from '../../types';
import Post from '../cards/Post';
import { Column } from '../common';

type PostsProps = {};

const fetcher = async () => {
  const response = await fetch(
    'https://jsonplaceholder.typicode.com/users/1/posts'
  );

  return await response.json();
};

const Posts: React.FC<PostsProps> = () => {
  const { data, error, isLoading } = useSWR('/api/posts', fetcher);

  if (isLoading) {
    return <div></div>;
  }

  if (error) {
    return <div></div>;
  }

  return (
    <Container>
      {(data as PostType[]).map((post) => (
        <Post post={post} />
      ))}
    </Container>
  );
};

const Container = styled(Column, {
  gap: '$3',
  paddingInline: '$5',
});

export default Posts;
