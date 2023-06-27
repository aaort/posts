import Album from '@/components/cards/Album';
import { Error, Loading } from '@/components/common';
import type { Album as AlbumType } from '@/types';
import { fetcher, getUrlFromEndpoint } from '@/utils';
import useSWR from 'swr';
import List from './List';

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
    <List>
      {albums.map((album, i) => (
        <Album key={i} album={album} />
      ))}
    </List>
  );
};

export default Photos;
