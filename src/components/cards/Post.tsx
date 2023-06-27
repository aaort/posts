import { Box, Error, Loading } from '@/components/common';
import type { Post as PostType, User } from '@/types';
import { fetcher } from '@/utils';
import useSWR from 'swr';

type PostProps = {
  post: PostType;
};

const Post: React.FC<PostProps> = ({ post }) => {
  const endpoint = `${process.env.REACT_APP_API_BASE_URL}users/${post.userId}`;
  const { data, error, isLoading } = useSWR(`api/user/${post.userId}`, () =>
    fetcher(endpoint)
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
