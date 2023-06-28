import { Checkbox } from '@/components';
import Post from '@/components/cards/Post';
import { Error, Row } from '@/components/common';
import Loading from '@/components/common/Loading';
import useUrlWithLimit from '@/hooks/useUrlWithLimit';
import type { Post as PostType } from '@/types';
import { fetcher } from '@/utils';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import List from './List';

type PostsProps = {};

const Posts: React.FC<PostsProps> = () => {
  const url = useUrlWithLimit('posts');
  const { data, error, isLoading, mutate, isValidating } = useSWR(
    '/api/posts',
    () => fetcher(url)
  );
  const [selectedTodoIds, setSelectedTodoIds] = useState<number[]>([]);

  useEffect(() => {
    mutate('/api/posts', true);
  }, [url, mutate]);

  if (error) {
    return <Error />;
  }

  if (isLoading || isValidating) {
    return <Loading />;
  }

  const handlePostSelectToggle = (id: number) => {
    if (selectedTodoIds.includes(id)) {
      setSelectedTodoIds(selectedTodoIds.filter((postId) => id !== postId));
    } else {
      setSelectedTodoIds([...selectedTodoIds, id]);
    }
  };

  return (
    <List>
      {(data as PostType[]).map((post) => (
        <Row
          css={{
            gap: '$2',
            width: '100%',
            justifyContent: 'center',
          }}
        >
          <Post key={post.id} post={post} />
          <Checkbox
            checked={selectedTodoIds.includes(post.id)}
            onChange={() => handlePostSelectToggle(post.id)}
          />
        </Row>
      ))}
    </List>
  );
};

export default Posts;
