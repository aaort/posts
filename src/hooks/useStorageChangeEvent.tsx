import { useEffect } from 'react';

const useStorageChangeEvent = ({ callback }: { callback: () => void }) => {
  // Listen for local storage changes and call the passed callback
  useEffect(() => {
    window.addEventListener('storage', callback);

    return () => {
      window.removeEventListener('storage', callback);
    };
  }, [callback]);
};

export default useStorageChangeEvent;
