import Todo from '@/components/cards/Todo';
import { Error, Loading } from '@/components/common';
import useUrlWithLimit from '@/hooks/useUrlWithLimit';
import type { Todo as TodoType } from '@/types';
import { fetcher, getCompletedTodos } from '@/utils';
import { useEffect } from 'react';
import useSWR from 'swr';
import List from './List';

type TodosProps = {};

const Todos: React.FC<TodosProps> = () => {
  const url = useUrlWithLimit('todos');
  const { data, error, isLoading, mutate, isValidating } = useSWR(
    '/api/todos',
    () => fetcher(url)
  );

  useEffect(() => {
    mutate('/api/todos', true);
  }, [url, mutate]);

  if (error) {
    return <Error />;
  }

  if (isLoading || isValidating) {
    return <Loading />;
  }

  const todos = sortTodos(data);

  return (
    <List>
      {(todos as TodoType[]).map((todo) => (
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
