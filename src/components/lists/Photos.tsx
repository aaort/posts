import useSWR from 'swr';
import { styled } from '../../theme';
import { fetcher } from '../../utils';
import { Column, Error } from '../common';
import Loading from '../common/Loading';
import type { Album as AlbumType } from '../../types';
import Album from '../cards/Album';

type PhotosProps = {};

const endpoint = `${process.env.REACT_APP_API_BASE_URL}albums`;

const Photos: React.FC<PhotosProps> = () => {
  const { data, error, isLoading } = useSWR('/api/albums', () =>
    fetcher(endpoint)
  );

  if (error) {
    return <Error />;
  }

  if (isLoading) {
    return <Loading />;
  }

  const albums = data as AlbumType[];

  return (
    <Container>
      {albums.map((album) => (
        <Album album={album} />
      ))}
    </Container>
  );
};

const Container = styled(Column, {
  gap: '$3',
  paddingInline: '$5',
});

export default Photos;
