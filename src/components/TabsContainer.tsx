import Tabs from '@/components/Tabs';
import { Tab } from '@/types';
import { Suspense, lazy, memo, useState } from 'react';
import { Column, Label, Row, Select } from './common';
import Loading from './common/Loading';

const Posts = lazy(() => import('./lists/Posts'));
const Albums = lazy(() => import('./lists/Albums'));
const Todos = lazy(() => import('./lists/Todos'));

type FilterOrder = 'ascending' | 'descending';
type FilterType = 'name' | 'id' | 'favorite';

export type Filter = { type: FilterType; order: FilterOrder };

type FilterVisibility = { name: boolean; id: boolean; favorite: boolean };

const orders: FilterOrder[] = ['ascending', 'descending'];

const TabsContainer: React.FC<{}> = () => {
  const [selectedTab, setSelectedTab] = useState<Tab>('posts');
  const [filters, setFilters] = useState<Filter[]>([
    { order: 'ascending', type: 'name' },
    { order: 'ascending', type: 'id' },
    { order: 'ascending', type: 'favorite' },
  ]);

  const [filtersVisibility, setFiltersVisibility] = useState<FilterVisibility>({
    name: false,
    id: false,
    favorite: false,
  });

  const handleFiltersChange = (type: FilterType, order: FilterOrder) => {
    setFilters(
      filters.map((filter) =>
        filter.type === type ? { ...filter, order } : filter
      )
    );
  };

  const toggleFilter = (name: 'name' | 'id' | 'favorite') =>
    setFiltersVisibility({
      ...filtersVisibility,
      [name]: !filtersVisibility.name,
    });

  const handleNameFilterChange = (order: FilterOrder) =>
    handleFiltersChange('name', order);
  const handleIdFilterChange = (order: FilterOrder) =>
    handleFiltersChange('id', order);
  const handleFavoriteFilterChange = (order: FilterOrder) =>
    handleFiltersChange('favorite', order);

  const Filters = (
    <Row css={{ gap: '$3' }}>
      <Label text="Name:" name="name">
        <Select<FilterOrder>
          isOpen={filtersVisibility.name}
          values={orders}
          onValueChange={handleNameFilterChange}
          onChangeOpen={() => toggleFilter('name')}
          defaultValue={orders[0]}
        />
      </Label>
      <Label text="Id:" name="id">
        <Select<FilterOrder>
          isOpen={filtersVisibility.id}
          values={orders}
          onValueChange={handleIdFilterChange}
          onChangeOpen={() => toggleFilter('id')}
          defaultValue={orders[0]}
        />
      </Label>
      <Label text="Favorite:" name="favorite">
        <Select<FilterOrder>
          isOpen={filtersVisibility.favorite}
          values={orders}
          onValueChange={handleFavoriteFilterChange}
          onChangeOpen={() => toggleFilter('favorite')}
          defaultValue={orders[0]}
        />
      </Label>
    </Row>
  );

  return (
    <Column>
      <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <Suspense fallback={<Loading />}>
        {selectedTab === 'posts' ? (
          <Column css={{ gap: '$4', my: '$3', alignItems: 'center' }}>
            {Filters}
            <Posts filters={filters} />
          </Column>
        ) : selectedTab === 'albums' ? (
          <Column css={{ gap: '$4', my: '$3', alignItems: 'center' }}>
            {Filters}
            <Albums filters={filters} />
          </Column>
        ) : (
          <Todos />
        )}
      </Suspense>
    </Column>
  );
};

export default TabsContainer;
