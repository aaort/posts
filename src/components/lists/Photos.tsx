import Album from '@/components/cards/Album';
import { Error, Loading } from '@/components/common';
import useUrlWithLimit from '@/hooks/useUrlWithLimit';
import type { Album as AlbumType } from '@/types';
import { fetcher } from '@/utils';
import { useEffect } from 'react';
import useSWR from 'swr';
import List from './List';

type PhotosProps = {};

const Photos: React.FC<PhotosProps> = () => {
  const url = useUrlWithLimit('albums');
  const { data, error, isLoading, mutate, isValidating } = useSWR(
    '/api/albums',
    () => fetcher(url)
  );

  useEffect(() => {
    mutate('/api/albums', true);
  }, [url, mutate]);

  if (error) {
    return <Error />;
  }

  if (isLoading || isValidating) {
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
