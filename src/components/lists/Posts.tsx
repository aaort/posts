import { Checkbox } from '@/components';
import Post from '@/components/cards/Post';
import { Error, Row } from '@/components/common';
import Loading from '@/components/common/Loading';
import useUrlWithLimit from '@/hooks/useUrlWithLimit';
import { styled } from '@/theme';
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
      {(data as PostType[]).map((post) => {
        const isSelected = selectedTodoIds.includes(post.id);
        return (
          <PostRow>
            <Post key={post.id} post={post} />
            <Checkbox
              checked={isSelected}
              onChange={() => handlePostSelectToggle(post.id)}
              tooltip={!isSelected ? 'Select' : 'Unselect'}
            />
          </PostRow>
        );
      })}
    </List>
  );
};

const PostRow = styled(Row, {
  gap: '$2',
  width: '100%',
  justifyContent: 'center',
});

export default Posts;
