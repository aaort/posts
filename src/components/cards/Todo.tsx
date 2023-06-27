import Box from '@/components/common/Box';
import { Todo as TodoType } from '@/types';
import { CSS } from '@stitches/react';

type TodoProps = {
  todo: TodoType;
};

const Todo: React.FC<TodoProps> = ({ todo }) => {
  const css: CSS = todo.completed ? { opacity: '.5' } : {};

  return <Box title={todo.title} subtitle={''} content={''} css={css} />;
};

export default Todo;
