import { Limit } from '@/types';
import { getLimit } from '@/utils';
import { useState } from 'react';
import { Select } from './common';

const limits: Limit[] = ['10', '20', '50', '100'];
const initialLimit = getLimit();

// Component to control the displayed posts count
const PostLimit: React.FC<{}> = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = (value?: boolean) => setIsOpen(value ?? !isOpen);

  // Update limit in the local storage and dispatch an event for listeners
  const handleLimitChange = (newLimit: Limit) => {
    window.localStorage.setItem('limit', newLimit);
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <Select<Limit>
      isOpen={isOpen}
      values={limits}
      onValueChange={handleLimitChange}
      onChangeOpen={toggleOpen}
      defaultValue={initialLimit}
      valueSuffix="Posts"
    />
  );
};

export default PostLimit;
