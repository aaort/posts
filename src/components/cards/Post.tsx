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

  // Handle edge cases when user is falsy value
  if (!user) {
    return null;
  }

  const handleToggleComments = () => {
    setShowComments(!showComments);
  };

  const Content = memo(() => {
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
      return <p>{post.body}</p>;
    }
  });

  return (
    <Box
      title={post.title}
      subtitle={`@${user.username}`}
      content={<Content />}
      actions={{ onComments: handleToggleComments }}
    />
  );
};

export default Post;
