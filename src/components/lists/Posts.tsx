import Post from '@/components/cards/Post';
import { Error } from '@/components/common';
import Loading from '@/components/common/Loading';
import LimitContext from '@/context/LImit';
import type { Post as PostType } from '@/types';
import { fetcher, getUrlFromEndpoint } from '@/utils';
import { useContext, useEffect } from 'react';
import useSWR from 'swr';
import List from './List';

type PostsProps = {};

const Posts: React.FC<PostsProps> = () => {
  const url = getUrlFromEndpoint('posts');
  const { data, error, isLoading, mutate } = useSWR('/api/posts', () =>
    fetcher(url)
  );
  const [limit] = useContext(LimitContext)!;

  useEffect(() => {
    if (limit) {
      mutate();
    }
  }, [limit, mutate]);

  if (error) {
    return <Error />;
  }

  if (isLoading) {
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
