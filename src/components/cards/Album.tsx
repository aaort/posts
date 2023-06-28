import { Box, Button, Error, Loading, Row } from '@/components/common';
import useUrl from '@/hooks/useUrl';
import type { Album as AlbumType, User } from '@/types';
import { fetcher } from '@/utils';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import Input from '../Input';
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
      <Row css={{ gap: '$1' }}>
        {!isEditing ? (
          <Title>{album.title} </Title>
        ) : (
          <Input value={album.title} name="title" onChange={handleDataChange} />
        )}
        |
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
      <Actions>
        <Button
          title={!isEditing ? 'Edit' : 'Save'}
          type={!isEditing ? 'primary' : 'success'}
          onClick={!isEditing ? toggleIsEditing : handleSave}
        />
        {!isEditing ? (
          <>
            <Button title="Favorite" type="success" />
            <Button title="Delete" type="dangerous" />
          </>
        ) : (
          <Button title="Discard" type="dangerous" onClick={handleDiscard} />
        )}
      </Actions>
    </Box>
  );
};

export default Album;
