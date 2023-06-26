import { Limit } from '@/types';

const getLimit: () => Limit = () => {
  return (sessionStorage.getItem('limit') as Limit) ?? ('10' as const);
};

export default getLimit;
