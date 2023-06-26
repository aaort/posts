import Album from '@/components/cards/Album';
import { Column, Error, Loading } from '@/components/common';
import { styled } from '@/theme';
import type { Album as AlbumType } from '@/types';
import { fetcher, getUrlFromEndpoint } from '@/utils';
import useSWR from 'swr';

type PhotosProps = {};

const Photos: React.FC<PhotosProps> = () => {
  const url = getUrlFromEndpoint('albums');
  const { data, error, isLoading } = useSWR('/api/albums', () => fetcher(url));

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
