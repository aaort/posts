import Album from '@/components/cards/Album';
import { Error, Loading, Row } from '@/components/common';
import { useUrl } from '@/hooks';
import { styled } from '@/theme';
import type { Album as AlbumType } from '@/types';
import { fetcher } from '@/utils';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import Checkbox from '../Checkbox';
import List from './List';

type AlbumsProps = {};

const Albums: React.FC<AlbumsProps> = () => {
  const url = useUrl('albums');
  const { data, error, isLoading, mutate, isValidating } = useSWR(
    '/api/albums',
    () => fetcher(url)
  );
  const [selectedAlbumIds, setSelectedTodoIds] = useState<number[]>([]);

  useEffect(() => {
    mutate('/api/albums', true);
  }, [url, mutate]);

  if (error) {
    return <Error />;
  }

  if (isLoading || isValidating) {
    return <Loading />;
  }

  const handleAlbumSelectToggle = (id: number) => {
    if (selectedAlbumIds.includes(id)) {
      setSelectedTodoIds(selectedAlbumIds.filter((albumId) => id !== albumId));
    } else {
      setSelectedTodoIds([...selectedAlbumIds, id]);
    }
  };

  const albums = data as AlbumType[];

  return (
    <List>
      {albums.map((album, i) => {
        const isSelected = selectedAlbumIds.includes(album.id);
        return (
          <AlbumRow key={i}>
            <Album album={album} />
            <Checkbox
              checked={isSelected}
              onChange={() => handleAlbumSelectToggle(album.id)}
              tooltip={!isSelected ? 'Select' : 'Unselect'}
              size="medium"
            />
          </AlbumRow>
        );
      })}
    </List>
  );
};

const AlbumRow = styled(Row, {
  gap: '$2',
  width: '100%',
  justifyContent: 'center',
});

export default Albums;
