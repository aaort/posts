import { Checkbox } from '@/components';
import Post from '@/components/cards/Post';
import { Dialog, Error, IconButton, Row } from '@/components/common';
import Loading from '@/components/common/Loading';
import { useStorageChangeEvent, useUrl } from '@/hooks';
import { keyframes, styled } from '@/theme';
import type { Post as PostType } from '@/types';
import {
  fetcher,
  getDeletedPosts,
  toggleDeletedPosts,
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

  // Used to changes to take place on storage update (favorite, delete, exc...)
  const [, setFlag] = useState<boolean>(false);

  useStorageChangeEvent({ callback: () => setFlag((flag) => !flag) });

  useEffect(() => {
    mutate();
  }, [url, mutate]);

  if (error) {
    return <Error />;
  }

  if (isLoading || isValidating) {
    return <Loading />;
  }

  const posts = getFilteredPosts(data);

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
        {posts &&
          posts.map((post, i) => {
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

const floatingButtonsAnim = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
});

const FloatingButtons = styled(Row, {
  position: 'fixed',
  bottom: 20,
  right: 20,
  gap: '$2',
  animation: `${floatingButtonsAnim} 150ms linear`,
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
