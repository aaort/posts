import { Order } from '@/types';
import { Label, Select, Row } from '@/components/common';
import { Dispatch, SetStateAction, useState } from 'react';

type PostsFiltersProps = {
  filters: PostsFilter[];
  setFilters: Dispatch<SetStateAction<PostsFilter[]>>;
};

type FilterType = 'byName' | 'byId' | 'byFavorite';

export type PostsFilter = { type: FilterType; order: Order };

type FilterVisibility = { byName: boolean; byId: boolean; byFavorite: boolean };

const orders: Order[] = ['ascending', 'descending'];

const PostsFilters: React.FC<PostsFiltersProps> = ({ filters, setFilters }) => {
  const [filtersVisibility, setFiltersVisibility] = useState<FilterVisibility>({
    byName: false,
    byId: false,
    byFavorite: false,
  });

  const handleFiltersChange = (type: FilterType, order: Order) => {
    setFilters(
      filters.map((filter) =>
        filter.type === type ? { ...filter, order } : filter
      )
    );
  };

  const toggleFilter = (name: FilterType) =>
    setFiltersVisibility({
      ...filtersVisibility,
      [name]: !filtersVisibility[name],
    });

  const handleNameFilterChange = (order: Order) =>
    handleFiltersChange('byName', order);
  const handleIdFilterChange = (order: Order) =>
    handleFiltersChange('byId', order);
  const handleFavoriteFilterChange = (order: Order) =>
    handleFiltersChange('byFavorite', order);

  return (
    <Row css={{ gap: '$3' }}>
      <Label text="Name:" name="name">
        <Select<Order>
          isOpen={filtersVisibility.byName}
          values={orders}
          onValueChange={handleNameFilterChange}
          onChangeOpen={() => toggleFilter('byName')}
          defaultValue={orders[0]}
        />
      </Label>
      <Label text="Id:" name="id">
        <Select<Order>
          isOpen={filtersVisibility.byId}
          values={orders}
          onValueChange={handleIdFilterChange}
          onChangeOpen={() => toggleFilter('byId')}
          defaultValue={orders[0]}
        />
      </Label>
      <Label text="Favorite:" name="favorite">
        <Select<Order>
          isOpen={filtersVisibility.byFavorite}
          values={orders}
          onValueChange={handleFavoriteFilterChange}
          onChangeOpen={() => toggleFilter('byFavorite')}
          defaultValue={orders[0]}
        />
      </Label>
    </Row>
  );
};

export default PostsFilters;
