import { Checkbox, Input } from '@/components';
import { Button, Row, Tooltip } from '@/components/common';
import { styled } from '@/theme';
import { Todo as TodoType } from '@/types';
import { toggleCompletedTodos } from '@/utils/storage';
import { Pencil1Icon } from '@radix-ui/react-icons';
import { CSS } from '@stitches/react';
import { useState } from 'react';
import { Wrapper } from './common';

type TodoProps = {
  todo: TodoType;
  checkbox: React.ReactNode;
};

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const Todo: React.FC<TodoProps> = ({ todo: initialTodo, checkbox }) => {
  const [todo, setTodo] = useState<TodoType>(initialTodo);
  const taskCss: CSS = todo.completed ? { textDecoration: 'line-through' } : {};

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedTodo, setEditedTodo] = useState<TodoType>(todo);

  const toggleEditing = () => setIsEditing(!isEditing);

  const handleEditing = (event: React.FormEvent<HTMLInputElement>) => {
    setEditedTodo({
      ...todo,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleDiscard = () => {
    setTodo(todo);
    toggleEditing();
  };

  const handleSave = () => {
    setTodo(editedTodo);
    toggleEditing();
  };

  const handleComplete = async () => {
    setTodo({ ...todo, completed: !todo.completed });

    await fetch(`${baseUrl}todos/${todo.id}`, { method: 'DELETE' });
    toggleCompletedTodos([todo.id]);
  };

  return (
    <Wrapper>
      <Container>
        {!isEditing ? (
          <Title css={taskCss}>{todo.title}</Title>
        ) : (
          <Input
            value={editedTodo.title}
            name="title"
            onChange={handleEditing}
          />
        )}
        <Row css={{ gap: '$2' }}>
          {!isEditing ? (
            <>
              <Checkbox
                checked={todo.completed}
                onChange={handleComplete}
                tooltip={!todo.completed ? 'Mark As Complete' : 'Unmark'}
                css={{ boxShadow: '$small' }}
              />
              <Tooltip text={'Edit'}>
                <EditButton onClick={toggleEditing}>
                  <Pencil1Icon width={20} height={20} />
                </EditButton>
              </Tooltip>
            </>
          ) : (
            <>
              <Button
                title="Discard"
                type="dangerous"
                onClick={handleDiscard}
              />
              <Button title="Save" type="success" onClick={handleSave} />
            </>
          )}
        </Row>
      </Container>
      {checkbox}
    </Wrapper>
  );
};

const Container = styled(Row, {
  width: '100%',
  maxWidth: '80%',
  justifyContent: 'space-between',
  backgroundColor: '$gray3',
  padding: '$2 $3',
  borderRadius: '$medium',
  boxShadow: '$small',
  fontSize: '$2',
});

const Title = styled('p', {
  fontWeight: '$3',
  fontSize: '$2',
});

const EditButton = styled('div', {
  all: 'unset',
  backgroundColor: '$background',
  width: 25,
  height: 25,
  borderRadius: 4,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: `$small`,
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '$primary',
    '& span': { color: '$background' },
  },
  '&:hover svg': {
    color: '$background',
  },
});

export default Todo;
