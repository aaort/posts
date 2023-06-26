import { styled } from '../../theme';
import type { Post as PostType } from '../../types';
import Box from '../Box';
import { Column, Row } from '../common';

type PostProps = {
  post: PostType;
};

const Post: React.FC<PostProps> = ({ post }) => {
  return (
    <Box>
      <Container>
        <Row>
          <span> Lorem, ipsum dolor.</span> | <span>@aaort</span>
        </Row>
        <div>
          <p>{post.body}</p>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            justifyContent: 'flex-end',
          }}
        >
          <span>Comment</span>
          <span>Edit</span>
          <span>Favorite</span>
          <span>Delete</span>
        </div>
      </Container>
    </Box>
  );
};

const Container = styled(Column, {
  gap: '$2',
});

export default Post;
