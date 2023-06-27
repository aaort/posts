import Box from '@/components/common/Box';
import { Todo as TodoType } from '@/types';

type TodoProps = {
  todo: TodoType;
};

const Todo: React.FC<TodoProps> = (props) => {
  return <Box title={props.todo.title} subtitle={''} content={''} />;
};

export default Todo;
