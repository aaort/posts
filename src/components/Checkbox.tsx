import { styled } from '@/theme';
import * as RadixCheckbox from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';

type CheckboxProps = {
  checked: boolean;
  onChange: () => void;
};

const Checkbox: React.FC<CheckboxProps> = (props) => {
  return (
    <CheckboxRoot checked={props.checked} onCheckedChange={props.onChange}>
      <CheckboxIndicator>
        <CheckIcon width={25} height={25} />
      </CheckboxIndicator>
    </CheckboxRoot>
  );
};

const CheckboxRoot = styled(RadixCheckbox.Root, {
  all: 'unset',
  backgroundColor: '$background',
  width: 25,
  height: 25,
  borderRadius: 4,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: `$small`,
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '$primary',
    '& span': { color: '$background' },
  },
});

const CheckboxIndicator = styled(RadixCheckbox.Indicator, {
  color: '$primary',
});

export default Checkbox;
