import { Box, Error, Loading } from '@/components/common';
import { styled } from '@/theme';
import type { Album as AlbumType, User } from '@/types';
import { fetcher } from '@/utils';
import useSWR from 'swr';

type AlbumProps = {
  album: AlbumType;
};

const Album: React.FC<AlbumProps> = (props) => {
  const ownerId = props.album.userId;
  const endpoint = `${process.env.REACT_APP_API_BASE_URL}users/${ownerId}`;
  const { data, error, isLoading } = useSWR(`/api/users/${ownerId}`, () =>
    fetcher(endpoint)
  );

  if (error) {
    return <Error />;
  }

  if (isLoading) {
    return <Loading />;
  }

  const owner = data as User;

  return (
    <Container>
      {props.album.title} | {`@${owner.username}`}
    </Container>
  );
};

const Container = styled(Box, {
  color: '$background',
});

export default Album;
