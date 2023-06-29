import { AlertDialog, Column, Error, Loading } from '@/components/common';
import { useUrl } from '@/hooks';
import { styled } from '@/theme';
import type { Photo as PhotoType } from '@/types';
import { fetcher } from '@/utils';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import useSWR from 'swr';

// Album page component
const Album: React.FC<{}> = () => {
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

  const photos: PhotoType[] = data;

  return (
    <>
      <Container>
        <Grid>
          {photos.map((photo, i) => (
            <Photo key={i} onClick={() => toggleOpenImage(photo.url)}>
              <Image src={photo.thumbnailUrl} alt={photo.title} />
              <span>{photo.title}</span>
            </Photo>
          ))}
        </Grid>
        {openImageUrl ? (
          <AlertDialog
            isOpen={!!openImageUrl}
            onOpenChange={() => toggleOpenImage()}
            onClose={() => toggleOpenImage()}
          >
            <img src={openImageUrl} />
          </AlertDialog>
        ) : null}
      </Container>
    </>
  );
};

const Container = styled('div', {
  position: 'relative',
  mx: '$4',
  mt: '$4',
});

const Grid = styled('div', {
  display: 'grid',
  gridTemplateRows: 'repeat(4, 1fr)',
  gridTemplateColumns: 'repeat(4, 20rem)',
  gap: '$2',
  placeItems: 'center',
  justifyContent: 'center',
});

const Photo = styled(Column, {});

const Image = styled('img', {
  objectFit: 'fill',
  cursor: 'pointer',
});

export default Album;
