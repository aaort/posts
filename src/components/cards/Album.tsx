import {
  Box,
  Button,
  Dialog,
  Error,
  Link,
  Loading,
  Row,
  Tooltip,
} from '@/components/common';
import useUrl from '@/hooks/useUrl';
import { theme } from '@/theme';
import type { Album as AlbumType, User } from '@/types';
import {
  fetcher,
  isFavoriteAlbum,
  toggleDeletedAlbums,
  toggleFavoriteAlbums,
} from '@/utils';
import { HeartFilledIcon, HeartIcon, TrashIcon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import Input from '../Input';
import { IconButtonBox } from './Post';
import { Actions, Subtitle, Title } from './common';

type AlbumProps = {
  album: AlbumType;
};

type Data = {
  title: string;
  subtitle: string;
};

const Album: React.FC<AlbumProps> = (props) => {
  const ownerId = props.album.userId;
  const url = useUrl(`users/${ownerId}`);
  const { data, error, isLoading } = useSWR(`/api/users/${ownerId}`, () =>
    fetcher(url)
  );

  const owner = data as User;

  const [isEditing, setIsEditing] = useState<boolean>(false);

  const [album, setAlbum] = useState<Data>();

  useEffect(() => {
    if (owner) {
      setAlbum({
        title: props.album.title,
        subtitle: owner.username,
      });
    }
  }, [owner, setAlbum, props.album.title]);

  if (error) {
    return <Error />;
  }

  if (isLoading || !album) {
    return <Loading />;
  }

  const toggleIsEditing = (value?: boolean) =>
    setIsEditing(value ?? !isEditing);

  const handleDiscard = () => {
    // Reset values to initial
    setAlbum({
      title: props.album.title,
      subtitle: owner.username,
    });
    setIsEditing(false);
  };

  const handleSave = () => toggleIsEditing(false);

  const handleDataChange = (event: React.FormEvent<HTMLInputElement>) => {
    setAlbum({
      ...album,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  return (
    <Box>
      <Row css={{ justifyContent: 'space-between' }}>
        <Row css={{ gap: '$1' }}>
          {!isEditing ? (
            <Link
              to={`/albums/${props.album.id}`}
              state={{ albumId: props.album.id }}
            >
              <Title>{album.title}</Title>
            </Link>
          ) : (
            <Input
              value={album.title}
              name="title"
              onChange={handleDataChange}
            />
          )}

          {!isEditing ? (
            <Subtitle> {`@${album?.subtitle}`} </Subtitle>
          ) : (
            <Input
              value={album.subtitle}
              name="subtitle"
              onChange={handleDataChange}
            />
          )}
        </Row>
        <Row css={{ gap: '$1', alignItems: 'flex-start' }}>
          <Favorite albumId={props.album.id} />
          <Delete albumId={props.album.id} />
        </Row>
      </Row>
      <Actions>
        <Button
          title={!isEditing ? 'Edit' : 'Save'}
          type={!isEditing ? 'primary' : 'success'}
          onClick={!isEditing ? toggleIsEditing : handleSave}
        />
        {isEditing && (
          <Button title="Discard" type="dangerous" onClick={handleDiscard} />
        )}
      </Actions>
    </Box>
  );
};

type ActonButtonProps = {
  albumId: number;
};

const Delete: React.FC<ActonButtonProps> = ({ albumId }) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const url = useUrl(`posts/${albumId}`, false);

  const handleOpenDialog = () => setIsDialogOpen(true);
  const handleClose = () => setIsDialogOpen(false);
  const handleDelete = async () => {
    await fetch(url, { method: 'DELETE' });

    toggleDeletedAlbums([albumId]);

    handleClose();
  };

  return (
    <>
      <Tooltip text="Delete this album">
        <IconButtonBox
          onClick={handleOpenDialog}
          aria-label="delete-icon-button"
        >
          <TrashIcon />
        </IconButtonBox>
      </Tooltip>
      <Dialog
        isOpen={isDialogOpen}
        title="Confirm Operation"
        description="Are you sure you want to proceed this operation ?"
        onClose={handleClose}
        onOk={handleDelete}
      />
    </>
  );
};

const Favorite: React.FC<ActonButtonProps> = ({ albumId }) => {
  const handleClick = () => {
    toggleFavoriteAlbums([albumId]);
  };

  const icon = !isFavoriteAlbum(albumId) ? (
    <HeartIcon width={'90%'} height={'90%'} />
  ) : (
    <HeartFilledIcon
      width={'90%'}
      height={'90%'}
      color={theme.colors.error.value}
    />
  );

  return (
    <Tooltip text="Mark as favorite">
      <IconButtonBox aria-label="favorite-icon-button" onClick={handleClick}>
        {icon}
      </IconButtonBox>
    </Tooltip>
  );
};

export default Album;
