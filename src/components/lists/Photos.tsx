import Album from '@/components/cards/Album';
import { Column, Error, Loading } from '@/components/common';
import { styled } from '@/theme';
import type { Album as AlbumType } from '@/types';
import { fetcher } from '@/utils';
import useSWR from 'swr';

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
