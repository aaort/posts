import { Label, Row, Select } from '@/components/common';
import { Order } from '@/types';
import { Dispatch, SetStateAction, useState } from 'react';
import {
  AlbumsFilter,
  AlbumsFilterType,
  AlbumsFilterVisibility,
} from './types';

type PostsFiltersProps = {
  filters: AlbumsFilter[];
  setFilters: Dispatch<SetStateAction<AlbumsFilter[]>>;
};

const orders: Order[] = ['ascending', 'descending'];

const AlbumsFilters: React.FC<PostsFiltersProps> = ({
  filters,
  setFilters,
}) => {
  const [filtersVisibility, setFiltersVisibility] =
    useState<AlbumsFilterVisibility>({
      byName: false,
      byId: false,
      byFavorite: false,
    });

  const handleFiltersChange = (type: AlbumsFilterType, order: Order) => {
    setFilters(
      filters.map((filter) =>
        filter.type === type ? { ...filter, order } : filter
      )
    );
  };

  const toggleFilter = (name: AlbumsFilterType) =>
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

export default AlbumsFilters;
