import Post from '@/components/cards/Post';
import { Column, Error } from '@/components/common';
import Loading from '@/components/common/Loading';
import { styled } from '@/theme';
import type { Post as PostType } from '@/types';
import { fetcher, getUrlFromEndpoint } from '@/utils';
import useSWR from 'swr';

type PostsProps = {};

const Posts: React.FC<PostsProps> = () => {
  const limit = sessionStorage.getItem('limit');
  const url = getUrlFromEndpoint('posts', limit);
  const { data, error, isLoading } = useSWR('/api/posts', () => fetcher(url));

  if (error) {
    return <Error />;
  }

  if (isLoading) {
    return <Loading />;
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
