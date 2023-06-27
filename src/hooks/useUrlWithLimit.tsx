import { getLimit } from '@/utils';
import { useEffect, useState } from 'react';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const useUrlWithLimit = (endpoint: string) => {
  const [limit, setLimit] = useState<string | number>(getLimit());

  const url = `${baseUrl}${endpoint}?_limit=${limit}`;

  useEffect(() => {
    window.addEventListener('storage', () => {
      setLimit(getLimit() ?? 20);
    });

    return () => {
      window.removeEventListener('storage', () => {});
    };
  }, [setLimit]);

  return url;
};

export default useUrlWithLimit;
