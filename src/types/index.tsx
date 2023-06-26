// Types of data returned from API calls
type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

type User = {
  id: number;
  name: string;
  username: string;
  address: string;
};

type Album = Omit<Post, 'body'> & {};

// Custom types used in the project
type Tab = 'posts' | 'photos' | 'todos';

type Limit = '10' | '20' | '50' | '100';

export type { Album, Limit, Post, Tab, User };
