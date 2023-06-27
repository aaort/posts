import { Limit } from '@/types';
import { Dispatch, SetStateAction, createContext } from 'react';

type ContextType =
  | [limit: Limit, setLimit: Dispatch<SetStateAction<Limit>>]
  | undefined;

const LimitContext = createContext<ContextType>(undefined);

export default LimitContext;
