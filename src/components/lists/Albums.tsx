import Album from '@/components/cards/Album';
import { Dialog, Error, IconButton, Loading, Row } from '@/components/common';
import { useStorageChangeEvent, useUrl } from '@/hooks';
import { styled } from '@/theme';
import type { Album as AlbumType } from '@/types';
import {
  fetcher,
  getDeletedAlbums,
  toggleDeletedAlbums,
  toggleFavoriteAlbums,
} from '@/utils';
import { HeartIcon, TrashIcon } from '@radix-ui/react-icons';
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

  const [, setFlag] = useState<boolean>(false);

  useStorageChangeEvent({ callback: () => setFlag((flag) => !flag) });

  useEffect(() => {
    mutate();
  }, [url, mutate]);

  if (error) {
    return <Error />;
  }

  if (isLoading || isValidating) {
    return <Loading />;
  }

  const albums = getFilteredAlbums(data);

  const handleAlbumSelectToggle = (id: number) => {
    if (selectedAlbumIds.includes(id)) {
      setSelectedTodoIds(selectedAlbumIds.filter((albumId) => id !== albumId));
    } else {
      setSelectedTodoIds([...selectedAlbumIds, id]);
    }
  };

  const handleFavoriteClick = () => {
    toggleFavoriteAlbums(selectedAlbumIds);
    setSelectedTodoIds([]);
  };

  const handleDeleteClick = () => {
    toggleDeletedAlbums(selectedAlbumIds);
    setSelectedTodoIds([]);
  };

  return (
    <>
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
      {selectedAlbumIds.length && (
        <FloatingButtons>
          <FavoriteButton onClick={handleFavoriteClick} />
          <DeleteButton onClick={handleDeleteClick} />
        </FloatingButtons>
      )}
    </>
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

const getFilteredAlbums = (albums: AlbumType[]) => {
  const deletedAlbums = getDeletedAlbums();

  return albums.filter((album) => !deletedAlbums.includes(album.id));
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

const AlbumRow = styled(Row, {
  gap: '$2',
  width: '100%',
  justifyContent: 'center',
});

export default Albums;
