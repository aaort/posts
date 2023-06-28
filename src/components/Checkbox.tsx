import { styled } from '@/theme';
import * as RadixCheckbox from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';
import { Tooltip } from './common';

type CheckboxProps = {
  checked: boolean;
  onChange: () => void;
  tooltip?: string;
};

const Checkbox: React.FC<CheckboxProps> = (props) => {
  const Content = (
    <CheckboxRoot checked={props.checked} onCheckedChange={props.onChange}>
      <CheckboxIndicator>
        <CheckIcon width={25} height={25} />
      </CheckboxIndicator>
    </CheckboxRoot>
  );

  if (props.tooltip) {
    return <Tooltip text={props.tooltip}>{Content}</Tooltip>;
  } else {
    return Content;
  }
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
