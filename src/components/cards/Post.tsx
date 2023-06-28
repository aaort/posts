import { Box, Button, Column, Error, Loading, Row } from '@/components/common';
import { useUrlWithLimit } from '@/hooks';
import type { Post as PostType, User } from '@/types';
import { fetcher } from '@/utils';
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
  const url = useUrlWithLimit(`users/${props.post.userId}`);
  const { data, error, isLoading } = useSWR(`api//${props.post.userId}`, () =>
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
      <Row css={{ gap: '$1' }}>
        {isEditing ? (
          <Input value={post.title} name="title" onChange={handleDataChange} />
        ) : (
          <Title>{post.title}</Title>
        )}
        |
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
        <Button
          onClick={handleToggleComments}
          type={'primary'}
          title={!showComments ? 'Show Comments' : 'Hide Comments'}
        />
        {!isEditing ? (
          <Button onClick={toggleEditing} type={'primary'} title={'Edit'} />
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

export default Post;
