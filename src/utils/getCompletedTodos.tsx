// Return parsed array of completed todos from local storage
const getCompletedTodos = () => {
  const unparsedCompletedTodos = localStorage.getItem('completedTodos') ?? '[]';

  return JSON.parse(unparsedCompletedTodos) as string[];
};

export default getCompletedTodos;
