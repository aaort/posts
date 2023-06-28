// Return parsed array of deleted posts from local storage
export const getDeletedPosts = () => {
  const unparsedDeletedPosts = localStorage.getItem('deletedPosts') ?? '[]';

  const deletedPosts = JSON.parse(unparsedDeletedPosts) as number[];

  return deletedPosts;
};

// Delete posts by given an array of post ids
export const toggleDeletedPosts = (postIds: number[]) => {
  const deletedTodos = getDeletedPosts();

  let newDeletedPosts = deletedTodos;
  for (let i = 0; i < postIds.length; i++) {
    const postId = postIds[i];
    if (deletedTodos.includes(postId)) {
      newDeletedPosts = newDeletedPosts.filter((id) => id !== postId);
    } else {
      newDeletedPosts.push(postId);
    }
  }

  localStorage.setItem('deletedPosts', JSON.stringify(newDeletedPosts));

  dispatchEvent(new Event('storage'));
};

// Return an array of favorite posts as ids
export const getFavoritePosts = () => {
  const unparsedFavoritePosts = localStorage.getItem('favoritePosts') ?? '[]';

  const favoritePosts = JSON.parse(unparsedFavoritePosts) as number[];

  return favoritePosts;
};

// Return an array of favorite albums as ids
export const getFavoriteAlbums = () => {
  const unparsedFavoriteAlbums = localStorage.getItem('favoriteAlbums') ?? '[]';

  const favoriteAlbums = JSON.parse(unparsedFavoriteAlbums) as number[];

  return favoriteAlbums;
};

// Check if post is a favorite or not by post id
export const isFavoritePost = (postId: number) => {
  const favoritePosts = getFavoritePosts();

  return favoritePosts.includes(postId);
};

// Check if album is a favorite or not by id
export const isFavoriteAlbum = (albumId: number) => {
  const favoriteAlbums = getFavoriteAlbums();

  return favoriteAlbums.includes(albumId);
};

// Toggle an array of favorite posts, either mark as favorite or unmark
export const toggleFavoritePosts = (postIds: number[]) => {
  const favoritePosts = getFavoritePosts();

  let newFavoritePosts = favoritePosts;
  for (let i = 0; i < postIds.length; i++) {
    const postId = postIds[i];
    if (favoritePosts.includes(postId)) {
      newFavoritePosts = newFavoritePosts.filter((id) => id !== postId);
    } else {
      newFavoritePosts.push(postId);
    }
  }

  localStorage.setItem('favoritePosts', JSON.stringify(newFavoritePosts));

  dispatchEvent(new Event('storage'));
};

// Toggle an array of favorite albums, either mark as favorite or unmark
export const toggleFavoriteAlbums = (albumIds: number[]) => {
  const favoriteAlbums = getFavoriteAlbums();

  let newFavoriteAlbums = favoriteAlbums;
  for (let i = 0; i < albumIds.length; i++) {
    const albumId = albumIds[i];
    if (favoriteAlbums.includes(albumId)) {
      newFavoriteAlbums = newFavoriteAlbums.filter((id) => id !== albumId);
    } else {
      newFavoriteAlbums.push(albumId);
    }
  }

  localStorage.setItem('favoriteAlbums', JSON.stringify(newFavoriteAlbums));

  dispatchEvent(new Event('storage'));
};

// Return parsed array of completed todos from local storage
export const getCompletedTodos = () => {
  const unparsedCompletedTodos = localStorage.getItem('completedTodos') ?? '[]';

  return JSON.parse(unparsedCompletedTodos) as string[];
};
