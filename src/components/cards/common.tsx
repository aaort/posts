import { Row } from '@/components/common';
import { styled } from '@/theme';

export const Title = styled('span', {
  fontSize: '$3',
  maxLines: 1,
});

export const Subtitle = styled('span', {
  fontSize: '$2',
  color: '$gray7',
  fontStyle: 'italic',
});

export const Content = styled('p', {
  fontSize: '$2',
});

export const Actions = styled(Row, {
  gap: '$3',
  justifyContent: 'flex-end',
  flexWrap: 'wrap',
});
