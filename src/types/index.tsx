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

type Tab = 'posts' | 'photos' | 'tasks';

export type { Post, Tab, User };
