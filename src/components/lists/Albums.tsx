import Album from '@/components/cards/Album';
import { Dialog, Error, IconButton, Loading, Row } from '@/components/common';
import { useStorageChangeEvent, useUrl } from '@/hooks';
import { styled } from '@/theme';
import type { Album as AlbumType } from '@/types';
import {
  fetcher,
  getDeletedAlbums,
  isFavoriteAlbum,
  toggleDeletedAlbums,
  toggleFavoriteAlbums,
} from '@/utils';
import { HeartIcon, TrashIcon } from '@radix-ui/react-icons';
import { useCallback, useEffect, useState } from 'react';
import useSWR from 'swr';
import Checkbox from '../Checkbox';
import List from './List';
import type { AlbumsFilter } from './components/filters/types';

type AlbumsProps = {
  filters: AlbumsFilter[];
};

const Albums: React.FC<AlbumsProps> = ({ filters }) => {
  const url = useUrl('albums');
  const { data, error, isLoading, mutate, isValidating } = useSWR(
    '/api/albums',
    () => fetcher(url)
  );

  const [selectedAlbumIds, setSelectedAlbumIds] = useState<number[]>([]);

  const [, setFlag] = useState<boolean>(false);

  useStorageChangeEvent({ callback: () => setFlag((flag) => !flag) });

  useEffect(() => {
    mutate();
  }, [url, mutate]);

  const getAlbums = useCallback(
    () => getSortedAlbums(getFilteredAlbums(data), filters),
    [filters, data]
  );

  if (error) {
    return <Error />;
  }

  if (isLoading || isValidating) {
    return <Loading />;
  }

  const handleAlbumSelectToggle = (id: number) => {
    if (selectedAlbumIds.includes(id)) {
      setSelectedAlbumIds(selectedAlbumIds.filter((albumId) => id !== albumId));
    } else {
      setSelectedAlbumIds([...selectedAlbumIds, id]);
    }
  };

  const handleFavoriteClick = () => {
    toggleFavoriteAlbums(selectedAlbumIds);
    setSelectedAlbumIds([]);
  };

  const handleDeleteClick = () => {
    toggleDeletedAlbums(selectedAlbumIds);
    setSelectedAlbumIds([]);
  };

  return (
    <>
      <List>
        {getAlbums().map((album, i) => {
          const isSelected = selectedAlbumIds.includes(album.id);
          return (
            <Album
              key={i}
              album={album}
              checkbox={
                <Checkbox
                  checked={isSelected}
                  onChange={() => handleAlbumSelectToggle(album.id)}
                  tooltip={!isSelected ? 'Select' : 'Unselect'}
                  size="medium"
                  css={{ border: '1px solid $primary' }}
                />
              }
            />
          );
        })}
      </List>
      {selectedAlbumIds.length ? (
        <FloatingButtons>
          <FavoriteButton onClick={handleFavoriteClick} />
          <DeleteButton onClick={handleDeleteClick} />
        </FloatingButtons>
      ) : null}
    </>
  );
};

const getFilteredAlbums = (albums: AlbumType[]) => {
  const deletedAlbums = getDeletedAlbums();

  return albums.filter((album) => !deletedAlbums.includes(album.id));
};

const getSortedAlbums = (albums: AlbumType[], filters: AlbumsFilter[]) => {
  return albums
    .sort(({ title: title1 }, { title: title2 }) =>
      filters[0].order === 'ascending'
        ? title1.length - title2.length
        : title2.length - title1.length
    )
    .sort((album1, album2) =>
      filters[1].order === 'ascending'
        ? album1.id - album2.id
        : album2.id - album1.id
    )
    .sort((album1, album2) =>
      filters[2].order === 'ascending'
        ? Number(isFavoriteAlbum(album1.id)) -
          Number(isFavoriteAlbum(album2.id))
        : Number(isFavoriteAlbum(album2.id)) -
          Number(isFavoriteAlbum(album1.id))
    );
};

type FloatingButtonProps = { onClick: () => void };

const FavoriteButton: React.FC<FloatingButtonProps> = ({ onClick }) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const toggleDialog = (value?: boolean) =>
    setIsDialogOpen(value ?? !isDialogOpen);

  return (
    <>
      <FloatingButton
        onClick={() => toggleDialog(true)}
        aria-label="favorite-icon-button"
      >
        <HeartIcon />
      </FloatingButton>
      <Dialog
        title="Confirm"
        description="Are you sure you want to add those post to your favorites ?"
        isOpen={isDialogOpen}
        onClose={() => toggleDialog(false)}
        onOk={onClick}
      />
    </>
  );
};

const DeleteButton: React.FC<FloatingButtonProps> = ({ onClick }) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const toggleDialog = (value?: boolean) =>
    setIsDialogOpen(value ?? !isDialogOpen);

  return (
    <>
      <FloatingButton
        onClick={() => toggleDialog(true)}
        aria-label="delete-icon-button"
      >
        <TrashIcon />
      </FloatingButton>
      <Dialog
        title="Confirm"
        description="Are you sure you want to delete those post ?"
        isOpen={isDialogOpen}
        onClose={() => toggleDialog(false)}
        onOk={onClick}
      />
    </>
  );
};

const FloatingButtons = styled(Row, {
  position: 'fixed',
  bottom: 20,
  right: 20,
  gap: '$2',
});

const FloatingButton = styled(IconButton, {
  width: '4rem',
  height: '4rem',
  backgroundColor: '$gray3',
  '& svg': {
    width: '50%',
    height: '50%',
  },
  '&[aria-label="delete-icon-button"]': {
    backgroundColor: '$error',
    color: '$background',
  },
  '&[aria-label="favorite-icon-button"]:hover': {
    backgroundColor: '$gray6',
    color: '$background',
  },
});

export default Albums;
