import { Order } from '@/types';

// Generic
type Filter<T> = { type: T; order: Order };

// Posts Filters
type PostsFilterType = 'byName' | 'byId' | 'byFavorite';

type PostsFilter = Filter<PostsFilterType>;

type PostsFilterVisibility = {
  byName: boolean;
  byId: boolean;
  byFavorite: boolean;
};

// Albums Filters
type AlbumsFilterType = PostsFilterType;

type AlbumsFilterVisibility = PostsFilterVisibility;

type AlbumsFilter = Filter<AlbumsFilterType>;

// Todos Filters
type TodosFilterType = 'byName' | 'byCompleted';

type TodosFilterVisibility = { byName: boolean; byCompleted: boolean };

type TodosFilter = Filter<TodosFilterType>;

export type {
  AlbumsFilterType,
  AlbumsFilterVisibility,
  Filter,
  PostsFilter,
  PostsFilterType,
  PostsFilterVisibility,
  AlbumsFilter,
  TodosFilterVisibility,
  TodosFilter,
  TodosFilterType,
};
