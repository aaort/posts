import Todo from '@/components/cards/Todo';
import { Dialog, Error, IconButton, Loading } from '@/components/common';
import { useStorageChangeEvent, useUrl } from '@/hooks';
import { styled } from '@/theme';
import type { Todo as TodoType } from '@/types';
import {
  fetcher,
  getCompletedTodos,
  getDeletedTodos,
  toggleDeletedTodos,
} from '@/utils';
import { TrashIcon } from '@radix-ui/react-icons';
import { useCallback, useEffect, useState } from 'react';
import useSWR from 'swr';
import Checkbox from '../Checkbox';
import List from './List';
import type { TodosFilter } from './components/filters/types';

type TodosProps = {
  filters: TodosFilter[];
};

const Todos: React.FC<TodosProps> = ({ filters }) => {
  const url = useUrl('todos');
  const { data, error, isLoading, mutate, isValidating } = useSWR(
    '/api/todos',
    () => fetcher(url)
  );
  const [, setFlag] = useState<boolean>(false);

  const [selectedTodoIds, setSelectedTodoIds] = useState<number[]>([]);

  useStorageChangeEvent({ callback: () => setFlag((flag) => !flag) });

  useEffect(() => {
    mutate();
  }, [url, mutate]);

  const getTodos = useCallback(
    () => getSortedTodos(sortTodos(data), filters),
    [data, filters]
  );

  if (error) {
    return <Error />;
  }

  if (isLoading || isValidating) {
    return <Loading />;
  }

  const handleTodoSelectToggle = (id: number) => {
    if (selectedTodoIds.includes(id)) {
      setSelectedTodoIds(selectedTodoIds.filter((todoId) => id !== todoId));
    } else {
      setSelectedTodoIds([...selectedTodoIds, id]);
    }
  };

  const handleDeleteClick = () => {
    toggleDeletedTodos(selectedTodoIds);
    setSelectedTodoIds([]);
  };

  return (
    <List>
      {getTodos().map((todo) => {
        const isSelected = selectedTodoIds.includes(todo.id);
        return (
          <Todo
            key={todo.id}
            todo={todo}
            checkbox={
              <Checkbox
                checked={isSelected}
                onChange={() => handleTodoSelectToggle(todo.id)}
                tooltip={!isSelected ? 'Select' : 'Unselect'}
                size="medium"
                css={{ border: '1px solid $primary' }}
              />
            }
          />
        );
      })}
      {selectedTodoIds.length ? (
        <DeleteButton onClick={handleDeleteClick} />
      ) : null}
    </List>
  );
};

// Sort todos, uncompleted first
const sortTodos = (todos: TodoType[]) => {
  const completedTodos = todos
    .filter(isTodoCompleted)
    .map((todo) => ({ ...todo, completed: true }));

  const deletedTodos = getDeletedTodos();

  const uncompletedTodos = todos.filter((todo) => !isTodoCompleted(todo));

  return uncompletedTodos
    .concat(completedTodos)
    .filter((todo) => !deletedTodos.includes(todo.id));
};

const getSortedTodos = (todos: TodoType[], filters: TodosFilter[]) => {
  return todos
    .sort(({ title: title1 }, { title: title2 }) =>
      filters[0].order === 'ascending'
        ? title1.length - title2.length
        : title2.length - title1.length
    )
    .sort((todo1, todo2) =>
      filters[1].order === 'ascending'
        ? Number(isTodoCompleted(todo1)) - Number(isTodoCompleted(todo2))
        : Number(isTodoCompleted(todo2)) - Number(isTodoCompleted(todo1))
    );
};

// Check if todo is completed locally or from API
const isTodoCompleted = (todo: TodoType) => {
  const localCompletedTodos = getCompletedTodos();

  return todo.completed || localCompletedTodos.includes(todo.id);
};

type FloatingButtonProps = { onClick: () => void };

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

const FloatingButton = styled(IconButton, {
  position: 'fixed',
  bottom: '2rem',
  right: '2rem',
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

export default Todos;
