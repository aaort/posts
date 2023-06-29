import Tabs from '@/components/Tabs';
import { Order, Tab } from '@/types';
import { Suspense, lazy, useState } from 'react';
import { Column } from './common';
import Loading from './common/Loading';
import AlbumsFilters from './lists/components/filters/AlbumsFilters';
import PostsFilters, {
  PostsFilter,
} from './lists/components/filters/PostsFilters';
import TodosFilters, {
  TodosFilter,
} from './lists/components/filters/TodosFilters';

const Posts = lazy(() => import('./lists/Posts'));
const Albums = lazy(() => import('./lists/Albums'));
const Todos = lazy(() => import('./lists/Todos'));

type FilterType = 'name' | 'id' | 'favorite';

export type Filter = { type: FilterType; order: Order };

const TabsContainer: React.FC<{}> = () => {
  const [selectedTab, setSelectedTab] = useState<Tab>('posts');

  const [todosFilters, setTodosFilters] = useState<TodosFilter[]>([
    { type: 'byName', order: 'ascending' },
    { type: 'byCompleted', order: 'ascending' },
  ]);

  const [postsFilters, setPostsFilters] = useState<PostsFilter[]>([
    { type: 'byName', order: 'ascending' },
    { type: 'byId', order: 'ascending' },
    { type: 'byFavorite', order: 'ascending' },
  ]);

  const [albumsFilters, setAlbumsFilters] = useState<PostsFilter[]>([
    { type: 'byName', order: 'ascending' },
    { type: 'byId', order: 'ascending' },
    { type: 'byFavorite', order: 'ascending' },
  ]);

  return (
    <Column>
      <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <Suspense fallback={<Loading />}>
        {selectedTab === 'posts' ? (
          <Column css={{ gap: '$4', my: '$3', alignItems: 'center' }}>
            <PostsFilters filters={postsFilters} setFilters={setPostsFilters} />
            <Posts filters={postsFilters} />
          </Column>
        ) : selectedTab === 'albums' ? (
          <Column css={{ gap: '$4', my: '$3', alignItems: 'center' }}>
            <AlbumsFilters
              filters={albumsFilters}
              setFilters={setAlbumsFilters}
            />
            <Albums filters={albumsFilters} />
          </Column>
        ) : (
          <Column css={{ gap: '$4', my: '$3', alignItems: 'center' }}>
            <TodosFilters filters={todosFilters} setFilters={setTodosFilters} />
            <Todos />
          </Column>
        )}
      </Suspense>
    </Column>
  );
};

export default TabsContainer;
