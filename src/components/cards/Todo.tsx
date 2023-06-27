import { styled } from '@/theme';
import { Todo as TodoType } from '@/types';
import { getCompletedTodos } from '@/utils';
import * as Checkbox from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';
import { CSS } from '@stitches/react';
import { useState } from 'react';
import { Row } from '../common';

type TodoProps = {
  todo: TodoType;
};

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const Todo: React.FC<TodoProps> = ({ todo: initialTodo }) => {
  const [todo, setTodo] = useState<TodoType>(initialTodo);
  const taskCss: CSS = todo.completed ? { textDecoration: 'line-through' } : {};

  const handleComplete = async () => {
    setTodo({ ...todo, completed: !todo.completed });

    let completedTodos = getCompletedTodos();
    if (!todo.completed) {
      await fetch(`${baseUrl}todos/${todo.id}`, { method: 'DELETE' });

      completedTodos.push(`${todo.id}`);
    } else {
      completedTodos = completedTodos.filter((id) => id !== `${todo.id}`);
    }
    localStorage.setItem('completedTodos', JSON.stringify(completedTodos));
  };

  return (
    <Container>
      <Title css={taskCss}>{todo.title + ' ' + todo.id}</Title>
      <CheckboxRoot
        defaultChecked={todo.completed}
        checked={todo.completed}
        onCheckedChange={handleComplete}
      >
        <CheckboxIndicator>
          <CheckIcon width={'100%'} height={'100%'} />
        </CheckboxIndicator>
      </CheckboxRoot>
    </Container>
  );
};

const Container = styled(Row, {
  '@xs': {
    minWidth: '30rem',
  },
  '@sm': {
    minWidth: '35rem',
  },
  '@md': {
    minWidth: '40rem',
  },
  '@lg': {
    minWidth: '50rem',
  },
  '@xl': {
    minWidth: '60rem',
  },
  width: '100%',
  maxWidth: '80%',
  justifyContent: 'space-between',
  backgroundColor: '$gray3',
  padding: '$1 $2',
  borderRadius: '$medium',
});

const CheckboxRoot = styled(Checkbox.Root, {
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
});

const CheckboxIndicator = styled(Checkbox.Indicator, {
  color: '$primary',
});

const Title = styled('p', {
  fontWeight: '$3',
  fontSize: 'calc($2 - 0.5em)',
});

export default Todo;
