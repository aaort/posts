import {
  AlertDialog,
  Column,
  Error,
  IconButton,
  Loading,
} from '@/components/common';
import { useUrl } from '@/hooks';
import { styled } from '@/theme';
import type { Photo as PhotoType } from '@/types';
import { fetcher } from '@/utils';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useSWR from 'swr';

// Album page component
const Album: React.FC<{}> = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { albumId } = state;
  const url = useUrl(`albums/${albumId}/photos`, false);

  const { data, error, isLoading } = useSWR(url, () => fetcher(url));

  const [openImageUrl, setOpenImageUrl] = useState<string>();

  if (error) {
    return <Error />;
  }

  if (isLoading) {
    return <Loading />;
  }

  const toggleOpenImage = (imageUrl?: string) => {
    setOpenImageUrl(imageUrl);
  };

  const goBack = () => {
    navigate(-1);
  };

  const photos: PhotoType[] = data;

  return (
    <>
      {!openImageUrl ? (
        <CloseButton onClick={goBack}>
          <ArrowLeftIcon />
        </CloseButton>
      ) : null}
      <Container>
        <Grid>
          {photos.map((photo, i) => (
            <Photo key={i} onClick={() => toggleOpenImage(photo.url)}>
              <Image src={photo.thumbnailUrl} alt={photo.title} />
              <ImageTitle>{photo.title}</ImageTitle>
            </Photo>
          ))}
        </Grid>
      </Container>
      {openImageUrl ? (
        <AlertDialog
          isOpen={!!openImageUrl}
          onOpenChange={() => toggleOpenImage()}
          onClose={() => toggleOpenImage()}
        >
          <img src={openImageUrl} alt="Random" />
        </AlertDialog>
      ) : null}
    </>
  );
};

const Container = styled('div', {
  position: 'relative',
  mx: 'calc($4 * 4)',
  mt: '$4',
});

const Grid = styled('div', {
  display: 'grid',
  gridTemplateRows: 'repeat(4, 1fr)',
  gridTemplateColumns: 'repeat(4, minmax(10rem, 1fr))',
  gap: 'calc($4 * 2)',
  justifyContent: 'center',
});

const Photo = styled(Column, {
  gap: '$2',
  textAlign: 'center',
});

const ImageTitle = styled('span', {
  fontSize: 'calc($2 - 0.3rem)',
});

const Image = styled('img', {
  objectFit: 'fill',
  cursor: 'pointer',
});

const CloseButton = styled(IconButton, {
  position: 'absolute',
  top: '2rem',
  left: '2rem',
  cursor: 'pointer',
  zIndex: 10,
  '&:hover': {
    background: 'initial',
  },
  '& svg': {
    width: '100%',
    height: '100%',
  },
});

export default Album;
