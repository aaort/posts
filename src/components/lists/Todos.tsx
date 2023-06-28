import Todo from '@/components/cards/Todo';
import { Error, Loading } from '@/components/common';
import { useUrl } from '@/hooks';
import type { Todo as TodoType } from '@/types';
import { fetcher, getCompletedTodos } from '@/utils';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import List from './List';

type TodosProps = {};

const Todos: React.FC<TodosProps> = () => {
  const url = useUrl('todos');
  const { data, error, isLoading, mutate, isValidating } = useSWR(
    '/api/todos',
    () => fetcher(url)
  );
  const [todos, setTodos] = useState<TodoType[]>([]);

  useEffect(() => {
    mutate('/api/todos', true);
  }, [url, mutate]);

  // Listen for local storage changes and update todo list
  useEffect(() => {
    const handleStorageEvent = () => {
      if (data) {
        setTodos(sortTodos(data));
      }
    };

    window.addEventListener('storage', handleStorageEvent);

    return () => {
      window.removeEventListener('storage', handleStorageEvent);
    };
  }, [data]);

  if (error) {
    return <Error />;
  }

  if (isLoading || isValidating) {
    return <Loading />;
  }

  if (!todos?.length) {
    setTodos(sortTodos(data));
  }

  return (
    <List>
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </List>
  );
};

// Sort todos, uncompleted first
const sortTodos = (todos: TodoType[]) => {
  const completedTodos = todos
    .filter(isTodoCompleted)
    .map((todo) => ({ ...todo, completed: true }));

  const uncompletedTodos = todos.filter((todo) => !isTodoCompleted(todo));

  return uncompletedTodos.concat(completedTodos);
};

// Check if todo is completed locally or from API
const isTodoCompleted = (todo: TodoType) => {
  const localCompletedTodos = getCompletedTodos();

  return todo.completed || localCompletedTodos.includes(`${todo.id}`);
};

export default Todos;
