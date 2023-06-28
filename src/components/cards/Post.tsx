import { Box, Column, Error, Loading } from '@/components/common';
import { useUrlWithLimit } from '@/hooks';
import type { Post as PostType, User } from '@/types';
import { fetcher } from '@/utils';
import { Suspense, lazy, memo, useState } from 'react';
import useSWR from 'swr';

const Comments = lazy(() => import('@/components/Comments'));

type PostProps = {
  post: PostType;
};

const Post: React.FC<PostProps> = ({ post }) => {
  const url = useUrlWithLimit(`users/${post.userId}`);
  const { data, error, isLoading } = useSWR(`api/user/${post.userId}`, () =>
    fetcher(url)
  );
  const [showComments, setShowComments] = useState<boolean>(false);

  if (error) {
    return <Error />;
  }

  if (isLoading) {
    return <Loading />;
  }

  const user: User = data;

  const handleToggleComments = () => {
    setShowComments(!showComments);
  };

  const content = () => {
    if (showComments) {
      return (
        <Column>
          <p>{post.body}</p>
          <Suspense fallback={<Loading />}>
            <Comments postId={post.id} />
          </Suspense>
        </Column>
      );
    } else {
      return post.body;
    }
  };

  return (
    <Box
      title={post.title}
      subtitle={`@${user.username}`}
      content={content()}
      actions={[
        {
          title: 'Comments',
          type: 'primary',
          onClick: handleToggleComments,
          tooltip: showComments ? 'Hide Comments' : 'Show Comments',
        },
      ]}
    />
  );
};

export default Post;
