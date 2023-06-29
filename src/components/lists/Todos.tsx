import Todo from '@/components/cards/Todo';
import { Error, Loading } from '@/components/common';
import { useStorageChangeEvent, useUrl } from '@/hooks';
import type { Todo as TodoType } from '@/types';
import { fetcher, getCompletedTodos } from '@/utils';
import { useCallback, useEffect, useState } from 'react';
import useSWR from 'swr';
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

  return (
    <List>
      {getTodos().map((todo) => (
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

export default Todos;
