import { styled } from '@/theme';
import Button from './Button';
import Column from './Column';
import Row from './Row';

type BoxTypes = {
  title: string;
  subtitle: string;
  content: string;
  actions?: {
    onComments: () => void;
    onEdit: () => void;
    onFavorite: () => void;
    onDelete: () => void;
  };
};

const Box: React.FC<BoxTypes> = (props) => {
  return (
    <Container>
      <Row css={{ gap: '$1' }}>
        <Title>{props.title}</Title> |<Username>{`${props.subtitle}`}</Username>
      </Row>
      <p>{props.content}</p>
      <Actions>
        <Button handleClick={() => {}} type="comments" title={'Comments'} />
        <Button handleClick={() => {}} type="edit" title={'Edit'} />
        <Button handleClick={() => {}} type="favorite" title={'Favorite'} />
        <Button handleClick={() => {}} type="delete" title={'Delete'} />
      </Actions>
    </Container>
  );
};

const Container = styled(Column, {
  padding: '$2',
  backgroundColor: '$gray3',
  borderRadius: '$medium',
  gap: '$2',
});

const Title = styled('span', {
  fontSize: '$2',
  maxLines: 1,
});

const Username = styled('span', {
  fontSize: 'calc($2 - 0.4rem)',
});

const Actions = styled(Row, {
  gap: '$2',
  justifyContent: 'flex-end',
  flexWrap: 'wrap',
});

export default Box;
