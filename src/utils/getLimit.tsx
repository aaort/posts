import { Limit } from '@/types';

// Returns stored limit from local storage if any or default value: 10
const getLimit: () => Limit = () => {
  return (localStorage.getItem('limit') as Limit) ?? ('10' as const);
};

export default getLimit;
