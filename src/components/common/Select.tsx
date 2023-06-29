import { ChevronDownIcon } from '@radix-ui/react-icons';
import * as RadixSelect from '@radix-ui/react-select';
import { styled } from '@stitches/react';

type SelectProps<T extends string> = {
  isOpen: boolean;
  onChangeOpen: () => void;
  onValueChange: (arg: T) => void;
  defaultValue: T;
  values: T[];
  valueSuffix?: string;
};

const Select = <T extends string>(props: SelectProps<T>) => {
  return (
    <RadixSelect.Root
      defaultValue={props.defaultValue}
      onValueChange={props.onValueChange}
      onOpenChange={props.onChangeOpen}
    >
      <RadixSelect.Trigger
        asChild
        data-state={props.isOpen}
        style={{ cursor: 'pointer' }}
      >
        <SelTrigger>
          <span>
            <RadixSelect.Value />
          </span>
          <RadixSelect.Icon asChild>
            <ChevronDownIcon />
          </RadixSelect.Icon>
        </SelTrigger>
      </RadixSelect.Trigger>
      <RadixSelect.Content asChild>
        <Dropdown>
          <Viewport>
            {props.values.map((item, i) => {
              return (
                <Item key={i} value={item}>
                  <RadixSelect.ItemText>
                    {`${item} ${props.valueSuffix ?? ''}`}
                  </RadixSelect.ItemText>
                </Item>
              );
            })}
          </Viewport>
        </Dropdown>
      </RadixSelect.Content>
    </RadixSelect.Root>
  );
};

const SelTrigger = styled('button', {
  display: 'flex',
  gap: '$1',
  justifyContent: 'space-between',
  alignItems: 'center',
  background: '$background',
  padding: '$2',
  fontSize: 'calc($1 + 0.4rem)',
  border: '1px solid $primary',
  borderRadius: '$small',
  outline: 'none',
  color: '$primary',
});

const Dropdown = styled('div', {
  position: 'relative',
  color: '$primary',
  padding: '$1',
  fontSize: '$1',
  background: '$background',
  border: '1px solid $primary',
  borderRadius: '$small',
  pointerEvents: 'all',
  zIndex: 10,
});

const Viewport = styled(RadixSelect.Viewport, {
  display: 'flex',
  flexDirection: 'column',
  rowGap: '$1',
});

const Item = styled(RadixSelect.Item, {
  padding: '$1',
  outline: 'none',
  transition: 'background ease 150ms',
  borderRadius: '$small',
  cursor: 'pointer',
  '&:focus': {
    background: '$primary',
    color: '$background',
  },
});

export default Select;
