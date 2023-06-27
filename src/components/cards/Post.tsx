import { Box, Error, Loading } from '@/components/common';
import { useUrlWithLimit } from '@/hooks';
import type { Post as PostType, User } from '@/types';
import { fetcher } from '@/utils';
import useSWR from 'swr';

type PostProps = {
  post: PostType;
};

const Post: React.FC<PostProps> = ({ post }) => {
  const url = useUrlWithLimit(`users/${post.userId}`);
  const { data, error, isLoading } = useSWR(`api/user/${post.userId}`, () =>
    fetcher(url)
  );

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

  return (
    <Box
      title={post.title}
      subtitle={`@${user.username}`}
      content={post.body}
    />
  );
};

export default Post;
