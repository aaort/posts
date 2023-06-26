import { getLimit } from '@/utils';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import * as Select from '@radix-ui/react-select';
import { styled } from '@stitches/react';
import { useState } from 'react';

const limits = ['10', '20', '50', '100'] as const;
const initialLimit = getLimit();

type Limit = typeof limits[number];

// Component to control the displayed posts count
const PostLimit: React.FC<{}> = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = (value: boolean) => setIsOpen(!value);

  const handleLimitChange = (newLimit: Limit) => {
    sessionStorage.setItem('limit', newLimit);
  };

  return (
    <Select.Root
      defaultValue={initialLimit ?? limits[0]}
      onValueChange={handleLimitChange}
      onOpenChange={handleToggle}
    >
      <Select.Trigger asChild data-state={isOpen}>
        <SelTrigger>
          <span>
            <Select.Value /> Posts
          </span>
          <Select.Icon asChild>
            <ChevronDownIcon />
          </Select.Icon>
        </SelTrigger>
      </Select.Trigger>
      <Select.Content asChild>
        <Dropdown>
          <Viewport>
            {limits.map((item, i) => {
              return (
                <Item key={i} value={item}>
                  <Select.ItemText> {item} </Select.ItemText>
                </Item>
              );
            })}
          </Viewport>
        </Dropdown>
      </Select.Content>
    </Select.Root>
  );
};

const SelTrigger = styled('button', {
  display: 'flex',
  gap: '$1',
  justifyContent: 'space-between',
  alignItems: 'center',
  background: '$background',
  padding: 'calc($1 + $1)',
  fontSize: '$1',
  border: '1px solid $card',
  borderRadius: '$small',
  outline: 'none',
  color: '$card',
});

const Dropdown = styled('div', {
  position: 'relative',
  color: '$card',
  padding: '$1',
  fontSize: '$1',
  background: '$background',
  border: '1px solid $card',
  borderRadius: '$small',
  pointerEvents: 'all',
});

const Viewport = styled(Select.Viewport, {
  display: 'flex',
  flexDirection: 'column',
  rowGap: '$1',
});

const Item = styled(Select.Item, {
  padding: '$1',
  outline: 'none',
  transition: 'background ease 150ms',
  borderRadius: '$small',
  cursor: 'pointer',
  '&:focus': {
    background: '$card',
    color: '$background',
  },
});

export default PostLimit;
