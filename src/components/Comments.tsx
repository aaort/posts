import { Column, Error, Loading } from '@/components/common';
import { useUrlWithLimit } from '@/hooks';
import { styled } from '@/theme';
import type { Comment as CommentType, Post } from '@/types';
import { fetcher } from '@/utils';
import useSWR from 'swr';
import Comment from './Comment';

type CommentsProps = {
  postId: Post['id'];
};

const Comments: React.FC<CommentsProps> = ({ postId }) => {
  const url = useUrlWithLimit(`posts/${postId}/comments`);
  const { data, error, isLoading } = useSWR(url, () => fetcher(url));

  if (error) {
    return <Error />;
  }

  if (isLoading) {
    return <Loading />;
  }

  const comments = data as CommentType[];

  return (
    <Container>
      {comments.map((comment, i) => (
        <Comment comment={comment} />
      ))}
    </Container>
  );
};

const Container = styled(Column, {
  gap: '$2',
  padding: '$2',
  borderRadius: '$small',
  backgroundColor: '$gray1',
});

export default Comments;
