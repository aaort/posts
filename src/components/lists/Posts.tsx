import Post from '@/components/cards/Post';
import { Error } from '@/components/common';
import Loading from '@/components/common/Loading';
import useUrlWithLimit from '@/hooks/useUrlWithLimit';
import type { Post as PostType } from '@/types';
import { fetcher } from '@/utils';
import { useEffect } from 'react';
import useSWR from 'swr';
import List from './List';

type PostsProps = {};

const Posts: React.FC<PostsProps> = () => {
  const url = useUrlWithLimit('posts');
  const { data, error, isLoading, mutate, isValidating } = useSWR(
    '/api/posts',
    () => fetcher(url)
  );

  useEffect(() => {
    mutate('/api/posts', true);
  }, [url, mutate]);

  if (error) {
    return <Error />;
  }

  if (isLoading || isValidating) {
    return <Loading />;
  }

  return (
    <List>
      {(data as PostType[]).map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </List>
  );
};

export default Posts;
