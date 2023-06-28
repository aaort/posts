import { Checkbox } from '@/components';
import Post from '@/components/cards/Post';
import { Error, IconButton, Row } from '@/components/common';
import Loading from '@/components/common/Loading';
import { useUrl } from '@/hooks';
import { styled } from '@/theme';
import type { Post as PostType } from '@/types';
import { fetcher, getDeletedPosts, toggleFavoritePosts } from '@/utils';
import { HeartIcon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import List from './List';

type PostsProps = {};

const Posts: React.FC<PostsProps> = () => {
  const url = useUrl('posts');
  const { data, error, isLoading, mutate, isValidating } = useSWR(
    '/api/posts',
    () => fetcher(url)
  );
  const [selectedTodoIds, setSelectedTodoIds] = useState<number[]>([]);
  const [posts, setPosts] = useState<PostType[]>([]);

  useEffect(() => {
    const handleStorageEvent = () => {
      if (data) {
        setPosts(getFilteredPosts(data));
      }
    };

    window.addEventListener('storage', handleStorageEvent);

    return () => {
      window.removeEventListener('storage', handleStorageEvent);
    };
  }, [data]);

  useEffect(() => {
    mutate('/api/posts', true);
  }, [url, mutate]);

  if (error) {
    return <Error />;
  }

  if (isLoading || isValidating) {
    return <Loading />;
  }

  if (!posts.length) {
    setPosts(getFilteredPosts(data));
  }

  const handlePostSelectToggle = (id: number) => {
    if (selectedTodoIds.includes(id)) {
      setSelectedTodoIds(selectedTodoIds.filter((postId) => id !== postId));
    } else {
      setSelectedTodoIds([...selectedTodoIds, id]);
    }
  };

  const handleFavoriteClick = () => {
    toggleFavoritePosts(selectedTodoIds);
    setSelectedTodoIds([]);
  };

  return (
    <>
      <List>
        {(posts as PostType[]).map((post, i) => {
          const isSelected = selectedTodoIds.includes(post.id);
          return (
            <PostRow key={i}>
              <Post post={post} />
              <Checkbox
                checked={isSelected}
                onChange={() => handlePostSelectToggle(post.id)}
                tooltip={!isSelected ? 'Select' : 'Unselect'}
                size="medium"
              />
            </PostRow>
          );
        })}
      </List>
      {selectedTodoIds.length && (
        <FloatingButton onClick={handleFavoriteClick}>
          <HeartIcon />
        </FloatingButton>
      )}
    </>
  );
};

const getFilteredPosts = (posts: PostType[]) => {
  const deletedPosts = getDeletedPosts();

  const filtered = posts.filter((post) => !deletedPosts.includes(post.id));
  return filtered;
};

const FloatingButton = styled(IconButton, {
  position: 'fixed',
  bottom: 20,
  right: 20,
  width: '4rem',
  height: '4rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '$gray3',
  '& svg': {
    width: '50%',
    height: '50%',
  },
});

const PostRow = styled(Row, {
  gap: '$2',
  width: '100%',
  justifyContent: 'center',
});

export default Posts;
