import { Limit } from '@/types';

const getLimit: () => Limit = () => {
  return (localStorage.getItem('limit') as Limit) ?? ('10' as const);
};

export default getLimit;
