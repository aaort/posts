import {
  Box,
  Button,
  Column,
  Dialog,
  Error,
  IconButton,
  Loading,
  Row,
} from '@/components/common';
import { useUrl } from '@/hooks';
import { styled, theme } from '@/theme';
import type { Post as PostType, User } from '@/types';
import {
  toggleDeletedPosts,
  fetcher,
  isFavoritePost,
  toggleFavoritePosts,
} from '@/utils';
import { HeartFilledIcon, HeartIcon, TrashIcon } from '@radix-ui/react-icons';
import { Suspense, lazy, useEffect, useState } from 'react';
import useSWR from 'swr';
import Input from '../Input';
import { Actions, Subtitle, Title } from './common';

const Comments = lazy(() => import('@/components/Comments'));

type PostProps = {
  post: PostType;
};

type Data = {
  title: string;
  subtitle: string;
  content: string;
};

const Post: React.FC<PostProps> = (props) => {
  const url = useUrl(`users/${props.post.userId}`);
  const { data, error, isLoading } = useSWR(`api/${props.post.userId}`, () =>
    fetcher(url)
  );
  // Post owner data
  const owner: User = data;

  const [showComments, setShowComments] = useState<boolean>(false);
  // Whether post is in editing mode or not
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    if (owner) {
      setPostData({
        title: props.post.title,
        content: props.post.body,
        subtitle: owner.username,
      });
    }
  }, [owner, props.post]);

  const [postData, setPostData] = useState<Data>();

  if (error) {
    return <Error />;
  }

  if (isLoading || !postData) {
    return <Loading />;
  }

  const toggleEditing = (value?: boolean) => setIsEditing(value ?? !isEditing);

  const handleSave = () => {
    toggleEditing(false);
  };

  const post = postData as Data;

  const handleDataChange = (event: React.FormEvent<HTMLInputElement>) => {
    setPostData({
      ...post,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleDiscard = () => {
    setPostData({
      title: props.post.title,
      content: props.post.body,
      subtitle: owner.username,
    });
    toggleEditing(false);
  };

  const handleToggleComments = () => {
    setShowComments(!showComments);
  };

  return (
    <Box>
      <Row
        css={{
          justifyContent: 'space-between',
        }}
      >
        <Row css={{ gap: '$1' }}>
          {isEditing ? (
            <Input
              value={post.title}
              name="title"
              onChange={handleDataChange}
            />
          ) : (
            <Title>{post.title + ' ' + props.post.id}</Title>
          )}
          {isEditing ? (
            <Input
              value={post.subtitle}
              name="subtitle"
              onChange={handleDataChange}
            />
          ) : (
            <Subtitle>{`@${post.subtitle}`}</Subtitle>
          )}
        </Row>
        <Row css={{ gap: '$1' }}>
          <Favorite postId={props.post.id} />
          <Delete postId={props.post.id} />
        </Row>
      </Row>
      {showComments ? (
        <Column>
          <p>{post.content}</p>
          <Suspense fallback={<Loading />}>
            <Comments postId={props.post.id} />
          </Suspense>
        </Column>
      ) : isEditing ? (
        <Input
          value={post.content}
          onChange={handleDataChange}
          name="content"
        />
      ) : (
        <p> {post.content} </p>
      )}
      <Actions>
        {!isEditing ? (
          <>
            <Button
              onClick={handleToggleComments}
              type={'primary'}
              title={!showComments ? 'Show Comments' : 'Hide Comments'}
            />
            <Button onClick={toggleEditing} type={'primary'} title={'Edit'} />
          </>
        ) : (
          <>
            <Button
              onClick={handleDiscard}
              type={'dangerous'}
              title={'Discard'}
            />
            <Button onClick={handleSave} type={'success'} title={'Save'} />
          </>
        )}
      </Actions>
    </Box>
  );
};

type IconActionButtonProps = {
  postId: number;
};

const Delete: React.FC<IconActionButtonProps> = ({ postId }) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const url = useUrl(`posts/${postId}`, false);

  const handleOpenDialog = () => setIsDialogOpen(true);
  const handleClose = () => setIsDialogOpen(false);
  const handleDelete = async () => {
    await fetch(url, { method: 'DELETE' });

    toggleDeletedPosts([postId]);

    handleClose();
  };

  return (
    <>
      <IconButtonBox onClick={handleOpenDialog} aria-label="delete-icon-button">
        <TrashIcon />
      </IconButtonBox>
      <Dialog
        isOpen={isDialogOpen}
        title="Confirm Operation"
        description="Are you sure you want to proceed this operation ?"
        onClose={handleClose}
        onOk={handleDelete}
      />
    </>
  );
};

const Favorite: React.FC<IconActionButtonProps> = ({ postId }) => {
  const handleClick = () => {
    toggleFavoritePosts([postId]);
  };

  const icon = !isFavoritePost(postId) ? (
    <HeartIcon width={'90%'} height={'90%'} />
  ) : (
    <HeartFilledIcon
      width={'90%'}
      height={'90%'}
      color={theme.colors.error.value}
    />
  );

  return (
    <IconButtonBox aria-label="favorite-icon-button" onClick={handleClick}>
      {icon}
    </IconButtonBox>
  );
};

export const IconButtonBox = styled(IconButton, {
  p: '$1',
  '&[aria-label="delete-icon-button"]:hover': {
    backgroundColor: '$error',
    color: '$background',
  },
  '&[aria-label="favorite-icon-button"]:hover': {
    backgroundColor: '$gray6',
    color: '$background',
  },
  '& svg': {
    width: '90%',
    height: '90%',
  },
});

export default Post;
