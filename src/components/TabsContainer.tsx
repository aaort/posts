import Tabs from '@/components/Tabs';
import type { Order, Tab } from '@/types';
import { Suspense, lazy, useState } from 'react';
import { Column } from './common';
import Loading from './common/Loading';
import AlbumsFilters from './lists/components/filters/AlbumsFilters';
import PostsFilters from './lists/components/filters/PostsFilters';
import TodosFilters from './lists/components/filters/TodosFilters';
import type {
  AlbumsFilter,
  PostsFilter,
  TodosFilter,
} from './lists/components/filters/types';

const Posts = lazy(() => import('./lists/Posts'));
const Albums = lazy(() => import('./lists/Albums'));
const Todos = lazy(() => import('./lists/Todos'));

type FilterType = 'name' | 'id' | 'favorite';

export type Filter = { type: FilterType; order: Order };

const TabsContainer: React.FC<{}> = () => {
  const [selectedTab, setSelectedTab] = useState<Tab>('posts');

  const [postsFilters, setPostsFilters] = useState<PostsFilter[]>([
    { type: 'byName', order: 'ascending' },
    { type: 'byId', order: 'ascending' },
    { type: 'byFavorite', order: 'ascending' },
  ]);

  const [albumsFilters, setAlbumsFilters] = useState<AlbumsFilter[]>([
    { type: 'byName', order: 'ascending' },
    { type: 'byId', order: 'ascending' },
    { type: 'byFavorite', order: 'ascending' },
  ]);

  const [todosFilters, setTodosFilters] = useState<TodosFilter[]>([
    { type: 'byName', order: 'ascending' },
    { type: 'byCompleted', order: 'ascending' },
  ]);

  return (
    <Column>
      <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <Suspense fallback={<Loading />}>
        <Column css={{ gap: '$6', my: '$3', alignItems: 'center' }}>
          {selectedTab === 'posts' ? (
            <>
              <PostsFilters
                filters={postsFilters}
                setFilters={setPostsFilters}
              />
              <Posts filters={postsFilters} />
            </>
          ) : selectedTab === 'albums' ? (
            <>
              <AlbumsFilters
                filters={albumsFilters}
                setFilters={setAlbumsFilters}
              />
              <Albums filters={albumsFilters} />
            </>
          ) : (
            <>
              <TodosFilters
                filters={todosFilters}
                setFilters={setTodosFilters}
              />
              <Todos filters={todosFilters} />
            </>
          )}
        </Column>
      </Suspense>
    </Column>
  );
};

export default TabsContainer;
