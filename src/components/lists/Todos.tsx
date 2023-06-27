import Todo from '@/components/cards/Todo';
import { Error, Loading } from '@/components/common';
import useUrlWithLimit from '@/hooks/useUrlWithLimit';
import type { Todo as TodoType } from '@/types';
import { fetcher } from '@/utils';
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

const sortTodos = (todos: TodoType[]) => {
  const completedTodos = todos.filter((todo) => todo.completed);
  const uncompletedTodos = todos.filter((todo) => !todo.completed);
  return uncompletedTodos.concat(completedTodos);
};

export default Todos;
