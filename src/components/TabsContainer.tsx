import Tabs from '@/components/Tabs';
import { Tab } from '@/types';
import { Suspense, lazy, useState } from 'react';
import { Column, Label, Row, Select } from './common';
import Loading from './common/Loading';

const Posts = lazy(() => import('./lists/Posts'));
const Photos = lazy(() => import('./lists/Albums'));
const Todos = lazy(() => import('./lists/Todos'));

type FilterOrder = 'ascending' | 'descending';
type FilterType = 'name' | 'id' | 'favorite';

type Filter = { type: FilterType; order: FilterOrder };

type FilterVisibility = { name: boolean; id: boolean; favorite: boolean };

const orders: FilterOrder[] = ['ascending', 'descending'];

const TabsContainer: React.FC<{}> = () => {
  const [selectedTab, setSelectedTab] = useState<Tab>('posts');
  const [filters, setFilters] = useState<Filter[]>([]);

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

  return (
    <Column>
      <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <Suspense fallback={<Loading />}>
        {selectedTab === 'posts' ? (
          <Column css={{ gap: '$4', my: '$3', alignItems: 'center' }}>
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
            <Posts />
          </Column>
        ) : selectedTab === 'albums' ? (
          <Photos />
        ) : (
          <Todos />
        )}
      </Suspense>
    </Column>
  );
};

export default TabsContainer;
