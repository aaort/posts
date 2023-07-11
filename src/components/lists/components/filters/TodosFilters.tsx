import { Label, Select } from '@/components/common';
import { Order } from '@/types';
import { Dispatch, SetStateAction, useState } from 'react';
import Wrapper from './Wrapper';
import { TodosFilter, TodosFilterType, TodosFilterVisibility } from './types';

type TodosFiltersProps = {
  filters: TodosFilter[];
  setFilters: Dispatch<SetStateAction<TodosFilter[]>>;
};

const orders: Order[] = ['ascending', 'descending'];

const TodosFilters: React.FC<TodosFiltersProps> = ({ filters, setFilters }) => {
  const [filtersVisibility, setFiltersVisibility] =
    useState<TodosFilterVisibility>({
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
    <Wrapper>
      <Label text="Name:" name="name">
        <Select<Order>
          isOpen={filtersVisibility.byName}
          values={orders}
          onValueChange={handleByNameFilterChange}
          onChangeOpen={() => toggleFilter('byName')}
          defaultValue={orders[0]}
        />
      </Label>
      <Label text="Completed:" name="completed">
        <Select<Order>
          isOpen={filtersVisibility.byCompleted}
          values={orders}
          onValueChange={handleByCompletedFilterChange}
          onChangeOpen={() => toggleFilter('byCompleted')}
          defaultValue={orders[0]}
        />
      </Label>
    </Wrapper>
  );
};

export default TodosFilters;
