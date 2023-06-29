import { Label, Row, Select } from '@/components/common';
import { Order } from '@/types';
import { Dispatch, SetStateAction, useState } from 'react';

type TodosFiltersProps = {
  filters: TodosFilter[];
  setFilters: Dispatch<SetStateAction<TodosFilter[]>>;
};

export type TodosFilterType = 'byName' | 'byCompleted';
export type TodosFilter = { type: TodosFilterType; order: Order };

type FilterVisibility = { byName: boolean; byCompleted: boolean };

const orders: Order[] = ['ascending', 'descending'];

const TodosFilters: React.FC<TodosFiltersProps> = ({ filters, setFilters }) => {
  const [filtersVisibility, setFiltersVisibility] = useState<FilterVisibility>({
    byName: false,
    byCompleted: false,
  });

  const handleFiltersChange = (type: TodosFilterType, order: Order) => {
    setFilters(
      filters.map((filter) =>
        filter.type === type ? { ...filter, order } : filter
      )
    );
  };

  const toggleFilter = (name: TodosFilterType) =>
    setFiltersVisibility({
      ...filtersVisibility,
      [name]: !filtersVisibility[name],
    });

  const handleByNameFilterChange = (value: Order) =>
    handleFiltersChange('byName', value);
  const handleByCompletedFilterChange = (value: Order) =>
    handleFiltersChange('byCompleted', value);

  return (
    <Row css={{ gap: '$3' }}>
      <Label text="Name:" name="name">
        <Select<Order>
          isOpen={filtersVisibility.byName}
          values={orders}
          onValueChange={handleByNameFilterChange}
          onChangeOpen={() => toggleFilter('byName')}
          defaultValue={orders[0]}
        />
      </Label>
      <Label text="Id:" name="id">
        <Select<Order>
          isOpen={filtersVisibility.byCompleted}
          values={orders}
          onValueChange={handleByCompletedFilterChange}
          onChangeOpen={() => toggleFilter('byCompleted')}
          defaultValue={orders[0]}
        />
      </Label>
    </Row>
  );
};

export default TodosFilters;
