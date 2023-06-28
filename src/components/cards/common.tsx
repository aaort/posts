import { Row } from '@/components/common';
import { styled } from '@/theme';

export const Title = styled('span', {
  fontSize: '$2',
  maxLines: 1,
});

export const Subtitle = styled('span', {
  fontSize: 'calc($2 - 0.4rem)',
  color: '$gray7',
  fontStyle: 'italic',
});

export const Actions = styled(Row, {
  gap: '$2',
  justifyContent: 'flex-end',
  flexWrap: 'wrap',
});
