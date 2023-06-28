// Return parsed array of deleted posts from local storage
export const getDeletedPosts = () => {
  const unparsedDeletedPosts = localStorage.getItem('deletedPosts') ?? '[]';

  const deletedPosts = JSON.parse(unparsedDeletedPosts) as number[];

  return deletedPosts;
};

// Return parsed array of completed todos from local storage
export const getCompletedTodos = () => {
  const unparsedCompletedTodos = localStorage.getItem('completedTodos') ?? '[]';

  return JSON.parse(unparsedCompletedTodos) as string[];
};
