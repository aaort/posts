// Return parsed array of deleted posts from local storage
export const getDeletedPosts = () => {
  const unparsedDeletedPosts = localStorage.getItem('deletedPosts') ?? '[]';

  const deletedPosts = JSON.parse(unparsedDeletedPosts) as number[];

  return deletedPosts;
};

// Return all favorite posts as an array of post ids
export const getFavoritePosts = () => {
  const unparsedFavoritePosts = localStorage.getItem('favoritePosts') ?? '[]';

  const favoritePosts = JSON.parse(unparsedFavoritePosts) as number[];

  return favoritePosts;
};

// Check if post is a favorite or not by post id
export const isFavoritePost = (postId: number) => {
  const favoritePosts = getFavoritePosts();

  return favoritePosts.includes(postId);
};

// Return parsed array of completed todos from local storage
export const getCompletedTodos = () => {
  const unparsedCompletedTodos = localStorage.getItem('completedTodos') ?? '[]';

  return JSON.parse(unparsedCompletedTodos) as string[];
};
