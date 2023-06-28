import { Checkbox } from '@/components';
import Post from '@/components/cards/Post';
import { Dialog, Error, IconButton, Row } from '@/components/common';
import Loading from '@/components/common/Loading';
import { useUrl } from '@/hooks';
import { styled } from '@/theme';
import type { Post as PostType } from '@/types';
import {
  toggleDeletedPosts,
  fetcher,
  getDeletedPosts,
  toggleFavoritePosts,
} from '@/utils';
import { HeartIcon, TrashIcon } from '@radix-ui/react-icons';
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

  const handleDeleteClick = () => {
    toggleDeletedPosts(selectedTodoIds);
    setSelectedTodoIds([]);
  };

  return (
    <>
      <List>
        {posts.map((post, i) => {
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
        <FloatingButtons>
          <FavoriteButton onClick={handleFavoriteClick} />
          <DeleteButton onClick={handleDeleteClick} />
        </FloatingButtons>
      )}
    </>
  );
};

const getFilteredPosts = (posts: PostType[]) => {
  const deletedPosts = getDeletedPosts();

  return posts.filter((post) => !deletedPosts.includes(post.id));
};

type FloatingButtonProps = { onClick: () => void };

const FavoriteButton: React.FC<FloatingButtonProps> = ({ onClick }) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const toggleDialog = (value?: boolean) =>
    setIsDialogOpen(value ?? !isDialogOpen);

  return (
    <>
      <FloatingButton
        onClick={() => toggleDialog(true)}
        aria-label="favorite-icon-button"
      >
        <HeartIcon />
      </FloatingButton>
      <Dialog
        title="Confirm"
        description="Are you sure you want to add those post to your favorites ?"
        isOpen={isDialogOpen}
        onClose={() => toggleDialog(false)}
        onOk={onClick}
      />
    </>
  );
};

const DeleteButton: React.FC<FloatingButtonProps> = ({ onClick }) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const toggleDialog = (value?: boolean) =>
    setIsDialogOpen(value ?? !isDialogOpen);

  return (
    <>
      <FloatingButton
        onClick={() => toggleDialog(true)}
        aria-label="delete-icon-button"
      >
        <TrashIcon />
      </FloatingButton>
      <Dialog
        title="Confirm"
        description="Are you sure you want to delete those post ?"
        isOpen={isDialogOpen}
        onClose={() => toggleDialog(false)}
        onOk={onClick}
      />
    </>
  );
};

const FloatingButtons = styled(Row, {
  position: 'fixed',
  bottom: 20,
  right: 20,
  gap: '$2',
});

const FloatingButton = styled(IconButton, {
  width: '4rem',
  height: '4rem',
  backgroundColor: '$gray3',
  '& svg': {
    width: '50%',
    height: '50%',
  },
  '&[aria-label="delete-icon-button"]': {
    backgroundColor: '$error',
    color: '$background',
  },
  '&[aria-label="favorite-icon-button"]:hover': {
    backgroundColor: '$gray6',
    color: '$background',
  },
});

const PostRow = styled(Row, {
  gap: '$2',
  width: '100%',
  justifyContent: 'center',
});

export default Posts;
