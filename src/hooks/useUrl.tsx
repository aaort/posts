import { getLimit } from '@/utils';
import { useEffect, useState } from 'react';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

// Return complete concatenated with provided endpoint
// And optional ability to add limit
const useUrl = (endpoint: string, includeLimit: boolean = true) => {
  const [limit, setLimit] = useState<string | number | undefined>(
    includeLimit ? getLimit() : undefined
  );

  const url = `${baseUrl}${endpoint}${includeLimit ? `?_limit=${limit}` : ''}`;

  useEffect(() => {
    if (includeLimit) {
      window.addEventListener('storage', () => {
        setLimit(getLimit() ?? 20);
      });

      return () => {
        window.removeEventListener('storage', () => {});
      };
    }
  }, [setLimit, includeLimit]);

  return url;
};

export default useUrl;
