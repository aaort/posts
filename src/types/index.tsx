// Types of data returned from API calls

type Common = {
  id: number;
};

type Post = {
  userId: number;
  title: string;
  body: string;
} & Common;

type User = {
  name: string;
  username: string;
  address: string;
} & Common;

type Comment = {
  postId: number;
  name: string;
  email: string;
  body: string;
} & Common;

type Todo = Pick<Post, 'title' | 'userId'> & {
  completed: boolean;
} & Common;

type Album = Omit<Post, 'body'> & {};

// Custom types used in the project
type Tab = 'posts' | 'photos' | 'todos';

type Limit = '10' | '20' | '50' | '100';

type ButtonType = 'primary' | 'success' | 'dangerous';

export type { Album, ButtonType, Comment, Limit, Post, Tab, Todo, User };
